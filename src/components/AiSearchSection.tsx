import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  ShoppingBag,
  RotateCcw,
  Check,
  Tag,
  Calendar,
  Layers,
  Palette,
  DollarSign,
  ArrowRight,
  Eye,
  Sliders,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { AiOutfitRecommendation, Product, WishlistItem } from '../types';

interface AiSearchSectionProps {
  recommendation: AiOutfitRecommendation;
  onAddToCart?: (product: Product) => void;
  onAddAllToCart: (items: Product[]) => void;
  onSaveOutfit?: (outfit: AiOutfitRecommendation) => void;
  onTryAnother?: () => void;
  onOpenTryOn: (outfit: AiOutfitRecommendation) => void;
  onQuickViewProduct?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlist?: WishlistItem[];
  isDarkMode: boolean;
  savedOutfits?: AiOutfitRecommendation[];
  isLoading?: boolean;
}

export const AiSearchSection: React.FC<AiSearchSectionProps> = ({
  recommendation,
  onAddToCart,
  onAddAllToCart,
  onSaveOutfit,
  onTryAnother,
  onOpenTryOn,
  onQuickViewProduct,
  onQuickView,
  onToggleWishlist,
  wishlist = [],
  isDarkMode,
  savedOutfits = [],
  isLoading = false,
}) => {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isSaved = savedOutfits.some((o) => o.id === recommendation.id);
  const handleQuickView = onQuickView || onQuickViewProduct || (() => {});

  const handleAddAll = () => {
    onAddAllToCart(recommendation.items);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <section
      id="ai-smart-search-results-section"
      className={`py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-3xl border transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#15151C] border-[#2A2A38] shadow-2xl shadow-purple-950/20'
          : 'bg-[#FAF8F5] border-[#E8E2D5] shadow-xl shadow-stone-200/50'
      }`}
    >
      {/* Header bar with AI analysis breakdown */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
              <span>AI Semantic Synthesis & Match</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                {recommendation.matchScore}% Compatibility
              </span>
            </div>
            <h2
              id="ai-outfit-heading"
              className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 dark:text-white"
            >
              Your AI Recommended Outfit
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1 max-w-2xl italic font-medium">
              "{recommendation.prompt}"
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center space-x-3 self-start lg:self-auto">
            <div className="text-right">
              <span className="text-xs text-neutral-600 dark:text-neutral-400 block font-semibold">
                Total Outfit Price
              </span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-serif text-neutral-950 dark:text-white">
                  {recommendation.totalCost.toLocaleString()} EGP
                </span>
                {recommendation.budget > recommendation.totalCost && (
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                    Under {recommendation.budget} EGP
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Parameter Extraction Pills (Occasion, Season, Style, Colors, Budget) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div
            className={`p-3 rounded-2xl border ${
              isDarkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-[#EAE3D5]'
            }`}
          >
            <div className="flex items-center space-x-1.5 text-xs text-neutral-600 dark:text-neutral-400 mb-1 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Occasion</span>
            </div>
            <span className="text-sm font-bold text-neutral-950 dark:text-white">
              {recommendation.occasion}
            </span>
          </div>

          <div
            className={`p-3 rounded-2xl border ${
              isDarkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-[#EAE3D5]'
            }`}
          >
            <div className="flex items-center space-x-1.5 text-xs text-neutral-600 dark:text-neutral-400 mb-1 font-semibold">
              <Tag className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Season</span>
            </div>
            <span className="text-sm font-bold text-neutral-950 dark:text-white">
              {recommendation.season}
            </span>
          </div>

          <div
            className={`p-3 rounded-2xl border ${
              isDarkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-[#EAE3D5]'
            }`}
          >
            <div className="flex items-center space-x-1.5 text-xs text-neutral-600 dark:text-neutral-400 mb-1 font-semibold">
              <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Aesthetic Style</span>
            </div>
            <span className="text-sm font-bold text-neutral-950 dark:text-white">
              {recommendation.style}
            </span>
          </div>

          <div
            className={`p-3 rounded-2xl border ${
              isDarkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-[#EAE3D5]'
            }`}
          >
            <div className="flex items-center space-x-1.5 text-xs text-neutral-600 dark:text-neutral-400 mb-1 font-semibold">
              <Palette className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Color Harmony</span>
            </div>
            <div className="flex items-center space-x-1.5 mt-0.5">
              {recommendation.colorPalette.map((col, idx) => (
                <span
                  key={idx}
                  className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 ml-1">
                Beige & White
              </span>
            </div>
          </div>

          <div
            className={`p-3 rounded-2xl border col-span-2 sm:col-span-1 ${
              isDarkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-[#EAE3D5]'
            }`}
          >
            <div className="flex items-center space-x-1.5 text-xs text-neutral-600 dark:text-neutral-400 mb-1 font-semibold">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Budget Cap</span>
            </div>
            <span className="text-sm font-bold text-neutral-950 dark:text-white">
              Under {recommendation.budget} EGP
            </span>
          </div>
        </div>

        {/* Product Cards Grid: Product 1, Product 2, Product 3, Product 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {recommendation.items.map((product, index) => (
            <div
              key={product.id}
              id={`ai-recommended-product-${product.id}`}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                isDarkMode
                  ? 'bg-[#1A1A24] border-[#2C2C3C] hover:border-purple-500/50'
                  : 'bg-white border-[#EAE3D5] hover:border-purple-300'
              }`}
            >
              <div>
                {/* Product Image Stage */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={product.images.main}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-md">
                      Piece #{index + 1} • {product.category}
                    </span>
                  </div>

                  <button
                    onClick={() => onQuickViewProduct(product)}
                    className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110"
                    title="Quick Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Content Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                    <span className="font-bold text-purple-700 dark:text-purple-400 tracking-wide uppercase">
                      {product.brandName}
                    </span>
                    <span className="flex items-center font-semibold text-neutral-800 dark:text-neutral-200">
                      ★ {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm text-neutral-950 dark:text-white line-clamp-1 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                    {product.name}
                  </h3>

                  {/* Available Colors Swatches */}
                  <div className="flex items-center space-x-1.5 pt-0.5">
                    <span className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">Colors:</span>
                    {product.colors.slice(0, 4).map((c, cIdx) => (
                      <span
                        key={cIdx}
                        className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Piece Action */}
              <div className="p-4 pt-0 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between mt-2">
                <div>
                  <span className="text-base font-bold font-serif text-neutral-950 dark:text-white">
                    {product.price} EGP
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-neutral-500 line-through ml-1.5">
                      {product.originalPrice} EGP
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleQuickView(product)}
                  className="text-xs font-bold text-purple-700 dark:text-purple-400 hover:underline flex items-center"
                >
                  Details <ArrowRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Stylist Reasoning & Pro Tips */}
        <div
          className={`p-5 rounded-2xl border ${
            isDarkMode ? 'bg-purple-950/20 border-purple-900/40' : 'bg-purple-50/70 border-purple-100'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-purple-600 text-white shrink-0 mt-0.5 shadow-md shadow-purple-600/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
                Stylist Reasoning & Why This Works
              </h4>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                {recommendation.reasoning}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {recommendation.stylingTips.map((tip, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white dark:bg-neutral-900 border border-purple-200 dark:border-purple-800 text-neutral-800 dark:text-neutral-200"
                  >
                    💡 {tip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core Actions: View Outfit, Add All to Cart, Save Outfit, Try Another */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="ai-add-all-to-cart-btn"
              onClick={handleAddAll}
              className="px-6 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2"
            >
              {addedAnimation ? <Check className="w-4 h-4 text-emerald-300" /> : <ShoppingBag className="w-4 h-4" />}
              <span>{addedAnimation ? 'Added All Items to Cart!' : `Add All to Cart (${recommendation.totalCost} EGP)`}</span>
            </button>

            {onSaveOutfit && (
              <button
                id="ai-save-outfit-btn"
                onClick={() => onSaveOutfit(recommendation)}
                className={`px-5 py-3.5 rounded-full font-semibold text-sm border transition-all flex items-center space-x-1.5 ${
                  isSaved
                    ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300'
                    : isDarkMode
                    ? 'border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800'
                    : 'border-[#E0D8C8] bg-white text-neutral-900 hover:bg-[#F7F3EB]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-rose-500' : ''}`} />
                <span>{isSaved ? 'Saved to Wardrobe' : 'Save Outfit ❤️'}</span>
              </button>
            )}

            <button
              id="ai-open-try-on-btn"
              onClick={() => onOpenTryOn(recommendation)}
              className={`px-5 py-3.5 rounded-full font-semibold text-sm border transition-all flex items-center space-x-1.5 ${
                isDarkMode
                  ? 'border-neutral-700 bg-neutral-900 text-purple-300 hover:bg-neutral-800'
                  : 'border-[#E0D8C8] bg-white text-purple-700 hover:bg-[#F7F3EB]'
              }`}
            >
              <Eye className="w-4 h-4 text-purple-500" />
              <span>Try in Fitting Room ✨</span>
            </button>
          </div>

          {onTryAnother && (
            <button
              id="ai-try-another-btn"
              onClick={onTryAnother}
              className="px-5 py-3.5 rounded-full font-semibold text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center space-x-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Another Prompt</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
