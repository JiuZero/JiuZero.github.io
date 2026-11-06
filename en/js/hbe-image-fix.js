// Re-run the theme's image post-processing (lightbox wrap + lazysizes init)
// for content revealed by hexo-blog-encrypt, which is inserted into the DOM
// after pjax_script.js has already run. Without this, decrypted images stay
// at `.article-entry img { opacity: 0 }` forever because they never gain the
// lazyload/lazyloaded classes.
(function () {
  // same logic as themes/reimu pjax_script.js "lightbox"
  var wrapLightbox = function (element) {
    if (
      element.parentElement.classList.contains("friend-icon") ||
      element.parentElement.tagName === "A" ||
      element.classList.contains("no-lightbox")
    )
      return;
    var a = document.createElement("a");
    a.href ? (a.href = element.src) : a.setAttribute("href", element.src);
    if (element.naturalWidth || element.naturalHeight) {
      a.dataset.pswpWidth = element.naturalWidth;
      a.dataset.pswpHeight = element.naturalHeight;
    } else {
      element.onload = function () {
        a.dataset.pswpWidth = element.naturalWidth;
        a.dataset.pswpHeight = element.naturalHeight;
      };
    }
    a.target = "_blank";
    a.classList.add("article-gallery-item");
    element.parentNode.insertBefore(a, element);
    element.parentNode.removeChild(element);
    a.appendChild(element);
  };

  var initDecryptedImages = function () {
    // lightbox
    _$$(".article-entry img").forEach(function (element) {
      if (element.dataset.hbeFixed) return;
      element.dataset.hbeFixed = "1";
      wrapLightbox(element);
    });
    // lazyload: same as pjax_script.js
    _$$(".article-entry img").forEach(function (element) {
      if (element.classList.contains("lazyload")) return;
      element.classList.add("lazyload");
      element.setAttribute("data-src", element.src);
      element.setAttribute("data-sizes", "auto");
      element.removeAttribute("src");
    });
    // lazysizes watches DOM mutations and picks up the new .lazyload
    // elements; if it is unavailable, fall back to immediate load so images
    // are not stuck at opacity: 0.
    if (!window.lazySizes) {
      _$$(".article-entry img.lazyload").forEach(function (element) {
        element.src = element.getAttribute("data-src");
        element.classList.add("lazyloaded");
      });
    }
  };

  window.addEventListener("hexo-blog-decrypt", function () {
    // let the decrypted DOM settle before post-processing
    setTimeout(initDecryptedImages, 50);
  });
})();
