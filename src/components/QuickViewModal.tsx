import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShoppingBag,
  Heart,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Layers,
} from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  onCompleteOutfit: (product: Product) => void;
  isDarkMode: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onCompleteOutfit,
  isDarkMode,
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [activeImageIndex, setActiveImageIndex] = useState<'main' | 'model' | 'detail'>('main');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const images = [
    { key: 'main', url: product.images.main, label: 'Flat Piece' },
    product.images.model ? { key: 'model', url: product.images.model, label: 'Model Drape' } : null,
    product.images.detail ? { key: 'detail', url: product.images.detail, label: 'Fabric Texture' } : null,
  ].filter(Boolean) as { key: 'main' | 'model' | 'detail'; url: string; label: string }[];

  const currentImageUrl =
    activeImageIndex === 'model' && product.images.model
      ? product.images.model
      : activeImageIndex === 'detail' && product.images.detail
      ? product.images.detail
      : product.images.main;

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      id="quick-view-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className={`relative w-full max-w-4xl rounded-3xl border overflow-hidden shadow-2xl transition-all ${
          isDarkMode
            ? 'bg-[#18181F] border-[#2C2C3C] text-white'
            : 'bg-[#FAF8F5] border-[#E2DCD2] text-[#1A1A1A]'
        }`}
      >
        <button
          id="close-quick-view"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-800 shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Gallery Images (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
              <img
                src={currentImageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnail switcher */}
            <div className="grid grid-cols-3 gap-2">
              {images.map((img) => (
                <button
                  key={img.key}
                  onClick={() => setActiveImageIndex(img.key)}
                  className={`aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === img.key
                      ? 'border-purple-600 ring-2 ring-purple-400/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Details & Actions (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 block">
                  {product.brandName} • {product.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-1">
                  {product.name}
                </h2>
                <div className="flex items-center space-x-3 text-xs text-neutral-500 mt-1">
                  <span className="flex items-center font-medium">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                    {product.rating} ({product.reviewCount} customer reviews)
                  </span>
                  <span>•</span>
                  <span>Style: {product.style}</span>
                </div>
              </div>

              <div className="flex items-baseline space-x-2 pt-1">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 dark:text-white">
                  {product.price} EGP
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    {product.originalPrice} EGP
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Material spec */}
              <div
                className={`p-3 rounded-xl border text-xs ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-[#E8E2D5]'
                }`}
              >
                <span className="font-bold text-neutral-900 dark:text-white">Fabric Spec: </span>
                <span className="text-neutral-600 dark:text-neutral-300">{product.material}</span>
              </div>

              {/* Color Selection */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  <span>Color:</span>
                  <span className="text-purple-600 dark:text-purple-400">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c, idx) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          isSelected
                            ? 'border-purple-600 scale-110 ring-2 ring-purple-400/30'
                            : 'border-black/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {isSelected && (
                          <Check
                            className={`w-3.5 h-3.5 ${
                              c.hex === '#FFFFFF' || c.hex === '#FAF7F0' ? 'text-black' : 'text-white'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  <span>Size:</span>
                  <span className="text-purple-600 dark:text-purple-400">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 border-neutral-950'
                            : isDarkMode
                            ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                            : 'bg-white border-[#E8E2D5] text-neutral-700'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
              <button
                id="quick-view-add-to-cart"
                onClick={handleAdd}
                className="w-full py-3.5 rounded-2xl font-bold text-white bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all flex items-center justify-center space-x-2"
              >
                {addedAnimation ? <Check className="w-4 h-4 text-emerald-400" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{addedAnimation ? 'Added to Bag!' : `Add to Bag • ${product.price} EGP`}</span>
              </button>

              <button
                id="quick-view-complete-look"
                onClick={() => {
                  onClose();
                  onCompleteOutfit(product);
                }}
                className="w-full py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 shadow-md shadow-purple-600/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Complete Outfit with AI ✨</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
