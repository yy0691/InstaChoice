import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { UserMode } from '@/types';
import { ThemeToggle } from '@/components/ThemeToggle';
import ClientOnly from '../components/ClientOnly';
import { isClient, safeLocalStorage, setSafeLocalStorage, generateRandomPrice } from '../utils/client-utils';
import { testDatabaseConnection, productService } from '@/lib/supabase';
import { ProductType } from '@/types/product';

const productTypes = [
  {
    id: 'mobile',
    name: '手机',
    description: '智能手机产品推荐',
    icon: '📱',
    gradient: 'from-[#FF9494] to-[#FF3D84]',
    bgGradient: 'bg-gradient-to-br from-[#FF9494] to-[#FF3D84]',
    iconBg: 'rgba(255, 61, 132, 0.2)',
    shadow: 'group-hover:shadow-lg group-hover:shadow-[#FF9494]/30',
    badge: '热门',
    badgeColor: 'bg-red-500'
  },
  {
    id: 'computer',
    name: '笔记本电脑',
    description: '笔记本电脑产品推荐',
    icon: '💻',
    gradient: 'from-[#6FEE8D] to-[#17C964]',
    bgGradient: 'bg-gradient-to-br from-[#6FEE8D] to-[#17C964]',
    iconBg: 'rgba(23, 201, 100, 0.2)',
    shadow: 'group-hover:shadow-lg group-hover:shadow-[#6FEE8D]/30',
    badge: '推荐',
    badgeColor: 'bg-green-500'
  },
  {
    id: 'mouse',
    name: '鼠标',
    description: '鼠标产品推荐',
    icon: '🖱️',
    gradient: 'from-[#FFAA85] to-[#F8983A]',
    bgGradient: 'bg-gradient-to-br from-[#FFAA85] to-[#F8983A]',
    iconBg: 'rgba(248, 152, 58, 0.2)',
    shadow: 'group-hover:shadow-lg group-hover:shadow-[#FFAA85]/30',
    badge: '新品',
    badgeColor: 'bg-orange-500'
  },
  {
    id: 'keyboard',
    name: '键盘',
    description: '键盘产品推荐',
    icon: '⌨️',
    gradient: 'from-[#BD9EFD] to-[#886CE4]',
    bgGradient: 'bg-gradient-to-br from-[#BD9EFD] to-[#886CE4]',
    iconBg: 'rgba(136, 108, 228, 0.2)',
    shadow: 'group-hover:shadow-lg group-hover:shadow-[#BD9EFD]/30',
    badge: '热门',
    badgeColor: 'bg-purple-500'
  },
  {
    id: 'monitor',
    name: '显示器',
    description: '显示器产品推荐',
    icon: '🖥️',
    gradient: 'from-[#79F0D0] to-[#36B89E]',
    bgGradient: 'bg-gradient-to-br from-[#79F0D0] to-[#36B89E]',
    iconBg: 'rgba(54, 184, 158, 0.2)',
    shadow: 'group-hover:shadow-lg group-hover:shadow-[#79F0D0]/30',
    badge: '精选',
    badgeColor: 'bg-teal-500'
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] } },
};

export default function Home() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [userMode, setUserMode] = useState<UserMode>('basic');
  const [showIntro, setShowIntro] = useState(true);
  const [productPrices, setProductPrices] = useState<number[]>([]);
  const [dbStatus, setDbStatus] = useState<boolean | null>(null);
  const [productCounts, setProductCounts] = useState<Record<ProductType, number> | null>(null);

  // Check if first visit to show intro
  useEffect(() => {
    if (!isClient) return;
    
    const hasVisited = safeLocalStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowIntro(false);
    } else {
      safeLocalStorage.setItem('hasVisited', 'true');
    }
  }, []);

  // 在 useEffect 中初始化随机价格
  useEffect(() => {
    setProductPrices([
      Math.floor(Math.random() * 10000) + 1000,
      Math.floor(Math.random() * 10000) + 1000,
      Math.floor(Math.random() * 10000) + 1000,
      Math.floor(Math.random() * 10000) + 1000
    ]);
  }, []);

  useEffect(() => {
    async function checkConnection() {
      const isConnected = await testDatabaseConnection();
      setDbStatus(isConnected);

      if (isConnected) {
        const counts = await productService.getProductTypeCounts();
        setProductCounts(counts);
        console.log('产品数量统计:', counts);
      }
    }

    checkConnection();
  }, []);

  const handleProductTypeSelect = (id: string) => {
    // Store user mode preference in localStorage
    safeLocalStorage.setItem('userMode', userMode);
    router.push(`/decision/${id}`);
  };

  const toggleUserMode = () => {
    setUserMode(userMode === 'basic' ? 'advanced' : 'basic');
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>InstaChoice - 智能电子产品选择平台</title>
      </Head>

      {/* Header with Mode Toggle */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            InstaChoice
          </Link>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleUserMode}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors"
            >
              <span className="text-sm">{userMode === 'basic' ? '🌱 小白模式' : '🛠 专业模式'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            
            <ThemeToggle />
            
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            InstaChoice
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            基于个人需求快速选择适合的电子产品，让科技选择变得更简单
          </p>
          
          {showIntro && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
            >
              <button 
                onClick={() => setShowIntro(false)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300"
              >
                开始选购
              </button>
              <Link href="/about" className="px-6 py-3 bg-muted hover:bg-muted/80 rounded-full transition-all duration-300">
                了解更多
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Product Type Selection Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {productTypes.map((type) => (
            <motion.div
              key={type.id}
              variants={item}
              className="group"
              onMouseEnter={() => setHoveredCard(type.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                className={`card-container relative overflow-hidden rounded-2xl border border-border backdrop-blur-sm bg-background/80 dark:bg-card/30 
                transition-all duration-500 ${type.shadow} cursor-pointer hover:translate-y-[-8px] hover:border-transparent
                dark:hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)]`}
                onClick={() => handleProductTypeSelect(type.id)}
              >
                {/* 卡片发光效果 */}
                <div className={`absolute -inset-0.5 ${type.bgGradient} opacity-0 group-hover:opacity-15 rounded-2xl blur-sm transition-opacity duration-500 dark:group-hover:opacity-10`}></div>
              
                {/* 角标标签 */}
                <div className={`absolute z-20 top-0 right-0 ${type.badgeColor} text-white text-xs font-medium py-1 px-3 rounded-bl-lg rounded-tr-lg shadow-sm`}>
                  {type.badge}
                </div>
                
                {/* 卡片背景渐变效果 */}
                <div className={`card-bg absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${type.bgGradient}`}></div>
                
                {/* 卡片内容 */}
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <div className="flex items-start mb-4">
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300" 
                      style={{ background: type.iconBg }}
                    >
                      <span className="text-3xl">{type.icon}</span>
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <h2 className="text-xl font-bold mb-1 group-hover:text-foreground/90 transition-colors duration-300">{type.name}</h2>
                      <p className="text-muted-foreground text-sm group-hover:text-foreground/70 transition-colors duration-300">{type.description}</p>
                    </div>
                  </div>
                  
                  {/* 卡片底部内容 */}
                  <div className="mt-auto pt-4 flex justify-between items-center">
                    <div className="card-shine absolute inset-0 opacity-0 group-hover:opacity-30"></div>
                    
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">快速选择</span>
                    </div>
                    
                    <button className={`relative overflow-hidden card-btn px-3 py-1.5 rounded-full text-xs font-medium text-foreground/90
                      bg-foreground/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 border border-foreground/20`}>
                      <span className="relative z-10">开始</span>
                      <span className="absolute inset-0 bg-foreground/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                  </div>
                  
                  {/* 装饰元素 */}
                  <div className="card-dots absolute bottom-0 left-0 w-full h-16 pointer-events-none">
                    <div className={`absolute bottom-3 left-3 w-3 h-3 rounded-full ${type.bgGradient} opacity-0 group-hover:opacity-70 transition-all duration-500 delay-100`}></div>
                    <div className={`absolute bottom-8 left-8 w-2 h-2 rounded-full ${type.bgGradient} opacity-0 group-hover:opacity-60 transition-all duration-500 delay-200`}></div>
                    <div className={`absolute bottom-6 left-14 w-1 h-1 rounded-full ${type.bgGradient} opacity-0 group-hover:opacity-70 transition-all duration-500 delay-300`}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How to Use Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-10">如何使用</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#79F0D0] to-[#36B89E] flex items-center justify-center mb-4 shadow-md">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">选择产品类型</h3>
                <p className="text-muted-foreground">从上面的产品类别中选择您感兴趣的类型</p>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BD9EFD] to-[#886CE4] flex items-center justify-center mb-4 shadow-md">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">设置决策因素</h3>
                <p className="text-muted-foreground">根据个人需求调整各项决策因素的重要性</p>
              </div>
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF9494] to-[#FF3D84] flex items-center justify-center mb-4 shadow-md">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">获取推荐产品</h3>
                <p className="text-muted-foreground">系统根据您的偏好自动推荐最适合的产品</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Popular Products Section */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">热门产品</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ClientOnly fallback={
                <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-background rounded-lg shadow p-6 text-center">
                      <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mx-auto mb-3"></div>
                      <div className="h-3 bg-muted-foreground/20 rounded w-2/3 mx-auto mb-6"></div>
                      <div className="h-8 bg-muted-foreground/20 rounded w-1/3 mx-auto"></div>
                    </div>
                  ))}
                </div>
              }>
                <>
                  {['手机', '笔记本电脑', '平板电脑', '智能手表'].map((product, index) => (
                    <div key={index} className="bg-background rounded-lg shadow hover:shadow-md transition-shadow p-6 text-center">
                      <h3 className="text-xl font-semibold mb-2">{product}</h3>
                      <p className="text-muted-foreground mb-4">高性能、高品质的选择</p>
                      <p className="text-lg font-bold text-primary">
                        ¥{generateRandomPrice(1000, 11000)}
                      </p>
                    </div>
                  ))}
                </>
              </ClientOnly>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-8 mt-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">关于我们</h3>
              <p className="text-sm text-muted-foreground">InstaChoice 是一个帮助用户快速做出电子产品购买决策的智能平台。</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">合作品牌</h3>
              <div className="flex flex-wrap gap-3">
                <span className="text-sm text-muted-foreground">Apple</span>
                <span className="text-sm text-muted-foreground">Samsung</span>
                <span className="text-sm text-muted-foreground">Dell</span>
                <span className="text-sm text-muted-foreground">Logitech</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">联系我们</h3>
              <p className="text-sm text-muted-foreground">contact@instachoice.com</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 InstaChoice - 智能电子产品选择平台</p>
          </div>
        </div>
      </footer>

      {/* 数据库状态指示器 */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className={`px-4 py-2 rounded-full text-sm font-medium shadow-lg ${
          dbStatus === null
            ? 'bg-muted text-muted-foreground'
            : dbStatus
            ? 'bg-green-500/20 text-green-500'
            : 'bg-red-500/20 text-red-500'
        }`}>
          {dbStatus === null
            ? '检查数据库连接...'
            : dbStatus
            ? '数据库已连接'
            : '数据库连接失败'}
        </div>
      </div>
    </div>
  );
} 