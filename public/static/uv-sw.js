importScripts("/static/uv/uv.sw.js");
importScripts("public/scripts/cloak.js");
importScripts("public/scripts/settings.js");
const sw = new UVServiceWorker();

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));
