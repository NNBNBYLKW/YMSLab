"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getMotionConfig } from "@/lib/motion";
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
  "parallax-lines": "视差线层",
  none: "无额外特效",
};

export function WorkDetailClient({ work, prev, next }: WorkDetailClientProps) {
  const reduceMotion = useReducedMotion();
  const motion = getMotionConfig("medium", reduceMotion);

  return (
    <article className={`workDetailRoot effect-${work.theme.effect}`} style={{ ["--accent" as string]: work.theme.accent }} key={work.slug}>
      <header className="workHero workFadeIn">
        <Reveal><p className="workDetailEyebrow">{work.theme.mood} / {work.year}</p></Reveal>
        <Reveal delay={0.06}><h1>{work.title}</h1></Reveal>
        <Reveal delay={0.12}><p className="workIntro">{work.summary}</p></Reveal>
        <Reveal delay={0.18}>
          <div className="workHeroMeta">
            <span>主题特效：{effectCopy[work.theme.effect]}</span>
            <div className="worksCardTags">{work.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </Reveal>
      </header>

      <div className="workStructuredGrid">
        <Reveal><section className="workInfoCard"><h2>职责</h2><ul>{work.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></section></Reveal>
        <Reveal delay={motion.staggerDelay}><section className="workInfoCard"><h2>技术栈</h2><div className="worksCardTags">{work.stack.map((item) => <span key={item}>{item}</span>)}</div></section></Reveal>

        <Reveal delay={motion.staggerDelay * 2}>
          <section className="workInfoCard">
            <h2>链接</h2>
            <ul className="workLinks">
              {work.links.map((item) => (<li key={item.label}><a href={item.href} target="_blank" rel="noreferrer">{item.label}</a></li>))}
              {work.bilibili ? <li><a href={work.bilibili} target="_blank" rel="noreferrer">Bilibili</a></li> : null}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={motion.staggerDelay * 3}>
          <section className="workInfoCard">
            <h2>图片</h2>
            <div className="workMediaGrid">
              {work.images.map((image) => (
                <figure key={image.src} className="workMediaCard">
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <figcaption>{image.title}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={motion.staggerDelay * 4}>
          <section className="workInfoCard">
            <h2>视频</h2>
            <ul>
              {work.videos.map((item) => (
                <li key={item.src}><strong>{item.title}</strong><p>{item.type === "local" ? "本地视频" : "外链视频"}：{item.src}</p></li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      <div className="workContent">
        {work.body.map((paragraph, index) => (
          <Reveal key={`${work.slug}-${index}`} delay={index * 0.06}>
            <section className="workSection">
              <h2 className={work.theme.effect === "glitch" && motion.allowGlitch ? "glitchHeading" : ""}>章节 {String(index + 1).padStart(2, "0")}</h2>
              <p>{paragraph}</p>
            </section>
          </Reveal>
        ))}
      </div>

      <nav className="workPager" aria-label="上一篇下一篇导航">
        {prev ? (<Link href={`/works/${prev.slug}`} className="workPagerLink workFadeIn">← 上一篇：{prev.title}</Link>) : <span />}
        {next ? (<Link href={`/works/${next.slug}`} className="workPagerLink workFadeIn">下一篇：{next.title} →</Link>) : <span />}
      </nav>
    </article>
  );
}
