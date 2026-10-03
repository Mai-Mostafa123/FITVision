import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Heart,
  ShoppingBag,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  Layers,
  Shirt,
  Palette,
  Eye,
  TrendingUp,
  Building2,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import { CartItem, WishlistItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  wishlist: WishlistItem[];
  setIsCartOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenAiSearch: () => void;
  onOpenTextColorCustomizer?: () => void;
  activeTextColorSwatch?: string;
  activeThemeName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cart,
  wishlist,
  setIsCartOpen,
  isDarkMode,
  toggleDarkMode,
  onOpenAiSearch,
  onOpenTextColorCustomizer,
  activeTextColorSwatch = '#09090B',
  activeThemeName = 'Monochrome',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'ai-stylist', label: 'AI Stylist', isAi: true },
    { id: 'shop', label: 'Shop' },
    { id: 'outfit-builder', label: 'Outfit Builder' },
    { id: 'virtual-try-on', label: 'Try-On', badge: 'AI' },
    { id: 'color-analyzer', label: 'Color AI' },
    { id: 'trends', label: 'Trends' },
    { id: 'brands', label: 'Brands' },
    { id: 'brand-dashboard', label: 'Brand Portal' },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-colors duration-300 backdrop-blur-md border-b ${
        isDarkMode
          ? 'bg-[#121216]/90 border-[#27272E] text-white'
          : 'bg-[#FDFCFA]/95 border-[#E2DCD2] text-[#141312]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button
              id="brand-logo-btn"
              onClick={() => {
                setActiveTab('home');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight block leading-none text-neutral-950 dark:text-white">
                  FitVision <span className="text-purple-600 dark:text-purple-400 font-sans text-xs tracking-widest uppercase font-semibold ml-0.5">AI</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-neutral-600 dark:text-neutral-400 font-semibold">
                  Fashion Commerce
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => setActiveTab(link.id)}
                  className={`px-3 py-2 rounded-full transition-all duration-200 flex items-center space-x-1.5 whitespace-nowrap ${
                    isActive
                      ? isDarkMode
                        ? 'bg-purple-950/60 text-purple-300 border border-purple-800/60 shadow-sm'
                        : 'bg-[#18181B] text-white shadow-sm'
                      : isDarkMode
                      ? 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                      : 'text-neutral-800 hover:text-neutral-950 hover:bg-[#F3EFE6] font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isAi && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                  )}
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-600 text-white leading-none">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick AI Search trigger button */}
            <button
              id="navbar-search-btn"
              onClick={onOpenAiSearch}
              className={`p-2.5 rounded-full transition-colors ${
                isDarkMode
                  ? 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200'
                  : 'bg-[#F2ECE1] hover:bg-[#E8DFC8] text-neutral-800'
              }`}
              title="Natural Language AI Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Button */}
            <button
              id="navbar-wishlist-btn"
              onClick={() => setActiveTab('profile')}
              className={`p-2.5 rounded-full relative transition-colors ${
                isDarkMode
                  ? 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200'
                  : 'bg-[#F2ECE1] hover:bg-[#E8DFC8] text-neutral-800'
              }`}
              title="Saved Items"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="navbar-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className={`p-2.5 rounded-full relative transition-colors ${
                isDarkMode
                  ? 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200'
                  : 'bg-[#F2ECE1] hover:bg-[#E8DFC8] text-neutral-800'
              }`}
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-scale">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Text Color / Typography Palette Switcher */}
            {onOpenTextColorCustomizer && (
              <button
                id="navbar-text-color-customizer-btn"
                onClick={onOpenTextColorCustomizer}
                className={`p-2 sm:px-3 sm:py-2 rounded-full border text-xs font-semibold flex items-center space-x-1.5 transition-all duration-200 hover:scale-105 ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-800/90 text-neutral-200 hover:text-white hover:border-neutral-600'
                    : 'border-[#E2DCD2] bg-[#FAF8F5] text-neutral-900 hover:bg-[#F2ECE1]'
                }`}
                title={`Change Text Color (Current: ${activeThemeName})`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs shrink-0"
                  style={{ backgroundColor: activeTextColorSwatch }}
                />
                <Palette className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span className="hidden sm:inline">Text Color</span>
              </button>
            )}

            {/* Dark/Light Mode Toggle */}
            <button
              id="navbar-darkmode-toggle"
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-full transition-colors ${
                isDarkMode
                  ? 'bg-neutral-800/80 hover:bg-neutral-700 text-amber-400'
                  : 'bg-[#F2ECE1] hover:bg-[#E8DFC8] text-neutral-800'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Customer Profile shortcut */}
            <button
              id="navbar-profile-btn"
              onClick={() => setActiveTab('profile')}
              className={`p-2.5 rounded-full transition-colors hidden sm:flex ${
                activeTab === 'profile'
                  ? 'ring-2 ring-purple-500 bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200'
                  : isDarkMode
                  ? 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200'
                  : 'bg-[#F2ECE1] hover:bg-[#E8DFC8] text-neutral-800'
              }`}
              title="Customer Profile & Wardrobe"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Prominent CTA: Try AI Stylist */}
            <button
              id="navbar-try-ai-stylist-cta"
              onClick={() => setActiveTab('ai-stylist')}
              className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Try AI Stylist ✨</span>
            </button>

            {/* Admin Portal Shortcut */}
            <button
              id="navbar-admin-shortcut-btn"
              onClick={() => setActiveTab('admin')}
              className={`p-2.5 rounded-full transition-colors text-xs font-medium hidden 2xl:flex items-center space-x-1 ${
                activeTab === 'admin'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : isDarkMode
                  ? 'bg-neutral-800/60 hover:bg-neutral-700 text-neutral-400'
                  : 'bg-[#F2ECE1] hover:bg-[#E8DFC8] text-neutral-700'
              }`}
              title="Admin Platform"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[11px] font-semibold">Admin</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="navbar-mobile-hamburger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg xl:hidden text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className={`xl:hidden border-b px-4 pt-2 pb-6 space-y-2 transition-all ${
            isDarkMode ? 'bg-[#15151A] border-[#27272E]' : 'bg-[#FAF7F0] border-[#E8E2D5]'
          }`}
        >
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === link.id
                    ? isDarkMode
                      ? 'bg-purple-900/40 text-purple-300 border border-purple-800/50'
                      : 'bg-[#1A1A1A] text-white'
                    : isDarkMode
                    ? 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                    : 'bg-white text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <span>{link.label}</span>
                {link.isAi && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
              </button>
            ))}
            {onOpenTextColorCustomizer && (
              <button
                id="mobile-nav-text-color"
                onClick={() => {
                  onOpenTextColorCustomizer();
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-neutral-900 text-purple-300 border border-purple-800/30'
                    : 'bg-white text-neutral-800 border border-neutral-200'
                }`}
              >
                <Palette className="w-4 h-4 text-purple-500" />
                <span>Text Color & Font</span>
              </button>
            )}
            <button
              id="mobile-nav-admin"
              onClick={() => {
                setActiveTab('admin');
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'admin'
                  ? 'bg-purple-900/40 text-purple-300'
                  : isDarkMode
                  ? 'bg-neutral-900 text-neutral-300'
                  : 'bg-white text-neutral-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-500" />
              <span>Admin Portal</span>
            </button>
            <button
              id="mobile-nav-profile"
              onClick={() => {
                setActiveTab('profile');
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-purple-900/40 text-purple-300'
                  : isDarkMode
                  ? 'bg-neutral-900 text-neutral-300'
                  : 'bg-white text-neutral-800'
              }`}
            >
              <User className="w-4 h-4 text-purple-500" />
              <span>My Profile</span>
            </button>
          </div>

          <div className="pt-3">
            <button
              id="mobile-try-ai-stylist-cta"
              onClick={() => {
                setActiveTab('ai-stylist');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try AI Stylist ✨</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
