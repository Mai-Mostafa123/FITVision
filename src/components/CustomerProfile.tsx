import React, { useState } from 'react';
import {
  User,
  Heart,
  History,
  ShoppingBag,
  Sparkles,
  Sliders,
  DollarSign,
  Check,
  Trash2,
  Eye,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { UserProfile, AiOutfitRecommendation, Product, WishlistItem } from '../types';

interface CustomerProfileProps {
  profile: UserProfile;
  wishlist: WishlistItem[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onAddAllToCart: (items: Product[]) => void;
  onOpenTryOn: (outfit: AiOutfitRecommendation) => void;
  onRerunPrompt: (prompt: string) => void;
  isDarkMode: boolean;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({
  profile,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onAddAllToCart,
  onOpenTryOn,
  onRerunPrompt,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'wardrobe' | 'saved-outfits' | 'history' | 'preferences'>('wardrobe');
  const [bodyFit, setBodyFit] = useState<'Slim' | 'Regular' | 'Oversized' | 'Tailored'>(profile.bodyFitPreference);

  return (
    <div id="customer-profile-container" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Profile Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-all ${
          isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5] shadow-lg'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-600 shadow-md">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                {profile.name}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                AI VIP
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium mt-0.5">{profile.email} • {profile.phone}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mt-2">
              {profile.favoriteStyles.map((st) => (
                <span
                  key={st}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F2ECE1] dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Wardrobe Stats */}
        <div className="flex items-center space-x-6 border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 pt-4 md:pt-0 md:pl-8 text-center">
          <div>
            <span className="text-2xl font-bold font-serif text-neutral-950 dark:text-white block">
              {wishlist.length}
            </span>
            <span className="text-[11px] text-neutral-600 dark:text-neutral-400 uppercase font-semibold">Saved Items</span>
          </div>
          <div>
            <span className="text-2xl font-bold font-serif text-neutral-950 dark:text-white block">
              {profile.savedOutfits.length}
            </span>
            <span className="text-[11px] text-neutral-600 dark:text-neutral-400 uppercase font-semibold">AI Outfits</span>
          </div>
          <div>
            <span className="text-2xl font-bold font-serif text-neutral-950 dark:text-white block">
              {profile.aiHistory.length}
            </span>
            <span className="text-[11px] text-neutral-600 dark:text-neutral-400 uppercase font-semibold">AI Queries</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('wardrobe')}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
            activeTab === 'wardrobe'
              ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
              : isDarkMode
              ? 'bg-neutral-900 text-neutral-400 hover:text-white'
              : 'bg-[#F2ECE1] text-neutral-800 hover:text-neutral-950'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Saved Wardrobe Items ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved-outfits')}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
            activeTab === 'saved-outfits'
              ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
              : isDarkMode
              ? 'bg-neutral-900 text-neutral-400 hover:text-white'
              : 'bg-[#F2ECE1] text-neutral-800 hover:text-neutral-950'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated AI Outfits ({profile.savedOutfits.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
            activeTab === 'history'
              ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
              : isDarkMode
              ? 'bg-neutral-900 text-neutral-400 hover:text-white'
              : 'bg-[#F2ECE1] text-neutral-800 hover:text-neutral-950'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Search History</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
            activeTab === 'preferences'
              ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
              : isDarkMode
              ? 'bg-neutral-900 text-neutral-400 hover:text-white'
              : 'bg-[#F2ECE1] text-neutral-800 hover:text-neutral-950'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Sizing & Fit Settings</span>
        </button>
      </div>

      {/* Tab 1: Saved Wardrobe Items */}
      {activeTab === 'wardrobe' && (
        <div>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((item) => {
                const product = item.product;
                return (
                  <div
                    key={product.id}
                    className={`rounded-3xl border overflow-hidden flex flex-col justify-between group transition-all ${
                      isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5]'
                    }`}
                  >
                    <div>
                      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                        <img
                          src={product.images.main}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-rose-500 hover:scale-110 shadow-md transition-transform"
                          title="Remove from Saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="p-4 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block truncate">
                          {product.brandName}
                        </span>
                        <h4 className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1">
                          {product.name}
                        </h4>
                        <span className="text-sm font-serif font-bold text-neutral-950 dark:text-white block">
                          {product.price} EGP
                        </span>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        onClick={() => onAddToCart(product)}
                        className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 transition-colors flex items-center justify-center space-x-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`p-16 rounded-3xl border text-center space-y-3 ${
                isDarkMode ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-[#E8E2D5]'
              }`}
            >
              <Heart className="w-10 h-10 text-neutral-400 mx-auto" />
              <h3 className="font-serif text-lg font-bold">Your Saved Wardrobe is Empty</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Explore the fashion store or generate AI outfits to save pieces directly to your wardrobe.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Outfits */}
      {activeTab === 'saved-outfits' && (
        <div className="space-y-6">
          {profile.savedOutfits.map((outfit) => (
            <div
              key={outfit.id}
              className={`p-6 sm:p-8 rounded-3xl border space-y-6 transition-all ${
                isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5] shadow-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Saved Outfit • {outfit.occasion}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">
                    {outfit.title}
                  </h3>
                  <p className="text-xs text-neutral-500 italic mt-0.5">"{outfit.prompt}"</p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-neutral-500 block">Total Look Cost</span>
                  <span className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">
                    {outfit.totalCost.toLocaleString()} EGP
                  </span>
                </div>
              </div>

              {/* 4 Item thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {outfit.items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl border ${
                      isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-[#FAF8F5] border-[#E8E2D5]'
                    }`}
                  >
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2">
                      <img
                        src={item.images.main}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block truncate">
                      {item.brandName}
                    </span>
                    <h5 className="text-xs font-medium text-neutral-900 dark:text-white line-clamp-1">
                      {item.name}
                    </h5>
                    <span className="text-xs font-serif font-bold text-neutral-950 dark:text-white block mt-1">
                      {item.price} EGP
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => onAddAllToCart(outfit.items)}
                  className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md flex items-center space-x-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add All Pieces to Bag</span>
                </button>

                <button
                  onClick={() => onOpenTryOn(outfit)}
                  className="px-5 py-3 rounded-full text-xs font-semibold border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 flex items-center space-x-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Virtual Try-On</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Search History */}
      {activeTab === 'history' && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5]'
          }`}
        >
          <h3 className="font-serif text-xl font-bold text-neutral-950 dark:text-white mb-2">
            Past Natural Language Queries
          </h3>

          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {profile.aiHistory.map((h) => (
              <div key={h.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                    "{h.query}"
                  </h4>
                  <div className="flex items-center space-x-3 text-xs text-neutral-500 mt-1">
                    <span>{h.timestamp}</span>
                    <span>•</span>
                    <span>Occasion: {h.occasion}</span>
                    <span>•</span>
                    <span>Total: {h.totalCost} EGP</span>
                  </div>
                </div>

                <button
                  onClick={() => onRerunPrompt(h.query)}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-[#F2ECE1] dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-purple-600 hover:text-white transition-colors flex items-center space-x-1 shrink-0"
                >
                  <span>Re-run</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Preferences & Body Fit */}
      {activeTab === 'preferences' && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5]'
          }`}
        >
          <div>
            <h3 className="font-serif text-xl font-bold text-neutral-950 dark:text-white">
              Sizing & Body Silhouette Profile
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              FitVision AI adapts garment drop shoulders, sleeve breaks, and waist tensions to these settings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-500">Tops & Shirts</span>
              <span className="text-base font-bold text-neutral-950 dark:text-white block">
                {profile.preferredSizes.tops}
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-500">Pants & Trousers</span>
              <span className="text-base font-bold text-neutral-950 dark:text-white block">
                {profile.preferredSizes.bottoms}
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-500">Footwear</span>
              <span className="text-base font-bold text-neutral-950 dark:text-white block">
                {profile.preferredSizes.shoes}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Body Silhouette Fit Preference:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['Slim', 'Regular', 'Oversized', 'Tailored'] as const).map((fit) => (
                <button
                  key={fit}
                  type="button"
                  onClick={() => setBodyFit(fit)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    bodyFit === fit
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md font-bold'
                      : isDarkMode
                      ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                      : 'bg-[#FAF8F5] border-[#E8E2D5] text-neutral-700'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
