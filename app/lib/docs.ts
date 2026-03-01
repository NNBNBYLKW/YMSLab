import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

export type DocMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
};

export async function getAllDocs(): Promise<DocMeta[]> {
  const files = await fs.readdir(DOCS_DIR);
  const docs: DocMeta[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(DOCS_DIR, file), "utf-8");
    const { data } = matter(raw);

    docs.push({
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      summary: data.summary ? String(data.summary) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined
    });
  }

  // date 降序（空日期排最后）
  docs.sort((a, b) => (b.date || "0").localeCompare(a.date || "0"));
  return docs;
}

export async function getDocBySlug(slug: string): Promise<{ meta: DocMeta; html: string }> {
  const filePath = path.join(DOCS_DIR, `${slug}.md`);
  const raw = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  const html = processed.toString();

  const meta: DocMeta = {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    summary: data.summary ? String(data.summary) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined
  };

  return { meta, html };
}
