"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getMotionConfig } from "@/lib/motion";
import type { WorkMeta } from "@/lib/works";
import { MediaRenderer } from "@/components/works/MediaRenderer";

type WorkDetailClientProps = {
  work: WorkMeta;
  html: string;
  prev?: WorkMeta;
  next?: WorkMeta;
};

function isBilibiliLink(label: string, url: string) {
  return /b站|bilibili|视频|合集/i.test(label) || /bilibili\.com/i.test(url);
}

export function WorkDetailClient({ work, html, prev, next }: WorkDetailClientProps) {
  const reduceMotion = useReducedMotion();
  const motion = getMotionConfig("medium", reduceMotion);

  const bilibiliLinks = work.links.filter((link) => isBilibiliLink(link.label, link.url));
  const normalLinks = work.links.filter((link) => !isBilibiliLink(link.label, link.url));

  return (
    <article className="workDetailRoot" key={work.slug}>
      <header className="workHero workFadeIn">
        <Reveal><p className="workDetailEyebrow">{work.category} / {work.date}</p></Reveal>
        <Reveal delay={0.06}><h1>{work.title}</h1></Reveal>
        <Reveal delay={0.12}><p className="workIntro">{work.summary}</p></Reveal>
        <Reveal delay={0.18}>
          <div className="workHeroMeta">
            <span>作品标签</span>
            <div className="worksCardTags">{work.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </Reveal>
        {work.cover.src ? (
          <Reveal delay={0.24}>
            <figure className="workCoverFigure">
              <img src={work.cover.src} alt={work.cover.alt} loading="eager" />
            </figure>
          </Reveal>
        ) : null}
      </header>

      <div className="workStructuredGrid">
        <Reveal><section className="workInfoCard"><h2>职责</h2><ul>{work.roles.map((item) => <li key={item}>{item}</li>)}</ul></section></Reveal>
        <Reveal delay={motion.staggerDelay}><section className="workInfoCard"><h2>技术栈</h2><div className="worksCardTags">{work.stack.map((item) => <span key={item}>{item}</span>)}</div></section></Reveal>

        <Reveal delay={motion.staggerDelay * 2}>
          <section className="workInfoCard">
            <h2>链接</h2>
            <ul className="workLinks">
              {normalLinks.map((item) => (<li key={item.url}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.label}</a></li>))}
            </ul>
            {bilibiliLinks.length > 0 ? (
              <div className="bilibiliLinkGroup" aria-label="B站相关链接">
                {bilibiliLinks.map((item) => (
                  <a className="bilibiliLinkCard" href={item.url} target="_blank" rel="noopener noreferrer" key={item.url}>
                    <span className="bilibiliLinkIcon" aria-hidden>▶</span>
                    <span>{item.label}</span>
                    <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            ) : null}
          </section>
        </Reveal>

        <Reveal delay={motion.staggerDelay * 3}>
          <MediaRenderer media={work.media} />
        </Reveal>
      </div>

      <article className="blogProse" dangerouslySetInnerHTML={{ __html: html }} />

      <nav className="workPager" aria-label="上一篇下一篇导航">
        {prev ? (<Link href={`/works/${prev.slug}`} className="workPagerLink workFadeIn">← 上一篇：{prev.title}</Link>) : <span />}
        {next ? (<Link href={`/works/${next.slug}`} className="workPagerLink workFadeIn">下一篇：{next.title} →</Link>) : <span />}
      </nav>
    </article>
  );
}
