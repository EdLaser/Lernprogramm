self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('version1').then(function (cache){
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style_sheet.css',
                '/scripts/dp_quiz.js',
                'gallery/cat.gif',
                'gallery/logo--image.svg',
                'gallery/programming.gif',
            ]);
        })
    );
});

self.addEventListener('fetch', function (event){
    //Respong with required ressource if in Cache
    event.respondWith(
        caches.match(event.request).catch(function (){
            //if not found request from Server
            return fetch(event.request).then(function (response){
                // load ressource in cache
                return caches.open('version1').then(function (cache){
                    // copy with clone and put in Cache
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});