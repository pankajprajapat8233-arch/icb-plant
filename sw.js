// sw.js — minimal service worker, required by Chrome for "Add to Home Screen"
// to behave as a real installable app instead of a plain bookmark.

const CACHE_NAME = "icb-plant-v1";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  // Network-first, falls back to cache if offline
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
