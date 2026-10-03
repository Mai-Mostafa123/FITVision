import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Sparkles,
  Heart,
  ShoppingBag,
  Eye,
  Check,
  X,
  ChevronDown,
  ArrowUpDown,
  Tag,
  Shirt,
  Layers,
} from 'lucide-react';
import { Product, CategoryType, StyleType, Brand, WishlistItem } from '../types';

interface ShopPageProps {
  products: Product[];
  brands: Brand[];
  wishlist: WishlistItem[];
  onAddToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  onToggleWishlist: (product: Product) => void;
  onCompleteOutfit: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isDarkMode: boolean;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  brands,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onCompleteOutfit,
  onQuickView,
  isDarkMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [selectedColorHex, setSelectedColorHex] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categories: ('All' | CategoryType)[] = [
    'All',
    'Tops',
    'Shirts',
    'T-Shirts',
    'Pants',
    'Jeans',
    'Dresses',
    'Jackets',
    'Shoes',
    'Bags',
    'Accessories',
  ];

  const styles: ('All' | StyleType)[] = [
    'All',
    'Casual',
    'Formal',
    'Streetwear',
    'Sporty',
    'Elegant',
    'Minimal',
    'Old Money',
    'Resort',
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '39', '40', '41', '42'];

  const colorPalette = [
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Onyx Black', hex: '#111111' },
    { name: 'Sand Beige', hex: '#D8C3A5' },
    { name: 'Oatmeal', hex: '#EBE5DA' },
    { name: 'Sage Green', hex: '#8F9779' },
    { name: 'Midnight Navy', hex: '#1B2430' },
    { name: 'Burgundy', hex: '#58111A' },
  ];

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedBrand !== 'All' && p.brandName !== selectedBrand && p.brandId !== selectedBrand) return false;
        if (selectedStyle !== 'All' && p.style !== selectedStyle) return false;
        if (p.price > priceRange) return false;
        if (selectedColorHex && !p.colors.some((c) => c.hex.toLowerCase() === selectedColorHex.toLowerCase()))
          return false;
        if (selectedSize && !p.sizes.includes(selectedSize)) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.brandName.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      });
  }, [products, selectedCategory, selectedBrand, selectedStyle, priceRange, selectedColorHex, selectedSize, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedStyle('All');
    setSelectedColorHex(null);
    setSelectedSize(null);
    setPriceRange(2000);
    setSearchQuery('');
  };

  return (
    <div id="shop-page-container" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Multi-Brand Catalogue</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white">
            Fashion Store
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 max-w-xl">
            Explore authentic collections from Maison Noir, Aura Studio, Kairo Threads, and Zephyr. Connect any piece to our AI Outfit Engine.
          </p>
        </div>

        {/* Search & Sort Row */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or brands..."
              className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium ${
                isDarkMode
                  ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500'
                  : 'bg-white border-[#E8E2D5] text-neutral-950 placeholder-neutral-500'
              }`}
            />
          </div>

          <button
            id="mobile-filter-drawer-btn"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className={`md:hidden px-3.5 py-2 rounded-full border text-xs font-semibold flex items-center space-x-1.5 ${
              isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-[#E8E2D5] text-neutral-950'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Categories Horizontal Scrolling Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`shop-category-pill-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                  : isDarkMode
                  ? 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800'
                  : 'bg-[#F2ECE1] text-neutral-800 hover:text-neutral-950 hover:bg-[#E8DFC8]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Shop Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Desktop Filter Sidebar (3 cols) */}
        <aside
          className={`hidden md:block md:col-span-3 p-6 rounded-3xl border space-y-6 sticky top-24 transition-all ${
            isDarkMode ? 'bg-[#1C1B19] border-[#33302C]' : 'bg-[#FAF8F5] border-[#E2DCD2]'
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#E2DCD2] dark:border-[#33302C] pb-3">
            <span className="font-serif text-base font-bold text-neutral-950 dark:text-white flex items-center">
              <SlidersHorizontal className="w-4 h-4 mr-2 text-[#6E5739] dark:text-[#D2B48C]" />
              Geometric Filters
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-[#6E5739] dark:text-[#D2B48C] hover:underline font-bold"
            >
              Reset All
            </button>
          </div>

          {/* Brands Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
              Connected Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold border focus:outline-none ${
                isDarkMode ? 'bg-[#242220] border-[#33302C] text-white' : 'bg-white border-[#E2DCD2] text-neutral-950'
              }`}
            >
              <option value="All">All Connected Brands</option>
              {brands.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
              <span>Max Budget</span>
              <span className="font-serif text-sm font-bold text-neutral-950 dark:text-white">
                {priceRange} EGP
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-purple-600 h-1.5 bg-neutral-300 dark:bg-neutral-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-semibold text-neutral-600 dark:text-neutral-400 mt-1">
              <span>100 EGP</span>
              <span>2,000 EGP</span>
            </div>
          </div>

          {/* Style Aesthetic Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
              Aesthetic Style
            </label>
            <div className="flex flex-wrap gap-1.5">
              {styles.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStyle(st)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                    selectedStyle === st
                      ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950 dark:border-white shadow-xs'
                      : isDarkMode
                      ? 'bg-[#242220] border-[#33302C] text-neutral-300 hover:bg-neutral-800'
                      : 'bg-white border-[#E2DCD2] text-neutral-800 hover:bg-[#FAF8F5]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
              <span>Color Harmony</span>
              {selectedColorHex && (
                <button
                  onClick={() => setSelectedColorHex(null)}
                  className="text-[10px] text-purple-700 dark:text-purple-400 font-bold hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {colorPalette.map((col) => {
                const isSelected = selectedColorHex === col.hex;
                return (
                  <button
                    key={col.hex}
                    onClick={() => setSelectedColorHex(isSelected ? null : col.hex)}
                    className={`w-6 h-6 rounded-full border transition-all flex items-center justify-center ${
                      isSelected
                        ? 'border-purple-600 scale-110 shadow-sm ring-2 ring-purple-400/40'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {isSelected && (
                      <Check
                        className={`w-3 h-3 ${
                          col.hex === '#FFFFFF' || col.hex === '#EBE5DA' || col.hex === '#D8C3A5' ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
              <span>Size Matrix</span>
              {selectedSize && (
                <button
                  onClick={() => setSelectedSize(null)}
                  className="text-[10px] text-purple-700 dark:text-purple-400 font-bold hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {sizes.slice(0, 8).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                  className={`py-1 rounded-lg text-xs font-semibold border text-center transition-all ${
                    selectedSize === sz
                      ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900'
                      : isDarkMode
                      ? 'bg-[#242220] border-[#33302C] text-neutral-300'
                      : 'bg-white border-[#E2DCD2] text-neutral-800 hover:bg-[#FAF8F5]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Cards Grid (9 cols on MD) */}
        <div className="md:col-span-9 space-y-6">
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-neutral-700 dark:text-neutral-300 pb-2 border-b border-[#E2DCD2] dark:border-[#33302C] font-medium">
            <span>
              Showing <strong className="text-neutral-950 dark:text-white font-bold">{filteredProducts.length}</strong> verified fashion products in Geometric Balance
            </span>

            <div className="flex items-center space-x-2">
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`p-1.5 rounded-xl text-xs font-semibold border focus:outline-none ${
                  isDarkMode ? 'bg-[#1C1B19] border-[#33302C] text-white' : 'bg-white border-[#E2DCD2] text-neutral-950'
                }`}
              >
                <option value="featured">AI Featured & Trending</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Grid of Product Cards */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.some((w) => w.productId === product.id);

                return (
                  <div
                    key={product.id}
                    id={`product-card-${product.id}`}
                    className={`group rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 ${
                      isDarkMode
                        ? 'bg-[#1C1B19] border-[#33302C] hover:border-[#D2B48C]/50'
                        : 'bg-white border-[#E2DCD2] hover:border-[#8B7355]/40'
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

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {product.isTrending && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-neutral-950 shadow-xs">
                              Trending 🔥
                            </span>
                          )}
                          {product.isAiRecommended && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white shadow-xs">
                              AI Preferred ✨
                            </span>
                          )}
                        </div>

                        {/* Wishlist Heart Toggle */}
                        <button
                          id={`wishlist-toggle-${product.id}`}
                          onClick={() => onToggleWishlist(product)}
                          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all shadow-md backdrop-blur-md ${
                            isWishlisted
                              ? 'bg-rose-500 text-white'
                              : 'bg-white/90 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 hover:text-rose-500'
                          }`}
                          title="Save to Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>

                        {/* Quick View Button */}
                        <button
                          onClick={() => onQuickView(product)}
                          className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/95 dark:bg-neutral-900/90 text-neutral-950 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110 font-bold"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Product Metadata */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                          <span className="font-bold text-[#6E5739] dark:text-[#D2B48C] uppercase tracking-wide text-[11px] font-brand-display">
                            {product.brandName}
                          </span>
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200">★ {product.rating}</span>
                        </div>

                        <h3 className="font-serif text-base font-bold text-neutral-950 dark:text-white line-clamp-1 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                          {product.name}
                        </h3>

                        <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed font-normal">
                          {product.description}
                        </p>

                        {/* Color swatches */}
                        <div className="flex items-center space-x-1.5 pt-1">
                          {product.colors.slice(0, 4).map((c, idx) => (
                            <span
                              key={idx}
                              className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                          {product.colors.length > 4 && (
                            <span className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400">+{product.colors.length - 4}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Add to Cart Action Footer */}
                    <div className="p-5 pt-0 border-t border-[#E2DCD2]/80 dark:border-[#33302C]/80 mt-2 space-y-3">
                      <div className="flex items-baseline justify-between pt-3">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-xl font-serif font-bold text-neutral-950 dark:text-white">
                            {product.price} EGP
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-neutral-500 line-through font-medium">
                              {product.originalPrice} EGP
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                          In Stock ({product.stockQuantity})
                        </span>
                      </div>

                      {/* Dual Action Buttons: Add to Cart & Complete My Outfit ✨ */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          id={`add-to-cart-${product.id}`}
                          onClick={() => onAddToCart(product)}
                          className="py-2.5 px-3 rounded-xl text-xs font-bold text-neutral-950 bg-[#FAF8F5] hover:bg-[#EAE5DA] border border-[#E2DCD2] dark:border-[#33302C] dark:bg-[#242220] dark:text-white dark:hover:bg-[#2C2A27] transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>

                        <button
                          id={`complete-outfit-${product.id}`}
                          onClick={() => onCompleteOutfit(product)}
                          className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm flex items-center justify-center space-x-1"
                          title="Let AI build a complete outfit around this piece"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span className="truncate">Complete Look</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`p-16 rounded-3xl border text-center space-y-4 ${
                isDarkMode ? 'bg-[#1C1B19] border-[#33302C]' : 'bg-white border-[#E2DCD2]'
              }`}
            >
              <Shirt className="w-12 h-12 text-neutral-500 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-neutral-950 dark:text-white">
                No matching fashion products found
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto font-medium">
                Try widening your price range slider or clearing specific style and color filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
