import type { OpeningHours, Store } from "@/types/catalog";

import mobileShop from "@/assets/stores/mobile-shop.jpg";
import grocery from "@/assets/stores/grocery.jpg";
import boutique from "@/assets/stores/boutique.jpg";
import appliances from "@/assets/stores/appliances.jpg";
import hardware from "@/assets/stores/hardware.jpg";
import pastry from "@/assets/stores/pastry.jpg";
import bookshop from "@/assets/stores/bookshop.jpg";
import perfumery from "@/assets/stores/perfumery.jpg";

/**
 * SAMPLE DATA — fictional stores for the prototype. Names, phone numbers and
 * addresses are illustrative placeholders, not real businesses.
 * Replace with a Supabase `stores` table.
 */

const weekHours = (open: string, friday: string | null = null): OpeningHours[] => [
  { days: { ar: "السبت – الخميس", fr: "Samedi – Jeudi" }, hours: open },
  { days: { ar: "الجمعة", fr: "Vendredi" }, hours: friday },
];

export const mockStores: Store[] = [
  {
    id: "st-1",
    slug: "mezghiche-mobile",
    name: "Mezghiche Mobile",
    categoryId: "cat-electronics",
    description: {
      ar: "هواتف ذكية جديدة، إكسسوارات وخدمة تركيب الحماية. نعرض كل موديل بسعته ومواصفاته بدقة.",
      fr: "Smartphones neufs, accessoires et pose de protections. Chaque modèle est affiché avec sa capacité et ses caractéristiques exactes.",
    },
    address: {
      ar: "شارع الاستقلال، وسط المدينة، سيدي مزغيش",
      fr: "Rue de l'Indépendance, centre-ville, Sidi Mezghiche",
    },
    phone: "+213 555 00 00 01",
    whatsapp: "213555000001",
    coverImage: mobileShop,
    logoInitials: "MM",
    logoTone: "navy",
    openingHours: weekHours("09:00 – 20:00", "15:00 – 20:00"),
    verified: true,
    joinedAt: "2026-09-02",
  },
  {
    id: "st-2",
    slug: "superette-el-baraka",
    name: "Supérette El Baraka",
    categoryId: "cat-groceries",
    description: {
      ar: "سوبيرات الحي: مواد غذائية أساسية، حليب ومشتقاته، ومنتجات التنظيف.",
      fr: "La supérette du quartier : produits de base, laitages et produits d'entretien.",
    },
    address: { ar: "حي 500 مسكن، سيدي مزغيش", fr: "Cité 500 Logements, Sidi Mezghiche" },
    phone: "+213 555 00 00 02",
    whatsapp: "213555000002",
    coverImage: grocery,
    logoInitials: "EB",
    logoTone: "green",
    openingHours: weekHours("07:00 – 22:00", "07:00 – 12:30"),
    verified: true,
    joinedAt: "2026-09-10",
  },
  {
    id: "st-3",
    slug: "boutique-lina-mode",
    name: "Boutique Lina Mode",
    categoryId: "cat-clothing",
    description: {
      ar: "ملابس نسائية ورجالية وللأطفال، تشكيلة جديدة كل موسم.",
      fr: "Prêt-à-porter femme, homme et enfant, nouvelle collection chaque saison.",
    },
    address: { ar: "شارع أول نوفمبر، سيدي مزغيش", fr: "Rue du 1er Novembre, Sidi Mezghiche" },
    phone: "+213 555 00 00 03",
    whatsapp: "213555000003",
    coverImage: boutique,
    logoInitials: "LM",
    logoTone: "amber",
    openingHours: weekHours("09:30 – 19:30"),
    verified: false,
    joinedAt: "2026-10-01",
  },
  {
    id: "st-4",
    slug: "electro-saadi",
    name: "Électro Saâdi",
    categoryId: "cat-appliances",
    description: {
      ar: "أجهزة كهرومنزلية لعلامات جزائرية وعالمية، مع ضمان المصنع.",
      fr: "Électroménager de marques algériennes et internationales, avec garantie fabricant.",
    },
    address: {
      ar: "الطريق الوطني رقم 3، مدخل المدينة، سيدي مزغيش",
      fr: "RN 3, entrée de ville, Sidi Mezghiche",
    },
    phone: "+213 555 00 00 04",
    whatsapp: "213555000004",
    coverImage: appliances,
    logoInitials: "ES",
    logoTone: "navy",
    openingHours: weekHours("08:30 – 19:00"),
    verified: true,
    joinedAt: "2026-08-21",
  },
  {
    id: "st-5",
    slug: "quincaillerie-ben-amor",
    name: "Quincaillerie Ben Amor",
    categoryId: "cat-hardware",
    description: {
      ar: "مواد البناء، الدهانات، الأدوات الكهربائية وكل ما يحتاجه الحرفيون.",
      fr: "Matériaux de construction, peinture, outillage électrique et tout pour les artisans.",
    },
    address: { ar: "المنطقة الحرفية، سيدي مزغيش", fr: "Zone d'activités, Sidi Mezghiche" },
    phone: "+213 555 00 00 05",
    whatsapp: "213555000005",
    coverImage: hardware,
    logoInitials: "BA",
    logoTone: "slate",
    openingHours: weekHours("07:30 – 18:00", "07:30 – 12:00"),
    verified: true,
    joinedAt: "2026-09-15",
  },
  {
    id: "st-6",
    slug: "patisserie-les-delices",
    name: "Pâtisserie Les Délices",
    categoryId: "cat-bakery",
    description: {
      ar: "حلويات تقليدية جزائرية وكعك المناسبات حسب الطلب.",
      fr: "Gâteaux traditionnels algériens et pièces montées sur commande.",
    },
    address: { ar: "ساحة السوق، سيدي مزغيش", fr: "Place du marché, Sidi Mezghiche" },
    phone: "+213 555 00 00 06",
    whatsapp: "213555000006",
    coverImage: pastry,
    logoInitials: "LD",
    logoTone: "amber",
    openingHours: weekHours("06:30 – 21:00", "06:30 – 13:00"),
    verified: false,
    joinedAt: "2026-10-12",
  },
  {
    id: "st-7",
    slug: "maktabat-ennadjah",
    name: "مكتبة النجاح",
    categoryId: "cat-stationery",
    description: {
      ar: "أدوات مدرسية، كتب شبه مدرسية، طباعة ونسخ.",
      fr: "Fournitures scolaires, livres parascolaires, impression et photocopie.",
    },
    address: { ar: "قرب ثانوية المدينة، سيدي مزغيش", fr: "Près du lycée, Sidi Mezghiche" },
    phone: "+213 555 00 00 07",
    whatsapp: "213555000007",
    coverImage: bookshop,
    logoInitials: "ن",
    logoTone: "green",
    openingHours: weekHours("08:00 – 18:30"),
    verified: true,
    joinedAt: "2026-09-28",
  },
  {
    id: "st-8",
    slug: "parfumerie-yasmine",
    name: "Parfumerie Yasmine",
    categoryId: "cat-beauty",
    description: {
      ar: "عطور، منتجات العناية بالبشرة ومستحضرات التجميل.",
      fr: "Parfums, soins de la peau et maquillage.",
    },
    address: { ar: "شارع الاستقلال، سيدي مزغيش", fr: "Rue de l'Indépendance, Sidi Mezghiche" },
    phone: "+213 555 00 00 08",
    whatsapp: "213555000008",
    coverImage: perfumery,
    logoInitials: "PY",
    logoTone: "slate",
    openingHours: weekHours("09:00 – 19:30", "16:00 – 20:00"),
    verified: false,
    joinedAt: "2026-10-20",
  },
];
