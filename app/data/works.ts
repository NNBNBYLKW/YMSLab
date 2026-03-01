export type Work = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
};

export const works: Work[] = [
  {
    title: "品牌主视觉短片",
    category: "Motion / Brand Film",
    description: "以节奏化剪辑与图形转场完成 30 秒品牌叙事，适配官网与社媒双端发布。",
    tags: ["Direction", "Edit", "Sound"],
    href: "/docs"
  },
  {
    title: "科技产品发布开场",
    category: "Launch / CG Integration",
    description: "结合实拍与轻量 CG 合成，构建产品亮点的沉浸式开场视觉。",
    tags: ["VFX", "Compositing", "Color"],
    href: "/docs"
  },
  {
    title: "纪录片风格访谈包装",
    category: "Documentary / Title Package",
    description: "通过克制的字幕系统与信息图动效，提升人物叙事清晰度与观感层次。",
    tags: ["Typography", "Graphics", "Story"],
    href: "/docs"
  }
];
