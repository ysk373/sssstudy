# SSS Blog - Astro Framework Project

## 1. プロジェクト概要
**目的**: Astroフレームワークを使用した個人技術blog(SSS blog)の運営  
**主要機能**:
- Markdown形式の技術記事公開
- カテゴリー/タグベースの記事分類
- RSS/Atom フィード生成
- 高速な静的サイト生成(SSG)

**ターゲット読者**: 組み込みシステムエンジニア、DSP開発者、自動車業界技術者

## 2. 技術スタック
- **フレームワーク**: Astro 4.x (Static Site Generator)
- **言語**: TypeScript, JavaScript, Markdown
- **スタイリング**: Vanilla CSS (Scoped Styles & CSS Variables)
- **パッケージマネージャー**: npm
- **ホスティング**: [Vercel/Netlify/GitHub Pages など指定]
- **コンテンツ管理**: Content Collections (Astro標準)

## 3. プロジェクト構造
```
sssstudy/
├── .github/
│   └── workflows/          # CI/CD設定 (deploy.ymlなど)
├── content/                # コンテンツコレクション (記事データ)
│   ├── admin/             # 管理画面用コンテンツ
│   ├── blog/              # ブログ記事 (Markdown)
│   ├── contact/           # お問い合わせページ用
│   ├── examples/          # サンプル/デモコンテンツ
│   ├── sections/          # セクション定義
│   └── stories/           # 短編小説記事 (Markdown)
├── integrations/           # Astro統合/ビルドスクリプト
├── public/                 # 静的アセット (faviconなど)
├── server/                 # サーバーサイド機能 (検索など)
├── src/                    # ソースコード
│   ├── assets/            # 画像・SVGアセット
│   ├── components/        # UIコンポーネント
│   │   ├── AdminLogin/    # 管理画面ログイン
│   │   ├── AdminSettings/ # 管理設定
│   │   ├── ContactForm/   # 問い合わせフォーム
│   │   ├── diagrams/      # 図解用コンポーネント (ICA/IVA解説など)
│   │   ├── gallery/       # ギャラリー機能
│   │   ├── markdown/      # Markdownレンダリング用 (Code, Cards, etc.)
│   │   ├── panzoom/       # 画像拡大表示
│   │   ├── story/         # 短編小説用コンポーネント
│   │   ├── swiper/        # スライダー
│   │   └── ...
│   ├── layout/            # ページレイアウト
│   │   ├── AppBar.astro
│   │   ├── BlogLayout.astro     # ブログトップ/固定ページ用
│   │   ├── BlogPostLayout.astro # 記事詳細用 (今回修正対象)
│   │   ├── Layout.astro         # ベースレイアウト
│   │   └── colors.css           # グローバルCSS変数
│   ├── libs/              # ユーティリティ関数
│   └── pages/             # ルーティング
│       ├── admin/         # 管理画面ルート
│       ├── api/           # APIエンドポイント
│       ├── [...url].astro # 汎用ダイナミックルート (記事表示)
│       ├── blog.astro     # ブログ一覧
│       ├── index.astro    # トップページ
│       └── stories.astro  # 短編小説一覧
├── user/                   # ユーザーガイド/ドキュメント
├── astro.config.mjs        # Astro設定
├── package.json            # 依存関係定義
├── tsconfig.json           # TypeScript設定
├── docker-compose.yml      # コンテナ構成
└── Dockerfile              # アプリケーションコンテナ
```

## 4. コーディング規約

### Markdown記事のFrontmatter形式
```yaml
---
title: "記事タイトル"
slug: "article-slug"
description: "記事の要約(SEO用)"
tags: ["DSP", "STM32", "組み込み"]
image: "/images/thumbnails/sample.png"
features:
  - "特徴リスト1"
  - "特徴リスト2"
---
```

### Astroコンポーネント規約
- ファイル名はPascalCase (`PostCard.astro`)
- プロップスはTypeScriptで型定義 (`interface Props`)
- CSSはスコープドスタイル(`<style>`)とCSS変数(`var(--Name)`)を使用

### パフォーマンス
- 画像は適切なフォーマット(WebP/SVG)を使用
- ビルド時生成(SSG)を基本とする

## 5. 実行コマンド
- `npm run dev`: 開発サーバー起動
- `npm run build`: 本番ビルド
- `npm run preview`: ビルド後プレビュー
- `npm run server`: サーバーサイド機能のテスト起動

## 6. 現在の開発目標
**直近のタスク**:
- モバイル表示の最適化（フォントサイズ・レイアウト）
- blog記事のカテゴリー表示・整理
- 記事検索機能の実装検討

## 7. 記事作成ガイドライン
- 技術的正確性を最優先
- コードブロックには言語指定(```python`)を必須化
- 図表は`/public/images/`配下に整理して配置
- 専門用語は初出時に簡潔な説明を追加

## 8. SEO最適化ルール
- 全記事に`title`と`description`メタタグ必須
- OGP画像は1200x630pxを推奨
- 構造化データ(JSON-LD)を記事ページに埋め込み

## 9. 禁止事項
- **外部CSSフレームワークの導入** (Bootstrap, Tailwind等) → Vanilla CSS + Scoped Styleで実装
- jQuery等のレガシーライブラリ使用 → Vanilla JS/TypeScript
- `public/`への無秩序なファイル配置 → フォルダ分けを徹底

