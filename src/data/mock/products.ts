import type { Product, ProductSpec } from "@/types/catalog";

import phoneA15 from "@/assets/products/phone-a15.jpg";
import phoneRedmi from "@/assets/products/phone-redmi.jpg";
import headphones from "@/assets/products/headphones.jpg";
import charger from "@/assets/products/charger.jpg";
import oil from "@/assets/products/oil.jpg";
import semolina from "@/assets/products/semolina.jpg";
import coffee from "@/assets/products/coffee.jpg";
import milk from "@/assets/products/milk.jpg";
import dress from "@/assets/products/dress.jpg";
import jeans from "@/assets/products/jeans.jpg";
import kidsJacket from "@/assets/products/kids-jacket.jpg";
import fridge from "@/assets/products/fridge.jpg";
import washer from "@/assets/products/washer.jpg";
import airConditioner from "@/assets/products/air-conditioner.jpg";
import cement from "@/assets/products/cement.jpg";
import drill from "@/assets/products/drill.jpg";
import paint from "@/assets/products/paint.jpg";
import cake from "@/assets/products/cake.jpg";
import baklawa from "@/assets/products/baklawa.jpg";
import backpack from "@/assets/products/backpack.jpg";
import notebooks from "@/assets/products/notebooks.jpg";
import perfume from "@/assets/products/perfume.jpg";
import cream from "@/assets/products/cream.jpg";

/**
 * SAMPLE DATA — illustrative products and prices for the prototype.
 * Replace with a Supabase `products` table.
 */

const spec = (ar: string, fr: string, value: string): ProductSpec => ({
  label: { ar, fr },
  value,
});

const PHONE_KW = ["هاتف", "هواتف", "تلفون", "smartphone", "téléphone", "portable", "mobile"];
const AC_KW = ["مكيف", "كليماتيزور", "climatiseur", "clim", "climatisation"];

export const mockProducts: Product[] = [
  // ——— Mezghiche Mobile ———
  {
    id: "p-a15-128",
    name: "Samsung Galaxy A15 — 4 Go / 128 Go",
    brand: "Samsung",
    model: "SM-A155F · 4/128",
    categoryId: "cat-electronics",
    storeId: "st-1",
    price: 34500,
    availability: "in_stock",
    images: [phoneA15],
    description: {
      ar: "هاتف Galaxy A15 بشاشة 6.5 بوصة وبطارية 5000 mAh. نسخة 4 جيغا رام و128 جيغا تخزين.",
      fr: "Galaxy A15 avec écran 6,5\" et batterie 5000 mAh. Version 4 Go de RAM et 128 Go de stockage.",
    },
    specs: [
      spec("الذاكرة العشوائية", "RAM", "4 Go"),
      spec("التخزين", "Stockage", "128 Go"),
      spec("الشاشة", "Écran", "6,5\" Super AMOLED"),
      spec("البطارية", "Batterie", "5000 mAh"),
      spec("اللون", "Couleur", "Bleu nuit"),
      spec("الضمان", "Garantie", "12 mois"),
    ],
    keywords: [...PHONE_KW, "galaxy", "a15", "128"],
    createdAt: "2026-11-03",
  },
  {
    id: "p-a15-256",
    name: "Samsung Galaxy A15 — 6 Go / 256 Go",
    brand: "Samsung",
    model: "SM-A155F · 6/256",
    categoryId: "cat-electronics",
    storeId: "st-1",
    price: 41900,
    availability: "low_stock",
    images: [phoneA15],
    description: {
      ar: "نفس هاتف Galaxy A15 لكن بذاكرة أكبر: 6 جيغا رام و256 جيغا تخزين. موديل مختلف عن نسخة 128 جيغا.",
      fr: "Même Galaxy A15 mais avec plus de mémoire : 6 Go de RAM et 256 Go. Modèle distinct de la version 128 Go.",
    },
    specs: [
      spec("الذاكرة العشوائية", "RAM", "6 Go"),
      spec("التخزين", "Stockage", "256 Go"),
      spec("الشاشة", "Écran", "6,5\" Super AMOLED"),
      spec("البطارية", "Batterie", "5000 mAh"),
      spec("اللون", "Couleur", "Bleu nuit"),
      spec("الضمان", "Garantie", "12 mois"),
    ],
    keywords: [...PHONE_KW, "galaxy", "a15", "256"],
    createdAt: "2026-11-03",
  },
  {
    id: "p-redmi-note13",
    name: "Xiaomi Redmi Note 13 — 8 Go / 256 Go",
    brand: "Xiaomi",
    model: "23129RAA4G · 8/256",
    categoryId: "cat-electronics",
    storeId: "st-1",
    price: 47000,
    availability: "in_stock",
    images: [phoneRedmi],
    description: {
      ar: "Redmi Note 13 بكاميرا 108 ميغابكسل وشحن سريع 33 واط.",
      fr: "Redmi Note 13 avec caméra 108 MP et charge rapide 33 W.",
    },
    specs: [
      spec("الذاكرة العشوائية", "RAM", "8 Go"),
      spec("التخزين", "Stockage", "256 Go"),
      spec("الكاميرا", "Caméra", "108 MP"),
      spec("الشحن", "Charge", "33 W"),
      spec("اللون", "Couleur", "Graphite"),
    ],
    keywords: [...PHONE_KW, "redmi", "note 13", "xiaomi"],
    createdAt: "2026-10-30",
  },
  {
    id: "p-headphones",
    name: "Casque Bluetooth JBL Tune 520BT",
    brand: "JBL",
    model: "Tune 520BT",
    categoryId: "cat-electronics",
    storeId: "st-1",
    price: 8900,
    availability: "in_stock",
    images: [headphones],
    description: {
      ar: "سماعة رأس لاسلكية بعمر بطارية يصل إلى 57 ساعة.",
      fr: "Casque sans fil, jusqu'à 57 h d'autonomie.",
    },
    specs: [
      spec("الاتصال", "Connexion", "Bluetooth 5.3"),
      spec("البطارية", "Autonomie", "57 h"),
      spec("اللون", "Couleur", "Noir"),
    ],
    keywords: ["سماعة", "سماعات", "casque", "écouteurs", "bluetooth"],
    createdAt: "2026-10-22",
  },
  {
    id: "p-charger-25w",
    name: "Chargeur rapide USB-C 25W + câble",
    brand: "Samsung",
    model: "EP-T2510",
    categoryId: "cat-electronics",
    storeId: "st-1",
    price: 2800,
    availability: "out_of_stock",
    images: [charger],
    description: {
      ar: "شاحن سريع 25 واط مع كابل USB-C.",
      fr: "Chargeur rapide 25 W avec câble USB-C.",
    },
    specs: [spec("القدرة", "Puissance", "25 W"), spec("المنفذ", "Port", "USB-C")],
    keywords: ["شاحن", "chargeur", "cable", "كابل"],
    createdAt: "2026-10-15",
  },

  // ——— Supérette El Baraka ———
  {
    id: "p-oil-5l",
    name: "Huile de tournesol 5 L",
    categoryId: "cat-groceries",
    storeId: "st-2",
    price: 700,
    availability: "in_stock",
    images: [oil],
    description: { ar: "زيت المائدة، قارورة 5 لتر.", fr: "Huile de table, bidon de 5 litres." },
    specs: [spec("الحجم", "Contenance", "5 L")],
    keywords: ["زيت", "زيت المائدة", "huile"],
    createdAt: "2026-11-02",
  },
  {
    id: "p-semolina-10kg",
    name: "Semoule moyenne 10 kg",
    categoryId: "cat-groceries",
    storeId: "st-2",
    price: 1100,
    availability: "low_stock",
    images: [semolina],
    description: { ar: "سميد متوسط، كيس 10 كلغ.", fr: "Semoule moyenne de blé dur, sac de 10 kg." },
    specs: [spec("الوزن", "Poids", "10 kg"), spec("النوع", "Type", "Moyenne")],
    keywords: ["سميد", "semoule", "دقيق"],
    createdAt: "2026-10-28",
  },
  {
    id: "p-coffee-250",
    name: "Café moulu 250 g",
    categoryId: "cat-groceries",
    storeId: "st-2",
    price: 330,
    availability: "in_stock",
    images: [coffee],
    description: { ar: "قهوة مطحونة، علبة 250 غ.", fr: "Café moulu, paquet de 250 g." },
    specs: [spec("الوزن", "Poids", "250 g")],
    keywords: ["قهوة", "café"],
    createdAt: "2026-10-18",
  },
  {
    id: "p-milk-1l",
    name: "Lait UHT entier 1 L",
    categoryId: "cat-groceries",
    storeId: "st-2",
    price: 140,
    availability: "in_stock",
    images: [milk],
    description: { ar: "حليب كامل الدسم، علبة 1 لتر.", fr: "Lait entier UHT, brique de 1 litre." },
    specs: [spec("الحجم", "Contenance", "1 L")],
    keywords: ["حليب", "lait"],
    createdAt: "2026-10-12",
  },

  // ——— Boutique Lina Mode ———
  {
    id: "p-linen-dress",
    name: "Robe longue en lin",
    categoryId: "cat-clothing",
    storeId: "st-3",
    price: 4500,
    availability: "in_stock",
    images: [dress],
    description: {
      ar: "فستان صيفي طويل من الكتان، متوفر بعدة مقاسات.",
      fr: "Robe d'été longue en lin, plusieurs tailles disponibles.",
    },
    specs: [
      spec("المقاسات", "Tailles", "S · M · L · XL"),
      spec("القماش", "Matière", "Lin"),
      spec("اللون", "Couleur", "Beige"),
    ],
    keywords: ["فستان", "روبة", "robe", "femme", "نساء"],
    createdAt: "2026-11-04",
  },
  {
    id: "p-jeans-slim",
    name: "Jean homme coupe slim",
    categoryId: "cat-clothing",
    storeId: "st-3",
    price: 3800,
    availability: "in_stock",
    images: [jeans],
    description: { ar: "سروال جينز رجالي بقصة ضيقة.", fr: "Jean homme coupe slim, denim brut." },
    specs: [spec("المقاسات", "Tailles", "38 – 46"), spec("اللون", "Couleur", "Indigo")],
    keywords: ["جينز", "سروال", "jean", "pantalon", "homme"],
    createdAt: "2026-10-25",
  },
  {
    id: "p-kids-jacket",
    name: "Veste en jean enfant",
    categoryId: "cat-clothing",
    storeId: "st-3",
    price: 2900,
    availability: "low_stock",
    images: [kidsJacket],
    description: { ar: "سترة جينز للأطفال من 2 إلى 6 سنوات.", fr: "Veste en jean pour enfants de 2 à 6 ans." },
    specs: [spec("العمر", "Âge", "2 – 6 ans")],
    keywords: ["أطفال", "سترة", "veste", "enfant"],
    createdAt: "2026-10-09",
  },

  // ——— Électro Saâdi ———
  {
    id: "p-fridge-520",
    name: "Réfrigérateur side-by-side 520 L Inox",
    brand: "Condor",
    model: "CRF-SBS520",
    categoryId: "cat-appliances",
    storeId: "st-4",
    price: 189000,
    availability: "in_stock",
    images: [fridge],
    description: {
      ar: "ثلاجة بابين جنباً إلى جنب، سعة 520 لتر، تقنية No Frost.",
      fr: "Réfrigérateur américain 520 L, technologie No Frost.",
    },
    specs: [
      spec("السعة", "Capacité", "520 L"),
      spec("التقنية", "Technologie", "No Frost"),
      spec("فئة الطاقة", "Classe énergétique", "A+"),
      spec("الضمان", "Garantie", "24 mois"),
    ],
    keywords: ["ثلاجة", "فريجيدار", "réfrigérateur", "frigo"],
    createdAt: "2026-10-27",
  },
  {
    id: "p-washer-7kg",
    name: "Machine à laver frontale 7 kg",
    brand: "Iris",
    model: "IWM-F7120",
    categoryId: "cat-appliances",
    storeId: "st-4",
    price: 62000,
    availability: "in_stock",
    images: [washer],
    description: { ar: "غسالة أمامية 7 كلغ، 1200 دورة في الدقيقة.", fr: "Lave-linge frontal 7 kg, 1200 tr/min." },
    specs: [
      spec("السعة", "Capacité", "7 kg"),
      spec("سرعة العصر", "Essorage", "1200 tr/min"),
      spec("الضمان", "Garantie", "24 mois"),
    ],
    keywords: ["غسالة", "machine à laver", "lave-linge"],
    createdAt: "2026-10-20",
  },
  {
    id: "p-ac-12000",
    name: "Climatiseur split 12 000 BTU",
    brand: "Condor",
    model: "CS12-INV",
    categoryId: "cat-appliances",
    storeId: "st-4",
    price: 58500,
    availability: "in_stock",
    images: [airConditioner],
    description: {
      ar: "مكيف هواء 12000 وحدة حرارية بتقنية Inverter، مناسب لغرفة حتى 20 م².",
      fr: "Climatiseur Inverter 12 000 BTU, adapté aux pièces jusqu'à 20 m².",
    },
    specs: [
      spec("القدرة", "Puissance", "12 000 BTU"),
      spec("المساحة", "Surface", "≤ 20 m²"),
      spec("التقنية", "Technologie", "Inverter"),
    ],
    keywords: [...AC_KW, "12000"],
    createdAt: "2026-10-14",
  },
  {
    id: "p-ac-18000",
    name: "Climatiseur split 18 000 BTU",
    brand: "Condor",
    model: "CS18-INV",
    categoryId: "cat-appliances",
    storeId: "st-4",
    price: 79000,
    availability: "low_stock",
    images: [airConditioner],
    description: {
      ar: "مكيف هواء 18000 وحدة حرارية، لغرفة حتى 35 م². موديل مختلف عن 12000.",
      fr: "Climatiseur 18 000 BTU pour pièces jusqu'à 35 m². Modèle distinct du 12 000 BTU.",
    },
    specs: [
      spec("القدرة", "Puissance", "18 000 BTU"),
      spec("المساحة", "Surface", "≤ 35 m²"),
      spec("التقنية", "Technologie", "Inverter"),
    ],
    keywords: [...AC_KW, "18000"],
    createdAt: "2026-10-14",
  },

  // ——— Quincaillerie Ben Amor ———
  {
    id: "p-cement-50",
    name: "Ciment CPJ 42.5 — sac 50 kg",
    categoryId: "cat-hardware",
    storeId: "st-5",
    price: 900,
    availability: "in_stock",
    images: [cement],
    description: { ar: "إسمنت للبناء، كيس 50 كلغ.", fr: "Ciment pour maçonnerie, sac de 50 kg." },
    specs: [spec("الوزن", "Poids", "50 kg"), spec("الصنف", "Classe", "CPJ 42.5")],
    keywords: ["إسمنت", "سيمان", "ciment"],
    createdAt: "2026-11-01",
  },
  {
    id: "p-drill-650",
    name: "Perceuse à percussion 650 W",
    model: "PP-650",
    categoryId: "cat-hardware",
    storeId: "st-5",
    price: 11500,
    availability: "in_stock",
    images: [drill],
    description: { ar: "مثقاب كهربائي بالطرق 650 واط مع مقبض جانبي.", fr: "Perceuse à percussion 650 W avec poignée latérale." },
    specs: [spec("القدرة", "Puissance", "650 W"), spec("الفك", "Mandrin", "13 mm")],
    keywords: ["مثقاب", "بيرسوز", "perceuse", "outil"],
    createdAt: "2026-10-19",
  },
  {
    id: "p-paint-25",
    name: "Peinture vinylique blanche 25 kg",
    categoryId: "cat-hardware",
    storeId: "st-5",
    price: 4200,
    availability: "low_stock",
    images: [paint],
    description: { ar: "دهان أبيض للجدران الداخلية، دلو 25 كلغ.", fr: "Peinture blanche pour murs intérieurs, seau de 25 kg." },
    specs: [spec("الوزن", "Poids", "25 kg"), spec("الاستعمال", "Usage", "Intérieur")],
    keywords: ["دهان", "صباغة", "peinture"],
    createdAt: "2026-10-05",
  },

  // ——— Pâtisserie Les Délices ———
  {
    id: "p-cake-fraise",
    name: "Gâteau d'anniversaire fraise — 1 kg",
    categoryId: "cat-bakery",
    storeId: "st-6",
    price: 2800,
    availability: "in_stock",
    images: [cake],
    description: {
      ar: "كعكة عيد ميلاد بالكريمة والفراولة، يرجى الطلب قبل 24 ساعة.",
      fr: "Gâteau crème et fraises, à commander 24 h à l'avance.",
    },
    specs: [spec("الوزن", "Poids", "1 kg"), spec("المدة", "Délai", "24 h")],
    keywords: ["كعكة", "قاطو", "gâteau", "anniversaire"],
    createdAt: "2026-11-04",
  },
  {
    id: "p-baklawa-box",
    name: "Boîte baklawa & makrout — 1 kg",
    categoryId: "cat-bakery",
    storeId: "st-6",
    price: 3500,
    availability: "in_stock",
    images: [baklawa],
    description: {
      ar: "تشكيلة حلويات تقليدية: بقلاوة باللوز ومقروط.",
      fr: "Assortiment traditionnel : baklawa aux amandes et makrout.",
    },
    specs: [spec("الوزن", "Poids", "1 kg")],
    keywords: ["بقلاوة", "مقروط", "حلويات", "baklawa", "makrout"],
    createdAt: "2026-10-31",
  },

  // ——— مكتبة النجاح ———
  {
    id: "p-backpack",
    name: "Cartable scolaire primaire",
    categoryId: "cat-stationery",
    storeId: "st-7",
    price: 2600,
    availability: "in_stock",
    images: [backpack],
    description: { ar: "محفظة مدرسية للطور الابتدائي.", fr: "Cartable pour l'école primaire." },
    specs: [spec("السعة", "Volume", "18 L")],
    keywords: ["محفظة", "cartable", "sac"],
    createdAt: "2026-10-26",
  },
  {
    id: "p-notebooks-10",
    name: "Lot de 10 cahiers 96 pages",
    categoryId: "cat-stationery",
    storeId: "st-7",
    price: 750,
    availability: "in_stock",
    images: [notebooks],
    description: { ar: "10 كراريس من 96 صفحة بألوان مختلفة.", fr: "10 cahiers de 96 pages, couleurs assorties." },
    specs: [spec("العدد", "Quantité", "10"), spec("الصفحات", "Pages", "96")],
    keywords: ["كراريس", "كراس", "cahier", "cahiers"],
    createdAt: "2026-10-08",
  },

  // ——— Parfumerie Yasmine ———
  {
    id: "p-perfume-100",
    name: "Eau de parfum ambrée 100 ml",
    categoryId: "cat-beauty",
    storeId: "st-8",
    price: 6500,
    availability: "in_stock",
    images: [perfume],
    description: { ar: "عطر بنفحات العنبر، 100 مل.", fr: "Eau de parfum aux notes ambrées, 100 ml." },
    specs: [spec("الحجم", "Contenance", "100 ml")],
    keywords: ["عطر", "parfum"],
    createdAt: "2026-10-29",
  },
  {
    id: "p-cream-200",
    name: "Crème hydratante corps 200 ml",
    categoryId: "cat-beauty",
    storeId: "st-8",
    price: 850,
    availability: "out_of_stock",
    images: [cream],
    description: { ar: "كريم مرطب للجسم، علبة 200 مل.", fr: "Crème hydratante pour le corps, pot de 200 ml." },
    specs: [spec("الحجم", "Contenance", "200 ml")],
    keywords: ["كريم", "crème", "soin"],
    createdAt: "2026-10-11",
  },
];
