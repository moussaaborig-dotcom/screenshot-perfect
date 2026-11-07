import { ImagePlus, Info, Plus, X } from "lucide-react";
import { useState, type FormEvent } from "react";

import { useAvailabilityLabel } from "@/components/catalog/Availability";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { getCategories } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Availability, Product } from "@/types/catalog";

export interface NewProductInput {
  name: string;
  brand: string;
  model: string;
  categoryId: string;
  price: number;
  availability: Availability;
  description: string;
  image: string | null;
  specs: { label: string; value: string }[];
}

const field =
  "h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring aria-[invalid=true]:border-destructive";
const label = "mb-1.5 block text-sm font-medium text-foreground";

/** Validates the add-product form. Returns a map of field → error key. */
export function validateNewProduct(v: { name: string; categoryId: string; price: string }) {
  const errors: Partial<Record<"name" | "categoryId" | "price", "required" | "invalidPrice">> = {};
  if (!v.name.trim()) errors.name = "required";
  if (!v.categoryId) errors.categoryId = "required";
  if (!v.price.trim()) errors.price = "required";
  else if (!/^\d+$/.test(v.price.trim()) || Number(v.price) <= 0) errors.price = "invalidPrice";
  return errors;
}

export function AddProductForm({
  defaultCategoryId,
  onSubmit,
}: {
  defaultCategoryId: string;
  onSubmit: (input: NewProductInput) => void;
}) {
  const { t, l } = useI18n();
  const availLabel = useAvailabilityLabel();
  const f = t.dashboard.form;

  const empty = {
    name: "",
    brand: "",
    model: "",
    categoryId: defaultCategoryId,
    price: "",
    availability: "in_stock" as Availability,
    description: "",
  };
  const [values, setValues] = useState(empty);
  const [image, setImage] = useState<string | null>(null);
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([{ label: "", value: "" }]);
  const [errors, setErrors] = useState<ReturnType<typeof validateNewProduct>>({});

  const set = <K extends keyof typeof values>(k: K, v: (typeof values)[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  function reset() {
    setValues(empty);
    setImage(null);
    setSpecs([{ label: "", value: "" }]);
    setErrors({});
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs = validateNewProduct(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSubmit({
      ...values,
      name: values.name.trim(),
      price: Number(values.price),
      image,
      specs: specs.filter((s) => s.label.trim() && s.value.trim()),
    });
    reset();
  }

  const err = (k: keyof typeof errors) =>
    errors[k] ? (
      <p className="mt-1 text-xs text-destructive">{errors[k] === "invalidPrice" ? f.invalidPrice : f.required}</p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="grid gap-6 xl:grid-cols-[1fr_20rem]">
      <div className="space-y-6 rounded-2xl border bg-card p-5 shadow-card sm:p-6">
        <div>
          <label htmlFor="np-name" className={label}>
            {f.name} <span className="text-destructive">*</span>
          </label>
          <input
            id="np-name"
            dir="auto"
            className={field}
            placeholder={f.namePh}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {err("name")}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="np-brand" className={label}>
              {f.brand}
            </label>
            <input id="np-brand" dir="auto" className={field} value={values.brand} onChange={(e) => set("brand", e.target.value)} />
          </div>
          <div>
            <label htmlFor="np-model" className={label}>
              {f.model}
            </label>
            <input id="np-model" dir="ltr" className={cn(field, "num")} value={values.model} onChange={(e) => set("model", e.target.value)} />
          </div>
        </div>
        <p className="-mt-3 flex items-start gap-2 rounded-lg bg-primary-soft p-3 text-xs text-primary">
          <Info className="size-4 shrink-0" aria-hidden="true" />
          {f.modelHint}
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="np-category" className={label}>
              {f.category} <span className="text-destructive">*</span>
            </label>
            <select
              id="np-category"
              className={field}
              value={values.categoryId}
              onChange={(e) => set("categoryId", e.target.value)}
              aria-invalid={Boolean(errors.categoryId)}
            >
              {getCategories().map((c) => (
                <option key={c.id} value={c.id}>
                  {l(c.name)}
                </option>
              ))}
            </select>
            {err("categoryId")}
          </div>
          <div>
            <label htmlFor="np-price" className={label}>
              {f.price} <span className="text-destructive">*</span>
            </label>
            <input
              id="np-price"
              inputMode="numeric"
              className={cn(field, "num")}
              value={values.price}
              onChange={(e) => set("price", e.target.value.replace(/[^\d]/g, ""))}
              aria-invalid={Boolean(errors.price)}
            />
            {err("price")}
          </div>
          <div>
            <label htmlFor="np-avail" className={label}>
              {f.availability}
            </label>
            <select
              id="np-avail"
              className={field}
              value={values.availability}
              onChange={(e) => set("availability", e.target.value as Availability)}
            >
              {(["in_stock", "low_stock", "out_of_stock"] as Availability[]).map((a) => (
                <option key={a} value={a}>
                  {availLabel(a)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="np-desc" className={label}>
            {f.description}
          </label>
          <textarea
            id="np-desc"
            dir="auto"
            rows={4}
            className={cn(field, "h-auto py-2.5")}
            placeholder={f.descriptionPh}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>

        <fieldset>
          <legend className={label}>{f.specs}</legend>
          <div className="space-y-2">
            {specs.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input
                  dir="auto"
                  aria-label={f.specLabel}
                  placeholder={f.specLabel}
                  className={field}
                  value={s.label}
                  onChange={(e) => setSpecs((prev) => prev.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                />
                <input
                  dir="auto"
                  aria-label={f.specValue}
                  placeholder={f.specValue}
                  className={field}
                  value={s.value}
                  onChange={(e) => setSpecs((prev) => prev.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))}
                />
                <button
                  type="button"
                  onClick={() => setSpecs((prev) => (prev.length > 1 ? prev.filter((_, j) => j !== i) : [{ label: "", value: "" }]))}
                  className="grid size-11 shrink-0 place-items-center rounded-lg border text-muted-foreground hover:bg-muted"
                  aria-label="Remove"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={() => setSpecs((p) => [...p, { label: "", value: "" }])}>
            <Plus aria-hidden="true" />
            {f.addSpec}
          </Button>
        </fieldset>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border bg-card p-5 shadow-card">
          <p className={label}>{f.images}</p>
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed bg-background text-center text-sm text-muted-foreground transition-colors hover:border-brand-green hover:text-foreground">
            {image ? (
              <img src={image} alt="" className="size-full object-cover" />
            ) : (
              <>
                <ImagePlus className="size-8" aria-hidden="true" />
                <span className="font-medium">{f.upload}</span>
                <span className="text-xs">{f.imagesHint}</span>
              </>
            )}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImage(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="accent" size="lg" className="flex-1">
            {f.submit}
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={reset}>
            {f.reset}
          </Button>
        </div>
      </div>
    </form>
  );
}

export type { Product };
