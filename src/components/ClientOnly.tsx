import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode; // 在客户端渲染前可选显示的内容
}

/**
 * 仅在客户端渲染的组件包装器
 * 用于包装那些依赖于客户端API或可能导致水合不匹配的组件
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 如果还没有渲染到客户端，返回fallback或null
  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// 示例用法:
// <ClientOnly>
//   <ComponentThatUsesWindowOrLocalStorage />
// </ClientOnly> 