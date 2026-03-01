"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { works } from "../data/works";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getMotionConfig } from "@/lib/motion";
import { EffectLayer } from "@/components/motion/EffectLayer";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { PointerGlow } from "@/components/motion/PointerGlow";

const services = ["品牌叙事短片", "发布会视觉包装", "社媒动效内容", "后期剪辑与调色", "声音设计", "内容策略协作"];
const steps = [
  { title: "01 发现", body: "明确品牌目标、受众语境与传播场景，建立视觉方向。" },
  { title: "02 开发", body: "进行脚本、风格帧与动效节奏设计，输出可评审样片。" },
  { title: "03 交付", body: "完成多平台规格导出与发布建议，保证上线一致性。" }
];

function WorkCard({ work, reduceMotion }: { work: (typeof works)[number]; reduceMotion: boolean }) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);

  useEffect(() => {
    const animate = () => {
      const easing = hoveringRef.current ? 0.24 : 0.16;
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      currentRef.current.x += dx * easing;
      currentRef.current.y += dy * easing;

      const node = cardRef.current;
      if (node) {
        node.style.setProperty("--tilt-x", `${currentRef.current.x.toFixed(2)}deg`);
        node.style.setProperty("--tilt-y", `${(-currentRef.current.y).toFixed(2)}deg`);
        node.style.setProperty("--sheen-opacity", hoveringRef.current ? "0.7" : "0");
      }

      const closeToZero = Math.abs(currentRef.current.x) < 0.04 && Math.abs(currentRef.current.y) < 0.04;
      if (!hoveringRef.current && closeToZero) {
        currentRef.current = { x: 0, y: 0 };
        if (node) {
          node.style.setProperty("--tilt-x", "0deg");
          node.style.setProperty("--tilt-y", "0deg");
          node.style.setProperty("--sheen-opacity", "0");
          node.style.setProperty("--sheen-x", "50%");
          node.style.setProperty("--sheen-y", "50%");
        }
        rafRef.current = null;
        return;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(animate);
    };

    const node = cardRef.current;
    if (!node) return;

    const onMove = (event: MouseEvent) => {
      if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const nx = x / rect.width - 0.5;
      const ny = y / rect.height - 0.5;
      hoveringRef.current = true;
      targetRef.current = { x: nx * 8, y: ny * 8 };
      node.style.setProperty("--sheen-x", `${(x / rect.width) * 100}%`);
      node.style.setProperty("--sheen-y", `${(y / rect.height) * 100}%`);
      startLoop();
    };

    const onLeave = () => {
      hoveringRef.current = false;
      targetRef.current = { x: 0, y: 0 };
      startLoop();
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [reduceMotion]);

  return (
    <a
      ref={cardRef}
      href={`/works/${work.slug}`}
      className="workCard"
      style={{ ["--accent" as string]: work.theme.accent }}
    >
      <div className="workCardSheen" aria-hidden />
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
      <PointerGlow enabled={motion.allowMouseFollow} parallaxY={parallaxY} />

      <section className="hero" style={{ transform: `scale(${heroScale}) translate3d(0, ${parallaxY}px, 0)`, opacity: heroOpacity }}>
        <EffectLayer />

        <p className="eyebrow heroStaggerItem" style={{ animationDelay: `${motion.tokens.stagger.xs}s` }}>Independent Visual Studio · Since 2021</p>
        <h1>
          {heroWords.map((word, idx) => (
            <span key={word} style={{ animationDelay: `${idx * motion.tokens.stagger.sm}s` }} className="heroWord heroStaggerItem">
              {word}
            </span>
          ))}
        </h1>
        <p className="heroSub heroStaggerItem" style={{ animationDelay: `${motion.tokens.stagger.md + 0.04}s` }}>电影工业感的叙事视觉与后期语言，让品牌画面在第一秒建立可信度与质感。</p>
        <div className="heroCtas heroStaggerItem" style={{ animationDelay: `${motion.tokens.stagger.md + 0.1}s` }}>
          <MagneticButton href="#works" variant="primary" enabled={motion.allowMouseFollow}>查看作品</MagneticButton>
          <MagneticButton href="/blog" variant="ghost" enabled={motion.allowMouseFollow}>阅读博客</MagneticButton>
        </div>

        <div className="heroTicker heroStaggerItem" style={{ animationDelay: `${motion.tokens.stagger.md + 0.16}s` }} aria-hidden>
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
