// src/api/auth.ts
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

export type LoginResponse = {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    customer_id: string;
    phone: string;
    address: string;
    date_joined: string;
  };
};

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // if you run on web, this lets the browser store a session cookie
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || data?.detail || "Invalid username or password");
  }
  return data as LoginResponse;
}
