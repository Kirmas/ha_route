
try {
  new Function("import('/api/panel_custom/route/e.16bfdafd.js')")();
} catch (err) {
  var el = document.createElement('script');
  el.src = '/api/panel_custom/route/e.16bfdafd.js';
  document.body.appendChild(el);
}
  