import { getAllDocs } from "@/lib/docs";

export default async function DocsIndex() {
  const docs = await getAllDocs();

  return (
    <main>
      <h1>Docs</h1>
      <p>这里是我的博客/文档列表。</p>

      <ul style={{ paddingLeft: 18 }}>
        {docs.map((d) => (
          <li key={d.slug} style={{ marginBottom: 10 }}>
            <a href={`/docs/${d.slug}`} style={{ fontWeight: 600 }}>{d.title}</a>
            {d.date ? <span style={{ marginLeft: 10, opacity: 0.7 }}>{d.date}</span> : null}
            {d.summary ? <div style={{ opacity: 0.8 }}>{d.summary}</div> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
