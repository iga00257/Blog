import PageHead from "../components/PageHead";

export default function ThemeTest() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text-primary transition-colors duration-300">
      <PageHead title="主題測試 | Derrick Liu" />

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">深色模式測試頁面</h1>

        {/* 顏色展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-primary text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">主要品牌色</h3>
            <p>#FF6B6B - 珊瑚紅</p>
          </div>

          <div className="bg-secondary text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">次要色彩</h3>
            <p>#4ECDC4 - 薄荷綠</p>
          </div>

          <div className="bg-accent text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">輔助色彩</h3>
            <p>#FFA726 - 溫暖橙色</p>
          </div>
        </div>

        {/* 背景色展示 */}
        <div className="space-y-6 mb-12">
          <div className="bg-gray-warm dark:bg-dark-bg-secondary p-6 rounded-lg border border-border dark:border-dark-border">
            <h3 className="text-xl font-bold mb-2">次要背景</h3>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              淺色模式：溫暖灰背景 | 深色模式：深灰背景
            </p>
          </div>

          <div className="bg-gray-light dark:bg-dark-bg-tertiary p-6 rounded-lg border border-border dark:border-dark-border">
            <h3 className="text-xl font-bold mb-2">第三級背景</h3>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              淺色模式：更淺的灰色 | 深色模式：更深的灰色
            </p>
          </div>
        </div>

        {/* 文字色展示 */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold">文字色彩測試</h2>
          <p className="text-text-primary dark:text-dark-text-primary">
            主要文字顏色 - 這是主要的文字內容
          </p>
          <p className="text-text-secondary dark:text-dark-text-secondary">
            次要文字顏色 - 這是次要的文字內容
          </p>
          <p className="text-text-muted dark:text-dark-text-muted">
            靜音文字顏色 - 這是靜音的文字內容
          </p>
        </div>

        {/* 按鈕展示 */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold">按鈕測試</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors duration-200">
              主要按鈕
            </button>
            <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg transition-colors duration-200">
              次要按鈕
            </button>
            <button className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg transition-colors duration-200">
              輔助按鈕
            </button>
            <button className="bg-gray-warm dark:bg-dark-bg-secondary text-text-primary dark:text-dark-text-primary border border-border dark:border-dark-border px-6 py-3 rounded-lg transition-colors duration-200">
              中性按鈕
            </button>
          </div>
        </div>

        {/* 卡片展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-dark-bg-secondary border border-border dark:border-dark-border rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">卡片標題</h3>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
              這是一個示例卡片，展示在深色模式下的效果。
            </p>
            <button className="bg-primary text-white px-4 py-2 rounded transition-colors duration-200">
              卡片按鈕
            </button>
          </div>

          <div className="bg-gray-warm dark:bg-dark-bg-tertiary border border-border dark:border-dark-border rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">另一個卡片</h3>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
              這個卡片使用了不同的背景色來展示層次感。
            </p>
            <button className="bg-secondary text-white px-4 py-2 rounded transition-colors duration-200">
              另一個按鈕
            </button>
          </div>
        </div>

        {/* 說明 */}
        <div className="bg-primary-light dark:bg-dark-bg-secondary p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">使用說明</h3>
          <ul className="space-y-2 text-text-secondary dark:text-dark-text-secondary">
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
