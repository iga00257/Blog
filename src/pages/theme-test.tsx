import PageHead from '../components/PageHead';

export default function ThemeTest() {
  return (
    <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
      <PageHead title='主題測試 | Derrick Liu' />

      <div className='container mx-auto px-6 py-12'>
        <h1 className='mb-8 text-4xl font-bold'>深色模式測試頁面</h1>

        {/* 顏色展示 */}
        <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <div className='rounded-lg bg-primary p-6 text-primary-foreground'>
            <h3 className='mb-2 text-xl font-bold'>主要品牌色</h3>
            <p>#FF6B6B - 珊瑚紅</p>
          </div>

          <div className='rounded-lg bg-secondary p-6 text-secondary-foreground'>
            <h3 className='mb-2 text-xl font-bold'>次要色彩</h3>
            <p>#4ECDC4 - 薄荷綠</p>
          </div>

          <div className='rounded-lg bg-accent p-6 text-accent-foreground'>
            <h3 className='mb-2 text-xl font-bold'>輔助色彩</h3>
            <p>#FFA726 - 溫暖橙色</p>
          </div>
        </div>

        {/* 背景色展示 */}
        <div className='mb-12 space-y-6'>
          <div className='rounded-lg border bg-muted p-6'>
            <h3 className='mb-2 text-xl font-bold'>次要背景</h3>
            <p className='text-muted-foreground'>淺色模式：溫暖灰背景 | 深色模式：深灰背景</p>
          </div>

          <div className='rounded-lg border bg-card p-6'>
            <h3 className='mb-2 text-xl font-bold'>卡片背景</h3>
            <p className='text-muted-foreground'>淺色模式：白色背景 | 深色模式：深色背景</p>
          </div>
        </div>

        {/* 文字色展示 */}
        <div className='mb-12 space-y-4'>
          <h2 className='text-2xl font-bold'>文字色彩測試</h2>
          <p className='text-foreground'>主要文字顏色 - 這是主要的文字內容</p>
          <p className='text-muted-foreground'>次要文字顏色 - 這是次要的文字內容</p>
          <p className='text-muted-foreground'>靜音文字顏色 - 這是靜音的文字內容</p>
        </div>

        {/* 按鈕展示 */}
        <div className='mb-12 space-y-4'>
          <h2 className='text-2xl font-bold'>按鈕測試</h2>
          <div className='flex flex-wrap gap-4'>
            <button className='hover:bg-primary/90 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors duration-200'>
              主要按鈕
            </button>
            <button className='hover:bg-secondary/90 rounded-lg bg-secondary px-6 py-3 text-secondary-foreground transition-colors duration-200'>
              次要按鈕
            </button>
            <button className='hover:bg-accent/90 rounded-lg bg-accent px-6 py-3 text-accent-foreground transition-colors duration-200'>
              輔助按鈕
            </button>
            <button className='rounded-lg border bg-background px-6 py-3 text-foreground transition-colors duration-200 hover:bg-accent'>
              中性按鈕
            </button>
          </div>
        </div>

        {/* 卡片展示 */}
        <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='rounded-lg border bg-card p-6 shadow-lg'>
            <h3 className='mb-4 text-xl font-bold'>卡片標題</h3>
            <p className='mb-4 text-muted-foreground'>這是一個示例卡片，展示在深色模式下的效果。</p>
            <button className='rounded bg-primary px-4 py-2 text-primary-foreground transition-colors duration-200'>
              卡片按鈕
            </button>
          </div>

          <div className='rounded-lg border bg-muted p-6 shadow-lg'>
            <h3 className='mb-4 text-xl font-bold'>另一個卡片</h3>
            <p className='mb-4 text-muted-foreground'>這個卡片使用了不同的背景色來展示層次感。</p>
            <button className='rounded bg-secondary px-4 py-2 text-secondary-foreground transition-colors duration-200'>
              另一個按鈕
            </button>
          </div>
        </div>

        {/* 說明 */}
        <div className='rounded-lg bg-primary p-6 text-primary-foreground'>
          <h3 className='mb-4 text-xl font-bold'>使用說明</h3>
          <ul className='text-primary-foreground/90 space-y-2'>
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
