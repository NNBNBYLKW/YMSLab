import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
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
            <Reveal>
              <Tag>Blog Post</Tag>
              <h1 className="hero-title blogTitle">{meta.title}</h1>
              <div className="blogPostMeta">
                <span>{meta.date}</span>
                <div className="blogCardTags">
                  {meta.tags.map((item) => (
                    <span key={item}>#{item}</span>
                  ))}
                </div>
              </div>
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
