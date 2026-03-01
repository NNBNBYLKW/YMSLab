import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

export default function NotFoundPage() {
  return (
    <main>
      <Section>
        <Container>
          <div className="notFoundCard">
            <Tag>404</Tag>
            <h1 className="hero-title" style={{ marginTop: "0.75rem" }}>页面未找到</h1>
            <p className="hero-subtitle">你访问的内容可能已移动或不存在。保持极简，继续探索 YMS Lab。</p>
            <Link href="/" className="btn ghost">返回首页</Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
