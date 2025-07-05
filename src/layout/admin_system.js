/**
 * 完全に新しい管理者メニュー実装
 * ファイル名とすべての関数名を変更
 */

document.addEventListener('DOMContentLoaded', function() {
  // 認証状態の確認
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
  
  if (isAuthenticated) {
    addAdminMenuToNavbar();
    updateAdminLinkVisibility();
  }
});

function addAdminMenuToNavbar() {
  const menuList = document.querySelector('.navbar-left');
  if (!menuList) return;
  
  const currentPath = window.location.pathname;
  const existingItems = Array.from(menuList.querySelectorAll('a')).map(a => a.textContent.trim());
  
  // Examples メニュー追加
  if (!existingItems.includes('Examples')) {
    createAndInsertMenuItem(menuList, {
      label: 'Examples',
      link: '/examples',
      isActive: currentPath.startsWith('/examples')
    }, 2);
  }
  
  // 管理設定メニュー追加
  if (!existingItems.includes('管理設定')) {
    const examplesIndex = findMenuPosition(menuList, 'Examples');
    createAndInsertMenuItem(menuList, {
      label: '管理設定',
      link: '/admin/settings',
      isActive: currentPath.startsWith('/admin/settings')
    }, examplesIndex + 1);
  }
}

function createAndInsertMenuItem(menuList, config, position) {
  const menuItem = document.createElement('li');
  menuItem.innerHTML = `<a href="${config.link}" class="${config.isActive ? 'active' : ''}">${config.label}</a>`;
  
  if (position >= 0 && position < menuList.children.length) {
    menuList.insertBefore(menuItem, menuList.children[position]);
  } else {
    menuList.appendChild(menuItem);
  }
}

function findMenuPosition(menuList, label) {
  const items = menuList.querySelectorAll('li a');
  for (let i = 0; i < items.length; i++) {
    if (items[i].textContent.trim() === label) return i;
  }
  return -1;
}

function updateAdminLinkVisibility() {
  const adminLink = document.querySelector('.admin-link');
  if (adminLink) {
    adminLink.style.opacity = '0.3';
  }
}
