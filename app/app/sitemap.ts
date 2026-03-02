import type { MetadataRoute } from "next";
import { works } from "@/data/works";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://ymslab.top";
  const posts = await getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/works", "/blog", "/docs"].map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const workRoutes = works.map((work) => ({
    url: `${base}/works/${work.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes, ...blogRoutes];
}
