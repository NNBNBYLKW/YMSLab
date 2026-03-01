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
            <Link href="/" className="logo">YMS Lab</Link>
            <nav className="siteNav">
              <Link href="/" className="navLink">Home</Link>
              <Link href="/works" className="navLink">Works</Link>
              <Link href="/blog" className="navLink">Blog</Link>
            </nav>
          </header>

          {children}

          <footer className="siteFooter">© {new Date().getFullYear()} YMS Lab</footer>
        </div>
      </body>
    </html>
  );
}
