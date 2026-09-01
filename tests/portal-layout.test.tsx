import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import type { ReactNode } from "react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import PortalLayout from "@/app/portal/layout";

const mocks = vi.hoisted(() => ({
  logout: vi.fn(),
  pathname: vi.fn(),
  replace: vi.fn(),
  useAuth: vi.fn(),
}));

vi.mock("@/lib/auth-context", () => ({
  useAuth: mocks.useAuth,
}));

vi.mock("next/navigation", () => ({
  usePathname: mocks.pathname,
  useRouter: () => ({
    replace: mocks.replace,
  }),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("PortalLayout", () => {
  beforeEach(() => {
    mocks.pathname.mockReturnValue("/portal");
    mocks.useAuth.mockReturnValue({
      isLoading: false,
      logout: mocks.logout,
      user: null,
    });
  });

  it("redirects an unauthenticated protected route", async () => {
    render(
      <PortalLayout>
        <div>Private portal content</div>
      </PortalLayout>,
    );

    expect(
      screen.getByText(
        "Verifying student session…",
      ),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mocks.replace).toHaveBeenCalledWith(
        "/portal/login",
      );
    });

    expect(
      screen.queryByText(
        "Private portal content",
      ),
    ).not.toBeInTheDocument();
  });

  it("waits for session loading before redirecting", () => {
    mocks.useAuth.mockReturnValue({
      isLoading: true,
      logout: mocks.logout,
      user: null,
    });

    render(
      <PortalLayout>
        <div>Private portal content</div>
      </PortalLayout>,
    );

    expect(mocks.replace).not.toHaveBeenCalled();
  });

  it("renders protected content for a student", () => {
    mocks.useAuth.mockReturnValue({
      isLoading: false,
      logout: mocks.logout,
      user: {
        email: "student@example.com",
        role: "STUDENT",
      },
    });

    render(
      <PortalLayout>
        <div>Private portal content</div>
      </PortalLayout>,
    );

    expect(
      screen.getByText("Private portal content"),
    ).toBeInTheDocument();
    expect(mocks.replace).not.toHaveBeenCalled();
  });

  it("redirects a forced-change student away from records", async () => {
    mocks.useAuth.mockReturnValue({
      isLoading: false,
      logout: mocks.logout,
      user: {
        email: "student@example.com",
        mustChangePassword: true,
        role: "STUDENT",
      },
    });

    render(
      <PortalLayout>
        <div>Private portal content</div>
      </PortalLayout>,
    );

    expect(
      screen.getByText(
        "Preparing secure password update…",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Private portal content"),
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(mocks.replace).toHaveBeenCalledWith(
        "/portal/password",
      );
    });
  });

  it("allows a forced-change student to open the password page", () => {
    mocks.pathname.mockReturnValue(
      "/portal/password",
    );
    mocks.useAuth.mockReturnValue({
      isLoading: false,
      logout: mocks.logout,
      user: {
        email: "student@example.com",
        mustChangePassword: true,
        role: "STUDENT",
      },
    });

    render(
      <PortalLayout>
        <div>Secure password form</div>
      </PortalLayout>,
    );

    expect(
      screen.getByText("Secure password form"),
    ).toBeInTheDocument();
    expect(mocks.replace).not.toHaveBeenCalled();
  });

  it("keeps the login route public", () => {
    mocks.pathname.mockReturnValue(
      "/portal/login",
    );

    render(
      <PortalLayout>
        <div>Student login form</div>
      </PortalLayout>,
    );

    expect(
      screen.getByText("Student login form"),
    ).toBeInTheDocument();
    expect(mocks.replace).not.toHaveBeenCalled();
  });
});
