import { getUserIP } from "@/utils/ip";
import { rateLimiter } from "@/utils/limiter";
import { NextResponse } from "next/server";

export async function GET() {
  const userIP = await getUserIP();
  console.log({ userIP });
  try {
    await rateLimiter.consume(userIP, 2);
  } catch {
    return NextResponse.json({ message: "Too many requests." }, { status: 429 })
  }
  return NextResponse.json({ message: "Hello world" }, { status: 200 })
}