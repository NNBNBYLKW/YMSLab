import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getAllDocs } from "@/lib/docs";

export default async function DocsIndex() {
  const docs = await getAllDocs();

  return (
    <main>
      <Section>
        <Container>
          <h1 className="hero-title" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>Docs</h1>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {docs.map((d) => (
              <Card key={d.slug}>
                <Link href={`/docs/${d.slug}`} style={{ fontWeight: 600 }}>{d.title}</Link>
                {d.date ? <span style={{ marginLeft: 10, color: "var(--text-muted)", fontSize: "0.85rem" }}>{d.date}</span> : null}
                {d.summary ? <div style={{ color: "var(--text-muted)" }}>{d.summary}</div> : null}
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
