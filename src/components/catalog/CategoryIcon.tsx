import {
  BookOpen,
  CakeSlice,
  Car,
  Hammer,
  Refrigerator,
  Shirt,
  ShoppingBasket,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type { CategoryIcon as CategoryIconName } from "@/types/catalog";

const ICONS: Record<CategoryIconName, LucideIcon> = {
  smartphone: Smartphone,
  basket: ShoppingBasket,
  shirt: Shirt,
  appliance: Refrigerator,
  hammer: Hammer,
  cake: CakeSlice,
  book: BookOpen,
  sparkles: Sparkles,
  car: Car,
};

export function CategoryIcon({ name, className }: { name: CategoryIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}
