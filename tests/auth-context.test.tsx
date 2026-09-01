import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { useState } from "react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  AuthProvider,
  useAuth,
} from "@/lib/auth-context";

function jsonResponse(
  body: unknown,
  status = 200,
): Response {
  return {
    json: vi.fn().mockResolvedValue(body),
    ok: status >= 200 && status < 300,
    status,
  } as unknown as Response;
}

function AuthHarness() {
  const { isLoading, login, user } = useAuth();
  const [error, setError] = useState("");

  return (
    <div>
      <div data-testid="auth-state">
        {isLoading
          ? "loading"
          : user?.email || "signed-out"}
      </div>

      <button
        type="button"
        onClick={() => {
          void login(
            " Student@Example.COM ",
            "secret-password",
          ).catch((caught: unknown) => {
            setError(
              caught instanceof Error
                ? caught.message
                : "Login failed",
            );
          });
        }}
      >
        Test login
      </button>

      {error && <div role="alert">{error}</div>}
    </div>
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("restores an authenticated student session", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        jsonResponse({
          success: true,
          data: {
            user: {
              email:
                "student@students.jocomfy.com",
              role: "STUDENT",
              entityType: "STUDENT",
              entityInternalId: "student-1",
            },
          },
        }),
      );

    vi.stubGlobal("fetch", fetchMock);

    render(
      <AuthProvider>
        <AuthHarness />
      </AuthProvider>,
    );

    expect(
      await screen.findByTestId("auth-state"),
    ).toHaveTextContent(
      "student@students.jocomfy.com",
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/auth/me",
      expect.objectContaining({
        cache: "no-store",
        credentials: "include",
      }),
    );
  });

  it("does not accept a management account as a portal session", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        jsonResponse({
          success: true,
          data: {
            user: {
              email: "admin@jocomfy.com",
              role: "ADMIN",
              entityType: "STAFF",
              entityInternalId: "staff-1",
            },
          },
        }),
      );

    vi.stubGlobal("fetch", fetchMock);

    render(
      <AuthProvider>
        <AuthHarness />
      </AuthProvider>,
    );

    expect(
      await screen.findByTestId("auth-state"),
    ).toHaveTextContent("signed-out");
  });

  it("normalizes the student email during login", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        jsonResponse({ success: false }, 403),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          success: true,
          data: {
            user: {
              email: "student@example.com",
              role: "STUDENT",
              entityType: "STUDENT",
              entityInternalId: "student-2",
            },
          },
        }),
      );

    vi.stubGlobal("fetch", fetchMock);

    render(
      <AuthProvider>
        <AuthHarness />
      </AuthProvider>,
    );

    await screen.findByText("signed-out");

    fireEvent.click(
      screen.getByRole("button", {
        name: "Test login",
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByTestId("auth-state"),
      ).toHaveTextContent("student@example.com");
    });

    const loginCall = fetchMock.mock.calls.find(
      ([url]) => url === "/api/auth/login",
    );

    expect(loginCall).toBeDefined();
    expect(
      JSON.parse(String(loginCall?.[1]?.body)),
    ).toEqual({
      email: "student@example.com",
      password: "secret-password",
    });
  });

  it("logs out and rejects a non-student login", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        jsonResponse({ success: false }, 403),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          success: true,
          data: {
            user: {
              email: "admin@example.com",
              role: "ADMIN",
              entityType: "STAFF",
              entityInternalId: "staff-2",
            },
          },
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({ success: true }),
      );

    vi.stubGlobal("fetch", fetchMock);

    render(
      <AuthProvider>
        <AuthHarness />
      </AuthProvider>,
    );

    await screen.findByText("signed-out");

    fireEvent.click(
      screen.getByRole("button", {
        name: "Test login",
      }),
    );

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent(
      "The student portal only accepts student accounts.",
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/auth/logout",
      expect.objectContaining({
        method: "POST",
        credentials: "include",
      }),
    );
  });
});
