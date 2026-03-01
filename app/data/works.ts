export type WorkMood = "cinematic" | "documentary" | "commercial" | "motion" | "experimental";
export type WorkEffect = "grain" | "glow" | "scanline" | "glitch" | "lightleak" | "none";

export type Work = {
  slug: string;
  title: string;
  year: number;
  tags: string[];
  excerpt: string;
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
    theme: { accent: "#7db4ff", mood: "cinematic", effect: "grain" },
    body: [
      "这支品牌短片围绕‘看不见的守护’展开。镜头选择大量反光路面和逆光人群，让质感集中在湿润空气里。",
      "剪辑上刻意保留呼吸感，段落转场借助环境音提前进入，形成柔和但稳定的情绪推进。",
      "上线后用于官网首屏与发布会暖场版本，分别输出了 16:9、9:16 与无字幕国际版。",
    ],
  },
  {
    slug: "makers-archive",
    title: "匠人档案",
    year: 2023,
    tags: ["Interview", "Documentary", "Typography"],
    excerpt: "纪录片访谈包装，强调真实肌理与信息可读性。",
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
    theme: { accent: "#ffa45f", mood: "commercial", effect: "lightleak" },
    body: [
      "30 秒开场需要同时完成品牌记忆、产品命名与功能预告。我们采用强节奏分句和高反差构图。",
      "关键帧段落使用‘光泄漏式’转场，让信息切换更自然，不会出现硬切造成的认知中断。",
      "现场版本与直播版本分离调色，保证 LED 大屏和线上播放都能维持视觉冲击。",
    ],
  },
  {
    slug: "flow-ui-lab",
    title: "Flow UI Motion Lab",
    year: 2024,
    tags: ["Motion", "UI", "Prototype"],
    excerpt: "为 SaaS 产品构建组件级动效语言，统一反馈节奏。",
    theme: { accent: "#9e8bff", mood: "motion", effect: "glow" },
    body: [
      "该项目将按钮、面板、提示等交互拆分为 12 组动效原子，统一时长曲线与层级规则。",
      "我们重点控制 transform 与 opacity，避免布局抖动导致的性能问题。",
      "最终输出 token 与示例代码，帮助开发和设计团队同步迭代。",
    ],
  },
  {
    slug: "signal-breaker",
    title: "Signal Breaker",
    year: 2022,
    tags: ["Experimental", "Music", "Visual"],
    excerpt: "实验视觉短片，借由故障语言表达情绪断裂。",
    theme: { accent: "#ff74bd", mood: "experimental", effect: "glitch" },
    body: [
      "作品将音频采样的突发峰值映射为画面错位，形成‘情绪失真’的叙事手法。",
      "全片保持克制，不在整屏叠加重故障，而是在分割线与小标题上做轻微扰动。",
      "最终展映版本配合现场灯光，形成更强沉浸氛围。",
    ],
  },
  {
    slug: "plain-language-campaign",
    title: "清晰表达计划",
    year: 2021,
    tags: ["Campaign", "Explainer", "Social"],
    excerpt: "社媒传播向解释短片，以极简视觉突出信息效率。",
    theme: { accent: "#e3e8f2", mood: "commercial", effect: "none" },
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
