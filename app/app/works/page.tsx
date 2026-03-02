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
          <Reveal level="medium">
            <Tag>Works</Tag>
            <h1 className="hero-title" style={{ marginTop: "0.75rem" }}>作品集</h1>
            <p className="hero-subtitle">中等动效 + 主题特效点缀，重点始终是内容结构与信息可读性。</p>
          </Reveal>

          <WorksIndexClient works={works} tags={workTags} />
        </Container>
      </Section>
    </main>
  );
}
