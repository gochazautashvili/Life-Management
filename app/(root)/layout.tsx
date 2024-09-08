import { ReactNode } from "react";
import RootLayout from "./RootLayout";
import { redirect } from "next/navigation";
import { getUserWithWorkspaces } from "./workspace/actions";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await getUserWithWorkspaces();

  if (!user) redirect("/auth/sign-in");

  return <RootLayout user={user}>{children}</RootLayout>;
};

export default layout;
