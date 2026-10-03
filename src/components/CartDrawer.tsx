import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Percent,
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  isDarkMode: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  isDarkMode,
}) => {
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.15) : 0;
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 60;
  const total = subtotal - discountAmount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FITVISION' || promoCode.trim().toUpperCase() === 'AI15') {
      setDiscountApplied(true);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1200);
  };

  return (
    <div
      id="cart-slide-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
    >
      <div
        className={`w-full max-w-md h-full flex flex-col justify-between shadow-2xl transition-all ${
          isDarkMode ? 'bg-[#15151C] text-white' : 'bg-[#FAF8F5] text-[#1A1A1A]'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-serif text-xl font-bold">Your Fashion Bag</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold">
              {cart.reduce((s, i) => s + i.quantity, 0)} Items
            </span>
          </div>

          <button
            id="close-cart-drawer"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Items List */}
        {orderComplete ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Order Confirmed!</h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Thank you for ordering with FitVision AI. Your garments from Maison Noir and connected brands are currently being prepared for express delivery in Cairo.
            </p>
            <button
              onClick={() => {
                setOrderComplete(false);
                onClearCart();
                onClose();
              }}
              className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700"
            >
              Continue Styling
            </button>
          </div>
        ) : cart.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-[#E8E2D5]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                    <img
                      src={item.product.images.main}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block truncate">
                      {item.product.brandName}
                    </span>
                    <h5 className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1">
                      {item.product.name}
                    </h5>
                    <div className="flex items-center space-x-2 text-[11px] text-neutral-500 mt-0.5">
                      <span>Color: {item.selectedColor}</span>
                      <span>•</span>
                      <span>Size: {item.selectedSize}</span>
                    </div>
                    <span className="text-xs font-serif font-bold text-neutral-900 dark:text-white block mt-1">
                      {item.product.price} EGP
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full space-y-2">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center space-x-1.5 border border-neutral-200 dark:border-neutral-800 rounded-lg p-0.5">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="pt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (e.g. FITVISION)"
                  className={`flex-1 px-3.5 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode
                      ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500'
                      : 'bg-white border-[#E8E2D5] text-neutral-900 placeholder-neutral-400'
                  }`}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950"
                >
                  Apply
                </button>
              </div>
              {discountApplied && (
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">
                  ✓ 15% VIP AI Fashion discount applied!
                </span>
              )}
            </form>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3 my-auto">
            <ShoppingBag className="w-12 h-12 text-neutral-400 mx-auto" />
            <h4 className="font-serif text-lg font-bold">Your shopping bag is empty</h4>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Use our AI Stylist or search bar to discover complete curated outfits.
            </p>
          </div>
        )}

        {/* Drawer Footer & Checkout summary */}
        {!orderComplete && cart.length > 0 && (
          <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} EGP</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>AI Promo Discount (15%)</span>
                  <span>-{discountAmount.toLocaleString()} EGP</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `${shipping} EGP`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-950 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <span>Total</span>
                <span className="font-serif text-lg">{total.toLocaleString()} EGP</span>
              </div>
            </div>

            <button
              id="cart-checkout-btn"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 shadow-xl shadow-purple-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] disabled:opacity-75"
            >
              {isCheckingOut ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Secure AI Checkout ({total.toLocaleString()} EGP)</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
