# Ariyo Homes — website

Static one-page site built from the Claude Design project
`Ariyo Homes.dc.html` (project `b9e33241-fa99-47a0-b557-7dcb3120d16f`).

No build step, no dependencies — plain HTML, CSS and JS.

```
index.html
api/
  contact.js        serverless route: emails the contact form via Resend
assets/
  css/styles.css
  js/main.js
  img/…
robots.txt
sitemap.xml
```

## Run locally

```bash
python3 -m http.server 4321
```

Then open <http://localhost:4321>.

## Deploy

Any static host works. With Vercel, from this folder:

```bash
vercel deploy --prod
```

Netlify, Cloudflare Pages or GitHub Pages work the same way — publish the
folder as-is.

## Things to set before going live

| What | Where | Current value |
| --- | --- | --- |
| Resend API key | Vercel env var `RESEND_API_KEY` | **not set — form cannot send until you add it** |
| Contact email | `assets/js/main.js` → `CONTACT_EMAIL`, `index.html` | `Info@ariyohomes.eu` |
| Phone | `index.html` (link + JSON-LD) | `+371 20941114` |
| Domain | `index.html` (`canonical`, `og:*`, JSON-LD), `robots.txt`, `sitemap.xml` | `https://ariyohomes.eu/` |
| Social links | `index.html` footer | ✅ Instagram, Facebook, TikTok set |

### Contact form

The form POSTs `{ name, email, model, message, language }` to
`api/contact.js`, a Vercel serverless function that emails the enquiry to
**Info@ariyohomes.eu** through [Resend](https://resend.com). No npm packages
— it calls the Resend REST API with `fetch`.

**Setup (once, before it can send):**

1. Create a Resend account.
2. Add **ariyohomes.eu** as a sending domain and add the DNS records Resend
   gives you (SPF/DKIM). Sending fails until the domain is verified.
3. Create an API key.
4. In Vercel → Project → Settings → Environment Variables, add:

   | Name | Value |
   | --- | --- |
   | `RESEND_API_KEY` | the key from step 3 |
   | `CONTACT_TO` | *(optional)* defaults to `Info@ariyohomes.eu` |
   | `CONTACT_FROM` | *(optional)* defaults to `Ariyo Homes <forma@ariyohomes.eu>` — must be on the verified domain |

5. Redeploy.

The email arrives with `reply-to` set to the visitor, so replying from the
inbox goes straight back to them.

**Local testing:** the route does not exist under `python3 -m http.server`,
so submitting locally returns 404 and the form shows a fallback message with
a `mailto:` link. To exercise the real route locally, run `vercel dev` with
`RESEND_API_KEY` set in `.env.local` (do not commit that file).

To go back to the no-backend behaviour, set `FORM_ENDPOINT = ''` in
`assets/js/main.js` and the button will open the visitor's mail client
instead.

### Cache busting

`index.html` loads the CSS and JS with a `?v=…` token. **Bump it whenever you
edit `styles.css` or `main.js`**, otherwise browsers keep serving the old copy
and your changes appear not to apply. Same trick works for a replaced image
(`model-1.jpg?v=2`).

## Languages

Latvian and English, switched from the `LV` control in the header. All copy
lives in the `I18N` object at the top of `assets/js/main.js`; Latvian is also
in the HTML so the page reads correctly with JavaScript disabled and for
crawlers. To add a language, add a dictionary with the same keys plus an
entry in `LANG_LABEL` and a `<button data-lang="…">` in the header menu.

## Images

| File | Source |
| --- | --- |
| `hero.jpg` | `māju bildes/Ariyo_eksterjers_tirs.png` |
| `interior.jpg` | `māju bildes/Ariyo_interjers_tirs.png` |
| `delivery.jpg` | `māju bildes/Ariyo_piegade_tirs.png` |
| `cta.jpg`, `model-1.jpg` | crops of the brand banner `ChatGPT Image Jul 31, 2026, 04_28_17 PM.png` |
| `model-2.jpg` | tighter crop of the exterior photo |
| `model-3.jpg` | tighter crop of the interior photo |
| `og.jpg`, `logo-512.png`, favicons | brand banner / round logo |

The design has seven image slots but only four distinct photos existed, so
the three model cards use crops rather than their own photography. Replace
`model-1/2/3.jpg` with a real photo per model when they are available —
nothing else needs to change.
