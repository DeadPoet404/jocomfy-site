import {
  act,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import PasswordPage from "@/app/portal/password/page";

const mocks = vi.hoisted(() => ({
  apiFetch: vi.fn(),
  logout: vi.fn(),
  user: {
    email: "student@students.jocomfy.com",
    mustChangePassword: true,
    role: "STUDENT",
  },
}));

vi.mock("@/lib/api-client", () => ({
  apiFetch: mocks.apiFetch,
}));

vi.mock("@/lib/auth-context", () => ({
  useAuth: () => ({
    logout: mocks.logout,
    user: mocks.user,
  }),
}));

function fillPasswordForm({
  confirmPassword = "A-new-password-2026",
  currentPassword = "Temporary-password-2026",
  newPassword = "A-new-password-2026",
} = {}) {
  fireEvent.change(
    screen.getByLabelText("Current password"),
    { target: { value: currentPassword } },
  );
  fireEvent.change(
    screen.getByLabelText(/^New password/),
    { target: { value: newPassword } },
  );
  fireEvent.change(
    screen.getByLabelText("Confirm new password"),
    { target: { value: confirmPassword } },
  );
}

function submitPasswordForm() {
  const button = screen.getByRole("button", {
    name: "Update password securely",
  });
  const form = button.closest("form");

  if (!form) {
    throw new Error("Password form was not found.");
  }

  fireEvent.submit(form);
}

describe("PasswordPage", () => {
  beforeEach(() => {
    mocks.apiFetch.mockReset();
    mocks.logout.mockReset();
    mocks.user.mustChangePassword = true;
  });

  it("blocks mismatched new passwords before contacting the API", () => {
    render(<PasswordPage />);

    expect(
      screen.getByText("Secure your account"),
    ).toBeInTheDocument();

    fillPasswordForm({
      confirmPassword: "A-different-password-2026",
    });
    submitPasswordForm();

    expect(screen.getByRole("alert"))
      .toHaveTextContent(
        "The new passwords do not match.",
      );
    expect(mocks.apiFetch).not.toHaveBeenCalled();
  });

  it("shows backend validation errors without signing out", async () => {
    mocks.apiFetch.mockResolvedValue({
      success: false,
      message: "Current password is incorrect.",
    });

    render(<PasswordPage />);
    fillPasswordForm();

    await act(async () => {
      submitPasswordForm();
      await Promise.resolve();
    });

    expect(screen.getByRole("alert"))
      .toHaveTextContent(
        "Current password is incorrect.",
      );
    expect(mocks.logout).not.toHaveBeenCalled();
  });

  it("submits the change and schedules a clean sign-out", async () => {
    mocks.apiFetch.mockResolvedValue({
      success: true,
      message: "Password changed successfully.",
    });

    let scheduledLogout: (() => void) | undefined;
    vi.spyOn(window, "setTimeout")
      .mockImplementation((handler) => {
        if (typeof handler === "function") {
          scheduledLogout = handler;
        }
        return 1 as unknown as ReturnType<
          typeof window.setTimeout
        >;
      });

    render(<PasswordPage />);
    fillPasswordForm();

    await act(async () => {
      submitPasswordForm();
      await Promise.resolve();
    });

    expect(mocks.apiFetch).toHaveBeenCalledWith(
      "/auth/password",
      {
        method: "PATCH",
        body: JSON.stringify({
          currentPassword:
            "Temporary-password-2026",
          newPassword: "A-new-password-2026",
        }),
      },
    );

    expect(screen.getByRole("status"))
      .toHaveTextContent("Password changed.");
    expect(scheduledLogout).toBeDefined();

    await act(async () => {
      scheduledLogout?.();
    });

    expect(mocks.logout).toHaveBeenCalledOnce();
  });
});
