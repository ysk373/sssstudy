# プロジェクト構造

## 技術スタック
- **フレームワーク**: Astro 5.x (Static Site Generator)
- **言語**: TypeScript, JavaScript, Markdown
- **スタイリング**: Vanilla CSS (Scoped Styles & CSS Variables)
- **パッケージマネージャー**: npm

## ディレクトリ構造

```
sssstudy/
├── content/                # コンテンツ (Markdown)
│   ├── blog/              # ブログ記事
│   ├── stories/           # 短編小説
│   └── menu.yaml          # メニュー構造
├── public/                 # 静的アセット
│   └── images/thumbnails/ # サムネイル画像
├── src/
│   ├── components/        # UIコンポーネント
│   ├── layout/            # ページレイアウト
│   ├── libs/              # ユーティリティ
│   └── pages/             # ルーティング
├── integrations/           # ビルド統合
└── .claude/                # Claude設定・スキル
```

## 重要なファイル

| ファイル | 説明 |
|----------|------|
| `content/menu.yaml` | サイトメニュー構造 |
| `src/pages/index.astro` | トップページ |
| `src/pages/blog.astro` | ブログ一覧 |
| `src/pages/stories.astro` | 短編小説一覧 |

## 基本コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run preview  # ビルド後プレビュー
```

## コーディング規約

### 禁止事項
- 外部CSSフレームワーク (Bootstrap, Tailwind)
- jQuery等のレガシーライブラリ
- APIキー・シークレットのハードコード

### 推奨事項
- インデントはタブ (2スペース相当)
- セミコロン必須
- 複雑なロジックには日本語コメント

## トラブルシューティング

### 記事が表示されない
1. 開発サーバーを再起動
2. Frontmatterの形式を確認
3. slugが正しいか確認

### 画像が表示されない
1. パスが `/images/` から始まるか確認
2. ファイルが `public/` に存在するか確認
