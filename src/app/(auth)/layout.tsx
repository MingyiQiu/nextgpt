import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

export const instant = false;

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();

  if (user?.id) {
    redirect("/chat");
  }

  return <>{children}</>;
}
