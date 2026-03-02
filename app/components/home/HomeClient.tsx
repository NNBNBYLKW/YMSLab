"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { PointerGlow } from "@/components/motion/PointerGlow";
import { EffectLayer } from "@/components/motion/EffectLayer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getMotionConfig } from "@/lib/motion";

type HomeWork = {
  slug: string;
  title: string;
  year: number;
  excerpt: string;
  tags: string[];
  theme: { accent: string };
};

type HomePost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

export function HomeClient({ recentWorks, featuredPosts }: { recentWorks: HomeWork[]; featuredPosts: HomePost[] }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const motion = getMotionConfig("high", reduceMotion);
  const motto = useMemo(() => "在有限时间里，把每一次表达做得更清晰。", []);
  const workRef = useRef<HTMLElement | null>(null);

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
        setScrollProgress(Math.min(window.scrollY / (h * 0.8), 1));
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [motion.allowScrollLinked]);

  const parallaxY = motion.allowScrollLinked ? -scrollProgress * 26 : 0;
  const heroScale = motion.allowScrollLinked ? 1 - scrollProgress * 0.06 : 1;

  return (
    <main className="homeRoot">
      <PointerGlow enabled={motion.allowMouseFollow} parallaxY={parallaxY} />

      <section className="hero" style={{ transform: `scale(${heroScale}) translate3d(0, ${parallaxY}px, 0)` }}>
        <EffectLayer />
        <p className="eyebrow heroStaggerItem" style={{ animationDelay: `${motion.tokens.stagger.xs}s` }}>中文优先 · 视觉创作与开发</p>
        <h1>
          <span className="heroWord heroStaggerItem" style={{ animationDelay: `${motion.tokens.stagger.sm}s` }}>YMS</span>
          <span className="heroWord heroStaggerItem" style={{ animationDelay: `${motion.tokens.stagger.sm + 0.04}s` }}>Lab</span>
        </h1>
        <p className="heroSub heroStaggerItem" style={{ animationDelay: `${motion.tokens.stagger.md + 0.04}s` }}>
          用克制的高级动效，服务内容表达，而不是喧宾夺主。
        </p>
        <div className="heroCtas heroStaggerItem" style={{ animationDelay: `${motion.tokens.stagger.md + 0.12}s` }}>
          <MagneticButton href="#recent-works" enabled={motion.allowMouseFollow}>近期作品</MagneticButton>
          <MagneticButton href="/blog" enabled={motion.allowMouseFollow} variant="ghost">博客精选</MagneticButton>
        </div>
      </section>

      <Reveal level="medium">
        <section className="section mottoSection" aria-label="One-liner Motto">
          <p>{motto}</p>
        </section>
      </Reveal>

      <Reveal level="high">
        <section id="recent-works" className="section" ref={workRef}>
          <h2>近期作品（Recent Works）</h2>
          <div className="worksGrid">
            {recentWorks.map((work) => (
              <Link key={work.slug} href={`/works/${work.slug}`} className="workCard" style={{ ["--accent" as string]: work.theme.accent }}>
                <p className="workCategory">{work.year}</p>
                <h3>{work.title}</h3>
                <p>{work.excerpt}</p>
                <div className="tags">
                  {work.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal level="low">
        <section className="section">
          <h2>博客精选（Featured Posts）</h2>
          <div className="blogListSimple" role="list">
            {featuredPosts.map((post) => (
              <article className="blogRow" key={post.slug} role="listitem">
                <div className="blogRowMain">
                  <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                  <p>{post.summary}</p>
                  <div className="blogCardTags">
                    {post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                  </div>
                </div>
                <time className="blogRowDate" dateTime={post.date}>{post.date}</time>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
    </main>
  );
}
