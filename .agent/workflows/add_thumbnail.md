---
description: 記事用のサムネイル画像を追加・最適化する
---

1. ユーザーに以下を確認してください:
   - **画像ファイルのパス** (ローカルの画像ファイル、例: `C:\Users\...\image.png`)
   - **保存先のファイル名** (例: `my-article.png` → `/images/thumbnails/my-article.png` に保存)
   - **画像の種類** (選択肢: `blog記事用`, `short story用`, `その他`)

2. 画像を処理します。
   // turbo
   - 元画像を `public/images/thumbnails/{filename}` にコピー
   - 推奨サイズ: 1200x630px (OGP推奨サイズ)
   - WebP形式への変換を検討（ファイルサイズ削減）

3. 画像の配置を確認します。
   // turbo
   - コマンド: `ls public/images/thumbnails/` で配置を確認
   - Markdownでの参照例: `image: /images/thumbnails/{filename}`

4. 以下をユーザーに通知してください:
   - 画像が `/images/thumbnails/{filename}` に配置されたこと
   - Frontmatterでの参照方法:
     ```yaml
     image: /images/thumbnails/{filename}
     ```
   - OGP最適化には 1200x630px を推奨すること
