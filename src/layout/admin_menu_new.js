/**
 * 管理者メニューの表示/非表示を制御するスクリプト
 * 完全にリビルドされたバージョン - 2025年1月
 */

document.addEventListener('DOMContentLoaded', function() {
  // 認証状態の確認
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
  
  if (isAuthenticated) {
    // 認証済みの場合、管理者メニューを追加
    ensureAdminMenuItems();
    
    // フッターの管理リンクのスタイルを調整
    adjustAdminFooterLinkStyle();
  }
});

/**
 * 管理者メニュー項目が存在するか確認し、なければ追加する関数
 */
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
    }, 2);
  }
  
  // 管理設定メニュー項目の追加（存在しない場合のみ）
  if (!existingMenuItems['管理設定']) {
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
 */
function addMenuItem(menuList, itemConfig, position = -1) {
  const menuItem = document.createElement('li');
  menuItem.innerHTML = `
    <a href="${itemConfig.link}" class="${itemConfig.isActive ? 'active' : ''}" data-menu-id="${itemConfig.label}">
      ${itemConfig.label}
    </a>
  `;
  
  const linkElement = menuItem.querySelector('a');
  if (!linkElement) return;
  
  if (position >= 0 && position < menuList.children.length) {
    menuList.insertBefore(menuItem, menuList.children[position]);
  } else {
    menuList.appendChild(menuItem);
  }
}

/**
 * 指定されたラベルを持つメニュー項目のインデックスを取得
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
function adjustAdminFooterLinkStyle() {
  const adminLink = document.querySelector('.admin-link');
  if (!adminLink) return;
  
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
  
  if (isAuthenticated) {
    adminLink.style.opacity = '0.3';
  }
}
