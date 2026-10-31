# Pizza Delivery Landing Page — Implementation Plan

## Product scope and serving

Enhance the existing React 19 + Vite client in place (`client/`). `/` becomes a premium, interactive marketing landing page; `/register` becomes a non-functional placeholder as explicitly requested. No new Vite app or client directory. No new backend, database, authentication, admin, or payment implementation; do not modify `server/`, existing auth services/context, or checkout/order code. Existing legacy login, dashboard, builder, order and admin routes remain available and otherwise unchanged. Existing dependencies (React Router, lucide-react, Tailwind/Vite) are sufficient; no new package is planned. Vite continues serving the local preview on its Session-declared port. A synchronized `public/manus-routes.json` declares all current source routes.

## Project structure

- `src/App.jsx` — route composition: isolate the full-bleed landing route, provide the requested inert `/register` page, and keep unrelated existing route groups intact.
- `src/pages/Home.jsx` — landing-page composition and local customization state for base, sauce, cheese and toppings, including a frontend-only INR sample price.
- `src/components/landing/` — small reusable navigation, reveal/section, ingredient-selection, how-it-works and footer components; each section remains clear and maintainable.
- `src/pages/auth/RegisterPlaceholder.jsx` — clear no-submit placeholder; keep the original registration implementation file and auth services untouched.
- `src/styles/landing.css` — page-scoped visual system and responsive/animation rules. `src/index.css` receives only compatible global reset/font/palette updates.
- `src/assets/` — two purpose-specific premium food images (hero pizza and a separate story/cheese close-up), generated before application code and used only in their planned roles.
- `public/manus-routes.json` — route manifest derived from `App.jsx`.
- `index.html` — page title and concise metadata for the new landing route.

## Design direction

- **Design movement:** cinematic Italian food editorial meets restrained contemporary digital craft.
- **Core principles:** food-first focal composition; deliberate contrast and generous breathing room; restrained warmth; intuitive ingredient choices.
- **Color philosophy:** dark charcoal and near-black set a confident restaurant-night mood; ivory and cream carry readable editorial text; terracotta, brick, burnt orange and beige act only as small culinary cues. Palette: `#171513`, `#0D0C0B`, `#F4EFE6`, `#E9DDCC`, `#A84F38`, `#7E3328`, `#B86A3C`, `#C8B39A`, `#A9A39A`. No blue/cyan.
- **Layout paradigm:** full-bleed, alternating editorial sections with asymmetric text/photo composition and horizontal ingredient choices rather than repeated generic card grids; mobile deliberately reorders into a readable single column.
- **Signature elements:** a minimal PizzaDev wordmark with a restrained pizza-slice mark; warm fine rules/ingredient-index labels; oversized cropped editorial headings paired with tactile food photography.
- **Interaction philosophy:** selection should feel like choosing ingredients at a counter—clear selected state, immediate summary, calm confirmation; all actions remain keyboard-accessible.
- **Animation:** staged hero entrance; one-time Intersection Observer reveals and subtle parallax/scroll response; transform/opacity only where practical; no scroll hijacking, bounce, elastic, random rotation or continuous motion. Respect reduced-motion preferences.
- **Typography system:** editorial Cormorant Garamond display with DM Sans interface/body (system/Georgia/Arial fallbacks), maximum two families and responsive type scale.
- **Brand essence:** PizzaDev is a customizable pizza delivery experience for people who want their own ingredient combinations; crafted, assured, inviting.
- **Brand voice:** direct and sensory, not promotional filler. Examples: “Good pizza starts with good choices.” “Your ingredients. Your combinations. Your pizza.”
- **Wordmark/logo:** use the existing PizzaDev name with a small, simple slice mark rather than generated text.
- **Signature brand color:** muted terracotta `#A84F38`, used sparingly against charcoal and ivory.

## Interaction and content decisions

The landing navbar will link to Home, Menu, and the on-page pizza-building section; Login and Sign Up link to existing `/login` and requested placeholder `/register`. The three specified build/account CTAs navigate to `/register`. Five exact base choices, five exact sauces, four cheese choices, and eight exact vegetables are data-driven. Base/sauce/cheese are single-select; vegetables are multi-select. State is local React state only. Summary displays selected values, topping count and a clearly sample-only dynamic `₹` amount consistent with the existing app's INR convention. A small no-submit `/register` placeholder replaces the active form at that route only; other auth code stays in the repository.

Use staged CSS entrance timing, an Intersection Observer reveal helper, active-section observation, subtle hero pointer movement on non-touch devices and an animated mobile menu. Mobile/tablet layouts are separately composed; interactive controls expose labels, selected state and focus. Reduced motion disables parallax/reveals or shows content immediately.

## Implementation constraints

Reuse installed packages; do not install an animation library. Preserve normal browser scrolling. Do not reuse the unrelated existing `hero.png` placeholder, place one generated photo in unrelated sections, change the backend/auth/order/payment code, or create a managed checkpoint or publish unless separately requested.
