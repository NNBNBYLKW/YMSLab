import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "YMS Lab",
  description: "Personal dev notes, docs and motion studies",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="siteShell">
          <header className="siteHeader">
            <Link href="/" className="logo headerStaggerItem" style={{ animationDelay: "0.02s" }}>YMS Lab</Link>
            <nav className="siteNav">
              <Link href="/" className="navLink headerStaggerItem" style={{ animationDelay: "0.06s" }}>Home</Link>
              <Link href="/works" className="navLink headerStaggerItem" style={{ animationDelay: "0.1s" }}>Works</Link>
              <Link href="/blog" className="navLink headerStaggerItem" style={{ animationDelay: "0.14s" }}>Blog</Link>
            </nav>
          </header>

          {children}

          <footer className="siteFooter">© {new Date().getFullYear()} YMS Lab</footer>
        </div>
      </body>
    </html>
  );
}
