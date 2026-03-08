import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.API_URL_INTERNAL!;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(req, params);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(req, params);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(req, params);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(req, params);
}

async function proxyRequest(
  req: NextRequest,
  paramsPromise: Promise<{ path: string[] }>
) {
  const { path } = await paramsPromise;
  const targetPath = path.join("/");
  const url = new URL(req.url);
  const queryString = url.search; // preserve query params

  const targetUrl = `${BACKEND_URL}/${targetPath}${queryString}`;

  // Forward headers, tapi ganti host
  const headers = new Headers(req.headers);
  headers.delete("host");

  const init: RequestInit = {
    method: req.method,
    headers,
  };

  // Forward body untuk non-GET
  if (req.method !== "GET" && req.method !== "HEAD") {
    // Cek apakah multipart (file upload) atau JSON
    const contentType = req.headers.get("content-type") || "";
    
    if (contentType.includes("multipart/form-data")) {
      init.body = await req.blob();
    } else {
      init.body = await req.text();
    }
  }

  try {
    const res = await fetch(targetUrl, init);

    return new NextResponse(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Backend unavailable" },
      { status: 502 }
    );
  }
}