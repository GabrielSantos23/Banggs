# Unduck

DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables all of DuckDuckGo's bangs to work, but much faster.

```
https://unduck.link?q=%s
```

## How is it that much faster?

DuckDuckGo does their redirects server side. Their DNS is...not always great. Result is that it often takes ages.

I solved this by doing all of the work client side. Once you've went to https://unduck.link once, the JS is all cache'd and will never need to be downloaded again. Your device does the redirects, not me.

## What's different in this fork?

This fork focuses on client-side speed, theming and user-customisation.

1. ⚡ **Inline fast-path redirect** – Tiny script in `index.html` resolves the most-common bangs before any assets download, eliminating the visible flash.
2. 🌓 **Light / Dark mode** – CSS variables, automatic system detection and manual toggle.
3. ⚙️ **Settings modal** – UI to change default bang, add / edit custom bangs and clear history.
4. 📑 **Bangs catalogue modal** – Shows your custom bangs and a curated "Popular" list with one-click "Start using".
5. 💾 **LocalStorage + Hash-map** – Custom bangs are stored locally and resolved in O(1) via a `Map`.
6. 🔢 **Search counter** – Top-left `search: N` indicator (only on the home page).
7. 🛟 **Service Worker cache** – First visit installs a SW; later visits are fully offline-cached so the fast-path script runs instantly.
8. ✨ **UI polish** – Header icon buttons, modal spacing tweaks, small SVG icon set; all assets kept lightweight / vanilla JS.

Everything else (bang dataset, MIT licence, etc.) stays identical to Theo's original.
