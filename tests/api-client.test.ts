import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

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

describe("apiFetch", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
    delete process.env.NEXT_PUBLIC_SMS_API_URL;
  });

  it("uses the same-origin API with cookie credentials", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        jsonResponse({
          success: true,
          data: { id: "student-1" },
        }),
      );

    vi.stubGlobal("fetch", fetchMock);

    const { apiFetch } = await import("@/lib/api-client");
    const result = await apiFetch("students/me");

    expect(result).toEqual({
      success: true,
      data: { id: "student-1" },
    });
    expect(fetchMock).toHaveBeenCalledOnce();

    const [url, init] = fetchMock.mock.calls[0];

    expect(url).toBe("/api/students/me");
    expect(init?.credentials).toBe("include");
    expect(
      (init?.headers as Headers).get("Content-Type"),
    ).toBe("application/json");
  });

  it("refreshes an expired session and retries once", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        jsonResponse({ success: false }, 401),
      )
      .mockResolvedValueOnce(
        jsonResponse({ success: true }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          success: true,
          data: { balance: 25 },
        }),
      );

    vi.stubGlobal("fetch", fetchMock);

    const { apiFetch } = await import("@/lib/api-client");
    const result = await apiFetch("/payments/fees/me");

    expect(result).toEqual({
      success: true,
      data: { balance: 25 },
    });
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(
      fetchMock.mock.calls.map(([url]) => url),
    ).toEqual([
      "/api/payments/fees/me",
      "/api/auth/refresh",
      "/api/payments/fees/me",
    ]);
  });

  it("signals the portal when refresh cannot recover a 401", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        jsonResponse({
          success: false,
          message: "Expired",
        }, 401),
      )
      .mockResolvedValueOnce(
        jsonResponse({ success: false }, 401),
      );

    const unauthorizedHandler = vi.fn();

    window.addEventListener(
      "portal:unauthorized",
      unauthorizedHandler,
    );

    vi.stubGlobal("fetch", fetchMock);

    const { apiFetch } = await import("@/lib/api-client");
    const result = await apiFetch("/students/me");

    expect(result).toEqual({
      success: false,
      message: "Expired",
    });
    expect(unauthorizedHandler).toHaveBeenCalledOnce();

    window.removeEventListener(
      "portal:unauthorized",
      unauthorizedHandler,
    );
  });

  it("returns a safe error when the server does not return JSON", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue({
        json: vi
          .fn()
          .mockRejectedValue(
            new Error("invalid JSON"),
          ),
        ok: false,
        status: 502,
      } as unknown as Response);

    vi.stubGlobal("fetch", fetchMock);

    const { apiFetch } = await import("@/lib/api-client");
    const result = await apiFetch("/health");

    expect(result).toEqual({
      success: false,
      message:
        "The school server returned HTTP 502.",
    });
  });
});
