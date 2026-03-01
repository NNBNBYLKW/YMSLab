"use client";

import { useEffect, useMemo, useState } from "react";
import { works } from "../data/works";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getMotionConfig } from "@/lib/motion";
import { EffectLayer } from "@/components/motion/EffectLayer";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParallaxGlow } from "@/components/motion/ParallaxGlow";

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
      href={`/works/${work.slug}`}
      className="workCard"
      style={{ transform: transformStyle, ["--accent" as string]: work.theme.accent }}
      onMouseMove={onMove}
      onMouseLeave={() => setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg)")}
    >
      <p className="workCategory">{work.theme.mood} / {work.year}</p>
      <h3>{work.title}</h3>
      <p>{work.excerpt}</p>
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
  const reduceMotion = useReducedMotion();
  const heroWords = useMemo(() => ["YMS", "Lab", "Motion"], []);
  const motion = getMotionConfig("high", reduceMotion);

  useEffect(() => {
    if (!motion.allowScrollLinked) {
      setScrollProgress(0);
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const h = window.innerHeight || 1;
        setScrollProgress(Math.min(window.scrollY / (h * 0.85), 1));
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [motion.allowScrollLinked]);

  const heroScale = motion.allowScrollLinked ? 1 - scrollProgress * 0.08 : 1;
  const heroOpacity = motion.allowScrollLinked ? 1 - scrollProgress * 0.78 : 1;
  const nextOpacity = motion.allowScrollLinked ? Math.max(0, Math.min((scrollProgress - 0.14) / 0.5, 1)) : 1;
  const parallaxY = motion.allowScrollLinked ? -scrollProgress * 34 : 0;

  return (
    <main className="homeRoot">
      <ParallaxGlow enabled={motion.allowMouseFollow} parallaxY={parallaxY} />

      <section className="hero" style={{ transform: `scale(${heroScale}) translate3d(0, ${parallaxY}px, 0)`, opacity: heroOpacity }}>
        <EffectLayer />

        <p className="eyebrow">Independent Visual Studio · Since 2021</p>
        <h1>
          {heroWords.map((word, idx) => (
            <span key={word} style={{ animationDelay: `${idx * 120}ms` }} className="heroWord">
              {word}
            </span>
          ))}
        </h1>
        <p className="heroSub">电影化叙事 + 数字质感材质，让品牌画面在第一秒建立气质与节奏。</p>
        <div className="heroCtas">
          <MagneticButton href="#works" variant="primary" enabled={motion.allowMouseFollow}>查看作品</MagneticButton>
          <MagneticButton href="/blog" variant="ghost" enabled={motion.allowMouseFollow}>阅读博客</MagneticButton>
        </div>

        <div className="heroTicker" aria-hidden>
          <span>Direction</span>
          <span>Visual Rhythm</span>
          <span>Color Script</span>
          <span>Story Arc</span>
          <span>Sound Driven Cut</span>
        </div>
      </section>

      <div style={{ opacity: nextOpacity }}>
        <Reveal level="high">
          <section id="works" className="section">
            <h2>精选作品预览</h2>
            <div className="worksGrid">
              {works.map((work) => (
                <WorkCard key={work.title} work={work} reduceMotion={reduceMotion} />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal level="high">
          <section className="section">
            <h2>服务能力</h2>
            <div className="pillGrid">
              {services.map((item) => (
                <span className="pill" key={item}>{item}</span>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal level="high">
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

        <Reveal level="high">
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
