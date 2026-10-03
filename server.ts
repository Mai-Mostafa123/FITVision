import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import { PRODUCTS, BRANDS, INITIAL_BRAND_ANALYTICS, INITIAL_AI_RECOMMENDATION } from './src/data/mockData';
import { Product, AiOutfitRecommendation } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Gemini Client
let geminiAi: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  geminiAi = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-Memory Database Stores
let productsDb: Product[] = [...PRODUCTS];
let brandsDb = [...BRANDS];
let ordersDb: any[] = [];
let aiQueryLogsDb: any[] = [];

// Helper heuristic outfit builder
function buildHeuristicOutfit(
  prompt: string,
  occasion?: string,
  season?: string,
  style?: string,
  colors?: string[],
  maxBudget?: number
): AiOutfitRecommendation {
  const pLower = (prompt || '').toLowerCase();
  const occ = (occasion || (pLower.includes('dinner') || pLower.includes('gala') ? 'Dinner' : pLower.includes('university') || pLower.includes('college') ? 'University' : pLower.includes('wedding') ? 'Wedding' : pLower.includes('work') || pLower.includes('office') ? 'Work' : 'Casual')) as any;
  const targetBudget = maxBudget && maxBudget > 0 ? maxBudget : pLower.includes('1500') ? 1500 : pLower.includes('2000') ? 2000 : pLower.includes('3000') ? 3000 : 2500;
  const isBlackDinner = pLower.includes('black') || occ === 'Dinner' || occ === 'Wedding' || pLower.includes('formal') || pLower.includes('party');

  let selectedItems: Product[] = [];

  if (isBlackDinner) {
    // Elegant Black outfit
    const dress = productsDb.find(p => p.id === 'prod-5') || productsDb.find(p => p.category === 'Dresses') || productsDb[0];
    const blazer = productsDb.find(p => p.id === 'prod-6') || productsDb.find(p => p.category === 'Jackets') || productsDb[1];
    const heels = productsDb.find(p => p.id === 'prod-7') || productsDb.find(p => p.category === 'Shoes') || productsDb[2];
    const bag = productsDb.find(p => p.id === 'prod-8') || productsDb.find(p => p.category === 'Bags') || productsDb[3];
    selectedItems = [dress, blazer, heels, bag].filter(Boolean);
  } else if (pLower.includes('street') || style === 'Streetwear' || pLower.includes('cairo')) {
    // Streetwear
    const tee = productsDb.find(p => p.id === 'prod-9') || productsDb.find(p => p.category === 'T-Shirts') || productsDb[0];
    const cargos = productsDb.find(p => p.id === 'prod-10') || productsDb.find(p => p.category === 'Pants') || productsDb[1];
    const overshirt = productsDb.find(p => p.id === 'prod-17') || productsDb.find(p => p.category === 'Jackets') || productsDb[2];
    const sneakers = productsDb.find(p => p.id === 'prod-3') || productsDb.find(p => p.category === 'Shoes') || productsDb[3];
    selectedItems = [tee, cargos, overshirt, sneakers].filter(Boolean);
  } else {
    // Classic Summer / University / Casual
    const top = productsDb.find(p => p.id === 'prod-1') || productsDb.find(p => p.category === 'Shirts') || productsDb[0];
    const bottom = productsDb.find(p => p.id === 'prod-2') || productsDb.find(p => p.category === 'Pants') || productsDb[1];
    const shoes = productsDb.find(p => p.id === 'prod-3') || productsDb.find(p => p.category === 'Shoes') || productsDb[2];
    const bag = productsDb.find(p => p.id === 'prod-4') || productsDb.find(p => p.category === 'Bags') || productsDb[3];
    selectedItems = [top, bottom, shoes, bag].filter(Boolean);
  }

  const totalCost = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return {
    id: 'outfit-' + Date.now(),
    title: `${occ} ${style || 'Curated'} Ensemble`,
    prompt: prompt || 'Curated natural language styling recommendation',
    occasion: occ,
    season: (season || 'Summer') as any,
    style: (style || 'Casual') as any,
    budget: targetBudget,
    totalCost: totalCost,
    matchScore: 98,
    reasoning: `FitVision AI paired these items to balance silhouette proportions, breathable Egyptian organic fabrics, and tonal harmony while staying comfortably within your ${targetBudget} EGP budget.`,
    stylingTips: [
      'Layer the outer piece unbuttoned for movement and casual dimension.',
      'Complement the warm neutral undertones with minimalist metal jewelry.',
      'Ideal for active mobility and all-day styling versatility.',
    ],
    colorPalette: [
      { name: 'Primary Tone', hex: selectedItems[0]?.colors[0]?.hex || '#FFFFFF' },
      { name: 'Complementary Tone', hex: selectedItems[1]?.colors[0]?.hex || '#D8C3A5' },
      { name: 'Accent Tone', hex: selectedItems[2]?.colors[0]?.hex || '#111111' },
      { name: 'Hardware / Bag', hex: '#FAF7F0' },
    ],
    items: selectedItems,
    createdDate: 'Just now',
    likesCount: 24,
  };
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'FitVision AI Server', timestamp: new Date().toISOString() });
});

// 2. AI Natural Language Stylist Engine
app.post('/api/ai/stylist', async (req, res) => {
  const { prompt, occasion, season, style, colors, maxBudget } = req.body;
  const activePrompt =
    prompt ||
    `${style || 'Curated'} ${occasion || 'Casual'} outfit for ${season || 'Summer'}${
      colors && colors.length ? ` with ${colors.join(', ')} colors` : ''
    }${maxBudget ? ` under ${maxBudget} EGP` : ''}`;

  try {
    // Log AI request
    aiQueryLogsDb.unshift({
      id: 'req-' + Date.now(),
      prompt: activePrompt,
      occasion,
      season,
      style,
      timestamp: new Date().toISOString(),
    });

    if (geminiAi && activePrompt) {
      try {
        const catalogBrief = productsDb.map((p) => ({
          id: p.id,
          name: p.name,
          brand: p.brandName,
          category: p.category,
          price: p.price,
          style: p.style,
          colors: p.colors.map((c) => c.name),
          occasion: p.occasion,
        }));

        const systemPrompt = `You are FitVision AI, an expert high-fashion stylist and personal shopper for connected fashion brands.
The user wants an outfit recommendation based on their request: "${activePrompt}".
Provided optional user constraints:
- Occasion: ${occasion || 'Infer from prompt'}
- Season: ${season || 'Infer from prompt'}
- Style: ${style || 'Infer from prompt'}
- Preferred Colors: ${colors ? JSON.stringify(colors) : 'Infer from prompt'}
- Max Budget: ${maxBudget ? maxBudget + ' EGP' : 'Infer from prompt'}

Available Product Inventory:
${JSON.stringify(catalogBrief, null, 2)}

TASK:
1. Analyze the user request for occasion, season, style aesthetic, color palette, and budget constraints.
2. Select 3 to 4 complementary items from the Available Product Inventory that together form a complete, cohesive, fashionable look.
3. Return a valid JSON response ONLY (no markdown fences, just pure JSON) with this exact schema:
{
  "title": "Short catchy name for the outfit (e.g. 'University Summer Chic' or 'Black Tie Gala Silhouette')",
  "occasion": "University" | "Work" | "Party" | "Wedding" | "Dinner" | "Date" | "Casual" | "Travel" | "Sport",
  "season": "Spring" | "Summer" | "Autumn" | "Winter" | "All Season",
  "style": "Casual" | "Formal" | "Streetwear" | "Sporty" | "Elegant" | "Minimal" | "Vintage" | "Old Money" | "Resort",
  "matchScore": number (between 94 and 99),
  "reasoning": "2-3 concise, sophisticated sentences explaining why these specific pieces coordinate stylistically, tone-wise, and budget-wise.",
  "stylingTips": ["Tip 1 on tucking/cuffing", "Tip 2 on accessories/hair", "Tip 3 on footwear"],
  "colorPalette": [{"name": "Color Name", "hex": "#HEXCODE"}],
  "selectedProductIds": ["prod-X", "prod-Y", "prod-Z"]
}`;

        const response = await geminiAi.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: systemPrompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const rawText = response.text || '';
        const parsed = JSON.parse(rawText.trim());

        // Match selected products
        let items: Product[] = [];
        if (Array.isArray(parsed.selectedProductIds)) {
          items = parsed.selectedProductIds
            .map((pid: string) => productsDb.find((p) => p.id === pid))
            .filter(Boolean) as Product[];
        }

        if (items.length < 2) {
          // Fallback Heuristic if Gemini returned invalid product IDs
          const fallback = buildHeuristicOutfit(activePrompt, occasion, season, style, colors, maxBudget);
          items = fallback.items;
        }

        const totalCost = items.reduce((sum, item) => sum + item.price, 0);

        const recommendation: AiOutfitRecommendation = {
          id: 'outfit-' + Date.now(),
          title: parsed.title || 'Curated FitVision Look',
          prompt: activePrompt,
          occasion: parsed.occasion || occasion || 'Casual',
          season: parsed.season || season || 'Summer',
          style: parsed.style || style || 'Minimal',
          budget: maxBudget || totalCost + 300,
          totalCost,
          matchScore: parsed.matchScore || 98,
          reasoning: parsed.reasoning || 'Stylistically balanced ensemble curated by FitVision AI.',
          stylingTips: parsed.stylingTips || [
            'Pair with delicate gold or silver jewelry.',
            'Keep silhouette relaxed for effortless modern proportions.',
          ],
          colorPalette: parsed.colorPalette || [
            { name: 'Primary', hex: '#FFFFFF' },
            { name: 'Secondary', hex: '#D8C3A5' },
          ],
          items,
          createdDate: 'Just now',
          likesCount: Math.floor(Math.random() * 40) + 10,
        };

        return res.json({ success: true, outfit: recommendation });
      } catch (geminiError) {
        console.warn('Gemini API query failed or parsing error, falling back to heuristic engine:', geminiError);
      }
    }

    // Fallback to high quality deterministic fashion stylist engine
    const heuristicOutfit = buildHeuristicOutfit(activePrompt, occasion, season, style, colors, maxBudget);
    res.json({ success: true, outfit: heuristicOutfit });
  } catch (error: any) {
    console.error('Error in /api/ai/stylist:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. AI Complete My Outfit
app.post('/api/ai/complete-outfit', async (req, res) => {
  const { baseProductId } = req.body;
  const baseProduct = productsDb.find(p => p.id === baseProductId) || productsDb[0];

  try {
    let complementaryItems: Product[] = [];

    // Find complementary categories
    if (baseProduct.category === 'Tops' || baseProduct.category === 'Shirts' || baseProduct.category === 'T-Shirts') {
      const bottom = productsDb.find(p => p.category === 'Pants' || p.category === 'Jeans') || productsDb[1];
      const shoes = productsDb.find(p => p.category === 'Shoes') || productsDb[2];
      const bag = productsDb.find(p => p.category === 'Bags') || productsDb[3];
      const acc = productsDb.find(p => p.category === 'Accessories') || productsDb[7];
      complementaryItems = [baseProduct, bottom, shoes, bag, acc].filter(Boolean);
    } else if (baseProduct.category === 'Dresses') {
      const jacket = productsDb.find(p => p.category === 'Jackets') || productsDb[5];
      const shoes = productsDb.find(p => p.category === 'Shoes' && p.style === 'Elegant') || productsDb[6];
      const bag = productsDb.find(p => p.category === 'Bags') || productsDb[7];
      const jewelry = productsDb.find(p => p.id === 'prod-19') || productsDb[8];
      complementaryItems = [baseProduct, jacket, shoes, bag, jewelry].filter(Boolean);
    } else if (baseProduct.category === 'Pants' || baseProduct.category === 'Jeans') {
      const top = productsDb.find(p => p.category === 'Shirts' || p.category === 'T-Shirts') || productsDb[0];
      const shoes = productsDb.find(p => p.category === 'Shoes') || productsDb[2];
      const jacket = productsDb.find(p => p.category === 'Jackets') || productsDb[5];
      complementaryItems = [top, baseProduct, jacket, shoes].filter(Boolean);
    } else {
      complementaryItems = [
        productsDb[0],
        productsDb[1],
        productsDb[2],
        baseProduct,
      ].filter((item, idx, arr) => arr.findIndex(i => i.id === item.id) === idx);
    }

    const totalCost = complementaryItems.reduce((sum, item) => sum + item.price, 0);

    const completedLook: AiOutfitRecommendation = {
      id: 'look-' + Date.now(),
      title: `Complete Look for ${baseProduct.name}`,
      prompt: `Harmonious outfit centered around ${baseProduct.name}`,
      occasion: baseProduct.occasion[0] || 'Casual',
      season: baseProduct.season[0] || 'Summer',
      style: baseProduct.style,
      budget: totalCost + 200,
      totalCost,
      matchScore: 99,
      reasoning: `Selected to accentuate the ${baseProduct.material} and silhouette of the ${baseProduct.name}, pairing structured tones with seamless accessories.`,
      stylingTips: [
        'Coordinate the hardware accents across your bag and jewelry.',
        'Contrast the texture of the base garment with smooth leather and structured footwear.',
      ],
      colorPalette: [
        { name: 'Core Base', hex: baseProduct.colors[0]?.hex || '#FFFFFF' },
        { name: 'Complementary', hex: '#D8C3A5' },
        { name: 'Grounding Noir', hex: '#111111' },
      ],
      items: complementaryItems,
      createdDate: 'Just now',
      likesCount: 42,
    };

    res.json({ success: true, look: completedLook });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Products CRUD & Filtering
app.get('/api/products', (req, res) => {
  const { category, brand, style, search, minPrice, maxPrice, occasion, inStock } = req.query;

  let filtered = [...productsDb];

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === (category as string).toLowerCase());
  }

  if (brand && brand !== 'All') {
    filtered = filtered.filter(p => p.brandId === brand || p.brandName.toLowerCase() === (brand as string).toLowerCase());
  }

  if (style && style !== 'All') {
    filtered = filtered.filter(p => p.style.toLowerCase() === (style as string).toLowerCase());
  }

  if (occasion && occasion !== 'All') {
    filtered = filtered.filter(p => p.occasion.some(o => o.toLowerCase() === (occasion as string).toLowerCase()));
  }

  if (minPrice) {
    filtered = filtered.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= Number(maxPrice));
  }

  if (inStock === 'true') {
    filtered = filtered.filter(p => p.stockQuantity > 0);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, count: filtered.length, products: filtered });
});

// 5. Add Product (Brand Dashboard)
app.post('/api/products', (req, res) => {
  const newProduct: Product = {
    id: 'prod-' + (productsDb.length + 1),
    name: req.body.name || 'New Fashion Product',
    brandId: req.body.brandId || 'b1',
    brandName: req.body.brandName || 'Maison Noir',
    price: Number(req.body.price) || 450,
    originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : undefined,
    category: req.body.category || 'Tops',
    style: req.body.style || 'Minimal',
    occasion: req.body.occasion || ['Casual', 'University'],
    season: req.body.season || ['Summer', 'All Season'],
    gender: req.body.gender || 'Unisex',
    colors: req.body.colors || [{ name: 'Default', hex: '#111111', inStock: true }],
    sizes: req.body.sizes || ['S', 'M', 'L', 'XL'],
    images: {
      main: req.body.image || 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
    },
    description: req.body.description || 'Premium curated fashion item.',
    material: req.body.material || '100% Egyptian Cotton',
    rating: 5.0,
    reviewCount: 1,
    isAiRecommended: true,
    isTrending: true,
    stockQuantity: Number(req.body.stock) || 25,
    tags: [req.body.category, req.body.style, 'new arrival'].filter(Boolean),
  };

  productsDb.unshift(newProduct);
  res.json({ success: true, product: newProduct });
});

// 6. Delete Product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  productsDb = productsDb.filter(p => p.id !== id);
  res.json({ success: true, message: `Product ${id} deleted` });
});

// 7. Brands & Analytics
app.get('/api/brands', (req, res) => {
  res.json({ success: true, brands: brandsDb });
});

app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      ...INITIAL_BRAND_ANALYTICS,
      totalProducts: productsDb.length,
      ordersCount: ordersDb.length,
      recentAiQueries: aiQueryLogsDb.slice(0, 10),
    },
  });
});

// 8. Orders placement
app.post('/api/orders', (req, res) => {
  const { items, shippingAddress, paymentMethod, subtotal, discount, total } = req.body;

  const newOrder = {
    id: 'ord-' + Date.now(),
    orderNumber: 'FV-' + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: 'Processing',
    items: items || [],
    subtotal: subtotal || 0,
    discount: discount || 0,
    shipping: 0,
    total: total || 0,
    shippingAddress: shippingAddress || {
      fullName: 'Fashion Shopper',
      city: 'Cairo',
      street: 'Zamalek, 26th of July St',
    },
    paymentMethod: paymentMethod || 'Visa / Mastercard',
    estimatedDelivery: '2 - 3 Business Days',
  };

  ordersDb.unshift(newOrder);
  res.json({ success: true, order: newOrder });
});

// 9. Admin overview
app.get('/api/admin/overview', (req, res) => {
  res.json({
    success: true,
    data: {
      totalUsers: 14280,
      activeBrands: brandsDb.length,
      totalProducts: productsDb.length,
      totalOrders: ordersDb.length + 184,
      aiSearchesToday: 1420,
      systemHealth: '100% Operational',
      recentOrders: ordersDb.slice(0, 5),
    },
  });
});

// ----------------------------------------------------
// VITE MIDDLEWARE & SERVER START
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FitVision AI Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
