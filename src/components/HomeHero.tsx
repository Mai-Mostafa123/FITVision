import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ShoppingBag,
  TrendingUp,
  Tag,
  Compass,
  Sliders,
  Palette,
  Layers,
  Sparkle,
  Check,
} from 'lucide-react';
import { AiOutfitRecommendation } from '../types';

interface HomeHeroProps {
  onSearchSubmit: (query: string) => void;
  onExploreBrands?: () => void;
  onTryAiStylist?: () => void;
  isDarkMode: boolean;
  isLoading?: boolean;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onSearchSubmit,
  onExploreBrands,
  onTryAiStylist,
  isDarkMode,
  isLoading = false,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const samplePrompts = [
    'Outfit for university under 1500 EGP',
    'Black outfit for a dinner',
    'Summer casual outfit',
    'Graduation outfit',
    'Minimalist beige office look under 2000 EGP',
    'Streetwear Tokyo & Cairo vibe with cargo pants',
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  const handleChipClick = (promptText: string) => {
    setSearchInput(promptText);
    onSearchSubmit(promptText);
  };

  return (
    <section
      id="home-hero-section"
      className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-20 transition-colors duration-300"
    >
      {/* Background subtle geometric accents & ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-purple-600/10 to-indigo-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Structured 12-Column CSS Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Natural Language AI Search Engine & Typographic Focus (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Geometric Balance Theme Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border shadow-xs transition-all duration-300 bg-white/80 dark:bg-neutral-900/80 border-[#E2DCD2] dark:border-[#33302C] text-neutral-800 dark:text-neutral-200 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="font-brand-display uppercase tracking-widest text-[10px] text-[#8B7355] dark:text-[#D2B48C]">
                Geometric Balance Theme
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">|</span>
              <span className="flex items-center space-x-1 text-purple-700 dark:text-purple-300 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 inline" />
                <span>AI Fashion Commerce</span>
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1
              id="hero-headline"
              className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.08]"
            >
              Your Style. Your AI.{' '}
              <span className="italic font-normal bg-gradient-to-r from-purple-700 via-indigo-600 to-[#8B7355] bg-clip-text text-transparent dark:from-purple-300 dark:via-indigo-200 dark:to-[#D2B48C]">
                Your Perfect Outfit.
              </span>
            </h1>

            {/* Subheadline with clear proportions */}
            <p
              id="hero-subheadline"
              className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-xl font-normal leading-relaxed"
            >
              Describe what you want in conversational natural language. FitVision AI analyzes occasion, silhouette, season, and budget to immediately synthesize cohesive outfits from verified partner brands.
            </p>

            {/* Architectural Search Form Console */}
            <div className="pt-1">
              <form
                id="ai-natural-search-form"
                onSubmit={handleFormSubmit}
                className={`p-2 rounded-2xl sm:rounded-3xl border shadow-xl transition-all duration-300 backdrop-blur-xl ${
                  isDarkMode
                    ? 'bg-[#181820]/95 border-[#2F2F3D] shadow-purple-950/20 focus-within:border-purple-500/80'
                    : 'bg-white/95 border-[#E2DCD2] shadow-stone-200/70 focus-within:border-purple-600'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex items-center flex-1 px-3 sm:px-4 py-2">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mr-3 animate-pulse" />
                    <input
                      id="hero-ai-search-input"
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="e.g. Minimalist beige & black outfit for university under 1500 EGP"
                      className="w-full bg-transparent border-none text-sm sm:text-base focus:outline-none text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 font-medium"
                    />
                  </div>

                  <button
                    id="hero-find-outfit-btn"
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3.5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/40 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shrink-0 disabled:opacity-75"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    )}
                    <span>✨ Find My Outfit</span>
                  </button>
                </div>
              </form>

              {/* Quick Prompt Chips in Structured Grid */}
              <div className="pt-3.5 space-y-1.5">
                <div className="flex items-center text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <Tag className="w-3.5 h-3.5 mr-1 text-[#6E5739] dark:text-[#D2B48C]" />
                  <span>Popular AI Stylist Queries:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {samplePrompts.map((promptText, idx) => (
                    <button
                      key={idx}
                      id={`sample-prompt-chip-${idx}`}
                      type="button"
                      onClick={() => handleChipClick(promptText)}
                      className={`px-3 py-1.5 rounded-xl border text-[11px] font-medium transition-all duration-150 text-left hover:scale-[1.01] ${
                        isDarkMode
                          ? 'bg-[#1C1B19] border-[#33302C] text-neutral-300 hover:bg-[#242220] hover:border-purple-500/50 hover:text-white'
                          : 'bg-[#FAF8F5] border-[#E2DCD2] text-neutral-800 hover:bg-white hover:border-purple-400 hover:text-neutral-950'
                      }`}
                    >
                      "{promptText}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="hero-cta-try-stylist"
                onClick={onTryAiStylist}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all shadow-md flex items-center space-x-2 hover:scale-[1.02]"
              >
                <span>AI Stylist Studio</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <button
                id="hero-cta-explore-brands"
                onClick={onExploreBrands}
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-semibold border transition-all flex items-center space-x-2 hover:scale-[1.02] ${
                  isDarkMode
                    ? 'border-[#33302C] bg-[#1C1B19] text-white hover:bg-[#242220]'
                    : 'border-[#E2DCD2] bg-white text-neutral-900 hover:bg-[#FAF8F5]'
                }`}
              >
                <span>Explore Brands</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Geometric Balance Matrix Showcase Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div
              className={`p-6 sm:p-7 rounded-3xl border shadow-xl transition-all relative overflow-hidden ${
                isDarkMode
                  ? 'bg-[#1C1B19] border-[#33302C] shadow-black/40'
                  : 'bg-[#FAF8F5] border-[#E2DCD2] shadow-stone-200/50'
              }`}
            >
              {/* Header of Geometric Balance Card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E2DCD2] dark:border-[#33302C]">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8B7355] dark:text-[#D2B48C] font-brand-display">
                    Geometric Balance Engine
                  </div>
                  <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white">
                    Live Aesthetic Synthesis
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>4 Brands Connected</span>
                </span>
              </div>

              {/* Geometric Balance Bento Grid: 2x2 modular matrix */}
              <div className="grid grid-cols-2 gap-3 py-5">
                {/* Module 1: AI Fit Index */}
                <div
                  className={`p-3.5 rounded-2xl border ${
                    isDarkMode ? 'bg-[#242220] border-[#33302C]' : 'bg-white border-[#EDE7DD]'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-neutral-600 dark:text-neutral-400 tracking-wider block">
                    Harmonization Score
                  </span>
                  <div className="flex items-baseline space-x-1.5 mt-1">
                    <span className="text-2xl font-serif font-bold text-purple-600 dark:text-purple-400">
                      98%
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                      Optimal Match
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-amber-500 h-full rounded-full w-[98%]" />
                  </div>
                </div>

                {/* Module 2: Budget Intelligence */}
                <div
                  className={`p-3.5 rounded-2xl border ${
                    isDarkMode ? 'bg-[#242220] border-[#33302C]' : 'bg-white border-[#EDE7DD]'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-neutral-600 dark:text-neutral-400 tracking-wider block">
                    Outfit Budget Filter
                  </span>
                  <div className="flex items-baseline space-x-1 mt-1">
                    <span className="text-2xl font-serif font-bold text-neutral-900 dark:text-white">
                      1,450
                    </span>
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">EGP</span>
                  </div>
                  <span className="text-[10px] text-neutral-600 dark:text-neutral-400 block mt-1 font-medium">
                    4 Pieces (Save 350 EGP)
                  </span>
                </div>

                {/* Module 3: Geometric Palette Swatches */}
                <div
                  className={`col-span-2 p-3.5 rounded-2xl border ${
                    isDarkMode ? 'bg-[#242220] border-[#33302C]' : 'bg-white border-[#EDE7DD]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                    <span>Geometric Balance Palette</span>
                    <span className="text-[#6E5739] dark:text-[#D2B48C]">Summer 2026</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="space-y-1 text-center">
                      <div className="h-6 rounded-lg bg-[#FAF7F0] border border-black/10 shadow-2xs" />
                      <span className="text-[9px] text-neutral-600 dark:text-neutral-400 font-medium block">Warm Cream</span>
                    </div>
                    <div className="space-y-1 text-center">
                      <div className="h-6 rounded-lg bg-[#D8C3A5] border border-black/10 shadow-2xs" />
                      <span className="text-[9px] text-neutral-600 dark:text-neutral-400 font-medium block">Sandstone</span>
                    </div>
                    <div className="space-y-1 text-center">
                      <div className="h-6 rounded-lg bg-[#8B7355] border border-black/10 shadow-2xs" />
                      <span className="text-[9px] text-neutral-600 dark:text-neutral-400 font-medium block">Desert Tan</span>
                    </div>
                    <div className="space-y-1 text-center">
                      <div className="h-6 rounded-lg bg-[#111111] border border-black/10 shadow-2xs" />
                      <span className="text-[9px] text-neutral-600 dark:text-neutral-400 font-medium block">Obsidian</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Sample Look Preview */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                  isDarkMode ? 'bg-[#141312] border-[#33302C]' : 'bg-[#F5F2ED] border-[#E2DCD2]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-serif font-bold text-sm">
                    ✨
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Cairo Campus Look
                    </h4>
                    <p className="text-[10px] text-neutral-600 dark:text-neutral-400 font-medium">Maison Noir + Kairo Threads</p>
                  </div>
                </div>
                <button
                  onClick={() => onSearchSubmit('Outfit for university under 1500 EGP')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-purple-700 dark:text-purple-400 hover:bg-purple-600/10 transition-colors flex items-center space-x-1"
                >
                  <span>Synthesize</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Grid (Structured 4-Column Geometric Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto text-left pt-4">
          <div
            className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
              isDarkMode
                ? 'bg-[#1C1B19] border-[#33302C] hover:border-purple-500/50'
                : 'bg-white border-[#E2DCD2] hover:border-purple-300'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
              Natural Language AI
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
              Describe your mood or event; our model extracts aesthetic parameters with zero keyword friction.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
              isDarkMode
                ? 'bg-[#1C1B19] border-[#33302C] hover:border-indigo-500/50'
                : 'bg-white border-[#E2DCD2] hover:border-indigo-300'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
              Complete Harmonized Outfits
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
              Top, bottom, footwear, and accessories tailored together under your exact price ceiling.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
              isDarkMode
                ? 'bg-[#1C1B19] border-[#33302C] hover:border-amber-500/50'
                : 'bg-white border-[#E2DCD2] hover:border-amber-300'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
              Virtual Try-On Room
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
              Simulate fit proportions, drape, fabric breathability, and lighting before bag checkout.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
              isDarkMode
                ? 'bg-[#1C1B19] border-[#33302C] hover:border-emerald-500/50'
                : 'bg-white border-[#E2DCD2] hover:border-emerald-300'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
              Connected Brand Sync
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
              Real-time multi-brand catalog from Maison Noir, Kairo Threads, Aura Studio, and Zephyr.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

