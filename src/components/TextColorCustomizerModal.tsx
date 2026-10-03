import React, { useState } from 'react';
import {
  Palette,
  X,
  Check,
  Sparkles,
  Sliders,
  Type,
  RotateCcw,
  Sun,
  Moon,
  Eye,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkle,
  Contrast,
  Mountain,
  Anchor,
  TreePine,
  Sunset,
  ShieldCheck,
  AlertTriangle,
  Gauge,
  Info,
  FileJson,
} from 'lucide-react';

// ==========================================
// WCAG 2.1 Accessibility & Contrast Math
// ==========================================

export function hexToRgb(hex: string): [number, number, number] | null {
  if (!hex || typeof hex !== 'string') return null;
  let cleaned = hex.replace(/^#/, '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (cleaned.length !== 6) return null;
  const num = parseInt(cleaned, 16);
  if (isNaN(num)) return null;
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function getRelativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(fgHex: string, bgHex: string): number {
  const fgRgb = hexToRgb(fgHex) || [0, 0, 0];
  const bgRgb = hexToRgb(bgHex) || [255, 255, 255];
  const l1 = getRelativeLuminance(fgRgb);
  const l2 = getRelativeLuminance(bgRgb);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 10) / 10;
}

export interface ContrastScoreResult {
  ratio: number;
  score: number; // 0 to 100
  wcagLevel: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  rating: string;
  isCompliant: boolean;
  colorClass: string;
  bgClass: string;
  badgeClass: string;
  progressPercent: number;
  summary: string;
}

export function calculateContrastScore(fgHex: string, bgHex: string): ContrastScoreResult {
  const ratio = getContrastRatio(fgHex, bgHex);

  if (ratio >= 7.0) {
    const score = Math.min(100, Math.round(85 + ((ratio - 7.0) / 14.0) * 15));
    const progressPercent = Math.min(100, Math.round(75 + ((ratio - 7.0) / 14.0) * 25));
    return {
      ratio,
      score,
      wcagLevel: 'AAA',
      rating: 'Exceptional (AAA)',
      isCompliant: true,
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      bgClass: 'bg-emerald-500',
      badgeClass:
        'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
      progressPercent,
      summary: 'Passes all WCAG 2.1 AAA accessibility benchmarks for high visual clarity and eye comfort.',
    };
  }

  if (ratio >= 4.5) {
    const score = Math.round(70 + ((ratio - 4.5) / 2.5) * 14);
    const progressPercent = Math.round(50 + ((ratio - 4.5) / 2.5) * 25);
    return {
      ratio,
      score,
      wcagLevel: 'AA',
      rating: 'Standard Pass (AA)',
      isCompliant: true,
      colorClass: 'text-blue-600 dark:text-blue-400',
      bgClass: 'bg-blue-500',
      badgeClass:
        'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800',
      progressPercent,
      summary: 'Meets WCAG 2.1 AA standard requirements for normal body text and digital editorial legibility.',
    };
  }

  if (ratio >= 3.0) {
    const score = Math.round(45 + ((ratio - 3.0) / 1.5) * 24);
    const progressPercent = Math.round(25 + ((ratio - 3.0) / 1.5) * 25);
    return {
      ratio,
      score,
      wcagLevel: 'AA Large',
      rating: 'Large Text Only (AA Large)',
      isCompliant: true,
      colorClass: 'text-amber-600 dark:text-amber-400',
      bgClass: 'bg-amber-500',
      badgeClass:
        'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
      progressPercent,
      summary: 'Passes for large text (18pt+) and prominent headings, but may cause strain for dense body copy.',
    };
  }

  const score = Math.max(8, Math.round((ratio / 3.0) * 44));
  const progressPercent = Math.max(5, Math.round((ratio / 3.0) * 25));
  return {
    ratio,
    score,
    wcagLevel: 'Fail',
    rating: 'Low Contrast',
    isCompliant: false,
    colorClass: 'text-rose-600 dark:text-rose-400',
    bgClass: 'bg-rose-500',
    badgeClass:
      'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800',
    progressPercent,
    summary: 'Below WCAG threshold. Low contrast may be difficult to read in bright sunlight or for low-vision users.',
  };
}

export interface TextColorTheme {
  id: string;
  name: string;
  category: string;
  iconId: 'monochrome' | 'earth' | 'pastel' | 'navy' | 'forest' | 'sunset';
  light: {
    main: string;
    heading: string;
    muted: string;
    accent: string;
    bg?: string;
  };
  dark: {
    main: string;
    heading: string;
    muted: string;
    accent: string;
    bg?: string;
  };
  description: string;
  swatch: string;
  paletteColors: string[];
}

export const THEME_ICONS: Record<string, React.FC<{ className?: string }>> = {
  monochrome: Contrast,
  'earth-tones': Mountain,
  'pastel-pop': Sparkles,
  'midnight-navy': Anchor,
  'forest-emerald': TreePine,
  'sunset-rose': Sunset,
};

export const TEXT_COLOR_THEMES: TextColorTheme[] = [
  {
    id: 'monochrome',
    name: 'Monochrome',
    category: 'High-Contrast Minimalist',
    iconId: 'monochrome',
    light: {
      main: '#09090B',
      heading: '#000000',
      muted: '#475569',
      accent: '#18181B',
      bg: '#F8FAFC',
    },
    dark: {
      main: '#F8FAFC',
      heading: '#FFFFFF',
      muted: '#94A3B8',
      accent: '#E2E8F0',
      bg: '#09090B',
    },
    description: 'Ultra-crisp high-contrast black & white for maximum legibility and gallery-grade minimalism.',
    swatch: '#09090B',
    paletteColors: ['#000000', '#09090B', '#475569', '#18181B'],
  },
  {
    id: 'earth-tones',
    name: 'Earth Tones',
    category: 'Warm Organic Luxury',
    iconId: 'earth',
    light: {
      main: '#1F1610',
      heading: '#140E0A',
      muted: '#5C4838',
      accent: '#B45309',
      bg: '#FAF6F0',
    },
    dark: {
      main: '#FEF3C7',
      heading: '#FFFBEB',
      muted: '#D97706',
      accent: '#FBBF24',
      bg: '#1A1410',
    },
    description: 'Rich Tuscan terracotta, natural linen, warm clay, and deep roasted espresso.',
    swatch: '#B45309',
    paletteColors: ['#140E0A', '#1F1610', '#5C4838', '#B45309'],
  },
  {
    id: 'pastel-pop',
    name: 'Pastel Pop',
    category: 'Playful Haute Couture',
    iconId: 'pastel',
    light: {
      main: '#1E1B2E',
      heading: '#0F0E17',
      muted: '#645D78',
      accent: '#D946EF',
      bg: '#FAF5FF',
    },
    dark: {
      main: '#FAF5FF',
      heading: '#FFFFFF',
      muted: '#E9D5FF',
      accent: '#F472B6',
      bg: '#1A1226',
    },
    description: 'Playful bubblegum magenta, electric candy violet, lilac mist, and soft pastels.',
    swatch: '#D946EF',
    paletteColors: ['#0F0E17', '#1E1B2E', '#645D78', '#D946EF'],
  },
  {
    id: 'midnight-navy',
    name: 'Midnight Navy',
    category: 'Nautical Chic',
    iconId: 'navy',
    light: {
      main: '#0B192C',
      heading: '#020617',
      muted: '#334155',
      accent: '#2563EB',
      bg: '#F0F7FF',
    },
    dark: {
      main: '#F0F9FF',
      heading: '#FFFFFF',
      muted: '#7DD3FC',
      accent: '#38BDF8',
      bg: '#0B1220',
    },
    description: 'Deep Atlantic navy, tailored cobalt pinstripes, and crisp maritime ice highlights.',
    swatch: '#1D4ED8',
    paletteColors: ['#020617', '#0B192C', '#334155', '#2563EB'],
  },
  {
    id: 'forest-emerald',
    name: 'Forest Emerald',
    category: 'Natural Botanical',
    iconId: 'forest',
    light: {
      main: '#022C22',
      heading: '#064E3B',
      muted: '#065F46',
      accent: '#059669',
      bg: '#F0FDF4',
    },
    dark: {
      main: '#ECFDF5',
      heading: '#F0FDF4',
      muted: '#34D399',
      accent: '#6EE7B7',
      bg: '#081D17',
    },
    description: 'Deep alpine pine, British racing green, eucalyptus sage, and radiant jade.',
    swatch: '#064E3B',
    paletteColors: ['#064E3B', '#022C22', '#065F46', '#059669'],
  },
  {
    id: 'sunset-rose',
    name: 'Sunset Rose',
    category: 'Romantic Luxury',
    iconId: 'sunset',
    light: {
      main: '#4C0519',
      heading: '#881337',
      muted: '#9F1239',
      accent: '#E11D48',
      bg: '#FFF1F2',
    },
    dark: {
      main: '#FFF1F2',
      heading: '#FFFFFF',
      muted: '#FB7185',
      accent: '#FDA4AF',
      bg: '#200812',
    },
    description: 'Velvety burgundy, vintage Tuscan rose, warm peach amber, and ruby tones.',
    swatch: '#881337',
    paletteColors: ['#881337', '#4C0519', '#9F1239', '#E11D48'],
  },
];

interface TextColorCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  onSelectTheme: (theme: TextColorTheme) => void;
  customColors: {
    main: string;
    heading: string;
    muted: string;
    accent: string;
  };
  onUpdateCustomColors: (colors: {
    main: string;
    heading: string;
    muted: string;
    accent: string;
  }) => void;
  fontSizeScale: number;
  setFontSizeScale: (scale: number) => void;
  fontWeightBoost: string;
  setFontWeightBoost: (weight: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onResetToDefault?: () => void;
}

export const TextColorCustomizerModal: React.FC<TextColorCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme,
  customColors,
  onUpdateCustomColors,
  fontSizeScale,
  setFontSizeScale,
  fontWeightBoost,
  setFontWeightBoost,
  isDarkMode,
  toggleDarkMode,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom' | 'typography'>('presets');
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  // Resolve current theme with fallback
  const currentTheme =
    TEXT_COLOR_THEMES.find((t) => t.id === currentThemeId) ||
    TEXT_COLOR_THEMES.find((t) => t.id === 'monochrome') ||
    TEXT_COLOR_THEMES[0];

  const activeColors =
    currentThemeId === 'custom'
      ? customColors
      : isDarkMode
      ? currentTheme.dark
      : currentTheme.light;

  // Real-time background determination based on light/dark mode and active theme
  const currentBgHex = isDarkMode
    ? currentThemeId === 'custom'
      ? '#15151C'
      : currentTheme.dark?.bg || '#15151C'
    : currentThemeId === 'custom'
    ? '#FAF8F5'
    : currentTheme.light?.bg || '#FAF8F5';

  // Real-time contrast calculations against active background
  const primaryContrast = calculateContrastScore(activeColors.main, currentBgHex);
  const headingContrast = calculateContrastScore(activeColors.heading, currentBgHex);
  const mutedContrast = calculateContrastScore(activeColors.muted, currentBgHex);
  const accentContrast = calculateContrastScore(activeColors.accent, currentBgHex);

  // Composite accessibility score (weighted: 45% body, 30% heading, 15% muted, 10% accent)
  const compositeScore = Math.round(
    primaryContrast.score * 0.45 +
      headingContrast.score * 0.3 +
      mutedContrast.score * 0.15 +
      accentContrast.score * 0.1
  );

  // Light and Dark mode variation colors and backgrounds for side-by-side comparison
  const previewLightColors =
    currentThemeId === 'custom' ? customColors : currentTheme.light;
  const previewDarkColors =
    currentThemeId === 'custom' ? customColors : currentTheme.dark;
  const previewLightBg =
    currentThemeId === 'custom'
      ? '#FAF8F5'
      : currentTheme.light?.bg || '#FAF8F5';
  const previewDarkBg =
    currentThemeId === 'custom'
      ? '#15151C'
      : currentTheme.dark?.bg || '#15151C';

  const lightContrast = calculateContrastScore(
    previewLightColors.main,
    previewLightBg
  );
  const darkContrast = calculateContrastScore(
    previewDarkColors.main,
    previewDarkBg
  );

  // Check if current combination fails WCAG 2.1 AA standards
  // Normal body text requires >= 4.5:1; large/heading text requires >= 3.0:1
  const isPrimaryFailingAA = primaryContrast.ratio < 4.5;
  const isHeadingFailingAA = headingContrast.ratio < 3.0;
  const failsWcagAA = isPrimaryFailingAA || isHeadingFailingAA;

  // Auto-fix custom text colors to meet WCAG AA standards
  const handleAutoFixContrast = () => {
    if (isDarkMode) {
      onUpdateCustomColors({
        main: '#F8FAFC',
        heading: '#FFFFFF',
        muted: '#94A3B8',
        accent: customColors.accent || '#38BDF8',
      });
    } else {
      onUpdateCustomColors({
        main: '#09090B',
        heading: '#000000',
        muted: '#475569',
        accent: customColors.accent || '#18181B',
      });
    }
  };

  // Export current theme color hex codes and typography settings as valid JSON to clipboard
  const handleExportThemeJson = async () => {
    const themeJsonData = {
      theme: {
        id: currentThemeId,
        name: currentThemeId === 'custom' ? 'Custom Theme' : currentTheme.name,
        category: currentThemeId === 'custom' ? 'User Custom Palette' : currentTheme.category,
        isCustom: currentThemeId === 'custom',
        mode: isDarkMode ? 'dark' : 'light',
      },
      textColors: {
        main: activeColors.main,
        heading: activeColors.heading,
        muted: activeColors.muted,
        accent: activeColors.accent,
      },
      surfaceBackground: currentBgHex,
      paletteVariations: {
        light: {
          main: previewLightColors.main,
          heading: previewLightColors.heading,
          muted: previewLightColors.muted,
          accent: previewLightColors.accent,
          background: previewLightBg,
        },
        dark: {
          main: previewDarkColors.main,
          heading: previewDarkColors.heading,
          muted: previewDarkColors.muted,
          accent: previewDarkColors.accent,
          background: previewDarkBg,
        },
      },
      typography: {
        fontSizeScale,
        fontSizePercent: `${Math.round(fontSizeScale * 100)}%`,
        fontWeightBoost,
      },
      accessibility: {
        primaryContrastRatio: `${primaryContrast.ratio}:1`,
        headingContrastRatio: `${headingContrast.ratio}:1`,
        wcagLevel: primaryContrast.wcagLevel,
        score: compositeScore,
        meetsWcagAA: !failsWcagAA,
      },
      exportedAt: new Date().toISOString(),
    };

    const formattedJson = JSON.stringify(themeJsonData, null, 2);

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(formattedJson);
      } else {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = formattedJson;
        tempTextArea.style.position = 'fixed';
        tempTextArea.style.left = '-9999px';
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
      }
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to export theme JSON to clipboard:', err);
    }
  };

  // Reset to Default: Restores original monochrome theme and resets font size/weight modifications
  const handleResetToDefault = () => {
    const monochromeTheme =
      TEXT_COLOR_THEMES.find((t) => t.id === 'monochrome') || TEXT_COLOR_THEMES[0];
    onSelectTheme(monochromeTheme);
    onUpdateCustomColors({
      main: '#09090B',
      heading: '#000000',
      muted: '#475569',
      accent: '#18181B',
    });
    setFontSizeScale(1.0);
    setFontWeightBoost('normal');
    if (onResetToDefault) {
      onResetToDefault();
    }
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
    }, 2500);
  };

  return (
    <div
      id="text-color-customizer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 ${
          isDarkMode ? 'bg-[#15151C] border-[#2A2A38] text-white' : 'bg-white border-[#E2DCD2] text-[#141312]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20 shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                  Text Color & Typography Theme
                </h2>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Instant Live Sync
                </span>
                <div
                  id="contrast-score-header-indicator"
                  data-testid="contrast-score-header-indicator"
                  className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-colors shadow-2xs ${
                    failsWcagAA
                      ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-700 animate-pulse'
                      : primaryContrast.badgeClass
                  }`}
                  title={`WCAG 2.1 Contrast: ${primaryContrast.ratio}:1 (${
                    failsWcagAA ? 'Fails AA' : primaryContrast.wcagLevel
                  }) against ${isDarkMode ? 'Dark' : 'Light'} Mode Background (${currentBgHex})`}
                >
                  {failsWcagAA ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  )}
                  <span>
                    Contrast: <strong>{primaryContrast.ratio}:1</strong> ({failsWcagAA ? 'Fails AA' : primaryContrast.wcagLevel})
                  </span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Toggle curated palettes or customize font colors and contrast across the entire site in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="header-export-theme-json-btn"
              onClick={handleExportThemeJson}
              className={`hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors shadow-2xs ${
                exportSuccess
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800'
                  : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700/70'
              }`}
              title="Copy current text color hex codes and typography settings as JSON to clipboard"
            >
              {exportSuccess ? (
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <FileJson className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              )}
              <span>{exportSuccess ? 'Copied JSON!' : 'Export JSON'}</span>
            </button>
            <button
              id="header-reset-to-default-btn"
              onClick={handleResetToDefault}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700/70 transition-colors shadow-2xs"
              title="Reset to Default (Monochrome theme & 100% normal font settings)"
            >
              <RotateCcw className="w-3 h-3 text-neutral-500" />
              <span>Reset to Default</span>
            </button>
            <button
              id="text-modal-dark-toggle"
              onClick={toggleDarkMode}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                isDarkMode
                  ? 'border-neutral-700 bg-neutral-800 text-amber-400 hover:bg-neutral-700'
                  : 'border-[#E2DCD2] bg-[#F5F2ED] text-neutral-800 hover:bg-[#EAE4D8]'
              }`}
              title="Toggle Light / Dark Preview"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
            <button
              id="close-text-color-modal-btn"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 sm:px-6 pt-3 pb-2 flex items-center space-x-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
          <button
            id="tab-presets-btn"
            onClick={() => setActiveTab('presets')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'presets'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Curated Palettes (6)</span>
          </button>
          <button
            id="tab-custom-btn"
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'custom'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Custom Color Picker</span>
          </button>
          <button
            id="tab-typography-btn"
            onClick={() => setActiveTab('typography')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'typography'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Scale & Contrast</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: CURATED 6 PALETTES GRID WITH GRAPHICAL ICON TOGGLES */}
          {activeTab === 'presets' && (
            <div className="space-y-5">
              {/* Header Title & Active Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    6 Curated Color Palettes
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Use the graphical icon toggles below to instantly switch the entire app's visual theme.
                  </p>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[11px] font-medium text-neutral-500">
                    Active: <strong className="text-purple-600 dark:text-purple-400">{currentTheme.name}</strong>
                  </span>
                </div>
              </div>

              {/* SET OF GRAPHICAL ICON TOGGLES (QUICK-SWITCH STRIP) */}
              <div
                id="graphical-icon-toggles-strip"
                className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-neutral-900/60 shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                      Graphical Theme Icon Toggles
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Click any graphical icon to toggle
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {TEXT_COLOR_THEMES.map((theme) => {
                    const isSelected = currentThemeId === theme.id;
                    const themeColors = isDarkMode ? theme.dark : theme.light;
                    const IconComponent = THEME_ICONS[theme.id] || Palette;

                    return (
                      <button
                        key={theme.id}
                        type="button"
                        id={`icon-toggle-${theme.id}`}
                        onClick={() => onSelectTheme(theme)}
                        role="switch"
                        aria-checked={isSelected}
                        className={`p-2.5 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1.5 group relative cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-purple-600 bg-white dark:bg-neutral-800 border-purple-500 shadow-md scale-[1.02]'
                            : 'bg-white/80 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700/60 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-white dark:hover:bg-neutral-800'
                        }`}
                        title={`Toggle ${theme.name} Theme`}
                      >
                        {/* Active checkmark pip */}
                        {isSelected && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}

                        {/* Dedicated Graphical Theme Icon */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs border ${
                            isSelected ? 'ring-1 ring-purple-500 shadow-sm' : ''
                          }`}
                          style={{
                            backgroundColor: isDarkMode ? `${themeColors.accent}20` : `${theme.swatch}15`,
                            borderColor: isDarkMode ? `${themeColors.accent}40` : `${theme.swatch}30`,
                            color: isDarkMode ? themeColors.accent : theme.swatch,
                          }}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>

                        {/* Theme Name */}
                        <span className="text-[11px] font-bold truncate max-w-full text-neutral-900 dark:text-white leading-tight">
                          {theme.name}
                        </span>

                        {/* 4-Color Mini Dots */}
                        <div className="flex items-center space-x-1 pt-0.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: themeColors.heading }}
                            title="Heading"
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: themeColors.main }}
                            title="Main"
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: themeColors.muted }}
                            title="Muted"
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: themeColors.accent }}
                            title="Accent"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid of 6 Pre-defined Curated Color Palettes with Embedded Graphical Icon Toggles */}
              <div
                id="curated-palettes-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
              >
                {TEXT_COLOR_THEMES.map((theme) => {
                  const isSelected = currentThemeId === theme.id;
                  const themeColors = isDarkMode ? theme.dark : theme.light;
                  const IconComponent = THEME_ICONS[theme.id] || Palette;
                  const cardBgHex = isDarkMode ? theme.dark.bg || '#15151C' : theme.light.bg || '#FAF8F5';
                  const cardContrast = calculateContrastScore(themeColors.main, cardBgHex);

                  return (
                    <div
                      key={theme.id}
                      id={`theme-card-${theme.id}`}
                      onClick={() => onSelectTheme(theme)}
                      className={`relative rounded-2xl border p-4 text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group hover:shadow-lg ${
                        isSelected
                          ? 'ring-2 ring-purple-600 bg-purple-50/70 dark:bg-purple-950/35 border-purple-500 shadow-md'
                          : isDarkMode
                          ? 'bg-[#181822] border-neutral-800 hover:border-neutral-700 hover:bg-[#1E1E2B]'
                          : 'bg-[#FAF8F5] border-[#E8E2D5] hover:border-neutral-400 hover:bg-white'
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectTheme(theme);
                        }
                      }}
                    >
                      {/* Top Row: Graphical Icon, Name & Interactive Graphical Toggle Switch */}
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center space-x-2.5 min-w-0">
                            {/* Graphical Icon Container */}
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-xs transition-transform group-hover:scale-105"
                              style={{
                                backgroundColor: isDarkMode ? `${themeColors.accent}25` : `${theme.swatch}15`,
                                borderColor: isDarkMode ? `${themeColors.accent}45` : `${theme.swatch}35`,
                                color: isDarkMode ? themeColors.accent : theme.swatch,
                              }}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-serif text-sm font-bold truncate block text-neutral-950 dark:text-white leading-tight">
                                {theme.name}
                              </span>
                              <div className="flex items-center space-x-1.5 mt-0.5 flex-wrap gap-y-0.5">
                                <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider block truncate">
                                  {theme.category}
                                </span>
                                <span
                                  className={`inline-flex items-center space-x-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold border shrink-0 ${cardContrast.badgeClass}`}
                                  title={`Real-time contrast ratio against ${isDarkMode ? 'dark' : 'light'} background: ${cardContrast.ratio}:1 (${cardContrast.wcagLevel})`}
                                >
                                  <ShieldCheck className="w-2.5 h-2.5" />
                                  <span>{cardContrast.ratio}:1 {cardContrast.wcagLevel}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Graphical Icon Toggle Switch */}
                          <button
                            type="button"
                            role="switch"
                            aria-checked={isSelected}
                            id={`switch-toggle-${theme.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTheme(theme);
                            }}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
                              isSelected
                                ? 'bg-purple-600'
                                : isDarkMode
                                ? 'bg-neutral-700'
                                : 'bg-neutral-300'
                            }`}
                            title={isSelected ? `${theme.name} is active` : `Toggle ${theme.name}`}
                          >
                            <span className="sr-only">Toggle {theme.name}</span>
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none inline-flex items-center justify-center h-5 w-5 transform rounded-full bg-white text-neutral-900 shadow-md ring-0 transition duration-200 ease-in-out ${
                                isSelected ? 'translate-x-5 text-purple-700' : 'translate-x-0 text-neutral-400'
                              }`}
                            >
                              {isSelected ? (
                                <Check className="w-3 h-3 stroke-[3]" />
                              ) : (
                                <IconComponent className="w-2.5 h-2.5 opacity-60" />
                              )}
                            </span>
                          </button>
                        </div>

                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                          {theme.description}
                        </p>
                      </div>

                      {/* Mini Live Preview Snippet inside each card */}
                      <div
                        className="rounded-xl p-2.5 mb-3 border text-xs transition-colors"
                        style={{
                          backgroundColor: isDarkMode ? '#121218' : '#FFFFFF',
                          borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                        }}
                      >
                        <div
                          className="font-serif font-bold text-xs truncate mb-0.5 flex items-center space-x-1.5"
                          style={{ color: themeColors.heading }}
                        >
                          <IconComponent className="w-3 h-3 shrink-0" />
                          <span>{theme.name} Styling</span>
                        </div>
                        <div
                          className="text-[11px] truncate mb-1.5"
                          style={{ color: themeColors.main }}
                        >
                          Coordinated outfit tailoring
                        </div>
                        <div className="flex items-center justify-between text-[10px] pt-1 border-t border-black/5 dark:border-white/5">
                          <span style={{ color: themeColors.muted }}>
                            Muted Meta
                          </span>
                          <span
                            className="font-bold font-mono"
                            style={{ color: themeColors.accent }}
                          >
                            Accent Tag
                          </span>
                        </div>
                      </div>

                      {/* Swatch chips strip & Quick Toggle CTA */}
                      <div className="pt-2.5 border-t border-neutral-200/70 dark:border-neutral-800/80 flex items-center justify-between">
                        <div className="flex items-center space-x-1.5" title="Heading • Body • Muted • Accent">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                            style={{ backgroundColor: themeColors.heading }}
                            title="Heading Color"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                            style={{ backgroundColor: themeColors.main }}
                            title="Primary Text Color"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                            style={{ backgroundColor: themeColors.muted }}
                            title="Muted Text Color"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                            style={{ backgroundColor: themeColors.accent }}
                            title="Accent Color"
                          />
                        </div>

                        <button
                          type="button"
                          id={`toggle-btn-${theme.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTheme(theme);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center space-x-1 ${
                            isSelected
                              ? 'bg-purple-600 text-white shadow-xs'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:text-purple-700 dark:hover:text-purple-300'
                          }`}
                        >
                          <IconComponent className="w-3 h-3" />
                          <span>{isSelected ? 'Active' : 'Toggle'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOM COLOR PICKER */}
          {activeTab === 'custom' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Custom Text Color Control
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Pick any custom hex color for headings, body copy, muted labels, and vibrant accents.
                </p>
              </div>

              {/* Visual Warning Alert in Custom Tab */}
              {failsWcagAA && (
                <div
                  id="wcag-aa-warning-alert-custom"
                  role="alert"
                  className="p-4 rounded-2xl border-2 border-rose-300 dark:border-rose-700/80 bg-rose-50/95 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 shadow-md animate-fadeIn"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-xl bg-rose-500 text-white shadow-xs shrink-0 mt-0.5">
                        <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <h4 className="text-xs sm:text-sm font-bold tracking-tight text-rose-900 dark:text-rose-100">
                            Accessibility Warning: Fails WCAG 2.1 AA Standards
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-200 dark:bg-rose-900/80 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-700 uppercase tracking-wide">
                            Non-Compliant ({primaryContrast.ratio}:1)
                          </span>
                        </div>
                        <p className="text-xs text-rose-800 dark:text-rose-200/90 leading-relaxed">
                          {isPrimaryFailingAA && (
                            <span>
                              Primary body text contrast ({primaryContrast.ratio}:1) is under the mandatory <strong>4.5:1</strong> ratio.
                            </span>
                          )}
                          {isPrimaryFailingAA && isHeadingFailingAA && <span> • </span>}
                          {isHeadingFailingAA && (
                            <span>
                              Headings contrast ({headingContrast.ratio}:1) is under the <strong>3.0:1</strong> minimum.
                            </span>
                          )}
                          {' '}Text will be hard to read against the active {isDarkMode ? 'dark' : 'light'} background ({currentBgHex}).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                      <button
                        id="custom-tab-autofix-btn"
                        onClick={handleAutoFixContrast}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-xs transition-transform active:scale-95 flex items-center space-x-1.5 cursor-pointer"
                        title="Auto-adjust colors to satisfy WCAG AA"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Auto-Fix for AA</span>
                      </button>
                      <button
                        onClick={handleResetToDefault}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-200/60 dark:hover:bg-rose-900/50 border border-rose-300 dark:border-rose-800 transition-colors"
                      >
                        Reset Defaults
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Main Body Text Color */}
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-neutral-900/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-neutral-900 dark:text-white">
                      Primary Body Text
                    </label>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          calculateContrastScore(customColors.main, currentBgHex).badgeClass
                        }`}
                        title="Contrast against current background"
                      >
                        {calculateContrastScore(customColors.main, currentBgHex).ratio}:1 •{' '}
                        {calculateContrastScore(customColors.main, currentBgHex).wcagLevel}
                      </span>
                      <span className="text-xs font-mono font-semibold text-neutral-500">
                        {customColors.main}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      id="custom-color-main-picker"
                      value={customColors.main}
                      onChange={(e) =>
                        onUpdateCustomColors({ ...customColors, main: e.target.value })
                      }
                      className="w-12 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      id="custom-color-main-input"
                      value={customColors.main}
                      onChange={(e) =>
                        onUpdateCustomColors({ ...customColors, main: e.target.value })
                      }
                      placeholder="#09090B"
                      className="flex-1 px-3 py-2 rounded-xl text-xs font-mono border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Controls article copy, product details, descriptions, and list text.
                  </p>
                </div>

                {/* Heading Text Color */}
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-neutral-900/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-neutral-900 dark:text-white">
                      Titles & Headings
                    </label>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          calculateContrastScore(customColors.heading, currentBgHex).badgeClass
                        }`}
                        title="Contrast against current background"
                      >
                        {calculateContrastScore(customColors.heading, currentBgHex).ratio}:1 •{' '}
                        {calculateContrastScore(customColors.heading, currentBgHex).wcagLevel}
                      </span>
                      <span className="text-xs font-mono font-semibold text-neutral-500">
                        {customColors.heading}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      id="custom-color-heading-picker"
                      value={customColors.heading}
                      onChange={(e) =>
                        onUpdateCustomColors({ ...customColors, heading: e.target.value })
                      }
                      className="w-12 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      id="custom-color-heading-input"
                      value={customColors.heading}
                      onChange={(e) =>
                        onUpdateCustomColors({ ...customColors, heading: e.target.value })
                      }
                      placeholder="#000000"
                      className="flex-1 px-3 py-2 rounded-xl text-xs font-mono border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Controls H1-H4 display headings and serif brand labels.
                  </p>
                </div>

                {/* Muted Text Color */}
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-neutral-900/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-neutral-900 dark:text-white">
                      Muted Subtitles & Meta
                    </label>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          calculateContrastScore(customColors.muted, currentBgHex).badgeClass
                        }`}
                        title="Contrast against current background"
                      >
                        {calculateContrastScore(customColors.muted, currentBgHex).ratio}:1 •{' '}
                        {calculateContrastScore(customColors.muted, currentBgHex).wcagLevel}
                      </span>
                      <span className="text-xs font-mono font-semibold text-neutral-500">
                        {customColors.muted}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      id="custom-color-muted-picker"
                      value={customColors.muted}
                      onChange={(e) =>
                        onUpdateCustomColors({ ...customColors, muted: e.target.value })
                      }
                      className="w-12 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      id="custom-color-muted-input"
                      value={customColors.muted}
                      onChange={(e) =>
                        onUpdateCustomColors({ ...customColors, muted: e.target.value })
                      }
                      placeholder="#475569"
                      className="flex-1 px-3 py-2 rounded-xl text-xs font-mono border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Controls subtle captions, dates, specs, and secondary information.
                  </p>
                </div>

                {/* Accent Color */}
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-neutral-900/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-neutral-900 dark:text-white">
                      Accent & Highlight Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          calculateContrastScore(customColors.accent, currentBgHex).badgeClass
                        }`}
                        title="Contrast against current background"
                      >
                        {calculateContrastScore(customColors.accent, currentBgHex).ratio}:1 •{' '}
                        {calculateContrastScore(customColors.accent, currentBgHex).wcagLevel}
                      </span>
                      <span className="text-xs font-mono font-semibold text-neutral-500">
                        {customColors.accent}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      id="custom-color-accent-picker"
                      value={customColors.accent}
                      onChange={(e) =>
                        onUpdateCustomColors({ ...customColors, accent: e.target.value })
                      }
                      className="w-12 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      id="custom-color-accent-input"
                      value={customColors.accent}
                      onChange={(e) =>
                        onUpdateCustomColors({ ...customColors, accent: e.target.value })
                      }
                      placeholder="#18181B"
                      className="flex-1 px-3 py-2 rounded-xl text-xs font-mono border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Controls sparkles, key metrics, active badges, and focus borders.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEXT SCALE & CONTRAST */}
          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Legibility & Contrast Tuning
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Fine-tune font size scale and weight density for comfortable reading.
                  </p>
                </div>
                {(fontSizeScale !== 1.0 || fontWeightBoost !== 'normal') && (
                  <button
                    id="reset-typography-tuning-btn"
                    onClick={() => {
                      setFontSizeScale(1.0);
                      setFontWeightBoost('normal');
                    }}
                    className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline flex items-center space-x-1"
                    title="Reset text size and font weight to defaults"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Font Defaults</span>
                  </button>
                )}
              </div>

              {/* Font Size Scaling */}
              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-neutral-900/70 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    Text Scale
                  </span>
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                    {Math.round(fontSizeScale * 100)}%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Standard (100%)', val: 1.0 },
                    { label: 'Medium (106%)', val: 1.06 },
                    { label: 'Large (114%)', val: 1.14 },
                  ].map((sz) => (
                    <button
                      key={sz.val}
                      onClick={() => setFontSizeScale(sz.val)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        fontSizeScale === sz.val
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Weight Density */}
              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-neutral-900/70 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    Font Weight & Stroke
                  </span>
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 capitalize">
                    {fontWeightBoost}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Normal / Natural', val: 'normal' },
                    { label: 'Medium Contrast', val: 'medium' },
                    { label: 'High Contrast Bold', val: 'bold' },
                  ].map((wt) => (
                    <button
                      key={wt.val}
                      onClick={() => setFontWeightBoost(wt.val)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        fontWeightBoost === wt.val
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {wt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REAL-TIME ACCESSIBILITY CONTRAST SCORE INDICATOR */}
          <div
            id="contrast-score-indicator"
            data-testid="contrast-score-indicator"
            className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm space-y-4"
          >
            {/* Header & Overall Score Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-start space-x-3">
                <div
                  className={`p-2.5 rounded-2xl shrink-0 ${
                    primaryContrast.isCompliant
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                      Real-Time Accessibility & Contrast Score
                    </h3>
                    <span
                      id="contrast-score-wcag-badge"
                      data-testid="contrast-score-wcag-badge"
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${primaryContrast.badgeClass}`}
                    >
                      {primaryContrast.wcagLevel} • {primaryContrast.rating}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Evaluated against {isDarkMode ? 'Dark Mode' : 'Light Mode'} background ({currentBgHex}) using WCAG 2.1 relative luminance math.
                  </p>
                </div>
              </div>

              {/* Numerical Scores Badge Group */}
              <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                    Primary Contrast
                  </div>
                  <div className={`text-xl font-bold font-mono ${primaryContrast.colorClass}`}>
                    {primaryContrast.ratio}:1
                  </div>
                </div>
                <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800" />
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                    Accessibility Score
                  </div>
                  <div className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400">
                    {compositeScore}
                    <span className="text-xs text-neutral-400 font-normal">/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VISUAL WARNING ALERT: WCAG 2.1 AA ACCESSIBILITY FAILURE */}
            {failsWcagAA && (
              <div
                id="wcag-aa-warning-alert"
                data-testid="wcag-aa-warning-alert"
                role="alert"
                aria-live="assertive"
                className="p-4 rounded-2xl border-2 border-rose-300 dark:border-rose-700/80 bg-rose-50/95 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 shadow-md animate-fadeIn"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-xl bg-rose-500 text-white shadow-xs shrink-0 mt-0.5">
                      <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <h4 className="text-xs sm:text-sm font-bold tracking-tight text-rose-900 dark:text-rose-100">
                          Accessibility Warning: Fails WCAG 2.1 AA Standards
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-200 dark:bg-rose-900/80 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-700 uppercase tracking-wide">
                          Non-Compliant
                        </span>
                      </div>
                      <p className="text-xs text-rose-800 dark:text-rose-200/90 leading-relaxed">
                        {isPrimaryFailingAA && (
                          <span>
                            Primary body text contrast ({primaryContrast.ratio}:1) is below the minimum{' '}
                            <strong>4.5:1</strong> ratio required for regular body text.
                          </span>
                        )}
                        {isPrimaryFailingAA && isHeadingFailingAA && <span> • </span>}
                        {isHeadingFailingAA && (
                          <span>
                            Headings contrast ({headingContrast.ratio}:1) is below the{' '}
                            <strong>3.0:1</strong> minimum for display headings.
                          </span>
                        )}
                        {' '}This combination on the active {isDarkMode ? 'dark' : 'light'} background ({currentBgHex}) does not meet digital accessibility requirements and may strain eyes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                    <button
                      id="autofix-contrast-btn"
                      data-testid="autofix-contrast-btn"
                      onClick={handleAutoFixContrast}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-xs transition-transform active:scale-95 flex items-center space-x-1.5 cursor-pointer"
                      title="Automatically adjust text colors to pass WCAG AA standards"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Auto-Fix for AA</span>
                    </button>
                    <button
                      id="warning-reset-default-btn"
                      onClick={handleResetToDefault}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-200/60 dark:hover:bg-rose-900/50 border border-rose-300 dark:border-rose-800 transition-colors cursor-pointer"
                    >
                      Reset Defaults
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Visual Contrast Scale Meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center space-x-1">
                  <Gauge className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Visual Contrast Scale</span>
                </span>
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  {primaryContrast.summary}
                </span>
              </div>
              <div className="relative w-full h-3 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex">
                <div className="w-[15%] h-full bg-rose-400/80" title="Fail: Under 3.0:1" />
                <div className="w-[20%] h-full bg-amber-400/80" title="AA Large: 3.0:1 to 4.5:1" />
                <div className="w-[25%] h-full bg-blue-500/80" title="AA Standard: 4.5:1 to 7.0:1" />
                <div className="flex-1 h-full bg-emerald-500/90" title="AAA Enhanced: 7.0:1 to 21.0:1" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span>1:1 (Fail)</span>
                <span>3.0:1 (AA Large)</span>
                <span>4.5:1 (AA Body)</span>
                <span>7.0:1+ (AAA Enhanced)</span>
                <span>21:1</span>
              </div>
            </div>

            {/* 4-Item Palette Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {/* Primary Body Text */}
              <div className="p-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-neutral-900/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                    Primary Body
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${primaryContrast.badgeClass}`}>
                    {primaryContrast.wcagLevel}
                  </span>
                </div>
                <div className="flex items-baseline space-x-1.5">
                  <span className={`text-sm font-bold font-mono ${primaryContrast.colorClass}`}>
                    {primaryContrast.ratio}:1
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {activeColors.main}
                  </span>
                </div>
              </div>

              {/* Titles & Headings */}
              <div className="p-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-neutral-900/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                    Headings
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${headingContrast.badgeClass}`}>
                    {headingContrast.wcagLevel}
                  </span>
                </div>
                <div className="flex items-baseline space-x-1.5">
                  <span className={`text-sm font-bold font-mono ${headingContrast.colorClass}`}>
                    {headingContrast.ratio}:1
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {activeColors.heading}
                  </span>
                </div>
              </div>

              {/* Muted Captions */}
              <div className="p-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-neutral-900/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                    Muted Meta
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${mutedContrast.badgeClass}`}>
                    {mutedContrast.wcagLevel}
                  </span>
                </div>
                <div className="flex items-baseline space-x-1.5">
                  <span className={`text-sm font-bold font-mono ${mutedContrast.colorClass}`}>
                    {mutedContrast.ratio}:1
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {activeColors.muted}
                  </span>
                </div>
              </div>

              {/* Accent & Highlights */}
              <div className="p-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-[#FAF8F5] dark:bg-neutral-900/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                    Accent
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${accentContrast.badgeClass}`}>
                    {accentContrast.wcagLevel}
                  </span>
                </div>
                <div className="flex items-baseline space-x-1.5">
                  <span className={`text-sm font-bold font-mono ${accentContrast.colorClass}`}>
                    {accentContrast.ratio}:1
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {activeColors.accent}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SIDE-BY-SIDE DUAL-MODE VISUAL PREVIEW BOX */}
          <div
            id="side-by-side-preview-box"
            data-testid="side-by-side-preview-box"
            className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-sm space-y-4"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                      Side-by-Side Dual-Mode Visual Preview
                    </h3>
                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                      Simultaneous Comparison
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Demonstrates how the currently selected text color scheme appears on light and dark background blocks side-by-side.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-start sm:self-center shrink-0">
                <span className="text-[11px] font-mono text-neutral-500 font-medium">
                  {currentThemeId === 'custom' ? 'Custom Palette' : currentTheme.name}
                </span>
                <button
                  id="preview-quick-toggle-mode-btn"
                  onClick={toggleDarkMode}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center space-x-1 cursor-pointer"
                  title="Toggle active site mode"
                >
                  {isDarkMode ? <Sun className="w-3 h-3 text-amber-500" /> : <Moon className="w-3 h-3 text-indigo-400" />}
                  <span>Active: {isDarkMode ? 'Dark' : 'Light'}</span>
                </button>
              </div>
            </div>

            {/* Side-by-Side Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Light Mode Variation Sample Block */}
              <div
                id="light-mode-preview-sample"
                data-testid="light-mode-preview-sample"
                className={`relative rounded-2xl p-4 sm:p-5 border transition-all shadow-xs flex flex-col justify-between ${
                  !isDarkMode
                    ? 'ring-2 ring-purple-600/80 border-purple-300 dark:border-purple-700 shadow-md'
                    : 'border-[#E5DFD5]'
                }`}
                style={{
                  backgroundColor: previewLightBg,
                }}
              >
                {!isDarkMode && (
                  <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-purple-600 text-white shadow-xs flex items-center space-x-1">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    <span>Current Active Mode</span>
                  </div>
                )}

                <div>
                  {/* Top Bar inside Light Block */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/10">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-neutral-900">
                      <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Light Mode Canvas</span>
                      <span className="text-[10px] font-mono text-neutral-500 font-normal">({previewLightBg})</span>
                    </div>

                    <span
                      className={`inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-bold border ${lightContrast.badgeClass}`}
                      title={`Light mode contrast ratio: ${lightContrast.ratio}:1`}
                    >
                      <ShieldCheck className="w-3 h-3 shrink-0" />
                      <span>{lightContrast.ratio}:1 • {lightContrast.wcagLevel}</span>
                    </span>
                  </div>

                  {/* Sample Typography on Light Background */}
                  <h4
                    className="font-serif text-base sm:text-lg font-bold tracking-tight mb-1"
                    style={{
                      color: previewLightColors.heading,
                      fontWeight: fontWeightBoost === 'bold' ? 700 : fontWeightBoost === 'medium' ? 600 : undefined,
                    }}
                  >
                    FitVision Luxury Sartorial Tailoring
                  </h4>

                  <p
                    className="text-xs sm:text-sm leading-relaxed mb-3"
                    style={{
                      color: previewLightColors.main,
                      fontSize: `${fontSizeScale * 0.875}rem`,
                    }}
                  >
                    Experience bespoke outfit synthesis with coordinated luxury silhouettes, harmonious tones, and breathable Egyptian cotton tailoring.
                  </p>
                </div>

                {/* Meta and Accent Row inside Light Block */}
                <div className="pt-2.5 border-t border-black/10 flex items-center justify-between text-xs">
                  <span
                    className="text-[11px] truncate max-w-[55%]"
                    style={{ color: previewLightColors.muted }}
                  >
                    100% Giza Poplin • Natural Drape
                  </span>

                  <div className="flex items-center space-x-2">
                    <span
                      className="font-bold font-mono text-xs flex items-center space-x-1"
                      style={{ color: previewLightColors.accent }}
                    >
                      <span>1,850 EGP</span>
                      <Sparkles className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Dark Mode Variation Sample Block */}
              <div
                id="dark-mode-preview-sample"
                data-testid="dark-mode-preview-sample"
                className={`relative rounded-2xl p-4 sm:p-5 border transition-all shadow-xs flex flex-col justify-between ${
                  isDarkMode
                    ? 'ring-2 ring-purple-600/80 border-purple-300 dark:border-purple-700 shadow-md'
                    : 'border-neutral-800'
                }`}
                style={{
                  backgroundColor: previewDarkBg,
                }}
              >
                {isDarkMode && (
                  <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-purple-600 text-white shadow-xs flex items-center space-x-1">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    <span>Current Active Mode</span>
                  </div>
                )}

                <div>
                  {/* Top Bar inside Dark Block */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
                      <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>Dark Mode Canvas</span>
                      <span className="text-[10px] font-mono text-neutral-400 font-normal">({previewDarkBg})</span>
                    </div>

                    <span
                      className={`inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-bold border ${darkContrast.badgeClass}`}
                      title={`Dark mode contrast ratio: ${darkContrast.ratio}:1`}
                    >
                      <ShieldCheck className="w-3 h-3 shrink-0" />
                      <span>{darkContrast.ratio}:1 • {darkContrast.wcagLevel}</span>
                    </span>
                  </div>

                  {/* Sample Typography on Dark Background */}
                  <h4
                    className="font-serif text-base sm:text-lg font-bold tracking-tight mb-1"
                    style={{
                      color: previewDarkColors.heading,
                      fontWeight: fontWeightBoost === 'bold' ? 700 : fontWeightBoost === 'medium' ? 600 : undefined,
                    }}
                  >
                    FitVision Luxury Sartorial Tailoring
                  </h4>

                  <p
                    className="text-xs sm:text-sm leading-relaxed mb-3"
                    style={{
                      color: previewDarkColors.main,
                      fontSize: `${fontSizeScale * 0.875}rem`,
                    }}
                  >
                    Experience bespoke outfit synthesis with coordinated luxury silhouettes, harmonious tones, and breathable Egyptian cotton tailoring.
                  </p>
                </div>

                {/* Meta and Accent Row inside Dark Block */}
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                  <span
                    className="text-[11px] truncate max-w-[55%]"
                    style={{ color: previewDarkColors.muted }}
                  >
                    100% Giza Poplin • Natural Drape
                  </span>

                  <div className="flex items-center space-x-2">
                    <span
                      className="font-bold font-mono text-xs flex items-center space-x-1"
                      style={{ color: previewDarkColors.accent }}
                    >
                      <span>1,850 EGP</span>
                      <Sparkles className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-50/50 dark:bg-neutral-900/40">
          <div className="flex items-center space-x-2.5 flex-wrap gap-y-2">
            <button
              id="reset-to-default-btn"
              data-testid="reset-to-default-btn"
              onClick={handleResetToDefault}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white flex items-center space-x-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 shadow-2xs transition-all active:scale-95 cursor-pointer"
              title="Restores original monochrome color theme and resets font size/weight modifications"
            >
              <RotateCcw
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  resetSuccess ? '-rotate-180 text-emerald-500' : 'text-neutral-500 dark:text-neutral-400'
                }`}
              />
              <span>Reset to Default</span>
            </button>

            <button
              id="export-theme-json-btn"
              data-testid="export-theme-json-btn"
              onClick={handleExportThemeJson}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition-all active:scale-95 cursor-pointer shadow-2xs ${
                exportSuccess
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800 ring-2 ring-emerald-500/30'
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700/80'
              }`}
              title="Copy current text color hex codes and typography settings as formatted JSON to clipboard"
            >
              {exportSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">Theme JSON Copied!</span>
                </>
              ) : (
                <>
                  <FileJson className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Export Theme JSON</span>
                </>
              )}
            </button>

            {resetSuccess && (
              <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Restored monochrome theme & default typography</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="apply-text-color-btn"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-600/20 flex items-center justify-center space-x-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save & Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
