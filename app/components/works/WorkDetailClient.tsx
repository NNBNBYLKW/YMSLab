"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Work } from "@/data/works";

type WorkDetailClientProps = {
  work: Work;
  prev?: Work;
  next?: Work;
};

const effectCopy: Record<Work["theme"]["effect"], string> = {
  grain: "粒子噪点",
  glow: "柔光边缘",
  scanline: "扫描线层",
  glitch: "轻故障",
  lightleak: "光泄漏",
  none: "无额外特效",
};

export function WorkDetailClient({ work, prev, next }: WorkDetailClientProps) {
  const reduceMotion = useReducedMotion();

  return (
    <article
      className={`workDetailRoot effect-${work.theme.effect}`}
      style={{ ["--accent" as string]: work.theme.accent }}
      key={work.slug}
    >
      <header className="workHero workFadeIn">
        <Reveal>
          <p className="workDetailEyebrow">{work.theme.mood} / {work.year}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1>{work.title}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="workIntro">{work.excerpt}</p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="workHeroMeta">
            <span>特效：{effectCopy[work.theme.effect]}</span>
            <div className="worksCardTags">
              {work.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </header>

      <div className="workContent">
        {work.body.map((paragraph, index) => (
          <Reveal key={`${work.slug}-${index}`} delay={index * 0.06}>
            <section className="workSection">
              <Parallax offset={reduceMotion ? 0 : 20}>
                <h2 className={work.theme.effect === "glitch" ? "glitchHeading" : ""}>章节 {String(index + 1).padStart(2, "0")}</h2>
              </Parallax>
              <p>{paragraph}</p>
            </section>
          </Reveal>
        ))}
      </div>

      <nav className="workPager" aria-label="上一篇下一篇导航">
        {prev ? (
          <Link href={`/works/${prev.slug}`} className="workPagerLink workFadeIn">← 上一篇：{prev.title}</Link>
        ) : <span />}
        {next ? (
          <Link href={`/works/${next.slug}`} className="workPagerLink workFadeIn">下一篇：{next.title} →</Link>
        ) : <span />}
      </nav>
    </article>
  );
}
