<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules (WIN marketplace)

- UI reads catalog data only through `src/lib/catalog.ts`; mock data lives in `src/data/mock/` — why: the backend can later replace the mock arrays in one place without touching components.
- Shared domain types live in `src/types/catalog.ts` and mirror future database tables — why: keeps mock and real data interchangeable.
- All interface strings go in `src/i18n/dictionary.ts` (ar + fr) and are read via `useI18n()`; store and product names are never translated — why: merchant-written names must appear exactly as entered.
- `<html lang/dir>` is rendered from the i18n context in `src/routes/__root.tsx`; use logical utilities (`ms-`, `pe-`, `start-`, `rtl:`/`ltr:`) instead of left/right — why: one layout serves both RTL Arabic and LTR French.
- Public pages sit under the pathless `_site` layout (navbar + footer); the merchant dashboard is a standalone route with its own sidebar — why: the dashboard must not inherit the shopper chrome.
- Search never merges or deduplicates products; each model/spec variant is a separate product — why: different models must not be treated as identical.
