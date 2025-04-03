import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { productService } from '@/lib/supabase';
import { Product, ProductType } from '@/types/product';
import ClientOnly from '@/components/ClientOnly';
import { isClient, safeLocalStorage } from '@/utils/client-utils';

// 产品类型名称映射
const productTypeNames: Record<ProductType, string> = {
  '手机': '手机',
  '笔记本电脑': '笔记本电脑',
  '游戏鼠标': '游戏鼠标',
  '键盘': '键盘'
};

// 产品类型对应的决策因素
const decisionFactors: Record<ProductType, string[]> = {
  '手机': ['性能', '续航', '拍照', '屏幕', '价格'],
  '笔记本电脑': ['性能', '续航', '便携性', '屏幕', '价格'],
  '游戏鼠标': ['手感', '重量', '按键', '续航', '价格'],
  '键盘': ['手感', '布局', '背光', '连接', '价格']
};

// 产品类型对应的关键规格字段
const keySpecFields: Record<ProductType, string[]> = {
  '手机': ['处理器', '内存', '存储', '电池', '屏幕'],
  '笔记本电脑': ['处理器', '内存', '存储', '电池', '屏幕'],
  '游戏鼠标': ['传感器', 'DPI', '按键数', '重量', '续航'],
  '键盘': ['轴体', '布局', '背光', '连接', '重量']
};

// 规格字段显示名称
const specLabels: Record<string, string> = {
  '处理器': '处理器',
  '内存': '内存',
  '存储': '存储',
  '电池': '电池',
  '屏幕': '屏幕',
  '传感器': '传感器',
  'DPI': 'DPI',
  '按键数': '按键数',
  '重量': '重量',
  '续航': '续航',
  '轴体': '轴体',
  '布局': '布局',
  '背光': '背光',
  '连接': '连接'
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// 星级评分组件
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? 'text-yellow-400'
              : i < rating
              ? 'text-yellow-300'
              : 'text-muted/30'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z"
          />
        </svg>
      ))}
    </div>
  );
};

// 产品类型对应的样式类
const productStyles: Record<ProductType, {
  gradient: string;
  border: string;
  button: string;
}> = {
  '手机': {
    gradient: 'gradient-phone',
    border: 'border-product-phone/40',
    button: 'bg-product-phone/80 hover:bg-product-phone text-foreground'
  },
  '笔记本电脑': {
    gradient: 'gradient-laptop',
    border: 'border-product-laptop/40',
    button: 'bg-product-laptop/80 hover:bg-product-laptop text-foreground'
  },
  '游戏鼠标': {
    gradient: 'gradient-mouse',
    border: 'border-product-mouse/40',
    button: 'bg-product-mouse/80 hover:bg-product-mouse text-foreground'
  },
  '键盘': {
    gradient: 'gradient-keyboard',
    border: 'border-product-keyboard/40',
    button: 'bg-product-keyboard/80 hover:bg-product-keyboard text-foreground'
  }
};

interface UserFactors {
  mode: 'simple' | 'advanced';
  [key: string]: string | number;
}

export default function RecommendationPage() {
  const router = useRouter();
  const { type } = router.query;
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [userFactors, setUserFactors] = useState<UserFactors>({ mode: 'simple' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isClient && type) {
      const savedFactors = safeLocalStorage.getItem('userFactors');
      if (savedFactors) {
        try {
          const parsedFactors = JSON.parse(savedFactors);
          setUserFactors(parsedFactors);
        } catch (error) {
          console.error('解析用户因素失败:', error);
        }
      }
    }
  }, [type]);

  useEffect(() => {
    async function fetchRecommendedProducts() {
      if (!type || typeof type !== 'string') return;

      setIsLoading(true);
      try {
        // 转换用户因素为数字类型
        const numericFactors: Record<string, number> = {};
        Object.entries(userFactors).forEach(([key, value]) => {
          if (key !== 'mode') {
            numericFactors[key] = typeof value === 'string' ? parseFloat(value) : value;
          }
        });

        const products = await productService.getRecommendedProducts(
          type as ProductType,
          numericFactors
        );
        setRecommendedProducts(products);
      } catch (error) {
        console.error('获取推荐产品失败:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendedProducts();
  }, [type, userFactors]);

  // 返回决策页面
  const handleBack = () => {
    if (isClient) {
      const savedFactors = safeLocalStorage.getItem('userFactors');
      if (savedFactors) {
        router.push(`/decision/${type}`);
      } else {
        router.push('/');
      }
    }
  };

  // 返回首页
  const handleHome = () => {
    if (isClient) {
      router.push('/');
    }
  };

  // 选择/取消选择产品
  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // 开始对比
  const handleCompare = () => {
    if (selectedProducts.length >= 2) {
      const ids = selectedProducts.map(id => id.toString()).join(',');
      router.push(`/compare?ids=${ids}`);
    }
  };

  // 查看产品详情
  const viewProductDetails = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  if (!type || typeof type !== 'string') {
    return null;
  }

  const productType = type as ProductType;
  const styles = productStyles[productType];

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-foreground">正在获取推荐产品...</p>
        </div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-background">
        <Head>
          <title>推荐{productTypeNames[productType]} - InstaChoice</title>
        </Head>

        <header className="bg-card backdrop-blur-sm sticky top-0 z-30 border-b border-border shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={handleHome}
              className="text-2xl font-bold text-primary"
            >
              InstaChoice
            </button>
            <div className="flex gap-4 items-center">
              <span className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-muted">
                {userFactors.mode === 'advanced' ? '专业模式' : '小白模式'}
              </span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="text-primary hover:text-primary/80 inline-flex items-center button-fancy"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              返回决策页
            </button>
          </div>

          <div className={`mb-10 p-6 rounded-xl ${styles.gradient}`}>
            <h1 className="text-3xl font-bold mb-2">
              为您推荐的{productTypeNames[productType]}
            </h1>
            <p className="text-muted-foreground">
              基于您的偏好，我们为您精选了以下适合的产品
            </p>
          </div>

          {/* 选中对比产品指示条 */}
          {selectedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-16 z-20 mb-6 p-4 glass-card flex justify-between items-center"
            >
              <div>
                <span className="font-medium text-foreground">已选择 {selectedProducts.length} 个产品</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {selectedProducts.length > 1 ? '可以进行对比' : '至少选择2个产品才能对比'}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProducts([])}
                  className="text-muted-foreground text-sm hover:text-foreground button-fancy py-1 px-3"
                >
                  清除
                </button>
                <button
                  onClick={handleCompare}
                  disabled={selectedProducts.length < 2}
                  className={`btn ${styles.button} button-fancy ${
                    selectedProducts.length < 2 ? 'opacity-50 cursor-not-allowed' : 'button-glow'
                  }`}
                >
                  对比所选产品
                </button>
              </div>
            </motion.div>
          )}

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {recommendedProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={item}
                className={`card-product overflow-hidden hover-scale border-2 ${styles.border}`}
              >
                {/* 匹配分数标签 */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-primary/80 to-primary/60 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-md backdrop-blur-sm z-10">
                  匹配度: {Math.round(product.match_score)}%
                </div>

                {/* 选择对比标记 */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => toggleProductSelection(product.id)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full shadow-sm transition-all ${
                      selectedProducts.includes(product.id)
                        ? `${styles.button} button-glow`
                        : 'bg-background/80 backdrop-blur-sm text-foreground border border-border'
                    }`}
                  >
                    {selectedProducts.includes(product.id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="flex flex-col h-full">
                  {/* 产品图片 */}
                  <div className="relative aspect-square bg-muted overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/10">
                      <span className="text-6xl">{product.brand === 'Apple' ? '🍎' : product.brand === 'Samsung' ? '📱' : '💻'}</span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium shadow-lg">
                      ¥{product.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4">
                    {/* 产品信息 */}
                    <div className="mb-3">
                      <div className="flex justify-between items-start">
                        <h2 className="text-lg font-semibold mb-1 line-clamp-2">{product.name}</h2>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground text-sm">{product.brand}</span>
                        <div className="flex items-center gap-1">
                          <StarRating rating={product.rating} />
                          <span className="text-xs text-muted-foreground">({product.rating.toFixed(1)})</span>
                        </div>
                      </div>

                      <div className="h-px bg-border my-3"></div>
                    </div>

                    {/* 关键匹配因素 */}
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-foreground mb-2">符合您的需求</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.key_factors.map((factor: string, index: number) => (
                          <span
                            key={index}
                            className={`inline-block px-2 py-1 text-xs rounded-md ${styles.gradient}`}
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 规格摘要 */}
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-foreground mb-2">产品规格</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        {keySpecFields[productType].slice(0, 4).map((field) => (
                          <div key={field}>
                            <span className="text-muted-foreground">{specLabels[field]}</span>
                            <span className="ml-1 font-medium block truncate">{product.specs[field]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 按钮区域 */}
                  <div className="mt-auto p-4 pt-0 flex gap-3">
                    <button
                      onClick={() => viewProductDetails(product.id)}
                      className="btn btn-outline button-fancy flex-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      详情
                    </button>
                    <button
                      onClick={() => toggleProductSelection(product.id)}
                      className={`btn button-fancy flex-1 ${
                        selectedProducts.includes(product.id)
                          ? styles.button
                          : 'btn-primary'
                      }`}
                    >
                      {selectedProducts.includes(product.id) ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          已选择
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          对比
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {recommendedProducts.length === 0 && (
            <div className="text-center py-16 glass-card animate-fade-in">
              <div className="text-5xl mb-4">😢</div>
              <h2 className="text-2xl font-bold mb-2">暂无匹配产品</h2>
              <p className="text-muted-foreground mb-6">
                根据您的筛选条件，我们没有找到匹配的产品。请尝试调整您的决策因素。
              </p>
              <Link href={`/decision/${type}`} className="btn btn-primary button-fancy button-glow">
                重新选择
              </Link>
            </div>
          )}
        </main>

        <footer className="bg-muted py-8 mt-20 border-t border-border">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>© 2025 InstaChoice - 智能电子产品选择平台</p>
          </div>
        </footer>
      </div>
    </ClientOnly>
  );
} 