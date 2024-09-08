import { getUser } from "@/data/getUser";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  if (user) redirect("/");

  return (
    <section className="flex items-center justify-center w-full h-screen">
      {children}
    </section>
  );
};

export default layout;
