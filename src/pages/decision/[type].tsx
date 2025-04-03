import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { 
  ProductType, 
  DecisionFactor, 
  UserMode, 
  DecisionFactors,
  ProductTypeNames,
  UserModeNames
} from '@/types';
import ToggleSwitch from '@/components/Toggleswitches';
import Checkbox from '@/components/Checkbox';
import { ThemeToggle } from '@/components/ThemeToggle';
import ClientOnly from '../../components/ClientOnly';
import { generateRandomMatch, generateRandomPrice, isClient, safeLocalStorage } from '../../utils/client-utils';

// 决策因素数据（示例）
const decisionFactors: DecisionFactors = {
  mobile: [
    {
      id: 'budget',
      name: '预算',
      description: '设定您的价格范围',
      min: 500,
      max: 20000,
      defaultValue: 5000,
      unit: '元',
      step: 500,
    },
    {
      id: 'brand',
      name: '品牌需求',
      description: '是否偏好特定品牌',
      type: 'toggle',
      options: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OPPO', 'vivo'],
    },
    {
      id: 'os',
      name: '操作系统',
      description: '选择偏好的操作系统',
      type: 'toggle',
      options: ['iOS', 'Android'],
    },
    {
      id: 'usagePattern',
      name: '使用习惯',
      description: '您的使用需求',
      min: 0,
      max: 100,
      defaultValue: 50,
      labels: {
        0: '轻度',
        30: '中度',
        60: '重度',
        90: '专业',
        100: '极致性能',
      },
    },
    {
      id: 'cameraQuality',
      name: '拍照需求',
      description: '对相机的要求',
      min: 0,
      max: 100,
      defaultValue: 60,
      labels: {
        0: '普通',
        30: '良好',
        60: '高端',
        90: '专业',
        100: '单反级',
      },
    },
    {
      id: 'batteryLife',
      name: '电池续航',
      description: '电池续航需求',
      min: 5,
      max: 20,
      defaultValue: 10,
      unit: '小时',
      step: 1,
    },
  ],
  computer: [
    {
      id: 'budget',
      name: '预算',
      description: '设定您的价格范围',
      min: 2000,
      max: 20000,
      defaultValue: 8000,
      unit: '元',
      step: 1000,
    },
    {
      id: 'brand',
      name: '品牌需求',
      description: '是否偏好特定品牌',
      type: 'toggle',
      options: ['Apple', 'Lenovo', 'HP', 'Dell', 'ASUS', 'Huawei'],
    },
    {
      id: 'os',
      name: '操作系统',
      description: '选择偏好的操作系统',
      type: 'toggle',
      options: ['macOS', 'Windows', 'Linux'],
    },
    {
      id: 'usagePattern',
      name: '使用习惯',
      description: '您的使用需求',
      min: 0,
      max: 100,
      defaultValue: 50,
      labels: {
        0: '轻度办公',
        33: '中度需求',
        67: '高性能',
        100: '专业创作',
      },
    },
  ],
  mouse: [
    {
      id: 'budget',
      name: '预算',
      description: '设定您的价格范围',
      min: 50,
      max: 500,
      defaultValue: 150,
      unit: '元',
      step: 50,
    },
    {
      id: 'brand',
      name: '品牌需求',
      description: '是否偏好特定品牌',
      type: 'toggle',
      options: ['Logitech', 'Razer', 'SteelSeries', 'Corsair', 'Microsoft'],
    },
    {
      id: 'usagePattern',
      name: '使用习惯',
      description: '您的使用需求',
      min: 0,
      max: 100,
      defaultValue: 50,
      labels: {
        0: '文书处理',
        30: '设计剪辑',
        60: '电竞游戏',
        90: '职业电竞',
        100: '专业比赛',
      },
    },
  ],
  keyboard: [
    {
      id: 'budget',
      name: '预算',
      description: '设定您的价格范围',
      min: 100,
      max: 1000,
      defaultValue: 300,
      unit: '元',
      step: 100,
    },
    {
      id: 'brand',
      name: '品牌需求',
      description: '是否偏好特定品牌',
      type: 'toggle',
      options: ['Logitech', 'Razer', 'Corsair', 'Ducky', 'HHKB', 'Keychron'],
    },
    {
      id: 'keyboardType',
      name: '键盘类型',
      description: '键盘类型偏好',
      min: 0,
      max: 100,
      defaultValue: 60,
      labels: {
        0: '薄膜键盘',
        30: '有线机械',
        60: '无线双模',
        80: '三模RGB',
        100: '静电容',
      },
    },
  ],
  monitor: [
    {
      id: 'budget',
      name: '预算',
      description: '设定您的价格范围',
      min: 200,
      max: 4000,
      defaultValue: 1500,
      unit: '元',
      step: 200,
    },
    {
      id: 'brand',
      name: '品牌需求',
      description: '是否偏好特定品牌',
      type: 'toggle',
      options: ['Dell', 'Samsung', 'LG', 'BenQ', 'AOC', 'ASUS'],
    },
    {
      id: 'screenSize',
      name: '屏幕尺寸',
      description: '屏幕尺寸需求',
      min: 24,
      max: 34,
      defaultValue: 27,
      unit: '寸',
      step: 1,
    },
  ],
};

const productTypeNames: ProductTypeNames = {
  mobile: '手机',
  computer: '笔记本电脑',
  mouse: '鼠标',
  keyboard: '键盘',
  monitor: '显示器',
};

const modes: UserModeNames = {
  basic: '小白模式',
  advanced: '专业模式',
};

interface FactorValues {
  [key: string]: number | boolean;
}

interface SelectedOptions {
  [key: string]: string[];
}

export default function DecisionPage() {
  const router = useRouter();
  const { type } = router.query;
  const [userMode, setUserMode] = useState<UserMode>('basic');
  const [factorValues, setFactorValues] = useState<FactorValues>({});
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [totalWeight, setTotalWeight] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [hoverFactor, setHoverFactor] = useState<string | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get user mode from localStorage on component mount
  useEffect(() => {
    if (!isClient) return;
    
    const storedMode = safeLocalStorage.getItem('userMode');
    if (storedMode === 'basic' || storedMode === 'advanced') {
      setUserMode(storedMode as UserMode);
    }
  }, []);

  useEffect(() => {
    if (!router.isReady || !type || typeof type !== 'string' || !Object.keys(decisionFactors).includes(type)) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);
    const productType = type as ProductType;
    // 初始化因素值
    const initialValues: FactorValues = {};
    const initialOptions: SelectedOptions = {};
    
    decisionFactors[productType].forEach((factor: DecisionFactor) => {
      if (factor.type === 'toggle') {
        initialValues[factor.id] = false;
        initialOptions[factor.id] = [];
      } else if (factor.defaultValue !== undefined) {
        initialValues[factor.id] = factor.defaultValue;
      } else if (factor.min !== undefined) {
        initialValues[factor.id] = factor.min;
      }
    });
    
    setFactorValues(initialValues);
    setSelectedOptions(initialOptions);
    calculateTotalWeight(initialValues);

    // 重置其他状态
    setShowTooltip(null);
    setHoverFactor(null);
    setIsSubmitting(false);
  }, [type, router.isReady]);

  // 监听路由变化
  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(true);
      setFactorValues({});
      setSelectedOptions({});
      setTotalWeight(0);
      setShowTooltip(null);
      setHoverFactor(null);
      setIsSubmitting(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    // 客户端生成推荐产品数据
    if (!type || typeof type !== 'string') return;

    const productType = type as ProductType;
    const recommendations = {
      mobile: [
        {
          name: "高性价比手机",
          description: "性能与价格的良好平衡，适合大多数用户",
          match: generateRandomMatch(),
          price: generateRandomPrice(1500, 3000)
        },
        {
          name: "高端旗舰手机",
          description: "顶级配置与性能，适合专业用户",
          match: generateRandomMatch(),
          price: generateRandomPrice(4000, 8000)
        },
        {
          name: "入门基础款手机",
          description: "经济实惠，满足基本需求",
          match: generateRandomMatch(),
          price: generateRandomPrice(800, 1500)
        },
        {
          name: "专业拍照手机",
          description: "针对摄影爱好者优化，强大的相机系统",
          match: generateRandomMatch(),
          price: generateRandomPrice(3000, 6000)
        }
      ],
      computer: [
        {
          name: "高性价比笔记本",
          description: "性能与价格的良好平衡，适合日常办公",
          match: generateRandomMatch(),
          price: generateRandomPrice(4000, 6000)
        },
        {
          name: "高端商务本",
          description: "轻薄便携，续航持久",
          match: generateRandomMatch(),
          price: generateRandomPrice(8000, 12000)
        },
        {
          name: "入门游戏本",
          description: "基础游戏性能，满足轻度游戏需求",
          match: generateRandomMatch(),
          price: generateRandomPrice(5000, 7000)
        },
        {
          name: "创作者笔记本",
          description: "强大的图形处理能力，适合设计创作",
          match: generateRandomMatch(),
          price: generateRandomPrice(10000, 15000)
        }
      ],
      mouse: [
        {
          name: "高性价比鼠标",
          description: "舒适的握感，精准的定位",
          match: generateRandomMatch(),
          price: generateRandomPrice(100, 200)
        },
        {
          name: "专业游戏鼠标",
          description: "高DPI，可编程按键",
          match: generateRandomMatch(),
          price: generateRandomPrice(300, 500)
        },
        {
          name: "入门办公鼠标",
          description: "简约设计，基础功能",
          match: generateRandomMatch(),
          price: generateRandomPrice(50, 100)
        },
        {
          name: "无线便携鼠标",
          description: "轻巧便携，长效续航",
          match: generateRandomMatch(),
          price: generateRandomPrice(150, 300)
        }
      ],
      keyboard: [
        {
          name: "高性价比机械键盘",
          description: "优质轴体，RGB背光",
          match: generateRandomMatch(),
          price: generateRandomPrice(200, 400)
        },
        {
          name: "高端客制化键盘",
          description: "顶级配件，极致手感",
          match: generateRandomMatch(),
          price: generateRandomPrice(600, 1000)
        },
        {
          name: "入门薄膜键盘",
          description: "静音舒适，适合办公",
          match: generateRandomMatch(),
          price: generateRandomPrice(100, 200)
        },
        {
          name: "游戏竞技键盘",
          description: "快速响应，防鬼键设计",
          match: generateRandomMatch(),
          price: generateRandomPrice(400, 800)
        }
      ],
      monitor: [
        {
          name: "高性价比显示器",
          description: "2K分辨率，出色色彩",
          match: generateRandomMatch(),
          price: generateRandomPrice(1000, 1500)
        },
        {
          name: "专业创作显示器",
          description: "4K分辨率，广色域",
          match: generateRandomMatch(),
          price: generateRandomPrice(2000, 3000)
        },
        {
          name: "入门办公显示器",
          description: "舒适护眼，基础显示",
          match: generateRandomMatch(),
          price: generateRandomPrice(600, 1000)
        },
        {
          name: "电竞游戏显示器",
          description: "高刷新率，快速响应",
          match: generateRandomMatch(),
          price: generateRandomPrice(1500, 2500)
        }
      ]
    };

    setRecommendedProducts(recommendations[productType] || []);
  }, [type]);

  const calculateTotalWeight = (values: FactorValues) => {
    let total = 0;
    if (type && typeof type === 'string' && Object.keys(decisionFactors).includes(type)) {
      const productType = type as ProductType;
      decisionFactors[productType].forEach((factor: DecisionFactor) => {
        if (factor.id !== 'budget' && factor.type !== 'toggle' && typeof values[factor.id] === 'number' && factor.min !== undefined && factor.max !== undefined) {
          // 将值标准化为0-1之间
          const normalizedValue = ((values[factor.id] as number) - factor.min) / (factor.max - factor.min);
          total += normalizedValue * 100;
        }
      });
    }
    setTotalWeight(total);
  };

  const handleSliderChange = (factorId: string, value: number) => {
    const newValues = { ...factorValues, [factorId]: value };
    setFactorValues(newValues);
    calculateTotalWeight(newValues);
    
    // 更新进度条宽度
    const factor = decisionFactors[type as ProductType].find(f => f.id === factorId);
    if (factor && factor.min !== undefined && factor.max !== undefined) {
      const percentage = ((value - (factor.min || 0)) / ((factor.max || 1) - (factor.min || 0))) * 100;
      const progressElement = document.getElementById(`progress-${factorId}`);
      if (progressElement) {
        progressElement.style.width = `${percentage}%`;
      }
    }
  };

  const handleToggleChange = (factorId: string, checked: boolean) => {
    setFactorValues(prev => ({
      ...prev,
      [factorId]: checked ? 1 : 0
    }));
  };

  const handleOptionChange = (factorId: string, option: string, checked: boolean) => {
    const currentOptions = [...(selectedOptions[factorId] || [])];
    
    if (checked) {
      if (!currentOptions.includes(option)) {
        currentOptions.push(option);
      }
    } else {
      const index = currentOptions.indexOf(option);
      if (index > -1) {
        currentOptions.splice(index, 1);
      }
    }
    
    setSelectedOptions({
      ...selectedOptions,
      [factorId]: currentOptions
    });
  };

  const getInterpretation = (factor: DecisionFactor, value: number | boolean | undefined): string | number => {
    if (value === undefined) {
      if (factor.defaultValue !== undefined) {
        return Math.round(factor.defaultValue);
      }
      return factor.min !== undefined ? Math.round(factor.min) : 0;
    }

    if (typeof value === 'boolean') {
      return value ? '是' : '否';
    }

    if (factor.labels) {
      // 查找最接近的标签
      const valueKeys = Object.keys(factor.labels).map(Number);
      let closestKey = valueKeys[0];
      let minDistance = Math.abs(value - closestKey);

      for (const key of valueKeys.slice(1)) {
        const distance = Math.abs(value - key);
        if (distance < minDistance) {
          minDistance = distance;
          closestKey = key;
        }
      }

      return factor.labels[closestKey];
    }

    // 对数值进行四舍五入
    const roundedValue = Math.round(value);
    return factor.unit ? `${roundedValue}${factor.unit}` : roundedValue;
  };

  const handleSubmit = () => {
    // 保存决策因素值并导航到推荐页
    const queryParams = new URLSearchParams();
    
    // 添加滑块值
    Object.entries(factorValues).forEach(([key, value]) => {
      if (typeof value === 'number') {
        queryParams.append(key, value.toString());
      } else if (typeof value === 'boolean') {
        queryParams.append(`${key}_enabled`, value.toString());
      }
    });
    
    // 添加选择的选项
    Object.entries(selectedOptions).forEach(([key, options]) => {
      if (options.length > 0) {
        queryParams.append(`${key}_options`, options.join(','));
      }
    });
    
    queryParams.append('mode', userMode);
    
    if (type && typeof type === 'string') {
      router.push(`/recommendation/${type}?${queryParams.toString()}`);
    }
  };

  const handleFactorHover = (factorId: string | null) => {
    setHoverFactor(factorId);
  };

  const handleLongPress = (factorId: string) => {
    setShowTooltip(factorId);
    // Auto hide tooltip after 3 seconds
    setTimeout(() => {
      setShowTooltip(null);
    }, 3000);
  };

  const productType = type as ProductType;
  const productTypeName = productTypeNames[productType];

  // 如果产品类型无效，返回加载状态
  if (!productType || !decisionFactors[productType]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{`选择${productTypeName} - InstaChoice`}</title>
      </Head>

      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            InstaChoice
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setUserMode(userMode === 'basic' ? 'advanced' : 'basic')}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-border hover:bg-muted transition-colors"
            >
              <span className="text-sm">{userMode === 'basic' ? '🌱 小白模式' : '🛠 专业模式'}</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6 flex items-center">
          <Link 
            href="/"
            className="text-primary hover:text-primary/80 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            返回
          </Link>
          <h1 className="text-2xl font-bold ml-4">选择您的{productTypeName}</h1>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Decision Factors Panel */}
            <div className="w-full md:w-1/2 lg:w-2/5">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-20">
                <h2 className="text-xl font-semibold mb-4">调整决策因素</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  根据您的需求调整以下因素的权重，{userMode === 'advanced' ? '可以精确设置参数值' : '我们会自动为您推荐最适合的产品'}
                </p>

                <div className="space-y-6">
                  {decisionFactors[productType].map((factor: DecisionFactor) => (
                    <motion.div 
                      key={factor.id} 
                      className={`p-4 rounded-lg transition-all duration-300 ${hoverFactor === factor.id ? 'bg-muted/80' : 'bg-card'}`}
                      onMouseEnter={() => handleFactorHover(factor.id)}
                      onMouseLeave={() => handleFactorHover(null)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-2 flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium">{factor.name}</h3>
                            <button 
                              onClick={() => handleLongPress(factor.id)}
                              className="text-muted-foreground hover:text-foreground" 
                              aria-label="了解更多"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground">{factor.description}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {getInterpretation(factor, factorValues[factor.id])}
                        </span>
                      </div>

                      {showTooltip === factor.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-3 p-2 bg-primary/5 border border-border rounded-md text-xs"
                        >
                          <p>{getFartorTooltip(factor)}</p>
                        </motion.div>
                      )}

                      {factor.type === 'toggle' ? (
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{factor.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {getInterpretation(factor, factorValues[factor.id])}
                              </span>
                            </div>
                          </div>
                          <ToggleSwitch
                            checked={typeof factorValues[factor.id] === 'boolean' 
                              ? factorValues[factor.id] as boolean 
                              : factorValues[factor.id] === 1}
                            onChange={(checked) => handleToggleChange(factor.id, checked)}
                          />
                        </div>
                      ) : (
                        <div className="text-right">
                          <div className="flex items-center">
                            {/* Slider Value Indicator */}
                            <div
                              className="relative h-6 flex-1 bg-muted rounded-full overflow-hidden cursor-pointer"
                              onMouseDown={(startEvent) => {
                                const slider = startEvent.currentTarget;
                                const min = factor.min ?? 0;
                                const max = factor.max ?? 100;
                                const step = factor.step ?? 1;

                                const updateValue = (e: MouseEvent) => {
                                  const rect = slider.getBoundingClientRect();
                                  const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
                                  const rawValue = min + percent * (max - min);
                                  // 根据 step 调整值并取整
                                  const value = Math.round(rawValue / step) * step;
                                  handleSliderChange(factor.id, value);
                                };

                                const handleMouseMove = (e: MouseEvent) => {
                                  e.preventDefault();
                                  updateValue(e);
                                };

                                const handleMouseUp = () => {
                                  document.removeEventListener('mousemove', handleMouseMove);
                                  document.removeEventListener('mouseup', handleMouseUp);
                                };

                                document.addEventListener('mousemove', handleMouseMove);
                                document.addEventListener('mouseup', handleMouseUp);
                                updateValue(startEvent.nativeEvent);
                              }}
                            >
                              <motion.div
                                initial={false}
                                animate={{
                                  width: `${((typeof factorValues[factor.id] === 'number' ? factorValues[factor.id] as number : 0) - (factor.min ?? 0)) / ((factor.max ?? 100) - (factor.min ?? 0)) * 100}%`
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute top-0 left-0 h-full bg-primary/30 rounded-full"
                              />
                              <motion.div
                                className="absolute top-0 h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                                initial={false}
                                animate={{
                                  left: `${((typeof factorValues[factor.id] === 'number' ? factorValues[factor.id] as number : 0) - (factor.min ?? 0)) / ((factor.max ?? 100) - (factor.min ?? 0)) * 100}%`
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              >
                                <div className="w-5 h-5 rounded-full bg-primary shadow-md transform -translate-x-1/2" />
                              </motion.div>
                            </div>
                          </div>

                          {factor.labels && (
                            <div className="mt-1 flex justify-between">
                              {Object.entries(factor.labels).map(([value, label]) => (
                                <span
                                  key={value}
                                  className={`text-xs px-2 cursor-pointer ${
                                    typeof factorValues[factor.id] === 'number' && factorValues[factor.id] as number >= parseInt(value) 
                                      ? 'text-primary font-medium' 
                                      : 'text-muted-foreground'
                                  }`}
                                  onClick={() => handleSliderChange(factor.id, parseInt(value))}
                                >
                                  {label}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {factor.type === 'toggle' ? (
                        (typeof factorValues[factor.id] === 'boolean' 
                          ? factorValues[factor.id] as boolean 
                          : factorValues[factor.id] === 1) && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 p-4 bg-muted/50 rounded-lg"
                          >
                            <p className="mb-4 text-sm font-medium">选择您偏好的{factor.id === 'brand' ? '品牌' : '选项'}</p>
                            <div className="flex flex-wrap gap-3">
                              {factor.options?.map((option) => (
                                <Checkbox
                                  key={option}
                                  id={`${factor.id}-${option}`}
                                  checked={selectedOptions[factor.id]?.includes(option) || false}
                                  onChange={(checked) => handleOptionChange(factor.id, option, checked)}
                                  label={option}
                                />
                              ))}
                            </div>
                          </motion.div>
                        )
                      ) : null}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full mt-8 py-3 rounded-lg font-medium transition-all ${
                    isSubmitting 
                      ? 'bg-muted cursor-not-allowed' 
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      处理中...
                    </span>
                  ) : '查看推荐产品'}
                </motion.button>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="w-full md:w-1/2 lg:w-3/5">
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-xl font-semibold mb-4">您的需求预览</h2>
                
                <div className="space-y-4 mb-6">
                  <p className="text-sm text-muted-foreground">根据您当前的选择，我们预估您需要：</p>
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-medium mb-3">产品特征总结</h3>
                    <ul className="space-y-2">
                      {decisionFactors[productType].map(factor => (
                        <li key={factor.id} className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-primary mt-1.5 mr-2"></span>
                          <span className="text-sm">
                            {getFartorSummary(factor, factorValues[factor.id])}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">推荐产品</h2>
                  <ClientOnly fallback={
                    <div className="animate-pulse space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-background border border-border p-4 rounded-lg">
                          <div className="h-5 bg-muted-foreground/20 rounded w-1/3 mb-3"></div>
                          <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-3"></div>
                          <div className="flex justify-between">
                            <div className="h-4 bg-muted-foreground/20 rounded w-1/4"></div>
                            <div className="h-4 bg-muted-foreground/20 rounded w-1/4"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  }>
                    <div className="space-y-4">
                      {/* 动态生成3个推荐产品 */}
                      {recommendedProducts.map((product, index) => (
                        <div key={index} className="bg-background border border-border p-4 rounded-lg hover:shadow-md transition-shadow">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{product.description}</p>
                          <div className="flex justify-between">
                            <span className="text-primary font-medium">匹配度: {product.match}%</span>
                            <span className="font-bold">¥{product.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ClientOnly>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-muted py-6 mt-auto border-t border-border">
        <div className="container mx-auto px-4 text-muted-foreground text-sm text-center">
          © 2025 InstaChoice - 根据您的需求智能推荐电子产品
        </div>
      </footer>
    </div>
  );
}

// Helper function to generate factor tooltips
function getFartorTooltip(factor: DecisionFactor): string {
  switch (factor.id) {
    case 'budget':
      return '预算影响您可以考虑的产品范围。提高预算通常意味着可以获得更高质量或更多功能的产品。';
    case 'brand':
      return '选择特定品牌可以帮助您筛选出符合品牌偏好的产品，每个品牌都有其独特的设计理念和特点。';
    case 'usagePattern':
      return '使用习惯决定了产品需要满足的性能要求。轻度使用对配置要求较低，而专业用途则需要更高的性能。';
    case 'cameraQuality':
      return '相机质量对于喜欢拍照和视频录制的用户非常重要。高质量相机通常具有更多镜头、更高像素和更好的夜间拍摄能力。';
    case 'batteryLife':
      return '电池续航时间影响设备的使用便利性。更长的电池寿命意味着设备可以更长时间地使用而无需充电。';
    case 'os':
      return '操作系统是用户与设备交互的界面，不同的系统有不同的特点和生态系统。';
    case 'screenSize':
      return '屏幕尺寸影响设备的便携性和显示体验。较大的屏幕提供更好的视觉体验，但可能降低便携性。';
    case 'keyboardType':
      return '键盘类型影响打字体验和舒适度。机械键盘提供更好的触感和响应，而薄膜键盘则更轻薄。';
    default:
      return `${factor.name}是影响产品选择的重要因素之一，根据您的需求调整可以获得更个性化的推荐。`;
  }
}

// Helper function to generate factor summaries based on values
function getFartorSummary(factor: DecisionFactor, value: any): string {
  if (typeof value === 'undefined') return `未设置${factor.name}偏好`;
  
  switch (factor.id) {
    case 'budget':
      return `您的预算约为 ${value}${factor.unit}，${value > 5000 ? '可以考虑中高端产品' : '适合入门到中端产品'}`;
    case 'brand':
      return value ? '您对品牌有特定偏好' : '您对品牌没有特别偏好';
    case 'usagePattern':
      if (factor.labels) {
        const closestLabel = Object.entries(factor.labels)
          .reduce((prev, curr) => 
            Math.abs(parseInt(curr[0]) - value) < Math.abs(parseInt(prev[0]) - value) ? curr : prev
          );
        return `您的使用需求为"${closestLabel[1]}"，${parseInt(closestLabel[0]) > 60 ? '需要高性能产品' : '中等性能即可满足需求'}`;
      }
      return `您的使用需求为 ${value}%`;
    case 'cameraQuality':
      if (factor.labels) {
        const closestLabel = Object.entries(factor.labels)
          .reduce((prev, curr) => 
            Math.abs(parseInt(curr[0]) - value) < Math.abs(parseInt(prev[0]) - value) ? curr : prev
          );
        return `您对相机质量的要求为"${closestLabel[1]}"`;
      }
      return `您对相机质量的要求为 ${value}%`;
    case 'batteryLife':
      return `您需要至少 ${value} 小时的电池续航`;
    case 'os':
      return value ? '您对操作系统有特定偏好' : '您对操作系统没有特别偏好';
    case 'screenSize':
      return `您偏好 ${value} 英寸左右的屏幕尺寸`;
    case 'keyboardType':
      if (factor.labels) {
        const closestLabel = Object.entries(factor.labels)
          .reduce((prev, curr) => 
            Math.abs(parseInt(curr[0]) - value) < Math.abs(parseInt(prev[0]) - value) ? curr : prev
          );
        return `您偏好"${closestLabel[1]}"类型的键盘`;
      }
      return `您的键盘类型偏好为 ${value}%`;
    default:
      return `${factor.name}: ${value}${factor.unit || ''}`;
  }
} 