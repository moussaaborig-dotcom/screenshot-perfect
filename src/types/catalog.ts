/**
 * Domain types for the WIN catalog.
 * These mirror the shape future Supabase tables will expose, so the mock data
 * layer in src/data/mock can be swapped for real queries without touching UI.
 */

export type Lang = "ar" | "fr";

/** Interface-level text written by WIN (category names, labels, descriptions). */
export type LocalizedText = Record<Lang, string>;

export type Availability = "in_stock" | "low_stock" | "out_of_stock";

export type CategoryIcon =
  | "smartphone"
  | "basket"
  | "shirt"
  | "appliance"
  | "hammer"
  | "cake"
  | "book"
  | "sparkles"
  | "car";

export interface Category {
  id: string;
  slug: string;
  icon: CategoryIcon;
  name: LocalizedText;
  description: LocalizedText;
}

export interface OpeningHours {
  days: LocalizedText;
  /** e.g. "08:30 – 19:00", or null when closed */
  hours: string | null;
}

export interface Store {
  id: string;
  slug: string;
  /** Store name exactly as the owner writes it — never translated. */
  name: string;
  categoryId: string;
  description: LocalizedText;
  address: LocalizedText;
  /** Display phone, placeholder in this prototype. */
  phone: string;
  /** International format without "+" for wa.me links, placeholder in this prototype. */
  whatsapp: string;
  coverImage: string;
  /** Two-letter monogram used for the logo badge. */
  logoInitials: string;
  /** Logo tint, one of the design-system tones. */
  logoTone: "navy" | "green" | "slate" | "amber";
  openingHours: OpeningHours[];
  verified: boolean;
  joinedAt: string;
}

export interface ProductSpec {
  label: LocalizedText;
  value: string;
}

export interface Product {
  id: string;
  /** Product name exactly as the merchant writes it — never translated. */
  name: string;
  brand?: string | undefined;
  /** Model / variant reference. Different models are distinct products. */
  model?: string | undefined;
  categoryId: string;
  storeId: string;
  /** Price in Algerian dinars (DZD). */
  price: number;
  availability: Availability;
  images: string[];
  description: LocalizedText;
  specs: ProductSpec[];
  /** Extra search terms in both languages (e.g. "هاتف", "téléphone"). */
  keywords: string[];
  createdAt: string;
}
