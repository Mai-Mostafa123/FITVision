import React, { useState } from 'react';
import {
  X,
  Palette,
  Sparkles,
  Upload,
  Check,
  ShoppingBag,
  ArrowRight,
  Sun,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { Product, ColorAnalysisResult } from '../types';

interface ColorAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isDarkMode: boolean;
}

export const ColorAnalyzerModal: React.FC<ColorAnalyzerModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onQuickView,
  isDarkMode,
}) => {
  const [selectedSkinTone, setSelectedSkinTone] = useState<string>('Warm Sand');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  if (!isOpen) return null;

  const skinTonePresets = [
    { name: 'Fair Cool', hex: '#FADBD8', undertone: 'Cool' },
    { name: 'Warm Sand', hex: '#E0AC69', undertone: 'Warm' },
    { name: 'Olive Mediterranean', hex: '#C68642', undertone: 'Neutral' },
    { name: 'Golden Bronze', hex: '#8D5524', undertone: 'Warm' },
    { name: 'Deep Espresso', hex: '#3B2219', undertone: 'Cool' },
  ];

  const analysis: ColorAnalysisResult = {
    detectedColors: [
      { name: 'Warm Sandstone', hex: '#D8C3A5', percentage: 45, undertone: 'Warm' },
      { name: 'Egyptian White', hex: '#FAF7F0', percentage: 30, undertone: 'Neutral' },
      { name: 'Muted Olive', hex: '#8F9779', percentage: 15, undertone: 'Warm' },
      { name: 'Rich Espresso', hex: '#3B2F2F', percentage: 10, undertone: 'Warm' },
    ],
    recommendedPalette: [
      { name: 'Oatmeal & Sand', hex: '#EBE5DA', rationale: 'Illuminates warm golden undertones effortlessly.' },
      { name: 'Terracotta Rust', hex: '#CC5A36', rationale: 'Creates vibrant sun-kissed facial contrast.' },
      { name: 'Sage Linen', hex: '#9CAF88', rationale: 'Subtle earthy harmonic grounding.' },
      { name: 'Obsidian Jet', hex: '#111111', rationale: 'Provides anchor contrast for light outerwear.' },
    ],
    matchingProducts: products.slice(0, 4),
  };

  const handleSimulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 600);
  };

  return (
    <div
      id="color-analyzer-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className={`relative w-full max-w-4xl rounded-3xl border overflow-hidden shadow-2xl transition-all ${
          isDarkMode ? 'bg-[#18181F] border-[#2C2C3C] text-white' : 'bg-[#FAF8F5] border-[#E2DCD2] text-[#1A1A1A]'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">AI Color Harmony & Undertone Studio</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Discover the curated palette that accentuates your skin tone and natural complexion.
              </p>
            </div>
          </div>

          <button
            id="close-color-analyzer-modal"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Step 1: Select Complexion Preset or Upload Photo */}
          <div
            className={`p-5 rounded-2xl border ${
              isDarkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-[#E8E2D5]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                1. Select Complexion or Upload Reference:
              </label>
              <button
                onClick={handleSimulateAnalysis}
                className="text-xs text-purple-600 dark:text-purple-400 font-semibold flex items-center hover:underline"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1 ${isAnalyzing ? 'animate-spin' : ''}`} />
                Re-calculate Undertones
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {skinTonePresets.map((preset) => {
                const isSelected = selectedSkinTone === preset.name;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setSelectedSkinTone(preset.name);
                      handleSimulateAnalysis();
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center space-y-1.5 ${
                      isSelected
                        ? 'border-purple-600 ring-2 ring-purple-500/30 bg-purple-50/50 dark:bg-purple-950/40 shadow-xs'
                        : isDarkMode
                        ? 'border-neutral-800 bg-neutral-950 hover:bg-neutral-900'
                        : 'border-[#E8E2D5] bg-[#FAF8F5] hover:bg-[#F2ECE0]'
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-full border border-black/20 shadow-xs"
                      style={{ backgroundColor: preset.hex }}
                    />
                    <span className="text-xs font-bold truncate w-full text-neutral-900 dark:text-white">
                      {preset.name}
                    </span>
                    <span className="text-[10px] text-neutral-500">{preset.undertone}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: AI Recommended Palette Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              2. Your Bespoke Fashion Palette:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {analysis.recommendedPalette.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                    isDarkMode ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white border-[#E8E2D5]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className="w-10 h-10 rounded-xl border border-black/15 shadow-sm shrink-0"
                      style={{ backgroundColor: item.hex }}
                    />
                    <div>
                      <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                        {item.name}
                      </h5>
                      <span className="text-[10px] font-mono text-neutral-400">{item.hex}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {item.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Verified Matching Pieces From Connected Brands */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                3. Products in Your Harmonious Tones:
              </h4>
              <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                Available in Store
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {analysis.matchingProducts.map((p) => (
                <div
                  key={p.id}
                  className={`p-3 rounded-2xl border flex flex-col justify-between group transition-all ${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-[#E8E2D5]'
                  }`}
                >
                  <div>
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2">
                      <img
                        src={p.images.main}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block truncate">
                      {p.brandName}
                    </span>
                    <h5 className="text-xs font-medium text-neutral-900 dark:text-white line-clamp-1">
                      {p.name}
                    </h5>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between mt-2">
                    <span className="text-xs font-serif font-bold text-neutral-950 dark:text-white">
                      {p.price} EGP
                    </span>
                    <button
                      onClick={() => onQuickView(p)}
                      className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
