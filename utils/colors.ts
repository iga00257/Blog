// 顏色常數定義 - 專業且童趣的配色方案
export const COLORS = {
  // 主要品牌色彩 - 溫暖的珊瑚色系
  PRIMARY: '#FF6B6B', // 活潑的珊瑚紅
  PRIMARY_LIGHT: '#FFE8E8', // 淺珊瑚粉
  PRIMARY_DARK: '#E85555', // 深珊瑚紅

  // 次要色彩 - 清新的薄荷綠系
  SECONDARY: '#4ECDC4', // 薄荷綠
  SECONDARY_LIGHT: '#E8F8F7', // 淺薄荷
  SECONDARY_DARK: '#45B7AF', // 深薄荷

  // 輔助色彩 - 溫暖的黃橙色系
  ACCENT: '#FFA726', // 溫暖橙色
  ACCENT_LIGHT: '#FFF3E0', // 淺橙色
  ACCENT_DARK: '#F57C00', // 深橙色

  // 特殊用途色彩
  SELECTION: '#FFE0B2', // 溫暖的選取色
  HIGHLIGHT: '#FFF9C4', // 高亮色

  // 中性色彩 - 溫暖的灰色系
  BORDER: '#E0E0E0', // 淺灰邊框
  GRAY_WARM: '#F8F9FA', // 溫暖灰背景
  GRAY_LIGHT: '#F5F5F5', // 更淺的灰色
  WHITE: '#FFFFFF',

  // 文字色彩 - 確保在白色背景下的可讀性
  TEXT_PRIMARY: '#2C3E50', // 主要文字色
  TEXT_SECONDARY: '#5A6C7D', // 次要文字色
  TEXT_MUTED: '#95A5A6', // 靜音文字色

  // 深色模式色彩
  DARK_BG: '#1A1A1A', // 深色背景
  DARK_BG_SECONDARY: '#2D2D2D', // 深色次要背景
  DARK_BG_TERTIARY: '#404040', // 深色第三級背景
  DARK_BORDER: '#404040', // 深色邊框
  DARK_TEXT_PRIMARY: '#E5E5E5', // 深色主要文字
  DARK_TEXT_SECONDARY: '#B0B0B0', // 深色次要文字
  DARK_TEXT_MUTED: '#808080', // 深色靜音文字

  // 透明度色彩
  OVERLAY: 'rgba(0,0,0,0.6)',
  OVERLAY_LIGHT: 'rgba(255,255,255,0.5)',
} as const;

// 漸層色彩 - 活潑的漸層
export const GRADIENTS = {
  SUNSET: 'linear-gradient(135deg, #FF6B6B 0%, #FFA726 100%)',
  OCEAN: 'linear-gradient(135deg, #4ECDC4 0%, #45B7AF 100%)',
  WARM: 'linear-gradient(135deg, #FFA726 0%, #FF6B6B 100%)',
} as const;
