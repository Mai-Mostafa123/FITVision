import React from 'react';
import {
  Sparkles,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Eye,
  Calendar,
  Layers,
  Palette,
} from 'lucide-react';
import { TrendArticle, Product } from '../types';

interface TrendsSectionProps {
  trends: TrendArticle[];
  products: Product[];
  onOpenArticle: (trend: TrendArticle) => void;
  onExploreProduct: (product: Product) => void;
  onSynthesizeTrendOutfit: (trend: TrendArticle) => void;
  isDarkMode: boolean;
}

export const TrendsSection: React.FC<TrendsSectionProps> = ({
  trends,
  products,
  onOpenArticle,
  onExploreProduct,
  onSynthesizeTrendOutfit,
  isDarkMode,
}) => {
  return (
    <section id="fashion-trends-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Editorial Trend Forecasts</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white">
            Fashion Trend Forecast
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 max-w-xl">
            Real-time aesthetic analytics compiled from Cairo runway shows, European linen trends, and urban street styling.
          </p>
        </div>
      </div>

      {/* 3 Main Trend Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {trends.map((trend) => {
          const featuredPieces = products.filter((p) => trend.featuredProductIds.includes(p.id));

          return (
            <article
              key={trend.id}
              id={`trend-card-${trend.id}`}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5]'
              }`}
            >
              <div>
                {/* Hero Editorial Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={trend.image}
                    alt={trend.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-md">
                      {trend.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/90 text-neutral-900 backdrop-blur-md">
                      {trend.readTime}
                    </span>
                  </div>
                </div>

                {/* Article Copy & Palette */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                      {trend.season}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-neutral-950 dark:text-white mt-1">
                      {trend.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-semibold mt-0.5">{trend.subtitle}</p>
                  </div>

                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                    {trend.description}
                  </p>

                  {/* Color Harmony Swatches */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block">
                      Trend Color Palette:
                    </span>
                    <div className="flex items-center space-x-2">
                      {trend.colorPalette.map((col, idx) => (
                        <div key={idx} className="flex items-center space-x-1">
                          <span
                            className="w-4 h-4 rounded-full border border-black/15 shadow-2xs"
                            style={{ backgroundColor: col.hex }}
                            title={col.name}
                          />
                          <span className="text-[10px] text-neutral-700 dark:text-neutral-300 font-medium hidden xl:inline">
                            {col.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Products Thumbnails */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block">
                      Key Garment Pieces:
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {featuredPieces.slice(0, 4).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => onExploreProduct(p)}
                          className="aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:scale-105 transition-transform"
                          title={p.name}
                        >
                          <img
                            src={p.images.main}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 border-t border-neutral-100 dark:border-neutral-800/80 mt-4 flex items-center justify-between">
                <button
                  onClick={() => onSynthesizeTrendOutfit(trend)}
                  className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Synthesize Look with AI</span>
                </button>

                <button
                  onClick={() => onOpenArticle(trend)}
                  className="text-xs font-bold text-neutral-900 dark:text-white flex items-center hover:translate-x-1 transition-transform"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
