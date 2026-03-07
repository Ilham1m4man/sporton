export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  // Server-side pakai internal URL, client-side pakai public URL
  const baseUrl =
    typeof window === "undefined"
      ? process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    cache: options?.cache || "no-cache",
  });

  if (!res.ok) {
    let errMsg = `Failed to fetch data from ${endpoint}`;
    try {
      const errData = await res.json();
      errMsg = errData.message || errData.error || errMsg;
    } catch (e) {
      console.log(e);
    }
    throw new Error(errMsg);
  }
  return res.json();
}

// Karena udah pakai S3 presigned URL, harusnya selalu start with "http"
// Tapi keep fallback just in case
export function getImageURL(path: string) {
  if (!path) return ""
  if (path.startsWith("http")) return path;
  
  const baseUrl =
    typeof window === "undefined"
      ? process.env.API_URL_INTERNAL_ROOT || process.env.NEXT_PUBLIC_API_URL_ROOT
      : process.env.NEXT_PUBLIC_API_URL_ROOT;

  return `${baseUrl}/${path}`;
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}