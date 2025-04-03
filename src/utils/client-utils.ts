/**
 * 客户端实用工具函数
 * 这些函数应该只在客户端使用，或者通过useEffect安全调用
 */

// 检查是否在客户端环境
export const isClient = typeof window !== 'undefined';

// 生成随机价格 (仅客户端使用)
export function generateRandomPrice(min: number = 1000, max: number = 10000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成随机匹配度 (仅客户端使用)
export function generateRandomMatch(min: number = 75, max: number = 98): number {
  if (!isClient) return 0; // 服务器端返回默认值
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 安全获取本地存储
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (isClient) {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (isClient) {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (isClient) {
      localStorage.removeItem(key);
    }
  }
};

// 安全设置本地存储
export function setSafeLocalStorage(key: string, value: string): void {
  if (isClient) {
    localStorage.setItem(key, value);
  }
}

// 获取系统颜色模式偏好
export function getSystemThemePreference(): 'dark' | 'light' {
  if (!isClient) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// 应用主题到HTML元素
export function applyTheme(theme: 'dark' | 'light'): void {
  if (!isClient) return;
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// 获取当前应用的主题
export function getCurrentTheme(): 'dark' | 'light' {
  if (!isClient) return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
} 