---
description: テンプレートから新しい短編小説を作成する
---

1. ユーザーに **小説のタイトル** を尋ねてください (例: "デジタルの夢")。
2. 以下のメタデータについてユーザーに確認してください:
   - **Slug** (例: `digital-dream`。可能であればタイトルから推測してデフォルト値として提示)
   - **ジャンル (genre)** (配列形式, 例: `SF, ミステリー, ファンタジー, ホラー`)
   - **タグ** (カンマ区切り, 例: `プログラミング, AI, 近未来`)
   - **概要 (Description)** (短い要約)
   - **読了時間 (reading_time)** (例: `8分`)

3. 小説ファイルを生成します。
   // turbo
   - パス: `content/stories/{slug}.md`
   - 内容:
     ```markdown
     ---
     title: "{title}"
     slug: "{slug}"
     description: "{description}"
     genre: [{genre_array}]
     tags: [{tags_array}]
     reading_time: "{reading_time}"
     published_date: {today_date}
     image: /images/thumbnails/{slug}.png
     features:
       - 特徴1
       - 特徴2
       - 特徴3
     ---
     
     # {title}
     
     ## 第1章：{chapter_title}
     
     ここに本文を書く...
     
     ---
     
     **読了時間: 約{reading_time}**
     ```
   - 注意: `genre` と `tags` は YAML 配列としてフォーマットしてください。

4. ファイルが `content/stories/{slug}.md` に作成されたことをユーザーに通知し、確認を求めてください。
