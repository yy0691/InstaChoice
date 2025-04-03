import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="zh-CN">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="InstaChoice - 智能电子产品选择平台" />
          <link rel="icon" href="/favicon.ico" />
          {/* 预先添加空类名，防止闪烁 */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  // 检查是否已经有主题设置
                  const theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  
                  // 先设置类名，防止闪烁
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  // 如果出错，不做任何操作
                  console.error('初始化主题失败:', e);
                }
              `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 