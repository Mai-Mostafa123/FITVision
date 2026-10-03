import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  RotateCcw,
  Check,
  Calendar,
  Layers,
  Palette,
  DollarSign,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Eye,
  Shirt,
} from 'lucide-react';
import {
  OccasionType,
  SeasonType,
  StyleType,
  Product,
  AiOutfitRecommendation,
} from '../types';

interface AiStylistPageProps {
  onGenerateCustomOutfit?: (
    occasion: OccasionType,
    season: SeasonType,
    style: StyleType,
    colors: string[],
    budget: number,
    additionalNotes: string
  ) => void;
  onGenerateOutfit?: (promptText: string) => void;
  isLoading?: boolean;
  activeRecommendation?: AiOutfitRecommendation | null;
  recommendation?: AiOutfitRecommendation | null;
  onAddToCart?: (product: Product) => void;
  onAddAllToCart: (items: Product[]) => void;
  onSaveOutfit?: (outfit: AiOutfitRecommendation) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlist?: any[];
  onOpenTryOn: (outfit: AiOutfitRecommendation) => void;
  onQuickViewProduct?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  isDarkMode: boolean;
}

export const AiStylistPage: React.FC<AiStylistPageProps> = ({
  onGenerateCustomOutfit,
  onGenerateOutfit,
  isLoading = false,
  activeRecommendation,
  recommendation,
  onAddToCart,
  onAddAllToCart,
  onSaveOutfit,
  onToggleWishlist,
  wishlist = [],
  onOpenTryOn,
  onQuickViewProduct,
  onQuickView,
  isDarkMode,
}) => {
  const currentRec = recommendation || activeRecommendation;
  const handleQuickView = onQuickView || onQuickViewProduct || (() => {});
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('University');
  const [selectedSeason, setSelectedSeason] = useState<SeasonType>('Summer');
  const [selectedStyle, setSelectedStyle] = useState<StyleType>('Casual');
  const [selectedColors, setSelectedColors] = useState<string[]>(['#FFFFFF', '#D8C3A5']);
  const [budget, setBudget] = useState<number>(1500);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const occasions: { id: OccasionType; label: string; icon: string }[] = [
    { id: 'University', label: 'University', icon: '🎓' },
    { id: 'Work', label: 'Work & Office', icon: '💼' },
    { id: 'Party', label: 'Party & Club', icon: '🪩' },
    { id: 'Wedding', label: 'Wedding Guest', icon: '💍' },
    { id: 'Dinner', label: 'Dinner & Gala', icon: '🍷' },
    { id: 'Date', label: 'Date Night', icon: '🕯️' },
    { id: 'Casual', label: 'Casual Daily', icon: '☕' },
    { id: 'Travel', label: 'Travel & Resort', icon: '✈️' },
    { id: 'Sport', label: 'Athleisure', icon: '🏃' },
  ];

  const seasons: SeasonType[] = ['Spring', 'Summer', 'Autumn', 'Winter', 'All Season'];

  const styles: { id: StyleType; label: string; desc: string }[] = [
    { id: 'Casual', label: 'Casual', desc: 'Relaxed, versatile daywear' },
    { id: 'Formal', label: 'Formal', desc: 'Sharp tailoring & suits' },
    { id: 'Streetwear', label: 'Streetwear', desc: 'Heavyweight tees & cargos' },
    { id: 'Sporty', label: 'Sporty', desc: 'Clean athletic silhouettes' },
    { id: 'Elegant', label: 'Elegant', desc: 'Silk, drape & evening lines' },
    { id: 'Minimal', label: 'Minimal', desc: 'Understated monochromes' },
    { id: 'Vintage', label: 'Vintage', desc: '90s cuts & retro denim' },
    { id: 'Old Money', label: 'Old Money', desc: 'Cashmere, loafers & polos' },
    { id: 'Resort', label: 'Resort', desc: 'Flax linen & sunlit tones' },
  ];

  const availableColors = [
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Sand Beige', hex: '#D8C3A5' },
    { name: 'Onyx Black', hex: '#111111' },
    { name: 'Oatmeal Cream', hex: '#EBE5DA' },
    { name: 'Sage Green', hex: '#8F9779' },
    { name: 'Midnight Navy', hex: '#1B2430' },
    { name: 'Mocha Brown', hex: '#5C4033' },
    { name: 'Terracotta', hex: '#CC5A36' },
    { name: 'Burgundy', hex: '#58111A' },
    { name: 'Sky Blue', hex: '#D6E4E5' },
  ];

  const toggleColor = (hex: string) => {
    if (selectedColors.includes(hex)) {
      if (selectedColors.length > 1) {
        setSelectedColors(selectedColors.filter((c) => c !== hex));
      }
    } else {
      setSelectedColors([...selectedColors, hex]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof onGenerateCustomOutfit === 'function') {
      onGenerateCustomOutfit(
        selectedOccasion,
        selectedSeason,
        selectedStyle,
        selectedColors,
        budget,
        additionalNotes
      );
    } else if (typeof onGenerateOutfit === 'function') {
      const promptQuery = `${selectedStyle} outfit for ${selectedOccasion} in ${selectedSeason} under ${budget} EGP${
        additionalNotes ? `. Additional notes: ${additionalNotes}` : ''
      }`;
      onGenerateOutfit(promptQuery);
    }
  };

  const handleAddAll = () => {
    if (activeRecommendation) {
      onAddAllToCart(activeRecommendation.items);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 2000);
    }
  };

  return (
    <div id="ai-stylist-page-container" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Interactive AI Fashion Stylist Studio</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-950 dark:text-white">
          Curate Your Personal Look with AI
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-300">
          Configure your exact occasion, climate, aesthetic, favorite color harmony, and budget ceiling. FitVision AI compiles a bespoke look with connected brands in seconds.
        </p>
      </div>

      {/* Main Grid: Left Stylist Form, Right Live Generated Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column (5 Cols on LG) */}
        <div
          className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-[#15151E] border-[#2B2B3D]' : 'bg-white border-[#E8E2D5] shadow-lg'
          }`}
        >
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* 1. Occasion Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2.5">
                1. What is the occasion?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {occasions.map((occ) => {
                  const isSelected = selectedOccasion === occ.id;
                  return (
                    <button
                      key={occ.id}
                      type="button"
                      id={`occasion-btn-${occ.id}`}
                      onClick={() => setSelectedOccasion(occ.id)}
                      className={`p-2.5 rounded-xl text-xs font-medium border flex flex-col items-center justify-center space-y-1 transition-all ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20 scale-[1.02]'
                          : isDarkMode
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                          : 'bg-[#F9F7F2] border-[#E8E2D5] text-neutral-700 hover:bg-[#F2ECE0]'
                      }`}
                    >
                      <span className="text-base">{occ.icon}</span>
                      <span className="truncate w-full text-center">{occ.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Season Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                2. Season
              </label>
              <div className="flex flex-wrap gap-2">
                {seasons.map((season) => {
                  const isSelected = selectedSeason === season;
                  return (
                    <button
                      key={season}
                      type="button"
                      id={`season-btn-${season}`}
                      onClick={() => setSelectedSeason(season)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950 font-bold'
                          : isDarkMode
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                          : 'bg-[#F5EFE6] border-[#E5DFD3] text-neutral-700 hover:text-neutral-950'
                      }`}
                    >
                      {season}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Style Aesthetics */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                3. Style Aesthetic
              </label>
              <div className="grid grid-cols-3 gap-2">
                {styles.map((st) => {
                  const isSelected = selectedStyle === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      id={`style-btn-${st.id}`}
                      onClick={() => setSelectedStyle(st.id)}
                      className={`px-2.5 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : isDarkMode
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                          : 'bg-[#F9F7F2] border-[#E8E2D5] text-neutral-700 hover:bg-[#F2ECE0]'
                      }`}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Favorite Colors */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  4. Favorite Colors (Select Multiple)
                </label>
                <span className="text-[11px] text-neutral-500">
                  {selectedColors.length} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {availableColors.map((color) => {
                  const isSelected = selectedColors.includes(color.hex);
                  return (
                    <button
                      key={color.hex}
                      type="button"
                      id={`color-picker-${color.name.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => toggleColor(color.hex)}
                      className={`group relative w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        isSelected
                          ? 'border-purple-600 scale-110 shadow-md ring-2 ring-purple-400/30'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            color.hex === '#FFFFFF' || color.hex === '#EBE5DA' || color.hex === '#FAF7F0'
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Budget Slider (500 EGP to 5,000 EGP) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  5. Target Budget
                </label>
                <span className="text-sm font-serif font-bold text-neutral-900 dark:text-white">
                  {budget.toLocaleString()} EGP
                </span>
              </div>
              <input
                id="stylist-budget-slider"
                type="range"
                min="500"
                max="5000"
                step="100"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-purple-600 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">
                <span>500 EGP</span>
                <span>2,500 EGP</span>
                <span>5,000 EGP+</span>
              </div>
            </div>

            {/* Optional Context Prompt */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                Additional Notes (Optional)
              </label>
              <input
                type="text"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="e.g. Prefer linen fabrics and comfortable walking shoes"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode
                    ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500'
                    : 'bg-[#F9F7F2] border-[#E8E2D5] text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </div>

            {/* Generate Button */}
            <button
              id="generate-my-outfit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 shadow-xl shadow-purple-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              )}
              <span>Generate My Outfit ✨</span>
            </button>
          </form>
        </div>

        {/* Live Outfit Result Column (7 Cols on LG) */}
        <div className="lg:col-span-7">
          {currentRec ? (
            <div
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                isDarkMode ? 'bg-[#15151E] border-[#2B2B3D]' : 'bg-[#FAF8F5] border-[#E8E2D5] shadow-lg'
              }`}
            >
              {/* Recommendation Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>AI Stylist Look #{currentRec.id.slice(-4)}</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                    {currentRec.title}
                  </h2>
                </div>

                <div className="text-right self-start sm:self-auto">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Total Look Cost</span>
                  <span className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">
                    {currentRec.totalCost.toLocaleString()} EGP
                  </span>
                </div>
              </div>

              {/* Outfit Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
                {currentRec.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all ${
                      isDarkMode ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white border-[#EAE3D5]'
                    }`}
                  >
                    <div>
                      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                        <img
                          src={item.images.main}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-black/70 text-white">
                          Piece #{idx + 1}
                        </span>
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block">
                          {item.brandName}
                        </span>
                        <h4 className="text-xs font-medium text-neutral-900 dark:text-white line-clamp-1 mt-0.5">
                          {item.name}
                        </h4>
                      </div>
                    </div>

                    <div className="p-3 pt-0 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/80 mt-1">
                      <span className="text-xs font-bold font-serif text-neutral-900 dark:text-white">
                        {item.price} EGP
                      </span>
                      <button
                        onClick={() => handleQuickView(item)}
                        className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stylist Insights */}
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed mb-6 ${
                  isDarkMode ? 'bg-purple-950/20 border-purple-900/30 text-neutral-300' : 'bg-purple-50/60 border-purple-100 text-neutral-700'
                }`}
              >
                <div className="flex items-center space-x-1.5 font-bold text-neutral-900 dark:text-white mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Why this outfit matches your profile</span>
                </div>
                <p>{currentRec.reasoning}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  id="stylist-add-complete-look-btn"
                  onClick={handleAddAll}
                  className="px-7 py-3.5 rounded-full font-semibold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 shadow-md shadow-purple-600/30 flex items-center space-x-2"
                >
                  {addedAnimation ? <Check className="w-4 h-4 text-emerald-300" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{addedAnimation ? 'Added Outfit to Cart!' : `Add All to Bag (${currentRec.totalCost} EGP)`}</span>
                </button>

                <button
                  id="stylist-open-try-on-btn"
                  onClick={() => onOpenTryOn(currentRec)}
                  className="px-5 py-3.5 rounded-full font-semibold text-xs border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 flex items-center space-x-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>Fitting Room ✨</span>
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`p-12 rounded-3xl border text-center flex flex-col items-center justify-center space-y-4 ${
                isDarkMode ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-[#E8E2D5]'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Shirt className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
                No Outfit Generated Yet
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm">
                Select your occasion, climate, and target budget on the left to synthesize an instant complete fashion look.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
