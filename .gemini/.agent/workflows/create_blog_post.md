---
description: テンプレートから新しいブログ記事を作成する
---

1. ユーザーに **記事のタイトル** を尋ねてください (例: "STM32のタイマー割り込み入門")。
2. 以下のメタデータについてユーザーに確認してください:
   - **Slug** (例: `stm32-timer-interrupt`。可能であればタイトルから推測してデフォルト値として提示してください)
   - **カテゴリー** (選択肢: `技術解説`, `チュートリアル`, `製品レビュー`, `エッセイ`)
   - **タグ** (カンマ区切り, 例: `DSP, 組み込み, STM32, MATLAB`)
   - **概要 (Description)** (SEO用の短い要約, 最大120文字)

3. 記事ファイルを生成します。
   // turbo
   - パス: `content/blog/{slug}.md`
   - 内容:
     ```markdown
     ---
     title: "{title}"
     slug: "{slug}"
     description: "{description}"
     tags: [{tags_array}]
     image: "/images/thumbnails/sample.png"
     features:
       - 特徴1
       - 特徴2
     ---
     
     # {title}
     
     はじめに...
     
     ## セクション 1
     
     ここに本文を書く...
     ```
   - 注意: `tags` は YAML 配列としてフォーマットしてください (例: `["DSP", "STM32"]`)。

4. ファイルが `content/blog/{slug}.md` に作成されたことをユーザーに通知し、確認を求めてください。
