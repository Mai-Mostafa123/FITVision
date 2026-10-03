import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Search,
  Sparkles,
  ShoppingBag,
  DollarSign,
  Users,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Tag,
} from 'lucide-react';
import { BrandAnalytics, Product } from '../types';

interface BrandDashboardProps {
  analytics: BrandAnalytics;
  products: Product[];
  isDarkMode: boolean;
}

export const BrandDashboard: React.FC<BrandDashboardProps> = ({
  analytics,
  products,
  isDarkMode,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30d' | '90d' | '1y'>('30d');

  return (
    <div id="brand-portal-dashboard" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Brand Commerce Partner Portal</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white">
            FitVision Partner Analytics
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 max-w-xl">
            Live telemetry of AI search queries, outfit synthesis frequency, conversion rates, and shopper styling intent.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {(['30d', '90d', '1y'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedTimeframe === tf
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                  : isDarkMode
                  ? 'bg-neutral-900 text-neutral-400 hover:text-white'
                  : 'bg-[#F2ECE1] text-neutral-700 hover:text-neutral-950'
              }`}
            >
              Last {tf === '30d' ? '30 Days' : tf === '90d' ? '90 Days' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          className={`p-6 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5] shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-2">
            <span className="font-bold uppercase tracking-wider">AI Search Requests</span>
            <Search className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-neutral-950 dark:text-white">
              {analytics.aiSearchesCount.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center">
              +18.4% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium mt-1">Natural language queries matching brand catalog</p>
        </div>

        <div
          className={`p-6 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5] shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-2">
            <span className="font-bold uppercase tracking-wider">Outfits Synthesized</span>
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-neutral-950 dark:text-white">
              {analytics.recommendedOutfitsCount.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center">
              +24.1% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium mt-1">Complete coordinated ensembles displayed</p>
        </div>

        <div
          className={`p-6 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5] shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-2">
            <span className="font-bold uppercase tracking-wider">Connected Shoppers</span>
            <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-neutral-950 dark:text-white">
              {analytics.connectedCustomers.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center">
              +12.8% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium mt-1">Active customer wardrobe profiles</p>
        </div>

        <div
          className={`p-6 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5] shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-2">
            <span className="font-bold uppercase tracking-wider">Gross Platform GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-bold font-serif text-neutral-950 dark:text-white">
              {(analytics.salesRevenue / 1000000).toFixed(2)}M EGP
            </span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center">
              +32.6% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium mt-1">Direct checkout through FitVision AI engine</p>
        </div>
      </div>

      {/* Main Grid: Frequent Combinations (Left 7 cols), Intent Keywords (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Top Frequent AI Combinations */}
        <div
          className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border transition-all ${
            isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5] shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-950 dark:text-white">
                Most Frequent AI Outfit Combinations
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium mt-0.5">
                Garments paired together by the AI engine with highest cart checkout conversion.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-700 dark:text-purple-400">High Conversion</span>
          </div>

          <div className="space-y-4">
            {analytics.frequentCombinations.map((combo, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border space-y-3 ${
                  isDarkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-[#FAF8F5] border-[#E8E2D5]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-neutral-950 dark:text-white flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{combo.title}</span>
                  </h4>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    {combo.conversionRate}% Conversion
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {combo.items.map((item, iIdx) => (
                    <span
                      key={iIdx}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 font-medium pt-1 border-t border-neutral-200 dark:border-neutral-800">
                  <span>Recommended {combo.frequency.toLocaleString()} times</span>
                  <span className="font-bold font-serif text-neutral-950 dark:text-white">
                    {combo.revenue.toLocaleString()} EGP Total GMV
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Search Intent Keywords & Color Analytics */}
        <div className="lg:col-span-5 space-y-8">
          {/* Top Search Intent Queries */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5] shadow-sm'
            }`}
          >
            <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white mb-1">
              Top Customer Search Intents
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium mb-4">
              Real prompts entered into FitVision AI natural language bar.
            </p>

            <div className="space-y-2.5">
              {analytics.searchIntentKeywords.map((intent, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-500 font-mono font-bold">#{idx + 1}</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-200">
                      "{intent.word}"
                    </span>
                  </div>
                  <span className="font-semibold text-neutral-600 dark:text-neutral-400 font-mono">
                    {intent.count.toLocaleString()} queries
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Color & Style Demand Breakdown */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5] shadow-sm'
            }`}
          >
            <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white mb-1">
              Popular Color Demand
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium mb-4">
              Color palettes shoppers request most across AI queries.
            </p>

            <div className="space-y-3">
              {analytics.popularColors.map((col, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="font-semibold text-neutral-900 dark:text-neutral-200">
                        {col.name}
                      </span>
                    </div>
                    <span className="font-bold text-neutral-950 dark:text-white">
                      {col.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${col.percentage}%` }}
                    />
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
