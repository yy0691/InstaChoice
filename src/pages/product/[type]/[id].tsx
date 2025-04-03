import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { DetailedProduct, ProductType, ProductTypeNames, SpecLabels, SpecGroups } from '@/types';

// 产品类型名称映射
const productTypeNames: ProductTypeNames = {
  mobile: '手机',
  computer: '笔记本电脑',
  mouse: '鼠标',
  keyboard: '键盘',
  monitor: '显示器',
};

// 规格标签映射
const specLabels: SpecLabels = {
  os: '操作系统',
  processor: '处理器',
  ram: '内存',
  storage: '存储',
  displaySize: '屏幕尺寸',
  displayType: '屏幕类型',
  resolution: '分辨率',
  ppi: '像素密度',
  camera: '后置相机',
  frontCamera: '前置相机',
  battery: '电池容量',
  chargingSpeed: '充电速度',
  weight: '重量',
  color: '颜色',
  type: '类型',
  dpi: 'DPI',
  sensor: '传感器',
  buttons: '按键数量',
  switches: '轴体',
  layout: '布局',
  backlight: '背光',
  refreshRate: '刷新率',
  responseTime: '响应时间',
  panelType: '面板类型',
  hdr: 'HDR',
  ports: '接口',
};

// 规格分组
const specGroups: SpecGroups = {
  mobile: {
    '基本信息': ['os', 'processor', 'ram', 'storage'],
    '显示屏': ['displaySize', 'displayType', 'resolution', 'ppi'],
    '相机': ['camera', 'frontCamera'],
    '电池与充电': ['battery', 'chargingSpeed'],
    '外观与构造': ['weight', 'color'],
  },
  computer: {
    '基本信息': ['os', 'processor', 'ram', 'storage'],
    '显示屏': ['displaySize', 'displayType', 'resolution'],
    '电池与充电': ['battery'],
    '外观与构造': ['weight', 'color'],
  },
  mouse: {
    '基本信息': ['type', 'dpi', 'sensor'],
    '按键': ['buttons'],
    '外观': ['weight', 'color'],
  },
  keyboard: {
    '基本信息': ['type', 'switches', 'layout'],
    '功能': ['backlight'],
    '外观': ['color'],
  },
  monitor: {
    '基本信息': ['displaySize', 'resolution', 'refreshRate'],
    '显示': ['panelType', 'responseTime', 'hdr'],
    '接口': ['ports'],
  },
};

// 模拟产品数据
const mockProducts: Record<ProductType, DetailedProduct[]> = {
  mobile: [
    {
      id: 'iphone-15-pro',
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      price: 7999,
      thumbnail: '/images/iphone-15-pro.jpg',
      rating: 4.8,
      specs: {
        os: 'iOS 17',
        processor: 'A17 Pro',
        ram: '8GB',
        storage: '256GB',
        displaySize: '6.7英寸',
        displayType: 'Super Retina XDR',
        resolution: '2796 x 1290',
        ppi: '460',
        camera: '4800万像素主摄',
        frontCamera: '1200万像素',
        battery: '3200mAh',
        chargingSpeed: '20W有线快充',
        weight: '187g',
        color: '钛金属',
      },
      matchScore: 95,
      keyFactors: ['高性能处理器', '专业级相机系统', '钛金属机身'],
      fullDescription: 'iPhone 15 Pro 采用航空级钛金属材质，搭载 A17 Pro 芯片，配备专业级相机系统，带来前所未有的性能与体验。支持先进的摄影和摄像功能，如4K 60fps杜比视界，超广角拍摄和专业级人像模式。',
      imageGallery: [
        '/images/iphone-15-pro-1.jpg',
        '/images/iphone-15-pro-2.jpg',
        '/images/iphone-15-pro-3.jpg',
      ],
      reviews: [
        {
          id: '1',
          user: '张三',
          rating: 5,
          content: '性能非常强大，相机效果出色，整体体验很好。',
          date: '2024-02-15',
        },
        {
          id: '2',
          user: '李四',
          rating: 4,
          content: '价格稍贵，但物有所值。',
          date: '2024-02-14',
        },
      ],
      advantages: [
        'A17 Pro 芯片性能强劲',
        '专业级相机系统',
        '钛金属机身更轻更坚固',
        'USB-C 接口更通用',
      ],
      disadvantages: [
        '价格较高',
        '电池容量相对较小',
        '充电速度一般',
      ],
      availability: {
        online: true,
        stores: ['Apple官网', '京东', '天猫'],
        deliveryTime: '1-3天',
      },
      warranty: '1年有限保修',
      technicalSpecs: {
        cpu: {
          model: 'A17 Pro',
          cores: 6,
          frequency: '3.78GHz',
        },
        display: {
          type: 'Super Retina XDR OLED',
          size: '6.7英寸',
          resolution: '2796 x 1290像素',
          refreshRate: '120Hz自适应刷新率',
          brightness: '2000尼特峰值亮度',
          features: ['ProMotion技术', 'HDR显示', '原彩显示', '触控反馈', '始终显示'],
        },
        camera: {
          main: {
            megapixels: '4800万像素',
            aperture: 'f/1.78光圈',
            features: ['夜间模式', '深度融合', 'Smart HDR 4', '人像模式', '人像光效'],
          },
          ultra: {
            megapixels: '1200万像素',
            aperture: 'f/2.2光圈',
            features: ['120°视野', '夜间模式', '深度融合'],
          },
          telephoto: {
            megapixels: '1200万像素',
            aperture: 'f/2.8光圈',
            opticalZoom: '3倍光学变焦',
            features: ['夜间模式', '深度融合', '光学防抖'],
          },
          front: {
            megapixels: '1200万像素',
            aperture: 'f/1.9光圈',
            features: ['夜间模式', 'Smart HDR 4', '人像模式', '人像光效', '动态表情符号'],
          },
        },
        battery: {
          capacity: '3200mAh',
          chargingSpeed: '20W有线快充',
          wirelessCharging: true,
          reverseCharging: false,
          talkTime: '最长25小时',
          standbyTime: '最长75小时',
        },
        connectivity: {
          wifi: 'Wi-Fi 6E (802.11ax)',
          bluetooth: '蓝牙5.3',
          nfc: true,
          gps: ['GPS', 'GLONASS', '北斗', 'Galileo', 'QZSS'],
          ports: ['USB-C'],
        },
        sensors: ['面容ID', '气压计', '三轴陀螺仪', '加速感应器', '距离感应器', '环境光传感器'],
        security: ['面容ID', '安全隔区'],
      },
      designFeatures: [
        '钛金属边框',
        '磨砂玻璃背板',
        'IP68级防水防尘',
        'Ceramic Shield前面板',
      ],
      specialFeatures: [
        '动态岛',
        '操作按钮',
        'MagSafe无线充电',
        '空间音频',
        '紧急SOS',
        '车祸检测',
      ],
      operatingSystem: {
        name: 'iOS',
        version: '17',
        features: ['焦点模式', '实时文本', '健康应用', '隐私保护', '家庭共享'],
        updates: '提供5年以上系统更新支持',
      },
      inTheBox: [
        'iPhone 15 Pro',
        'USB-C充电线',
        '文档',
        'Apple贴纸',
      ],
      dimensions: {
        height: '146.7毫米',
        width: '71.5毫米',
        thickness: '8.25毫米',
        weight: '187克',
      },
      videos: [
        {
          title: 'iPhone 15 Pro介绍视频',
          url: 'https://www.example.com/videos/iphone15-pro-intro.mp4',
          thumbnail: '/images/video-thumb-iphone15-pro.jpg',
        },
        {
          title: 'iPhone 15 Pro相机测评',
          url: 'https://www.example.com/videos/iphone15-pro-camera.mp4',
          thumbnail: '/images/video-thumb-iphone15-pro-camera.jpg',
        },
      ],
      comparisonTable: {
        vs: [
          {
            name: 'iPhone 14 Pro',
            advantages: ['更强的A17 Pro处理器', '钛金属机身', 'USB-C接口'],
            disadvantages: ['价格更高'],
          },
          {
            name: 'Samsung Galaxy S24 Ultra',
            advantages: ['相机系统更优', '系统流畅性更好'],
            disadvantages: ['电池容量小于对方', '屏幕尺寸小于对方'],
          },
        ],
      },
    },
    {
      id: 'samsung-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      price: 9999,
      thumbnail: '/images/samsung-s24-ultra.jpg',
      rating: 4.7,
      specs: {
        os: 'Android 14',
        processor: '骁龙8 Gen 3',
        ram: '12GB',
        storage: '256GB',
        displaySize: '6.8英寸',
        displayType: 'Dynamic AMOLED 2X',
        resolution: '3088 x 1440',
        ppi: '501',
        camera: '200MP主摄',
        frontCamera: '1200万像素',
        battery: '5000mAh',
        chargingSpeed: '45W有线快充',
        weight: '233g',
        color: '钛黑',
      },
      matchScore: 92,
      keyFactors: ['超大屏幕', '顶级相机', 'AI功能丰富'],
      fullDescription: 'Samsung Galaxy S24 Ultra 采用钛金属框架，配备 6.8 英寸大屏，搭载骁龙 8 Gen 3 处理器，200MP 主摄带来专业级摄影体验。',
      imageGallery: [
        '/images/samsung-s24-ultra-1.jpg',
        '/images/samsung-s24-ultra-2.jpg',
        '/images/samsung-s24-ultra-3.jpg',
      ],
      reviews: [
        {
          id: '1',
          user: '王五',
          rating: 5,
          content: '屏幕显示效果非常出色，AI功能很实用。',
          date: '2024-02-16',
        },
        {
          id: '2',
          user: '赵六',
          rating: 4,
          content: '相机表现优秀，但机身稍重。',
          date: '2024-02-15',
        },
      ],
      advantages: [
        '超大屏幕显示',
        '顶级相机系统',
        'AI功能丰富',
        '快速充电',
      ],
      disadvantages: [
        '机身较重',
        '价格昂贵',
        '系统学习成本高',
      ],
      availability: {
        online: true,
        stores: ['三星官网', '京东', '天猫'],
        deliveryTime: '1-3天',
      },
      warranty: '1年有限保修',
    },
    {
      id: 'xiaomi-14-pro',
      name: 'Xiaomi 14 Pro',
      brand: 'Xiaomi',
      price: 4999,
      thumbnail: '/images/xiaomi-14-pro.jpg',
      rating: 4.6,
      specs: {
        os: 'MIUI 15',
        processor: '骁龙8 Gen 3',
        ram: '12GB',
        storage: '256GB',
        displaySize: '6.73英寸',
        displayType: 'LTPO AMOLED',
        resolution: '3200 x 1440',
        ppi: '522',
        camera: '5000万像素徕卡光学',
        frontCamera: '3200万像素',
        battery: '4880mAh',
        chargingSpeed: '120W有线快充',
        weight: '223g',
        color: '钛金黑',
      },
      matchScore: 90,
      keyFactors: ['徕卡相机', '超快充电', '性价比高'],
      fullDescription: 'Xiaomi 14 Pro 搭载徕卡光学系统，配备 120W 超快充电，带来专业级摄影体验和极速充电体验。',
      imageGallery: [
        '/images/xiaomi-14-pro-1.jpg',
        '/images/xiaomi-14-pro-2.jpg',
        '/images/xiaomi-14-pro-3.jpg',
      ],
      reviews: [
        {
          id: '1',
          user: '孙七',
          rating: 5,
          content: '充电速度非常快，相机效果出色。',
          date: '2024-02-17',
        },
        {
          id: '2',
          user: '周八',
          rating: 4,
          content: '性价比很高，但系统广告较多。',
          date: '2024-02-16',
        },
      ],
      advantages: [
        '徕卡相机系统',
        '超快充电速度',
        '高性价比',
        '大容量电池',
      ],
      disadvantages: [
        '系统广告较多',
        '机身较重',
        'MIUI学习成本高',
      ],
      availability: {
        online: true,
        stores: ['小米官网', '京东', '天猫'],
        deliveryTime: '1-3天',
      },
      warranty: '1年有限保修',
    },
  ],
  computer: [
    {
      id: 'macbook-pro-16',
      name: 'MacBook Pro 16',
      brand: 'Apple',
      price: 19999,
      thumbnail: '/images/macbook-pro-16.jpg',
      rating: 4.9,
      specs: {
        os: 'macOS Sonoma',
        processor: 'M3 Max',
        ram: '32GB',
        storage: '1TB SSD',
        displaySize: '16英寸',
        displayType: 'Liquid Retina XDR',
        resolution: '3456 x 2234',
        ppi: '254',
        battery: '100Wh',
        weight: '2.1kg',
        color: '深空黑',
      },
      matchScore: 98,
      keyFactors: ['强大性能', '专业级显示屏', '长续航'],
      fullDescription: 'MacBook Pro 16 搭载 M3 Max 芯片，配备 Liquid Retina XDR 显示屏，带来专业级性能和显示体验。',
      imageGallery: [
        '/images/macbook-pro-16-1.jpg',
        '/images/macbook-pro-16-2.jpg',
        '/images/macbook-pro-16-3.jpg',
      ],
      reviews: [
        {
          id: '1',
          user: '张明',
          rating: 5,
          content: '性能非常强大，适合专业工作。',
          date: '2024-02-18',
        },
        {
          id: '2',
          user: '李华',
          rating: 5,
          content: '屏幕显示效果出色，续航能力强。',
          date: '2024-02-17',
        },
      ],
      advantages: [
        'M3 Max 芯片性能强劲',
        '专业级显示屏',
        '长续航能力',
        '优秀散热系统',
      ],
      disadvantages: [
        '价格昂贵',
        '重量较重',
        '接口较少',
      ],
      availability: {
        online: true,
        stores: ['Apple官网', '京东', '天猫'],
        deliveryTime: '1-3天',
      },
      warranty: '1年有限保修',
    },
    {
      id: 'thinkpad-x1-carbon',
      name: 'ThinkPad X1 Carbon',
      brand: 'Lenovo',
      price: 12999,
      thumbnail: '/images/thinkpad-x1-carbon.jpg',
      rating: 4.7,
      specs: {
        os: 'Windows 11',
        processor: 'Intel Core i7-13700U',
        ram: '16GB',
        storage: '512GB SSD',
        displaySize: '14英寸',
        displayType: 'OLED',
        resolution: '2880 x 1800',
        ppi: '241',
        battery: '57Wh',
        weight: '1.12kg',
        color: '黑色',
      },
      matchScore: 95,
      keyFactors: ['轻薄便携', '商务办公', '可靠耐用'],
      fullDescription: 'ThinkPad X1 Carbon 采用轻薄设计，配备高性能处理器和 OLED 显示屏，是商务办公的理想选择。',
      imageGallery: [
        '/images/thinkpad-x1-carbon-1.jpg',
        '/images/thinkpad-x1-carbon-2.jpg',
        '/images/thinkpad-x1-carbon-3.jpg',
      ],
      reviews: [
        {
          id: '1',
          user: '王强',
          rating: 5,
          content: '轻薄便携，键盘手感好。',
          date: '2024-02-19',
        },
        {
          id: '2',
          user: '赵静',
          rating: 4,
          content: '商务办公首选，但价格稍贵。',
          date: '2024-02-18',
        },
      ],
      advantages: [
        '轻薄便携',
        '优秀键盘',
        '可靠耐用',
        '商务办公首选',
      ],
      disadvantages: [
        '价格较高',
        '电池容量一般',
        '散热表现一般',
      ],
      availability: {
        online: true,
        stores: ['联想官网', '京东', '天猫'],
        deliveryTime: '1-3天',
      },
      warranty: '1年有限保修',
    },
    {
      id: 'rog-zephyrus-g14',
      name: 'ROG Zephyrus G14',
      brand: 'ASUS',
      price: 9999,
      thumbnail: '/images/rog-zephyrus-g14.jpg',
      rating: 4.6,
      specs: {
        os: 'Windows 11',
        processor: 'AMD Ryzen 9 7940HS',
        ram: '16GB',
        storage: '1TB SSD',
        displaySize: '14英寸',
        displayType: 'QHD',
        resolution: '2560 x 1600',
        ppi: '216',
        battery: '76Wh',
        weight: '1.65kg',
        color: '月耀白',
      },
      matchScore: 92,
      keyFactors: ['游戏性能', '轻薄设计', '高刷新率'],
      fullDescription: 'ROG Zephyrus G14 搭载 AMD Ryzen 9 处理器，配备高刷新率显示屏，是游戏玩家的理想选择。',
      imageGallery: [
        '/images/rog-zephyrus-g14-1.jpg',
        '/images/rog-zephyrus-g14-2.jpg',
        '/images/rog-zephyrus-g14-3.jpg',
      ],
      reviews: [
        {
          id: '1',
          user: '刘伟',
          rating: 5,
          content: '游戏性能强大，散热效果好。',
          date: '2024-02-20',
        },
        {
          id: '2',
          user: '陈明',
          rating: 4,
          content: '轻薄游戏本，但续航一般。',
          date: '2024-02-19',
        },
      ],
      advantages: [
        '强大游戏性能',
        '轻薄便携',
        '高刷新率屏幕',
        '优秀散热系统',
      ],
      disadvantages: [
        '续航时间短',
        '价格较高',
        '风扇噪音大',
      ],
      availability: {
        online: true,
        stores: ['华硕官网', '京东', '天猫'],
        deliveryTime: '1-3天',
      },
      warranty: '1年有限保修',
    },
  ],
  mouse: [
    {
      id: 'logitech-mx-master-3s',
      name: 'Logitech MX Master 3S',
      brand: 'Logitech',
      price: 999,
      thumbnail: '/images/logitech-mx-master-3s.jpg',
      rating: 4.8,
      specs: {
        type: '无线办公鼠标',
        dpi: '8000',
        sensor: 'Darkfield',
        buttons: '7个可编程按键',
        weight: '141g',
        color: '石墨黑',
      },
      matchScore: 96,
      keyFactors: ['精准控制', '多设备切换', '人体工学设计'],
      fullDescription: 'Logitech MX Master 3S 采用 Darkfield 传感器，支持多设备切换，配备人体工学设计，是专业办公的理想选择。',
      imageGallery: [
        '/images/logitech-mx-master-3s-1.jpg',
        '/images/logitech-mx-master-3s-2.jpg',
        '/images/logitech-mx-master-3s-3.jpg',
      ],
      reviews: [
        {
          id: '1',
          user: '张明',
          rating: 5,
          content: '手感非常好，多设备切换很方便。',
          date: '2024-02-21',
        },
        {
          id: '2',
          user: '李华',
          rating: 4,
          content: '价格稍贵，但物有所值。',
          date: '2024-02-20',
        },
      ],
      advantages: [
        '精准控制',
        '多设备切换',
        '人体工学设计',
        '长续航时间',
      ],
      disadvantages: [
        '价格较高',
        '重量较重',
        '需要安装软件',
      ],
      availability: {
        online: true,
        stores: ['罗技官网', '京东', '天猫'],
        deliveryTime: '1-3天',
      },
      warranty: '1年有限保修',
    },
    {
      id: 'razer-deathadder-v3-pro',
      name: 'Razer DeathAdder V3 Pro',
      brand: 'Razer',
      price: 1299,
      thumbnail: '/images/razer-deathadder-v3-pro.jpg',
      rating: 4.7,
      specs: {
        type: '无线游戏鼠标',
        dpi: '30000',
        sensor: 'Focus Pro 30K',
        buttons: '6个可编程按键',
        weight: '64g',
        color: '黑色',
      },
      matchScore: 94,
      keyFactors: ['轻量化设计', '高精度传感器', 'RGB灯效'],
      fullDescription: 'Razer DeathAdder V3 Pro 采用轻量化设计，配备高精度传感器和 RGB 灯效，是游戏玩家的理想选择。',
      imageGallery: [
        '/images/razer-deathadder-v3-pro-1.jpg',
        '/images/razer-deathadder-v3-pro-2.jpg',
        '/images/razer-deathadder-v3-pro-3.jpg',
      ],
      reviews: [
        {
          id: '1',
          user: '王强',
          rating: 5,
          content: '轻量化设计，手感很好。',
          date: '2024-02-22',
        },
        {
          id: '2',
          user: '赵静',
          rating: 4,
          content: '游戏性能出色，但价格较贵。',
          date: '2024-02-21',
        },
      ],
      advantages: [
        '轻量化设计',
        '高精度传感器',
        'RGB灯效',
        '无线连接',
      ],
      disadvantages: [
        '价格昂贵',
        '续航时间短',
        '需要安装软件',
      ],
      availability: {
        online: true,
        stores: ['雷蛇官网', '京东', '天猫'],
        deliveryTime: '1-3天',
      },
      warranty: '1年有限保修',
    },
    {
      id: 'steelseries-prime-wireless',
      name: 'SteelSeries Prime Wireless',
      brand: 'SteelSeries',
      price: 799,
      thumbnail: '/images/steelseries-prime-wireless.jpg',
      rating: 4.6,
      specs: {
        type: '无线游戏鼠标',
        dpi: '18000',
        sensor: 'TrueMove Pro',
        buttons: '5个可编程按键',
        weight: '80g',
        color: '黑色',
      },
      matchScore: 92,
      keyFactors: ['轻量化设计', '高精度传感器', '长续航'],
      fullDescription: 'SteelSeries Prime Wireless 采用轻量化设计，配备高精度传感器，支持长续航，是游戏玩家的理想选择。',
      imageGallery: [
        '/images/steelseries-prime-wireless-1.jpg',
        '/images/steelseries-prime-wireless-2.jpg',
        '/images/steelseries-prime-wireless-3.jpg',
      ],
      reviews: [
        {
          id: '1',
          user: '刘伟',
          rating: 5,
          content: '续航时间长，手感很好。',
          date: '2024-02-23',
        },
        {
          id: '2',
          user: '陈明',
          rating: 4,
          content: '性价比不错，但软件体验一般。',
          date: '2024-02-22',
        },
      ],
      advantages: [
        '轻量化设计',
        '高精度传感器',
        '长续航时间',
        '无线连接',
      ],
      disadvantages: [
        '软件体验一般',
        '按键较少',
        '价格较高',
      ],
      availability: {
        online: true,
        stores: ['赛睿官网', '京东', '天猫'],
        deliveryTime: '1-3天',
      },
      warranty: '1年有限保修',
    },
  ],
  keyboard: [],
  monitor: [],
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

export default function ProductPage() {
  const router = useRouter();
  const { type, id } = router.query;
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');

  // 获取产品信息
  useEffect(() => {
    if (type && id && typeof type === 'string' && typeof id === 'string' && mockProducts[type as ProductType]) {
      const foundProduct = mockProducts[type as ProductType].find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }
  }, [type, id]);

  // 切换评价星级显示
  const renderStars = (rating: number) => {
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
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // 获取产品类型对应的渐变样式
  const getProductGradientClass = (productType: string): string => {
    switch (productType) {
      case 'mobile':
        return 'gradient-phone';
      case 'computer':
        return 'gradient-laptop';
      case 'mouse':
        return 'gradient-mouse';
      case 'keyboard':
        return 'gradient-keyboard';
      case 'monitor':
        return 'gradient-monitor';
      default:
        return 'gradient-primary';
    }
  };

  // 获取产品按钮样式
  const getProductButtonClass = (productType: string): string => {
    switch (productType) {
      case 'mobile':
        return 'bg-product-phone/80 hover:bg-product-phone text-foreground';
      case 'computer':
        return 'bg-product-laptop/80 hover:bg-product-laptop text-foreground';
      case 'mouse':
        return 'bg-product-mouse/80 hover:bg-product-mouse text-foreground';
      case 'keyboard':
        return 'bg-product-keyboard/80 hover:bg-product-keyboard text-foreground';
      case 'monitor':
        return 'bg-product-monitor/80 hover:bg-product-monitor text-foreground';
      default:
        return 'bg-primary hover:bg-primary/90';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">产品未找到</h1>
          <Link href="/" className="text-primary-600 hover:text-primary-800">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const gradientClass = getProductGradientClass(type as string);

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{product.name} - InstaChoice</title>
        <meta name="description" content={`${product.name} - ${product.fullDescription.substring(0, 150)}...`} />
      </Head>

      <header className="bg-card backdrop-blur-sm sticky top-0 z-30 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              首页
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/recommendation/${type}`} className="hover:text-primary">
              {productTypeNames[type as ProductType]}推荐
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 产品图片 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card rounded-xl p-4 flex items-center justify-center h-80 overflow-hidden">
              <img
                src={product.imageGallery?.[activeImageIndex] || product.thumbnail || ''}
                alt={product.name}
                className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            {product.imageGallery && product.imageGallery.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mt-4">
                {product.imageGallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      activeImageIndex === index
                        ? 'border-primary shadow-md'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-3xl">{product.brand === 'Apple' ? '🍎' : '📱'}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* 产品详情 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 rounded-xl"
          >
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${gradientClass}`}>
                匹配度: {product.matchScore}%
              </div>
              <div className="ml-4 flex items-center">
                {renderStars(product.rating)}
                <span className="ml-1 text-muted-foreground">{product.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-foreground mb-6">
              ¥{product.price.toLocaleString()}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">产品描述</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-2">关键优势</h2>
                <ul className="space-y-2">
                  {product.advantages.map((adv, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
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
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-2">不足之处</h2>
                <ul className="space-y-2">
                  {product.disadvantages.map((disadv, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-destructive mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span>{disadv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <button className={`btn button-fancy button-glow w-full ${getProductButtonClass(type as string)}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  立即购买
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 添加技术规格和特性部分 */}
        {product.technicalSpecs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">技术规格详情</h2>
            
            {/* CPU详情 */}
            {product.technicalSpecs.cpu && (
              <div className="glass-card p-6 rounded-xl mb-6">
                <h3 className="text-xl font-semibold mb-4">处理器</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">型号</span>
                      <span className="font-medium">{product.technicalSpecs.cpu.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">核心数</span>
                      <span className="font-medium">{product.technicalSpecs.cpu.cores}核</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">频率</span>
                      <span className="font-medium">{product.technicalSpecs.cpu.frequency}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 显示屏详情 */}
            {product.technicalSpecs.display && (
              <div className="glass-card p-6 rounded-xl mb-6">
                <h3 className="text-xl font-semibold mb-4">显示屏</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">类型</span>
                      <span className="font-medium">{product.technicalSpecs.display.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">尺寸</span>
                      <span className="font-medium">{product.technicalSpecs.display.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">分辨率</span>
                      <span className="font-medium">{product.technicalSpecs.display.resolution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">刷新率</span>
                      <span className="font-medium">{product.technicalSpecs.display.refreshRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">亮度</span>
                      <span className="font-medium">{product.technicalSpecs.display.brightness}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">特性</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.technicalSpecs.display.features.map((feature, index) => (
                        <span key={index} className={`inline-block px-2 py-1 text-xs rounded-md ${gradientClass}`}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 相机详情 */}
            {product.technicalSpecs.camera && (
              <div className="glass-card p-6 rounded-xl mb-6">
                <h3 className="text-xl font-semibold mb-4">相机系统</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 主摄 */}
                  <div className="space-y-4">
                    <h4 className="font-medium">主摄像头</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">像素</span>
                        <span className="font-medium">{product.technicalSpecs.camera.main.megapixels}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">光圈</span>
                        <span className="font-medium">{product.technicalSpecs.camera.main.aperture}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">功能</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.technicalSpecs.camera.main.features.map((feature, index) => (
                          <span key={index} className={`inline-block px-2 py-1 text-xs rounded-md ${gradientClass}`}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 前置摄像头 */}
                  <div className="space-y-4">
                    <h4 className="font-medium">前置摄像头</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">像素</span>
                        <span className="font-medium">{product.technicalSpecs.camera.front.megapixels}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">光圈</span>
                        <span className="font-medium">{product.technicalSpecs.camera.front.aperture}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">功能</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.technicalSpecs.camera.front.features.map((feature, index) => (
                          <span key={index} className={`inline-block px-2 py-1 text-xs rounded-md ${gradientClass}`}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 电池和连接性 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* 电池 */}
              {product.technicalSpecs.battery && (
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">电池与充电</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">容量</span>
                      <span className="font-medium">{product.technicalSpecs.battery.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">充电速度</span>
                      <span className="font-medium">{product.technicalSpecs.battery.chargingSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">无线充电</span>
                      <span className="font-medium">{product.technicalSpecs.battery.wirelessCharging ? '支持' : '不支持'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">通话时间</span>
                      <span className="font-medium">{product.technicalSpecs.battery.talkTime}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 连接性 */}
              {product.technicalSpecs.connectivity && (
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4">连接与接口</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wi-Fi</span>
                      <span className="font-medium">{product.technicalSpecs.connectivity.wifi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">蓝牙</span>
                      <span className="font-medium">{product.technicalSpecs.connectivity.bluetooth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">NFC</span>
                      <span className="font-medium">{product.technicalSpecs.connectivity.nfc ? '支持' : '不支持'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">接口</span>
                      <div className="mt-1">
                        {product.technicalSpecs?.connectivity?.ports?.map((port, index) => (
                          <span key={index} className="font-medium">
                            {port}
                            {index < (product.technicalSpecs?.connectivity?.ports?.length || 0) - 1 ? '、' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 设计特点和内含物品 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* 设计特点 */}
          {product.designFeatures && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-4">设计特点</h3>
              <ul className="space-y-2">
                {product.designFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary mr-2 mt-0.5"
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
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* 盒内物品 */}
          {product.inTheBox && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-4">包装内物品</h3>
              <ul className="space-y-2">
                {product.inTheBox.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* 与其他手机对比 */}
        {product.comparisonTable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 glass-card p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold mb-6">与其他手机对比</h3>
            
            <div className="space-y-6">
              {product.comparisonTable.vs.map((comparison, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-4">与 {comparison.name} 对比</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 优势 */}
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-green-500">相对优势</h5>
                      <ul className="space-y-2">
                        {comparison.advantages.map((adv, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-green-500 mr-2 mt-0.5"
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
                            <span className="text-sm">{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* 劣势 */}
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-destructive">相对劣势</h5>
                      <ul className="space-y-2">
                        {comparison.disadvantages.map((disadv, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-destructive mr-2 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <span className="text-sm">{disadv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 规格和评价标签页 */}
        <div className="mt-12">
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'specs'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                产品规格
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                用户评价
              </button>
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'specs' ? (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* 按分组显示规格 */}
                {Object.entries(product.specs).map(([key, value], index) => (
                  <motion.div key={key} variants={item} className="glass-card p-4 animate-fade-in">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{specLabels[key] || key}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
              >
                {/* 评价统计 */}
                <motion.div variants={item} className="glass-card p-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">{product.rating.toFixed(1)}</div>
                      <div className="flex mt-1">
                        {renderStars(product.rating)}
                      </div>
                      <div className="text-muted-foreground mt-1">
                        基于 {product.reviews.length} 条评价
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">购买渠道</div>
                      <div className="font-medium">{product.availability.stores.join('、')}</div>
                    </div>
                  </div>
                </motion.div>

                {/* 用户评价列表 */}
                {product.reviews.map(review => (
                  <motion.div key={review.id} variants={item} className="glass-card p-6 animate-fade-in">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{review.user}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {renderStars(review.rating)}
                          <span className="ml-1">{review.rating.toFixed(1)}</span>
                          <span className="mx-2">·</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground">{review.content}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* 购买信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 glass-card p-6 rounded-xl"
        >
          <h2 className="text-lg font-medium mb-4">购买信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">线上购买</span>
              <span className="font-medium">{product.availability.online ? '可购买' : '暂不可购买'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">预计发货</span>
              <span className="font-medium">{product.availability.deliveryTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">保修政策</span>
              <span className="font-medium">{product.warranty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">购买渠道</span>
              <span className="font-medium">{product.availability.stores.join('、')}</span>
            </div>
          </div>
        </motion.div>

        {/* 相关推荐 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">相关推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockProducts[type as ProductType]
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(p => (
                <motion.div
                  key={p.id}
                  whileHover={{ scale: 1.03 }}
                  className="card-product p-6 hover-scale"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mb-4">
                      <span className="text-3xl">{p.brand === 'Apple' ? '🍎' : '📱'}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{p.name}</h3>
                    <p className="text-primary mb-2">{p.brand}</p>
                    <p className="text-xl font-bold mb-4">¥{p.price.toLocaleString()}</p>
                    <Link
                      href={`/product/${type}/${p.id}`}
                      className={`btn button-fancy w-full ${getProductButtonClass(type as string)}`}
                    >
                      查看详情
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </main>

      <footer className="bg-muted py-8 mt-20 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 InstaChoice - 智能电子产品选择平台</p>
        </div>
      </footer>
    </div>
  );
} 