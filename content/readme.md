---
title: SSSSブログ
description: ミニマルでプロフェッショナルなブログデザインのモデルケース
---

# SSSSブログへようこそ

ミニマルでプロフェッショナルなデザインを採用した技術共有ブログです。最新のトレンドとシンプルな美しさを兼ね備えたコンテンツをお届けします。

## 最新記事

```yaml cards
- uid: blog/minimal-design
  width_rem: 18
- uid: blog/typography-tips
  width_rem: 18
- uid: blog/color-psychology
  width_rem: 18
```

## 主要セクション

<div class="section-cards">
  <a href="/blog" class="section-card">
    <h3>ブログ記事</h3>
    <p>デザインとユーザビリティに関する最新記事</p>
  </a>
  
  <a href="/examples" class="section-card">
    <h3>コンポーネント例</h3>
    <p>実装例とコードサンプル</p>
  </a>
  
  <a href="/about" class="section-card">
    <h3>プロフィール</h3>
    <p>ブログの目的と運営者について</p>
  </a>
  
  <a href="/contact" class="section-card">
    <h3>お問い合わせ</h3>
    <p>ご質問・ご提案はこちら</p>
  </a>
</div>

<style>
  .section-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .section-card {
    background-color: rgba(18, 18, 18, 0.7);
    border: 1px solid rgba(138, 115, 85, 0.15);
    border-radius: 8px;
    padding: 1.5rem;
    text-decoration: none;
    color: var(--content-color);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .section-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-color: rgba(138, 115, 85, 0.3);
  }
  
  .section-card h3 {
    margin-top: 0;
    color: var(--front-blue);
  }
  
  .section-card p {
    margin-bottom: 0;
    font-size: 0.95rem;
  }
</style>
