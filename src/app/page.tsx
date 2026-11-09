import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { redirect } from "next/navigation";

export const instant = false;

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  } else {
    redirect("/chat");
  }
}
