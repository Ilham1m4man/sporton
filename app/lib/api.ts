export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const isServer = typeof window === "undefined";

  let url: string;

  if (isServer) {
    // Server Component / Server Action → langsung ke Internal ALB
    // Lebih cepat, skip middleware, gak lewat ALB public
    const baseUrl = process.env.API_URL_INTERNAL || "";
    url = `${baseUrl}${endpoint}`;
  } else {
    // Browser → relative URL → middleware proxy ke Internal ALB
    // Contoh: "/api/v1/users" (tanpa host)
    url = `/api${endpoint}`;
  }

  const res = await fetch(url, {
    ...options,
    cache: options?.cache || "no-cache",
  });

  if (!res.ok) {
    let errMsg = `Failed to fetch data from ${endpoint}`;
    try {
      const errData = await res.json();
      errMsg = errData.message || errData.error || errMsg;
    } catch (e) {
      console.error(e);
    }
    throw new Error(errMsg);
  }

  return res.json();
}

export function getImageURL(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path; // S3 presigned URL

  return path.startsWith("/") ? path : `/${path}`;

/*   // Fallback: kalau path bukan full URL
  const isServer = typeof window === "undefined";
  if (isServer) {
    const baseUrl = process.env.API_URL_INTERNAL_ROOT || "";
    return `${baseUrl}/${path}`;
  }

  // Client: relative URL, middleware akan proxy
  return `/${path}`; */
}

export function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}