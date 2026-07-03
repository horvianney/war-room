import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "War Room RH — Command Center",
  description: "Système de gestion du personnel en temps réel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full dark">
      <body className="h-full bg-slate-950 text-slate-100 flex overflow-hidden">
        <ToastProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Header alertCount={4} criticalCount={2} />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
