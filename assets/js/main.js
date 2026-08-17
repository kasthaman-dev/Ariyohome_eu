/* ==========================================================================
   Ariyo Homes — site behaviour
   --------------------------------------------------------------------------
   The contact form POSTs to the serverless route in api/contact.js, which
   emails the enquiry to CONTACT_EMAIL via Resend. Set FORM_ENDPOINT to ''
   to fall back to opening the visitor's own mail client instead.

   Note: the route only exists on Vercel (or under `vercel dev`). Opening the
   site from a plain static server will get a 404 here and show the fallback
   message with a mailto link.
   ========================================================================== */
const FORM_ENDPOINT = '/api/contact';
const CONTACT_EMAIL = 'Info@ariyohomes.eu';

/* --------------------------------------------------------------------------
   Translations
   -------------------------------------------------------------------------- */
const I18N = {
  lv: {
    _title: 'Ariyo Homes — Mūsdienīgas moduļu mājas jaunai dzīves kvalitātei',
    _desc: 'Ariyo Homes ražo modernas moduļu mājas un moduļu ēkas no 25 līdz 120 m². Ilgtspējīgi materiāli, pielāgojami plānojumi, uzstādīšana dažās dienās, piegāde visā Eiropā.',

    skip: 'Pāriet uz saturu',
    nav_home: 'SĀKUMS', nav_models: 'MĀJAS', nav_layouts: 'PLĀNOJUMI',
    nav_install: 'UZSTĀDĪŠANA', nav_about: 'PAR MUMS', nav_contact: 'KONTAKTI',
    nav_cta: 'SAZINĀTIES',

    hero_title: 'Mūsdienīgas<br>moduļu mājas',
    hero_tagline: 'JAUNAI DZĪVES KVALITĀTEI',
    hero_lead: 'Ilgtspējīgi, pārdomāti un pielāgojami mājokļi, kas pielāgojas tavām vajadzībām.',
    hero_btn_models: 'SKATĪT MĀJAS',
    hero_btn_start: 'SĀKT PROJEKTU',
    hero_badge: 'MĀJAS,<br>KURAS<br>PIELĀGOJAS<br>TEV',

    f1_t: 'PIEEJAMĪBA',
    f1_d: 'Gudrāks veids, kā iegūt papildu telpu bez augstām izmaksām un ilgajiem būvniecības termiņiem.',
    f2_t: 'ĀTRA UZSTĀDĪŠANA',
    f2_d: 'Piegādājam gatavu uzstādīšanai uz sagatavotas vietas.',
    f3_t: 'PERSONĪGS ATBALSTS',
    f3_d: 'Mēs palīdzam jums visa procesa laikā.',
    f4_t: 'PILNĪBĀ PIELĀGOJAMA',
    f4_d: 'Izvēlieties no dažādiem plānojumiem, izmēriem un apdarēm, kas atbilst jūsu vajadzībām.',
    f5_t: 'PIEGĀDE VISĀ EIROPĀ',
    f5_d: 'Piegāde visā Eiropā – ērta piegāde līdz galamērķim.',

    about_eyebrow: 'PAR MUMS',
    about_title: 'Mēs radām mājas,<br>kas iedvesmo.',
    about_text: 'Ariyo Homes piedāvā modernas moduļu mājas un moduļu ēkas, kas apvieno augstu kvalitāti, ilgtspējīgas tehnoloģijas un ātru uzstādīšanu.',
    about_btn: 'UZZINĀT VAIRĀK',

    delivery_eyebrow: 'ĀTRI. KVALITATĪVI. ILGTSPĒJĪGI.',
    delivery_title: 'No rūpnīcas līdz tavai jaunajai mājai tikai dažās dienās.',
    delivery_btn: 'KĀ TAS NOTIEK?',

    stat_projects: 'Pabeigtu projektu',
    stat_clients: 'Apmierinātu klientu',
    stat_europe: 'Piegāde visā Eiropā',
    stat_care: 'Ražots ar rūpēm',

    models_eyebrow: 'MĀJU MODEĻI',
    models_title: 'IZVĒLIES SAVU MODULI',
    models_lead: 'Katrs modelis ir pielāgojams — plānojums, apdare un tehniskais aprīkojums tiek saskaņots ar tavām vajadzībām.',
    m1_desc: 'Kompakta studija viesu namiņam, birojam vai īstermiņa īrei.',
    // Areas with a decimal need a per-language separator (LV comma, EN point).
    m1_area: '38,6 m²',
    m1_rooms: '1 istaba',
    m2_desc: 'Divu istabu plānojums ar atvērtu virtuvi un terasi visā fasādes garumā.',
    m2_area: '58,9 m²',
    m2_rooms: '2 istabas',
    m3_desc: 'Ģimenes māja no diviem moduļiem — pilnībā aprīkota jau piegādes brīdī.',
    m3_area: '77,2 m²',
    m3_rooms: '4 istabas',

    process_eyebrow: 'UZSTĀDĪŠANA',
    process_title: 'ČETRI SOĻI<br>LĪDZ MĀJAI',
    s1_t: 'KONSULTĀCIJA', s1_d: 'Noskaidrojam vajadzības, budžetu un zemesgabala iespējas.',
    s2_t: 'PROJEKTS', s2_d: 'Izvēlies gatavu plānojumu vai pielāgo to savām vajadzībām.',
    s3_t: 'PIEGĀDE', s3_d: 'No ražotnes uz jūsu izvēlētu vietu Eiropā',
    s4_t: 'UZSTĀDĪŠANA', s4_d: 'Piegāde un montāža objektā vienas dienas laikā.',

    cta_title: 'PLĀNOJUMS, KAS<br>PIELĀGOJAS TEV',
    cta_text: 'No 25 m² studijas līdz 120 m² ģimenes mājai — izvēlies plānojumu no kataloga vai izstrādā savu kopā ar mūsu arhitektiem.',
    cta_btn: 'SKATĪT PLĀNOJUMUS',

    contact_eyebrow: 'KONTAKTI',
    contact_title: 'SĀKSIM TAVU<br>PROJEKTU',
    contact_text: 'Atstāj ziņu — sazināsimies vienas darba dienas laikā un sagatavosim provizorisku piedāvājumu.',
    contact_city: 'Rīga, Latvija',

    form_name: 'Vārds',
    form_email: 'E-pasts',
    form_model: 'Modelis vai platība',
    form_message: 'Pastāsti par savu ieceri',
    form_submit: 'NOSŪTĪT PIETEIKUMU',
    form_sending: 'SŪTA…',
    form_sent: 'PALDIES!',
    err_required: 'Šis lauks ir obligāts.',
    err_email: 'Lūdzu, ievadi derīgu e-pasta adresi.',
    status_sent: 'Paldies! Pieteikums saņemts — sazināsimies vienas darba dienas laikā.',
    status_mail: 'Atveram tavu e-pasta programmu ar sagatavotu ziņu.',
    status_error_prefix: 'Neizdevās nosūtīt. Raksti mums uz',

    foot_homes: 'MĀJAS', foot_modular: 'Moduļu mājas', foot_layouts: 'Plānojumi',
    foot_offices: 'Biroji un studijas',
    foot_company: 'UZŅĒMUMS', foot_about: 'Par mums', foot_install: 'Uzstādīšana',
    foot_contact: 'Kontakti', foot_follow: 'SEKO',
    foot_copy: '© 2026 Ariyo Homes. Visas tiesības aizsargātas.',
    foot_legal: 'Privātuma politika · Sīkdatnes'
  },

  en: {
    _title: 'Ariyo Homes — Modern modular homes for a new quality of life',
    _desc: 'Ariyo Homes builds modern modular houses and modular buildings from 25 to 120 m². Sustainable materials, customisable layouts, installation in days, delivery across Europe.',

    skip: 'Skip to content',
    nav_home: 'HOME', nav_models: 'HOMES', nav_layouts: 'LAYOUTS',
    nav_install: 'INSTALLATION', nav_about: 'ABOUT US', nav_contact: 'CONTACT',
    nav_cta: 'GET IN TOUCH',

    hero_title: 'Modern<br>modular homes',
    hero_tagline: 'FOR A NEW QUALITY OF LIFE',
    hero_lead: 'Sustainable, thoughtfully designed and adaptable homes that fit the way you live.',
    hero_btn_models: 'VIEW HOMES',
    hero_btn_start: 'START A PROJECT',
    hero_badge: 'HOMES<br>THAT<br>ADAPT<br>TO YOU',

    f1_t: 'AFFORDABILITY',
    f1_d: 'A smarter way to gain extra space without high costs or long construction timelines.',
    f2_t: 'FAST INSTALLATION',
    f2_d: 'Delivered ready to install on a prepared site.',
    f3_t: 'PERSONAL SUPPORT',
    f3_d: 'We are with you through the whole process.',
    f4_t: 'FULLY CUSTOMISABLE',
    f4_d: 'Choose from a range of layouts, sizes and finishes to match your needs.',
    f5_t: 'DELIVERY ACROSS EUROPE',
    f5_d: 'Delivery across Europe – convenient transport all the way to your site.',

    about_eyebrow: 'ABOUT US',
    about_title: 'We create homes<br>that inspire.',
    about_text: 'Ariyo Homes builds modern modular houses and modular buildings that combine high quality, sustainable technology and fast installation.',
    about_btn: 'LEARN MORE',

    delivery_eyebrow: 'FAST. HIGH QUALITY. SUSTAINABLE.',
    delivery_title: 'From the factory to your new home in just a few days.',
    delivery_btn: 'HOW IT WORKS',

    stat_projects: 'Completed projects',
    stat_clients: 'Happy clients',
    stat_europe: 'Delivery across Europe',
    stat_care: 'Made with care',

    models_eyebrow: 'HOME MODELS',
    models_title: 'CHOOSE YOUR MODULE',
    models_lead: 'Every model is customisable — layout, finishes and technical equipment are agreed around your needs.',
    m1_desc: 'A compact studio for a guest house, home office or short-term rental.',
    m1_area: '38.6 m²',
    m1_rooms: '1 room',
    m2_desc: 'A two-room layout with an open kitchen and a terrace along the full façade.',
    m2_area: '58.9 m²',
    m2_rooms: '2 rooms',
    m3_desc: 'A family home built from two modules — fully equipped on delivery.',
    m3_area: '77.2 m²',
    m3_rooms: '4 rooms',

    process_eyebrow: 'INSTALLATION',
    process_title: 'FOUR STEPS<br>TO YOUR HOME',
    s1_t: 'CONSULTATION', s1_d: 'We map out your needs, your budget and what the plot allows.',
    s2_t: 'DESIGN', s2_d: 'Pick a ready layout or adapt it to your own needs.',
    s3_t: 'DELIVERY', s3_d: 'From our factory to the site you choose, anywhere in Europe',
    s4_t: 'INSTALLATION', s4_d: 'Delivery and assembly on site within a single day.',

    cta_title: 'A LAYOUT THAT<br>ADAPTS TO YOU',
    cta_text: 'From a 25 m² studio to a 120 m² family home — choose a layout from the catalogue or develop your own with our architects.',
    cta_btn: 'VIEW LAYOUTS',

    contact_eyebrow: 'CONTACT',
    contact_title: 'LET’S START<br>YOUR PROJECT',
    contact_text: 'Leave us a message — we will reply within one business day with a preliminary offer.',
    contact_city: 'Riga, Latvia',

    form_name: 'Name',
    form_email: 'Email',
    form_model: 'Model or floor area',
    form_message: 'Tell us about your plans',
    form_submit: 'SEND ENQUIRY',
    form_sending: 'SENDING…',
    form_sent: 'THANK YOU!',
    err_required: 'This field is required.',
    err_email: 'Please enter a valid email address.',
    status_sent: 'Thank you! We have your enquiry and will reply within one business day.',
    status_mail: 'Opening your email app with the message ready to send.',
    status_error_prefix: 'Could not send. Please email us at',

    foot_homes: 'HOMES', foot_modular: 'Modular homes', foot_layouts: 'Layouts',
    foot_offices: 'Offices and studios',
    foot_company: 'COMPANY', foot_about: 'About us', foot_install: 'Installation',
    foot_contact: 'Contact', foot_follow: 'FOLLOW',
    foot_copy: '© 2026 Ariyo Homes. All rights reserved.',
    foot_legal: 'Privacy policy · Cookies'
  }
};

const LANG_LABEL = { lv: 'LV', en: 'EN' };
let lang = 'lv';

function t(key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.lv[key] || '';
}

function applyLanguage(next) {
  if (!I18N[next]) return;
  lang = next;

  document.documentElement.lang = next;
  document.title = t('_title');

  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', t('_desc'));

  // Strings come only from the dictionary above, so innerHTML is safe here
  // and lets translations keep their <br> line breaks.
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = I18N[next][el.dataset.i18n];
    if (value != null) el.innerHTML = value;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const value = I18N[next][el.dataset.i18nPlaceholder];
    if (value != null) el.placeholder = value;
  });

  const current = document.getElementById('lang-current');
  if (current) current.textContent = LANG_LABEL[next];

  document.querySelectorAll('#lang-menu [data-lang]').forEach((btn) => {
    btn.setAttribute('aria-current', String(btn.dataset.lang === next));
  });

  try { localStorage.setItem('ariyo-lang', next); } catch (e) { /* private mode */ }
}

/* --------------------------------------------------------------------------
   Header: background on scroll
   -------------------------------------------------------------------------- */
const header = document.getElementById('site-header');

function onScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* --------------------------------------------------------------------------
   Mobile navigation
   -------------------------------------------------------------------------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

function setNav(open) {
  burger.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  header.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

burger.addEventListener('click', () => {
  setNav(burger.getAttribute('aria-expanded') !== 'true');
});

nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) setNav(false);
});

/* --------------------------------------------------------------------------
   Language dropdown
   -------------------------------------------------------------------------- */
const langWrap = document.getElementById('lang');
const langToggle = document.getElementById('lang-toggle');

function setLangMenu(open) {
  langWrap.classList.toggle('is-open', open);
  langToggle.setAttribute('aria-expanded', String(open));
}

langToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  setLangMenu(!langWrap.classList.contains('is-open'));
});

document.getElementById('lang-menu').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-lang]');
  if (!btn) return;
  applyLanguage(btn.dataset.lang);
  setLangMenu(false);
});

document.addEventListener('click', (e) => {
  if (!langWrap.contains(e.target)) setLangMenu(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  setLangMenu(false);
  if (burger.getAttribute('aria-expanded') === 'true') {
    setNav(false);
    burger.focus();
  }
});

/* --------------------------------------------------------------------------
   Scroll spy
   -------------------------------------------------------------------------- */
const navLinks = Array.from(nav.querySelectorAll('.nav__link'));
const sections = navLinks
  .map((link) => {
    const id = link.getAttribute('href').slice(1);
    return id === 'top' ? null : document.getElementById(id);
  })
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((section) => spy.observe(section));

  // Back at the very top: highlight "home" again.
  window.addEventListener('scroll', () => {
    if (window.scrollY < 120) {
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === '#top'));
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   Reveal on scroll
   -------------------------------------------------------------------------- */
const reveals = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('is-visible'));
} else {
  const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = (i * 90) + 'ms';
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  reveals.forEach((el) => revealer.observe(el));
}

/* --------------------------------------------------------------------------
   Card galleries
   Any .slides track with more than one image gets arrows and dots. Swiping and
   trackpad scrolling already work from CSS scroll-snap alone; this only adds
   the controls a mouse-only visitor needs.
   -------------------------------------------------------------------------- */
document.querySelectorAll('.slides').forEach((track) => {
  const images = Array.from(track.children);
  if (images.length < 2) return;

  const media = track.parentElement;
  const goTo = (i) => track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' });

  const mkButton = (cls, label, svg) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.setAttribute('aria-label', label);
    b.innerHTML = svg;
    return b;
  };

  const arrow = (d) =>
    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="${d}"/></svg>`;

  const prev = mkButton('slides-nav slides-nav--prev', 'Iepriekšējais attēls', arrow('M15 5l-7 7 7 7'));
  const next = mkButton('slides-nav slides-nav--next', 'Nākamais attēls', arrow('M9 5l7 7-7 7'));

  const dots = document.createElement('div');
  dots.className = 'slides-dots';
  images.forEach((_, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.setAttribute('aria-label', 'Attēls ' + (i + 1));
    d.addEventListener('click', () => goTo(i));
    dots.appendChild(d);
  });

  media.append(prev, next, dots);

  let index = 0;
  const sync = () => {
    index = Math.round(track.scrollLeft / track.clientWidth);
    Array.from(dots.children).forEach((d, i) =>
      d.setAttribute('aria-current', String(i === index))
    );
    prev.disabled = index === 0;
    next.disabled = index === images.length - 1;
  };

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));

  let raf;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(sync);
  }, { passive: true });

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.min(index + 1, images.length - 1)); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.max(index - 1, 0)); }
  });

  sync();
});

/* --------------------------------------------------------------------------
   Contact form
   -------------------------------------------------------------------------- */
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('form-submit');
const status = document.getElementById('form-status');

// Float the field labels once something is typed.
form.querySelectorAll('input, textarea').forEach((input) => {
  const sync = () => input.closest('.field')?.classList.toggle('has-value', input.value.trim() !== '');
  input.addEventListener('input', sync);
  input.addEventListener('blur', sync);
});

function showError(input, message) {
  const field = input.closest('.field');
  field.classList.add('is-invalid');
  const slot = field.querySelector('[data-error]');
  if (slot) slot.textContent = message;
  input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
  const field = input.closest('.field');
  field.classList.remove('is-invalid');
  const slot = field.querySelector('[data-error]');
  if (slot) slot.textContent = '';
  input.removeAttribute('aria-invalid');
}

function validate() {
  let firstInvalid = null;

  form.querySelectorAll('[required]').forEach((input) => {
    clearError(input);
    const value = input.value.trim();

    if (!value) {
      showError(input, t('err_required'));
      firstInvalid = firstInvalid || input;
    } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      showError(input, t('err_email'));
      firstInvalid = firstInvalid || input;
    }
  });

  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

function mailtoFallback(data) {
  const subject = 'Ariyo Homes — ' + (data.model || t('form_model'));
  const body = [
    t('form_name') + ': ' + data.name,
    t('form_email') + ': ' + data.email,
    t('form_model') + ': ' + (data.model || '—'),
    '',
    data.message
  ].join('\n');

  window.location.href = 'mailto:' + CONTACT_EMAIL +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.classList.remove('is-error');
  status.textContent = '';

  // Bots fill hidden fields; humans do not.
  if (form.elements.company.value) return;
  if (!validate()) return;

  const data = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    model: form.elements.model.value.trim(),
    message: form.elements.message.value.trim(),
    language: lang
  };

  if (!FORM_ENDPOINT) {
    status.textContent = t('status_mail');
    mailtoFallback(data);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = t('form_sending');

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Request failed: ' + res.status);

    form.reset();
    form.querySelectorAll('.field').forEach((f) => f.classList.remove('has-value'));
    submitBtn.textContent = t('form_sent');
    status.textContent = t('status_sent');
  } catch (err) {
    // If the route is unreachable the visitor still gets a way to reach us.
    submitBtn.disabled = false;
    submitBtn.textContent = t('form_submit');
    status.classList.add('is-error');
    status.innerHTML = t('status_error_prefix') +
      ' <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>';
  }
});

/* --------------------------------------------------------------------------
   Boot
   -------------------------------------------------------------------------- */
let saved = null;
try { saved = localStorage.getItem('ariyo-lang'); } catch (e) { /* private mode */ }
applyLanguage(saved && I18N[saved] ? saved : 'lv');
