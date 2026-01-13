export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
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

export function getImageURL(path: string) {
    if (path.startsWith("http")) return path
    return `${process.env.NEXT_PUBLIC_API_URL_ROOT}/${path}`
}
