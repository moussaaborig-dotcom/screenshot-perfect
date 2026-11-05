/** Builds a wa.me deep link. Numbers in this prototype are placeholders. */
export function whatsappLink(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
