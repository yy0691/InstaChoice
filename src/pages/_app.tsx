import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { isClient, safeLocalStorage, applyTheme, getSystemThemePreference } from '../utils/client-utils';

// 创建一个无SSR包装器组件
const NoSSR = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return <>{children}</>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // 初始化脚本，仅在客户端执行
  useEffect(() => {
    if (!isClient) return;
    
    // 根据本地存储或系统偏好设置初始主题
    const storedTheme = safeLocalStorage.getItem('theme');
    const theme = (storedTheme === 'dark' || storedTheme === 'light') 
      ? storedTheme as 'dark' | 'light'
      : getSystemThemePreference();
      
    applyTheme(theme);
    
    // 添加其他初始化逻辑...
  }, []);
  
  // 默认加载状态
  if (!isClient) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-2xl">加载中...</div>
    </div>;
  }
  
  return (
    <NoSSR>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </NoSSR>
  );
}

// 禁用服务器端渲染
export default dynamic(() => Promise.resolve(MyApp), { ssr: false }); 