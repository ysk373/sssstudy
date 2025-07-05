// 小説のメタデータ管理とタグ付けシステム

/**
 * 利用可能なジャンル一覧
 */
export const STORY_GENRES = {
  HORROR: 'ホラー',
  MYSTERY: 'ミステリー',
  SCIFI: 'SF',
  ROMANCE: 'ロマンス',
  FANTASY: 'ファンタジー',
  THRILLER: 'サスペンス',
  DRAMA: '日常・ヒューマンドラマ',
  ACTION: 'アクション',
  COMEDY: 'コメディ',
  HISTORICAL: '時代小説'
};

/**
 * よく使用されるタグ一覧
 */
export const COMMON_TAGS = {
  // 技術関連
  PROGRAMMING: 'プログラミング',
  AI: 'AI',
  VR: 'VR',
  FUTURE_TECH: '未来技術',
  
  // 感情・テーマ
  PSYCHOLOGICAL: '心理描写',
  FRIENDSHIP: '友情',
  LOVE: '恋愛',
  FAMILY: '家族',
  GROWTH: '成長',
  
  // 設定
  MODERN: '現代',
  NEAR_FUTURE: '近未来',
  HISTORICAL: '歴史',
  WORKPLACE: '職場',
  SCHOOL: '学校',
  
  // ストーリー要素
  TWIST: '予想外の展開',
  EMOTIONAL: '感動',
  SUSPENSE: 'サスペンス',
  HUMOR: 'ユーモア',
  DARK: 'ダーク'
};

/**
 * 読書時間の計算（日本語文字数ベース）
 * @param {string} content - 小説の本文
 * @returns {string} 推定読書時間
 */
export function calculateReadingTime(content) {
  // 日本語の場合、1分間に約400-600文字読めるとされる
  const CHARS_PER_MINUTE = 500;
  
  // HTMLタグを除去
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // 文字数をカウント
  const charCount = plainText.length;
  
  // 読書時間を計算
  const minutes = Math.ceil(charCount / CHARS_PER_MINUTE);
  
  if (minutes < 1) {
    return '1分未満';
  } else if (minutes < 60) {
    return `${minutes}分`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}時間${remainingMinutes}分` : `${hours}時間`;
  }
}

/**
 * ジャンルの表示順序を取得
 * @param {string[]} genres - ジャンル配列
 * @returns {string[]} ソートされたジャンル配列
 */
export function sortGenres(genres) {
  const genreOrder = Object.values(STORY_GENRES);
  return genres.sort((a, b) => {
    const indexA = genreOrder.indexOf(a);
    const indexB = genreOrder.indexOf(b);
    return indexA - indexB;
  });
}

/**
 * 小説のメタデータを検証
 * @param {object} frontmatter - フロントマター
 * @returns {object} 検証結果とエラー
 */
export function validateStoryMetadata(frontmatter) {
  const errors = [];
  const warnings = [];
  
  // 必須フィールドのチェック
  if (!frontmatter.title) {
    errors.push('タイトルは必須です');
  }
  
  if (!frontmatter.description) {
    errors.push('説明文は必須です');
  }
  
  // ジャンルのチェック
  if (frontmatter.genre) {
    const validGenres = Object.values(STORY_GENRES);
    const invalidGenres = frontmatter.genre.filter(g => !validGenres.includes(g));
    if (invalidGenres.length > 0) {
      warnings.push(`未定義のジャンル: ${invalidGenres.join(', ')}`);
    }
  }
  
  // 読書時間のチェック
  if (!frontmatter.reading_time) {
    warnings.push('読書時間が設定されていません');
  }
  
  // 公開日のチェック
  if (frontmatter.published_date) {
    const date = new Date(frontmatter.published_date);
    if (isNaN(date.getTime())) {
      errors.push('公開日の形式が正しくありません');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * シリーズの小説を順序でソート
 * @param {array} stories - 小説配列
 * @returns {array} ソートされた小説配列
 */
export function sortStoriesBySeries(stories) {
  return stories.sort((a, b) => {
    // シリーズが同じ場合、series_orderでソート
    if (a.series === b.series && a.series_order && b.series_order) {
      return a.series_order - b.series_order;
    }
    
    // 公開日でソート
    if (a.published_date && b.published_date) {
      return new Date(b.published_date) - new Date(a.published_date);
    }
    
    return 0;
  });
}

/**
 * 関連する小説を取得
 * @param {object} currentStory - 現在の小説
 * @param {array} allStories - すべての小説配列
 * @returns {array} 関連する小説配列
 */
export function getRelatedStories(currentStory, allStories) {
  const related = [];
  
  // 同じシリーズの小説
  if (currentStory.series) {
    const seriesStories = allStories.filter(story => 
      story.series === currentStory.series && story.title !== currentStory.title
    );
    related.push(...seriesStories);
  }
  
  // 同じジャンルの小説
  if (currentStory.genre && related.length < 5) {
    const genreStories = allStories.filter(story => 
      story.genre && 
      story.genre.some(g => currentStory.genre.includes(g)) &&
      story.title !== currentStory.title &&
      !related.some(r => r.title === story.title)
    );
    related.push(...genreStories.slice(0, 5 - related.length));
  }
  
  // 類似タグの小説
  if (currentStory.tags && related.length < 5) {
    const tagStories = allStories.filter(story => 
      story.tags && 
      story.tags.some(t => currentStory.tags.includes(t)) &&
      story.title !== currentStory.title &&
      !related.some(r => r.title === story.title)
    );
    related.push(...tagStories.slice(0, 5 - related.length));
  }
  
  return related.slice(0, 5);
}

/**
 * 小説の統計情報を生成
 * @param {array} stories - 小説配列
 * @returns {object} 統計情報
 */
export function generateStoryStats(stories) {
  const stats = {
    totalStories: stories.length,
    genreCounts: {},
    tagCounts: {},
    seriesCounts: {},
    totalReadingTime: 0
  };
  
  stories.forEach(story => {
    // ジャンル統計
    if (story.genre) {
      story.genre.forEach(genre => {
        stats.genreCounts[genre] = (stats.genreCounts[genre] || 0) + 1;
      });
    }
    
    // タグ統計
    if (story.tags) {
      story.tags.forEach(tag => {
        stats.tagCounts[tag] = (stats.tagCounts[tag] || 0) + 1;
      });
    }
    
    // シリーズ統計
    if (story.series) {
      stats.seriesCounts[story.series] = (stats.seriesCounts[story.series] || 0) + 1;
    }
    
    // 読書時間統計（分単位で計算）
    if (story.reading_time) {
      const minutes = parseInt(story.reading_time.replace(/[^\d]/g, '')) || 0;
      stats.totalReadingTime += minutes;
    }
  });
  
  return stats;
}
