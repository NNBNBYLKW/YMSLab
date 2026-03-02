import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const { meta, html } = await getPostBySlug(slug);

    return (
      <main>
        <Section>
          <Container>
            <Reveal level="low">
              <header className="blogPostHeader">
                <p className="blogIntroEyebrow">Article</p>
                <h1 className="blogTitle">{meta.title}</h1>
                <div className="blogPostMeta">
                  <time dateTime={meta.date}>{meta.date}</time>
                  <div className="blogCardTags">
                    {meta.tags.map((item) => (
                      <span key={item}>#{item}</span>
                    ))}
                  </div>
                </div>
              </header>
            </Reveal>

            <article className="blogProse" dangerouslySetInnerHTML={{ __html: html }} />
          </Container>
        </Section>
      </main>
    );
  } catch {
    notFound();
  }
}
