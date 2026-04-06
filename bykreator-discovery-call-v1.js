(function(){

// ============================================================
// AUTO-DETECT LOCALE FROM URL
// /rs in pathname → Serbian/EUR, otherwise EN/USD
// Can still be overridden manually via window.calcConfig
// ============================================================
var isRS = window.location.pathname.indexOf('/rs') !== -1;

var RS_CONFIG = {
  locale: 'rs',
  currency: 'eur',
  moLabel: '/mes',
  workerUrl: 'https://bykreator-calendar.bykreator.workers.dev',
  tiers: [
    {min:0,     max:6000,    disc:0,  nxt:6000,  nd:5},
    {min:6000,  max:10000,   disc:5,  nxt:10000, nd:10},
    {min:10000, max:13000,   disc:10, nxt:13000, nd:15},
    {min:13000, max:Infinity,disc:15, nxt:null,  nd:null}
  ],
  data: [
    {id:'branding',n:'Brending',p:2000,d:'2.000€',desc:'Izgradite prepoznatljiv brend identitet. Uključuje komplet logoa, strateško pozicioniranje, vizuelne smernice i osnovne brend elemente. Rok: 3-4 nedelje.',a:[
      {id:'refresh',n:'Redizajn',p:-600,det:'Za postojeće brendove; fokus na osvežavanju; 1-2 nedelje.'},
      {id:'bs',n:'Brend Strategija',p:1200,det:'Dubinsko istraživanje tržišta, okvir pozicioniranja; +2-3 nedelje.'},
      {id:'sw',n:'Storytelling Radionica',p:1200,det:'Vođena sesija + narativna prezentacija; +1-2 nedelje.'},
      {id:'eg',n:'Proširene Smernice',p:700,det:'Sveobuhvatna brend knjiga sa pravilima korišćenja; +1 nedelja.'},
      {id:'ill',n:'Ilustracije',p:500,det:'Prilagođeni vektorski ilustracije; unapređuje vizuale.'},
      {id:'icons',n:'Ikonice',p:200,det:'Prilagođeni set ikona; unapređuje vizuale.'}
    ]},
    {id:'print',n:'Štampani Dizajn',p:1000,d:'1.000€',desc:'Profesionalni štampani materijali za sveobuhvatne potrebe (minimum 5 stavki). Rok: 2-3 nedelje.',a:[
      {id:'pack',n:'Pakovanje po Liniji Proizvoda',p:800,det:'Prilagođene kutije/etikete; tehnička dokumentacija uključena.'},
      {id:'lf',n:'Veliki Format (Set od 3)',p:700,det:'Baneri, posteri; optimizovano za događaje.'},
      {id:'pb',n:'Dodatna Serija (5 stavki)',p:500,det:'Povećanje obima; povoljnija cena.'},
      {id:'prod',n:'Koordinacija Produkcije',p:400,det:'Komunikacija sa dobavljačima/probe; bez dodatnih naknada.'}
    ]},
    {id:'digital',n:'Digitalni Dizajn',p:1000,d:'1.000€',desc:'Digitalni materijali spremni za kampanje (do 10 statičnih dizajna). Idealno za oglase, društvene mreže i email. Rok: 1-2 nedelje.',a:[
      {id:'lp',n:'Landing Stranica (po stranici)',p:800,det:'Jedna stranica fokusirana na konverziju; +1-2 nedelje.'},
      {id:'nt',n:'Šabloni za Newsletter (5)',p:800,det:'Prilagođeni email šabloni; spremni za automatizaciju.'},
      {id:'av',n:'Varijacije Formata Oglasa (6)',p:700,det:'Više dimenzija za isti dizajn.'},
      {id:'anim',n:'Animirani HTML5 Oglasi (10)',p:1200,det:'Dinamični animirani baneri; +1-2 nedelje.'}
    ]},
    {id:'web',n:'Web Dizajn/Izrada',p:3000,d:'3.000€',desc:'Profesionalni web sajt (do 5 stranica). Responzivan dizajn, WordPress/Webflow, osnovno SEO. Rok: 4-6 nedelja.',a:[
      {id:'dyn',n:'Dinamičke Funkcionalnosti',p:2000,det:'Forme, baze podataka, korisnički nalozi; +2-3 nedelje.'},
      {id:'ec',n:'E-commerce Postavka',p:4000,det:'Potpuna funkcionalnost prodavnice; +3-4 nedelje.'},
      {id:'saas',n:'SaaS/App Razvoj',p:9000,det:'Prilagođena web aplikacija; polazna tačka; +8-12 nedelja.'},
      {id:'ep',n:'Dodatne Stranice (po 5)',p:1500,det:'Proširenje izvan osnovnih 5 stranica; +1-2 nedelje.'},
      {id:'mnt',n:'Mesečno Održavanje',p:150,det:'Ažuriranja, bezbednost, podrška; min 3 meseca.',m:1}
    ]},
    {id:'social',n:'Marketing na Društvenim Mrežama',p:800,d:'800€/mes',m:1,desc:'15-20 objava mesečno na 2 platforme. Kalendar sadržaja, zakazivanje, osnovno angažovanje. Minimum 6 meseci.',a:[
      {id:'ep2',n:'Dodatna Platforma',p:400,det:'10-15 objava mesečno po platformi.',m:1},
      {id:'psa',n:'Plaćeni Oglasi na Društvenim Mrežama',p:500,det:'Upravljanje kampanjom; do 5.000€ potrošnje.',m:1},
      {id:'ana',n:'Napredna Analitika',p:300,det:'Prilagođeni dashboard, praćenje ROI.',m:1}
    ]},
    {id:'ppc',n:'PPC/Display Oglašavanje',p:1200,d:'1.200€/mes',m:1,desc:'Postavljanje kampanje, 1-2 platforme, do 10 kreativa. Minimum 3-6 meseci. Budžet za oglase nije uključen.',a:[
      {id:'dex',n:'Vizuelno/Display Proširenje',p:600,det:'Display kampanje sa reklamnim materijalima.',m:1},
      {id:'mp',n:'Proširenje na Više Platformi',p:700,det:'Dodavanje 2-3 platforme sa jedinstvenim praćenjem.',m:1},
      {id:'ret',n:'Retargeting Kampanja',p:500,det:'Prilagođene publike, dinamični oglasi.',m:1},
      {id:'asm',n:'Upravljanje Budžetom za Oglase',p:500,det:'Za budžete do 10.000€ mesečno.',m:1},
      {id:'cr',n:'Novi Oglasi Mesečno (10/mes)',p:400,det:'Mesečne nove varijacije oglasa za A/B testiranje.',m:1}
    ]},
    {id:'seo',n:'SEO Optimizacija',p:1400,d:'1.400€/mes',m:1,desc:'Audit, strategija ključnih reči, on-page optimizacija, izgradnja linkova. Minimum 6-12 meseci.',a:[
      {id:'sc',n:'Kreiranje Sadržaja (4-6/mes)',p:800,det:'Članci optimizovani za ključne reči, 1.000-2.000 reči.',m:1},
      {id:'lb',n:'Kampanja Izgradnje Linkova',p:800,det:'5-10 kvalitetnih backlinkova mesečno. Ovo pokriva samo naš outreach rad - troškovi plasmana linkova nisu uključeni.',m:1},
      {id:'ts',n:'Napredni Tehnički SEO',p:400,det:'Brzina sajta, Core Web Vitals, schema.',m:1},
      {id:'ls',n:'Lokalni SEO',p:400,det:'Google Business, citati, lokalni rankovi.',m:1}
    ]},
    {id:'email',n:'Email Marketing',p:1000,d:'1.000€/mes',m:1,desc:'Postavljanje sekvence (4-8 emailova), šabloni, automatizacija, A/B testiranje. Minimum 3-6 meseci.',a:[
      {id:'ee',n:'Proširenje Sekvence (5-10)',p:800,det:'Proširene drip kampanje; jednokratno postavljanje.'},
      {id:'crm',n:'CRM/Integracija Platformi',p:500,det:'Napredni tokovi rada, segmentacija.',m:1},
      {id:'lbs',n:'Strategija Izgradnje Liste',p:400,det:'Lead magneti, opt-in forme, taktike rasta.',m:1},
      {id:'ea',n:'Napredna Analitika',p:300,det:'Heatmape, praćenje konverzija, izveštaji.',m:1}
    ]},
    {id:'portal',n:'Klijentski Portal',p:1000,pm:100,d:'1.000€ + 100€/mes',desc:'Praćenje projekta u realnom vremenu, konsolidovana analitika, repozitorijum fajlova, komunikacijski hub. Postavka: 1.000€ jednokratno + 100€ mesečno.'},
    {id:'wl',n:'White Label Dodatak',p:0,d:'+20%',pct:20,desc:'Preprodajte naš rad kao svoj. Uključuje NDA ugovore, sigurnu isporuku i potpunu poverljivost. Idealno za agencije i konsultante.'}
  ],
  ui: {
    from:'od',addons:'Dodaci',addonCol:'DODATAK',priceCol:'CENA',detailsCol:'DETALJI',
    disclaimer:'*Konačna cena se određuje nakon uvodnog poziva, u zavisnosti od obima i zahteva projekta.',
    discountInfo:function(nxt,nd){return 'Dostignite <strong>'+nxt+'</strong> za <strong>'+nd+'% popusta</strong> na jednokratne projekte.';},
    discountUnlocked:'<strong>15% popust</strong> otključan na jednokratne projekte!',
    discReachShort:function(nxt,nd){return 'Dostignite '+nxt+' za '+nd+'% popusta';},
    discUnlockedShort:'15% popust otključan!',
    discReachLong:function(nxt,nd){return 'Dostignite '+nxt+' za '+nd+'% popusta na jednokratne projekte';},
    discUnlockedLong:'15% popust otključan na jednokratne projekte!',
    discApplied:function(d){return d+'% popust primenjen';},
    discAppliedBadge:function(d){return d+'% popusta';},
    discountAppliesInfo:'Popust se primenjuje samo na jednokratne projekte',
    selectServices:'Izaberite usluge da vidite procenu',
    yourSelection:'Vaš Izbor',subtotal:'Međuzbir:',discount:'Popust:',total:'Ukupno:',
    items:function(n){return n+' stavk'+(n===1?'a':(n>=2&&n<=4?'e':'i'));},
    ctaBtn:'Zakažite Uvodni Sastanak',ctaDisabled:'Molimo izaberite bar jednu uslugu da nastavite',
    note:'Sve cene su okvirne i podložne promenama. Konačna cena se potvrđuje nakon uvodnog sastanka.',
    calcTitle:'Procenite budžet',step2Title:'Podelite informacije',yourEstimate:'Vaša procena',
    namePlaceholder:'Marko Marković',emailPlaceholder:'marko@kompanija.com',companyPlaceholder:'Kompanija d.o.o.',
    nameLabel:'Ime i Prezime',emailLabel:'Email Adresa',companyLabel:'Naziv Kompanije',
    projectLabel:'Recite nam o Vašem projektu',projectPlaceholder:'Opišite ukratko Vaš projekat...',
    termsText:'Slažem se sa <a href="https://bykreator.com/rs/politika-poslovanja" target="_blank" style="color:#CFFF54;text-decoration:none;font-weight:400" onclick="event.stopPropagation()">politikom poslovanja</a> i <a href="https://bykreator.com/rs/politika-privatnosti" target="_blank" style="color:#CFFF54;text-decoration:none;font-weight:400" onclick="event.stopPropagation()">politikom privatnosti</a><span style="color:#fff;margin-left:2px">*</span>',
    continueBtn:'Nastavi na Zakazivanje',backLink:'Nazad',
    formNote:'Vaši podaci su bezbedni i koristiće se isključivo za pripremu uvodnog sastanka.',
    validationFill:'Molimo popunite sva obavezna polja',validationEmail:'Molimo unesite ispravnu email adresu',
    validationTerms:'Molimo prihvatite uslove poslovanja i Politiku privatnosti',
    oneTimeLabel:'jednokratno',retainerLabel:'retainer',discountLabel:'popust primenjen',
    step3Title:'Zakažite Sastanak',allSet:'Sve je spremno!',
    confirmText:'Proverite inbox za uvodni sastanak i link za Google Meet. Ako ga ne vidite u narednih nekoliko minuta, pogledajte spam ili promotions folder. Jedva čekamo da razgovaramo o Vašem projektu!',
    backHome:'Nazad na Početnu',summaryTitle:'Pregled',nameField:'Ime',emailField:'Email',
    companyField:'Kompanija',callScheduled:'Sastanak zakazan',timeField:'Vreme',messageField:'Poruka',
    viewFullMsg:'Prikaži celu poruku',showLess:'Prikaži manje',servicesField:'Usluge',
    noServices:'Nije izabrana nijedna usluga',
    viewMore:function(n){return 'Prikaži još '+n+' uslug'+(n===1?'u':(n>=2&&n<=4?'e':'a'));},
    subtotalField:'Međuzbir',discountField:'Popust',estimateField:'Procena',
    calendarTitle:'Izaberite Datum i Vreme',
    calendarSubtitle:'30-minutni uvodni sastanak (vreme prikazano u Vašoj vremenskoj zoni)',
    prevMonth:'← Prethodni',nextMonth:'Sledeći →',changeDate:'Promeni datum',
    loadingDates:'Učitavanje dostupnih datuma...',loadingSlots:'Učitavanje termina...',
    noSlots:'Nema dostupnih termina za ovaj datum',
    slotsError:'Greška pri učitavanju termina. Pokušajte ponovo.',
    bookBtn:'Zakažite Uvodni Sastanak',bookBtnDisabled:'Molimo izaberite datum i vreme',
    bookingBtn:'Zakazivanje...',
    availableFor:function(d){return 'Dostupni termini za: '+d;},
    days:['Ned','Pon','Uto','Sre','Čet','Pet','Sub'],dateLocale:'sr-Latn-RS',timeHour12:false,
    bookingError:'Greška pri zakazivanju. Pokušajte ponovo ili nas kontaktirajte direktno.',
    bookingFailed:function(e){return 'Zakazivanje nije uspelo: '+e;},
    portalMonthly:'Klijentski Portal (Mesečno)',whiteLabel:'White Label',whiteLabelPrice:'+20%',
    clientHubMonthly:function(p){return 'Klijentski Portal - Mesečno ('+p+'€/mes)';},
    back:'Nazad'
  }
};

// Use RS config if /rs in URL, manual window.calcConfig always wins
var cfg = window.calcConfig || (isRS ? RS_CONFIG : {});
if (isRS && !window.calcConfig) window.calcConfig = RS_CONFIG;

var locale   = cfg.locale   || 'en';
var currency = cfg.currency || 'usd';
var moLabel  = cfg.moLabel  || '/mo';
var workerUrl = cfg.workerUrl || 'https://bykreator-calendar.bykreator.workers.dev';

var ui = cfg.ui || {
  from:            'from',
  addons:          'Add-ons',
  addonCol:        'ADD-ON',
  priceCol:        'PRICE',
  detailsCol:      'DETAILS',
  disclaimer:      '*Final pricing determined after discovery call based on project scope and requirements.',
  discountInfo:    function(nxt, nd) { return 'Reach <strong>' + nxt + '</strong> for <strong>' + nd + '% off</strong> one-time projects.'; },
  discountUnlocked:'<strong>15% off</strong> unlocked on one-time projects!',
  discReachShort:  function(nxt, nd) { return 'Reach ' + nxt + ' for ' + nd + '% off'; },
  discUnlockedShort:'15% off unlocked!',
  discReachLong:   function(nxt, nd) { return 'Reach ' + nxt + ' for ' + nd + '% off one-time projects'; },
  discUnlockedLong:'15% off unlocked on one-time projects!',
  discApplied:     function(d) { return d + '% off applied'; },
  discAppliedBadge:function(d) { return d + '% off'; },
  discountAppliesInfo: 'Discount applies to one-time projects only',
  selectServices:  'Select services to see estimate',
  yourSelection:   'Your Selection',
  subtotal:        'Subtotal:',
  discount:        'Discount:',
  total:           'Total:',
  items:           function(n) { return n + ' item' + (n === 1 ? '' : 's'); },
  ctaBtn:          'Book a Discovery Call',
  ctaDisabled:     'Please select at least one service to continue',
  note:            'All prices are estimates and subject to change. Final pricing confirmed after discovery call.',
  calcTitle:       'Calculate Your Estimate',
  step2Title:      'Share Your Details',
  yourEstimate:    'Your estimate',
  namePlaceholder: 'John Smith',
  emailPlaceholder:'john@company.com',
  companyPlaceholder:'Company Inc.',
  nameLabel:       'Full Name',
  emailLabel:      'Email Address',
  companyLabel:    'Company Name',
  projectLabel:    'Tell us about your project',
  projectPlaceholder:'Share a few words about your project...',
  termsText:       'I agree to the <a href="https://bykreator.com/terms-of-services" target="_blank" style="color:#CFFF54;text-decoration:none;font-weight:400" onclick="event.stopPropagation()">Terms of Service</a> and <a href="https://bykreator.com/privacy-policy" target="_blank" style="color:#CFFF54;text-decoration:none;font-weight:400" onclick="event.stopPropagation()">Privacy Policy</a><span style="color:#fff;margin-left:2px">*</span>',
  continueBtn:     'Continue to Schedule',
  backLink:        'Back',
  formNote:        'Your information is secure and will only be used to prepare for your discovery call.',
  validationFill:  'Please fill in all required fields',
  validationEmail: 'Please enter a valid email address',
  validationTerms: 'Please accept the Terms of Service and Privacy Policy',
  oneTimeLabel:    'one-time',
  retainerLabel:   '/mo retainer',
  discountLabel:   'discount applied',
  step3Title:      'Book a Call',
  allSet:          "You're all set!",
  confirmText:     "Check your inbox for the calendar invite and meeting link. If you don't see it in the next few minutes, peek into your spam or promotions folder. We can't wait to discuss your project!",
  backHome:        'Back to Homepage',
  summaryTitle:    'Summary',
  nameField:       'Name',
  emailField:      'Email',
  companyField:    'Company',
  callScheduled:   'Call scheduled',
  timeField:       'Time',
  messageField:    'Message',
  viewFullMsg:     'View full message',
  showLess:        'Show less',
  servicesField:   'Services',
  noServices:      'No services selected',
  viewMore:        function(n) { return 'View ' + n + ' more service' + (n === 1 ? '' : 's'); },
  subtotalField:   'Subtotal',
  discountField:   'Discount',
  estimateField:   'Estimate',
  calendarTitle:   'Select Date & Time',
  calendarSubtitle:'30-minute discovery call (times shown in your timezone)',
  prevMonth:       '← Prev',
  nextMonth:       'Next →',
  changeDate:      'Change date',
  loadingDates:    'Loading available dates...',
  loadingSlots:    'Loading slots...',
  noSlots:         'No available slots for this date',
  slotsError:      'Error loading slots. Please try again.',
  bookBtn:         'Book Discovery Call',
  bookBtnDisabled: 'Please select a date and time',
  bookingBtn:      'Booking...',
  availableFor:    function(d) { return 'Available times for ' + d; },
  days:            ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  dateLocale:      'en-US',
  bookingError:    'Booking error. Please try again or contact us directly.',
  bookingFailed:   function(e) { return 'Booking failed: ' + e; },
  portalMonthly:   'Portal (Monthly)',
  whiteLabel:      'White Label',
  whiteLabelPrice: '+20%',
  clientHubMonthly:function(p) { return 'Client Hub - Monthly (' + fmt(p) + '/mo)'; },
  back:            'Back'
};

var tiers = cfg.tiers || [
  {min:0,     max:8000,    disc:0,  nxt:8000,  nd:5},
  {min:8000,  max:13000,   disc:5,  nxt:13000, nd:10},
  {min:13000, max:19000,   disc:10, nxt:19000, nd:15},
  {min:19000, max:Infinity,disc:15, nxt:null,  nd:null}
];

var data = cfg.data || [
  {id:'branding',n:'Branding',p:3500,d:'$3,500',desc:'Build a memorable brand identity. Includes logo suite, strategic positioning, visual guidelines, and core brand elements. Timeline: 3-4 weeks.',a:[
    {id:'refresh',n:'Refresh Mode',p:-1000,det:'For existing brands; focuses on updates only; 1-2 weeks.'},
    {id:'bs',n:'Brand Strategy',p:2000,det:'Deep market research, positioning framework; +2-3 weeks.'},
    {id:'sw',n:'Storytelling Workshop',p:2000,det:'Facilitated session + narrative deck; +1-2 weeks.'},
    {id:'eg',n:'Extended Guidelines',p:1200,det:'Comprehensive brand book with usage rules; +1 week.'},
    {id:'ill',n:'Illustrations',p:800,det:'Custom illustration vectors; enhances visuals.'},
    {id:'icons',n:'Icons (up to 10)',p:400,det:'Custom icon set; enhances visuals.'}
  ]},
  {id:'print',n:'Print Design',p:1500,d:'$1,500',desc:'Professional print collateral for comprehensive needs (minimum 5 items). Timeline: 2-3 weeks.',a:[
    {id:'pack',n:'Packaging Per Product Line',p:1200,det:'Custom boxes/labels; dielines included.'},
    {id:'lf',n:'Large-Format (Set of 3)',p:1000,det:'Banners, posters; event-optimized.'},
    {id:'pb',n:'Additional Batch (5 items)',p:800,det:'Scale up; volume pricing.'},
    {id:'prod',n:'Production Coordination',p:600,det:'Vendor liaison/proofs; excludes fees.'}
  ]},
  {id:'digital',n:'Digital Design',p:1500,d:'$1,500',desc:'Campaign-ready digital assets (up to 10 static designs). Perfect for ads, social, email. Timeline: 1-2 weeks.',a:[
    {id:'lp',n:'Landing Page (per page)',p:1200,det:'Single conversion-focused page; +1-2 weeks.'},
    {id:'nt',n:'Newsletter Templates (5)',p:1200,det:'Custom email templates; automation-ready.'},
    {id:'av',n:'Ad Size Variations (6)',p:1000,det:'Multiple dimensions for same design.'},
    {id:'anim',n:'Animated HTML5 Ads (10)',p:1800,det:'Dynamic animated banners; +1-2 weeks.'}
  ]},
  {id:'web',n:'Web Design/Dev',p:4000,d:'$4,000',desc:'Professional business website (up to 5 pages). Responsive design, WordPress/Webflow, basic SEO. Timeline: 4-6 weeks.',a:[
    {id:'dyn',n:'Dynamic Features',p:2500,det:'Forms, databases, user logins; +2-3 weeks.'},
    {id:'ec',n:'E-commerce Setup',p:5000,det:'Full shop functionality; +3-4 weeks.'},
    {id:'saas',n:'SaaS/App Build',p:12000,det:'Custom web app; starting point; +8-12 weeks.'},
    {id:'ep',n:'Additional Pages (per 5)',p:2000,det:'Expand beyond base 5 pages; +1-2 weeks.'},
    {id:'mnt',n:'Monthly Maintenance',p:250,det:'Updates, security, support; min 3 months.',m:1}
  ]},
  {id:'social',n:'SMM',p:1200,d:'$1,200/mo',m:1,desc:'15-20 posts/month on 2 platforms. Content calendar, scheduling, basic engagement. Minimum 6 months.',a:[
    {id:'ep2',n:'Additional Platform',p:600,det:'10-15 posts/month per platform.',m:1},
    {id:'psa',n:'Paid Social Ads',p:800,det:'Campaign management; up to $5K spend.',m:1},
    {id:'ana',n:'Advanced Analytics',p:400,det:'Custom dashboards, ROI tracking.',m:1}
  ]},
  {id:'ppc',n:'PPC/Display Ads',p:2000,d:'$2,000/mo',m:1,desc:'Campaign setup, 1-2 platforms, up to 10 ad creatives. Minimum 3-6 months. Ad spend excluded.',a:[
    {id:'dex',n:'Visual/Display Expansion',p:1000,det:'Display network campaigns with creatives.',m:1},
    {id:'mp',n:'Multi-Platform Expansion',p:1200,det:'Add 2-3 platforms with unified tracking.',m:1},
    {id:'ret',n:'Retargeting Campaign',p:800,det:'Custom audiences, dynamic ads.',m:1},
    {id:'asm',n:'Ad Spend Management',p:800,det:'For budgets up to $10K/month.',m:1},
    {id:'cr',n:'Creative Refresh (10/mo)',p:600,det:'Monthly new ad variations for A/B testing.',m:1}
  ]},
  {id:'seo',n:'SEO',p:2000,d:'$2,000/mo',m:1,desc:'Audit, keyword strategy, on-page optimization, link building. Minimum 6-12 months.',a:[
    {id:'sc',n:'Content Creation (4-6/mo)',p:1200,det:'Keyword-optimized articles, 1K-2K words.',m:1},
    {id:'lb',n:'Link Building Campaign',p:1200,det:'5-10 quality backlinks/month. This covers our outreach work only - link placement costs not included.',m:1},
    {id:'ts',n:'Advanced Technical SEO',p:600,det:'Site speed, Core Web Vitals, schema.',m:1},
    {id:'ls',n:'Local SEO',p:600,det:'Google Business, citations, local rankings.',m:1}
  ]},
  {id:'email',n:'Email Marketing',p:1500,d:'$1,500/mo',m:1,desc:'Sequence setup (4-8 emails), templates, automation, A/B testing. Minimum 3-6 months.',a:[
    {id:'ee',n:'Sequence Expansion (5-10)',p:1200,det:'Extended drip campaigns; one-time setup.'},
    {id:'crm',n:'CRM/Platform Integration',p:800,det:'Advanced workflows, segmentation.',m:1},
    {id:'lbs',n:'List Building Strategy',p:600,det:'Lead magnets, opt-ins, growth tactics.',m:1},
    {id:'ea',n:'Advanced Analytics',p:400,det:'Heatmaps, conversion tracking, reports.',m:1}
  ]},
  {id:'portal',n:'Client Hub',p:1500,pm:150,d:'$1,500 + $150/mo',desc:'Real-time project tracking, consolidated analytics, file repository, communication hub. Setup: $1,500 one-time + $150/month access.'},
  {id:'wl',n:'White Label Add-On',p:0,d:'+20%',pct:20,desc:'Resell our work as your own. Includes NDAs, secure delivery, full confidentiality. Perfect for agencies and consultants.'}
];

// ============================================================
// PRICE FORMATTING
// ============================================================
function fmt(n) {
  if (currency === 'eur') {
    return n.toLocaleString('de-DE').replace(/,/g, '.') + '€';
  }
  return '$' + n.toLocaleString('en-US');
}

function fmtK(n) {
  if (currency === 'eur') {
    return fmt(n);
  }
  return '$' + (n/1000).toFixed(0) + 'k';
}

function fmtMo(n) {
  return fmt(n) + moLabel;
}

function fmtAddon(v) {
  return v.m ? fmt(Math.abs(v.p)) + moLabel : fmt(Math.abs(v.p));
}

// ============================================================
// STATE
// ============================================================
window.st = {s: new Map(), a: new Map()};
window.data = data;
window.calculatorData = {oneTime:0,oneTimeOriginal:0,monthly:0,discountAmount:0,discountPercent:0,hasDiscount:false};

// ============================================================
// INIT MOBILE
// ============================================================
function initMobile(){
  var html = window.data.map(function(s){
    var priceDisplay = s.d ? (currency === 'eur' ? s.dEur || s.d : s.d) : '';
    return '<div class="svc-card">' +
      '<div class="svc-header">' +
        '<div class="svc-check" id="mc'+s.id+'" onclick="toggleServiceMobile(\''+s.id+'\')"></div>' +
        '<div class="svc-name" onclick="toggleServiceMobile(\''+s.id+'\')">'+s.n+'</div>' +
        '<div style="flex:1;min-height:20px" onclick="toggleExpandMobile(\''+s.id+'\')"></div>' +
        '<div class="svc-price-wrap" onclick="toggleExpandMobile(\''+s.id+'\')">' +
          (s.id!=='wl'?'<div class="from">'+ui.from+'</div>':'') +
          '<div class="svc-price">'+priceDisplay+'</div>' +
        '</div>' +
        (s.a||s.desc ? '<svg class="arrow" id="marr'+s.id+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:0" onclick="toggleExpandMobile(\''+s.id+'\')"><path d="M6 9l6 6 6-6"/></svg>' : '') +
      '</div>' +
      (s.a||s.desc ?
        '<div class="svc-expand" id="mexp'+s.id+'">' +
          '<div class="svc-expand-inner">' +
            (s.desc ? '<div class="svc-desc">'+s.desc+'</div>' : '') +
            (s.a ?
              '<div class="addon-section">' +
                '<div class="addon-header">'+ui.addons+'</div>' +
                s.a.map(function(a){
                  var sign = a.p < 0 ? '-' : '+';
                  return '<div class="addon-item disabled" id="mai'+a.id+'" onclick="toggleAddonMobile(\''+a.id+'\',\''+s.id+'\')">' +
                    '<div class="addon-top">' +
                      '<div class="addon-left">' +
                        '<div class="addon-check" id="mac'+a.id+'"></div>' +
                        '<div class="addon-name">'+a.n+'</div>' +
                      '</div>' +
                      '<div class="addon-price '+(a.p<0?'neg':'')+'">'+sign+' '+fmt(Math.abs(a.p))+(a.m?moLabel:'')+'</div>' +
                    '</div>' +
                    '<div class="addon-det">'+a.det+'</div>' +
                  '</div>';
                }).join('') +
                '<div class="disclaimer">'+ui.disclaimer+'</div>' +
              '</div>'
            : '') +
          '</div>' +
        '</div>'
      : '') +
    '</div>';
  }).join('');
  document.getElementById('mobileServices').innerHTML = html;
  updateUIMobile();
  calcMobile();
}

// ============================================================
// INIT DESKTOP
// ============================================================
function initDesktop(){
  var html = window.data.map(function(s){
    var priceDisplay = s.d ? (currency === 'eur' ? s.dEur || s.d : s.d) : '';
    return '<div class="svc-card light-black-bg" id="dcard'+s.id+'">' +
      '<div class="svc-top" onclick="expandDesktop(\''+s.id+'\')">' +
        '<div class="svc-check" id="dc'+s.id+'" onclick="event.stopPropagation();toggleServiceDesktop(\''+s.id+'\')"></div>' +
        '<div class="svc-info">' +
          '<div class="svc-header">' +
            '<div class="svc-name" onclick="event.stopPropagation();toggleServiceDesktop(\''+s.id+'\')" style="cursor:pointer">'+s.n+'</div>' +
            '<div class="svc-price-box">'+(s.id!=='wl'?'<div class="from">'+ui.from+'</div>':'')+'<div class="svc-price">'+priceDisplay+'</div></div>' +
          '</div>' +
          (s.a ?
            '<div class="addons" id="dad'+s.id+'">' +
              '<div class="addons-inner" onclick="event.stopPropagation()">' +
                (s.desc ? '<div class="svc-desc">'+s.desc+'</div>' : '') +
                '<div class="addon-header"><div>'+ui.addonCol+'</div><div>'+ui.priceCol+'</div><div>'+ui.detailsCol+'</div></div>' +
                s.a.map(function(a){
                  var sign = a.p < 0 ? '-' : '+';
                  return '<div class="addon-row disabled" id="dar'+a.id+'" onclick="event.stopPropagation();toggleAddonDesktop(\''+a.id+'\',\''+s.id+'\')">' +
                    '<div class="addon-left">' +
                      '<div class="addon-check" id="dac'+a.id+'"></div>' +
                      '<div class="addon-name">'+a.n+'</div>' +
                    '</div>' +
                    '<div class="addon-price '+(a.p<0?'neg':'')+'">'+sign+' '+fmt(Math.abs(a.p))+(a.m?moLabel:'')+'</div>' +
                    '<div class="addon-det">'+a.det+'</div>' +
                  '</div>';
                }).join('') +
                '<div class="disclaimer">'+ui.disclaimer+'</div>' +
              '</div>' +
            '</div>'
          : s.desc ?
            '<div class="addons" id="dad'+s.id+'"><div class="addons-inner" onclick="event.stopPropagation()"><div class="svc-desc">'+s.desc+'</div></div></div>'
          : '') +
        '</div>' +
        '<svg class="arrow" id="darr'+s.id+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>' +
      '</div>' +
    '</div>';
  }).join('');
  document.getElementById('desktopServices').innerHTML = html;
  calcDesktop();
}

// ============================================================
// TOGGLE HANDLERS
// ============================================================
window.toggleServiceMobile = function(id){
  var svc = window.data.find(function(s){return s.id===id});
  if(window.st.s.has(id)){
    window.st.s.delete(id);
    if(id==='portal') window.st.s.delete('portal_m');
    if(svc.a) svc.a.forEach(function(a){window.st.a.delete(a.id)});
  } else {
    window.st.s.set(id, svc);
    if(id==='portal') window.st.s.set('portal_m', {p:svc.pm, m:1});
  }
  updateUIMobile();
  calcMobile();
};

window.toggleAddonMobile = function(aid, sid){
  if(!window.st.s.has(sid)) return;
  var svc = window.data.find(function(s){return s.id===sid});
  var addon = svc.a.find(function(a){return a.id===aid});
  if(window.st.a.has(aid)) window.st.a.delete(aid);
  else window.st.a.set(aid, addon);
  updateUIMobile();
  calcMobile();
};

window.toggleExpandMobile = function(id){
  var exp = document.getElementById('mexp'+id);
  var arr = document.getElementById('marr'+id);
  if(exp){ exp.classList.toggle('open'); if(arr) arr.classList.toggle('open'); }
};

window.toggleServiceDesktop = function(id){
  var svc = window.data.find(function(s){return s.id===id});
  if(window.st.s.has(id)){
    window.st.s.delete(id);
    if(id==='portal') window.st.s.delete('portal_m');
    if(svc.a) svc.a.forEach(function(a){window.st.a.delete(a.id)});
  } else {
    window.st.s.set(id, svc);
    if(id==='portal') window.st.s.set('portal_m', {p:svc.pm, m:1});
  }
  updateUIDesktop();
  calcDesktop();
};

window.toggleAddonDesktop = function(aid, sid){
  if(!window.st.s.has(sid)) return;
  var svc = window.data.find(function(s){return s.id===sid});
  var addon = svc.a.find(function(a){return a.id===aid});
  if(window.st.a.has(aid)) window.st.a.delete(aid);
  else window.st.a.set(aid, addon);
  updateUIDesktop();
  calcDesktop();
};

window.expandDesktop = function(id){
  var ad = document.getElementById('dad'+id);
  var ar = document.getElementById('darr'+id);
  if(ad){ ad.classList.toggle('open'); ar.classList.toggle('open'); }
};

// ============================================================
// UPDATE UI
// ============================================================
function updateUIMobile(){
  window.data.forEach(function(s){
    var cb = document.getElementById('mc'+s.id);
    if(cb){ window.st.s.has(s.id) ? cb.classList.add('on') : cb.classList.remove('on'); }
    if(s.a){
      s.a.forEach(function(a){
        var row = document.getElementById('mai'+a.id);
        var acb = document.getElementById('mac'+a.id);
        if(row&&acb){
          window.st.s.has(s.id) ? row.classList.remove('disabled') : row.classList.add('disabled');
          window.st.a.has(a.id) ? acb.classList.add('on') : acb.classList.remove('on');
        }
      });
    }
  });
}

function updateUIDesktop(){
  window.data.forEach(function(s){
    var cb = document.getElementById('dc'+s.id);
    if(cb){ window.st.s.has(s.id) ? cb.classList.add('on') : cb.classList.remove('on'); }
    if(s.a){
      s.a.forEach(function(a){
        var row = document.getElementById('dar'+a.id);
        var acb = document.getElementById('dac'+a.id);
        if(row&&acb){
          window.st.s.has(s.id) ? row.classList.remove('disabled') : row.classList.add('disabled');
          window.st.a.has(a.id) ? acb.classList.add('on') : acb.classList.remove('on');
        }
      });
    }
  });
}

// ============================================================
// CALC
// ============================================================
function calcTotals(){
  var onetime=0, monthly=0, pct=0;
  window.st.s.forEach(function(v,k){
    if(k==='wl') pct=v.pct;
    else if(k==='portal_m') monthly+=v.p;
    else if(v.m) monthly+=v.p;
    else onetime+=v.p;
  });
  window.st.a.forEach(function(v){ v.m ? monthly+=v.p : onetime+=v.p; });
  if(pct>0){ onetime*=(1+pct/100); monthly*=(1+pct/100); }
  var tier = tiers.find(function(t){return onetime>=t.min&&onetime<t.max}) || tiers[tiers.length-1];
  var discAmt = onetime*(tier.disc/100);
  var otFinal = onetime - discAmt;
  var prog = 0;
  if(onetime>0){
    var t1=tiers[1].min, t2=tiers[2].min, t3=tiers[3].min;
    if(onetime<t1) prog=(onetime/t1)*33.33;
    else if(onetime<t2) prog=33.33+((onetime-t1)/(t2-t1))*33.33;
    else if(onetime<t3) prog=66.66+((onetime-t2)/(t3-t2))*33.34;
    else prog=100;
  }
  window.calculatorData = {
    oneTime: Math.round(otFinal),
    oneTimeOriginal: Math.round(onetime),
    monthly: Math.round(monthly),
    discountAmount: Math.round(discAmt),
    discountPercent: tier.disc,
    hasDiscount: tier.disc>0
  };
  return {otf:otFinal, mo:monthly, disc:discAmt, tier:tier, prog:prog};
}

function calcMobile(){ var r=calcTotals(); updateCartMobile(r.otf,r.mo,r.disc,r.tier,r.prog); }
function calcDesktop(){ var r=calcTotals(); updateSidebarDesktop(r.otf,r.mo,r.disc,r.tier,r.prog); }

// ============================================================
// UPDATE CART MOBILE
// ============================================================
function updateCartMobile(otf, mo, disc, tier, prog){
  var cnt = window.st.s.size + window.st.a.size;
  var hasService = window.st.s.size>0 && (window.st.s.size>1 || !window.st.s.has('wl'));
  var ctaBtn = document.getElementById('mobileCtaBtn');

  document.getElementById('mobileSummaryInfo').textContent = ui.items(cnt);

  if(!hasService){
    ctaBtn.disabled=true; ctaBtn.style.opacity='0.5'; ctaBtn.style.cursor='not-allowed'; ctaBtn.title=ui.ctaDisabled;
  } else {
    ctaBtn.disabled=false; ctaBtn.style.opacity='1'; ctaBtn.style.cursor='pointer'; ctaBtn.title='';
  }

  if(cnt===0){
    document.getElementById('mobileSummaryTotal').textContent = fmt(0);
  } else {
    var sOT = tier.disc>0 ? '<span class="price-discounted" style="font-size:22px">'+fmt(Math.round(otf))+'</span>' : '<span style="font-size:22px">'+fmt(Math.round(otf))+'</span>';
    var sMo = mo>0 ? ' <span style="font-size:22px">+ '+fmtMo(Math.round(mo))+'</span>' : '';
    document.getElementById('mobileSummaryTotal').innerHTML = sOT + sMo;
  }

  document.getElementById('mobileSummaryProgFill').style.width = prog+'%';
  document.getElementById('mobileSummaryDiscText').textContent = tier.nxt ? ui.discReachShort(fmtK(tier.nxt), tier.nd) : ui.discUnlockedShort;

  if(tier.disc>0){
    document.getElementById('mobileSummaryBadge').style.display='inline-block';
    document.getElementById('mobileSummaryBadge').textContent = ui.discAppliedBadge(tier.disc);
  } else {
    document.getElementById('mobileSummaryBadge').style.display='none';
  }

  document.getElementById('mobileExpandedProgFill').style.width = prog+'%';
  document.querySelectorAll('.mobile-calc .expanded-prog-label').forEach(function(l){
    var t=parseInt(l.dataset.t); tier.disc>=t ? l.classList.add('on') : l.classList.remove('on');
  });
  document.getElementById('mobileExpandedDiscText').textContent = tier.nxt ? ui.discReachLong(fmtK(tier.nxt), tier.nd) : ui.discUnlockedLong;

  if(tier.disc>0){
    document.getElementById('mobileExpandedDiscBadge').style.display='inline-flex';
    document.getElementById('mobileExpandedBadgeText').textContent = ui.discApplied(tier.disc);
  } else {
    document.getElementById('mobileExpandedDiscBadge').style.display='none';
  }

  var h = '';
  window.st.s.forEach(function(v,k){
    if(k==='wl') return;
    if(k==='portal_m'){ h+='<div class="panel-item"><span class="panel-item-name">'+ui.portalMonthly+'</span><span class="panel-item-price">'+fmtMo(v.p)+'</span></div>'; return; }
    var svc = window.data.find(function(s){return s.id===k});
    var pr = v.m ? fmtMo(v.p) : fmt(v.p);
    h += '<div class="panel-item"><span class="panel-item-name">'+svc.n+'</span><span class="panel-item-price">'+pr+'</span></div>';
  });
  window.st.a.forEach(function(v,k){
    var addon=null;
    for(var s of data){ if(s.a){ var f=s.a.find(function(a){return a.id===k}); if(f){addon=f;break;} } }
    if(!addon) return;
    var pr = v.m ? fmt(Math.abs(v.p))+moLabel : fmt(Math.abs(v.p));
    var sg = v.p<0?'-':'+';
    var negClass = v.p<0?' neg':'';
    h += '<div class="panel-item"><span class="panel-item-name">*'+addon.n+'</span><span class="panel-item-price'+negClass+'">'+sg+pr+'</span></div>';
  });
  if(window.st.s.has('wl')) h+='<div class="panel-item"><span class="panel-item-name">'+ui.whiteLabel+'</span><span class="panel-item-price">'+ui.whiteLabelPrice+'</span></div>';
  document.getElementById('mobilePanelItems').innerHTML = cnt===0 ? '<div class="empty-cart">'+ui.selectServices+'</div>' : h;

  if(cnt>0){
    document.getElementById('mobileSubtotalBox').style.display='block';
    var stHTML = fmt(Math.round(otf+disc));
    if(mo>0) stHTML += ' + '+fmtMo(Math.round(mo));
    document.getElementById('mobileSubtotal').innerHTML = stHTML;
  } else {
    document.getElementById('mobileSubtotalBox').style.display='none';
  }

  if(tier.disc>0){
    document.getElementById('mobilePanelDiscLine').style.display='flex';
    document.getElementById('mobilePanelDiscAmt').textContent = '-'+fmt(Math.round(disc));
  } else {
    document.getElementById('mobilePanelDiscLine').style.display='none';
  }

  if(cnt>0){
    document.getElementById('mobilePanelFinal').style.display='block';
    var otHTML = tier.disc>0
      ? '<span class="price-original">'+fmt(Math.round(otf+disc))+'</span><span class="price-discounted">'+fmt(Math.round(otf))+'</span>'
      : fmt(Math.round(otf));
    var moHTML = mo>0 ? ' + '+fmtMo(Math.round(mo)) : '';
    document.getElementById('mobilePanelFinalTotal').innerHTML = otHTML + moHTML;
  } else {
    document.getElementById('mobilePanelFinal').style.display='none';
  }
}

// ============================================================
// UPDATE SIDEBAR DESKTOP
// ============================================================
function updateSidebarDesktop(otf, mo, disc, tier, prog){
  var cnt = window.st.s.size + window.st.a.size;
  var hasService = window.st.s.size>0 && (window.st.s.size>1 || !window.st.s.has('wl'));
  var ctaBtn = document.getElementById('desktopCtaBtn');

  if(!hasService){
    ctaBtn.disabled=true; ctaBtn.style.opacity='0.5'; ctaBtn.style.cursor='not-allowed'; ctaBtn.title=ui.ctaDisabled;
  } else {
    ctaBtn.disabled=false; ctaBtn.style.opacity='1'; ctaBtn.style.cursor='pointer'; ctaBtn.title='';
  }

  var h = '';
  window.st.s.forEach(function(v,k){
    if(k==='wl') return;
    if(k==='portal_m'){ h+='<div class="item"><span>'+ui.portalMonthly+'</span><span>'+fmtMo(v.p)+'</span></div>'; return; }
    var svc = window.data.find(function(s){return s.id===k});
    var pr = v.m ? fmtMo(v.p) : fmt(v.p);
    h += '<div class="item"><span>'+svc.n+'</span><span>'+pr+'</span></div>';
  });
  window.st.a.forEach(function(v,k){
    var addon=null;
    for(var s of data){ if(s.a){ var f=s.a.find(function(a){return a.id===k}); if(f){addon=f;break;} } }
    if(!addon) return;
    var pr = v.m ? fmt(Math.abs(v.p))+moLabel : fmt(Math.abs(v.p));
    var sg = v.p<0?'-':'+';
    var negClass = v.p<0?' class="neg-price"':'';
    h += '<div class="item"><span>*'+addon.n+'</span><span'+negClass+'>'+sg+pr+'</span></div>';
  });
  if(window.st.s.has('wl')) h+='<div class="item"><span>'+ui.whiteLabel+'</span><span>'+ui.whiteLabelPrice+'</span></div>';
  document.getElementById('desktopItems').innerHTML = cnt===0 ? '<div class="empty">'+ui.selectServices+'</div>' : h;

  document.getElementById('desktopProgFill').style.width = prog+'%';
  document.querySelectorAll('.desktop-calc .prog-label').forEach(function(l){
    var t=parseInt(l.dataset.t); tier.disc>=t ? l.classList.add('on') : l.classList.remove('on');
  });

  document.getElementById('desktopDiscInfo').innerHTML = tier.nxt
    ? '<span>'+ui.discountInfo(fmtK(tier.nxt), tier.nd)+'</span><div class="info-icon">i</div>'
    : '<span>'+ui.discountUnlocked+'</span><div class="info-icon">i</div>';

  if(tier.disc>0){
    document.getElementById('desktopDiscBadgeBox').style.display='flex';
    document.getElementById('desktopDiscBadge').innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg><span>'+ui.discApplied(tier.disc)+'</span>';
    document.getElementById('desktopDiscLine').style.display='flex';
    document.getElementById('desktopDiscAmt').textContent = '-'+fmt(Math.round(disc));
  } else {
    document.getElementById('desktopDiscBadgeBox').style.display='none';
    document.getElementById('desktopDiscLine').style.display='none';
  }

  if(cnt>0){
    document.getElementById('desktopSubtotalBox').style.display='block';
    var stHTML = fmt(Math.round(otf+disc));
    if(mo>0) stHTML += ' + '+fmtMo(Math.round(mo));
    document.getElementById('desktopSubtotal').innerHTML = stHTML;
    document.getElementById('desktopFinalBox').style.display='block';
    var otHTML = tier.disc>0
      ? '<span class="price-original">'+fmt(Math.round(otf+disc))+'</span><span class="price-discounted">'+fmt(Math.round(otf))+'</span>'
      : fmt(Math.round(otf));
    var moHTML = mo>0 ? ' + '+fmtMo(Math.round(mo)) : '';
    document.getElementById('desktopFinalTotal').innerHTML = otHTML + moHTML;
  } else {
    document.getElementById('desktopSubtotalBox').style.display='none';
    document.getElementById('desktopFinalBox').style.display='none';
  }
}

// ============================================================
// CART TOGGLE MOBILE
// ============================================================
window.toggleCartMobile = function(){
  var panel = document.getElementById('mobilePanel');
  var overlay = document.getElementById('mobileOverlay');
  if(panel.classList.contains('open')){
    panel.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow='';
  } else {
    panel.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow='hidden';
  }
};

window.closeCartMobile = function(){
  document.getElementById('mobilePanel').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('open');
  document.body.style.overflow='';
};

// ============================================================
// PATCH STATIC HTML FOR RS LOCALE
// ============================================================
function patchUI(){
  function el(id){ return document.getElementById(id); }
  function qs(sel){ return document.querySelector(sel); }

  // Step 1 titles
  var s1mh2=qs('#step1 .mobile-calc h1')||qs('#step1 .mobile-calc h2'), s1dh2=qs('#step1 .desktop-calc h1')||qs('#step1 .desktop-calc h2');
  if(s1mh2) s1mh2.textContent=ui.calcTitle;
  if(s1dh2) s1dh2.textContent=ui.calcTitle;

  // "Your Selection" labels
  var expTitle=qs('.expanded-title'), sideTitle=qs('.side-title');
  if(expTitle) expTitle.textContent=ui.yourSelection;
  if(sideTitle) sideTitle.textContent=ui.yourSelection;

  // CTA buttons
  var mCta=el('mobileCtaBtn'), dCta=el('desktopCtaBtn');
  if(mCta) mCta.textContent=ui.ctaBtn;
  if(dCta) dCta.textContent=ui.ctaBtn;

  // Notes in step 1
  var cartNote=qs('.cart-panel-footer .note'), sideNote=qs('.side-cta-wrapper .note');
  if(cartNote) cartNote.textContent=ui.note;
  if(sideNote) sideNote.textContent=ui.note;

  // Subtotal / Discount / Total labels
  var mSt=qs('#mobileSubtotalBox .subtotal-line span:first-child');
  var mDi=qs('#mobilePanelDiscLine span:first-child');
  var mTo=qs('#mobilePanelFinal .total-line span:first-child');
  if(mSt) mSt.textContent=ui.subtotal;
  if(mDi) mDi.textContent=ui.discount;
  if(mTo) mTo.textContent=ui.total;
  var dSt=qs('#desktopSubtotalBox .subtotal-line span:first-child');
  var dDi=qs('#desktopDiscLine span:first-child');
  var dTo=qs('#desktopFinalBox .total-line span:first-child');
  if(dSt) dSt.textContent=ui.subtotal;
  if(dDi) dDi.textContent=ui.discount;
  if(dTo) dTo.textContent=ui.total;

  // Tooltip CSS override
  var styleEl=document.createElement('style');
  styleEl.textContent='.info-icon.active::after{content:"'+ui.discountAppliesInfo+'"!important}.info-icon:hover::after{content:"'+ui.discountAppliesInfo.replace(/'/g,"\\'").replace(/\n/g,'\\A')+'"!important}';
  document.head.appendChild(styleEl);

  // Step 2 header
  var s2h2=qs('#step2 h1')||qs('#step2 h2');
  if(s2h2) s2h2.textContent=ui.step2Title;

  // "Your estimate" label (sibling before step2MobileTotalAmount)
  var amtEl=el('step2MobileTotalAmount');
  if(amtEl&&amtEl.previousElementSibling) amtEl.previousElementSibling.textContent=ui.yourEstimate;

  // Form labels & placeholders
  var nameIn=qs('#step2MobileForm [name="name"]');
  var emailIn=qs('#step2MobileForm [name="email"]');
  var compIn=qs('#step2MobileForm [name="company"]');
  var descIn=qs('#step2MobileForm [name="description"]');
  if(nameIn){ nameIn.placeholder=ui.namePlaceholder; var nl=nameIn.closest('div').querySelector('label'); if(nl) nl.innerHTML=ui.nameLabel+'<span style="color:#fff;margin-left:2px">*</span>'; }
  if(emailIn){ emailIn.placeholder=ui.emailPlaceholder; var el2=emailIn.closest('div').querySelector('label'); if(el2) el2.innerHTML=ui.emailLabel+'<span style="color:#fff;margin-left:2px">*</span>'; }
  if(compIn){ compIn.placeholder=ui.companyPlaceholder; var cl=compIn.closest('div').querySelector('label'); if(cl) cl.textContent=ui.companyLabel; }
  if(descIn){ descIn.placeholder=ui.projectPlaceholder; var dl=descIn.closest('div').querySelector('label'); if(dl) dl.innerHTML=ui.projectLabel+'<span style="color:#fff;margin-left:2px">*</span>'; }

  // Terms checkbox label
  var termsLbl=qs('label[for="termsCheckboxCustom"]');
  if(termsLbl) termsLbl.innerHTML=ui.termsText;

  // Continue & Back
  var contBtn=el('step2MobileContinueBtn'), backLnk=el('step2MobileBackBtn');
  if(contBtn) contBtn.textContent=ui.continueBtn;
  if(backLnk) backLnk.textContent=ui.backLink;

  // Step 2 note
  var s2note=qs('#step2 .note');
  if(s2note) s2note.textContent=ui.formNote;

  // Step 3 header
  var s3h2=el('step3Title'), s3conf=el('step3ConfirmationText');
  if(s3h2) s3h2.textContent=ui.step3Title;
  if(s3conf) s3conf.textContent=ui.confirmText;

  // Back to Homepage
  var s3home=qs('#step3BackHomeBtn a');
  if(s3home){ s3home.textContent=ui.backHome; s3home.href='/rs'; }

  // Summary title
  var s3sum=qs('#step3SummaryToggle div:first-child');
  if(s3sum) s3sum.textContent=ui.summaryTitle;

  // Summary field labels (each is a span sibling of the value element)
  function prevSpan(id){ var e=el(id); return e&&e.previousElementSibling; }
  var nl2=prevSpan('step3Name'), el3=prevSpan('step3Email'), cl2=prevSpan('step3Company');
  var dl2=prevSpan('step3BookedDate'), tl=prevSpan('step3BookedTime');
  if(nl2) nl2.textContent=ui.nameField;
  if(el3) el3.textContent=ui.emailField;
  if(cl2) cl2.textContent=ui.companyField;
  if(dl2) dl2.textContent=ui.callScheduled;
  if(tl) tl.textContent=ui.timeField;

  // Message label & toggle
  var msgText=el('step3MessageText');
  if(msgText&&msgText.previousElementSibling) msgText.previousElementSibling.textContent=ui.messageField;
  var msgToggle=el('step3MessageToggle');
  if(msgToggle) msgToggle.textContent=ui.viewFullMsg;

  // Services label
  var svcVis=el('step3ServicesVisible');
  if(svcVis&&svcVis.previousElementSibling) svcVis.previousElementSibling.textContent=ui.servicesField;

  // Pricing labels
  var stLabel=qs('#step3SubtotalRow span:first-child');
  var discLabel=qs('#step3DiscountRow span:first-child');
  var estLabel=el('step3Total')&&el('step3Total').previousElementSibling;
  if(stLabel) stLabel.textContent=ui.subtotalField;
  if(discLabel) discLabel.textContent=ui.discountField;
  if(estLabel) estLabel.textContent=ui.estimateField;

  // Calendar section
  var calSection=qs('#step3 [style*="font-size:20px"]');
  var calSub=qs('#step3 [style*="margin-bottom:24px"][style*="rgba(255,255,255,.5)"]');
  if(calSection) calSection.textContent=ui.calendarTitle;
  if(calSub) calSub.textContent=ui.calendarSubtitle;

  // Prev/Next month buttons
  var prevBtn=el('prevMonth'), nextBtn=el('nextMonth');
  if(prevBtn) prevBtn.textContent=ui.prevMonth;
  if(nextBtn) nextBtn.textContent=ui.nextMonth;

  // Change date button (keep SVG)
  var changeDateBtn=el('backToDateBtn');
  if(changeDateBtn){ var svg=changeDateBtn.querySelector('svg'); changeDateBtn.textContent=ui.changeDate; if(svg) changeDateBtn.insertBefore(svg,changeDateBtn.firstChild); }

  // Loading text
  var loadDiv=qs('#calendarLoading div');
  if(loadDiv) loadDiv.textContent=ui.loadingDates;

  // Book & back buttons
  var bookBtn=el('bookDiscoveryBtn'), s3back=el('step3BackBtn');
  if(bookBtn) bookBtn.textContent=ui.bookBtn;
  if(s3back) s3back.textContent=ui.back;
}

// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', function(){
  if(isRS) patchUI();
  if(window.innerWidth < 768){
    initMobile();
    var infoIcon = document.getElementById('mobileInfoIcon');
    if(infoIcon){
      infoIcon.addEventListener('click', function(e){ e.stopPropagation(); this.classList.toggle('active'); });
      document.addEventListener('click', function(){ infoIcon.classList.remove('active'); });
    }
    document.getElementById('mobilePanelHeader').addEventListener('click', function(e){
      if(e.target.id !== 'mobileCloseBtn') toggleCartMobile();
    });
    document.getElementById('mobileCloseBtn').addEventListener('click', function(e){ e.stopPropagation(); closeCartMobile(); });
    document.getElementById('mobileOverlay').addEventListener('click', closeCartMobile);

    setTimeout(function(){
      var panel = document.getElementById('mobilePanel');
      var header = document.getElementById('mobilePanelHeader');
      if(!panel||!header) return;
      var startY=0, currentY=0, isDragging=false, startTime=0;
      header.addEventListener('touchstart', function(e){ startY=e.touches[0].clientY; currentY=startY; isDragging=true; startTime=Date.now(); }, {passive:true});
      header.addEventListener('touchmove', function(e){ if(!isDragging) return; currentY=e.touches[0].clientY; }, {passive:true});
      header.addEventListener('touchend', function(){
        if(!isDragging) return;
        var timeDiff=Date.now()-startTime, deltaY=currentY-startY, isOpen=panel.classList.contains('open');
        isDragging=false;
        if(timeDiff<200&&Math.abs(deltaY)<10){ startY=0; currentY=0; return; }
        if(Math.abs(deltaY)>50){
          if(isOpen&&deltaY>0) closeCartMobile();
          else if(!isOpen&&deltaY<0) toggleCartMobile();
        }
        startY=0; currentY=0;
      });
    }, 500);
  } else {
    initDesktop();
  }
});

})();

// ============================================================
// MULTI-STEP NAVIGATION
// ============================================================
function goToStep(stepNum){
  document.querySelectorAll('.step-container').forEach(function(s){ s.classList.remove('active'); });
  document.getElementById('step'+stepNum).classList.add('active');
  try{
    document.body.scrollTop=0; document.documentElement.scrollTop=0; window.scrollTo(0,0);
    if(window.parent&&window.parent!==window) window.parent.postMessage({type:'scrollToCalculator'},'*');
  }catch(e){}

  var lines = ['progressLine1Mobile','progressLine2Mobile','progressLine3Mobile','progressLine1Desktop','progressLine2Desktop','progressLine3Desktop'];
  lines.forEach(function(id){ var el=document.getElementById(id); if(el) el.classList.remove('active','completed'); });

  if(stepNum===1){
    document.getElementById('progressLine1Mobile').classList.add('active');
    document.getElementById('progressLine1Desktop').classList.add('active');
  } else if(stepNum===2){
    document.getElementById('progressLine1Mobile').classList.add('completed');
    document.getElementById('progressLine2Mobile').classList.add('active');
    document.getElementById('progressLine1Desktop').classList.add('completed');
    document.getElementById('progressLine2Desktop').classList.add('active');
    updateStep2Total();
  } else if(stepNum===3){
    document.getElementById('progressLine1Mobile').classList.add('completed');
    document.getElementById('progressLine2Mobile').classList.add('completed');
    document.getElementById('progressLine3Mobile').classList.add('active');
    document.getElementById('progressLine1Desktop').classList.add('completed');
    document.getElementById('progressLine2Desktop').classList.add('completed');
    document.getElementById('progressLine3Desktop').classList.add('active');
  }
  window.scrollTo(0,0);
}

function updateStep2Total(){
  var cfg2 = window.calcConfig || {};
  var currency2 = cfg2.currency || 'usd';
  var moLabel2 = cfg2.moLabel || '/mo';
  var ui2 = cfg2.ui || {};

  function fmt2(n){
    if(currency2==='eur') return n.toLocaleString('de-DE').replace(/,/g,'.')+'\u20AC';
    return '$'+n.toLocaleString('en-US');
  }
  function fmtMo2(n){ return fmt2(n)+moLabel2; }

  var totalAmountEl = document.getElementById('step2MobileTotalAmount');
  var totalBreakdownEl = document.getElementById('step2MobileTotalBreakdown');
  if(!totalAmountEl||!totalBreakdownEl) return;

  var d = window.calculatorData;
  var html = '';
  if(d.hasDiscount&&d.discountAmount>0){
    html = '<span style="text-decoration:line-through;color:rgba(255,255,255,.35);font-size:26px;font-weight:400;margin-right:8px">'+fmt2(d.oneTimeOriginal)+'</span><span style="color:#CFFF54">'+fmt2(d.oneTime)+'</span>';
    if(d.monthly>0) html += ' <span style="font-size:26px">+ '+fmtMo2(d.monthly)+'</span>';
  } else {
    html = fmt2(d.oneTime);
    if(d.monthly>0) html += ' + '+fmtMo2(d.monthly);
  }
  totalAmountEl.innerHTML = html;

  var parts = [];
  if(d.oneTime>0) parts.push(fmt2(d.oneTime)+' '+(ui2.oneTimeLabel||'one-time'));
  if(d.monthly>0) parts.push(fmtMo2(d.monthly)+' '+(ui2.retainerLabel||'retainer'));
  if(d.hasDiscount&&d.discountPercent>0) parts.push(d.discountPercent+'% '+(ui2.discountLabel||'discount applied'));
  totalBreakdownEl.textContent = parts.length>0 ? parts.join(' • ') : (ui2.selectServices||'Select services to see estimate');
}

document.getElementById('mobileCtaBtn').addEventListener('click', function(e){ e.preventDefault(); goToStep(2); });
document.getElementById('desktopCtaBtn').addEventListener('click', function(e){ e.preventDefault(); goToStep(2); });
document.getElementById('step2MobileBackBtn').addEventListener('click', function(e){ e.preventDefault(); goToStep(1); });

window.toggleTermsCheckbox = function(){
  var cb = document.getElementById('termsCheckbox');
  var ccb = document.getElementById('termsCheckboxCustom');
  cb.checked = !cb.checked;
  cb.checked ? ccb.classList.add('on') : ccb.classList.remove('on');
  validateStep2Form();
};

function validateStep2Form(){
  var cfg3 = window.calcConfig || {};
  var ui3 = cfg3.ui || {};
  var nameInput = document.querySelector('#step2MobileForm input[name="name"]');
  var emailInput = document.querySelector('#step2MobileForm input[name="email"]');
  var descInput = document.querySelector('#step2MobileForm textarea[name="description"]');
  var termsCb = document.getElementById('termsCheckbox');
  var btn = document.getElementById('step2MobileContinueBtn');
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var isValid = nameInput.value.trim()!==''&&emailInput.value.trim()!==''&&emailRegex.test(emailInput.value.trim())&&descInput.value.trim()!==''&&termsCb.checked;
  if(isValid){
    btn.disabled=false; btn.style.opacity='1'; btn.style.cursor='pointer'; btn.title='';
    emailInput.style.borderColor='rgba(255,255,255,.15)';
  } else {
    btn.disabled=true; btn.style.opacity='0.5'; btn.style.cursor='not-allowed';
    if(nameInput.value.trim()===''||descInput.value.trim()==='') btn.title=ui3.validationFill||'Please fill in all required fields';
    else if(emailInput.value.trim()!==''&&!emailRegex.test(emailInput.value.trim())){ btn.title=ui3.validationEmail||'Please enter a valid email address'; emailInput.style.borderColor='rgba(255,100,100,.5)'; }
    else if(!termsCb.checked) btn.title=ui3.validationTerms||'Please accept the Terms of Service and Privacy Policy';
    else btn.title=ui3.validationFill||'Please fill in all required fields';
  }
}

var originalGoToStep = goToStep;
goToStep = function(stepNum){
  originalGoToStep(stepNum);
  if(stepNum===2){
    setTimeout(function(){
      var nameInput=document.querySelector('#step2MobileForm input[name="name"]');
      var emailInput=document.querySelector('#step2MobileForm input[name="email"]');
      var descInput=document.querySelector('#step2MobileForm textarea[name="description"]');
      var termsCb=document.getElementById('termsCheckbox');
      if(nameInput) nameInput.addEventListener('input',validateStep2Form);
      if(emailInput) emailInput.addEventListener('input',validateStep2Form);
      if(descInput) descInput.addEventListener('input',validateStep2Form);
      if(termsCb) termsCb.addEventListener('change',validateStep2Form);
      validateStep2Form();
    },100);
  }
};

document.getElementById('step2MobileContinueBtn').addEventListener('click', function(e){ e.preventDefault(); populateStep3Summary(); goToStep(3); });
document.getElementById('step3BackBtn').addEventListener('click', function(e){ e.preventDefault(); goToStep(2); });

document.getElementById('step3SummaryToggle').addEventListener('click', function(){
  var content = document.getElementById('step3SummaryContent');
  var arrow = document.getElementById('step3SummaryArrow');
  if(window.getComputedStyle(content).maxHeight==='0px'){
    content.style.maxHeight=content.scrollHeight+'px'; arrow.style.transform='rotate(180deg)';
    setTimeout(function(){ content.style.overflow='visible'; content.style.maxHeight=content.scrollHeight+'px'; },300);
  } else {
    content.style.overflow='hidden'; content.style.maxHeight='0px'; arrow.style.transform='rotate(0deg)';
  }
});

function updateSummaryHeight(){
  var content=document.getElementById('step3SummaryContent');
  if(content.style.maxHeight!=='0px'&&content.style.maxHeight!=='') content.style.maxHeight=content.scrollHeight+'px';
}

var messageFullText='';
document.getElementById('step3MessageToggle').addEventListener('click', function(){
  var cfg4=window.calcConfig||{}, ui4=cfg4.ui||{};
  var textEl=document.getElementById('step3MessageText');
  var toggle=document.getElementById('step3MessageToggle');
  if(toggle.textContent===(ui4.viewFullMsg||'View full message')){ textEl.textContent=messageFullText; toggle.textContent=ui4.showLess||'Show less'; }
  else { textEl.textContent=messageFullText.substring(0,120)+'...'; toggle.textContent=ui4.viewFullMsg||'View full message'; }
  setTimeout(updateSummaryHeight,50);
});

document.getElementById('step3ServicesToggle').addEventListener('click', function(){
  var hidden=document.getElementById('step3ServicesHidden');
  var toggle=document.getElementById('step3ServicesToggle');
  if(hidden.style.display==='none'||hidden.style.display===''){
    hidden.style.display='flex'; toggle.textContent=((window.calcConfig||{}).ui||{}).showLess||'Show less';
  } else {
    hidden.style.display='none'; toggle.textContent=toggle.dataset.text;
  }
  setTimeout(updateSummaryHeight,50);
});

function populateStep3Summary(){
  var cfg5=window.calcConfig||{}, ui5=cfg5.ui||{}, currency5=cfg5.currency||'usd', moLabel5=cfg5.moLabel||'/mo';
  function fmt5(n){ if(currency5==='eur') return n.toLocaleString('de-DE').replace(/,/g,'.')+'\u20AC'; return '$'+n.toLocaleString('en-US'); }
  function fmtMo5(n){ return fmt5(n)+moLabel5; }

  var form=document.getElementById('step2MobileForm');
  var formData=new FormData(form);

  document.getElementById('step3Name').textContent=formData.get('name')||'—';
  document.getElementById('step3Email').textContent=formData.get('email')||'—';
  var company=formData.get('company');
  if(company){ document.getElementById('step3Company').textContent=company; document.getElementById('step3CompanyRow').style.display='flex'; }
  else document.getElementById('step3CompanyRow').style.display='none';

  var message=formData.get('description')||'';
  var messageText=document.getElementById('step3MessageText');
  var messageToggle=document.getElementById('step3MessageToggle');
  messageFullText=message;
  if(message.length>120){ messageText.textContent=message.substring(0,120)+'...'; messageToggle.style.display='block'; }
  else { messageText.textContent=message||'—'; messageToggle.style.display='none'; }

  var servicesVisible=[], servicesHidden=[], serviceIndex=0;
  window.st.s.forEach(function(v,k){
    if(k==='wl'||k==='portal_m') return;
    var svc=window.data.find(function(s){return s.id===k});
    var pr=v.m?fmtMo5(v.p):fmt5(v.p);
    var html='<div style="display:flex;justify-content:space-between;font-size:16px"><span style="color:rgba(255,255,255,.85)">'+svc.n+'</span><span style="font-weight:500;color:#fff">'+pr+'</span></div>';
    serviceIndex<2?servicesVisible.push(html):servicesHidden.push(html); serviceIndex++;
  });
  window.st.a.forEach(function(v,k){
    var addon=null;
    for(var s of window.data){ if(s.a){ var f=s.a.find(function(a){return a.id===k}); if(f){addon=f;break;} } }
    if(!addon) return;
    var pr=v.m?fmt5(Math.abs(v.p))+moLabel5:fmt5(Math.abs(v.p));
    var sign=v.p<0?'- ':'+ ';
    var html='<div style="display:flex;justify-content:space-between;font-size:16px"><span style="color:rgba(255,255,255,.65);padding-left:12px">• '+addon.n+'</span><span style="font-weight:500;color:#fff">'+sign+pr+'</span></div>';
    serviceIndex<2?servicesVisible.push(html):servicesHidden.push(html); serviceIndex++;
  });
  if(window.st.s.has('wl')){
    var html='<div style="display:flex;justify-content:space-between;font-size:16px"><span style="color:rgba(255,255,255,.85)">'+(ui5.whiteLabel||'White Label')+'</span><span style="font-weight:500;color:#fff">+20%</span></div>';
    serviceIndex<2?servicesVisible.push(html):servicesHidden.push(html); serviceIndex++;
  }

  var visibleEl=document.getElementById('step3ServicesVisible');
  var hiddenEl=document.getElementById('step3ServicesHidden');
  var toggleEl=document.getElementById('step3ServicesToggle');
  if(servicesVisible.length===0){
    visibleEl.innerHTML='<div style="font-size:16px;color:rgba(255,255,255,.4)">'+(ui5.noServices||'No services selected')+'</div>';
    hiddenEl.style.display='none'; toggleEl.style.display='none';
  } else {
    visibleEl.innerHTML=servicesVisible.join('');
    if(servicesHidden.length>0){
      hiddenEl.innerHTML=servicesHidden.join(''); toggleEl.style.display='block';
      var viewMoreText=(ui5.viewMore||function(n){return 'View '+n+' more service'+(n===1?'':'s');})(servicesHidden.length);
      toggleEl.textContent=viewMoreText; toggleEl.dataset.text=viewMoreText;
    } else { hiddenEl.style.display='none'; toggleEl.style.display='none'; }
  }

  var calcData=window.calculatorData;
  var stHTML=fmt5(calcData.oneTimeOriginal); if(calcData.monthly>0) stHTML+=' + '+fmtMo5(calcData.monthly);
  document.getElementById('step3Subtotal').innerHTML=stHTML;
  if(calcData.hasDiscount){ document.getElementById('step3DiscountRow').style.display='flex'; document.getElementById('step3Discount').textContent='-'+fmt5(calcData.discountAmount)+' ('+calcData.discountPercent+'%)'; }
  else document.getElementById('step3DiscountRow').style.display='none';

  var totalEl=document.getElementById('step3Total');
  var totalHTML=calcData.hasDiscount?'<span style="color:#CFFF54">'+fmt5(calcData.oneTime)+'</span>':fmt5(calcData.oneTime);
  if(calcData.monthly>0) totalHTML+=' <span style="color:#fff">+ '+fmtMo5(calcData.monthly)+'</span>';
  totalEl.innerHTML=totalHTML; totalEl.style.color='#fff';

  loadCalendar();
}

function loadCalendar(){
  var cfg6=window.calcConfig||{}, ui6=cfg6.ui||{}, currency6=cfg6.currency||'usd', moLabel6=cfg6.moLabel||'/mo';
  var WORKER_URL=cfg6.workerUrl||'https://bykreator-calendar.bykreator.workers.dev';
  var dateLocale=ui6.dateLocale||'en-US';

  function fmt6(n){ if(currency6==='eur') return n.toLocaleString('de-DE').replace(/,/g,'.')+'\u20AC'; return '$'+n.toLocaleString('en-US'); }

  var currentDate=new Date(), selectedDate=null, selectedTime=null, availableSlots=[];

  function renderMonth(date){
    var year=date.getFullYear(), month=date.getMonth();
    document.getElementById('currentMonth').textContent=new Date(year,month,1).toLocaleDateString(dateLocale,{month:'long',year:'numeric'});
    var firstDay=new Date(year,month,1), lastDay=new Date(year,month+1,0), startDay=firstDay.getDay();
    var grid=document.getElementById('dateGrid');
    grid.innerHTML='';
    (ui6.days||['Sun','Mon','Tue','Wed','Thu','Fri','Sat']).forEach(function(d){
      var h=document.createElement('div');
      h.style.cssText='text-align:center;font-size:12px;color:rgba(255,255,255,.5);font-weight:600;padding:8px 0';
      h.textContent=d; grid.appendChild(h);
    });
    for(var i=0;i<startDay;i++) grid.appendChild(document.createElement('div'));
    var today=new Date(); today.setHours(0,0,0,0);
    for(var day=1;day<=lastDay.getDate();day++){
      var dateObj=new Date(year,month,day);
      var btn=document.createElement('button');
      btn.textContent=day;
      var tzOffset=dateObj.getTimezoneOffset()*60000;
      btn.dataset.date=new Date(dateObj.getTime()-tzOffset).toISOString().split('T')[0];
      var isPast=dateObj<today, isSel=selectedDate===btn.dataset.date;
      var s='padding:12px;border-radius:8px;font-size:14px;font-weight:500;font-family:inherit;cursor:pointer;transition:all .2s;';
      if(isPast){ s+='background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.2);cursor:not-allowed;'; btn.disabled=true; }
      else if(isSel) s+='background:#CFFF54;border:1px solid #CFFF54;color:#000;';
      else s+='background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;';
      btn.style.cssText=s;
      if(!isPast) btn.addEventListener('click',function(){
        selectedDate=this.dataset.date; selectedTime=null;
        document.getElementById('dateSelectionView').style.display='none';
        document.getElementById('timeSelectionView').style.display='block';
        loadTimeSlotsForDate(selectedDate);
      });
      grid.appendChild(btn);
    }
  }

  function loadTimeSlotsForDate(date){
    var grid=document.getElementById('timeSlotsGrid');
    var dispFn=ui6.availableFor||function(d){return 'Available times for '+d;};
    document.getElementById('selectedDateDisplay').textContent=dispFn(new Date(date).toLocaleDateString(dateLocale,{weekday:'long',month:'long',day:'numeric'}));
    grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:20px;color:rgba(255,255,255,.4)">'+(ui6.loadingSlots||'Loading slots...')+'</div>';
    fetch(WORKER_URL+'/api/availability?date='+date)
      .then(function(r){ if(!r.ok) throw new Error('status '+r.status); return r.json(); })
      .then(function(d){
        availableSlots=d.slots||[];
        if(d.slots&&d.slots.length>0) renderTimeSlots(d.slots);
        else grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:20px;color:rgba(255,255,255,.4)">'+(ui6.noSlots||'No available slots for this date')+'</div>';
      })
      .catch(function(){ grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:20px;color:rgba(255,255,255,.4)">'+(ui6.slotsError||'Error loading slots. Please try again.')+'</div>'; });
  }

  function renderTimeSlots(slots){
    var grid=document.getElementById('timeSlotsGrid');
    grid.innerHTML=''; availableSlots=slots;
    slots.forEach(function(slot){
      var btn=document.createElement('button');
      var h12=ui6.timeHour12!==undefined?ui6.timeHour12:true;
      btn.textContent=new Date(slot.start).toLocaleTimeString(dateLocale,{hour:h12?'numeric':'2-digit',minute:'2-digit',hour12:h12});
      btn.dataset.time=slot.start;
      var isSel=selectedTime===slot.start;
      var s='padding:12px;border-radius:8px;font-size:14px;font-weight:500;font-family:inherit;cursor:pointer;transition:all .2s;';
      s+=isSel?'background:#CFFF54;border:1px solid #CFFF54;color:#000;':'background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;';
      btn.style.cssText=s;
      btn.addEventListener('click',function(){
        selectedTime=this.dataset.time; renderTimeSlots(slots);
        var bookBtn=document.getElementById('bookDiscoveryBtn');
        bookBtn.disabled=false; bookBtn.style.opacity='1'; bookBtn.style.cursor='pointer'; bookBtn.title='';
      });
      grid.appendChild(btn);
    });
  }

  document.getElementById('backToDateBtn').addEventListener('click',function(){
    document.getElementById('timeSelectionView').style.display='none';
    document.getElementById('dateSelectionView').style.display='block';
    selectedTime=null;
    var bookBtn=document.getElementById('bookDiscoveryBtn');
    bookBtn.disabled=true; bookBtn.style.opacity='0.5'; bookBtn.style.cursor='not-allowed'; bookBtn.title=ui6.bookBtnDisabled||'Please select a date and time';
  });

  document.getElementById('bookDiscoveryBtn').addEventListener('click',function(){
    if(!selectedDate||!selectedTime){ alert(ui6.bookBtnDisabled||'Please select a date and time'); return; }
    var btn=this;
    btn.textContent=ui6.bookingBtn||'Booking...'; btn.disabled=true; btn.style.opacity='0.5';
    var form=document.getElementById('step2MobileForm');
    var formData=new FormData(form);
    var selectedSlot=availableSlots.find(function(s){return s.start===selectedTime;});
    var servicesList=[];
    window.st.s.forEach(function(v,k){
      if(k==='wl'||k==='portal_m') return;
      var svc=window.data.find(function(s){return s.id===k}); if(!svc) return;
      var price=v.m?fmt6(v.p)+moLabel6:fmt6(v.p);
      var addons=[];
      window.st.a.forEach(function(av,ak){
        if(svc.a){ var a=svc.a.find(function(x){return x.id===ak}); if(a){ var ap=av.m?fmt6(Math.abs(av.p))+moLabel6:fmt6(Math.abs(av.p)); addons.push('  \u2022 '+a.n+' ('+(av.p<0?'-':'+')+ap+')'); } }
      });
      servicesList.push(svc.n+' ('+price+')'+(addons.length>0?'\n'+addons.join('\n'):''));
    });
    if(window.st.s.has('wl')) servicesList.push((ui6.whiteLabel||'White Label')+' (+20%)');
    if(window.st.s.has('portal_m')){ var pd=window.st.s.get('portal_m'); servicesList.push(ui6.clientHubMonthly?ui6.clientHubMonthly(pd.p):('Client Hub - Monthly ('+fmt6(pd.p)+moLabel6+')')); }

    var notesText='Company: '+(formData.get('company')||'N/A')+'\nDescription: '+formData.get('description')+'\n\nServices:\n'+servicesList.join('\n')+'\n\nEstimate: '+fmt6(window.calculatorData.oneTime)+(window.calculatorData.monthly>0?' + '+fmt6(window.calculatorData.monthly)+moLabel6:'')+(window.calculatorData.hasDiscount?' ('+window.calculatorData.discountPercent+'% '+(ui6.discountLabel||'discount applied')+')':'');

    fetch(WORKER_URL+'/api/book',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:formData.get('name'),email:formData.get('email'),company:formData.get('company')||'N/A',description:formData.get('description'),start:selectedTime,end:selectedSlot?selectedSlot.end:new Date(new Date(selectedTime).getTime()+30*60000).toISOString(),notes:notesText,locale:cfg6.locale||'en'})
    })
    .then(function(r){return r.json();})
    .then(function(d){
      if(d.success) showConfirmationScreen();
      else{ alert((ui6.bookingFailed||function(e){return 'Booking failed: '+e;})(d.error||'Unknown error')); btn.textContent=ui6.bookBtn||'Book Discovery Call'; btn.disabled=false; btn.style.opacity='1'; }
    })
    .catch(function(){ alert(ui6.bookingError||'Booking error. Please try again or contact us directly.'); btn.textContent=ui6.bookBtn||'Book Discovery Call'; btn.disabled=false; btn.style.opacity='1'; });
  });

  function showConfirmationScreen(){
    var cfg7=window.calcConfig||{}, ui7=cfg7.ui||{};
    document.getElementById('step3Title').textContent=ui7.allSet||"You're all set!";
    document.getElementById('step3ConfirmationText').style.display='block';
    var bhb=document.getElementById('step3BackHomeBtn'); if(bhb) bhb.style.display='block';
    document.getElementById('progressLine3Mobile').classList.add('completed'); document.getElementById('progressLine3Mobile').classList.remove('active');
    document.getElementById('progressLine3Desktop').classList.add('completed'); document.getElementById('progressLine3Desktop').classList.remove('active');
    var ms=document.querySelector('#step3 .mobile-step'), ch=ms.children;
    if(ch[2]) ch[2].style.display='none'; if(ch[3]) ch[3].style.display='none';
    document.getElementById('step3BookingDetails').style.display='flex';
    document.getElementById('step3BookedDate').textContent=new Date(selectedDate).toLocaleDateString(dateLocale,{weekday:'long',month:'long',day:'numeric',year:'numeric'});
    var h12b=ui6.timeHour12!==undefined?ui6.timeHour12:true;
    document.getElementById('step3BookedTime').textContent=new Date(selectedTime).toLocaleTimeString(dateLocale,{hour:h12b?'numeric':'2-digit',minute:'2-digit',hour12:h12b});
    var sc=document.getElementById('step3SummaryContent'), st=document.getElementById('step3SummaryToggle');
    sc.style.maxHeight='9999px'; sc.style.overflow='visible'; sc.style.transition='none';
    var mt=document.getElementById('step3MessageToggle');
    if(mt&&mt.style.display!=='none'){ document.getElementById('step3MessageText').textContent=messageFullText; mt.style.display='none'; }
    var svt=document.getElementById('step3ServicesToggle');
    if(svt&&svt.style.display!=='none'){ document.getElementById('step3ServicesHidden').style.display='flex'; svt.style.display='none'; }
    st.style.cursor='default'; st.style.pointerEvents='none'; document.getElementById('step3SummaryArrow').style.display='none';
  }

  document.getElementById('prevMonth').addEventListener('click',function(){
    currentDate.setMonth(currentDate.getMonth()-1); selectedDate=null; selectedTime=null;
    document.getElementById('dateSelectionView').style.display='block'; document.getElementById('timeSelectionView').style.display='none';
    var b=document.getElementById('bookDiscoveryBtn'); b.disabled=true; b.style.opacity='0.5'; b.style.cursor='not-allowed'; b.title=ui6.bookBtnDisabled||'Please select a date and time';
    renderMonth(currentDate);
  });
  document.getElementById('nextMonth').addEventListener('click',function(){
    currentDate.setMonth(currentDate.getMonth()+1); selectedDate=null; selectedTime=null;
    document.getElementById('dateSelectionView').style.display='block'; document.getElementById('timeSelectionView').style.display='none';
    var b=document.getElementById('bookDiscoveryBtn'); b.disabled=true; b.style.opacity='0.5'; b.style.cursor='not-allowed'; b.title=ui6.bookBtnDisabled||'Please select a date and time';
    renderMonth(currentDate);
  });

  document.getElementById('calendarLoading').style.display='none';
  renderMonth(currentDate);
}
