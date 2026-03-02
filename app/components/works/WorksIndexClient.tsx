"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getMotionConfig } from "@/lib/motion";
import type { Work } from "@/data/works";

type WorksIndexClientProps = {
  works: Work[];
  tags: string[];
};

export function WorksIndexClient({ works, tags }: WorksIndexClientProps) {
  const [activeTag, setActiveTag] = useState<string>("全部");
  const reduceMotion = useReducedMotion();
  const motion = getMotionConfig("medium", reduceMotion);

  const filtered = useMemo(() => {
    if (activeTag === "全部") return works;
    return works.filter((work) => work.tags.includes(activeTag));
  }, [activeTag, works]);

  return (
    <>
      <div className="worksFilters" role="tablist" aria-label="作品标签过滤">
        {["全部", ...tags].map((tag) => {
          const active = activeTag === tag;
          return (
            <button type="button" role="tab" aria-selected={active} key={tag} className={`worksFilterPill ${active ? "is-active" : ""}`.trim()} onClick={() => setActiveTag(tag)}>
              {tag}
            </button>
          );
        })}
      </div>

      {works.length === 0 ? (
        <div className="emptyState">暂无作品，稍后会更新精选案例。</div>
      ) : filtered.length === 0 ? (
        <div className="emptyState">当前筛选下暂无结果，试试其他标签。</div>
      ) : (
        <Stagger className="worksListGrid" delay={0.08} level="medium" stagger={motion.staggerDelay} key={activeTag}>
          {filtered.map((work) => (
            <StaggerItem key={work.slug}>
              <Link href={`/works/${work.slug}`} className={`worksListCard worksListCard-${work.theme.effect}`} style={{ ["--accent" as string]: work.theme.accent }}>
                <div className="worksListCover" aria-hidden>
                  <span>{work.cover.kicker}</span>
                  <p>{work.cover.oneLiner}</p>
                </div>
                <div className="worksListMeta"><span>{work.theme.mood}</span><span>{work.year}</span></div>
                <h3>{work.title}</h3>
                <p>{work.excerpt}</p>
                <div className="worksCardTags">{work.tags.map((tag) => <span key={`${work.slug}-${tag}`}>{tag}</span>)}</div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </>
  );
}
