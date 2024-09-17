/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/09/17/Xray与BurpSuitePro联动扫描/1.png","6815a28472f96dd52dade9b4830d5fb2"],["/2024/09/17/Xray与BurpSuitePro联动扫描/2.png","1097132ad7862fac147ad4ed191b8e8f"],["/2024/09/17/Xray与BurpSuitePro联动扫描/3.png","c9ad958374d422ed9235bbd69a2ee406"],["/2024/09/17/Xray与BurpSuitePro联动扫描/4.png","ec986f46b6627b408f5e5571e5b4f24b"],["/2024/09/17/Xray与BurpSuitePro联动扫描/5.png","bb7001be059ea9c7994fb307d58de20f"],["/2024/09/17/Xray与BurpSuitePro联动扫描/6.png","c050046eef4975ee75661eb070a94928"],["/2024/09/17/Xray与BurpSuitePro联动扫描/index.html","1f9a3fa981a50db162daebb449ffd786"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/1.png","4aa270c7e6901068fb45a4bb0adf07ae"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/10.png","7d75c8f36b30c11621a2feda27afedb7"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/11.png","a0ba60eca21f82a9168e9ae7aea1e022"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/12.png","d396421d8c663e1df4419d74f872fda5"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/13.png","f5a2e7b85fad7649a592f9644dd826c3"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/14.png","b18b0004e1f9940be01a23bbb308973f"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/15.png","d390e924f9a68abad16cb230171d6141"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/16.png","bb66350276648ac9fade49d115b37c61"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/17.png","f011157289d85bacb550fa7fec2d527b"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/2.png","37c97d1981890bd02debb9b64a66f0f6"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/3.png","4222b60875de226b8e2187101f8dc9cf"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/4.png","93e2d078a1698248726aab0ab97dc47e"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/5.png","e3339547cf02844552a9371330c0a0c7"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/6.png","9bd5f8feab059b29899e7de09082e651"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/7.png","0d0bd695aa7922037a89467c4fb96829"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/8.png","2a87661eb700be850858c78749704862"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/9.png","48015617889bcb6369ac9c37c4734b55"],["/2024/09/17/记一次完整的EDUSRC漏洞挖掘/index.html","e4ae71ea066b5096eb869f5715398500"],["/about/index.html","a851b620279056d8e119a5b6840de9b3"],["/archives/index.html","22cd85c07026afb9773575edc6f550da"],["/categories/Edusrc/index.html","7a03e13fe042ac23f4e234bc6935b7eb"],["/categories/Others/index.html","df352f8b462410d3875e3fc7b794bf80"],["/categories/index.html","6856f14e9bf5d682ef1d425e2eb2e929"],["/css/main.css","bfda9ee588424b68b0bd8ba56efa4388"],["/images/avatar.jpg","e9460980ddf259db01302a7e87e6bff4"],["/images/avatar_bak.jpg","8b1fb064119cba182c946e0c79eff9f8"],["/images/avatar_bak2.jpg","f325ad2eb9c92e6f528f8be9888b82eb"],["/images/background.jpg","cebc2cc7ca7654d4a72ffa5f1d80ddce"],["/images/loading.gif","446100f374e93811b2ddf58ecd807d9a"],["/index.html","cf7a15f10224da7e7e55e387bf638c90"],["/js/lib/crypto.js","6dea3398588fa487f40a670187fd4130"],["/js/lib/highlight.js","2ec63393cb10a75124fcab98323c5144"],["/js/lib/home.js","03b96a1187cf0bc66fae7b71996624ca"],["/js/lib/math.js","517ed8e4f836ae59a8afd9f77038a52a"],["/js/lib/preview.js","a1a304c7f1997d0f9c44925b9a72095c"],["/js/lib/search.js","fedebea1e9c012c796a8332d9fd2fa25"],["/js/main.js","2dd13f37d0b58eb47cabba38a5fedd95"],["/sw-register.js","1b993d4fc6389cf1847eda3840a1297e"],["/tags/SQL/index.html","a9fdd0acb277afe3068aedf547a6baed"],["/tags/Upload/index.html","9a8c1736b52dd9755eb4e5af75f1e272"],["/tags/XSS/index.html","d14ee70396fc13a6bccd4e4ab65b36fb"],["/tags/index.html","e6957fd443c001958fd973da62ad80ce"]];
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
