import { NextResponse } from "next/server";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

// Простий кеш на 5 секунд
const cache: Record<string, unknown> = {};
const cacheTime: Record<string, number> = {};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const search = searchParams.get("search") || "";
    const tag = searchParams.get("tag") || "";

    const token = process.env.NOTEHUB_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Server token is not set" }, { status: 500 });
    }

    const cacheKey = `notes_page=${page}_search=${search}_tag=${tag}`;
    const now = Date.now();

    if (cache[cacheKey] && now - cacheTime[cacheKey] < 5000) {
      return NextResponse.json(cache[cacheKey]);
    }

    const response = await axios.get("/notes", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page,
        search: search || undefined,
        tag: tag || undefined,
      },
    });

    cache[cacheKey] = response.data;
    cacheTime[cacheKey] = now;

    return NextResponse.json(response.data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Axios error:", err.response?.data || err.message);
      return NextResponse.json(
        { error: err.response?.data || err.message },
        { status: err.response?.status || 500 }
      );
    }
    if (err instanceof Error) {
      console.error("General error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = process.env.NOTEHUB_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "Server token is not set" }, { status: 500 });
    }

    const newNote = await req.json();

    const response = await axios.post("/notes", newNote, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(response.data);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Axios error:", err.response?.data || err.message);
      return NextResponse.json(
        { error: err.response?.data || err.message },
        { status: err.response?.status || 500 }
      );
    }
    if (err instanceof Error) {
      console.error("General error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
