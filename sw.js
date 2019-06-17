const expectedCaches = ['static-v1'],
   resources = [
  '/index.html',
  '/layout.css'
 ];
self.addEventListener('install', event => {
 console.log('installing..');
event.waitUntil(
  caches.open(expectedCaches[0]).then(cache => cache.addAll(resources))
 )
});
self.addEventListener('foreignfetch', event => {
 event.respondWith(fetch(event.request).then(response => {
  return {
   response: response,
   origin: event.origin,
   headers: ['Content-Type']
  }
 }));
});
self.addEventListener('activate', function(e) {
  var expectedCacheNames = expectedCaches[0];
e.waitUntil(
    caches.keys().then(function(keyList) {
          return Promise.all(
   keyList.map(function(key) {
            if (expectedCacheNames.indexOf(key) == -1) {
       return caches.delete(key);
      }
   })
  );
    })
  );
});
self.addEventListener('fetch', function(event) {
 event.respondWith(
  caches.open(expectedCaches[0]).then(function(cache) {
   if (event.request.clone().method == "GET") {
      return cache.match(event.request).then(function(response) {
      var fetchPromise = fetch(event.request).then(function(networkResponse) {
       cache.put(event.request, networkResponse.clone());
       return networkResponse;
      });
      return response || fetchPromise;
      });
   }
  })
 );
});

aa()
{
	alert('1111');
}