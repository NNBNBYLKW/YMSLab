import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { WorksIndexClient } from "@/components/works/WorksIndexClient";
import { getAllWorks } from "@/lib/works";

export default async function WorksPage() {
  const works = await getAllWorks();
  const tags = Array.from(new Set(works.flatMap((work) => work.tags)));

  return (
    <main>
      <Section>
        <Container>
          <Reveal level="medium">
            <Tag>Works</Tag>
            <h1 className="hero-title" style={{ marginTop: "0.75rem" }}>作品集</h1>
            <p className="hero-subtitle">像写博客一样维护作品集，通过 Markdown 发布并自动生成详情页。</p>
          </Reveal>

          <WorksIndexClient works={works} tags={tags} />
        </Container>
      </Section>
    </main>
  );
}
