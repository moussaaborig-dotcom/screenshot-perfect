/**
 * Catalog repository. UI code reads data ONLY through these functions, so the
 * mock arrays can later be swapped for Supabase queries in one place.
 */
import { mockCategories } from "@/data/mock/categories";
import { mockProducts } from "@/data/mock/products";
import { mockStores } from "@/data/mock/stores";
import type { Category, Product, Store } from "@/types/catalog";
import { scoreMatch } from "./text-search";

export function getCategories(): Category[] {
  return mockCategories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return mockCategories.find((c) => c.id === id);
}

export function getStores(): Store[] {
  return mockStores;
}

export function getStoreBySlug(slug: string): Store | undefined {
  return mockStores.find((s) => s.slug === slug);
}

export function getStoreById(id: string): Store | undefined {
  return mockStores.find((s) => s.id === id);
}

export function getStoresByCategory(categoryId: string): Store[] {
  return mockStores.filter((s) => s.categoryId === categoryId);
}

export function getFeaturedStores(limit = 4): Store[] {
  return mockStores.filter((s) => s.verified).slice(0, limit);
}

export function getProducts(): Product[] {
  return mockProducts;
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getProductsByStore(storeId: string): Product[] {
  return mockProducts.filter((p) => p.storeId === storeId);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return mockProducts.filter((p) => p.categoryId === categoryId);
}

export function getLatestProducts(limit = 8): Product[] {
  return [...mockProducts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export function countProductsByStore(storeId: string): number {
  return mockProducts.filter((p) => p.storeId === storeId).length;
}

export function countStoresByCategory(categoryId: string): number {
  return mockStores.filter((s) => s.categoryId === categoryId).length;
}

// ——— Search ———

export type SortOption = "relevance" | "price_asc" | "price_desc";

export interface SearchFilters {
  q?: string;
  category?: string; // category slug
  store?: string; // store slug
  min?: number;
  max?: number;
  sort?: SortOption;
}

function productScore(product: Product, q: string): number {
  const store = getStoreById(product.storeId);
  const category = getCategoryById(product.categoryId);
  return scoreMatch(q, [
    { text: product.name, weight: 4 },
    { text: product.brand ?? "", weight: 3 },
    { text: product.model ?? "", weight: 3 },
    { text: product.keywords.join(" "), weight: 2 },
    { text: category ? `${category.name.ar} ${category.name.fr}` : "", weight: 1 },
    { text: store?.name ?? "", weight: 1 },
  ]);
}

/**
 * Each product is its own result: products that differ in model or specs are
 * never merged or deduplicated, even when names look alike.
 */
export function searchProducts(filters: SearchFilters): Product[] {
  const q = filters.q?.trim() ?? "";
  const category = filters.category ? getCategoryBySlug(filters.category) : undefined;
  const store = filters.store ? getStoreBySlug(filters.store) : undefined;

  let results = mockProducts
    .map((p) => ({ p, score: q ? productScore(p, q) : 1 }))
    .filter(({ p, score }) => {
      if (score <= 0) return false;
      if (category && p.categoryId !== category.id) return false;
      if (store && p.storeId !== store.id) return false;
      if (filters.min != null && p.price < filters.min) return false;
      if (filters.max != null && p.price > filters.max) return false;
      return true;
    });

  const sort = filters.sort ?? "relevance";
  if (sort === "price_asc") results = results.sort((a, b) => a.p.price - b.p.price);
  else if (sort === "price_desc") results = results.sort((a, b) => b.p.price - a.p.price);
  else if (q) results = results.sort((a, b) => b.score - a.score);

  return results.map((r) => r.p);
}

export function searchStores(q: string): Store[] {
  if (!q.trim()) return [];
  return mockStores
    .map((s) => {
      const category = getCategoryById(s.categoryId);
      return {
        s,
        score: scoreMatch(q, [
          { text: s.name, weight: 4 },
          { text: category ? `${category.name.ar} ${category.name.fr}` : "", weight: 2 },
          { text: `${s.description.ar} ${s.description.fr}`, weight: 1 },
        ]),
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.s);
}

export function searchCategories(q: string): Category[] {
  if (!q.trim()) return [];
  return mockCategories.filter(
    (c) => scoreMatch(q, [{ text: `${c.name.ar} ${c.name.fr} ${c.slug}`, weight: 1 }]) > 0,
  );
}

export interface Suggestions {
  products: Product[];
  stores: Store[];
  categories: Category[];
}

export function getSuggestions(q: string): Suggestions {
  if (!q.trim()) return { products: [], stores: [], categories: [] };
  return {
    products: searchProducts({ q }).slice(0, 5),
    stores: searchStores(q).slice(0, 3),
    categories: searchCategories(q).slice(0, 3),
  };
}

export const POPULAR_SEARCHES = ["Galaxy A15", "Climatiseur", "سميد", "Baklawa", "مثقاب"];
