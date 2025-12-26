# SSS Blog - AI Agent 運用ガイド

## 1. プロジェクト概要
**目的**: Astroフレームワークを使用した個人技術ブログ (SSS blog) の運営
**主要機能**:
- Markdown形式の技術記事公開
- 短編小説コンテンツ
- カテゴリー/タグベースの記事分類
- 高速な静的サイト生成 (SSG)

**ターゲット読者**: 組み込みシステムエンジニア、DSP開発者、自動車業界技術者

---

## 2. 技術スタック
- **フレームワーク**: Astro 5.x (Static Site Generator)
- **言語**: TypeScript, JavaScript, Markdown
- **スタイリング**: Vanilla CSS (Scoped Styles & CSS Variables)
- **パッケージマネージャー**: npm
- **コンテンツ管理**: Content Collections (Astro標準) + content-structure

---

## 3. プロジェクト構造
```
sssstudy/
├── content/                # コンテンツ (Markdown記事)
│   ├── blog/              # ブログ記事
│   ├── stories/           # 短編小説
│   ├── menu.yaml          # メニュー構造定義
│   └── sections.yaml      # セクション定義
├── public/                 # 静的アセット
│   └── images/thumbnails/ # サムネイル画像
├── src/
│   ├── components/        # UIコンポーネント
│   ├── layout/            # ページレイアウト
│   ├── libs/              # ユーティリティ関数
│   └── pages/             # ルーティング
├── integrations/           # ビルド統合スクリプト
├── .agent/workflows/       # AIエージェント用ワークフロー
└── .claude/                # Claude設定
```

---

## 4. 基本コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# ビルド後プレビュー
npm run preview
```

---

## 5. 記事追加方法

### 5.1 ブログ記事の追加

**ファイル配置**: `content/blog/{slug}.md`

**Frontmatter形式**:
```yaml
---
title: "記事タイトル"
slug: "article-slug"
description: "記事の要約 (SEO用、最大120文字)"
tags: ["DSP", "STM32", "組み込み"]
image: /images/thumbnails/{slug}.png
features:
  - 特徴リスト1
  - 特徴リスト2
---
```

**ワークフロー**: `/create_blog_post` コマンドで対話的に作成可能

### 5.2 短編小説の追加

**ファイル配置**: `content/stories/{slug}.md`

**Frontmatter形式**:
```yaml
---
title: "小説タイトル"
slug: "story-slug"
description: "概要"
published_date: 2025-01-01
tags: ["ミステリー", "SF", "ファンタジー"]
image: /images/thumbnails/{slug}.png
features:
  - 特徴1
  - 特徴2
---
```

**ワークフロー**: `/create_story` コマンドで対話的に作成可能

### 5.3 サムネイル画像の追加

**配置先**: `public/images/thumbnails/{slug}.png`
**推奨サイズ**: 1200x630px (OGP最適化)
**ワークフロー**: `/add_thumbnail` コマンドで対話的に追加可能

---

## 6. 重要なファイル

| ファイル | 説明 |
|---------|------|
| `content/menu.yaml` | サイトメニュー構造。autogenerateで各セクションのコンテンツを自動収集 |
| `public/menu.json` | ビルド時に自動生成されるメニューJSON (gitignore済み) |
| `src/pages/index.astro` | トップページ。Latest Articlesセクションを含む |
| `src/pages/blog.astro` | ブログ記事一覧ページ |
| `src/pages/stories.astro` | 短編小説一覧ページ |
| `src/layout/BlogPostLayout.astro` | 記事詳細ページのレイアウト |

---

## 7. コーディング規約

### 全般
- インデントはタブ (2スペース相当)
- セミコロン必須
- 複雑なロジックには日本語コメント必須

### Astroコンポーネント
- ファイル名は PascalCase (`PostCard.astro`)
- Propsは TypeScript で型定義
- CSSはスコープドスタイル + CSS変数を使用

### Markdown記事
- 技術的正確性を最優先
- コードブロックには言語指定必須 (```python など)
- 図表は `/public/images/` 配下に配置

---

## 8. 禁止事項

- **外部CSSフレームワーク禁止** (Bootstrap, Tailwind等) → Vanilla CSS使用
- **jQuery等のレガシーライブラリ禁止** → Vanilla JS/TypeScript使用
- **APIキー・シークレットのハードコード禁止**
- **public/への無秩序なファイル配置禁止** → フォルダ分けを徹底

---

## 9. 利用可能なワークフロー

| コマンド | 説明 |
|----------|------|
| `/create_blog_post` | テンプレートから新しいブログ記事を作成 |
| `/create_story` | テンプレートから新しい短編小説を作成 |
| `/add_thumbnail` | 記事用のサムネイル画像を追加・最適化 |

---

## 10. トラブルシューティング

### 記事がページに表示されない
1. 開発サーバーを再起動 (`Ctrl+C` → `npm run dev`)
2. `public/menu.json` が再生成されることを確認
3. Frontmatterの形式が正しいか確認 (特に `slug` と `title`)

### 画像が表示されない
1. パスが `/images/` から始まっているか確認
2. ファイルが `public/images/` に存在するか確認
3. ファイル名の大文字/小文字が一致しているか確認

---

## 11. Git運用

```bash
# 変更のプルとプッシュ
git pull
git add -A
git commit -m "feat: 記事追加 - {記事タイトル}"
git push
```

**コミットメッセージ規約**:
- `feat:` 新機能/記事追加
- `fix:` バグ修正
- `docs:` ドキュメント更新
- `style:` スタイル変更
