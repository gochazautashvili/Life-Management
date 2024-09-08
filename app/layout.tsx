import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getUser } from "@/data/getUser";
import UserProvider from "@/providers/UserProvider";
import QueryProvider from "@/providers/QueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Life Management",
  description:
    "This website help you to menage your day, week, month, year or any work",
  icons: {
    icon: "/logo_icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryProvider>
          <UserProvider value={user}>
            <main>{children}</main>
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
