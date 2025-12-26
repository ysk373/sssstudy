# ブログ記事作成

## 概要
SSS Blogに新しいブログ記事を追加する手順です。

## 必要情報

ユーザーに確認する項目:
- **記事タイトル** (必須): 例「STM32のタイマー割り込み入門」
- **Slug** (必須): URL用。タイトルから推測して提案。例: `stm32-timer-interrupt`
- **概要** (必須): SEO用、最大120文字
- **タグ** (必須): カンマ区切り。例: `DSP, 組み込み, STM32`

## ファイル作成

**パス**: `content/blog/{slug}.md`

**テンプレート**:
```markdown
---
title: "{title}"
slug: "{slug}"
description: "{description}"
tags: ["{tag1}", "{tag2}", "{tag3}"]
image: /images/thumbnails/{slug}.png
features:
  - 特徴1
  - 特徴2
---

# {title}

はじめに...

## セクション 1

ここに本文を書く...

## まとめ

```

## 注意事項
- `tags` はYAML配列形式: `["DSP", "STM32"]`
- サムネイル画像は `public/images/thumbnails/{slug}.png` に配置が必要
- 記事追加後は開発サーバーの再起動を推奨

## 完了報告
- 作成したファイルパス
- 次のステップ（サムネイル追加など）
