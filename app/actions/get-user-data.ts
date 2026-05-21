"use server";

import { getUserIP } from "@/utils/ip";
import { rateLimiter } from "@/utils/limiter";

export default async function getUserData() {
  try {
    const clientIp = await getUserIP();
    try {
      await rateLimiter.consume(clientIp, 2);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { message: "Hello, World!" };
    } catch {
      return {
        message: "Too Many Requests",
      };
    }
  } catch {
    return {
      message: "Something went wrong!"
    }
  }
}