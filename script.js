(function () {
  var dict = {
    es: {
      open: 'Abierto ahora', closed: 'Cerrado ahora',
      until: 'Hasta las {t}', backAt: 'Volvemos a las {t}', opensAt: 'Abrimos a las {t}',
      opensTomorrow: 'Abrimos mañana a las {t}', opensOn: 'Abrimos el {d} a las {t}',
      heroA: 'Cafetería de especialidad', heroB: 'Baños de Agua Santa, Ecuador',
      menu: 'Ver menú', menuSub: 'Desayunos, café y postres',
      wifi: 'Wi-Fi', ssid: 'Red', pass: 'Clave',
      copy: 'Copiar clave', copied: 'Clave copiada',
      revTitle: 'Antes de irte',
      revHead: '¿Te gustó? Cuéntalo',
      revBody: 'Somos una casa pequeña y cada reseña en Google ayuda a que más gente nos encuentre.',
      revCta: 'Dejar una reseña', revCtaSub: 'Toma menos de un minuto',
      social: 'Síguenos',
      hoursTitle: 'Horario', today: 'Hoy', closedDay: 'Cerrado',
      days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      waSub: 'Pedidos para llevar y reservas',
      waMsg: 'Hola, Praliné. Quisiera hacer un pedido o una reserva.',
      way: 'Cómo llegar', addrNote: 'A una cuadra de la iglesia',
      sloganA: 'Los días empiezan', sloganB: 'y terminan en Praliné',
      menuTitle: 'Menú', close: 'Cerrar menú', chips: 'Categorías del menú',
      fav: 'Favoritos de la casa', vat: 'Todos nuestros precios incluyen IVA'
    },
    en: {
      open: 'Open now', closed: 'Closed now',
      until: 'Until {t}', backAt: 'Back at {t}', opensAt: 'Opening at {t}',
      opensTomorrow: 'Opening tomorrow at {t}', opensOn: 'Opening {d} at {t}',
      heroA: 'Specialty coffee house', heroB: 'Baños de Agua Santa, Ecuador',
      menu: 'See the menu', menuSub: 'Breakfast, coffee and desserts',
      wifi: 'Wi-Fi', ssid: 'Network', pass: 'Password',
      copy: 'Copy password', copied: 'Password copied',
      revTitle: 'Before you go',
      revHead: 'Enjoyed it? Tell others',
      revBody: 'We are a small house, and every Google review helps more people find us.',
      revCta: 'Leave a review', revCtaSub: 'Takes less than a minute',
      social: 'Follow us',
      hoursTitle: 'Opening hours', today: 'Today', closedDay: 'Closed',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      waSub: 'Takeaway orders and bookings',
      waMsg: 'Hello Praliné, I would like to place an order or make a booking.',
      way: 'Getting here', addrNote: 'One block from the church',
      sloganA: 'Days begin', sloganB: 'and end at Praliné',
      menuTitle: 'Menu', close: 'Close menu', chips: 'Menu categories',
      fav: 'House favorites', vat: 'All prices include VAT'
    }
  };

  // Turnos por día de la semana (índice = Date.getDay(), 0 = domingo). [] = cerrado.
  var HOURS = [
    [['9:00', '13:30'], ['15:30', '20:30']],
    [['9:00', '13:30'], ['16:00', '20:30']],
    [],
    [],
    [['9:00', '13:30'], ['16:00', '20:30']],
    [['9:00', '13:30'], ['15:30', '21:00']],
    [['9:00', '13:30'], ['15:30', '21:00']]
  ];
  var WEEK = [1, 2, 3, 4, 5, 6, 0]; // orden de la lista: lunes primero

  // Menú real, transcrito de assets/menu.pdf. Ítem: [nombre, precio, descripción, favorito].
  // Nombre y descripción: texto único o [es, en].
  var MENU = [
    { id: 'breakfast', t: ['Desayunos', 'Breakfast'], groups: [{ items: [
      [['Desayuno Praliné', 'Praliné breakfast'], '7.50', ['Huevos revueltos con jamón de pavo y tocino, french toast con frutos rojos o tostada mixta, bebida caliente (americano, cappuccino o chocolate) y jugo de fruta.', 'Scrambled eggs with turkey ham and bacon, berry French toast or a ham and cheese toastie, a hot drink (americano, cappuccino or hot chocolate) and fruit juice.']],
      [['Desayuno cazuela', 'Cazuela breakfast'], '7.50', ['Huevos a la cazuela con tomate y especias, mozzarella y cebollín, con pan campesino de masa madre. Fruta de temporada y bebida caliente.', 'Eggs baked in a clay dish with spiced tomato, mozzarella and chives, with country sourdough. Seasonal fruit and a hot drink.']],
      [['Bowl de frutas', 'Fruit bowl'], '6.00', ['Yogur griego con frutas frescas, granola crujiente y miel, con un café americano.', 'Greek yogurt with fresh fruit, crunchy granola and honey, served with an americano.']]
    ] }] },
    { id: 'toast', t: ['French toast', 'French toast'], groups: [
      { t: ['Dulces', 'Sweet'], note: ['Dos rebanadas de nuestro brioche de masa madre.', 'Two slices of our sourdough brioche.'], items: [
        ['Praliné', '7.50', ['Manzana, salsa de caramelo salado, praliné de nueces y crema de la casa.', 'Apple, salted caramel sauce, walnut praline and house cream.'], 1],
        ['Nutella', '7.50', ['Nutella, fresas o banano y helado de vainilla.', 'Nutella, strawberries or banana and vanilla ice cream.']],
        [['Frutos rojos', 'Red berries'], '7.50', ['Mermelada de frutos rojos, fresas, arándanos y crema de la casa.', 'Berry jam, strawberries, blueberries and house cream.']]
      ] },
      { t: ['Saladas', 'Savory'], items: [
        ['Croque madame', '7.75', ['Brioche tostado, pernil ahumado y queso fundido, con un huevo frito encima.', 'Toasted brioche, smoked pork and melted cheese, topped with a fried egg.'], 1],
        ['Campesina', '7.75', ['Brioche tostado con tocino crocante, huevos pochados y salsa cremosa de aguacate.', 'Toasted brioche with crispy bacon, poached eggs and creamy avocado sauce.']],
        ['Burrata', '8.00', ['Burrata sobre brioche tostado, jamón serrano, rúcula, aceite de oliva y vinagre de vino tinto.', 'Burrata on toasted brioche with serrano ham, arugula, olive oil and red wine vinegar.'], 1],
        ['Avo toast', '6.00', ['Brioche tostado con aguacate, queso crema, tomates cherry y huevo revuelto.', 'Toasted brioche with avocado, cream cheese, cherry tomatoes and scrambled egg.']]
      ] }
    ] },
    { id: 'bites', t: ['Para picar', 'Bites'], groups: [
      { items: [
        [['Cocotte pomodoro', 'Cocotte pomodoro'], '7.00', ['Cazuela de huevos con salsa pomodoro, jamón de pavo, mozzarella y especias, con pan de hogaza de masa madre.', 'Baked eggs in pomodoro sauce with turkey ham, mozzarella and spices, with sourdough bread.']],
        [['Empanada de pollo', 'Chicken empanada'], '3.50'],
        ['Humita', '2.50', ['Pastel tierno de choclo', 'Steamed sweet corn cake']],
        [['Papas fritas', 'French fries'], '4.00'],
        [['Tostada de queso', 'Cheese toastie'], '3.50'],
        [['Tostada de queso y jamón de pavo', 'Cheese and turkey ham toastie'], '3.75']
      ] },
      { t: ['Extras', 'Extras'], items: [
        [['Pan de masa madre con mermelada casera y mantequilla', 'Sourdough bread with house jam and butter'], '3.50'],
        [['Porción de huevos', 'Side of eggs'], '2.50']
      ] }
    ] },
    { id: 'coffee', t: ['Café', 'Coffee'], groups: [
      { t: ['Calientes', 'Hot'], items: [
        ['Espresso', '2.00 · 2.50', ['Simple · doble', 'Single · double']],
        ['Americano', '2.25 · 2.75', ['Simple · doble', 'Single · double']],
        ['Cappuccino', '2.50 · 3.25', ['Simple · doble', 'Single · double']],
        ['Café bombón', '2.50', ['Espresso con leche condensada', 'Espresso with condensed milk']],
        ['Macchiato', '2.25'],
        ['Cortado', '2.30'],
        ['Flat white', '3.00'],
        ['Latte', '3.00'],
        ['Mocaccino', '3.50']
      ] },
      { t: ['Fríos', 'Iced'], items: [
        ['Iced latte', '3.50'],
        ['Caramel macchiato', '3.75', null, 1],
        ['Iced cappuccino', '3.75'],
        [['Moca frío', 'Iced mocha'], '3.75'],
        [['Limonada de café', 'Coffee lemonade'], '3.75'],
        ['Cold brew', '3.50'],
        ['Citrus cold brew', '4.00']
      ] },
      { t: ['Especiales de la casa', 'House specials'], items: [
        [['Iced latte de rosas', 'Rose iced latte'], '4.50'],
        ['Iced latte Oreo', '4.90'],
        ['Latte Nesquik', '4.50'],
        [['Cappuccino de pistacho', 'Pistachio cappuccino'], '3.50'],
        ['Café viennois', '3.00']
      ] }
    ], note: ['Dale un sabor a tu bebida por $0.75: pistacho, vainilla francesa, macadamia, avellana, rosas o toffee con sal marina.', 'Add a flavor to any drink for $0.75: pistachio, French vanilla, macadamia, hazelnut, rose or sea salt toffee.'] },
    { id: 'nocoffee', t: ['Sin café', 'No coffee'], groups: [
      { t: ['Matcha y latte', 'Matcha and lattes'], items: [
        ['Matcha latte', '4.00'],
        ['Strawberry matcha', '4.90'],
        ['Coconut matcha', '4.50'],
        ['Chai latte', '3.50', null, 1],
        [['Chocolate al 70%', '70% hot chocolate'], '3.00'],
        [['Té de la casa', 'House tea'], '2.50']
      ] },
      { t: ['Frescos', 'Cold'], items: [
        [['Jugos', 'Fresh juice'], '3.00'],
        [['Batidos', 'Fruit shakes'], '3.50'],
        [['Agua de Jamaica', 'Hibiscus iced tea'], '3.00'],
        [['Limonada', 'Lemonade'], '3.00'],
        [['Limonada de fresa', 'Strawberry lemonade'], '3.50']
      ] }
    ] },
    { id: 'sweets', t: ['Postres', 'Desserts'], groups: [
      { t: ['Galletas', 'Cookies'], items: [
        [['Galleta especial', 'Special cookie'], '2.25', ['Rellena de chocolate semiamargo, pretzels, Nutella y Kinder', 'Filled with dark chocolate, pretzels, Nutella and Kinder'], 1],
        [['Galleta de nuez', 'Walnut cookie'], '2.00'],
        ['Triple chocolate', '2.25']
      ] },
      { t: ['Postres', 'Desserts'], items: [
        ['Cheesecake', '4.00', ['Con mermelada de frutos rojos y arándanos frescos', 'With berry jam and fresh blueberries'], 1],
        ['Affogato', '4.00'],
        ['Tiramisú', '4.00'],
        [['Postre de alfajor', 'Alfajor dessert'], '4.00', ['Crema de dulce de leche, alfajor, nueces y chocolate', 'Dulce de leche cream, alfajor, walnuts and chocolate']],
        ['Muffins', '2.75'],
        [['Rollos de canela', 'Cinnamon rolls'], '3.00'],
        [['Pan de banana', 'Banana bread'], '3.00']
      ] }
    ], note: ['Acompaña tu galleta o postre con helado de vainilla por $0.75.', 'Add vanilla ice cream to any cookie or dessert for $0.75.'] },
    { id: 'drinks', t: ['Con alcohol', 'Cocktails'], groups: [{ items: [
      ['Irish coffee', '6.50'],
      ['Carajillo', '6.50'],
      [['Cerveza de cappuccino', 'Cappuccino beer'], '6.00'],
      ['Tinto de verano', '5.50', null, 1],
      ['Aperol', '6.50'],
      [['Copa de vino', 'Glass of wine'], '4.50'],
      ['Club Verde', '3.00']
    ] }], note: ['Pregunta por el vino y el espumante de la casa.', 'Ask about our house wine and sparkling wine.'] }
  ];

  var lang = 'es';
  try { lang = localStorage.getItem('praline-lang') || 'es'; } catch (e) {}
  if (!dict[lang]) lang = 'es';
  var copied = false;
  var copyTimer = null;

  function $(id) { return document.getElementById(id); }
  function tr(v) { return typeof v === 'string' ? v : v[lang === 'en' ? 1 : 0]; }
  function fill(s, o) { return s.replace(/\{(\w)\}/g, function (_, k) { return o[k]; }); }
  function toMin(hm) { var p = hm.split(':'); return +p[0] * 60 + +p[1]; }

  // Estado del local para un día (0-6) y minuto del día. Contempla el corte del mediodía.
  function status(dow, mins, t) {
    var today = HOURS[dow];
    for (var i = 0; i < today.length; i++) {
      if (mins >= toMin(today[i][0]) && mins < toMin(today[i][1])) {
        return { open: true, note: fill(t.until, { t: today[i][1] }) };
      }
    }
    for (var d = 0; d < 7; d++) {
      var day = (dow + d) % 7;
      for (var j = 0; j < HOURS[day].length; j++) {
        var start = HOURS[day][j][0];
        if (d > 0 || toMin(start) > mins) {
          var key = d > 1 ? 'opensOn' : d === 1 ? 'opensTomorrow' : j > 0 ? 'backAt' : 'opensAt';
          var name = t.days[day];
          return { open: false, note: fill(t[key], { t: start, d: lang === 'es' ? name.toLowerCase() : name }) };
        }
      }
    }
  }

  function hoursHtml(dow, t) {
    return WEEK.map(function (day) {
      var isToday = day === dow;
      var shifts = HOURS[day];
      var color = isToday ? '#5A3A2E' : shifts.length ? '#7B6158' : '#76766A';
      var timeStyle = 'font-family:\'Jost\',sans-serif;font-weight:400;font-size:13px;letter-spacing:.04em;font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap';
      var cells = shifts.length
        ? shifts.map(function (s) { return '<span style="' + timeStyle + '">' + s[0] + '–' + s[1] + '</span>'; }).join('')
        : '<span style="grid-column:2 / 4;text-align:right;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:18px">' + t.closedDay + '</span>';
      var tag = isToday ? ' <span style="margin-left:6px;font-family:\'Jost\',sans-serif;font-weight:500;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;vertical-align:2px">' + t.today + '</span>' : '';
      return '<li style="display:grid;grid-template-columns:1fr 78px 86px;column-gap:12px;align-items:baseline;padding:9px 12px;margin:0 -12px;border-radius:6px;color:' + color + ';background:' + (isToday ? '#EFE3D6' : 'transparent') + '">' +
        '<span style="font-family:\'Cormorant Garamond\',serif;font-size:19px;line-height:1.3;white-space:nowrap;font-weight:' + (isToday ? 500 : 400) + ';font-style:' + (shifts.length ? 'normal' : 'italic') + '">' + t.days[day] + tag + '</span>' +
        cells + '</li>';
    }).join('');
  }

  function render() {
    var t = dict[lang] || dict.es;
    var on = lang === 'es';
    var now = new Date();
    var dow = now.getDay();
    var st = status(dow, now.getHours() * 60 + now.getMinutes(), t);

    document.documentElement.lang = lang;
    Array.prototype.forEach.call(document.querySelectorAll('[data-t]'), function (el) {
      el.textContent = t[el.getAttribute('data-t')];
    });

    [['es', on], ['en', !on]].forEach(function (p) {
      var pill = $('pill-' + p[0]);
      pill.style.background = p[1] ? '#5A3A2E' : '#EFE3D6';
      pill.style.color = p[1] ? '#FFFFFF' : '#5A3A2E';
      $('btn-' + p[0]).setAttribute('aria-pressed', p[1]);
    });

    $('status-dot').style.background = st.open ? '#A9B5A2' : '#A8A898';
    $('status-dot').style.animation = st.open ? 'prPulse 2.6s ease-in-out infinite' : 'none';
    $('status-label').textContent = st.open ? t.open : t.closed;
    $('status-note').textContent = st.note;

    $('copy-btn').textContent = copied ? t.copied : t.copy;
    $('hours').innerHTML = hoursHtml(dow, t);
    $('wa-link').href = 'https://wa.me/593999322363?text=' + encodeURIComponent(t.waMsg);
    $('menu-close').setAttribute('aria-label', t.close);
    $('menu-chips').setAttribute('aria-label', t.chips);
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

  // ============ visor de menú ============
  var HEART = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A27572" stroke-width="1.6" stroke-linejoin="round" role="img" aria-label="{a}" style="flex:none;vertical-align:-1px;margin-left:6px"><path d="M12 20.3s-7.8-4.7-7.8-10.4A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 7.8 2.9c0 5.7-7.8 10.4-7.8 10.4z"></path></svg>';
  var builtLang = null;
  var menuOpen = false;
  var hideTimer = null;
  var savedScroll = 0;
  var panelTransition = '';

  function buildMenu() {
    if (builtLang === lang) return;
    builtLang = lang;
    var t = dict[lang];
    var heart = fill(HEART, { a: t.fav });
    $('menu-chips').innerHTML = MENU.map(function (s) {
      return '<button type="button" data-go="' + s.id + '" style="flex:none;height:48px;padding:0;border:0;background:transparent;cursor:pointer;display:flex;align-items:center">' +
        '<span style="display:flex;align-items:center;height:34px;padding:0 14px;border:1px solid #DCDCCA;border-radius:999px;font-family:\'Jost\',sans-serif;font-weight:500;font-size:11px;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;transition:background .2s,color .2s">' + tr(s.t) + '</span></button>';
    }).join('');

    var body = '<p style="margin:18px 0 0;display:flex;align-items:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:17px;color:#5A3A2E">' + t.fav + heart.replace('margin-left:6px', 'margin-left:8px') + '</p>';
    body += MENU.map(function (s) {
      var html = '<section id="m-' + s.id + '" style="padding-top:30px">' +
        '<h3 style="margin:0;font-family:\'Playfair Display\',serif;font-weight:400;font-size:25px;line-height:1.2;color:#5A3A2E">' + tr(s.t) + '</h3>';
      s.groups.forEach(function (g) {
        if (g.t) html += '<p style="margin:20px 0 0;font-family:\'Jost\',sans-serif;font-weight:500;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#5A3A2E">' + tr(g.t) + '</p>';
        if (g.note) html += '<p style="margin:4px 0 0;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:17px;color:#7B6158">' + tr(g.note) + '</p>';
        html += '<ul style="list-style:none;margin:' + (g.t ? 6 : 12) + 'px 0 0;padding:0">' + g.items.map(function (it, i) {
          var price = it[1].split(' · ').map(function (p) { return '$' + p; }).join(' · ');
          return '<li style="padding:11px 0;' + (i ? 'border-top:1px solid rgba(220,220,202,.7)' : '') + '">' +
            '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:16px">' +
              '<span style="font-family:\'Cormorant Garamond\',serif;font-weight:500;font-size:20px;line-height:1.25;color:#5A3A2E">' + tr(it[0]) + (it[3] ? heart : '') + '</span>' +
              '<span style="flex:none;font-family:\'Jost\',sans-serif;font-weight:400;font-size:14px;letter-spacing:.04em;font-variant-numeric:tabular-nums;color:#5A3A2E;white-space:nowrap">' + price + '</span>' +
            '</div>' +
            (it[2] ? '<p style="margin:3px 0 0;padding-right:48px;font-family:\'Cormorant Garamond\',serif;font-size:17px;line-height:1.35;color:#7B6158;text-wrap:pretty">' + tr(it[2]) + '</p>' : '') +
          '</li>';
        }).join('') + '</ul>';
      });
      if (s.note) html += '<p style="margin:14px 0 0;padding:12px 16px;background:#EFE3D6;border:1px solid #DCDCCA;border-radius:8px;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:17px;line-height:1.35;color:#5A3A2E">' + tr(s.note) + '</p>';
      return html + '</section>';
    }).join('');
    body += '<p style="margin:36px 0 0;text-align:center;font-family:\'Jost\',sans-serif;font-weight:400;font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:#5A3A2E">' + t.vat + '</p>';
    $('menu-body').innerHTML = body;
  }

  function setActiveChip(id) {
    Array.prototype.forEach.call($('menu-chips').children, function (btn) {
      var active = btn.getAttribute('data-go') === id;
      var pill = btn.firstChild;
      pill.style.background = active ? '#5A3A2E' : '#FFFFFF';
      pill.style.borderColor = active ? '#5A3A2E' : '#DCDCCA';
      pill.style.color = active ? '#FFFFFF' : '#5A3A2E';
      if (active) {
        btn.setAttribute('aria-current', 'true');
        var nav = $('menu-chips');
        var target = btn.offsetLeft - (nav.clientWidth - btn.offsetWidth) / 2;
        nav.scrollTo({ left: target, behavior: 'smooth' });
      } else {
        btn.removeAttribute('aria-current');
      }
    });
  }

  function openMenu() {
    if (menuOpen) return;
    menuOpen = true;
    var rebuilt = builtLang !== lang;
    buildMenu();
    clearTimeout(hideTimer);
    savedScroll = window.scrollY;
    // bloquea el fondo (position:fixed también funciona en iOS Safari)
    document.body.style.cssText = 'position:fixed;left:0;right:0;top:-' + savedScroll + 'px';
    $('page').inert = true;
    $('menu-sheet').hidden = false;
    if (rebuilt) { $('menu-body').scrollTop = 0; setActiveChip(MENU[0].id); }
    void $('menu-panel').offsetHeight;
    $('menu-backdrop').style.opacity = '1';
    $('menu-panel').style.transform = 'translateY(0)';
    $('menu-close').focus({ preventScroll: true });
    history.pushState({ prMenu: 1 }, '');
  }

  function closeMenu(fromHistory) {
    if (!menuOpen) return;
    menuOpen = false;
    $('menu-backdrop').style.opacity = '0';
    $('menu-panel').style.transform = 'translateY(100%)';
    hideTimer = setTimeout(function () { $('menu-sheet').hidden = true; }, 340);
    $('page').inert = false;
    document.body.style.cssText = '';
    window.scrollTo(0, savedScroll);
    $('menu-open').focus({ preventScroll: true });
    // el botón "atrás" de Android cierra el menú en vez de sacar al cliente de la página
    if (!fromHistory && history.state && history.state.prMenu) history.back();
  }

  function onMenuScroll() {
    var body = $('menu-body');
    var current = MENU[0].id;
    MENU.forEach(function (s) {
      if ($('m-' + s.id).offsetTop <= body.scrollTop + 40) current = s.id;
    });
    if (body.scrollTop + body.clientHeight >= body.scrollHeight - 2) current = MENU[MENU.length - 1].id;
    var active = $('menu-chips').querySelector('[aria-current]');
    if (!active || active.getAttribute('data-go') !== current) setActiveChip(current);
  }

  // gesto hacia abajo: desde la cabecera, o desde el contenido cuando ya está arriba del todo
  function bindSwipe() {
    var panel = $('menu-panel');
    var drag = null;
    panel.addEventListener('touchstart', function (e) {
      if (!$('menu-head').contains(e.target) && $('menu-body').scrollTop > 0) return;
      drag = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now(), dy: 0, on: false };
    }, { passive: true });
    panel.addEventListener('touchmove', function (e) {
      if (!drag) return;
      var dx = e.touches[0].clientX - drag.x;
      var dy = e.touches[0].clientY - drag.y;
      if (!drag.on) {
        if (Math.abs(dx) > 6 || dy < -6) { drag = null; return; }
        if (dy < 6) return;
        drag.on = true;
        panel.style.transition = 'none';
      }
      drag.dy = Math.max(0, dy);
      panel.style.transform = 'translateY(' + drag.dy + 'px)';
      e.preventDefault();
    }, { passive: false });
    function end() {
      if (!drag) return;
      var d = drag;
      drag = null;
      if (!d.on) return;
      panel.style.transition = panelTransition;
      if (d.dy > 110 || d.dy / (Date.now() - d.t) > 0.5) closeMenu();
      else panel.style.transform = 'translateY(0)';
    }
    panel.addEventListener('touchend', end);
    panel.addEventListener('touchcancel', end);
  }

  document.addEventListener('DOMContentLoaded', function () {
    panelTransition = $('menu-panel').style.transition;
    // sin esto, history.back() al cerrar el menú devuelve el fondo al inicio de la página
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    $('btn-es').addEventListener('click', function () { setLang('es'); });
    $('btn-en').addEventListener('click', function () { setLang('en'); });
    $('copy-btn').addEventListener('click', copyPass);
    $('menu-open').addEventListener('click', openMenu);
    $('menu-close').addEventListener('click', function () { closeMenu(); });
    $('menu-backdrop').addEventListener('click', function () { closeMenu(); });
    $('menu-body').addEventListener('scroll', onMenuScroll, { passive: true });
    $('menu-chips').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-go]');
      if (!btn) return;
      var id = btn.getAttribute('data-go');
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      $('menu-body').scrollTo({ top: $('m-' + id).offsetTop, behavior: reduce ? 'auto' : 'smooth' });
      setActiveChip(id);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    });
    window.addEventListener('popstate', function () { closeMenu(true); });
    bindSwipe();
    render();
    setInterval(render, 60000); // el estado abierto/cerrado se actualiza si la página queda abierta en la mesa
  });
})();
