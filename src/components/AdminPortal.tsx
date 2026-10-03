import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  RefreshCw,
  Sliders,
  Sparkles,
  Database,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Zap,
} from 'lucide-react';
import { Product, Brand } from '../types';

interface AdminPortalProps {
  products: Product[];
  brands: Brand[];
  isDarkMode: boolean;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  products,
  brands,
  isDarkMode,
}) => {
  const [syncStatus, setSyncStatus] = useState<string>('Connected & Live');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [activeBrandTab, setActiveBrandTab] = useState<string>('all');
  const [aiCreativity, setAiCreativity] = useState<number>(0.7);
  const [colorStrictness, setColorStrictness] = useState<string>('Strict Undertone Harmony');

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('Catalog Re-indexed at ' + new Date().toLocaleTimeString());
    }, 1000);
  };

  const filteredProducts =
    activeBrandTab === 'all'
      ? products
      : products.filter((p) => p.brandId === activeBrandTab || p.brandName === activeBrandTab);

  return (
    <div id="admin-platform-portal" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FitVision Enterprise Admin & Brand Syncer</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white">
            Brand Catalog & AI Orchestration
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 max-w-xl">
            Manage live API feeds from Maison Noir, Aura Studio, Kairo Threads, and tune AI styling temperature & semantic matching models.
          </p>
        </div>

        <button
          id="admin-sync-catalogs-btn"
          onClick={handleTriggerSync}
          disabled={isSyncing}
          className="px-5 py-3 rounded-full text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 flex items-center space-x-2 shadow-md hover:scale-105 transition-all self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Re-indexing Catalogs...' : 'Sync Live Brand APIs'}</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5]'
          }`}
        >
          <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider block mb-1">
            Connected Brand APIs
          </span>
          <span className="text-3xl font-serif font-bold text-neutral-950 dark:text-white">
            {brands.length} Verified
          </span>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            ✓ 100% Webhook Uptime
          </p>
        </div>

        <div
          className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5]'
          }`}
        >
          <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider block mb-1">
            Active SKUs in Live Embeddings
          </span>
          <span className="text-3xl font-serif font-bold text-neutral-950 dark:text-white">
            {products.length} Products
          </span>
          <p className="text-xs text-neutral-500 mt-1">{syncStatus}</p>
        </div>

        <div
          className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5]'
          }`}
        >
          <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider block mb-1">
            AI Stylist Model
          </span>
          <span className="text-3xl font-serif font-bold text-neutral-950 dark:text-white">
            Gemini 2.5 Flash
          </span>
          <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1">
            Structured JSON Schema Active
          </p>
        </div>
      </div>

      {/* AI Stylist Calibration Controls */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5]'
        }`}
      >
        <div className="flex items-center space-x-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <Sliders className="w-5 h-5 text-purple-600" />
          <h3 className="font-serif text-xl font-bold">AI Stylist Engine Parameters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span>Styling Novelty / Temperature</span>
              <span className="font-mono text-purple-600 dark:text-purple-400">{aiCreativity}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={aiCreativity}
              onChange={(e) => setAiCreativity(parseFloat(e.target.value))}
              className="w-full accent-purple-600"
            />
            <p className="text-[11px] text-neutral-500">
              Higher values introduce bolder contrast pairings; lower values prioritize classic monochromes.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold block">Color Harmony Filter</label>
            <select
              value={colorStrictness}
              onChange={(e) => setColorStrictness(e.target.value)}
              className={`w-full p-2.5 rounded-xl border text-xs font-medium ${
                isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-[#FAF8F5] border-[#E8E2D5] text-neutral-900'
              }`}
            >
              <option value="Strict Undertone Harmony">Strict Undertone Harmony (Matches Warm/Cool accurately)</option>
              <option value="High Fashion Contrast">High Fashion Contrast (Editorial pop colors)</option>
              <option value="Tonal Monochrome">Tonal Monochrome Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Table */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
          isDarkMode ? 'bg-[#15151C] border-[#2A2A38]' : 'bg-white border-[#E8E2D5]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h3 className="font-serif text-xl font-bold">Synchronized Brand Inventory</h3>
            <p className="text-xs text-neutral-500">
              Live products available for natural language queries and outfit builders.
            </p>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveBrandTab('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeBrandTab === 'all'
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              All Brands
            </button>
            {brands.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBrandTab(b.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeBrandTab === b.name
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 uppercase font-semibold">
              <tr>
                <th className="py-3 px-2">Garment</th>
                <th className="py-3 px-2">Brand</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Price</th>
                <th className="py-3 px-2">Stock</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {filteredProducts.slice(0, 10).map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                  <td className="py-3 px-2 font-medium flex items-center space-x-2">
                    <img
                      src={p.images.main}
                      alt={p.name}
                      className="w-8 h-10 rounded object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="truncate max-w-xs">{p.name}</span>
                  </td>
                  <td className="py-3 px-2 font-semibold text-purple-600 dark:text-purple-400">
                    {p.brandName}
                  </td>
                  <td className="py-3 px-2 text-neutral-500">{p.category}</td>
                  <td className="py-3 px-2 font-serif font-bold">{p.price} EGP</td>
                  <td className="py-3 px-2 text-neutral-500">{p.inStock ? `${p.stockQuantity} in stock` : 'Out'}</td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Live in AI
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
