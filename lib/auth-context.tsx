"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const API_URL = (
  process.env.NEXT_PUBLIC_SMS_API_URL || "/api"
).replace(/\/$/, "");

export interface PortalUser {
  email: string;
  role: string;
  entityType: string;
  entityInternalId: string;
}

interface AuthContextValue {
  user: PortalUser | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<PortalUser>;
  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(undefined);

async function readJson(response: Response) {
  return response.json().catch(() => null);
}

async function refreshSession(): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({}),
      },
    );

    return response.ok;
  } catch {
    return false;
  }
}

async function loadCurrentUser():
  Promise<PortalUser | null> {
  const request = () =>
    fetch(`${API_URL}/auth/me`, {
      credentials: "include",
      cache: "no-store",
    });

  try {
    let response = await request();

    if (
      response.status === 401 &&
      await refreshSession()
    ) {
      response = await request();
    }

    if (!response.ok) return null;

    const result = await readJson(response);
    const user =
      result?.data?.user as PortalUser | undefined;

    if (!user || user.role !== "STUDENT") {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<PortalUser | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    const handleUnauthorized = () => {
      setUser(null);
    };

    window.addEventListener(
      "portal:unauthorized",
      handleUnauthorized,
    );

    void loadCurrentUser().then((currentUser) => {
      if (!cancelled) {
        setUser(currentUser);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
      window.removeEventListener(
        "portal:unauthorized",
        handleUnauthorized,
      );
    };
  }, []);

  const login = useCallback(
    async (
      email: string,
      password: string,
    ) => {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        },
      );

      const result = await readJson(response);

      if (
        !response.ok ||
        !result?.success ||
        !result?.data?.user
      ) {
        throw new Error(
          result?.message || "Unable to sign in.",
        );
      }

      const authenticatedUser =
        result.data.user as PortalUser;

      if (authenticatedUser.role !== "STUDENT") {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          credentials: "include",
        }).catch(() => undefined);

        throw new Error(
          "The student portal only accepts student accounts.",
        );
      }

      setUser(authenticatedUser);
      return authenticatedUser;
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider.",
    );
  }

  return context;
}
