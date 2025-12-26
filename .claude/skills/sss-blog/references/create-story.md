# 短編小説作成

## 概要
SSS Blogに新しい短編小説を追加する手順です。

## 必要情報

ユーザーに確認する項目:
- **小説タイトル** (必須): 例「デジタルの夢」
- **Slug** (必須): URL用。タイトルから推測して提案。例: `digital-dream`
- **概要** (必須): 短い要約
- **ジャンル** (必須): 例: `SF, ミステリー, ファンタジー`
- **タグ** (任意): 例: `プログラミング, AI, 近未来`

## ファイル作成

**パス**: `content/stories/{slug}.md`

**テンプレート**:
```markdown
---
title: "{title}"
slug: "{slug}"
description: "{description}"
published_date: {YYYY-MM-DD}
tags: ["{tag1}", "{tag2}", "{tag3}"]
image: /images/thumbnails/{slug}.png
features:
  - 特徴1
  - 特徴2
---

# {title}

## プロローグ

ここに導入部を書く...

## 第1章

物語の本文...

## エピローグ

結末...
```

## 注意事項
- `published_date` は作成日を `YYYY-MM-DD` 形式で記載
- `tags` はYAML配列形式
- サムネイル画像は `public/images/thumbnails/{slug}.png` に配置が必要

## 完了報告
- 作成したファイルパス
- 次のステップ（サムネイル追加、本文執筆など）
