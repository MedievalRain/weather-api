import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";

export const runtime = "edge"; // 'nodejs' is the default

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const city = params.get("city");
  console.log(params);
  if (city) {
    const cityQuery = city + "%";
    const rows =
      await sql`SELECT city,latitude,longitude from cities where city LIKE ${cityQuery} LIMIT 5`;
    console.log(rows);
    return NextResponse.json(rows.rows, {
      status: 200,
    });
  } else {
    return NextResponse.json(
      { error: "Wrong query params" },
      {
        status: 400,
      }
    );
  }
}
