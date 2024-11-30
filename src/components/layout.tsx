import React from "react";
import { AppSidebar } from "./app-sidebar";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/toaster";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <main
        className={`${GeistSans.className} flex min-h-screen w-full flex-row`}
      >
        <AppSidebar />
        <div className="flex-1">{children}</div>
        <Toaster />
      </main>
    </ThemeProvider>
  );
};
