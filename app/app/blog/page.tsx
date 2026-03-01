import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const posts = await getAllPosts();
  const { tag } = await searchParams;

  const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
  const activeTag = tag?.trim();
  const filteredPosts = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts;

  return (
    <main>
      <Section>
        <Container>
          <Reveal level="low">
            <Tag>Blog</Tag>
            <h1 className="hero-title" style={{ marginTop: "0.75rem" }}>
              文章与笔记
            </h1>
            <p className="hero-subtitle">内容驱动，轻动效，优先阅读体验。</p>
          </Reveal>

          <div className="blogFilterRow">
            <Link href="/blog" className={`blogFilterPill ${!activeTag ? "is-active" : ""}`}>
              全部
            </Link>
            {allTags.map((item) => (
              <Link
                key={item}
                href={`/blog?tag=${encodeURIComponent(item)}`}
                className={`blogFilterPill ${activeTag === item ? "is-active" : ""}`}
              >
                #{item}
              </Link>
            ))}
          </div>

          {posts.length === 0 ? (
            <div className="emptyState emptyState-minimal">还没有博客内容，稍后会发布新的文章。</div>
          ) : filteredPosts.length === 0 ? (
            <div className="emptyState emptyState-minimal">当前标签下没有文章，换个标签看看。</div>
          ) : (
            <div className="blogList">
              {filteredPosts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.03} distance={12} level="low">
                  <article className="blogCard">
                    <h2>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <div className="blogCardDate">{post.date}</div>
                    <p>{post.summary}</p>
                    <div className="blogCardTags">
                      {post.tags.map((item) => (
                        <span key={item}>#{item}</span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
