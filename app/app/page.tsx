import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

const pillars = [
  "Maintainable Motion API",
  "Dark-first Design Tokens",
  "Performance-aware Parallax",
];

export default function Home() {
  return (
    <main>
      <Section>
        <Container>
          <Reveal>
            <Tag>Motion-ready foundation</Tag>
            <h1 className="hero-title">动效丰富，但依然可维护的工程起点</h1>
            <p className="hero-subtitle">
              首页与作品页优先构建动画能力，博客保持稳态可读。所有复杂动画默认支持 reduced motion，兼顾体验与性能。
            </p>
          </Reveal>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.4rem" }}>
            <Button href="/works">查看 Works</Button>
            <Button href="/blog" variant="ghost">
              进入 Blog
            </Button>
          </div>
          <Divider />
          <Stagger className="grid">
            {pillars.map((item) => (
              <StaggerItem key={item}>
                <Card>{item}</Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section>
        <Container>
          <Parallax>
            <Card>
              <h2 style={{ marginTop: 0 }}>Visual texture</h2>
              <p style={{ marginBottom: 0, color: "var(--text-muted)" }}>
                背景质感基于纯 CSS 渐变与噪点叠层，不依赖外部素材；后续可在 Works 页继续扩展多层景深。
              </p>
            </Card>
          </Parallax>
        </Container>
      </Section>
    </main>
  );
}
