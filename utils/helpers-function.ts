import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getAuthUser() {
  const user = await currentUser();

  if (!user) throw new Error("You must be logged in to access this route...");

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

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
