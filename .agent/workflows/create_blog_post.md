---
description: Create a new blog post from a template
---

1. Ask the user for the **Article Title** (e.g., "STM32のタイマー割り込み入門").
2. Ask the user for the following metadata:
   - **Slug** (e.g., `stm32-timer-interrupt`, default to derived from title if possible)
   - **Category** (Choices: `技術解説`, `チュートリアル`, `製品レビュー`, `エッセイ`)
   - **Tags** (Comma separated, e.g., `DSP, 組み込み, STM32, MATLAB`)
   - **Description** (Short summary for SEO, max 120 chars)

3. Generate the article file.
   // turbo
   - Path: `content/blog/{slug}.md`
   - Content:
     ```markdown
     ---
     title: "{title}"
     slug: "{slug}"
     description: "{description}"
     tags: [{tags_array}]
     image: "/images/thumbnails/sample.png"
     features:
       - Feature 1
       - Feature 2
     ---
     
     # {title}
     
     Introduction...
     
     ## Section 1
     
     Content...
     ```
   - Note: Ensure `tags` are formatted as a YAML array (e.g., `["DSP", "STM32"]`).

4. Notify the user that the file has been created at `content/blog/{slug}.md` and ask them to review it.
