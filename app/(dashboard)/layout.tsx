import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";
import Sidebar from "./components/layouts/sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SportOn Admin",
  description:
    "Engineered for endurance and designed for speed. Experience gear that moves as fast as you do. Premium fabrics. Unmatched comfort. Limitless motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <Toaster richColors closeButton />
        <div className="flex min-h-screen bg-white">
          <Sidebar />
          <main className="flex-1 ml-80 p-14 bg-[#F7F9FA] min-h-screen">
            <div className="max-w-6xl mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
