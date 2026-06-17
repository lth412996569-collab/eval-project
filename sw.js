self.addEventListener("install", function(e) {
  e.waitUntil(caches.open("eval-v1").then(function(cache) {
    return cache.addAll(["./", "./data.js", "./manifest.json"]);
  }));
});
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(resp) {
        if (resp.ok) {
          var clone = resp.clone();
          caches.open("eval-v1").then(function(c) { c.put(e.request, clone); });
        }
        return resp;
      });
    })
  );
});
