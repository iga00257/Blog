import PageHead from '../components/PageHead';

export default function ThemeTest() {
  return (
    <div className='min-h-screen bg-white text-text-primary transition-colors duration-300 dark:bg-dark-bg dark:text-dark-text-primary'>
      <PageHead title='主題測試 | Derrick Liu' />

      <div className='container mx-auto px-6 py-12'>
        <h1 className='mb-8 text-4xl font-bold'>深色模式測試頁面</h1>

        {/* 顏色展示 */}
        <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <div className='rounded-lg bg-primary p-6 text-white'>
            <h3 className='mb-2 text-xl font-bold'>主要品牌色</h3>
            <p>#FF6B6B - 珊瑚紅</p>
          </div>

          <div className='rounded-lg bg-secondary p-6 text-white'>
            <h3 className='mb-2 text-xl font-bold'>次要色彩</h3>
            <p>#4ECDC4 - 薄荷綠</p>
          </div>

          <div className='rounded-lg bg-accent p-6 text-white'>
            <h3 className='mb-2 text-xl font-bold'>輔助色彩</h3>
            <p>#FFA726 - 溫暖橙色</p>
          </div>
        </div>

        {/* 背景色展示 */}
        <div className='mb-12 space-y-6'>
          <div className='rounded-lg border border-border bg-gray-warm p-6 dark:border-dark-border dark:bg-dark-bg-secondary'>
            <h3 className='mb-2 text-xl font-bold'>次要背景</h3>
            <p className='text-text-secondary dark:text-dark-text-secondary'>
              淺色模式：溫暖灰背景 | 深色模式：深灰背景
            </p>
          </div>

          <div className='rounded-lg border border-border bg-gray-light p-6 dark:border-dark-border dark:bg-dark-bg-tertiary'>
            <h3 className='mb-2 text-xl font-bold'>第三級背景</h3>
            <p className='text-text-secondary dark:text-dark-text-secondary'>
              淺色模式：更淺的灰色 | 深色模式：更深的灰色
            </p>
          </div>
        </div>

        {/* 文字色展示 */}
        <div className='mb-12 space-y-4'>
          <h2 className='text-2xl font-bold'>文字色彩測試</h2>
          <p className='text-text-primary dark:text-dark-text-primary'>
            主要文字顏色 - 這是主要的文字內容
          </p>
          <p className='text-text-secondary dark:text-dark-text-secondary'>
            次要文字顏色 - 這是次要的文字內容
          </p>
          <p className='text-text-muted dark:text-dark-text-muted'>
            靜音文字顏色 - 這是靜音的文字內容
          </p>
        </div>

        {/* 按鈕展示 */}
        <div className='mb-12 space-y-4'>
          <h2 className='text-2xl font-bold'>按鈕測試</h2>
          <div className='flex flex-wrap gap-4'>
            <button className='rounded-lg bg-primary px-6 py-3 text-white transition-colors duration-200 hover:bg-primary-dark'>
              主要按鈕
            </button>
            <button className='rounded-lg bg-secondary px-6 py-3 text-white transition-colors duration-200 hover:bg-secondary-dark'>
              次要按鈕
            </button>
            <button className='rounded-lg bg-accent px-6 py-3 text-white transition-colors duration-200 hover:bg-accent-dark'>
              輔助按鈕
            </button>
            <button className='rounded-lg border border-border bg-gray-warm px-6 py-3 text-text-primary transition-colors duration-200 dark:border-dark-border dark:bg-dark-bg-secondary dark:text-dark-text-primary'>
              中性按鈕
            </button>
          </div>
        </div>

        {/* 卡片展示 */}
        <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='rounded-lg border border-border bg-white p-6 shadow-lg dark:border-dark-border dark:bg-dark-bg-secondary'>
            <h3 className='mb-4 text-xl font-bold'>卡片標題</h3>
            <p className='mb-4 text-text-secondary dark:text-dark-text-secondary'>
              這是一個示例卡片，展示在深色模式下的效果。
            </p>
            <button className='rounded bg-primary px-4 py-2 text-white transition-colors duration-200'>
              卡片按鈕
            </button>
          </div>

          <div className='rounded-lg border border-border bg-gray-warm p-6 shadow-lg dark:border-dark-border dark:bg-dark-bg-tertiary'>
            <h3 className='mb-4 text-xl font-bold'>另一個卡片</h3>
            <p className='mb-4 text-text-secondary dark:text-dark-text-secondary'>
              這個卡片使用了不同的背景色來展示層次感。
            </p>
            <button className='rounded bg-secondary px-4 py-2 text-white transition-colors duration-200'>
              另一個按鈕
            </button>
          </div>
        </div>

        {/* 說明 */}
        <div className='rounded-lg bg-primary-light p-6 dark:bg-dark-bg-secondary'>
          <h3 className='mb-4 text-xl font-bold'>使用說明</h3>
          <ul className='space-y-2 text-text-secondary dark:text-dark-text-secondary'>
            <li>• 點擊右上角的太陽/月亮圖標來切換主題</li>
            <li>• 主題設定會自動保存到本地存儲</li>
            <li>• 首次訪問會根據系統偏好自動選擇主題</li>
            <li>• 所有顏色都會平滑過渡</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
