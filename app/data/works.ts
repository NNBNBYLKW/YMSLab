export type WorkMood = "cinematic" | "documentary" | "commercial" | "motion" | "experimental";
export type WorkEffect = "grain" | "glow" | "scanline" | "glitch" | "lightleak" | "parallax-lines" | "none";

export type WorkLink = {
  label: string;
  href: string;
};

export type WorkImage = {
  title: string;
  src: string;
  alt: string;
};

export type WorkVideo = {
  title: string;
  src: string;
  type: "local" | "external";
};

export type MediaItem = {
  type: "image" | "video" | "bilibili" | "link";
  title: string;
  url: string;
  description?: string;
};

export type Work = {
  slug: string;
  title: string;
  year: number;
  tags: string[];
  excerpt: string;
  cover: {
    kicker: string;
    oneLiner: string;
  };
  summary: string;
  responsibilities: string[];
  stack: string[];
  links: WorkLink[];
  images: WorkImage[];
  videos: WorkVideo[];
  bilibili?: string;
  media?: MediaItem[];
  theme: {
    accent: string;
    mood: WorkMood;
    effect: WorkEffect;
  };
  body: string[];
};

export const works: Work[] = [
  {
    slug: "city-after-rain",
    title: "雨后之城",
    year: 2024,
    tags: ["品牌短片", "调色", "声音设计"],
    excerpt: "以低饱和夜景和慢节奏旁白，讲述城市基础设施背后的温度。",
    cover: { kicker: "Brand Film", oneLiner: "低饱和夜景 + 慢节奏旁白，强调城市温度。" },
    summary: "围绕“看不见的守护”展开的品牌叙事短片，服务于官网首屏与发布会暖场。",
    responsibilities: ["创意方向", "叙事剪辑", "调色与声音设计"],
    stack: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    links: [
      { label: "项目页面", href: "https://example.com/city-after-rain" },
      { label: "源码仓库", href: "https://github.com/example/city-after-rain" },
      { label: "演示链接", href: "https://demo.example.com/city-after-rain" },
    ],
    images: [
      { title: "雨夜街景", src: "https://picsum.photos/seed/city-rain-1/1200/700", alt: "雨夜反光路面镜头" },
      { title: "人物逆光", src: "https://picsum.photos/seed/city-rain-2/1200/700", alt: "逆光人群氛围镜头" },
    ],
    videos: [
      { title: "主片预告", src: "https://example.com/videos/city-after-rain-trailer.mp4", type: "external" },
      { title: "社媒短版", src: "https://example.com/videos/city-after-rain-social.mp4", type: "external" },
    ],
    bilibili: "https://www.bilibili.com/video/BV1cityafterrain",
    theme: { accent: "#7db4ff", mood: "cinematic", effect: "grain" },
    body: [
      "这支品牌短片围绕‘看不见的守护’展开。镜头选择大量反光路面和逆光人群，让质感集中在湿润空气里。",
      "剪辑上刻意保留呼吸感，段落转场借助环境音提前进入，形成柔和但稳定的情绪推进。",
      "上线后用于官网首屏与发布会暖场版本，分别输出了 16:9、9:16 与无字幕国际版。",
    ],
  },
  {
    slug: "signal-breaker",
    title: "Signal Breaker",
    year: 2025,
    tags: ["实验视觉", "音乐", "动态排版"],
    excerpt: "实验视觉短片，借由微故障语言表达情绪断裂。",
    cover: { kicker: "Experimental Visual", oneLiner: "声音峰值映射微故障，克制但有辨识度。" },
    summary: "以音乐驱动视觉结构的实验短片，重点在节奏断裂与情绪层递进。",
    responsibilities: ["视觉系统设定", "节奏剪辑", "动态排版"],
    stack: ["After Effects", "TouchDesigner", "Audition"],
    links: [
      { label: "项目页面", href: "https://example.com/signal-breaker" },
      { label: "源码仓库", href: "https://github.com/example/signal-breaker" },
      { label: "演示链接", href: "https://demo.example.com/signal-breaker" },
    ],
    images: [
      { title: "故障关键帧", src: "https://picsum.photos/seed/signal-breaker-1/1200/700", alt: "实验视觉关键帧" },
      { title: "文字错位", src: "https://picsum.photos/seed/signal-breaker-2/1200/700", alt: "文字故障效果镜头" },
    ],
    videos: [
      { title: "Festival Cut", src: "https://example.com/videos/signal-breaker-festival.mp4", type: "external" },
    ],
    bilibili: "https://www.bilibili.com/video/BV1signalbreaker",
    theme: { accent: "#ff74bd", mood: "experimental", effect: "glitch" },
    body: [
      "作品将音频采样的突发峰值映射为画面错位，形成‘情绪失真’的叙事手法。",
      "全片保持克制，不在整屏叠加重故障，而是在分割线与小标题上做轻微扰动。",
      "最终展映版本配合现场灯光，形成更强沉浸氛围。",
    ],
  },
  {
    slug: "flow-ui-lab",
    title: "Flow UI Motion Lab",
    year: 2024,
    tags: ["产品动效", "UI", "原型"],
    excerpt: "为 SaaS 产品构建组件级动效语言，统一反馈节奏。",
    cover: { kicker: "Product Motion", oneLiner: "从按钮到面板的动效原子化。" },
    summary: "为产品团队建立可复用动效规范，提升交互一致性与性能稳定性。",
    responsibilities: ["动效 token 体系", "交互原型", "实现策略评审"],
    stack: ["Figma", "CSS Motion", "WAAPI", "Next.js"],
    links: [{ label: "设计规范", href: "https://example.com/flow-ui-lab" }],
    images: [{ title: "组件总览", src: "https://picsum.photos/seed/flow-ui-lab/1200/700", alt: "组件动效总览" }],
    videos: [{ title: "组件演示", src: "https://example.com/videos/flow-ui-lab.mp4", type: "external" }],
    bilibili: "https://www.bilibili.com/video/BV1flowuilab",
    theme: { accent: "#9e8bff", mood: "motion", effect: "glow" },
    body: [
      "该项目将按钮、面板、提示等交互拆分为 12 组动效原子，统一时长曲线与层级规则。",
      "我们重点控制 transform 与 opacity，避免布局抖动导致的性能问题。",
      "最终输出 token 与示例代码，帮助开发和设计团队同步迭代。",
    ],
  },
];

export const workTags = Array.from(new Set(works.flatMap((work) => work.tags)));

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}
