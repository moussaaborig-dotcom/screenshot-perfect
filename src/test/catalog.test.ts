import { describe, expect, it } from "vitest";

import { validateNewProduct } from "@/components/dashboard/AddProductForm";
import { getSuggestions, searchProducts } from "@/lib/catalog";
import { normalizeText } from "@/lib/text-search";

describe("catalog search", () => {
  it("keeps different models of the same phone as separate results", () => {
    const ids = searchProducts({ q: "Galaxy A15" }).map((p) => p.id);
    expect(ids).toContain("p-a15-128");
    expect(ids).toContain("p-a15-256");
  });

  it("sorts by price low to high", () => {
    const prices = searchProducts({ sort: "price_asc" }).map((p) => p.price);
    expect(prices[0]).toBe(140);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("sorts by price high to low", () => {
    const prices = searchProducts({ sort: "price_desc" }).map((p) => p.price);
    expect(prices[0]).toBe(189000);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  it("filters by category, store and price range", () => {
    const results = searchProducts({ category: "home-appliances", store: "electro-saadi", min: 60000, max: 80000 });
    expect(results.map((p) => p.id).sort()).toEqual(["p-ac-18000", "p-washer-7kg"]);
  });

  it("finds products from an Arabic keyword", () => {
    expect(searchProducts({ q: "مكيف" }).map((p) => p.id)).toEqual(
      expect.arrayContaining(["p-ac-12000", "p-ac-18000"]),
    );
  });

  it("ignores French accents and Arabic letter variants", () => {
    expect(normalizeText("Électroménager")).toBe("electromenager");
    expect(normalizeText("إسمنت")).toBe(normalizeText("اسمنت"));
  });

  it("suggests stores while typing a partial name", () => {
    expect(getSuggestions("mezg").stores.map((s) => s.slug)).toContain("mezghiche-mobile");
  });
});

describe("add product form", () => {
  it("requires a name and a positive whole-number price", () => {
    expect(validateNewProduct({ name: "", categoryId: "cat-electronics", price: "" })).toEqual({
      name: "required",
      price: "required",
    });
    expect(validateNewProduct({ name: "X", categoryId: "cat-electronics", price: "0" })).toEqual({
      price: "invalidPrice",
    });
    expect(validateNewProduct({ name: "X", categoryId: "cat-electronics", price: "2500" })).toEqual({});
  });
});
