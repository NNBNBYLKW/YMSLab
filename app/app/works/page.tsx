import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { works, workTags } from "@/data/works";
import { WorksIndexClient } from "@/components/works/WorksIndexClient";

export default function WorksPage() {
  return (
    <main>
      <Section>
        <Container>
          <Reveal>
            <Tag>Works</Tag>
            <h1 className="hero-title" style={{ marginTop: "0.75rem" }}>作品集</h1>
            <p className="hero-subtitle">按主题浏览案例；每个项目页都会根据 mood / effect 呈现轻量特效。</p>
          </Reveal>

          <WorksIndexClient works={works} tags={workTags} />
        </Container>
      </Section>
    </main>
  );
}
