
try {
  new Function("import('/api/panel_custom/route/e.facecbe5.js')")();
} catch (err) {
  var el = document.createElement('script');
  el.src = '/api/panel_custom/route/e.facecbe5.js';
  document.body.appendChild(el);
}
  