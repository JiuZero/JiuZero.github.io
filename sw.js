/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/1.png","4aa270c7e6901068fb45a4bb0adf07ae"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/10.png","7d75c8f36b30c11621a2feda27afedb7"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/11.png","a0ba60eca21f82a9168e9ae7aea1e022"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/12.png","d396421d8c663e1df4419d74f872fda5"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/13.png","f5a2e7b85fad7649a592f9644dd826c3"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/14.png","b18b0004e1f9940be01a23bbb308973f"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/15.png","d390e924f9a68abad16cb230171d6141"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/16.png","bb66350276648ac9fade49d115b37c61"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/17.png","f011157289d85bacb550fa7fec2d527b"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/2.png","37c97d1981890bd02debb9b64a66f0f6"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/3.png","4222b60875de226b8e2187101f8dc9cf"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/4.png","93e2d078a1698248726aab0ab97dc47e"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/5.png","e3339547cf02844552a9371330c0a0c7"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/6.png","9bd5f8feab059b29899e7de09082e651"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/7.png","0d0bd695aa7922037a89467c4fb96829"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/8.png","2a87661eb700be850858c78749704862"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/9.png","48015617889bcb6369ac9c37c4734b55"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/index.html","387a1ba779bbcf0dd3ea5fa53551a868"],["/about/index.html","c87952ca8128e7323e8e1c4244a575a2"],["/archives/index.html","98219a43cedaed1d10d2994b09bd2768"],["/categories/Edusrc/index.html","74541c34b1cd117af33d6effc01935d4"],["/categories/index.html","9336b8aed78cc58a77f5cf2eaa071647"],["/css/main.css","6460ec3b2317020c6e748065506d28db"],["/images/avatar.jpg","f325ad2eb9c92e6f528f8be9888b82eb"],["/images/avatar_bak.jpg","8b1fb064119cba182c946e0c79eff9f8"],["/images/background_1.jpg","cebc2cc7ca7654d4a72ffa5f1d80ddce"],["/images/background_2.jpg","280d3f4eb2d42f1c0bd33ce795bb979f"],["/images/loading.gif","446100f374e93811b2ddf58ecd807d9a"],["/index.html","18175dc7630e25e875bba82a1329e8af"],["/js/lib/crypto.js","d66f52234ef0bb9051cb593b25a11f2b"],["/js/lib/highlight.js","96615fd06a3074f46fd0aca1c504b897"],["/js/lib/home.js","623b2117c6240728af9c9cb27d0386d0"],["/js/lib/math.js","654a1cefafce9da26ecc8be70a0f1399"],["/js/lib/preview.js","1faad7a4e7bc1de1e51758e484b3b68a"],["/js/lib/search.js","a9a6e98bf4ae4e429d5830f86e404817"],["/js/main.js","9dc418552e42aa95f6dab138d8e601d1"],["/sw-register.js","da1dc2e630a65d71b862221cf1a2ca99"],["/tags/SQL/index.html","8f8f000678a215feb69d54b83191e122"],["/tags/Upload/index.html","250c519f8c254bbafe5bfee75c1b2cc1"],["/tags/XSS/index.html","515d12dc6c980a3557957049f687447a"],["/tags/index.html","506b1d8b1c03605859b0b39153774a50"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
