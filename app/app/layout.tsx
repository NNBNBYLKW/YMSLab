import type { Metadata } from "next";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { theme } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "YMS Lab",
  description: "Personal dev notes, docs and motion studies",
};

const noiseEnabled = theme.noise.enabledByDefault;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="app-shell" data-noise={noiseEnabled ? "on" : "off"}>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
