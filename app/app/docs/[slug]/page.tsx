import { notFound } from "next/navigation";
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
        <h1>{meta.title}</h1>
        {meta.date ? (
          <div style={{ opacity: 0.7, marginBottom: 16 }}>{meta.date}</div>
        ) : null}
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    );
  } catch {
    notFound();
  }
}
