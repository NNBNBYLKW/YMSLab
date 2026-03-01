import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

const placeholders = [
  { title: "Interactive Hero", desc: "用于首页首屏的多层渐变 + reveal 动效模块。" },
  { title: "Case Cover", desc: "作品封面卡片动效骨架，支持 hover / viewport 触发。" },
  { title: "Scroll Scene", desc: "轻量滚动视差容器，用 transform 保持高性能。" },
];

export default function WorksPage() {
  return (
    <main>
      <Section>
        <Container>
          <Reveal>
            <Tag>Works</Tag>
            <h1 className="hero-title" style={{ marginTop: "0.75rem" }}>动效实验场</h1>
            <p className="hero-subtitle">这里预留未来作品展示位，先沉淀统一动画抽象，避免页面各自为战。</p>
          </Reveal>
          <Stagger className="grid" delay={0.1}>
            {placeholders.map((item) => (
              <StaggerItem key={item.title}>
                <Card>
                  <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                  <p style={{ marginBottom: 0, color: "var(--text-muted)" }}>{item.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </main>
  );
}
