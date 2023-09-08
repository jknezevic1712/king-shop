import "../globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Header from "../_components/header/header";
import Provider from "../_trpc/provider";

// nextAuth
import { getServerSession } from "next-auth/next";
import SessionProvider from "../_components/session/sessionProvider";
import { authOptions } from "@/server/api/auth";
import { env } from "@/env.mjs";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "King Shop",
  description: "Best deals, best",
  icons:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6ElEQVR4nO2XvS4FQRiGHxQiCoXKX2hwA2odUbkAhU5cgESh1ClcgEbQcJyocAV+Sp1OJKJAOOGchBA/IxPfJiebNTu7Z+XMyDzJ28zu+eZ9z+zONwuBQCAQ+KEfKAM10R4wjIchKoCKSY/14RFlMb4vxrUOZKyER9TEdP2/PyBjT3jEk5jWj5jXQUpi+kDCaB3K2A4eMQTcJbzsd3LNGzqAq4QgF0A7HrGcECLSIp4wADwbgugdrceHTlwyhIi0/lf++gvqxOMWIbQ+gbGMISo2/oroxG3AmWUQrROgxbJ22dZfEZ14LkOISDOWtWu2/qqGTnxjMVHXL30jTddAp0X9G9uTgqkTXwKjKROt5ggRSW/VJqaAW4O/7fqb9YUHw2QfwBYwkjCRHntrIMgLMJhQdxI4TfntfdJm1CcrU00JtBnb9qKXrhHt1tWbkI3AdH9Vzmy9pqVsBR5TCr0DG8B8ASEiLQDHFvc9ikcroufPRR2SgSUHDKtfpL0V3qGbofGsx/BXB0yrmF7FWybSdo5m6IQcrDhgXMWkPWVm2gHjKibtKTPdwJcD5pXoSzzl4tyBAEqkveRmzYEASqS95GbWgQBKpL0E/hXKETVMswOoECRGs1dChRWJYfP5+dc6ipsKBAIBvOYbTFuEzygkBW4AAAAASUVORK5CYII=",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: add store selector for dark mode so you can add dark class if necessary

  const session = await getServerSession(authOptions);

  console.log("ENV ? ", env.NODE_ENV);

  return (
    <html lang="en" className="dark">
      <body
        className={`${roboto.className} bg-zinc-100 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-100 min-h-screen`}
      >
        <Provider>
          <SessionProvider session={session}>
            <>
              <Header />
              {children}
            </>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
