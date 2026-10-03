import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  ShoppingBag,
  Heart,
  User,
  Sliders,
  ShieldCheck,
  Building2,
  TrendingUp,
  Palette,
  Eye,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';

import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { AiSearchSection } from './components/AiSearchSection';
import { AiStylistPage } from './components/AiStylistPage';
import { ShopPage } from './components/ShopPage';
import { OutfitBuilder } from './components/OutfitBuilder';
import { VirtualTryOnModal } from './components/VirtualTryOnModal';
import { ColorAnalyzerModal } from './components/ColorAnalyzerModal';
import { TrendsSection } from './components/TrendsSection';
import { BrandsSection } from './components/BrandsSection';
import { BrandDashboard } from './components/BrandDashboard';
import { CustomerProfile } from './components/CustomerProfile';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';
import {
  TextColorCustomizerModal,
  TEXT_COLOR_THEMES,
  TextColorTheme,
} from './components/TextColorCustomizerModal';

import {
  BRANDS,
  PRODUCTS,
  INITIAL_AI_RECOMMENDATION,
  TRENDS,
  INITIAL_BRAND_ANALYTICS,
  INITIAL_USER_PROFILE,
} from './data/mockData';

import {
  Product,
  AiOutfitRecommendation,
  CartItem,
  WishlistItem,
  TrendArticle,
  Brand,
} from './types';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0],
      selectedColor: 'White',
      selectedSize: 'M',
      quantity: 1,
    },
    {
      id: 'cart-init-2',
      product: PRODUCTS[1],
      selectedColor: 'Beige',
      selectedSize: '32',
      quantity: 1,
    },
  ]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    { productId: PRODUCTS[0].id, product: PRODUCTS[0], addedAt: 'Yesterday' },
    { productId: PRODUCTS[2].id, product: PRODUCTS[2], addedAt: '2 days ago' },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // AI Recommendation Engine State
  const [aiRecommendation, setAiRecommendation] = useState<AiOutfitRecommendation>(
    INITIAL_AI_RECOMMENDATION
  );
  const [isAiSearching, setIsAiSearching] = useState<boolean>(false);
  const [currentSearchPrompt, setCurrentSearchPrompt] = useState<string>(
    'I need a casual university outfit for summer under 1500 EGP, preferably black and beige.'
  );

  // Modals State
  const [isTryOnOpen, setIsTryOnOpen] = useState<boolean>(false);
  const [tryOnOutfit, setTryOnOutfit] = useState<AiOutfitRecommendation | null>(
    INITIAL_AI_RECOMMENDATION
  );
  const [isColorAnalyzerOpen, setIsColorAnalyzerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Outfit Builder Active Foundation Item
  const [builderBaseProduct, setBuilderBaseProduct] = useState<Product | null>(PRODUCTS[0]);

  // Text Color & Typography Customizer State
  const [textColorThemeId, setTextColorThemeId] = useState<string>('monochrome');
  const [isTextColorModalOpen, setIsTextColorModalOpen] = useState<boolean>(false);
  const [customTextColors, setCustomTextColors] = useState<{
    main: string;
    heading: string;
    muted: string;
    accent: string;
  }>({
    main: '#09090B',
    heading: '#000000',
    muted: '#475569',
    accent: '#18181B',
  });
  const [fontSizeScale, setFontSizeScale] = useState<number>(1.0);
  const [fontWeightBoost, setFontWeightBoost] = useState<string>('normal');

  // Synchronize CSS custom properties on document root when text color changes
  useEffect(() => {
    const selectedTheme =
      TEXT_COLOR_THEMES.find((t) => t.id === textColorThemeId) || TEXT_COLOR_THEMES[0];

    const colors =
      textColorThemeId === 'custom'
        ? customTextColors
        : isDarkMode
        ? selectedTheme.dark
        : selectedTheme.light;

    document.documentElement.style.setProperty('--color-text-main', colors.main);
    document.documentElement.style.setProperty('--color-text-heading', colors.heading);
    document.documentElement.style.setProperty('--color-text-muted', colors.muted);
    document.documentElement.style.setProperty('--color-text-accent', colors.accent);
    document.documentElement.style.setProperty('--theme-accent-color', colors.accent);
    document.documentElement.style.setProperty('--text-scale', String(fontSizeScale));

    document.body.setAttribute('data-font-weight', fontWeightBoost);
    document.documentElement.setAttribute('data-color-theme', selectedTheme.id);
  }, [textColorThemeId, customTextColors, isDarkMode, fontSizeScale, fontWeightBoost]);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      return next;
    });
  };

  // Add Single Product to Cart
  const handleAddToCart = (
    product: Product,
    selectedColor: string = product.colors[0]?.name || 'Standard',
    selectedSize: string = product.sizes[0] || 'M'
  ) => {
    const itemKey = `${product.id}-${selectedColor}-${selectedSize}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          selectedColor,
          selectedSize,
          quantity: 1,
        },
      ];
    });
    showToast(`Added ${product.name} to your shopping bag!`);
  };

  // Add Multiple / Full Outfit to Cart
  const handleAddOutfitToCart = (items: Product[]) => {
    items.forEach((p) => {
      handleAddToCart(p, p.colors[0]?.name || 'Standard', p.sizes[0] || 'M');
    });
    showToast(`Added complete ${items.length}-piece outfit to your bag!`);
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.productId === product.id);
      if (exists) {
        showToast(`Removed from saved wardrobe.`);
        return prev.filter((w) => w.productId !== product.id);
      }
      showToast(`Saved ${product.name} to your personal wardrobe!`);
      return [...prev, { productId: product.id, product, addedAt: 'Just now' }];
    });
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Cart Item
  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear Cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Execute Natural Language AI Outfit Search
  const handleExecuteAiSearch = async (promptText: string) => {
    setCurrentSearchPrompt(promptText);
    setIsAiSearching(true);

    // Scroll to recommendation section smoothly if on home page
    const elem = document.getElementById('ai-recommendation-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      const res = await fetch('/api/ai/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.outfit) {
          setAiRecommendation(data.outfit);
          setTryOnOutfit(data.outfit);
          setIsAiSearching(false);
          showToast(`AI Stylist generated: "${data.outfit.title}"!`);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend /api/ai/stylist failed, using fallback:', err);
    }

    setTimeout(() => {
      setIsAiSearching(false);
      const lower = promptText.toLowerCase();

      // Synthesize matching pieces from inventory
      let selectedProducts: Product[] = [];
      let occasion = 'Casual';
      let title = 'Casual Campus Summer Look';
      let reasoning =
        'Synthesized to match relaxed university dress codes in warm Cairo weather. High breathability 100% Egyptian poplin paired with relaxed chinos and calfskin leather.';

      if (lower.includes('dinner') || lower.includes('date') || lower.includes('party')) {
        occasion = 'Dinner';
        title = 'Sophisticated Evening Monolith';
        selectedProducts = [PRODUCTS[4], PRODUCTS[5], PRODUCTS[6], PRODUCTS[7]]; // Silk shirt, trousers, loafers, clutch
        reasoning =
          'Curated for intimate evening lighting. Subtle silk sheen creates high-contrast luxury balanced with minimal silhouette accessories.';
      } else if (lower.includes('wedding') || lower.includes('formal') || lower.includes('suit')) {
        occasion = 'Wedding';
        title = 'Tailored Riviera Formal Ensemble';
        selectedProducts = [PRODUCTS[5], PRODUCTS[6], PRODUCTS[8], PRODUCTS[16]]; // Linen blazer, trousers, monk shoes, watch
        reasoning =
          'Formal occasion tailoring utilizing unlined summer wool and crisp double-pleat structure.';
      } else if (lower.includes('black') && lower.includes('beige')) {
        occasion = 'University';
        title = 'Black & Beige Contrast Ensemble';
        selectedProducts = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[3], PRODUCTS[15]]; // White shirt, beige chinos, black sneakers, tote, sunglasses
        reasoning =
          'A timeless high-contrast palette pairing clean beige tailoring with matte black footwear and accessories.';
      } else {
        selectedProducts = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[3]];
      }

      const totalCost = selectedProducts.reduce((sum, p) => sum + p.price, 0);

      const newRec: AiOutfitRecommendation = {
        id: 'rec-' + Date.now(),
        title,
        prompt: promptText,
        occasion: occasion as any,
        season: 'Summer',
        style: 'Minimal',
        budget: totalCost + 350,
        totalCost,
        matchScore: 98,
        reasoning,
        stylingTips: [
          'Tuck the front hem slightly into the waistband for proportional balance.',
          'Roll cuffs twice above the ankle bone to highlight low-profile leather footwear.',
          'Keep accessory hardware monochromatic (polished silver/chrome).',
        ],
        colorPalette: [
          { name: 'Warm Cream / White', hex: '#FAF7F0' },
          { name: 'Warm Sandstone', hex: '#D8C3A5' },
          { name: 'Obsidian Jet', hex: '#111111' },
        ],
        items: selectedProducts,
        createdDate: 'Just now',
      };

      setAiRecommendation(newRec);
      setTryOnOutfit(newRec);
      showToast(`AI Stylist generated: "${title}"!`);
    }, 600);
  };

  // Generate Custom Outfit with Parameters (from Interactive AI Stylist Page)
  const handleGenerateCustomOutfit = async (
    occasion: any,
    season: any,
    style: any,
    colors: string[],
    budget: number,
    additionalNotes: string
  ) => {
    const constructedPrompt = `${style} outfit for ${occasion} in ${season} under ${budget} EGP${
      additionalNotes ? `. Notes: ${additionalNotes}` : ''
    }`;
    setCurrentSearchPrompt(constructedPrompt);
    setIsAiSearching(true);

    try {
      const res = await fetch('/api/ai/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: constructedPrompt,
          occasion,
          season,
          style,
          colors,
          maxBudget: budget,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.outfit) {
          setAiRecommendation(data.outfit);
          setTryOnOutfit(data.outfit);
          setIsAiSearching(false);
          showToast(`AI Stylist synthesized: "${data.outfit.title}"!`);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend /api/ai/stylist custom request failed, falling back:', err);
    }

    setTimeout(() => {
      setIsAiSearching(false);
      let matched = PRODUCTS.filter((p) => p.occasion.includes(occasion) || p.style === style);
      if (matched.length < 3) matched = PRODUCTS.slice(0, 4);
      else matched = matched.slice(0, 4);

      const totalCost = matched.reduce((sum, p) => sum + p.price, 0);

      const newRec: AiOutfitRecommendation = {
        id: 'rec-' + Date.now(),
        title: `${style} ${occasion} Custom Ensemble`,
        prompt: constructedPrompt,
        occasion,
        season,
        style,
        budget,
        totalCost,
        matchScore: 98,
        reasoning: `Bespoke AI curation matching ${occasion} aesthetics and ${style} styling with breathable materials for ${season}.`,
        stylingTips: [
          'Pair with minimalist accessories to let the core tailoring stand out.',
          'Balance proportions with relaxed silhouetting.',
        ],
        colorPalette: colors.map((c, i) => ({ name: `Tone ${i + 1}`, hex: c })),
        items: matched,
        createdDate: 'Just now',
      };

      setAiRecommendation(newRec);
      setTryOnOutfit(newRec);
      showToast(`AI Stylist synthesized: "${newRec.title}"!`);
    }, 600);
  };

  // Open Virtual Try-On Fitting Room
  const handleOpenTryOn = (outfit?: AiOutfitRecommendation) => {
    if (outfit) {
      setTryOnOutfit(outfit);
    } else {
      setTryOnOutfit(aiRecommendation);
    }
    setIsTryOnOpen(true);
  };

  // Open Outfit Builder with specific foundation product
  const handleCompleteOutfitFromProduct = (product: Product) => {
    setBuilderBaseProduct(product);
    setActiveTab('outfit-builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded ${product.name} into Outfit Builder Canvas!`);
  };

  // Open Article & Trend Synthesizer
  const handleSynthesizeTrend = (trend: TrendArticle) => {
    handleExecuteAiSearch(
      `Synthesize full look for ${trend.title} (${trend.tag}) with high-end pieces`
    );
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="fitvision-app-root"
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? 'bg-[#141312] text-[#F5F2ED]' : 'bg-[#F5F2ED] text-[#141312]'
      }`}
    >
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-2xl flex items-center space-x-2.5 border border-purple-500/40 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Header & Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'virtual-try-on') {
            handleOpenTryOn();
          } else if (tab === 'color-analyzer') {
            setIsColorAnalyzerOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        cart={cart}
        wishlist={wishlist}
        setIsCartOpen={setIsCartOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenAiSearch={() => {
          setActiveTab('home');
          const elem = document.getElementById('natural-language-search-form');
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenTextColorCustomizer={() => setIsTextColorModalOpen(true)}
        activeTextColorSwatch={
          textColorThemeId === 'custom'
            ? customTextColors.main
            : isDarkMode
            ? (TEXT_COLOR_THEMES.find((t) => t.id === textColorThemeId) || TEXT_COLOR_THEMES[0]).dark
                .main
            : (TEXT_COLOR_THEMES.find((t) => t.id === textColorThemeId) || TEXT_COLOR_THEMES[0]).light
                .main
        }
        activeThemeName={
          textColorThemeId === 'custom'
            ? 'Custom Palette'
            : (TEXT_COLOR_THEMES.find((t) => t.id === textColorThemeId) || TEXT_COLOR_THEMES[0]).name
        }
      />

      {/* Dynamic Main Body Content */}
      <main className="flex-1">
        {/* TAB 1: HOME PAGE (Hero + AI Recommendation + Mix Builder + Catalog Highlights + Trends + Brands) */}
        {activeTab === 'home' && (
          <div className="space-y-16 pb-20">
            {/* Natural Language Hero Search */}
            <HomeHero
              onSearchSubmit={handleExecuteAiSearch}
              isSearching={isAiSearching}
              isDarkMode={isDarkMode}
            />

            {/* AI Generated Recommendation Matrix Section */}
            <div id="ai-recommendation-section">
              <AiSearchSection
                recommendation={aiRecommendation}
                isLoading={isAiSearching}
                onAddToCart={handleAddToCart}
                onAddAllToCart={handleAddOutfitToCart}
                onOpenTryOn={handleOpenTryOn}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Mix & Match Outfit Builder Canvas */}
            <div className="pt-8 border-t border-[#E2DCD2] dark:border-[#2D2B28]">
              <OutfitBuilder
                products={PRODUCTS}
                activeBaseProduct={builderBaseProduct}
                onSelectBaseProduct={(p) => setBuilderBaseProduct(p)}
                onAddOutfitToCart={handleAddOutfitToCart}
                onOpenTryOn={handleOpenTryOn}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Featured Products Shop Grid */}
            <div className="pt-8 border-t border-[#E2DCD2] dark:border-[#2D2B28]">
              <ShopPage
                products={PRODUCTS}
                brands={BRANDS}
                wishlist={wishlist}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setQuickViewProduct(p)}
                onCompleteOutfit={handleCompleteOutfitFromProduct}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Trend Forecasts & Editorial Lookbooks */}
            <div className="pt-8 border-t border-[#E2DCD2] dark:border-[#2D2B28]">
              <TrendsSection
                trends={TRENDS}
                products={PRODUCTS}
                onOpenArticle={(t) => showToast(`Opening editorial: ${t.title}`)}
                onExploreProduct={(p) => setQuickViewProduct(p)}
                onSynthesizeTrendOutfit={handleSynthesizeTrend}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Connected Fashion Brands Showcase */}
            <div className="pt-8 border-t border-[#E2DCD2] dark:border-[#2D2B28]">
              <BrandsSection
                brands={BRANDS}
                products={PRODUCTS}
                onSelectBrand={(bName) => {
                  setActiveTab('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreProduct={(p) => setQuickViewProduct(p)}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        )}

        {/* TAB 2: AI STYLIST STUDIO */}
        {activeTab === 'ai-stylist' && (
          <div className="py-8">
            <AiStylistPage
              recommendation={aiRecommendation}
              onGenerateOutfit={handleExecuteAiSearch}
              onGenerateCustomOutfit={handleGenerateCustomOutfit}
              isLoading={isAiSearching}
              onAddToCart={handleAddToCart}
              onAddAllToCart={handleAddOutfitToCart}
              onOpenTryOn={handleOpenTryOn}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              onQuickView={(p) => setQuickViewProduct(p)}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* TAB 3: SHOP / CATALOG */}
        {activeTab === 'shop' && (
          <div className="py-8">
            <ShopPage
              products={PRODUCTS}
              brands={BRANDS}
              wishlist={wishlist}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(p) => setQuickViewProduct(p)}
              onCompleteOutfit={handleCompleteOutfitFromProduct}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* TAB 4: OUTFIT BUILDER */}
        {activeTab === 'outfit-builder' && (
          <div className="py-8">
            <OutfitBuilder
              products={PRODUCTS}
              activeBaseProduct={builderBaseProduct}
              onSelectBaseProduct={(p) => setBuilderBaseProduct(p)}
              onAddOutfitToCart={handleAddOutfitToCart}
              onOpenTryOn={handleOpenTryOn}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* TAB 5: TREND FORECASTS */}
        {activeTab === 'trends' && (
          <div className="py-8">
            <TrendsSection
              trends={TRENDS}
              products={PRODUCTS}
              onOpenArticle={(t) => showToast(`Opening editorial: ${t.title}`)}
              onExploreProduct={(p) => setQuickViewProduct(p)}
              onSynthesizeTrendOutfit={handleSynthesizeTrend}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* TAB 6: CONNECTED BRANDS */}
        {activeTab === 'brands' && (
          <div className="py-8">
            <BrandsSection
              brands={BRANDS}
              products={PRODUCTS}
              onSelectBrand={(bName) => {
                setActiveTab('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreProduct={(p) => setQuickViewProduct(p)}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* TAB 7: BRAND PARTNER DASHBOARD & TELEMETRY */}
        {activeTab === 'brand-dashboard' && (
          <div className="py-8">
            <BrandDashboard
              analytics={INITIAL_BRAND_ANALYTICS}
              products={PRODUCTS}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* TAB 8: CUSTOMER PROFILE & WARDROBE */}
        {activeTab === 'profile' && (
          <div className="py-8">
            <CustomerProfile
              profile={INITIAL_USER_PROFILE}
              wishlist={wishlist}
              onRemoveFromWishlist={(id) => {
                setWishlist((prev) => prev.filter((w) => w.productId !== id));
                showToast('Removed from saved wardrobe.');
              }}
              onAddToCart={handleAddToCart}
              onAddAllToCart={handleAddOutfitToCart}
              onOpenTryOn={handleOpenTryOn}
              onRerunPrompt={(prompt) => {
                handleExecuteAiSearch(prompt);
                setActiveTab('home');
              }}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* TAB 9: ENTERPRISE ADMIN & BRAND SYNC */}
        {activeTab === 'admin' && (
          <div className="py-8">
            <AdminPortal
              products={PRODUCTS}
              brands={BRANDS}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </main>

      {/* Global Slide-Out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        isDarkMode={isDarkMode}
      />

      {/* Global Virtual Try-On Modal */}
      <VirtualTryOnModal
        isOpen={isTryOnOpen}
        onClose={() => setIsTryOnOpen(false)}
        outfit={tryOnOutfit}
        onAddToCart={handleAddOutfitToCart}
        isDarkMode={isDarkMode}
      />

      {/* Global AI Color & Complexion Analyzer Modal */}
      <ColorAnalyzerModal
        isOpen={isColorAnalyzerOpen}
        onClose={() => setIsColorAnalyzerOpen(false)}
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
        isDarkMode={isDarkMode}
      />

      {/* Global Quick View Product Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onCompleteOutfit={handleCompleteOutfitFromProduct}
        isDarkMode={isDarkMode}
      />

      {/* Global Text Color & Typography Customizer Modal */}
      <TextColorCustomizerModal
        isOpen={isTextColorModalOpen}
        onClose={() => setIsTextColorModalOpen(false)}
        currentThemeId={textColorThemeId}
        onSelectTheme={(theme) => {
          setTextColorThemeId(theme.id);
          showToast(`Text color changed to ${theme.name}!`);
        }}
        customColors={customTextColors}
        onUpdateCustomColors={(newColors) => {
          setCustomTextColors(newColors);
          setTextColorThemeId('custom');
          showToast(`Updated custom text colors!`);
        }}
        fontSizeScale={fontSizeScale}
        setFontSizeScale={setFontSizeScale}
        fontWeightBoost={fontWeightBoost}
        setFontWeightBoost={setFontWeightBoost}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onResetToDefault={() => {
          setTextColorThemeId('monochrome');
          setCustomTextColors({
            main: '#09090B',
            heading: '#000000',
            muted: '#475569',
            accent: '#18181B',
          });
          setFontSizeScale(1.0);
          setFontWeightBoost('normal');
          showToast('Restored default Monochrome theme and typography settings.');
        }}
      />

      {/* Floating Quick Text Color Customizer Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          id="floating-text-color-btn"
          onClick={() => setIsTextColorModalOpen(true)}
          className="group px-4 py-2.5 rounded-full bg-white/95 dark:bg-neutral-900/95 border border-purple-300 dark:border-purple-800/60 shadow-xl backdrop-blur-md flex items-center space-x-2 text-xs font-semibold hover:scale-105 transition-all text-neutral-900 dark:text-white"
          title="Customize App Text Color & Font Contrast"
        >
          <span
            className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs"
            style={{
              backgroundColor:
                textColorThemeId === 'custom'
                  ? customTextColors.main
                  : isDarkMode
                  ? (TEXT_COLOR_THEMES.find((t) => t.id === textColorThemeId) || TEXT_COLOR_THEMES[0])
                      .dark.main
                  : (TEXT_COLOR_THEMES.find((t) => t.id === textColorThemeId) || TEXT_COLOR_THEMES[0])
                      .light.main,
            }}
          />
          <Palette className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Text Color</span>
        </button>
      </div>

      {/* Global Editorial Footer */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBrands={() => {
          setActiveTab('brands');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
