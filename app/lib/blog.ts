import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

const parseMeta = (slug: string, data: matter.GrayMatterFile<string>["data"]): BlogPostMeta => ({
  slug,
  title: String(data.title ?? slug),
  date: String(data.date ?? ""),
  summary: String(data.summary ?? ""),
  tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
});

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts: BlogPostMeta[] = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);
    posts.push(parseMeta(slug, data));
  }

  posts.sort((a, b) => (b.date || "0").localeCompare(a.date || "0"));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<{ meta: BlogPostMeta; html: string }> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  return {
    meta: parseMeta(slug, data),
    html: processed.toString(),
  };
}
