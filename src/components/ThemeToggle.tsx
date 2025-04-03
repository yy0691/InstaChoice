import { useEffect, useState } from 'react';
import { isClient, safeLocalStorage, applyTheme, getSystemThemePreference } from '../utils/client-utils';
import ClientOnly from './ClientOnly';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // 主题切换逻辑
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    
    if (isClient) {
      localStorage.setItem('theme', newTheme);
    }
  };
  
  // 初始化主题 - 仅在客户端执行
  useEffect(() => {
    // 获取存储的主题或系统偏好
    const storedTheme = safeLocalStorage.getItem('theme');
    const systemPreference = getSystemThemePreference();
    
    // 确定要使用的主题
    const initialTheme = storedTheme ? 
      (storedTheme === 'dark' ? 'dark' : 'light') : 
      systemPreference;
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);
  
  return (
    <ClientOnly fallback={
      <div className="w-10 h-10 rounded-full bg-muted animate-pulse"></div>
    }>
      <button
        onClick={toggleTheme}
        className="rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到深色模式'}
      >
        {theme === 'dark' ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-yellow-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-slate-700" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </ClientOnly>
  );
} 