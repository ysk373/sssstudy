# コンテンツ追加ガイド

このブログに新しい記事（ブログ記事または短編小説）を追加する手順を説明します。

## 1. ファイルの作成場所

記事の種類に応じて、以下のフォルダにMarkdownファイル（`.md`）を作成してください。

- **ブログ記事**: `content/blog/`
- **短編小説**: `content/stories/`

ファイル名は、記事の内容を表す半角英数字とハイフンを使用してください（例: `my-new-article.md`）。このファイル名がそのままURLの一部になります（例: `/blog/my-new-article`）。

## 2. 記事の構成（Frontmatter）

ファイルの先頭には、記事のメタデータを記述する「Frontmatter」が必要です。`---` で囲まれた部分です。

### ブログ記事の例

```markdown
---
title: 記事のタイトル
slug: my-new-article  # ファイル名と同じにする（拡張子なし）
description: 記事の簡単な説明文（一覧ページやSEOで使用されます）
tags: [タグ1, タグ2, タグ3]
image: /images/thumbnails/my-thumbnail.png  # サムネイル画像のパス
date: 2025-11-30  # 公開日（オプション）
---

# 見出し1

ここから本文をMarkdown形式で記述します。
```

### 短編小説の例

```markdown
---
title: 小説のタイトル
slug: my-new-story
description: 物語のあらすじ
tags: [SF, ファンタジー]
image: /images/thumbnails/story-thumbnail.png
---

# 第一章

本文...
```

## 3. 画像の使用方法

記事で使用する画像（サムネイル含む）は、以下のフォルダに配置してください。

- **画像フォルダ**: `public/images/`
    - サムネイル用: `public/images/thumbnails/` （推奨）

Markdown内での指定方法:
```markdown
![画像の説明](/images/thumbnails/my-thumbnail.png)
```
※ パスは `/images/...` から始めてください（`public` は不要です）。

## 4. 確認方法

ローカル環境でプレビューを確認するには、ターミナルで以下のコマンドを実行します。

```bash
pnpm run dev
```

ブラウザで `http://localhost:3514` にアクセスし、追加した記事が表示されているか確認してください。

## 5. 注意事項

- **Slug（スラッグ）**: `slug` フィールドはURLになります。他の記事と重複しないようにしてください。基本的にはファイル名と同じにすることを推奨します。
- **画像サイズ**: 大きすぎる画像はページの読み込みを遅くします。適切なサイズにリサイズしてから配置してください。
