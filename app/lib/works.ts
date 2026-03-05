import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { works as legacyWorks } from "@/data/works";

const WORKS_DIR = path.join(process.cwd(), "content", "works");

export type WorkCover = {
  src: string;
  alt: string;
};

export type WorkLink = {
  label: string;
  url: string;
};

export type MediaImage = {
  src: string;
  alt: string;
  caption: string;
};

export type MediaItem =
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
    }
  | {
      type: "gallery";
      title: string;
      images: MediaImage[];
    }
  | {
      type: "video";
      src: string;
      poster: string;
      title: string;
      description: string;
    };

export type WorkMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  roles: string[];
  stack: string[];
  tags: string[];
  cover: WorkCover;
  links: WorkLink[];
  media: MediaItem[];
};

function normalizeDateInput(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (/^\d{4}$/.test(raw) || /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  return "1970-01-01";
}

function dateSortValue(date: string): string {
  if (/^\d{4}$/.test(date)) return `${date}-01-01`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  return "1970-01-01";
}

function parseMediaItem(item: unknown): MediaItem | null {
  if (!item || typeof item !== "object") return null;
  const source = item as Record<string, unknown>;
  const type = source.type;

  if (type === "image") {
    const src = String(source.src ?? "").trim();
    if (!src) return null;
    return {
      type,
      src,
      alt: String(source.alt ?? "作品图片"),
      caption: String(source.caption ?? ""),
    };
  }

  if (type === "gallery") {
    const imagesRaw = Array.isArray(source.images) ? source.images : [];
    const images: MediaImage[] = imagesRaw
      .map((entry) => {
        if (!entry || typeof entry !== "object") return null;
        const image = entry as Record<string, unknown>;
        const src = String(image.src ?? "").trim();
        if (!src) return null;
        return {
          src,
          alt: String(image.alt ?? "图集图片"),
          caption: String(image.caption ?? ""),
        };
      })
      .filter((entry): entry is MediaImage => entry !== null);

    if (images.length === 0) return null;

    return {
      type,
      title: String(source.title ?? "图集"),
      images,
    };
  }

  if (type === "video") {
    const src = String(source.src ?? "").trim();
    if (!src) return null;
    return {
      type,
      src,
      poster: String(source.poster ?? ""),
      title: String(source.title ?? "视频"),
      description: String(source.description ?? ""),
    };
  }

  return null;
}

function parseMeta(slug: string, data: matter.GrayMatterFile<string>["data"]): WorkMeta {
  const linksRaw = Array.isArray(data.links) ? data.links : [];
  const links: WorkLink[] = linksRaw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const link = item as Record<string, unknown>;
      const url = String(link.url ?? "").trim();
      if (!url) return null;
      return {
        label: String(link.label ?? "外链"),
        url,
      };
    })
    .filter((entry): entry is WorkLink => entry !== null);

  const coverRaw = data.cover && typeof data.cover === "object" ? (data.cover as Record<string, unknown>) : {};

  return {
    slug,
    title: String(data.title ?? slug),
    date: normalizeDateInput(data.date),
    summary: String(data.summary ?? ""),
    category: String(data.category ?? "未分类"),
    roles: Array.isArray(data.roles) ? data.roles.map(String) : [],
    stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: {
      src: String(coverRaw.src ?? ""),
      alt: String(coverRaw.alt ?? String(data.title ?? slug)),
    },
    links,
    media: Array.isArray(data.media) ? data.media.map(parseMediaItem).filter((entry): entry is MediaItem => entry !== null) : [],
  };
}

function legacyToMeta() {
  return legacyWorks.map((item) => ({
    slug: item.slug,
    title: item.title,
    date: String(item.year),
    summary: item.summary,
    category: item.tags[0] ?? "未分类",
    roles: item.responsibilities,
    stack: item.stack,
    tags: item.tags,
    cover: {
      src: item.images[0]?.src ?? "",
      alt: item.images[0]?.alt ?? item.title,
    },
    links: [
      ...item.links.map((link) => ({ label: link.label, url: link.href })),
      ...(item.bilibili ? [{ label: "B站", url: item.bilibili }] : []),
    ],
    media: [
      ...item.images.map((image) => ({ type: "image" as const, src: image.src, alt: image.alt, caption: image.title })),
      ...item.videos.map((video) => ({ type: "video" as const, src: video.src, poster: "", title: video.title, description: video.type })),
    ],
  }));
}

async function getWorkFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(WORKS_DIR);
    return files.filter((file) => file.endsWith(".md"));
  } catch {
    return [];
  }
}

export async function getAllWorks(): Promise<WorkMeta[]> {
  const files = await getWorkFiles();

  const worksBySlug = new Map<string, WorkMeta>();

  for (const legacy of legacyToMeta()) {
    worksBySlug.set(legacy.slug, legacy);
  }

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(WORKS_DIR, file), "utf-8");
    const { data } = matter(raw);
    worksBySlug.set(slug, parseMeta(slug, data));
  }

  const works = Array.from(worksBySlug.values());
  works.sort((a, b) => dateSortValue(b.date).localeCompare(dateSortValue(a.date)));
  return works;
}

export async function getWorkBySlug(slug: string): Promise<{ meta: WorkMeta; html: string } | null> {
  const filePath = path.join(WORKS_DIR, `${slug}.md`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

    return {
      meta: parseMeta(slug, data),
      html: processed.toString(),
    };
  } catch {
    const fallback = legacyWorks.find((item) => item.slug === slug);
    if (!fallback) return null;

    const html = fallback.body.map((paragraph) => `<p>${paragraph}</p>`).join("\n");
    const meta = legacyToMeta().find((item) => item.slug === slug);
    if (!meta) return null;
    return { meta, html };
  }
}

export async function generateWorkStaticParams() {
  const works = await getAllWorks();
  return works.map((work) => ({ slug: work.slug }));
}
