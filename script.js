(function () {
  var dict = {
    es: {
      open: 'Abierto ahora', closed: 'Cerrado ahora',
      heroA: 'Cafetería de especialidad', heroB: 'Baños de Agua Santa, Ecuador',
      menu: 'Ver menú', menuSub: 'Desayunos, café y postres',
      wa: 'WhatsApp', waSub: 'Pedidos, reservas y para llevar',
      revTitle: 'Reseñas', revScore: '4,9 · 128 reseñas',
      revHead: '¿Te llevas un buen recuerdo?',
      revBody: 'Somos un proyecto pequeño y cada reseña cuenta. Si te gustó, cuéntalo en Google — son 20 segundos y nos ayuda muchísimo.',
      revCta: 'Dejar una reseña', revCtaSub: 'Se abre directo en Google',
      social: 'Síguenos', ig: 'Instagram', igSub: '@pralinecoffeehouse',
      wifi: 'Wi-Fi', ssid: 'Red', pass: 'Clave',
      copy: 'Copiar clave', copied: 'Copiado ✓',
      hoursTitle: 'Horario', today: 'Hoy · ',
      week: 'Lunes a viernes', weekend: 'Sábado y domingo',
      wayTitle: 'Cómo llegar', addrNote: 'A una cuadra de la iglesia',
      maps: 'Abrir en Google Maps',
      sloganA: 'Los días empiezan', sloganB: 'y terminan en Praliné',
      city: 'Baños de Agua Santa · Ecuador'
    },
    en: {
      open: 'Open now', closed: 'Closed now',
      heroA: 'Specialty coffee house', heroB: 'Baños de Agua Santa, Ecuador',
      menu: 'See menu', menuSub: 'Breakfast, coffee and desserts',
      wa: 'WhatsApp', waSub: 'Orders, bookings and takeaway',
      revTitle: 'Reviews', revScore: '4.9 · 128 reviews',
      revHead: 'Taking a good memory home?',
      revBody: 'We are a small place and every review counts. If you enjoyed it, say so on Google — it takes 20 seconds and helps us enormously.',
      revCta: 'Leave a review', revCtaSub: 'Opens straight in Google',
      social: 'Follow us', ig: 'Instagram', igSub: '@pralinecoffeehouse',
      wifi: 'Wi-Fi', ssid: 'Network', pass: 'Password',
      copy: 'Copy password', copied: 'Copied ✓',
      hoursTitle: 'Opening hours', today: 'Today · ',
      week: 'Monday to Friday', weekend: 'Saturday and Sunday',
      wayTitle: 'Getting here', addrNote: 'One block from the main square',
      maps: 'Open in Google Maps',
      sloganA: 'Days begin', sloganB: 'and end at Praliné',
      city: 'Baños de Agua Santa · Ecuador'
    }
  };

  var lang = 'es';
  try { lang = localStorage.getItem('praline-lang') || 'es'; } catch (e) {}
  var copied = false;
  var copyTimer = null;

  function $(id) { return document.getElementById(id); }

  function schedule() {
    return [
      { key: 'week', hours: '8:00 – 20:00', dow: [1, 2, 3, 4, 5] },
      { key: 'weekend', hours: '8:00 – 21:00', dow: [6, 0] }
    ];
  }

  function render() {
    var t = dict[lang] || dict.es;
    var on = lang === 'es';
    var now = new Date();
    var dow = now.getDay();
    var mins = now.getHours() * 60 + now.getMinutes();
    var rows = schedule();
    var todayRow = rows.filter(function (r) { return r.dow.indexOf(dow) !== -1; })[0] || rows[0];
    var close = (dow === 0 || dow === 6) ? 21 * 60 : 20 * 60;
    var isOpen = mins >= 8 * 60 && mins < close;

    document.documentElement.lang = lang;

    $('pill-es').style.background = on ? '#EFE3D6' : 'transparent';
    $('pill-es').style.color = on ? '#565243' : '#DCDCCA';
    $('pill-en').style.background = on ? 'transparent' : '#EFE3D6';
    $('pill-en').style.color = on ? '#DCDCCA' : '#565243';

    $('status-dot').style.background = isOpen ? '#A9B5A2' : 'rgba(168,168,152,.45)';
    $('status-dot').style.animation = isOpen ? 'prPulse 2.6s ease-in-out infinite' : 'none';
    $('status-label').textContent = isOpen ? t.open : t.closed;

    $('hero-a').textContent = t.heroA;
    $('hero-b').textContent = t.heroB;

    $('menu-label').textContent = t.menu;
    $('menu-sub').textContent = t.menuSub;

    $('wa-label').textContent = t.wa;
    $('wa-sub').textContent = t.waSub;

    $('rev-title').textContent = t.revTitle;
    $('rev-score').textContent = t.revScore;
    $('rev-head').textContent = t.revHead;
    $('rev-body').textContent = t.revBody;
    $('rev-cta').textContent = t.revCta;
    $('rev-cta-sub').textContent = t.revCtaSub;

    $('social-title').textContent = t.social;
    $('ig-label').textContent = t.ig;
    $('ig-sub').textContent = t.igSub;

    $('wifi-title').textContent = t.wifi;
    $('wifi-ssid-label').textContent = t.ssid;
    $('wifi-pass-label').textContent = t.pass;
    $('copy-btn').textContent = copied ? t.copied : t.copy;

    $('hours-title').textContent = t.hoursTitle;
    rows.forEach(function (r) {
      var isToday = r === todayRow;
      var color = isToday ? '#5A3A2E' : '#7A6E60';
      var daysLabel = r.key === 'week' ? t.week : t.weekend;
      var daysEl = $(r.key + '-days');
      var hoursEl = $(r.key + '-hours');
      daysEl.textContent = daysLabel;
      daysEl.style.color = color;
      hoursEl.textContent = r.hours;
      hoursEl.style.color = color;
    });
    $('today-note').textContent = t.today + todayRow.hours;

    $('way-title').textContent = t.wayTitle;
    $('addr-note').textContent = t.addrNote;
    $('maps-label').textContent = t.maps;

    $('slogan-a').textContent = t.sloganA;
    $('slogan-b').textContent = t.sloganB;
    $('footer-city').textContent = t.city;
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem('praline-lang', next); } catch (e) {}
    render();
  }

  function copyPass() {
    var pass = 'praline2024';
    var done = function () {
      copied = true;
      render();
      clearTimeout(copyTimer);
      copyTimer = setTimeout(function () { copied = false; render(); }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pass).then(done, done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = pass; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); done();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    $('btn-es').addEventListener('click', function () { setLang('es'); });
    $('btn-en').addEventListener('click', function () { setLang('en'); });
    $('copy-btn').addEventListener('click', copyPass);
    render();
  });
})();
