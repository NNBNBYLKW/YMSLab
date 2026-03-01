import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { getAllDocs } from "@/lib/docs";

export default async function BlogPage() {
  const docs = await getAllDocs();

  return (
    <main>
      <Section>
        <Container>
          <Tag>Blog</Tag>
          <h1 className="hero-title" style={{ marginTop: "0.75rem" }}>文章与笔记</h1>
          <p className="hero-subtitle">博客页当前保持简洁排版，优先内容可读性，不引入复杂动画。</p>

          <div style={{ display: "grid", gap: "0.75rem", marginTop: "1.5rem" }}>
            {docs.map((doc) => (
              <Card key={doc.slug}>
                <Link href={`/docs/${doc.slug}`} style={{ fontWeight: 650 }}>{doc.title}</Link>
                {doc.date ? <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{doc.date}</div> : null}
                {doc.summary ? <p style={{ marginBottom: 0, color: "var(--text-muted)" }}>{doc.summary}</p> : null}
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
