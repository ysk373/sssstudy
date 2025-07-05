---
title: SSSSブログ
description: ミニマルでプロフェッショナルなブログデザインのモデルケース
---

import SectionCards from '@/components/markdown/cards/SectionCards.astro'

# 30代一般人の備忘録

株式、旅行、技術など幅広いコンテンツを備忘録として残していきます。

## 最新記事

```yaml cards
- uid: blog/minimal-design
  width_rem: 18
- uid: blog/typography-tips
  width_rem: 18
- uid: blog/color-psychology
  width_rem: 18
```

## 主要セクション

<SectionCards code={`- name: "ブログ記事"
  description: "技術とデザインに関する知見を共有"
  link: "/blog"
  icon: "📝"
  count: "8"
  label: "記事"

- name: "短編小説"
  description: "技術と創作の融合、新たなストーリーの世界"
  link: "/stories"
  icon: "📚"
  count: "2"
  label: "作品"`} dirpath="" />
