import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  RefreshCw,
  Check,
  ArrowRight,
  Layers,
  CheckCircle2,
  Percent,
} from 'lucide-react';
import { Product, AiOutfitRecommendation } from '../types';

interface OutfitBuilderProps {
  products: Product[];
  activeBaseProduct: Product | null;
  onSelectBaseProduct: (product: Product) => void;
  onAddOutfitToCart: (items: Product[]) => void;
  onOpenTryOn: (outfit: AiOutfitRecommendation) => void;
  isDarkMode: boolean;
}

export const OutfitBuilder: React.FC<OutfitBuilderProps> = ({
  products,
  activeBaseProduct,
  onSelectBaseProduct,
  onAddOutfitToCart,
  onOpenTryOn,
  isDarkMode,
}) => {
  const [baseItem, setBaseItem] = useState<Product>(activeBaseProduct || products[0]);
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Helper matching engine for complementary pieces
  const getComplementaryItems = (base: Product): Product[] => {
    let pants: Product | undefined;
    let shoes: Product | undefined;
    let bag: Product | undefined;
    let acc: Product | undefined;

    if (base.category === 'Shirts' || base.category === 'Tops' || base.category === 'T-Shirts') {
      pants = products.find((p) => p.category === 'Pants' || p.category === 'Jeans') || products[1];
      shoes = products.find((p) => p.category === 'Shoes') || products[2];
      bag = products.find((p) => p.category === 'Bags') || products[3];
      acc = products.find((p) => p.category === 'Accessories') || products[15];
    } else if (base.category === 'Dresses') {
      pants = products.find((p) => p.category === 'Jackets') || products[5]; // blazer
      shoes = products.find((p) => p.category === 'Shoes' && p.style === 'Elegant') || products[6];
      bag = products.find((p) => p.category === 'Bags') || products[7];
      acc = products.find((p) => p.id === 'prod-19') || products[8];
    } else if (base.category === 'Pants' || base.category === 'Jeans') {
      pants = products.find((p) => p.category === 'Shirts' || p.category === 'Tops') || products[0];
      shoes = products.find((p) => p.category === 'Shoes') || products[2];
      bag = products.find((p) => p.category === 'Bags') || products[3];
      acc = products.find((p) => p.category === 'Jackets') || products[16];
    } else {
      pants = products[0];
      shoes = products[1];
      bag = products[2];
      acc = products[3];
    }

    return [base, pants, shoes, bag, acc].filter(
      (item, index, self) => item && self.findIndex((i) => i.id === item.id) === index
    );
  };

  const outfitItems = getComplementaryItems(baseItem);
  const rawTotal = outfitItems.reduce((sum, item) => sum + item.price, 0);
  const bundleDiscount = Math.round(rawTotal * 0.1); // 10% bundle discount
  const finalTotal = rawTotal - bundleDiscount;

  const handleCompleteOutfit = () => {
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
    }, 600);
  };

  const handleAddToCart = () => {
    onAddOutfitToCart(outfitItems);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const syntheticLook: AiOutfitRecommendation = {
    id: 'builder-' + baseItem.id,
    title: `AI Ensemble for ${baseItem.name}`,
    prompt: `Complete coordinated look built around ${baseItem.name}`,
    occasion: baseItem.occasion[0] || 'Casual',
    season: baseItem.season[0] || 'Summer',
    style: baseItem.style,
    budget: finalTotal + 300,
    totalCost: finalTotal,
    matchScore: 99,
    reasoning: `Synthesized to balance the silhouette of ${baseItem.name} with tonal coordination across footwear, outerwear, and accessories.`,
    stylingTips: [
      'Contrast fabric weights: pair relaxed poplin with structured leather.',
      'Maintain tonal cohesion with warm neutral undertones.',
    ],
    colorPalette: [
      { name: 'Core Base', hex: baseItem.colors[0]?.hex || '#FFFFFF' },
      { name: 'Complementary', hex: '#D8C3A5' },
      { name: 'Accent', hex: '#111111' },
    ],
    items: outfitItems,
    createdDate: 'Just now',
  };

  return (
    <div id="outfit-builder-container" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Interactive Mix & Match Canvas</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-950 dark:text-white">
          AI Outfit Builder
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Select any foundation garment from your wardrobe or the connected brand catalog. Our AI stylist instantly completes the entire look with matching pants, shoes, bags, and jewelry.
        </p>
      </div>

      {/* Step 1: Base Product Selector Horizontal Carousel */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-[#FAF8F5] border-[#E8E2D5]'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white">
              Choose Foundation Piece:
            </h3>
          </div>
          <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
            Selected: <strong className="text-purple-700 dark:text-purple-400 font-bold">{baseItem.name}</strong>
          </span>
        </div>

        <div className="flex items-center space-x-4 overflow-x-auto pb-3 scrollbar-none">
          {products.slice(0, 10).map((product) => {
            const isSelected = baseItem.id === product.id;
            return (
              <button
                key={product.id}
                id={`builder-select-base-${product.id}`}
                onClick={() => {
                  setBaseItem(product);
                  handleCompleteOutfit();
                }}
                className={`group shrink-0 w-44 rounded-2xl border p-2.5 text-left transition-all duration-200 ${
                  isSelected
                    ? 'ring-2 ring-purple-600 bg-purple-50/70 dark:bg-purple-950/40 border-purple-500 scale-[1.02] shadow-md'
                    : isDarkMode
                    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                    : 'bg-white border-[#E8E2D5] hover:border-neutral-400'
                }`}
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2">
                  <img
                    src={product.images.main}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-400 block truncate">
                  {product.brandName}
                </span>
                <h4 className="text-xs font-semibold text-neutral-950 dark:text-white truncate">
                  {product.name}
                </h4>
                <span className="text-xs font-bold font-serif text-neutral-950 dark:text-white block mt-1">
                  {product.price} EGP
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: AI Synthesized Outfit Canvas */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5] shadow-xl'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
                Complete AI Recommended Look
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                Coordinated pieces selected to harmonise with {baseItem.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <button
              id="builder-regenerate-btn"
              onClick={handleCompleteOutfit}
              disabled={isBuilding}
              className={`p-2.5 rounded-full border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                isDarkMode ? 'border-neutral-700 bg-neutral-900 text-neutral-300' : 'border-[#E0D8C8] bg-white text-neutral-950 hover:bg-[#F7F3EB]'
              }`}
              title="Re-run styling matrix"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isBuilding ? 'animate-spin' : ''}`} />
              <span>Refresh Pairings</span>
            </button>

            <button
              id="builder-try-on-btn"
              onClick={() => onOpenTryOn(syntheticLook)}
              className="px-4 py-2.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:scale-105 transition-transform"
            >
              Fitting Room ✨
            </button>
          </div>
        </div>

        {/* Outfit Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-6">
          {outfitItems.map((item, index) => {
            const isBase = item.id === baseItem.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-3 flex flex-col justify-between group transition-all ${
                  isBase
                    ? 'border-purple-600 ring-2 ring-purple-600/30 bg-purple-50/50 dark:bg-purple-950/20'
                    : isDarkMode
                    ? 'bg-neutral-900/90 border-neutral-800'
                    : 'bg-[#FAF8F5] border-[#E8E2D5]'
                }`}
              >
                <div>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2">
                    <img
                      src={item.images.main}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span
                      className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        isBase ? 'bg-purple-600 text-white' : 'bg-black/80 text-white'
                      }`}
                    >
                      {isBase ? 'Base Piece' : item.category}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-400 block truncate">
                    {item.brandName}
                  </span>
                  <h4 className="text-xs font-semibold text-neutral-950 dark:text-white line-clamp-1 mt-0.5">
                    {item.name}
                  </h4>
                </div>

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between mt-2">
                  <span className="text-xs font-bold font-serif text-neutral-950 dark:text-white">
                    {item.price} EGP
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                    ✓ Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Summary & Complete Bundle CTA */}
        <div
          className={`p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
            isDarkMode ? 'bg-purple-950/20 border-purple-900/40' : 'bg-purple-50/70 border-purple-100'
          }`}
        >
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Percent className="w-4 h-4 text-purple-700 dark:text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
                FitVision AI Bundle Special (-10% Off)
              </span>
            </div>
            <div className="flex items-baseline justify-center md:justify-start space-x-3">
              <span className="font-serif text-3xl font-bold text-neutral-950 dark:text-white">
                {finalTotal.toLocaleString()} EGP
              </span>
              <span className="text-sm text-neutral-500 line-through font-medium">
                {rawTotal.toLocaleString()} EGP
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                Save {bundleDiscount} EGP
              </span>
            </div>
          </div>

          <button
            id="builder-add-complete-outfit-btn"
            onClick={handleAddToCart}
            className="w-full md:w-auto px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 shadow-xl shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            {addedAnimation ? <Check className="w-5 h-5 text-emerald-300" /> : <ShoppingBag className="w-5 h-5" />}
            <span>
              {addedAnimation ? 'Added Complete Look to Cart!' : 'Add Complete Outfit to Cart ✨'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
