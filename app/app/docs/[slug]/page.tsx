import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getAllDocs, getDocBySlug } from "@/lib/docs";

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((d) => ({ slug: d.slug }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const { meta, html } = await getDocBySlug(slug);

    return (
      <main>
        <Section>
          <Container>
            <h1 className="hero-title" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", marginBottom: "0.6rem" }}>{meta.title}</h1>
            {meta.date ? <div style={{ opacity: 0.7, marginBottom: 16 }}>{meta.date}</div> : null}
            <article dangerouslySetInnerHTML={{ __html: html }} />
          </Container>
        </Section>
      </main>
    );
  } catch {
    notFound();
  }
}
