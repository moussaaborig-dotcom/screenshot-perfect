import type { Category } from "@/types/catalog";

/** SAMPLE DATA — replace with a Supabase `categories` table. */
export const mockCategories: Category[] = [
  {
    id: "cat-electronics",
    slug: "electronics",
    icon: "smartphone",
    name: { ar: "هواتف وإلكترونيات", fr: "Téléphonie & électronique" },
    description: {
      ar: "هواتف ذكية، سماعات، شواحن وإكسسوارات من محلات سيدي مزغيش.",
      fr: "Smartphones, écouteurs, chargeurs et accessoires chez les boutiques de Sidi Mezghiche.",
    },
  },
  {
    id: "cat-groceries",
    slug: "groceries",
    icon: "basket",
    name: { ar: "مواد غذائية", fr: "Alimentation" },
    description: {
      ar: "مواد غذائية أساسية ومنتجات يومية من السوبيرات والمحلات القريبة.",
      fr: "Produits de base et courses du quotidien dans les supérettes du quartier.",
    },
  },
  {
    id: "cat-clothing",
    slug: "clothing",
    icon: "shirt",
    name: { ar: "ملابس", fr: "Vêtements" },
    description: {
      ar: "ملابس رجالية، نسائية وللأطفال من بوتيكات المدينة.",
      fr: "Mode homme, femme et enfant dans les boutiques de la ville.",
    },
  },
  {
    id: "cat-appliances",
    slug: "home-appliances",
    icon: "appliance",
    name: { ar: "أجهزة كهرومنزلية", fr: "Électroménager" },
    description: {
      ar: "ثلاجات، غسالات، مكيفات وأجهزة منزلية أخرى.",
      fr: "Réfrigérateurs, machines à laver, climatiseurs et autres appareils.",
    },
  },
  {
    id: "cat-hardware",
    slug: "hardware",
    icon: "hammer",
    name: { ar: "مواد البناء والعتاد", fr: "Quincaillerie & BTP" },
    description: {
      ar: "إسمنت، دهانات، أدوات كهربائية وعتاد البناء.",
      fr: "Ciment, peinture, outillage électrique et matériaux de construction.",
    },
  },
  {
    id: "cat-bakery",
    slug: "bakery",
    icon: "cake",
    name: { ar: "حلويات ومخابز", fr: "Pâtisserie & boulangerie" },
    description: {
      ar: "حلويات تقليدية، كعك المناسبات ومخبوزات يومية.",
      fr: "Gâteaux traditionnels, pièces pour fêtes et viennoiseries du jour.",
    },
  },
  {
    id: "cat-stationery",
    slug: "stationery",
    icon: "book",
    name: { ar: "مكتبات وأدوات مدرسية", fr: "Librairie & papeterie" },
    description: {
      ar: "أدوات مدرسية، كراريس، محافظ ولوازم المكتب.",
      fr: "Fournitures scolaires, cahiers, cartables et papeterie de bureau.",
    },
  },
  {
    id: "cat-beauty",
    slug: "beauty",
    icon: "sparkles",
    name: { ar: "عطور وتجميل", fr: "Parfumerie & beauté" },
    description: {
      ar: "عطور، منتجات العناية بالبشرة ومستحضرات التجميل.",
      fr: "Parfums, soins de la peau et cosmétiques.",
    },
  },
  {
    id: "cat-auto",
    slug: "auto-parts",
    icon: "car",
    name: { ar: "قطع غيار السيارات", fr: "Pièces auto" },
    description: {
      ar: "قطع غيار، زيوت المحرك وإكسسوارات السيارات.",
      fr: "Pièces détachées, huiles moteur et accessoires auto.",
    },
  },
];
