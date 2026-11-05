# 1 CRORE is a SIMPLE MATH — Landing Page

Static site: HTML5, CSS3 and vanilla JavaScript. No build step, no dependencies.

## Folder structure
```
1crore-landing/
├── .nojekyll         Tells GitHub Pages to serve files as-is
├── index.html        Main landing page
├── privacy.html      Privacy Policy (placeholder, edit before launch)
├── terms.html        Terms & Conditions (placeholder)
├── refund.html       Refund Policy (placeholder)
├── css/
│   └── styles.css    All styles
├── js/
│   └── main.js       Checkout links, scroll reveal, sticky buy bar
└── assets/
    └── images/       Put the cover image and page screenshots here (optional)
```

## Before launch: edit the site settings
Open `js/main.js` and fill in the `SITE` block at the very top:
```js
var SITE = {
  price: '',        // e.g. '₹499'
  email: '',        // e.g. 'support@yourdomain.com'
  whatsapp: '',     // digits with country code, e.g. '919876543210'
  deliveryNote: ''  // your verified text on how buyers get the PDF
};
```
Anything left blank stays hidden (the price shows "Price shown at checkout"). Nothing else needs find-and-replace.

Also replace the text inside `privacy.html`, `terms.html` and `refund.html` with your final policies. Do not state delivery timing or refund terms unless they are true.

## Checkout links
Every BUY NOW button uses this exact URL. `js/main.js` also enforces it at runtime:
```
https://getvik.com/checkout?productId=6aeb3442b8b6e679919b977d&productSlug=1-crore-clothing-business&theme=light
```

## Run locally
Open `index.html` in a browser, or run a tiny local server (recommended, so fonts and relative paths behave like production):

```bash
cd 1crore-landing
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages
1. Create a new public repository on GitHub, for example `1crore-landing`.
2. Upload the contents of the `1crore-landing` folder to the repository root (`index.html` must be at the top level).
3. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After about a minute the site is live at `https://<your-username>.github.io/1crore-landing/`.

## Deploy to Render (static site)
1. Push the folder to a GitHub repository.
2. In Render, click **New → Static Site** and connect the repository.
3. Leave **Build Command** empty and set **Publish Directory** to `.` (the root).
4. Click **Create Static Site**. Render gives you a `*.onrender.com` URL. Add a custom domain under Settings if you have one.

## Notes on content
- The copy is taken from the ebook PDF. Figures labelled EXAMPLE or ASSUMPTION in the book are kept with those labels.
- The ₹1 crore section says it is a mathematical target, not a guaranteed income.
- The site has no testimonials, purchase notifications, countdown timers or scarcity messages. Keep it that way unless you have real, verified data to show.
- The 3D book uses the real cover from the PDF (`assets/images/cover.jpg`). The PDF cover is black with gold type, so it differs from the mocha palette used on the rest of the page. If you prefer a mocha cover, replace the file.
