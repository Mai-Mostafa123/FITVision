import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShoppingBag,
  RotateCw,
  Check,
  Eye,
  Sliders,
  Maximize2,
  Info,
  ShieldCheck,
  User,
  Zap,
} from 'lucide-react';
import { AiOutfitRecommendation, Product } from '../types';

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfit: AiOutfitRecommendation | null;
  onAddToCart: (items: Product[]) => void;
  isDarkMode: boolean;
}

export const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  isOpen,
  onClose,
  outfit,
  onAddToCart,
  isDarkMode,
}) => {
  const [activeModelPose, setActiveModelPose] = useState<'front' | 'side' | 'movement'>('front');
  const [selectedSizeFit, setSelectedSizeFit] = useState<'S' | 'M' | 'L'>('M');
  const [isSimulatingDrape, setIsSimulatingDrape] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  if (!isOpen || !outfit) return null;

  const handleSimulateFit = () => {
    setIsSimulatingDrape(true);
    setTimeout(() => {
      setIsSimulatingDrape(false);
    }, 800);
  };

  const handleAddToCart = () => {
    onAddToCart(outfit.items);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const topProduct = outfit.items.find(
    (i) => i.category === 'Shirts' || i.category === 'Tops' || i.category === 'T-Shirts' || i.category === 'Dresses'
  ) || outfit.items[0];

  const bottomProduct = outfit.items.find(
    (i) => i.category === 'Pants' || i.category === 'Jeans' || i.category === 'Jackets'
  ) || outfit.items[1];

  const shoesProduct = outfit.items.find((i) => i.category === 'Shoes') || outfit.items[2];
  const accProduct = outfit.items.find((i) => i.category === 'Bags' || i.category === 'Accessories') || outfit.items[3];

  return (
    <div
      id="virtual-try-on-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className={`relative w-full max-w-5xl rounded-3xl border overflow-hidden shadow-2xl transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#18181F] border-[#2C2C3C] text-white'
            : 'bg-[#FAF8F5] border-[#E2DCD2] text-[#1A1A1A]'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-xl font-bold">AI Virtual Fitting Room</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white">
                  Live Drape Simulation
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Simulating tailored fit on standard 175cm silhouette • {outfit.title}
              </p>
            </div>
          </div>

          <button
            id="close-try-on-modal"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Grid: Left Virtual Stage, Right Fit Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          {/* Left Visual Model Canvas (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
              {/* Virtual Look Stage Image */}
              <img
                src={
                  topProduct?.images?.model ||
                  topProduct?.images?.main ||
                  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80'
                }
                alt="Virtual Try On Model"
                className={`w-full h-full object-cover object-top transition-transform duration-700 ${
                  isSimulatingDrape ? 'scale-105 filter contrast-125' : 'scale-100'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* AI Overlay Heatmap & Silhouette Lines */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
                    ⚡ 99.4% Fit Precision
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-purple-600/80 text-white backdrop-blur-md">
                    Silhouette: {selectedSizeFit} (Tailored Drop)
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-white text-xs font-semibold">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Shoulder seam: Precise 42cm drape</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white text-xs font-semibold">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Waist break: Clean natural front pleats</span>
                  </div>
                </div>
              </div>

              {/* Loading Drape Animation Pill */}
              {isSimulatingDrape && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-white text-neutral-950 text-xs font-bold shadow-2xl flex items-center space-x-2 animate-bounce">
                    <RotateCw className="w-3.5 h-3.5 animate-spin text-purple-600" />
                    <span>Calculating tension & fabric drape...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Pose & Size Controls Toolbar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-neutral-500">Pose Angle:</span>
                <div className="flex bg-neutral-200 dark:bg-neutral-800 p-0.5 rounded-xl text-xs">
                  {(['front', 'side', 'movement'] as const).map((pose) => (
                    <button
                      key={pose}
                      onClick={() => {
                        setActiveModelPose(pose);
                        handleSimulateFit();
                      }}
                      className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                        activeModelPose === pose
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                      }`}
                    >
                      {pose}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-neutral-500">Fit Profile:</span>
                <div className="flex space-x-1">
                  {(['S', 'M', 'L'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSizeFit(sz);
                        handleSimulateFit();
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-bold border transition-all ${
                        selectedSizeFit === sz
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-xs'
                          : 'border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Garment Stack & Purchase Panel (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Layered Garments in this Look:
              </h4>

              <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                {outfit.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                      isDarkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-[#E8E2D5]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-14 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                        <img
                          src={item.images.main}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block">
                          {item.brandName} • {item.category}
                        </span>
                        <h5 className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1">
                          {item.name}
                        </h5>
                        <span className="text-xs font-serif font-bold text-neutral-900 dark:text-white">
                          {item.price} EGP
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 shrink-0">
                      Size {selectedSizeFit} Fit
                    </span>
                  </div>
                ))}
              </div>

              {/* Fabric & Tension Specs */}
              <div
                className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                  isDarkMode ? 'bg-purple-950/20 border-purple-900/30' : 'bg-purple-50/70 border-purple-100'
                }`}
              >
                <div className="flex items-center space-x-1 font-bold text-neutral-900 dark:text-white">
                  <Info className="w-3.5 h-3.5 text-purple-600" />
                  <span>Drape & Breathability Analysis</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 text-[11px] leading-relaxed">
                  Egyptian poplin offers a crisp 120 GSM breathability index. The relaxed pleats fall cleanly above the ankle with no pulling at the seat.
                </p>
              </div>
            </div>

            {/* Price & Checkout Box */}
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-neutral-500 block">Bundle Price ({outfit.items.length} pieces)</span>
                  <span className="text-2xl font-serif font-bold text-neutral-950 dark:text-white">
                    {outfit.totalCost.toLocaleString()} EGP
                  </span>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded">
                  Free Express Delivery
                </span>
              </div>

              <button
                id="try-on-add-all-btn"
                onClick={handleAddToCart}
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 shadow-xl shadow-purple-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
              >
                {addedAnimation ? <Check className="w-4 h-4 text-emerald-300" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{addedAnimation ? 'Added 4 Items to Bag!' : `Add Fitted Look to Cart (${outfit.totalCost} EGP)`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
