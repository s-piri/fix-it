// src/api/providers.ts
const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

export type Provider = {
  provider_id: string;
  provider_name: string;
  job_type: string;
  eta: string;
  hourly_rate: number;
  is_available: boolean;
  rating: number;
  jobs: number;
  vehicle: string;
  profile_picture?: string;
};

export type ProviderSearchParams = {
  customer_id?: string;
  job_type: string;
  budget?: number;
};

export type ProviderSearchResponse = {
  provider: Provider;
};

export async function searchProvider(params: ProviderSearchParams): Promise<ProviderSearchResponse> {
  const queryParams = new URLSearchParams();
  
  // Get customer_id from localStorage if available, otherwise use default
  let customerId = params.customer_id;
  if (!customerId) {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        customerId = user.customer_id;
      }
    } catch (error) {
      console.log('Error getting user data:', error);
    }
  }
  
  // Use default customer_id if still not available
  if (!customerId) {
    customerId = 'DEMO_001';
  }
  
  queryParams.append('customer_id', customerId);
  queryParams.append('job_type', params.job_type);
  if (params.budget) queryParams.append('budget', params.budget.toString());

  const res = await fetch(`${BASE_URL}/providers/search/?${queryParams}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.error || data?.detail || "Failed to find provider");
  }
  return data as ProviderSearchResponse;
}
