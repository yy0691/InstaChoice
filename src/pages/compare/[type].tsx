import { useRouter } from 'next/router';
import { useState, useEffect, FC, ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type {
  ProductType,
  Product,
  ProductData,
  KeySpecFields,
  SpecLabels,
  ProductTypeNames,
  HighlightedSpecs,
  ComparisonStatus,
  AnimationVariants
} from '@/types';

// 模拟的产品数据
const mockProducts: ProductData = {
  mobile: [
    {
      id: 'm001',
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      price: 8999,
      thumbnail: '/images/products/iphone15-pro.jpg',
      rating: 4.8,
      specs: {
        os: 'iOS 17',
        processor: 'A17 Pro',
        ram: '8GB',
        storage: '256GB',
        displaySize: '6.1英寸',
        camera: '4800万像素主摄',
        battery: '3274mAh',
      },
      matchScore: 92,
      keyFactors: ['操作系统匹配', '相机性能出色', '设计符合需求'],
    },
    {
      id: 'm002',
      name: 'Samsung Galaxy S23',
      brand: 'Samsung',
      price: 6999,
      thumbnail: '/images/products/galaxy-s23.jpg',
      rating: 4.6,
      specs: {
        os: 'Android 13',
        processor: '骁龙8 Gen 2',
        ram: '8GB',
        storage: '256GB',
        displaySize: '6.1英寸',
        camera: '5000万像素主摄',
        battery: '3900mAh',
      },
      matchScore: 88,
      keyFactors: ['电池续航优秀', '相机性能出色', '安卓系统'],
    },
    {
      id: 'm003',
      name: 'Xiaomi 13',
      brand: 'Xiaomi',
      price: 3999,
      thumbnail: '/images/products/xiaomi-13.jpg',
      rating: 4.5,
      specs: {
        os: 'MIUI 14 (Android 13)',
        processor: '骁龙8 Gen 2',
        ram: '8GB',
        storage: '128GB',
        displaySize: '6.36英寸',
        camera: '5000万像素徕卡主摄',
        battery: '4500mAh',
      },
      matchScore: 85,
      keyFactors: ['性价比高', '拍照优秀', '续航良好'],
    },
  ],
  computer: [
    {
      id: 'c001',
      name: 'MacBook Air M2',
      brand: 'Apple',
      price: 9999,
      thumbnail: '/images/products/macbook-air-m2.jpg',
      rating: 4.7,
      specs: {
        os: 'macOS',
        processor: 'Apple M2',
        ram: '8GB',
        storage: '256GB SSD',
        displaySize: '13.6英寸',
        resolution: '2560 × 1664',
        battery: '18小时续航',
      },
      matchScore: 90,
      keyFactors: ['轻薄设计', '长续航', '性能强大'],
    },
    {
      id: 'c002',
      name: 'Lenovo ThinkPad X1 Carbon',
      brand: 'Lenovo',
      price: 12999,
      thumbnail: '/images/products/thinkpad-x1.jpg',
      rating: 4.6,
      specs: {
        os: 'Windows 11 Pro',
        processor: '英特尔酷睿i7-1280P',
        ram: '16GB',
        storage: '512GB SSD',
        displaySize: '14英寸',
        resolution: '2.8K',
        battery: '约10小时续航',
      },
      matchScore: 87,
      keyFactors: ['商务办公', '可靠耐用', '键盘舒适'],
    },
  ],
  mouse: [],
  keyboard: [],
  monitor: [],
};

const productTypeNames: ProductTypeNames = {
  mobile: '手机',
  computer: '笔记本电脑',
  mouse: '鼠标',
  keyboard: '键盘',
  monitor: '显示器',
};

// 不同产品类型的关键规格字段
const keySpecFields: KeySpecFields = {
  mobile: ['os', 'processor', 'ram', 'storage', 'displaySize', 'camera', 'battery'],
  computer: ['os', 'processor', 'ram', 'storage', 'displaySize', 'resolution', 'battery'],
  mouse: ['type', 'dpi', 'sensor', 'weight', 'buttons', 'batteryLife'],
  keyboard: ['type', 'layout', 'switch', 'keycaps', 'connection', 'lighting'],
  monitor: ['size', 'resolution', 'panel', 'refresh', 'response', 'color'],
};

// 规格的中文标签
const specLabels: SpecLabels = {
  os: '操作系统',
  processor: '处理器',
  ram: '内存',
  storage: '存储',
  displaySize: '屏幕尺寸',
  camera: '相机',
  battery: '电池',
  resolution: '分辨率',
  type: '类型',
  dpi: 'DPI',
  sensor: '传感器',
  weight: '重量',
  buttons: '按键',
  batteryLife: '续航',
  layout: '布局',
  switch: '轴体',
  keycaps: '键帽',
  connection: '连接方式',
  lighting: '灯光',
  size: '尺寸',
  panel: '面板',
  refresh: '刷新率',
  response: '响应时间',
  color: '色域',
};

// 动画配置
const container: AnimationVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: AnimationVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// 定义品牌对应的图标
const brandIcons: Record<string, string> = {
  'Apple': '🍎',
  'Samsung': '📱',
  'Xiaomi': '📱',
  'Lenovo': '💻',
  'Default': '📱'
};

// 定义有效的产品类型检查函数
const isValidProductType = (type: string): type is ProductType => {
  return ['mobile', 'computer', 'mouse', 'keyboard', 'monitor'].includes(type);
};

// 表格标题组件
interface TableHeaderProps {
  product: Product;
}

const TableHeader: FC<TableHeaderProps> = ({ product }) => {
  const brandIcon = brandIcons[product.brand] || brandIcons['Default'];
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 w-24 h-24 bg-secondary-50 rounded-lg flex items-center justify-center">
        <span className="text-3xl">{brandIcon}</span>
      </div>
      <h3 className="text-lg font-bold text-center">{product.name}</h3>
      <p className="text-primary-600 mb-1">{product.brand}</p>
      <p className="font-medium">¥{product.price}</p>
      <div className="mt-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
        匹配度: {product.matchScore}%
      </div>
    </div>
  );
};

// 主页面组件
const ComparePage: FC = () => {
  const router = useRouter();
  const { type, products } = router.query;
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightedSpecs, setHighlightedSpecs] = useState<HighlightedSpecs>({});

  // 处理查询参数并获取需要比较的产品
  useEffect(() => {
    if (type && products && typeof type === 'string' && typeof products === 'string') {
      if (isValidProductType(type)) {
        const productIds = products.split(',');
        const productsToCompare = mockProducts[type].filter((p: Product) => productIds.includes(p.id));
        setComparedProducts(productsToCompare);
        
        // 初始化高亮规格
        if (productsToCompare.length > 0) {
          const initialHighlights: HighlightedSpecs = {};
          keySpecFields[type].forEach((spec: string) => {
            initialHighlights[spec] = false;
          });
          setHighlightedSpecs(initialHighlights);
        }
        
        setLoading(false);
      } else {
        // 无效的产品类型
        setLoading(false);
      }
    }
  }, [type, products]);

  // 切换规格高亮
  const toggleHighlight = (spec: string): void => {
    setHighlightedSpecs(prev => ({
      ...prev,
      [spec]: !prev[spec]
    }));
  };

  // 切换所有规格高亮
  const toggleAllHighlights = (): void => {
    const allHighlighted = Object.values(highlightedSpecs).every(v => v);
    const newHighlights: HighlightedSpecs = {};
    Object.keys(highlightedSpecs).forEach(key => {
      newHighlights[key] = !allHighlighted;
    });
    setHighlightedSpecs(newHighlights);
  };

  // 获取规格的比较状态
  const getComparisonStatus = (spec: string): ComparisonStatus => {
    if (comparedProducts.length <= 1) return null;
    
    const firstProduct = comparedProducts[0];
    if (!firstProduct || !firstProduct.specs[spec]) return null;
    
    // 检查是否所有产品的该规格都相同
    const firstValue = firstProduct.specs[spec];
    const allSame = comparedProducts.every(p => p.specs[spec] === firstValue);
    
    if (allSame) return "相同";
    
    // 对于数值型规格，尝试确定哪个更好
    if (spec === 'ram' || spec === 'storage' || spec === 'dpi' || spec === 'weight' || spec === 'battery') {
      // 假设对于这些规格，数值越大越好（除了weight，越轻越好）
      const values = comparedProducts.map(p => {
        const val = p.specs[spec];
        if (!val) return 0;
        // 提取数字部分
        const numMatch = val.match(/\d+/);
        return numMatch ? parseInt(numMatch[0], 10) : 0;
      });
      
      if (!values.length) return null;
      
      // 对于weight，越小越好
      if (spec === 'weight') {
        const minValue = Math.min(...values);
        return minValue === values[0] ? "更好" : "较差";
      } else {
        const maxValue = Math.max(...values);
        return maxValue === values[0] ? "更好" : "较差";
      }
    }
    
    return "不同";
  };

  // 决定规格单元格的样式
  const getSpecCellClass = (index: number, spec: string): string => {
    if (!highlightedSpecs[spec]) return "";
    
    const status = getComparisonStatus(spec);
    if (index === 0) {
      if (status === "更好") return "bg-green-50 text-green-700 font-medium";
      if (status === "较差") return "bg-red-50 text-red-700";
    }
    
    if (status === "相同") return "bg-gray-50";
    return "";
  };

  if (!type || typeof type !== 'string' || !isValidProductType(type)) {
    return <div className="p-8 text-center">加载中或无效的产品类型...</div>;
  }

  const productType = type; // 不需要类型断言，因为前面已经通过类型守卫确认了type是ProductType

  if (loading) {
    return <div className="p-8 text-center">正在加载比较数据...</div>;
  }

  // 渲染表格规格行
  const renderSpecRows = (): ReactNode => {
    if (!keySpecFields[productType]) return null;
    
    return keySpecFields[productType].map((spec) => (
      <tr key={spec}>
        <td
          className="p-4 font-medium cursor-pointer hover:bg-gray-50"
          onClick={() => toggleHighlight(spec)}
        >
          <div className="flex items-center">
            <button
              className={`mr-2 w-5 h-5 rounded border ${
                highlightedSpecs[spec]
                  ? 'bg-primary-500 border-primary-500 text-white'
                  : 'bg-white border-secondary-300'
              } flex items-center justify-center`}
            >
              {highlightedSpecs[spec] && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
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
              )}
            </button>
            {specLabels[spec] || spec}
          </div>
        </td>
        {comparedProducts.map((product, index) => (
          <td
            key={`${product.id}-${spec}`}
            className={`p-4 ${getSpecCellClass(index, spec)}`}
          >
            {product.specs[spec] || '-'}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>产品比较 - {productTypeNames[productType]} | InstaChoice</title>
      </Head>

      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            InstaChoice
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href={`/recommendation/${productType}`}
            className="text-primary-600 hover:text-primary-800 inline-flex items-center"
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
            返回推荐页面
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            {productTypeNames[productType]}对比
          </h1>
          <p className="text-secondary-600">
            点击规格名称可以高亮显示差异
          </p>
        </div>

        {comparedProducts.length < 2 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-soft">
            <div className="text-5xl mb-4">🤔</div>
            <h2 className="text-2xl font-bold mb-2">需要至少2个产品才能进行对比</h2>
            <p className="text-secondary-600 mb-6">
              请返回推荐页面选择至少两个产品进行对比。
            </p>
            <Link href={`/recommendation/${productType}`} className="btn btn-primary">
              返回推荐页面
            </Link>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="overflow-x-auto"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-gray-50 border-b">规格</th>
                  {comparedProducts.map((product) => (
                    <th key={product.id} className="p-4 text-left bg-gray-50 border-b">
                      <TableHeader product={product} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={(comparedProducts.length + 1) as number} className="p-4 bg-secondary-50 font-medium text-lg">
                    <div className="flex justify-between items-center">
                      <span>技术规格</span>
                      <button
                        onClick={toggleAllHighlights}
                        className="text-sm btn btn-outline py-1"
                      >
                        {Object.values(highlightedSpecs).every(v => v) ? '取消高亮差异' : '高亮所有差异'}
                      </button>
                    </div>
                  </td>
                </tr>
                
                {renderSpecRows()}
                
                <tr>
                  <td colSpan={(comparedProducts.length + 1) as number} className="p-4 bg-secondary-50 font-medium text-lg">
                    产品优势
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">关键优势</td>
                  {comparedProducts.map((product) => (
                    <td key={`${product.id}-advantages`} className="p-4">
                      <ul className="list-disc pl-5 space-y-1">
                        {product.keyFactors.map((factor, index) => (
                          <li key={index} className="text-secondary-700">{factor}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}
      </main>

      <footer className="bg-secondary-50 py-6 mt-20">
        <div className="container mx-auto px-4 text-center text-secondary-500">
          <p>© 2025 InstaChoice - 智能电子产品选择平台</p>
        </div>
      </footer>
    </div>
  );
};

export default ComparePage; 