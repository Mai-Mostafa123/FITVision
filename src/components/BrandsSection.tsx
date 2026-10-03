import React from 'react';
import {
  Building2,
  ExternalLink,
  ShieldCheck,
  Star,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Brand, Product } from '../types';

interface BrandsSectionProps {
  brands: Brand[];
  products: Product[];
  onSelectBrand: (brandName: string) => void;
  onExploreProduct: (product: Product) => void;
  isDarkMode: boolean;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({
  brands,
  products,
  onSelectBrand,
  onExploreProduct,
  isDarkMode,
}) => {
  return (
    <section id="brands-showcase-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Integrated Fashion Houses</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white">
            Connected Fashion Brands
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 max-w-xl">
            FitVision AI connects live inventory catalogs from verified Egyptian & Parisian fashion houses to compile real, purchasable outfits.
          </p>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {brands.map((brand) => {
          const brandProducts = products.filter(
            (p) => p.brandId === brand.id || p.brandName === brand.name
          );

          return (
            <div
              key={brand.id}
              id={`brand-card-${brand.id}`}
              className={`rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl ${
                isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5]'
              }`}
            >
              <div>
                {/* Brand Banner with overlay logo */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-neutral-900">
                  <img
                    src={brand.banner}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-neutral-900 shrink-0">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-white">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-serif text-xl sm:text-2xl font-bold">{brand.name}</h3>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-500 text-white">
                            Verified API
                          </span>
                        </div>
                        <p className="text-xs text-neutral-300 font-medium">{brand.tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brand Details & Metrics */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                    {brand.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-[#FAF8F5] border-[#E8E2D5]'
                      }`}
                    >
                      <span className="text-[10px] text-neutral-600 dark:text-neutral-400 uppercase font-semibold block">
                        Location
                      </span>
                      <span className="text-xs font-bold text-neutral-950 dark:text-white">
                        {brand.location}
                      </span>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl border ${
                        isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-[#FAF8F5] border-[#E8E2D5]'
                      }`}
                    >
                      <span className="text-[10px] text-neutral-600 dark:text-neutral-400 uppercase font-semibold block">
                        Rating
                      </span>
                      <span className="text-xs font-bold text-neutral-950 dark:text-white flex items-center justify-center">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                        {brand.rating}
                      </span>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl border ${
                        isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-[#FAF8F5] border-[#E8E2D5]'
                      }`}
                    >
                      <span className="text-[10px] text-neutral-600 dark:text-neutral-400 uppercase font-semibold block">
                        Catalogue
                      </span>
                      <span className="text-xs font-bold text-neutral-950 dark:text-white">
                        {brand.totalProducts} Items
                      </span>
                    </div>
                  </div>

                  {/* Top Garments from this Brand */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block">
                      Featured Brand Essentials:
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {brandProducts.slice(0, 4).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onExploreProduct(item)}
                          className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:scale-105 transition-transform"
                          title={item.name}
                        >
                          <img
                            src={item.images.main}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-neutral-100 dark:border-neutral-800/80 mt-4 flex items-center justify-between">
                <button
                  onClick={() => onSelectBrand(brand.name)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all flex items-center space-x-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shop {brand.name}</span>
                </button>

                <a
                  href={brand.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-neutral-500 hover:text-purple-600 dark:hover:text-purple-400 font-medium flex items-center space-x-1"
                >
                  <span>Official Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
