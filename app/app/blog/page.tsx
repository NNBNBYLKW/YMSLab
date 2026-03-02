import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { getAllPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main>
      <Section>
        <Container>
          <Reveal level="low">
            <header className="blogIntro">
              <p className="blogIntroEyebrow">Blog</p>
              <h1 className="blogIntroTitle">文章与笔记</h1>
              <p className="blogIntroDesc">清晰排版、轻量动效、长期可维护的 Markdown 内容流。</p>
            </header>
          </Reveal>

          {posts.length === 0 ? (
            <div className="emptyState emptyState-minimal">还没有博客内容，稍后会发布新的文章。</div>
          ) : (
            <Reveal level="low" delay={0.04}>
              <div className="blogListSimple" role="list">
                {posts.map((post) => (
                  <article className="blogRow" key={post.slug} role="listitem">
                    <div className="blogRowMain">
                      <h2>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p>{post.summary}</p>
                      <div className="blogCardTags">
                        {post.tags.map((item) => (
                          <span key={item}>#{item}</span>
                        ))}
                      </div>
                    </div>
                    <time className="blogRowDate" dateTime={post.date}>{post.date}</time>
                  </article>
                ))}
              </div>
            </Reveal>
          )}
        </Container>
      </Section>
    </main>
  );
}
