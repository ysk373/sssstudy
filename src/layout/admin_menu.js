// 管理者メニューの表示/非表示を制御するスクリプト

document.addEventListener('DOMContentLoaded', function() {
  // 認証状態の確認
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
  
  if (isAuthenticated) {
    // 認証済みの場合、管理者メニューを表示
    addAdminMenuItems();
    
    // 管理者設定ページへのリンクも追加
    addAdminSettingsLink();
    
    // 現在のページが管理者ページの場合、通常メニューのアクティブ状態をクリア
    clearNormalMenuActiveState();
  }
  
  // フッターの管理リンクのスタイルを調整
  styleAdminLink();
});

// 通常メニューのアクティブ状態をクリアする関数
function clearNormalMenuActiveState() {
  // 現在のページURLを取得
  const currentPath = window.location.pathname;
  
  // Examplesページまたは管理設定ページの場合
  if (currentPath.startsWith('/examples') || currentPath.startsWith('/admin')) {
    // すべての通常メニューのアクティブクラスを削除
    const allMenuLinks = document.querySelectorAll('.navbar-left a');
    allMenuLinks.forEach(link => {
      link.classList.remove('active');
    });
  }
}

function addAdminMenuItems() {
  // メニューリストを取得
  const menuList = document.querySelector('.navbar-left');
  
  if (menuList) {
    // 現在のページURLを取得
    const currentPath = window.location.pathname;
    
    // Examplesページかどうかを確認
    const isExamplesPage = currentPath.startsWith('/examples');
    
    // 管理者メニュー項目の作成
    const adminMenuItem = document.createElement('li');
    adminMenuItem.innerHTML = `
      <a href="/examples" class="${isExamplesPage ? 'active' : ''}">
        Examples
      </a>
    `;
    
    // a要素にスタイルを適用（通常メニューと同じスタイルにするため）
    const linkElement = adminMenuItem.querySelector('a');
    if (linkElement) {
      linkElement.style.float = 'left';
      linkElement.style.fontSize = '17px';
      linkElement.style.padding = '14px 16px';
      linkElement.style.textAlign = 'center';
      linkElement.style.color = 'var(--content-color)';
      linkElement.style.textDecoration = 'none';
      
      // ホバー時の動作を追加
      linkElement.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--header-active-color)';
      });
      
      linkElement.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.style.backgroundColor = '';
        }
      });
      
      // アクティブな場合のスタイルを適用
      if (isExamplesPage) {
        linkElement.style.backgroundColor = 'var(--header-active-color)';
        linkElement.style.borderBottom = '3px solid rgb(88, 88, 88)';
      }
    }
    
    // メニューリストに挿入（先頭から3番目の位置に）
    const menuItems = menuList.querySelectorAll('li');
    if (menuItems.length >= 2) {
      menuList.insertBefore(adminMenuItem, menuItems[2]);
    } else {
      menuList.appendChild(adminMenuItem);
    }
  }
}

function addAdminSettingsLink() {
  // メニューリストを取得
  const menuList = document.querySelector('.navbar-left');
  
  if (menuList) {
    // 現在のページURLを取得
    const currentPath = window.location.pathname;
    
    // 管理設定ページかどうかを確認
    const isAdminSettingsPage = currentPath.startsWith('/admin/settings');
    
    // 管理者設定リンクの作成
    const adminSettingsItem = document.createElement('li');
    adminSettingsItem.innerHTML = `
      <a href="/admin/settings" class="${isAdminSettingsPage ? 'active' : ''}">
        管理設定
      </a>
    `;
    
    // a要素にスタイルを適用（通常メニューと同じスタイルにするため）
    const linkElement = adminSettingsItem.querySelector('a');
    if (linkElement) {
      linkElement.style.float = 'left';
      linkElement.style.fontSize = '17px';
      linkElement.style.padding = '14px 16px';
      linkElement.style.textAlign = 'center';
      linkElement.style.color = 'var(--content-color)';
      linkElement.style.textDecoration = 'none';
      
      // ホバー時の動作を追加
      linkElement.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--header-active-color)';
      });
      
      linkElement.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.style.backgroundColor = '';
        }
      });
      
      // アクティブな場合のスタイルを適用
      if (isAdminSettingsPage) {
        linkElement.style.backgroundColor = 'var(--header-active-color)';
        linkElement.style.borderBottom = '3px solid rgb(88, 88, 88)';
      }
    }
    
    // Examplesリンクの後に挿入
    // 管理者クラス名がなくなったので、リンク内容で検索
    const links = menuList.querySelectorAll('a');
    let examplesLink = null;
    for (let i = 0; i < links.length; i++) {
      if (links[i].textContent.trim() === 'Examples') {
        examplesLink = links[i];
        break;
      }
    }
    
    if (examplesLink) {
      // 親要素にliとして取得
      const examplesItem = examplesLink.closest('li');
      if (examplesItem && examplesItem.nextSibling) {
        menuList.insertBefore(adminSettingsItem, examplesItem.nextSibling);
      } else {
        menuList.appendChild(adminSettingsItem);
      }
    } else {
      // Examplesリンクが見つからない場合は最後に追加
      menuList.appendChild(adminSettingsItem);
    }
  }
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
