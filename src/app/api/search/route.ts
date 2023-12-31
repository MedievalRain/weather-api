import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "edge"; // 'nodejs' is the default

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const city = params.get("city") ? params.get("city") : "A";
  const cityQuery = city + "%";
  const rows =
    await sql`SELECT city,latitude,longitude,country,timezone from cities where city LIKE ${cityQuery} LIMIT 5`;
  return NextResponse.json(rows.rows, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
