/**
 * 管理者メニューの表示/非表示を制御するスクリプト
 * このファイルは管理者認証時のメニュー項目の追加と表示のみを担当
 * アクティブ状態の管理はサーバーサイドの AppBar.astro に委譲
 */

document.addEventListener('DOMContentLoaded', function() {
  // 認証状態の確認
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
  
  if (isAuthenticated) {
    // 認証済みの場合、管理者メニューを追加（既に存在しない場合のみ）
    ensureAdminMenuItems();
    
    // フッターの管理リンクのスタイルを調整
    styleAdminLink();
  }
});

// 管理者メニュー項目が存在するか確認し、なければ追加する関数
function ensureAdminMenuItems() {
  const menuList = document.querySelector('.navbar-left');
  if (!menuList) return;
  
  // 現在のパスを取得
  const currentPath = window.location.pathname;
  
  // 既存のメニュー項目をチェック
  const existingMenuItems = {};
  menuList.querySelectorAll('a').forEach(link => {
    existingMenuItems[link.textContent.trim()] = true;
  });
  
  // Examplesメニュー項目の追加（存在しない場合のみ）
  if (!existingMenuItems['Examples']) {
    addMenuItem(menuList, {
      label: 'Examples',
      link: '/examples',
      isActive: currentPath.startsWith('/examples')
    }, 2); // 挿入位置（0始まりで3番目）
  }
  
  // 管理設定メニュー項目の追加（存在しない場合のみ）
  if (!existingMenuItems['管理設定']) {
    // Examplesの後に追加するため、Examplesの位置を特定
    const examplesIndex = findMenuItemIndex(menuList, 'Examples');
    const insertPosition = examplesIndex !== -1 ? examplesIndex + 1 : menuList.children.length;
    
    addMenuItem(menuList, {
      label: '管理設定',
      link: '/admin/settings',
      isActive: currentPath.startsWith('/admin/settings')
    }, insertPosition);
  }
}

/**
 * メニューリストに新しい項目を追加する共通関数
 * @param {HTMLElement} menuList - メニューリスト要素
 * @param {Object} itemConfig - メニュー項目の設定
 * @param {number} position - 挿入位置（任意）
 */
function addMenuItem(menuList, itemConfig, position = -1) {
  // メニュー項目の作成
  const menuItem = document.createElement('li');
  menuItem.innerHTML = `
    <a href="${itemConfig.link}" class="${itemConfig.isActive ? 'active' : ''}" data-menu-id="${itemConfig.label}">
      ${itemConfig.label}
    </a>
  `;
  
  // データ属性を追加して管理を容易にする
  const linkElement = menuItem.querySelector('a');
  if (!linkElement) return;
  
  // メニューリストへの挿入
  if (position >= 0 && position < menuList.children.length) {
    menuList.insertBefore(menuItem, menuList.children[position]);
  } else {
    menuList.appendChild(menuItem);
  }
}

/**
 * 指定されたラベルを持つメニュー項目のインデックスを取得
 * @param {HTMLElement} menuList - メニューリスト要素
 * @param {string} label - 検索するメニュー項目のラベル
 * @returns {number} 見つかった位置、見つからない場合は-1
 */
function findMenuItemIndex(menuList, label) {
  const items = menuList.querySelectorAll('li a');
  for (let i = 0; i < items.length; i++) {
    if (items[i].textContent.trim() === label) {
      return i;
    }
  }
  return -1;
}

/**
 * フッターの管理者リンクのスタイルを調整する関数
 * 認証状態に応じて表示を調整
 */
function styleAdminLink() {
  const adminLink = document.querySelector('.admin-link');
  if (!adminLink) return;
  
  // 認証済みの場合、より視認性を高める
  adminLink.style.opacity = '0.3';
}

function styleAdminLink() {
  // フッターの管理リンク
  const adminLink = document.querySelector('.admin-link');
  
  if (adminLink) {
    // 認証済みの場合、少し目立つようにする
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
    
    if (isAuthenticated) {
      adminLink.style.opacity = '0.3';
    }
  }
}
