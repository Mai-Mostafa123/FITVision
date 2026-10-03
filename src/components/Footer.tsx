import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Building2,
  Mail,
  ArrowRight,
  Heart,
  Globe,
  Instagram,
  Twitter,
  Github,
} from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: any) => void;
  onOpenBrands: () => void;
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenBrands,
  isDarkMode,
}) => {
  return (
    <footer
      id="fitvision-main-footer"
      className={`border-t transition-colors ${
        isDarkMode
          ? 'bg-[#101014] border-[#242432] text-neutral-400'
          : 'bg-[#EDE7DD] border-[#DDD5C7] text-neutral-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-neutral-300 dark:border-neutral-800">
          {/* Brand Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-brand-display text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                FitVision<span className="text-purple-600 dark:text-purple-400 font-serif italic text-xl">.AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              The AI-powered fashion commerce platform connecting shoppers with curated brand catalogs in Cairo and Paris. Describe any look in natural language; our neural stylist compiles real, purchasable garments instantly.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                Live Brand Stock Synchronized
              </span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-neutral-950 dark:text-white uppercase tracking-wider">
              Experience
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab('home')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  AI Natural Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('stylist')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Stylist Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('shop')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Brand Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('builder')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Outfit Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('trends')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Trend Forecasts
                </button>
              </li>
            </ul>
          </div>

          {/* Connected Brand Partners */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-neutral-950 dark:text-white uppercase tracking-wider">
              Brand Partners
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab('brands')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Maison Noir
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('brands')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Aura Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('brands')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  Kairo Threads
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('brands')}
                  className="hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  L'Étoile Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('dashboard')}
                  className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
                >
                  Partner Portal →
                </button>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-neutral-950 dark:text-white uppercase tracking-wider">
              AI Fashion Digest
            </h4>
            <p className="text-xs">
              Receive weekly algorithmic trend forecasts and capsule collection drops in your inbox.
            </p>
            <div className="flex items-center space-x-1.5">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-3.5 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode
                    ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500'
                    : 'bg-white border-[#DDD5C7] text-neutral-900 placeholder-neutral-400'
                }`}
              />
              <button className="p-2.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} FitVision AI Commerce Inc. Crafted with Geometric Balance aesthetic.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer">
              Brand API Integrations
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
