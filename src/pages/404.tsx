import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>页面未找到 - InstaChoice</title>
        <meta name="description" content="无法找到您请求的页面" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            InstaChoice
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full text-center"
        >
          <div className="text-9xl font-bold text-primary-200 mb-6">404</div>
          <h1 className="text-3xl font-bold mb-4">页面未找到</h1>
          <p className="text-secondary-600 mb-8">
            抱歉，您访问的页面不存在或已被移除。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn btn-primary">
              返回首页
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="btn btn-outline"
            >
              返回上一页
            </button>
          </div>
        </motion.div>
      </main>

      <footer className="bg-secondary-50 py-6">
        <div className="container mx-auto px-4 text-center text-secondary-500">
          <p>© 2025 InstaChoice - 智能电子产品选择平台</p>
        </div>
      </footer>
    </div>
  );
} 