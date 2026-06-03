/* ====================================================================
   Portisol — centraal inhoudsbestand ("mini-CMS")
   Pas HIER de inhoud aan; de site leest alles hieruit.
   Later te koppelen aan een Google Sheet (Apps Script → JSON).
   ==================================================================== */
window.PORTISOL = {

  /* --- Promobanner bovenaan elke pagina (actief: true/false) --- */
  promo: {
    actief: true,
    tekst: "Breng een klant aan en ontvang € 100 korting op je nieuwe poort.",
    cta: "Bekijk de actie",
    link: "realisaties.html"
  },

  /* --- Social media (lege url = wordt niet aanklikbaar) --- */
  socials: [
    { naam: "Facebook",  url: "" },
    { naam: "Instagram", url: "" },
    { naam: "TikTok",    url: "" },
    { naam: "YouTube",   url: "" }
  ],

  /* --- Acties / promoties (ILLUSTRATIEF) --- */
  acties: [
    {
      titel: "€ 100 aanbrengpremie",
      tekst: "Ken je iemand die een nieuwe garagepoort zoekt? Breng een klant aan en jullie krijgen allebei € 100 korting bij plaatsing.",
      tot: "Doorlopend"
    }
  ],

  /* --- Realisaties (ILLUSTRATIEF — vervang door echte projectfoto's) --- */
  realisaties: [
    { img: "assets/img/type-sectionaal.jpg", titel: "Sectionaalpoort op maat", plaats: "Lokeren" },
    { img: "assets/img/type-zij.jpg",        titel: "Zijwaartse poort",        plaats: "Sint-Niklaas" },
    { img: "assets/img/type-rol.jpg",        titel: "Rolpoort",                plaats: "Gent" },
    { img: "assets/img/type-kantel.jpg",     titel: "Kanteldeur",              plaats: "Dendermonde" }
  ],

  /* --- Reviews (ILLUSTRATIEF — later via Google-reviews of de Sheet) --- */
  reviews: {
    score: 4.9,
    aantal: 27,
    items: [
      { naam: "Familie Janssens", plaats: "Lokeren",      score: 5, tekst: "Fantastische afwerking en precies volgens afspraak geleverd.", datum: "2026" },
      { naam: "Tom V.",           plaats: "Gent",         score: 5, tekst: "Vlotte plaatsing, nette monteurs en een prachtige poort. Aanrader.", datum: "2026" },
      { naam: "Sofie D.",         plaats: "Sint-Niklaas", score: 5, tekst: "Duidelijke offerte, geen verrassingen. Heel tevreden van het resultaat.", datum: "2026" },
      { naam: "M. Peeters",       plaats: "Dendermonde",  score: 4, tekst: "Goede service en een correcte prijs. Vlot geregeld van begin tot eind.", datum: "2026" }
    ]
  },

  /* --- FAQ (ILLUSTRATIEF) --- */
  faq: [
    { vraag: "Plaatsen jullie de garagepoort zelf?", antwoord: "Ja. Onze eigen monteurs plaatsen je garagepoort vakkundig. Screens, rolluiken en horren lever je op maat en plaats je zelf, met een duidelijke montagegids." },
    { vraag: "Hoe snel krijg ik een prijs?", antwoord: "Via 'Stel samen' krijg je meteen een richtprijs. Voor een definitieve offerte op maat contacteren we je binnen 2 werkdagen." },
    { vraag: "Moet ik zelf opmeten?", antwoord: "Je geeft de maten door met onze eenvoudige meethulp. Wij controleren alles vóór de productie." },
    { vraag: "Welke kleuren zijn mogelijk?", antwoord: "Wit, antracietgrijs en gouden eik zijn standaard. Daarnaast is een ruime keuze aan RAL-kleuren mogelijk." },
    { vraag: "Hoeveel garantie krijg ik?", antwoord: "Op onze garagepoorten geef je 5 jaar garantie; op screens en rolluiken 2 jaar." }
  ]
};

/* ==================================================================== */
/* Render-engine + promobanner. Vult placeholders met de data hierboven. */
/* Pagina's hoeven enkel een leeg element met het juiste id te bevatten: */
/*   #pt-reviews · #pt-realisaties · #pt-acties · #pt-faq · .pt-socials   */
/* ==================================================================== */
(function () {
  function stars(n) {
    var s = "";
    for (var i = 0; i < 5; i++) {
      s += '<span class="material-symbols-outlined" style="font-size:18px;color:' +
        (i < n ? "#F4B740" : "#e2d8c0") + ";font-variation-settings:'FILL' 1\">star</span>";
    }
    return s;
  }

  function promoBanner(P) {
    if (!P.promo || !P.promo.actief) return;
    try { if (localStorage.getItem("pt-promo-hide") === "1") return; } catch (e) {}
    var pr = P.promo;
    var bar = document.createElement("div");
    bar.id = "pt-promo";
    bar.setAttribute("data-i18n-skip", "");
    bar.style.cssText = "position:relative;z-index:60;background:#2B2A28;color:#FFFDF6;" +
      "font:600 13.5px/1.45 Quicksand,system-ui,sans-serif;text-align:center;padding:9px 40px;";
    var x = document.createElement("button");
    x.type = "button"; x.setAttribute("aria-label", "Sluiten"); x.innerHTML = "&times;";
    x.style.cssText = "position:absolute;right:12px;top:50%;transform:translateY(-50%);" +
      "background:none;border:0;color:#9A938A;font-size:20px;line-height:1;cursor:pointer;padding:0 4px;";
    x.onclick = function () { bar.remove(); try { localStorage.setItem("pt-promo-hide", "1"); } catch (e) {} };
    function paint() {
      var t = (window.PortisolI18n && window.PortisolI18n.t) ? window.PortisolI18n.t : function (s) { return s; };
      var inner = '<span style="margin-right:6px">🎁 ' + t(pr.tekst) + "</span>";
      if (pr.link && pr.cta) {
        inner += '<a href="' + pr.link + '" style="color:#F4B740;font-weight:700;text-decoration:underline;text-underline-offset:2px">' + t(pr.cta) + " →</a>";
      }
      bar.innerHTML = inner; bar.appendChild(x);
    }
    paint();
    document.addEventListener("portisol:lang", paint);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /* Scripted chat-widget (FAQ als gesprek) — voelt als een chatbot, geen backend */
  function chatWidget(P) {
    if (!P.faq || !P.faq.length) return;
    var st = document.createElement("style");
    st.textContent =
      "#pt-chat-btn{position:fixed;right:20px;bottom:20px;z-index:70;width:58px;height:58px;border-radius:50%;border:0;cursor:pointer;background:#F4B740;color:#2B2A28;box-shadow:0 10px 24px -8px rgba(43,42,40,.6);display:flex;align-items:center;justify-content:center;transition:transform .15s}" +
      "#pt-chat-btn:hover{transform:scale(1.06)}#pt-chat-btn .material-symbols-outlined{font-size:28px}" +
      "#pt-chat{position:fixed;right:20px;bottom:88px;z-index:70;width:340px;max-width:calc(100vw - 32px);background:#fff;border-radius:18px;box-shadow:0 24px 60px -20px rgba(43,42,40,.6);overflow:hidden;font:400 14px/1.5 Quicksand,system-ui,sans-serif;display:none}" +
      "#pt-chat.open{display:block}" +
      "#pt-chat .hd{background:#2B2A28;color:#FFFDF6;padding:13px 16px;font-weight:700;display:flex;justify-content:space-between;align-items:center}" +
      "#pt-chat .hd small{display:block;font-weight:500;color:#9A938A;font-size:12px}" +
      "#pt-chat .bd{padding:14px;max-height:60vh;overflow-y:auto;background:#FFFDF6}" +
      "#pt-chat .msg{margin-bottom:10px;display:flex}#pt-chat .user{justify-content:flex-end}" +
      "#pt-chat .b{padding:9px 12px;border-radius:12px;max-width:85%;color:#2B2A28}" +
      "#pt-chat .bot .b{background:#fff;border:1px solid #ece4d0}#pt-chat .user .b{background:#FBE08A}" +
      "#pt-chat .q{display:block;width:100%;text-align:left;background:#fff;border:1px solid #e7ddc6;border-radius:10px;padding:9px 12px;margin:5px 0;font:600 13px Quicksand,sans-serif;color:#46423b;cursor:pointer}" +
      "#pt-chat .q:hover{border-color:#F4B740;background:#FFFBEF}" +
      "#pt-chat .ft{padding:11px 14px;border-top:1px solid #ece4d0;background:#fff;font-size:12.5px}#pt-chat .ft a{color:#b9871a;font-weight:700}";
    document.head.appendChild(st);

    var btn = document.createElement("button");
    btn.id = "pt-chat-btn"; btn.type = "button"; btn.setAttribute("aria-label", "Stel je vraag");
    btn.innerHTML = '<span class="material-symbols-outlined">forum</span>';

    var box = document.createElement("div");
    box.id = "pt-chat"; box.setAttribute("data-i18n-skip", "");
    var qs = P.faq.map(function (f, i) { return '<button class="q" data-i="' + i + '">' + f.vraag + "</button>"; }).join("");
    box.innerHTML =
      '<div class="hd"><div>Portisol<small>Hoe kunnen we helpen?</small></div>' +
      '<button type="button" id="pt-chat-x" aria-label="Sluiten" style="background:none;border:0;color:#9A938A;font-size:20px;cursor:pointer">&times;</button></div>' +
      '<div class="bd" id="pt-chat-bd"><div class="msg bot"><div class="b">Hallo! Kies een vraag, of vraag meteen je offerte aan.</div></div><div id="pt-chat-qs">' + qs + "</div></div>" +
      '<div class="ft">Niet gevonden? <a href="offerte.html">Vraag je offerte aan →</a></div>';

    function toggle() { box.classList.toggle("open"); }
    btn.onclick = toggle;
    document.body.appendChild(btn); document.body.appendChild(box);
    box.querySelector("#pt-chat-x").onclick = toggle;
    var bd = box.querySelector("#pt-chat-bd"), qsEl = box.querySelector("#pt-chat-qs");
    box.querySelectorAll(".q").forEach(function (q) {
      q.onclick = function () {
        var f = P.faq[+q.dataset.i];
        var u = document.createElement("div"); u.className = "msg user"; u.innerHTML = '<div class="b">' + f.vraag + "</div>";
        var a = document.createElement("div"); a.className = "msg bot"; a.innerHTML = '<div class="b">' + f.antwoord + "</div>";
        bd.insertBefore(u, qsEl); bd.insertBefore(a, qsEl); bd.scrollTop = bd.scrollHeight;
      };
    });
  }

  /* Mobiel menu (hamburger) — kloont de bestaande nav-links in een dropdown */
  function mobileNav() {
    var navInner = document.querySelector("nav > div");
    if (!navInner) return;
    var links = navInner.querySelector('[class*="md:flex"]');
    if (!links || !links.querySelector("a")) return;
    var nav = navInner.closest("nav");
    var st = document.createElement("style");
    st.textContent =
      "#pt-burger{display:none;background:none;border:0;cursor:pointer;color:#2B2A28;padding:4px;line-height:0;margin-left:6px}" +
      "#pt-burger .material-symbols-outlined{font-size:30px}" +
      "#pt-mobmenu{display:none;position:absolute;left:0;right:0;top:100%;background:#fff;border-bottom:1px solid rgba(154,147,138,.2);box-shadow:0 14px 28px -14px rgba(43,42,40,.35);padding:8px 24px 18px;flex-direction:column;z-index:55}" +
      "#pt-mobmenu a{padding:12px 4px;font:600 16px Quicksand,system-ui,sans-serif;color:#2B2A28;text-decoration:none;border-bottom:1px solid rgba(154,147,138,.12)}" +
      "#pt-mobmenu a.cta{margin-top:12px;background:#F4B740;text-align:center;border-radius:999px;border-bottom:0;padding:13px}" +
      "#pt-mobmenu.open{display:flex}" +
      "@media(max-width:767px){#pt-burger{display:block}#pt-nav-cta{display:none}}" +
      "@media(min-width:768px){#pt-mobmenu{display:none!important}}";
    document.head.appendChild(st);

    var cta = navInner.querySelector(":scope > button");
    if (cta) cta.id = "pt-nav-cta";

    var burger = document.createElement("button");
    burger.id = "pt-burger"; burger.type = "button"; burger.setAttribute("aria-label", "Menu");
    burger.innerHTML = '<span class="material-symbols-outlined">menu</span>';
    navInner.appendChild(burger);

    var menu = document.createElement("div");
    menu.id = "pt-mobmenu";
    links.querySelectorAll("a").forEach(function (a) {
      var c = a.cloneNode(true); c.removeAttribute("class"); menu.appendChild(c);
    });
    if (cta) {
      var ca = document.createElement("a");
      ca.className = "cta";
      ca.textContent = (cta.textContent || "Offerte aanvragen").trim();
      var oc = cta.getAttribute("onclick") || "";
      var m = oc.match(/'([^']+\.html[^']*)'/);
      ca.href = m ? m[1] : "offerte.html";
      menu.appendChild(ca);
    }
    if (nav) nav.appendChild(menu);
    burger.onclick = function () { menu.classList.toggle("open"); };
  }

  function init() {
    var P = window.PORTISOL || {};
    promoBanner(P);
    chatWidget(P);
    mobileNav();

    // Reviews
    var rv = document.getElementById("pt-reviews");
    if (rv && P.reviews) {
      var R = P.reviews, h = "";
      h += '<div class="text-center mb-10"><span class="pill-eyebrow mb-4">Ervaringen</span>' +
        '<h2 class="text-4xl lg:text-5xl font-extrabold text-antraciet tracking-tighter mb-3">Wat klanten zeggen</h2>' +
        '<div style="font-weight:700;color:#2B2A28">' + stars(Math.round(R.score)) +
        ' <span style="margin-left:6px">' + R.score + "/5</span>" +
        ' <span style="color:#9A938A;font-weight:600">· ' + R.aantal + " beoordelingen</span></div></div>";
      h += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">';
      (R.items || []).forEach(function (it) {
        h += '<div class="bg-white border border-warmgrijs/15 rounded-2xl p-6 shadow-sm">' +
          '<div style="margin-bottom:8px">' + stars(it.score) + "</div>" +
          '<p class="text-sm text-antraciet/90 italic mb-4 leading-relaxed">&ldquo;' + it.tekst + '&rdquo;</p>' +
          '<p class="text-sm font-bold text-antraciet">' + it.naam + "</p>" +
          '<p class="text-xs text-warmgrijs">' + it.plaats + " · " + it.datum + "</p></div>";
      });
      h += "</div>";
      rv.innerHTML = h;
    }

    // Realisaties
    var re = document.getElementById("pt-realisaties");
    if (re && P.realisaties) {
      var hr = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">';
      P.realisaties.forEach(function (it) {
        hr += '<figure class="overflow-hidden rounded-2xl shadow-sm group m-0">' +
          '<img src="' + it.img + '" alt="' + it.titel + '" class="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"/>' +
          '<figcaption class="p-4 bg-white border border-t-0 border-warmgrijs/15"><p class="font-bold text-antraciet text-sm">' +
          it.titel + '</p><p class="text-xs text-warmgrijs">' + it.plaats + "</p></figcaption></figure>";
      });
      hr += "</div>";
      re.innerHTML = hr;
    }

    // Acties
    var ac = document.getElementById("pt-acties");
    if (ac && P.acties) {
      var ha = '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">';
      P.acties.forEach(function (it) {
        ha += '<div class="bg-botergeel/60 border border-amber/40 rounded-2xl p-6">' +
          '<div class="flex items-center gap-2 mb-2"><span class="material-symbols-outlined text-amber">redeem</span>' +
          '<h3 class="font-bold text-antraciet text-lg">' + it.titel + "</h3></div>" +
          '<p class="text-sm text-antraciet/80 mb-3 leading-relaxed">' + it.tekst + "</p>" +
          '<p class="text-xs font-bold text-warmgrijs uppercase tracking-wide">' + (it.tot || "") + "</p></div>";
      });
      ha += "</div>";
      ac.innerHTML = ha;
    }

    // FAQ (vereist .acc-styling op de pagina)
    var fq = document.getElementById("pt-faq");
    if (fq && P.faq) {
      var hf = "";
      P.faq.forEach(function (it) {
        hf += '<details class="acc"><summary>' + it.vraag +
          ' <span class="material-symbols-outlined">expand_more</span></summary>' +
          '<div class="body">' + it.antwoord + "</div></details>";
      });
      fq.innerHTML = hf;
    }

    // Socials (footer) — toont enkel chips; aanklikbaar zodra er een url is
    var sc = document.querySelectorAll(".pt-socials");
    if (sc.length && P.socials) {
      var hs = P.socials.map(function (s) {
        var base = 'class="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 transition-colors';
        return s.url
          ? '<a href="' + s.url + '" target="_blank" rel="noopener" ' + base + ' hover:bg-white/10 hover:text-creme">' + s.naam + "</a>"
          : '<span ' + base + ' opacity-50" title="Binnenkort">' + s.naam + "</span>";
      }).join(" ");
      for (var i = 0; i < sc.length; i++) sc[i].innerHTML = hs;
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
