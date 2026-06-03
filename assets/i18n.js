/* ====================================================================
   Portisol — meertaligheid (NL · FR · DE)
   Lichte client-side i18n voor een statische site, zonder build-stap.
   - Voegt een taalschakelaar toe in de nav.
   - Vertaalt tekstnodes + enkele attributen op basis van de NL-brontekst.
   - Zinnen met inline opmaak (<b>) krijgen een volledige override via
     het data-i18n="..."-attribuut op het element (zie TH hieronder).
   Nieuwe tekst toevoegen? Zet de NL-zin als sleutel in T (of TH) met fr/de.
   ==================================================================== */
(function () {
  "use strict";

  /* ---- 1. Woordenboek: NL-brontekst -> { fr, de } -------------------- */
  const T = {
    /* Navigatie + algemeen */
    "Onze poorten": { fr: "Nos portes", de: "Unsere Tore" },
    "Screens & rolluiken": { fr: "Screens & volets", de: "Screens & Rollläden" },
    "Werkwijze": { fr: "Méthode", de: "Ablauf" },
    "Waarom Portisol": { fr: "Pourquoi Portisol", de: "Warum Portisol" },
    "Offerte aanvragen": { fr: "Demander un devis", de: "Angebot anfragen" },

    /* Home — hero */
    "Volledig op maat · eigen plaatsing": { fr: "Entièrement sur mesure · pose en propre", de: "Komplett maßgefertigt · eigene Montage" },
    "Jouw garagepoort,": { fr: "Votre porte de garage,", de: "Ihr Garagentor," },
    "precies op maat": { fr: "précisément sur mesure", de: "exakt nach Maß" },
    "gemaakt en geplaatst.": { fr: "fabriquée et posée.", de: "gefertigt und montiert." },
    "Ontvang direct een transparante offerte. Wij faciliteren alles van inmeting tot betaling via QR en planning op jouw gewenste datum. Vakmanschap zoals het hoort.":
      { fr: "Recevez immédiatement un devis transparent. Nous facilitons tout, de la prise de mesures au paiement par QR et à la planification à la date de votre choix. Le savoir-faire comme il se doit.",
        de: "Erhalten Sie sofort ein transparentes Angebot. Wir kümmern uns um alles, vom Aufmaß über die Zahlung per QR-Code bis zur Terminplanung an Ihrem Wunschtermin. Handwerk, wie es sein soll." },
    "Zo werkt het": { fr: "Comment ça marche", de: "So funktioniert's" },
    "Jij meet, wij plaatsen": { fr: "Vous mesurez, nous posons", de: "Sie messen, wir montieren" },
    "Eigen monteurs": { fr: "Nos propres monteurs", de: "Eigene Monteure" },
    "5 jaar garantie": { fr: "5 ans de garantie", de: "5 Jahre Garantie" },
    "Op Maat": { fr: "Sur mesure", de: "Maßanfertigung" },
    '"Fantastische afwerking en precies volgens afspraak geleverd."':
      { fr: "« Finition fantastique et livrée exactement comme convenu. »",
        de: "„Fantastische Verarbeitung und genau wie vereinbart geliefert.“" },

    /* Home — poorttypes */
    "Onze Collectie": { fr: "Notre collection", de: "Unsere Kollektion" },
    "Elk type, elke maat": { fr: "Chaque type, chaque dimension", de: "Jeder Typ, jedes Maß" },
    "Vind de perfecte afsluiting voor jouw woning. Al onze poorten worden volledig op maat vervaardigd in onze Belgische werkplaats.":
      { fr: "Trouvez la fermeture parfaite pour votre habitation. Toutes nos portes sont fabriquées entièrement sur mesure dans notre atelier belge.",
        de: "Finden Sie den perfekten Abschluss für Ihr Zuhause. Alle unsere Tore werden vollständig nach Maß in unserer belgischen Werkstatt gefertigt." },
    "Sectionaalpoorten": { fr: "Portes sectionnelles", de: "Sektionaltore" },
    "De meest populaire keuze. Optimaal ruimtegebruik en uitstekende isolatie.":
      { fr: "Le choix le plus populaire. Gain de place optimal et excellente isolation.",
        de: "Die beliebteste Wahl. Optimale Raumnutzung und hervorragende Isolierung." },
    "Meer info": { fr: "Plus d'infos", de: "Mehr Infos" },
    "Kanteldeuren": { fr: "Portes basculantes", de: "Schwingtore" },
    "Klassiek, degelijk en uiterst betrouwbaar. Beschikbaar in talloze stijlen.":
      { fr: "Classiques, solides et extrêmement fiables. Disponibles dans de nombreux styles.",
        de: "Klassisch, solide und äußerst zuverlässig. In zahlreichen Stilen erhältlich." },
    "Rolpoorten": { fr: "Portes enroulables", de: "Rolltore" },
    "Ideaal wanneer het plafond vrij moet blijven voor verlichting of berging.":
      { fr: "Idéales lorsque le plafond doit rester libre pour l'éclairage ou le rangement.",
        de: "Ideal, wenn die Decke für Beleuchtung oder Stauraum frei bleiben soll." },
    "Zijwaartse poorten": { fr: "Portes latérales", de: "Seitlich öffnende Tore" },
    "Handig als loopdeur-functie en bij lage plafondhoogtes.":
      { fr: "Pratiques comme fonction de porte de service et pour les faibles hauteurs sous plafond.",
        de: "Praktisch als Schlupftür-Funktion und bei geringen Deckenhöhen." },

    /* Home — proces */
    "In 4 stappen geregeld": { fr: "Réglé en 4 étapes", de: "In 4 Schritten erledigt" },
    "Vul je gegevens in en ontvang direct een schatting.":
      { fr: "Remplissez vos données et recevez aussitôt une estimation.",
        de: "Geben Sie Ihre Daten ein und erhalten Sie sofort eine Schätzung." },
    "Jij meet op": { fr: "Vous prenez les mesures", de: "Sie messen aus" },
    "Wij voorzien een eenvoudige gids voor de juiste maten.":
      { fr: "Nous fournissons un guide simple pour des mesures correctes.",
        de: "Wir stellen eine einfache Anleitung für die richtigen Maße bereit." },
    "Betalen & inplannen": { fr: "Payer & planifier", de: "Bezahlen & planen" },
    "Kies je datum en betaal veilig via QR.":
      { fr: "Choisissez votre date et payez en toute sécurité via QR.",
        de: "Wählen Sie Ihr Datum und zahlen Sie sicher per QR-Code." },
    "Plaatsing": { fr: "Pose", de: "Montage" },
    "Onze monteurs komen langs voor een vlekkeloze installatie.":
      { fr: "Nos monteurs interviennent pour une installation impeccable.",
        de: "Unsere Monteure sorgen für eine tadellose Installation." },

    /* Home — waarom */
    "Vakwerk zonder verrassingen": { fr: "Du travail soigné, sans surprises", de: "Facharbeit ohne Überraschungen" },
    "Jarenlange ervaring": { fr: "Des années d'expérience", de: "Langjährige Erfahrung" },
    "Onze experts kennen elke poort door en door.":
      { fr: "Nos experts connaissent chaque porte sur le bout des doigts.",
        de: "Unsere Experten kennen jedes Tor in- und auswendig." },
    "Echt op maat": { fr: "Vraiment sur mesure", de: "Echt nach Maß" },
    "Geen standaardmaten, alles is uniek.":
      { fr: "Pas de dimensions standard, tout est unique.", de: "Keine Standardmaße, alles ist einzigartig." },
    "Eerlijke prijs": { fr: "Prix honnête", de: "Fairer Preis" },
    "Transparante offertes zonder extra kosten.":
      { fr: "Des devis transparents sans frais supplémentaires.", de: "Transparente Angebote ohne Zusatzkosten." },
    "Één aanspreekpunt": { fr: "Un seul interlocuteur", de: "Ein Ansprechpartner" },
    "Persoonlijk contact van begin tot eind.":
      { fr: "Un contact personnel du début à la fin.", de: "Persönlicher Kontakt von Anfang bis Ende." },
    "Vlotte planning": { fr: "Planification fluide", de: "Reibungslose Planung" },
    "Wij werken efficiënt en volgens afspraak.":
      { fr: "Nous travaillons efficacement et selon les accords convenus.", de: "Wir arbeiten effizient und wie vereinbart." },
    "Zorgeloos genieten van uw nieuwe poort.":
      { fr: "Profitez de votre nouvelle porte en toute sérénité.", de: "Genießen Sie Ihr neues Tor ganz sorgenfrei." },
    "Jaar Ervaring": { fr: "Ans d'expérience", de: "Jahre Erfahrung" },

    /* Home — DIY screens */
    "Nieuw · doe-het-zelf": { fr: "Nouveau · à faire soi-même", de: "Neu · zum Selbermachen" },
    "Zonwering op zonne-energie,": { fr: "Une protection solaire alimentée par le soleil,", de: "Solarbetriebener Sonnenschutz," },
    "zonder gedoe.": { fr: "sans tracas.", de: "ohne Aufwand." },
    "Premium zip-screens op zonne-energie, met tot 45 dagen autonomie: geen kabels trekken en geen breekwerk. Het screendoek filtert tot 97% van de zonnewarmte en is tot 6× efficiënter dan binnenzonwering. Met ingebouwde horfunctie, keuze uit alle RAL-kleuren en aan huis geleverd voor een vlotte montage.":
      { fr: "Des zip-screens premium à énergie solaire, avec jusqu'à 45 jours d'autonomie : aucun câble à tirer, aucun travail de percement. La toile filtre jusqu'à 97 % de la chaleur solaire et est jusqu'à 6× plus efficace qu'une protection solaire intérieure. Avec fonction moustiquaire intégrée, choix parmi toutes les couleurs RAL et livraison à domicile pour un montage facile.",
        de: "Premium-Zip-Screens mit Solarenergie und bis zu 45 Tagen Autonomie: kein Kabelziehen, keine Stemmarbeiten. Das Screen-Gewebe filtert bis zu 97 % der Sonnenwärme und ist bis zu 6× effizienter als innenliegender Sonnenschutz. Mit integrierter Insektenschutzfunktion, Auswahl aus allen RAL-Farben und Lieferung nach Hause für eine einfache Montage." },
    "Op zonne-energie": { fr: "À énergie solaire", de: "Mit Solarenergie" },
    "Tot 97% zonwering": { fr: "Jusqu'à 97 % de protection solaire", de: "Bis zu 97 % Sonnenschutz" },
    "2 jaar garantie": { fr: "2 ans de garantie", de: "2 Jahre Garantie" },
    "Stel samen & bekijk prijs": { fr: "Composez & voyez le prix", de: "Konfigurieren & Preis ansehen" },

    /* Home — comfort */
    "Comfort van binnenuit": { fr: "Le confort de l'intérieur", de: "Komfort von innen" },
    "Hou de hitte buiten,": { fr: "Gardez la chaleur dehors,", de: "Halten Sie die Hitze draußen," },
    "het zicht binnen.": { fr: "la vue à l'intérieur.", de: "den Ausblick drinnen." },
    "De screen vangt de zonnewarmte op vóór ze je raam bereikt, terwijl je helder naar buiten blijft kijken. Aangenaam koel in de zomer, zacht gefilterd licht, en 's avonds extra privacy.":
      { fr: "Le screen capte la chaleur solaire avant qu'elle n'atteigne votre fenêtre, tout en vous laissant une vue claire vers l'extérieur. Agréablement frais en été, une lumière douce et filtrée, et plus d'intimité le soir.",
        de: "Der Screen fängt die Sonnenwärme ab, bevor sie Ihr Fenster erreicht, während Sie klar nach draußen blicken. Angenehm kühl im Sommer, sanft gefiltertes Licht und abends zusätzliche Privatsphäre." },
    "Tot 6× efficiënter dan binnenzonwering":
      { fr: "Jusqu'à 6× plus efficace qu'une protection solaire intérieure", de: "Bis zu 6× effizienter als innenliegender Sonnenschutz" },
    "Helder zicht naar buiten behouden":
      { fr: "Conservez une vue claire vers l'extérieur", de: "Klare Sicht nach draußen behalten" },
    "Ingebouwde horfunctie tegen insecten":
      { fr: "Fonction moustiquaire intégrée contre les insectes", de: "Integrierte Insektenschutzfunktion gegen Insekten" },

    /* Home — CTA */
    "Klaar voor jouw nieuwe garagepoort?":
      { fr: "Prêt pour votre nouvelle porte de garage ?", de: "Bereit für Ihr neues Garagentor?" },
    "Vraag vrijblijvend je offerte aan, je krijgt binnen 2 werkdagen antwoord.":
      { fr: "Demandez votre devis sans engagement, vous recevez une réponse sous 2 jours ouvrables.",
        de: "Fordern Sie unverbindlich Ihr Angebot an, Sie erhalten innerhalb von 2 Werktagen eine Antwort." },

    /* Footer (gedeeld) */
    "Vakmanschap in elke beweging.": { fr: "Le savoir-faire dans chaque mouvement.", de: "Handwerkskunst in jeder Bewegung." },
    "Navigatie": { fr: "Navigation", de: "Navigation" },
    "Contact": { fr: "Contact", de: "Kontakt" },
    "Openingsuren": { fr: "Heures d'ouverture", de: "Öffnungszeiten" },
    "Lokeren, België": { fr: "Lokeren, Belgique", de: "Lokeren, Belgien" },
    "Ma - Vr:": { fr: "Lun - Ven :", de: "Mo - Fr:" },
    "Za:": { fr: "Sam :", de: "Sa:" },
    "Zo:": { fr: "Dim :", de: "So:" },
    "Gesloten": { fr: "Fermé", de: "Geschlossen" },
    "© 2026 Portisol. Alle rechten voorbehouden.":
      { fr: "© 2026 Portisol. Tous droits réservés.", de: "© 2026 Portisol. Alle Rechte vorbehalten." },
    "Privacybeleid": { fr: "Politique de confidentialité", de: "Datenschutz" },
    "Algemene Voorwaarden": { fr: "Conditions générales", de: "AGB" },
    "Cookies": { fr: "Cookies", de: "Cookies" },
    "Concept · nog niet publiek": { fr: "Concept · pas encore public", de: "Konzept · noch nicht öffentlich" },

    /* Offerte — hero + tabs */
    "Prijs & offerte": { fr: "Prix & devis", de: "Preis & Angebot" },
    "Wat heb je nodig?": { fr: "De quoi avez-vous besoin ?", de: "Was benötigen Sie?" },
    "Een garagepoort op maat plaatsen we zelf, daarvoor maken we een offerte. Screens en rolluiken bereken je hier meteen zelf.":
      { fr: "Une porte de garage sur mesure, nous la posons nous-mêmes ; pour cela, nous établissons un devis. Les screens et volets, vous les calculez vous-même ici, immédiatement.",
        de: "Ein maßgefertigtes Garagentor montieren wir selbst, dafür erstellen wir ein Angebot. Screens und Rollläden berechnen Sie hier direkt selbst." },
    "Garagepoort op maat": { fr: "Porte de garage sur mesure", de: "Garagentor nach Maß" },
    "Offerte · mét plaatsing": { fr: "Devis · avec pose", de: "Angebot · mit Montage" },
    "Direct richtprijs · zelf plaatsen": { fr: "Prix indicatif immédiat · pose soi-même", de: "Sofort-Richtpreis · Selbstmontage" },

    /* Offerte — meethulp */
    "Meethulp": { fr: "Aide à la mesure", de: "Messhilfe" },
    "Breedte (B)": { fr: "Largeur (L)", de: "Breite (B)" },
    "Hoogte (H)": { fr: "Hauteur (H)", de: "Höhe (H)" },
    "vloer / dorpel": { fr: "sol / seuil", de: "Boden / Schwelle" },
    "Zo meet je zelf op": { fr: "Comment mesurer soi-même", de: "So messen Sie selbst aus" },
    "✓ Bedankt! Je aanvraag is verstuurd. We bekijken alles en contacteren je binnen 2 werkdagen met je offerte op maat.":
      { fr: "✓ Merci ! Votre demande a été envoyée. Nous examinons le tout et vous contactons sous 2 jours ouvrables avec votre devis sur mesure.",
        de: "✓ Danke! Ihre Anfrage wurde gesendet. Wir prüfen alles und kontaktieren Sie innerhalb von 2 Werktagen mit Ihrem maßgeschneiderten Angebot." },

    /* Offerte — formulier poort */
    "Jouw poort": { fr: "Votre porte", de: "Ihr Tor" },
    "Type poort": { fr: "Type de porte", de: "Tor-Typ" },
    "Maak een keuze…": { fr: "Faites un choix…", de: "Bitte wählen…" },
    "Sectionaalpoort": { fr: "Porte sectionnelle", de: "Sektionaltor" },
    "Kanteldeur": { fr: "Porte basculante", de: "Schwingtor" },
    "Rolpoort": { fr: "Porte enroulable", de: "Rolltor" },
    "Zijwaartse poort": { fr: "Porte latérale", de: "Seitlich öffnendes Tor" },
    "Weet ik nog niet / advies gewenst": { fr: "Je ne sais pas encore / conseil souhaité", de: "Weiß ich noch nicht / Beratung erwünscht" },
    "Uitzicht panelen": { fr: "Aspect des panneaux", de: "Paneel-Optik" },
    "Vlak (glad)": { fr: "Plat (lisse)", de: "Glatt (eben)" },
    "Cassette": { fr: "Cassette", de: "Kassette" },
    "Gelijnd": { fr: "Rainuré", de: "Sicke (gerillt)" },
    "Woodgrain (houtstructuur)": { fr: "Woodgrain (aspect bois)", de: "Woodgrain (Holzstruktur)" },
    "Geen voorkeur": { fr: "Pas de préférence", de: "Keine Präferenz" },
    "Breedte opening": { fr: "Largeur de l'ouverture", de: "Breite der Öffnung" },
    "Hoogte opening": { fr: "Hauteur de l'ouverture", de: "Höhe der Öffnung" },
    "Kleur": { fr: "Couleur", de: "Farbe" },
    "Wit (standaard)": { fr: "Blanc (standard)", de: "Weiß (Standard)" },
    "Antraciet (standaard)": { fr: "Anthracite (standard)", de: "Anthrazit (Standard)" },
    "Andere RAL-kleur (meerprijs)": { fr: "Autre couleur RAL (supplément)", de: "Andere RAL-Farbe (Aufpreis)" },
    "RAL-code": { fr: "Code RAL", de: "RAL-Code" },
    "(bij andere kleur)": { fr: "(pour autre couleur)", de: "(bei anderer Farbe)" },
    "Opties": { fr: "Options", de: "Optionen" },
    "(meerdere mogelijk)": { fr: "(plusieurs possibles)", de: "(mehrere möglich)" },
    "Geïsoleerde panelen": { fr: "Panneaux isolés", de: "Isolierte Paneele" },
    "Loopdeur in poort": { fr: "Portillon intégré", de: "Schlupftür im Tor" },
    "Raampjes": { fr: "Hublots", de: "Fenster" },
    "Oude poort afbreken/afvoeren": { fr: "Démontage/évacuation de l'ancienne porte", de: "Altes Tor abbauen/entsorgen" },
    "Plaatsing op": { fr: "Pose sur", de: "Montage auf" },
    "Op de vloer": { fr: "Sur le sol", de: "Auf dem Boden" },
    "Op een dorpel": { fr: "Sur un seuil", de: "Auf einer Schwelle" },
    "Weet ik niet": { fr: "Je ne sais pas", de: "Weiß ich nicht" },
    "Gewenste periode": { fr: "Période souhaitée", de: "Gewünschter Zeitraum" },
    "Zo snel mogelijk": { fr: "Dès que possible", de: "So schnell wie möglich" },
    "Binnen 1 maand": { fr: "Sous 1 mois", de: "Innerhalb von 1 Monat" },
    "Binnen 2-3 maanden": { fr: "Sous 2-3 mois", de: "Innerhalb von 2-3 Monaten" },
    "Flexibel": { fr: "Flexible", de: "Flexibel" },
    "Foto's van je huidige garage": { fr: "Photos de votre garage actuel", de: "Fotos Ihrer aktuellen Garage" },
    "(optioneel, helpt enorm)": { fr: "(facultatif, très utile)", de: "(optional, hilft enorm)" },
    "📷 Klik om foto's toe te voegen of sleep ze hierheen":
      { fr: "📷 Cliquez pour ajouter des photos ou glissez-les ici", de: "📷 Klicken Sie, um Fotos hinzuzufügen, oder ziehen Sie sie hierher" },
    "JPG of PNG, max. 5 bestanden": { fr: "JPG ou PNG, max. 5 fichiers", de: "JPG oder PNG, max. 5 Dateien" },
    "Contactgegevens": { fr: "Coordonnées", de: "Kontaktdaten" },
    "Naam": { fr: "Nom", de: "Name" },
    "Telefoon": { fr: "Téléphone", de: "Telefon" },
    "E-mail": { fr: "E-mail", de: "E-Mail" },
    "Adres van de plaatsing": { fr: "Adresse de la pose", de: "Adresse der Montage" },
    "Extra info": { fr: "Infos supplémentaires", de: "Zusätzliche Infos" },
    "(optioneel)": { fr: "(facultatif)", de: "(optional)" },
    "Ik ga akkoord dat Portisol mijn gegevens gebruikt om deze aanvraag te behandelen.":
      { fr: "J'accepte que Portisol utilise mes données pour traiter cette demande.",
        de: "Ich bin damit einverstanden, dass Portisol meine Daten zur Bearbeitung dieser Anfrage verwendet." },
    "Offerte-aanvraag versturen →": { fr: "Envoyer la demande de devis →", de: "Angebotsanfrage senden →" },
    "Vrijblijvend · jij meet op · geen verplichtingen":
      { fr: "Sans engagement · vous mesurez · aucune obligation", de: "Unverbindlich · Sie messen · keine Verpflichtungen" },

    /* Offerte — configurator screens */
    "Ingebouwd zonnepaneel, geen bekabeling. Plaatsen zonder breekwerk of elektricien.":
      { fr: "Panneau solaire intégré, aucun câblage. Pose sans travaux de percement ni électricien.",
        de: "Integriertes Solarpanel, keine Verkabelung. Montage ohne Stemmarbeiten oder Elektriker." },
    "Zelf te plaatsen": { fr: "À poser soi-même", de: "Selbst zu montieren" },
    "Geleverd met montagegids. Klaar in een namiddag, met gewoon gereedschap.":
      { fr: "Livré avec guide de montage. Prêt en une après-midi, avec des outils ordinaires.",
        de: "Mit Montageanleitung geliefert. Fertig an einem Nachmittag, mit normalem Werkzeug." },
    "Op motor en doek/lamellen. Kwaliteitsmateriaal, ook al plaats je het zelf.":
      { fr: "Sur le moteur et la toile/les lames. Matériel de qualité, même en pose soi-même.",
        de: "Auf Motor und Tuch/Lamellen. Qualitätsmaterial, auch bei Selbstmontage." },
    "Product": { fr: "Produit", de: "Produkt" },
    "Screen (zonwering)": { fr: "Screen (protection solaire)", de: "Screen (Sonnenschutz)" },
    "Rolluik": { fr: "Volet roulant", de: "Rollladen" },
    "Breedte": { fr: "Largeur", de: "Breite" },
    "Hoogte": { fr: "Hauteur", de: "Höhe" },
    "Andere kleur (prijs op aanvraag)": { fr: "Autre couleur (prix sur demande)", de: "Andere Farbe (Preis auf Anfrage)" },
    "Aandrijving op zonne-energie standaard inbegrepen. Maximaal 4500 × 3500 mm.":
      { fr: "Motorisation à énergie solaire incluse de série. Maximum 4500 × 3500 mm.",
        de: "Solarbetriebener Antrieb serienmäßig inklusive. Maximal 4500 × 3500 mm." },
    "Richtprijs": { fr: "Prix indicatif", de: "Richtpreis" },
    "Oppervlakte": { fr: "Surface", de: "Fläche" },
    "Verkoop (excl. btw)": { fr: "Vente (hors TVA)", de: "Verkauf (exkl. MwSt.)" },
    "Btw 21%": { fr: "TVA 21 %", de: "MwSt. 21 %" },
    "☀️ Zonne-energie inbegrepen": { fr: "☀️ Énergie solaire incluse", de: "☀️ Solarenergie inklusive" },
    "✓ 2 jaar garantie": { fr: "✓ 2 ans de garantie", de: "✓ 2 Jahre Garantie" },
    "🚚 Levering aan huis": { fr: "🚚 Livraison à domicile", de: "🚚 Lieferung nach Hause" },
    "Bestellen →": { fr: "Commander →", de: "Bestellen →" },
    "Richtprijs inclusief zonne-aandrijving en levering. De definitieve prijs zie je bij het bestellen.":
      { fr: "Prix indicatif incluant la motorisation solaire et la livraison. Le prix définitif s'affiche lors de la commande.",
        de: "Richtpreis inklusive Solarantrieb und Lieferung. Den endgültigen Preis sehen Sie bei der Bestellung." },

    /* Voorbeeldofferte */
    "Voorbeeld": { fr: "Exemple", de: "Beispiel" },
    "Jouw persoonlijke offerte": { fr: "Votre devis personnalisé", de: "Ihr persönliches Angebot" },
    "Zo ziet een Portisol-offerte eruit: helder, met een betaal-QR voor het voorschot en een planner om meteen je plaatsingsdatum te kiezen.":
      { fr: "Voici à quoi ressemble un devis Portisol : clair, avec un QR de paiement pour l'acompte et un planificateur pour choisir tout de suite votre date de pose.",
        de: "So sieht ein Portisol-Angebot aus: übersichtlich, mit einem Zahlungs-QR für die Anzahlung und einem Planer, um sofort Ihren Montagetermin zu wählen." },
    "Poorten & Zonwering": { fr: "Portes & Protection solaire", de: "Tore & Sonnenschutz" },
    "Omschrijving": { fr: "Description", de: "Beschreibung" },
    "Aantal": { fr: "Quantité", de: "Menge" },
    "Prijs": { fr: "Prix", de: "Preis" },
    "Sectionaalpoort op maat": { fr: "Porte sectionnelle sur mesure", de: "Sektionaltor nach Maß" },
    "Geïsoleerde panelen · 280 × 215 cm · RAL 7016 antraciet":
      { fr: "Panneaux isolés · 280 × 215 cm · RAL 7016 anthracite", de: "Isolierte Paneele · 280 × 215 cm · RAL 7016 anthrazit" },
    "Elektrische motor + 2 afstandsbedieningen": { fr: "Moteur électrique + 2 télécommandes", de: "Elektromotor + 2 Fernbedienungen" },
    "Afbraak en afvoer oude poort": { fr: "Démontage et évacuation de l'ancienne porte", de: "Abbau und Entsorgung des alten Tors" },
    "Plaatsing en afwerking": { fr: "Pose et finition", de: "Montage und Endbearbeitung" },
    "Subtotaal (excl. btw)": { fr: "Sous-total (hors TVA)", de: "Zwischensumme (exkl. MwSt.)" },
    "Btw 6%": { fr: "TVA 6 %", de: "MwSt. 6 %" },
    "(renovatie >10 j)": { fr: "(rénovation >10 ans)", de: "(Renovierung >10 J.)" },
    "Totaal": { fr: "Total", de: "Gesamt" },
    "1 · Voorschot betalen": { fr: "1 · Payer l'acompte", de: "1 · Anzahlung leisten" },
    "Scan met je bank-app. Voorschot 30%:": { fr: "Scannez avec votre application bancaire. Acompte 30 % :", de: "Mit Ihrer Banking-App scannen. Anzahlung 30 %:" },
    "Mededeling:": { fr: "Communication :", de: "Verwendungszweck:" },
    "Saldo € 2.374,40 bij plaatsing.": { fr: "Solde 2.374,40 € à la pose.", de: "Restbetrag 2.374,40 € bei Montage." },
    "2 · Plaatsingsdatum kiezen": { fr: "2 · Choisir la date de pose", de: "2 · Montagetermin wählen" },
    "Kies een beschikbaar moment. Levertijd van de poort is ± 4 weken.":
      { fr: "Choisissez un créneau disponible. Le délai de livraison de la porte est d'± 4 semaines.",
        de: "Wählen Sie einen verfügbaren Termin. Die Lieferzeit des Tors beträgt ± 4 Wochen." },
    "voormiddag": { fr: "matin", de: "Vormittag" },
    "namiddag": { fr: "après-midi", de: "Nachmittag" },
    "Datum bevestigen": { fr: "Confirmer la date", de: "Termin bestätigen" },
    "Dit is een voorbeeldofferte. De QR-code is een echte SEPA-betaalcode (EPC) met testgegevens, scanbaar door elke Belgische bank-app. Betaling en planning koppelen we in de praktijk aan je boekhoud- en agenda-systeem.":
      { fr: "Ceci est un devis d'exemple. Le QR code est un véritable code de paiement SEPA (EPC) avec des données de test, scannable par toute application bancaire belge. Dans la pratique, nous relions le paiement et la planification à votre système comptable et d'agenda.",
        de: "Dies ist ein Beispielangebot. Der QR-Code ist ein echter SEPA-Zahlungscode (EPC) mit Testdaten, scanbar mit jeder belgischen Banking-App. In der Praxis verknüpfen wir Zahlung und Planung mit Ihrem Buchhaltungs- und Kalendersystem." },

    /* Placeholders */
    "bv. 280": { fr: "p. ex. 280", de: "z. B. 280" },
    "bv. 215": { fr: "p. ex. 215", de: "z. B. 215" },
    "bv. RAL 9016": { fr: "p. ex. RAL 9016", de: "z. B. RAL 9016" },
    "Voor- en achternaam": { fr: "Prénom et nom", de: "Vor- und Nachname" },
    "jij@voorbeeld.be": { fr: "vous@exemple.be", de: "sie@beispiel.de" },
    "Straat, nr, postcode, gemeente": { fr: "Rue, n°, code postal, commune", de: "Straße, Nr., PLZ, Ort" },
    "Vertel ons gerust meer over je situatie of wensen…":
      { fr: "N'hésitez pas à nous en dire plus sur votre situation ou vos souhaits…",
        de: "Erzählen Sie uns gerne mehr über Ihre Situation oder Wünsche…" },

    /* Configurator (Stel samen) — hero + nav */
    "Stel samen": { fr: "Composez", de: "Konfigurieren" },
    "Stel samen & bekijk je richtprijs": { fr: "Composez & voyez votre prix indicatif", de: "Konfigurieren & Richtpreis ansehen" },
    "Ontwerp jouw oplossing op maat": { fr: "Concevez votre solution sur mesure", de: "Gestalten Sie Ihre Lösung nach Maß" },
    "Garagepoort, screen, rolluik of hor: kies je product, pas alles aan en zie het meteen veranderen. Helemaal op maat, met een richtprijs.":
      { fr: "Porte de garage, screen, volet ou moustiquaire : choisissez votre produit, personnalisez tout et voyez le résultat changer en direct. Entièrement sur mesure, avec un prix indicatif.",
        de: "Garagentor, Screen, Rollladen oder Insektenschutz: Wählen Sie Ihr Produkt, passen Sie alles an und sehen Sie die Änderung sofort. Komplett nach Maß, mit Richtpreis." },

    /* Configurator — categoriekaarten */
    "Garagepoort": { fr: "Porte de garage", de: "Garagentor" },
    "Op maat · mét plaatsing": { fr: "Sur mesure · avec pose", de: "Nach Maß · mit Montage" },
    "Solar screen": { fr: "Solar screen", de: "Solar-Screen" },
    "Zonwering · zelf plaatsen": { fr: "Protection solaire · pose soi-même", de: "Sonnenschutz · Selbstmontage" },
    "Op zonne-energie · zelf plaatsen": { fr: "À énergie solaire · pose soi-même", de: "Mit Solarenergie · Selbstmontage" },
    "Hor / vliegenraam": { fr: "Moustiquaire", de: "Insektenschutz" },
    "Tegen insecten · zelf plaatsen": { fr: "Contre les insectes · pose soi-même", de: "Gegen Insekten · Selbstmontage" },
    "Zelf plaatsen": { fr: "Pose soi-même", de: "Selbstmontage" },

    /* Configurator — bedieningen */
    "Sectionaal": { fr: "Sectionnelle", de: "Sektional" },
    "Zijwaarts": { fr: "Latérale", de: "Seitlich" },
    "Vlak": { fr: "Plat", de: "Glatt" },
    "Woodgrain": { fr: "Woodgrain", de: "Woodgrain" },
    "Type hor": { fr: "Type de moustiquaire", de: "Insektenschutz-Typ" },
    "Vaste hor": { fr: "Moustiquaire fixe", de: "Festes Insektengitter" },
    "Plissé": { fr: "Plissé", de: "Plissee" },
    "Oprolbaar": { fr: "Enroulable", de: "Aufrollbar" },
    "Draaideur": { fr: "Porte battante", de: "Drehtür" },
    "Schuifdeur": { fr: "Porte coulissante", de: "Schiebetür" },
    "Plissé hor": { fr: "Moustiquaire plissée", de: "Plissee-Insektenschutz" },
    "Oprolbare hor": { fr: "Moustiquaire enroulable", de: "Aufrollbarer Insektenschutz" },
    "Hordeur (draai)": { fr: "Porte moustiquaire (battante)", de: "Insektenschutztür (Dreh)" },
    "Hordeur (schuif)": { fr: "Porte moustiquaire (coulissante)", de: "Insektenschutztür (Schiebe)" },
    "Ramen": { fr: "Hublots", de: "Fenster" },
    "Rij raampjes bovenaan": { fr: "Rangée de hublots en haut", de: "Fensterreihe oben" },
    "Muur / omgeving": { fr: "Mur / environnement", de: "Wand / Umgebung" },
    "Pleister": { fr: "Crépi", de: "Putz" },
    "Baksteen": { fr: "Brique", de: "Ziegel" },
    "Beton": { fr: "Béton", de: "Beton" },
    "Afmeting (cm)": { fr: "Dimensions (cm)", de: "Maße (cm)" },
    "Kleur (kader)": { fr: "Couleur (cadre)", de: "Farbe (Rahmen)" },
    "RAL op maat": { fr: "RAL sur mesure", de: "RAL nach Maß" },

    /* Configurator — badges */
    "⚙️ Gemotoriseerd": { fr: "⚙️ Motorisé", de: "⚙️ Motorisiert" },
    "Met ramen": { fr: "Avec hublots", de: "Mit Fenstern" },
    "Zonder ramen": { fr: "Sans hublots", de: "Ohne Fenster" },
    "Zip-screen": { fr: "Zip-screen", de: "Zip-Screen" },
    "☀️ Op zonne-energie": { fr: "☀️ À énergie solaire", de: "☀️ Mit Solarenergie" },
    "🦟 Tegen insecten": { fr: "🦟 Contre les insectes", de: "🦟 Gegen Insekten" },
    "DIY": { fr: "DIY", de: "DIY" },

    /* Configurator — prijs + notes */
    "Richtprijs incl. plaatsing & motor": { fr: "Prix indicatif pose & moteur incl.", de: "Richtpreis inkl. Montage & Motor" },
    "Richtprijs · zelf plaatsen": { fr: "Prix indicatif · pose soi-même", de: "Richtpreis · Selbstmontage" },
    "Richtprijs incl. plaatsing &amp; motor · incl. 6% btw. Definitieve prijs na controle van de maten.":
      { fr: "Prix indicatif pose &amp; moteur inclus · TVA 6 % incl. Prix définitif après contrôle des mesures.",
        de: "Richtpreis inkl. Montage &amp; Motor · inkl. 6 % MwSt. Endpreis nach Maßkontrolle." },
    "Richtprijs · zip-screen op zonne-energie · zelf plaatsen · incl. 21% btw.":
      { fr: "Prix indicatif · zip-screen à énergie solaire · pose soi-même · TVA 21 % incl.",
        de: "Richtpreis · Zip-Screen mit Solarenergie · Selbstmontage · inkl. 21 % MwSt." },
    "Richtprijs · op zonne-energie · zelf plaatsen · incl. 21% btw.":
      { fr: "Prix indicatif · à énergie solaire · pose soi-même · TVA 21 % incl.",
        de: "Richtpreis · mit Solarenergie · Selbstmontage · inkl. 21 % MwSt." },
    "Richtprijs · zelf plaatsen · incl. 21% btw.":
      { fr: "Prix indicatif · pose soi-même · TVA 21 % incl.",
        de: "Richtpreis · Selbstmontage · inkl. 21 % MwSt." },
    "excl.": { fr: "hors", de: "exkl." },
    "btw": { fr: "TVA", de: "MwSt." },

    /* Configurator — open/sluit */
    "Open de poort": { fr: "Ouvrir la porte", de: "Tor öffnen" },
    "Sluit de poort": { fr: "Fermer la porte", de: "Tor schließen" },
    "Schuif omhoog": { fr: "Remonter", de: "Hochfahren" },
    "Laat zakken": { fr: "Descendre", de: "Herunterfahren" },

    /* Configurator — aanvraagformulier */
    "Neem deze samenstelling over in mijn aanvraag ↓": { fr: "Reprendre cette configuration dans ma demande ↓", de: "Diese Konfiguration in meine Anfrage übernehmen ↓" },
    "Vraag je offerte aan": { fr: "Demandez votre devis", de: "Fordern Sie Ihr Angebot an" },
    "Vraag je offerte aan →": { fr: "Demandez votre devis →", de: "Angebot anfragen →" },
    "Jouw samenstelling": { fr: "Votre configuration", de: "Ihre Konfiguration" },
    "Adres": { fr: "Adresse", de: "Adresse" },
    "Aanvraag versturen →": { fr: "Envoyer la demande →", de: "Anfrage senden →" },
    "Vrijblijvend · geen verplichtingen": { fr: "Sans engagement · aucune obligation", de: "Unverbindlich · keine Verpflichtungen" },
    "✓ Bedankt! Je aanvraag is verstuurd. We bekijken je samenstelling en contacteren je binnen 2 werkdagen met een offerte op maat.":
      { fr: "✓ Merci ! Votre demande a été envoyée. Nous examinons votre configuration et vous contactons sous 2 jours ouvrables avec un devis sur mesure.",
        de: "✓ Danke! Ihre Anfrage wurde gesendet. Wir prüfen Ihre Konfiguration und kontaktieren Sie innerhalb von 2 Werktagen mit einem maßgeschneiderten Angebot." },

    /* Configurator — samenvatting (kleinletter) */
    "wit": { fr: "blanc", de: "weiß" },
    "antraciet": { fr: "anthracite", de: "anthrazit" },
    "met ramen": { fr: "avec hublots", de: "mit Fenstern" },

    /* Home — sectie Screens, rolluiken & horren */
    "Screens, rolluiken": { fr: "Screens, volets", de: "Screens, Rollläden" },
    "& horren.": { fr: "& moustiquaires.", de: "& Insektenschutz." },
    "Premium oplossingen op zonne-energie die je zelf plaatst, zonder kabels trekken of breekwerk. Op maat geleverd en klaar in een namiddag, met gewoon gereedschap.":
      { fr: "Des solutions premium à énergie solaire que vous posez vous-même, sans tirer de câbles ni travaux de percement. Livrées sur mesure et prêtes en une après-midi, avec des outils ordinaires.",
        de: "Premium-Lösungen mit Solarenergie, die Sie selbst montieren, ohne Kabelziehen oder Stemmarbeiten. Maßgefertigt geliefert und an einem Nachmittag fertig, mit normalem Werkzeug." },
    "Solar screens": { fr: "Solar screens", de: "Solar-Screens" },
    "Tot 97% van de zonnewarmte buiten, met helder zicht naar buiten.":
      { fr: "Jusqu'à 97 % de la chaleur solaire dehors, avec une vue claire vers l'extérieur.",
        de: "Bis zu 97 % der Sonnenwärme draußen, mit klarer Sicht nach außen." },
    "Verduistering, isolatie en extra veiligheid. Op zonne-energie en stil.":
      { fr: "Occultation, isolation et sécurité supplémentaire. À énergie solaire et silencieux.",
        de: "Verdunkelung, Isolierung und extra Sicherheit. Mit Solarenergie und leise." },
    "Frisse lucht zonder insecten of pollen. Op maat: vast, plissé of als deur.":
      { fr: "De l'air frais sans insectes ni pollen. Sur mesure : fixe, plissé ou en porte.",
        de: "Frische Luft ohne Insekten oder Pollen. Nach Maß: fest, Plissee oder als Tür." },

    /* Home — sectie Team */
    "Het team": { fr: "L'équipe", de: "Das Team" },
    "Het team achter Portisol": { fr: "L'équipe derrière Portisol", de: "Das Team hinter Portisol" },
    "Bij Portisol weet je met wie je werkt: een klein, gedreven team met jarenlange ervaring dat je van offerte tot plaatsing persoonlijk begeleidt.":
      { fr: "Chez Portisol, vous savez avec qui vous travaillez : une petite équipe motivée avec des années d'expérience qui vous accompagne personnellement, du devis à la pose.",
        de: "Bei Portisol wissen Sie, mit wem Sie arbeiten: ein kleines, engagiertes Team mit langjähriger Erfahrung, das Sie vom Angebot bis zur Montage persönlich begleitet." },

    /* Promobanner */
    "Breng een klant aan en ontvang € 100 korting op je nieuwe poort.":
      { fr: "Parrainez un client et recevez 100 € de réduction sur votre nouvelle porte.",
        de: "Empfehlen Sie einen Kunden und erhalten Sie 100 € Rabatt auf Ihr neues Tor." },
    "Bekijk de actie": { fr: "Voir l'offre", de: "Zur Aktion" },

    /* Detailpagina's poorttypes — structuur */
    "Home": { fr: "Accueil", de: "Startseite" },
    "Alle details": { fr: "Tous les détails", de: "Alle Details" },

    /* Detailpagina's — intro's */
    "De meest populaire keuze: optimaal ruimtegebruik, uitstekende isolatie en eindeloos personaliseerbaar. De poort opent verticaal langs het plafond, zodat de zijmuren vrij blijven.":
      { fr: "Le choix le plus populaire : gain de place optimal, excellente isolation et personnalisation infinie. La porte s'ouvre verticalement le long du plafond, laissant les murs latéraux libres.",
        de: "Die beliebteste Wahl: optimale Raumnutzung, hervorragende Isolierung und endlose Personalisierung. Das Tor öffnet vertikal entlang der Decke, sodass die Seitenwände frei bleiben." },
    "De klassieke, betrouwbare keuze. De poort kantelt in één vlak geheel vlot en geruisloos verticaal onder het plafond. Degelijk, duurzaam en verkrijgbaar in talloze designs.":
      { fr: "Le choix classique et fiable. La porte bascule d'un seul tenant, en douceur et silencieusement, verticalement sous le plafond. Solide, durable et disponible dans de nombreux designs.",
        de: "Die klassische, zuverlässige Wahl. Das Tor schwingt als ein Element sanft und geräuschlos vertikal unter die Decke. Solide, langlebig und in zahlreichen Designs erhältlich." },
    "Ideaal wanneer het plafond en de muren vrij moeten blijven. De lamellen rollen op in een compacte aluminium kast bovenaan, zodat je maximaal ruimte wint, binnen én voor de garage.":
      { fr: "Idéal lorsque le plafond et les murs doivent rester libres. Les lames s'enroulent dans un coffre en aluminium compact en haut, pour un gain de place maximal, dans et devant le garage.",
        de: "Ideal, wenn Decke und Wände frei bleiben müssen. Die Lamellen rollen sich oben in einem kompakten Aluminiumkasten auf, für maximalen Platzgewinn, in und vor der Garage." },
    "Het slimme alternatief: de poort schuift zijwaarts open in plaats van omhoog. Zo blijft het plafond volledig vrij, en kun je ze deels openen als doorgang, ideaal bij lage plafonds.":
      { fr: "L'alternative astucieuse : la porte s'ouvre latéralement au lieu de monter. Le plafond reste entièrement libre et vous pouvez l'ouvrir partiellement comme passage, idéal pour les plafonds bas.",
        de: "Die clevere Alternative: Das Tor öffnet seitlich statt nach oben. Die Decke bleibt komplett frei und es lässt sich teilweise als Durchgang öffnen, ideal bei niedrigen Decken." },

    /* Detailpagina's — kernspecs */
    "Gemotoriseerd": { fr: "Motorisé", de: "Motorisiert" },
    "40 mm isolatie": { fr: "Isolation 40 mm", de: "40 mm Isolierung" },
    "Sandwichpanelen met PU-schuim": { fr: "Panneaux sandwich avec mousse PU", de: "Sandwichpaneele mit PU-Schaum" },
    "Geïsoleerde sandwichpanelen": { fr: "Panneaux sandwich isolés", de: "Isolierte Sandwichpaneele" },
    "Panelen met PU-schuim": { fr: "Panneaux avec mousse PU", de: "Paneele mit PU-Schaum" },
    "Tot 5,5 m breed": { fr: "Jusqu'à 5,5 m de large", de: "Bis 5,5 m breit" },
    "Tot 3,5 m breed": { fr: "Jusqu'à 3,5 m de large", de: "Bis 3,5 m breit" },
    "Tot 6 m breed": { fr: "Jusqu'à 6 m de large", de: "Bis 6 m breit" },
    "± 400 kleuren": { fr: "± 400 couleurs", de: "± 400 Farben" },
    "RAL + designs naar keuze": { fr: "RAL + designs au choix", de: "RAL + Designs nach Wahl" },
    "Geruisloze werking": { fr: "Fonctionnement silencieux", de: "Geräuschloser Betrieb" },
    "Vlotte, geruisloze kanteling": { fr: "Basculement fluide et silencieux", de: "Sanftes, geräuschloses Schwingen" },
    "Eenvoudig & geruisloos": { fr: "Simple et silencieux", de: "Einfach & geräuschlos" },
    "Eenvoudige bediening": { fr: "Commande simple", de: "Einfache Bedienung" },
    "Inbraakwerend": { fr: "Anti-effraction", de: "Einbruchhemmend" },
    "Obstakeldetectie + valstop": { fr: "Détection d'obstacle + arrêt de chute", de: "Hinderniserkennung + Fallstopp" },
    "Veilig": { fr: "Sûr", de: "Sicher" },
    "Vijfpuntsslot + beveiliging": { fr: "Serrure 5 points + sécurité", de: "Fünfpunktverriegelung + Sicherung" },
    "Absolute veiligheid": { fr: "Sécurité absolue", de: "Absolute Sicherheit" },
    "Loopdeur mogelijk": { fr: "Portillon possible", de: "Schlupftür möglich" },
    "Lage drempel 2,5 cm": { fr: "Seuil bas 2,5 cm", de: "Niedrige Schwelle 2,5 cm" },
    "80 cm breed, drempel 5,7 cm": { fr: "80 cm de large, seuil 5,7 cm", de: "80 cm breit, Schwelle 5,7 cm" },
    "Drempel 1,5 cm, 525/700 mm": { fr: "Seuil 1,5 cm, 525/700 mm", de: "Schwelle 1,5 cm, 525/700 mm" },
    "Maximale ruimte": { fr: "Espace maximal", de: "Maximaler Platz" },
    "Lamellen rollen op in de kast": { fr: "Les lames s'enroulent dans le coffre", de: "Lamellen rollen in den Kasten" },
    "Lamellen op maat": { fr: "Lames sur mesure", de: "Lamellen nach Maß" },
    "55 of 77 mm (Carrol)": { fr: "55 ou 77 mm (Carrol)", de: "55 oder 77 mm (Carrol)" },
    "RAL-kleuren": { fr: "Couleurs RAL", de: "RAL-Farben" },
    "Naar keuze": { fr: "Au choix", de: "Nach Wahl" },
    "Lichtinval": { fr: "Apport de lumière", de: "Lichteinfall" },
    "Optionele raamlamellen": { fr: "Lames vitrées en option", de: "Optionale Fensterlamellen" },
    "Vrij plafond": { fr: "Plafond libre", de: "Freie Decke" },
    "Schuift zijwaarts, geen plafondrail": { fr: "Coulisse latéralement, sans rail au plafond", de: "Schiebt seitlich, ohne Deckenschiene" },
    "Centrale opening": { fr: "Ouverture centrale", de: "Mittelöffnung" },
    "Deels openen als doorgang": { fr: "Ouverture partielle comme passage", de: "Teilweise als Durchgang öffnen" },

    /* Detailpagina's — accordeon-titels */
    "Designs & kleuren": { fr: "Designs & couleurs", de: "Designs & Farben" },
    "Isolatie & comfort": { fr: "Isolation & confort", de: "Isolierung & Komfort" },
    "Veiligheid & vergrendeling": { fr: "Sécurité & verrouillage", de: "Sicherheit & Verriegelung" },
    "Loopdeur (optie)": { fr: "Portillon (option)", de: "Schlupftür (Option)" },
    "Afmetingen": { fr: "Dimensions", de: "Abmessungen" },
    "Werking & comfort": { fr: "Fonctionnement & confort", de: "Funktion & Komfort" },
    "Stevigheid & isolatie": { fr: "Robustesse & isolation", de: "Robustheit & Isolierung" },
    "Waarom een rolpoort": { fr: "Pourquoi une porte enroulable", de: "Warum ein Rolltor" },
    "Lamellen": { fr: "Lames", de: "Lamellen" },
    "Veiligheid": { fr: "Sécurité", de: "Sicherheit" },

    /* Detailpagina's — CTA */
    "Stel jouw sectionaalpoort samen": { fr: "Composez votre porte sectionnelle", de: "Stellen Sie Ihr Sektionaltor zusammen" },
    "Stel jouw kanteldeur samen": { fr: "Composez votre porte basculante", de: "Stellen Sie Ihr Schwingtor zusammen" },
    "Stel jouw rolpoort samen": { fr: "Composez votre porte enroulable", de: "Stellen Sie Ihr Rolltor zusammen" },
    "Stel jouw zijwaartse poort samen": { fr: "Composez votre porte latérale", de: "Stellen Sie Ihr Seitentor zusammen" },
    "Kies type, design, kleur en maten, en bekijk meteen je richtprijs. Vrijblijvend en zonder verplichtingen.":
      { fr: "Choisissez le type, le design, la couleur et les dimensions, et voyez aussitôt votre prix indicatif. Sans engagement ni obligation.",
        de: "Wählen Sie Typ, Design, Farbe und Maße und sehen Sie sofort Ihren Richtpreis. Unverbindlich und ohne Verpflichtungen." }
  };

  /* ---- 2. Zinnen met inline opmaak: volledige innerHTML-override ------ */
  /*   Element draagt data-i18n="<sleutel>"; de NL-versie wordt bij het    */
  /*   laden onthouden, hier staan enkel fr/de.                            */
  const TH = {
    "meet1": {
      fr: "Mesurez la <b>largeur</b> et la <b>hauteur</b> de l'ouverture (en cm), à plusieurs endroits, et notez la plus petite mesure.",
      de: "Messen Sie <b>Breite</b> und <b>Höhe</b> der Öffnung (in cm) an mehreren Stellen und notieren Sie das kleinste Maß."
    },
    "meet2": {
      fr: "Indiquez si la porte repose sur le <b>sol</b> ou sur un <b>seuil</b>.",
      de: "Geben Sie an, ob das Tor auf dem <b>Boden</b> oder auf einer <b>Schwelle</b> sitzt."
    },
    "meet3": {
      fr: "Ajoutez quelques <b>photos</b>, nous vérifierons alors vos mesures avant la production.",
      de: "Fügen Sie ein paar <b>Fotos</b> hinzu, dann prüfen wir Ihre Maße vor der Produktion."
    },
    "hintplaats": {
      fr: "Vous mesurez, nous fabriquons la porte sur mesure et <b>la posons avec expertise</b>. Un doute sur une mesure ? Indiquez-le sans souci dans « infos supplémentaires ».",
      de: "Sie messen, wir fertigen das Tor nach Maß und <b>montieren es fachgerecht</b>. Unsicher bei einem Maß? Schreiben Sie es einfach in „Zusätzliche Infos“."
    },
    "hintmotor": {
      fr: "☀️ Nos portes sont <b>toujours motorisées</b> (télécommande incluse). Couleurs standard blanc et anthracite ; autres couleurs RAL possibles avec supplément.",
      de: "☀️ Unsere Tore sind <b>immer motorisiert</b> (Fernbedienung inklusive). Standardfarben Weiß und Anthrazit; andere RAL-Farben gegen Aufpreis möglich."
    }
  };

  /* ---- 3. Paginatitels ---------------------------------------------- */
  const TITLES = {
    "Portisol | Uw Partner in Maatwerk Garagepoorten & Zonwering":
      { fr: "Portisol | Votre partenaire en portes de garage et protection solaire sur mesure",
        de: "Portisol | Ihr Partner für maßgefertigte Garagentore & Sonnenschutz" },
    "Prijs & offerte — Portisol": { fr: "Prix & devis — Portisol", de: "Preis & Angebot — Portisol" },
    "Offerte GAR-2026-0042 — Portisol": { fr: "Devis GAR-2026-0042 — Portisol", de: "Angebot GAR-2026-0042 — Portisol" }
  };

  /* ---- 4. Motor ----------------------------------------------------- */
  const LANGS = [["nl", "NL"], ["fr", "FR"], ["de", "DE"]];
  const STORE = "pt-lang";
  const VALID = ["nl", "fr", "de"];
  const origTitle = document.title;
  let textNodes = [], attrEls = [], htmlEls = [];
  let cur = "nl";

  function pick() {
    // 1. Expliciete keuze via URL (?lang=fr) — handig om te delen/linken.
    try {
      const q = new URLSearchParams(location.search).get("lang");
      if (q && VALID.indexOf(q) !== -1) return q;
    } catch (e) {}
    // 2. Eerder bewaarde keuze.
    let l = null;
    try { l = localStorage.getItem(STORE); } catch (e) {}
    if (VALID.indexOf(l) !== -1) return l;
    // 3. Browsertaal.
    const b = (navigator.language || "nl").slice(0, 2).toLowerCase();
    if (b === "fr") return "fr";
    if (b === "de") return "de";
    return "nl";
  }

  function collect() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.__html_nl = el.innerHTML;
      htmlEls.push(el);
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = n.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = p.nodeName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return NodeFilter.FILTER_REJECT;
        if (p.classList && p.classList.contains("material-symbols-outlined")) return NodeFilter.FILTER_REJECT;
        if (p.closest && (p.closest("[data-i18n]") || p.closest("[data-i18n-skip]"))) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n;
    while ((n = walker.nextNode())) { n.__nl = n.nodeValue; textNodes.push(n); }

    document.querySelectorAll("[placeholder],[aria-label]").forEach(function (el) {
      if (el.closest("[data-i18n-skip]")) return;
      const o = {};
      if (el.hasAttribute("placeholder")) o.placeholder = el.getAttribute("placeholder");
      if (el.hasAttribute("aria-label")) o["aria-label"] = el.getAttribute("aria-label");
      el.__attr_nl = o;
      attrEls.push(el);
    });
  }

  function apply(lang) {
    if (VALID.indexOf(lang) === -1) lang = "nl";
    cur = lang;
    document.documentElement.setAttribute("lang", lang);

    document.title = (lang === "nl")
      ? origTitle
      : ((TITLES[origTitle] && TITLES[origTitle][lang]) || origTitle);

    textNodes.forEach(function (n) {
      const orig = n.__nl, key = orig.trim();
      if (lang === "nl") { n.nodeValue = orig; return; }
      const e = T[key];
      if (e && e[lang]) {
        const lead = orig.match(/^\s*/)[0], trail = orig.match(/\s*$/)[0];
        n.nodeValue = lead + e[lang] + trail;
      } else {
        n.nodeValue = orig;
      }
    });

    attrEls.forEach(function (el) {
      const o = el.__attr_nl;
      for (const a in o) {
        const orig = o[a];
        if (lang === "nl") { el.setAttribute(a, orig); continue; }
        const e = T[orig.trim()];
        el.setAttribute(a, (e && e[lang]) ? e[lang] : orig);
      }
    });

    htmlEls.forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (lang === "nl") { el.innerHTML = el.__html_nl; return; }
      const e = TH[key];
      el.innerHTML = (e && e[lang]) ? e[lang] : el.__html_nl;
    });

    const btns = document.querySelectorAll(".pt-langbtn");
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("on", btns[i].getAttribute("data-l") === lang);
    }

    try { localStorage.setItem(STORE, lang); } catch (e) {}
    // dynamisch gerenderde onderdelen (bv. configurator) laten hervertalen
    try { document.dispatchEvent(new CustomEvent("portisol:lang", { detail: lang })); } catch (e) {}
  }

  function buildSwitch() {
    const style = document.createElement("style");
    style.textContent =
      ".pt-langswitch{display:flex;gap:2px;align-items:center;background:rgba(154,147,138,.14);padding:3px;border-radius:9999px}" +
      ".pt-langbtn{border:0;background:transparent;cursor:pointer;font:700 12px/1 Quicksand,sans-serif;letter-spacing:.04em;color:#9A938A;padding:5px 9px;border-radius:9999px;transition:background .15s,color .15s}" +
      ".pt-langbtn:hover{color:#2B2A28}" +
      ".pt-langbtn.on{background:#F4B740;color:#2B2A28}";
    document.head.appendChild(style);

    const box = document.createElement("div");
    box.className = "pt-langswitch";
    box.setAttribute("data-i18n-skip", "");
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Taal / Langue / Sprache");
    LANGS.forEach(function (pair) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pt-langbtn";
      b.setAttribute("data-l", pair[0]);
      b.textContent = pair[1];
      b.addEventListener("click", function () { apply(pair[0]); });
      box.appendChild(b);
    });

    const navInner = document.querySelector("nav > div");
    if (navInner) {
      const cta = navInner.querySelector("button");
      if (cta) navInner.insertBefore(box, cta); else navInner.appendChild(box);
    } else {
      box.style.position = "fixed";
      box.style.top = "12px";
      box.style.right = "12px";
      box.style.zIndex = "100";
      document.body.appendChild(box);
    }
  }

  // publieke mini-API zodat dynamisch gerenderde UI (configurator) strings kan vertalen
  window.PortisolI18n = {
    t: function (s) { if (cur === "nl") return s; const e = T[s]; return (e && e[cur]) ? e[cur] : s; },
    lang: function () { return cur; }
  };

  function init() {
    collect();
    buildSwitch();
    apply(pick());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
