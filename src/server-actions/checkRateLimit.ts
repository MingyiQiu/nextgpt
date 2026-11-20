"use server";
import { getCurrentUser } from "./getCurrentUser";
import { rateLimit } from "@/lib/rate-limit";

export async function checkRateLimit() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    throw new Error("Unauthorized.");
  }

  const { success } = await rateLimit.limit(`user:${currentUser.id}`);

  if (!success) {
    throw new Error("Too many requests. Please try again in a minute.");
  }
}
