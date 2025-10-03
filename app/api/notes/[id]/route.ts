import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params; 
    const token = process.env.NOTEHUB_TOKEN;
    if (!token) return NextResponse.json({ error: "Server token is not set" }, { status: 500 });

    const response = await axios.get(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(response.data);
  } catch (err: unknown) {
    return NextResponse.json({ error: (err instanceof Error ? err.message : "Unknown error") }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;
    const token = process.env.NOTEHUB_TOKEN;
    if (!token) return NextResponse.json({ error: "Server token is not set" }, { status: 500 });

    const response = await axios.delete(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(response.data);
  } catch (err: unknown) {
    return NextResponse.json({ error: (err instanceof Error ? err.message : "Unknown error") }, { status: 500 });
  }
}
