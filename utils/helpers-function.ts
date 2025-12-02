import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/db/db";

export async function getAuthUser() {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be logged in to access this route...");
  }

  // Check if profile exists in database instead of relying on metadata
  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
  });

  if (!profile) {
    throw new Error("Please complete your profile first");
  }

  return user;
}

export const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");

  return user;
};

export function renderError(error: unknown): { message: string } {
  console.log(error);

  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
}
