module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 主要品牌色彩 - 溫暖的珊瑚色系
        primary: '#FF6B6B', // 活潑的珊瑚紅
        'primary-light': '#FFE8E8', // 淺珊瑚粉
        'primary-dark': '#E85555', // 深珊瑚紅

        // 次要色彩 - 清新的薄荷綠系
        secondary: '#4ECDC4', // 薄荷綠
        'secondary-light': '#E8F8F7', // 淺薄荷
        'secondary-dark': '#45B7AF', // 深薄荷

        // 輔助色彩 - 溫暖的黃橙色系
        accent: '#FFA726', // 溫暖橙色
        'accent-light': '#FFF3E0', // 淺橙色
        'accent-dark': '#F57C00', // 深橙色

        // 特殊用途色彩
        selection: '#FFE0B2', // 溫暖的選取色
        highlight: '#FFF9C4', // 高亮色

        // 中性色彩 - 溫暖的灰色系
        border: '#E0E0E0', // 淺灰邊框
        'gray-warm': '#F8F9FA', // 溫暖灰背景
        'gray-light': '#F5F5F5', // 更淺的灰色
        white: '#FFFFFF',

        // 文字色彩 - 確保在白色背景下的可讀性
        'text-primary': '#2C3E50', // 主要文字色
        'text-secondary': '#5A6C7D', // 次要文字色
        'text-muted': '#95A5A6', // 靜音文字色

        // 深色模式色彩
        'dark-bg': '#1A1A1A', // 深色背景
        'dark-bg-secondary': '#2D2D2D', // 深色次要背景
        'dark-bg-tertiary': '#404040', // 深色第三級背景
        'dark-border': '#404040', // 深色邊框
        'dark-text-primary': '#E5E5E5', // 深色主要文字
        'dark-text-secondary': '#B0B0B0', // 深色次要文字
        'dark-text-muted': '#808080', // 深色靜音文字

        // 漸層色彩 - 活潑的漸層
        'gradient-sunset': 'linear-gradient(135deg, #FF6B6B 0%, #FFA726 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFA726 0%, #FF6B6B 100%)',

        // 透明度色彩
        overlay: 'rgba(0,0,0,0.6)',
        'overlay-light': 'rgba(255,255,255,0.5)',
      },
    },
  },
  plugins: [],
};
