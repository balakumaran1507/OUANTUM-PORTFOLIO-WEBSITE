// OUANTUM Analytics Loader
// Deferred, non-blocking load of GA4 and Microsoft Clarity.
// Loaded as an external script so the site can maintain a strict CSP
// (no 'unsafe-inline' required for script-src).

window.addEventListener('load', function () {
  setTimeout(function () {
    // Google Analytics 4
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XVXJYL311Z';
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XVXJYL311Z');

    // Microsoft Clarity
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'x3p7v4kzcc');
  }, 1000);
});
