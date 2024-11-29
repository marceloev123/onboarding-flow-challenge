import React from "react";
import { AppSidebar } from "./app-sidebar";
import { GeistSans } from "geist/font/sans";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <main
      className={`${GeistSans.className} flex min-h-screen w-full flex-row`}
    >
      <AppSidebar />
      <div className="flex-1">{children}</div>
    </main>
  );
};
