import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeController } from "@/components/theme/ThemeController";

export const metadata: Metadata = {
  title: "YMS 实验室",
  description: "以中文为主的个人创作站：作品、博客与视觉实验",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="siteShell">
          <header className="siteHeader">
            <Link href="/" className="logo headerStaggerItem" style={{ animationDelay: "0.02s" }}>YMS 实验室</Link>
            <nav className="siteNav">
              <Link href="/" className="navLink headerStaggerItem" style={{ animationDelay: "0.06s" }}>首页</Link>
              <Link href="/works" className="navLink headerStaggerItem" style={{ animationDelay: "0.1s" }}>作品</Link>
              <Link href="/blog" className="navLink headerStaggerItem" style={{ animationDelay: "0.14s" }}>博客</Link>
            </nav>
            <ThemeController />
          </header>

          {children}

          <footer className="siteFooter">© {new Date().getFullYear()} YMS Lab</footer>
        </div>
      </body>
    </html>
  );
}
