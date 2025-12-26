# サムネイル画像追加

## 概要
SSS Blogの記事に使用するサムネイル画像を配置する手順です。

## 必要情報

ユーザーに確認する項目:
- **元画像のパス** (必須): ローカルの画像ファイルパス
- **保存先ファイル名** (必須): 例: `my-article.png`
- **対象記事のSlug** (任意): 関連する記事がある場合

## 画像配置

**保存先**: `public/images/thumbnails/{filename}`

**推奨仕様**:
- サイズ: 1200x630px (OGP推奨)
- 形式: PNG または WebP
- アスペクト比: 1.91:1

## 確認コマンド
```bash
ls public/images/thumbnails/
```

## Frontmatterでの参照
```yaml
image: /images/thumbnails/{filename}
```

## 注意事項
- ファイル名は小文字とハイフンを使用
- 既存ファイルの上書きに注意
- 画像が大きすぎる場合はリサイズを推奨

## 完了報告
- 画像の配置先パス
- Frontmatterでの参照方法
