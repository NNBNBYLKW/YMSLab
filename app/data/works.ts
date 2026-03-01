export type WorkMood = "cinematic" | "documentary" | "commercial" | "motion" | "experimental";
export type WorkEffect = "grain" | "glow" | "scanline" | "glitch" | "lightleak" | "parallax-lines" | "none";

export type WorkMedia = {
  type: "video" | "image";
  title: string;
  description: string;
};

export type WorkLink = {
  label: string;
  href: string;
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
  media: WorkMedia[];
  links: WorkLink[];
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
    tags: ["Brand Film", "Color", "Sound Design"],
    excerpt: "以低饱和夜景和慢节奏旁白，讲述城市基础设施背后的温度。",
    cover: {
      kicker: "Brand Film",
      oneLiner: "低饱和夜景 + 慢节奏旁白，强调城市温度。",
    },
    summary: "围绕“看不见的守护”展开的品牌叙事短片，服务于官网首屏与发布会暖场。",
    responsibilities: ["创意方向", "叙事剪辑", "调色与声音设计"],
    stack: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Foley Layering"],
    media: [
      { type: "video", title: "主片 16:9", description: "官网首屏版本，90 秒叙事主线。" },
      { type: "video", title: "竖版 9:16", description: "社媒传播短切版本，保留核心情绪段落。" },
    ],
    links: [
      { label: "Case Notes", href: "#" },
      { label: "Behind the Scene", href: "#" },
    ],
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
    tags: ["Experimental", "Music", "Visual"],
    excerpt: "实验视觉短片，借由微故障语言表达情绪断裂。",
    cover: {
      kicker: "Experimental Visual",
      oneLiner: "声音峰值映射微故障，建立克制但有辨识度的冲突感。",
    },
    summary: "以音乐驱动视觉结构的实验短片，重点在节奏断裂与情绪层递进。",
    responsibilities: ["视觉系统设定", "节奏剪辑", "动态排版"],
    stack: ["After Effects", "TouchDesigner", "Audition", "Custom Noise Shader"],
    media: [
      { type: "video", title: "Festival Cut", description: "展映版，强调沉浸式听觉-视觉联动。" },
      { type: "image", title: "Visual Frames", description: "关键视觉帧，展示微故障设计语言。" },
    ],
    links: [
      { label: "Trailer", href: "#" },
      { label: "Process Log", href: "#" },
    ],
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
    tags: ["Motion", "UI", "Prototype"],
    excerpt: "为 SaaS 产品构建组件级动效语言，统一反馈节奏。",
    cover: {
      kicker: "Product Motion",
      oneLiner: "从按钮到面板的动效原子化，保持一致反馈语法。",
    },
    summary: "为产品团队建立可复用动效规范，提升交互一致性与性能稳定性。",
    responsibilities: ["动效 token 体系", "交互原型", "实现策略评审"],
    stack: ["Figma", "CSS Motion", "WAAPI", "Next.js"],
    media: [
      { type: "video", title: "Component Reel", description: "组件级交互合集，覆盖按钮、面板、通知等。" },
    ],
    links: [{ label: "Design Spec", href: "#" }],
    theme: { accent: "#9e8bff", mood: "motion", effect: "glow" },
    body: [
      "该项目将按钮、面板、提示等交互拆分为 12 组动效原子，统一时长曲线与层级规则。",
      "我们重点控制 transform 与 opacity，避免布局抖动导致的性能问题。",
      "最终输出 token 与示例代码，帮助开发和设计团队同步迭代。",
    ],
  },
  {
    slug: "makers-archive",
    title: "匠人档案",
    year: 2023,
    tags: ["Interview", "Documentary", "Typography"],
    excerpt: "纪录片访谈包装，强调真实肌理与信息可读性。",
    cover: {
      kicker: "Documentary",
      oneLiner: "访谈素材结构化重组，信息层级克制且清晰。",
    },
    summary: "纪录片访谈包装项目，建立可复用字幕与信息层级系统。",
    responsibilities: ["内容结构设计", "字幕系统", "视觉包装"],
    stack: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    media: [{ type: "video", title: "Interview Cut", description: "六位匠人访谈精剪合集。" }],
    links: [{ label: "Series Landing", href: "#" }],
    theme: { accent: "#89d6b7", mood: "documentary", effect: "scanline" },
    body: [
      "项目拍摄了六位来自不同工种的手艺人。我们将字幕系统做成‘注释式层级’，减少抢镜。",
      "画面处理中使用轻微对比拉伸与偏冷色调，保留皮肤细节，避免纪录片常见的过度风格化。",
      "整套包装最终沉淀为模板，供后续系列内容复用。",
    ],
  },
  {
    slug: "spark-launch",
    title: "SPARK 发布开场",
    year: 2025,
    tags: ["Launch", "Product", "Compositing"],
    excerpt: "产品发布会开场片，强调节奏冲击与亮点信息。",
    cover: {
      kicker: "Launch Opener",
      oneLiner: "30 秒强节奏叙事，兼顾现场大屏与直播端效果。",
    },
    summary: "产品发布开场片，兼顾品牌记忆、功能预告与现场冲击力。",
    responsibilities: ["镜头节奏设计", "合成与转场", "多端调色"],
    stack: ["After Effects", "Cinema 4D", "Premiere Pro"],
    media: [{ type: "video", title: "Stage Version", description: "发布会大屏版，支持多分辨率输出。" }],
    links: [{ label: "Launch Recap", href: "#" }],
    theme: { accent: "#ffa45f", mood: "commercial", effect: "lightleak" },
    body: [
      "30 秒开场需要同时完成品牌记忆、产品命名与功能预告。我们采用强节奏分句和高反差构图。",
      "关键帧段落使用‘光泄漏式’转场，让信息切换更自然，不会出现硬切造成的认知中断。",
      "现场版本与直播版本分离调色，保证 LED 大屏和线上播放都能维持视觉冲击。",
    ],
  },
  {
    slug: "plain-language-campaign",
    title: "清晰表达计划",
    year: 2021,
    tags: ["Campaign", "Explainer", "Social"],
    excerpt: "社媒传播向解释短片，以极简视觉突出信息效率。",
    cover: {
      kicker: "Social Explainer",
      oneLiner: "面向移动端的高信息密度短片系统。",
    },
    summary: "社媒解释向短片系列，强调信息组织效率与移动端可读性。",
    responsibilities: ["脚本精简", "视觉规范", "分发适配"],
    stack: ["Premiere Pro", "Figma", "CapCut for Social"],
    media: [{ type: "video", title: "Social Cut", description: "45 秒内核心说明版本。" }],
    links: [{ label: "Campaign Overview", href: "#" }],
    theme: { accent: "#e3e8f2", mood: "commercial", effect: "parallax-lines" },
    body: [
      "该系列每集控制在 45 秒内，面向移动端优先排版。",
      "画面尽量减少装饰性元素，把重点放在信息组织与节奏控制。",
      "发布两周内平均完播率提升约 18%，验证了‘极简表达’在社媒端的有效性。",
    ],
  },
];

export const workTags = Array.from(new Set(works.flatMap((work) => work.tags)));

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}
