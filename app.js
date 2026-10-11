(function () {
  "use strict";
  var B = window.BODA || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  document.body.classList.add("bloqueado");
  var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- datos desde config.js ---------- */
  $$("[data-hora=civil]").forEach(function (e) { e.textContent = B.horaCivil; });
  $$("[data-hora=cena]").forEach(function (e) { e.textContent = B.horaCena; });
  function mapa(q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  $$("[data-mapa]").forEach(function (a) { a.href = mapa(B.lugares[a.getAttribute("data-mapa")]); });
  if (B.limiteConfirmar) $("#limite").textContent = B.limiteConfirmar;
  if (B.regalo) {
    $("#r-titular").textContent = B.regalo.titular;
    $("#r-banco").textContent = B.regalo.banco;
    $("#r-vence").textContent = B.regalo.vence;
  }

  /* ---------- QR ---------- */
  function dibujaQR(el, texto) {
    var q = qrcode(0, "M");
    q.addData(texto);
    q.make();
    el.innerHTML = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
  }
  $("#form-link").href = B.formulario;
  dibujaQR($("#qr-asistencia"), B.formulario);

  /* ---------- WhatsApp ---------- */
  var par = "Lola Patricia y Leonardo";
  var msg = {
    si: "¡Felicidades, " + par + "! 🤍 Les deseo un matrimonio lleno de amor y alegría. Con mucho gusto los acompañaré el miércoles 14 de octubre. ¡Gracias por la invitación! 🥂",
    no: "¡Felicidades, " + par + "! 🤍 Les deseo un matrimonio lleno de amor y alegría. Lamentablemente no podré acompañarlos el 14 de octubre, pero estaré con ustedes de corazón. ¡Gracias por invitarme! 💛",
    qr: "¡Felicidades, " + par + "! Confirmo que (SÍ / NO) podré acompañarlos el 14 de octubre."
  };
  function wa(num, texto) { return "https://wa.me/" + num + "?text=" + encodeURIComponent(texto); }
  $$(".novio").forEach(function (card) {
    var d = (B.whatsapp || {})[card.getAttribute("data-quien")] || {};
    var num = String(d.numero || "").replace(/\D/g, "");
    if (!num) { card.classList.add("sin-numero"); return; }
    $$("[data-msg]", card).forEach(function (a) { a.href = wa(num, msg[a.getAttribute("data-msg")]); });
    dibujaQR($(".qr-hueco", card), wa(num, msg.qr));
  });

  /* ---------- calendario ---------- */
  (function () {
    var ini = new Date(B.inicio);
    if (isNaN(ini)) return;
    var fin = new Date(ini.getTime() + 6 * 3600 * 1000);
    var f = function (d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); };
    $("#cal").href = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
      encodeURIComponent("Boda de Lola Patricia y Leonardo") + "&dates=" + f(ini) + "/" + f(fin) +
      "&location=" + encodeURIComponent(B.lugares.cena) +
      "&details=" + encodeURIComponent("Ceremonia civil " + B.horaCivil + " · Cena de celebración " + B.horaCena);
  })();

  /* ---------- cuenta regresiva ---------- */
  (function () {
    var meta = new Date(B.inicio).getTime();
    if (isNaN(meta)) return;
    var el = { d: $("#c-d"), h: $("#c-h"), m: $("#c-m"), s: $("#c-s") };
    var fin = $("#cuenta-fin"), caja = $("#cuenta");
    var dos = function (n) { return (n < 10 ? "0" : "") + n; };
    function pinta() {
      var t = meta - Date.now();
      if (t <= 0) {
        caja.style.display = "none"; fin.style.display = "block";
        fin.textContent = (Date.now() - meta < 86400000) ? "Hoy es el gran día" : "Gracias por acompañarnos";
        return false;
      }
      var s = Math.floor(t / 1000);
      el.d.textContent = dos(Math.floor(s / 86400));
      el.h.textContent = dos(Math.floor(s % 86400 / 3600));
      el.m.textContent = dos(Math.floor(s % 3600 / 60));
      el.s.textContent = dos(s % 60);
      return true;
    }
    if (pinta()) { var iv = setInterval(function () { if (!pinta()) clearInterval(iv); }, 1000); }
  })();

  /* ---------- aparecer al hacer scroll ---------- */
  (function () {
    var els = $$(".rv");
    if (!("IntersectionObserver" in window) || quieto) return;
    var h = window.innerHeight;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) {
      if (e.getBoundingClientRect().top > h) { e.classList.add("pre"); io.observe(e); }
    });
  })();

  /* ---------- galería ---------- */
  (function () {
    var links = $$("#galeria-g a"), lb = $("#lb"), img = $("#lb-img"), i = 0;
    function ver(n) { i = (n + links.length) % links.length; img.src = links[i].href; img.alt = $("img", links[i]).alt; }
    function abre(n) { ver(n); lb.classList.add("abierto"); }
    function cierra() { lb.classList.remove("abierto"); }
    links.forEach(function (a, n) { a.addEventListener("click", function (e) { e.preventDefault(); abre(n); }); });
    $(".x", lb).addEventListener("click", cierra);
    $(".p", lb).addEventListener("click", function () { ver(i - 1); });
    $(".s", lb).addEventListener("click", function () { ver(i + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) cierra(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("abierto")) return;
      if (e.key === "Escape") cierra();
      if (e.key === "ArrowLeft") ver(i - 1);
      if (e.key === "ArrowRight") ver(i + 1);
    });
  })();

  /* ---------- música ---------- */
  var audio = $("#audio"), btnM = $("#musica"), musicaLista = false;
  if (B.musica) {
    audio.src = B.musica; audio.volume = 0.55;
    audio.addEventListener("error", function () { btnM.classList.remove("ok"); musicaLista = false; });
    audio.addEventListener("canplay", function () { musicaLista = true; btnM.classList.add("ok"); });
    audio.addEventListener("play", function () { btnM.classList.add("suena"); });
    audio.addEventListener("pause", function () { btnM.classList.remove("suena"); });
    audio.load();
    btnM.addEventListener("click", function () { if (audio.paused) audio.play().catch(function () {}); else audio.pause(); });
  }

  /* ---------- pétalos ---------- */
  function petalos() {
    if (quieto) return;
    var cont = $("#petalos"), n = window.innerWidth < 700 ? 9 : 16;
    for (var k = 0; k < n; k++) {
      var p = document.createElement("i");
      p.className = "petalo";
      p.style.setProperty("--x", (Math.random() * 100).toFixed(1) + "%");
      p.style.setProperty("--s", (9 + Math.random() * 9).toFixed(1) + "px");
      p.style.setProperty("--d", (11 + Math.random() * 10).toFixed(1) + "s");
      p.style.setProperty("--r", (-Math.random() * 18).toFixed(1) + "s");
      p.style.setProperty("--dx", ((Math.random() - 0.4) * 160).toFixed(0) + "px");
      cont.appendChild(p);
    }
  }

  /* ---------- sobre ---------- */
  var sobre = $("#sobre"), env = $("#abrir"), abierto = false;
  function abrir() {
    if (abierto) return; abierto = true;
    env.classList.add("abierto");
    if (B.musica && audio.src) audio.play().catch(function () {});
    var espera = quieto ? 200 : 1900;
    setTimeout(function () {
      sobre.classList.add("fuera");
      document.body.classList.remove("bloqueado");
      window.scrollTo(0, 0);
      petalos();
      setTimeout(function () { sobre.parentNode && sobre.parentNode.removeChild(sobre); }, 1200);
    }, espera);
  }
  env.addEventListener("click", abrir);
  if (/(^|#)abierto$/.test(location.hash) || /[?&]abierto/.test(location.search)) { abrir(); }
})();
