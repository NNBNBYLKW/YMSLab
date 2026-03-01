import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YMS Lab",
  description: "Personal dev notes & docs"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
          <header style={{ display: "flex", gap: 16, alignItems: "baseline", marginBottom: 24 }}>
            <a href="/" style={{ fontWeight: 700, fontSize: 20, textDecoration: "none", color: "inherit" }}>
              YMS Lab
            </a>
            <nav style={{ display: "flex", gap: 12 }}>
              <a href="/docs">Docs</a>
            </nav>
          </header>

          {children}

          <footer style={{ marginTop: 48, paddingTop: 16, borderTop: "1px solid #eee", fontSize: 12, opacity: 0.7 }}>
            © {new Date().getFullYear()} YMS Lab
          </footer>
        </div>
      </body>
    </html>
  );
}
