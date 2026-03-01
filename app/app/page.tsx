"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { works } from "../data/works";
import { Reveal } from "./components/reveal";

const services = ["品牌叙事短片", "发布会视觉包装", "社媒动效内容", "后期剪辑与调色", "声音设计", "内容策略协作"];
const steps = [
  { title: "01 发现", body: "明确品牌目标、受众语境与传播场景，建立视觉方向。" },
  { title: "02 开发", body: "进行脚本、风格帧与动效节奏设计，输出可评审样片。" },
  { title: "03 交付", body: "完成多平台规格导出与发布建议，保证上线一致性。" }
];

function WorkCard({ work, reduceMotion }: { work: (typeof works)[number]; reduceMotion: boolean }) {
  const [transformStyle, setTransformStyle] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  function onMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (reduceMotion || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dx = (x / rect.width - 0.5) * 8;
    const dy = (y / rect.height - 0.5) * -8;
    setTransformStyle(`perspective(1000px) rotateX(${dy}deg) rotateY(${dx}deg) translateY(-4px)`);
  }

  return (
    <a
      href={work.href}
      className="workCard"
      style={{ transform: transformStyle }}
      onMouseMove={onMove}
      onMouseLeave={() => setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg)")}
    >
      <p className="workCategory">{work.category}</p>
      <h3>{work.title}</h3>
      <p>{work.description}</p>
      <div className="tags">
        {work.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </a>
  );
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const heroWords = useMemo(() => ["YMS", "Lab", "Motion"], []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const onScroll = () => {
      const h = window.innerHeight || 1;
      setScrollProgress(Math.min(window.scrollY / (h * 0.85), 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduceMotion]);

  const heroScale = reduceMotion ? 1 : 1 - scrollProgress * 0.1;
  const heroOpacity = reduceMotion ? 1 : 1 - scrollProgress * 0.85;
  const nextOpacity = reduceMotion ? 1 : Math.max(0, Math.min((scrollProgress - 0.16) / 0.45, 1));

  return (
    <main
      className="homeRoot"
      onMouseMove={(e) => {
        if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
        setPointer({ x: e.clientX, y: e.clientY });
      }}
    >
      {!reduceMotion && <div className="cursorGlow" style={{ transform: `translate(${pointer.x}px, ${pointer.y}px)` }} />}

      <section className="hero" style={{ transform: `scale(${heroScale})`, opacity: heroOpacity }}>
        <p className="eyebrow">Independent Visual Studio</p>
        <h1>
          {heroWords.map((word, idx) => (
            <span key={word} style={{ animationDelay: `${idx * 120}ms` }} className="heroWord">
              {word}
            </span>
          ))}
        </h1>
        <p className="heroSub">我们用克制却有记忆点的动态语言，帮助品牌在第一秒建立气质。</p>
        <div className="heroCtas">
          <Link href="#works" className="btn primary">查看作品</Link>
          <Link href="/docs" className="btn ghost">查看博客</Link>
        </div>
      </section>

      <div style={{ opacity: nextOpacity }}>
        <Reveal>
          <section id="works" className="section">
            <h2>精选作品预览</h2>
            <div className="worksGrid">
              {works.map((work) => (
                <WorkCard key={work.title} work={work} reduceMotion={reduceMotion} />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="section">
            <h2>服务能力</h2>
            <div className="pillGrid">
              {services.map((item) => (
                <span className="pill" key={item}>{item}</span>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="section">
            <h2>关于 / 流程</h2>
            <div className="stepGrid">
              {steps.map((step) => (
                <article className="stepCard" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="section">
            <h2>联系</h2>
            <form className="contactForm">
              <input type="text" placeholder="你的称呼" aria-label="你的称呼" />
              <input type="email" placeholder="邮箱" aria-label="邮箱" />
              <textarea placeholder="项目需求（仅 UI 展示，不会提交）" aria-label="项目需求" rows={4} />
              <button type="button" className="btn primary">发送需求</button>
            </form>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
