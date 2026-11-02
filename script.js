const DATA_URL = 'products.json';
const languagePreference = localStorage.getItem('pharmasmart-language');
let language = languagePreference === 'en' ? 'en' : 'ar';
let products = [];

const dictionary = {
  ar: {
    skip: 'انتقل إلى المعلومات', demoLabel: 'نموذج تجريبي للتغليف الذكي', demoTitle: 'امسح الكود، واعرف ما تستخدمه.',
    demoText: 'هذا نموذج يوضح كيف تفتح عبوة المنتج صفحة معلومات واضحة وآمنة بمجرد مسح رمز QR.', journeyOne: 'امسح رمز QR على العبوة',
    journeyTwo: 'تُفتح صفحة المنتج مباشرة', journeyThree: 'تعرّف على معلوماته واستخدامه', prototypeLabel: 'منتجات النموذج',
    chooseProduct: 'اختَر منتجًا لتجربة النظام', demoOnly: 'هذه بيانات توضيحية لنموذج أولي وليست منتجات تجارية.',
    prototypeNotice: 'في الاستخدام الفعلي، لا يحتاج المستهلك إلى هذه الصفحة؛ رمز QR على العبوة يفتح صفحة المنتج المحدد مباشرة.',
    demoProducts: 'منتجات النموذج', loading: 'جارِ تحميل المعلومات...', footer: 'افهم ما تستخدمه.', openProduct: 'افتح صفحة المنتج',
    home: 'الرئيسية', ingredients: 'المكوّنات', guide: 'الاستخدام والأمان', assistant: 'مساعد المنتج', manufacturingDate: 'تاريخ الإنتاج',
    expiryDate: 'تاريخ الانتهاء', batchNumber: 'رقم التشغيلة', understandIngredients: 'افهم المكوّنات',
    ingredientHint: 'اضغط على أي مكوّن لقراءة وظيفته ببساطة.', use: 'طريقة الاستخدام', storage: 'الحفظ', warnings: 'تنبيهات مهمة',
    recycling: 'إعادة التدوير', assistantTitle: 'مساعد المنتج الذكي', assistantText: 'اختر سؤالًا شائعًا خاصًا بهذا المنتج لعرض إجابته.',
    media: 'دليل مرئي وصوتي', watch: 'شاهد شرحًا على YouTube', openYouTube: 'فتح YouTube', listen: 'استمع إلى الدليل الصوتي',
    feedback: 'تقييم النموذج', feedbackHint: 'تُحفظ ملاحظتك على هذا الجهاز فقط، ولا تُنشر للآخرين.', rating: 'تقييمك', chooseRating: 'اختر تقييمًا بالنجوم أولًا.',
    feedbackPlaceholder: 'اكتب ملاحظتك عن سهولة فهم المعلومات…', saveFeedback: 'حفظ التقييم محليًا', noFeedback: 'لا توجد تقييمات محفوظة على هذا الجهاز بعد.', feedbackSaved: 'تم حفظ تقييمك على هذا الجهاز.',
    questions: 'سؤال عن النموذج', questionHint: 'يمكنك حفظ سؤال لتذكّره أثناء عرض المشروع. لا يتم إرساله أو نشره.', questionPlaceholder: 'اكتب سؤالك هنا…', saveQuestion: 'حفظ السؤال محليًا', noQuestions: 'لا توجد أسئلة محفوظة على هذا الجهاز بعد.', questionSaved: 'تم حفظ سؤالك على هذا الجهاز.',
    demoDisclaimer: 'هذه المعلومات معروضة لأغراض النموذج التوضيحي فقط، وليست بديلًا عن البيانات المعتمدة على عبوة منتج تجاري أو عن استشارة مختص.',
    loadErrorTitle: 'تعذّر تحميل بيانات المنتجات', loadErrorText: 'شغّل الموقع من خادم محلي مثل Live Server في VS Code، ثم أعد تحميل الصفحة.',
    backToDemo: 'العودة إلى النموذج', notFoundTitle: 'المنتج غير موجود', notFoundText: 'قد يكون رابط رمز QR غير صحيح أو أن المنتج غير متاح في هذا النموذج.',
    backToProducts: 'العودة إلى المنتجات'
  },
  en: {
    skip: 'Skip to information', demoLabel: 'SMART PACKAGING PROTOTYPE', demoTitle: 'Scan the code. Understand what you use.',
    demoText: 'This prototype shows how a product package can open clear, useful information as soon as its QR code is scanned.',
    journeyOne: 'Scan the QR code on the pack', journeyTwo: 'Open the product page directly', journeyThree: 'Explore product information and guidance',
    prototypeLabel: 'PROTOTYPE PRODUCTS', chooseProduct: 'Choose a product to try the system',
    demoOnly: 'These are illustrative prototype records, not commercial products.',
    prototypeNotice: 'In real use, the consumer does not need this page: the QR code on the pack opens the right product page directly.',
    demoProducts: 'Prototype products', loading: 'Loading information...', footer: 'Understand What You Use.', openProduct: 'Open product page',
    home: 'Home', ingredients: 'Ingredients', guide: 'Use & safety', assistant: 'Product assistant', manufacturingDate: 'Manufactured',
    expiryDate: 'Expiry date', batchNumber: 'Batch number', understandIngredients: 'Understand the ingredients',
    ingredientHint: 'Select an ingredient to read its role in simple terms.', use: 'How to use', storage: 'Storage', warnings: 'Important warnings',
    recycling: 'Recycling', assistantTitle: 'Smart product FAQ', assistantText: 'Choose a common question about this product to see its prepared answer.',
    media: 'Video and audio guide', watch: 'Watch the YouTube explainer', openYouTube: 'Open YouTube', listen: 'Listen to the audio guide',
    feedback: 'Prototype feedback', feedbackHint: 'Your feedback is saved on this device only and is not published.', rating: 'Your rating', chooseRating: 'Choose a star rating first.',
    feedbackPlaceholder: 'Share a note about how clear the information was…', saveFeedback: 'Save feedback locally', noFeedback: 'No feedback has been saved on this device yet.', feedbackSaved: 'Your feedback was saved on this device.',
    questions: 'Prototype question', questionHint: 'Save a question to remember during the project presentation. It is not sent or published.', questionPlaceholder: 'Write your question here…', saveQuestion: 'Save question locally', noQuestions: 'No questions have been saved on this device yet.', questionSaved: 'Your question was saved on this device.',
    demoDisclaimer: 'This information is for prototype demonstration only. It is not a substitute for approved pack information or advice from a qualified professional.',
    loadErrorTitle: 'Could not load product data', loadErrorText: 'Run the site from a local server, such as VS Code Live Server, then reload this page.',
    backToDemo: 'Back to demo', notFoundTitle: 'Product not found', notFoundText: 'The QR link may be incorrect or this product is not available in the prototype.',
    backToProducts: 'Back to products'
  }
};

function t(key) { return dictionary[language][key] || key; }

function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}

function localValue(record, baseName) {
  return language === 'ar' ? (record[`${baseName}_ar`] || record[baseName] || '') : (record[baseName] || record[`${baseName}_ar`] || '');
}

function productName(product) { return localValue(product, 'name'); }
function productCategory(product) { return localValue(product, 'category'); }

function applyLanguage() {
  const html = document.documentElement;
  html.lang = language;
  html.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll('[data-language-toggle]').forEach((button) => {
    button.textContent = language === 'ar' ? 'English' : 'العربية';
    button.setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  });
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return escapeHTML(value);
  return new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

async function loadProducts() {
  const response = await fetch(DATA_URL);
  if (!response.ok) throw new Error(`Could not load products (${response.status})`);
  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) throw new Error('Product data is invalid');
  return data;
}

function errorState(title, message, link, label) {
  return `<section class="error-state"><div><h1>${escapeHTML(title)}</h1><p>${escapeHTML(message)}</p><a class="button button-primary" href="${link}">${escapeHTML(label)}</a></div></section>`;
}

function showLoadError(target) { target.innerHTML = errorState(t('loadErrorTitle'), t('loadErrorText'), 'index.html', t('backToDemo')); }

function productCard(product) {
  const name = productName(product);
  return `
    <article class="product-card">
      <a class="product-image" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="${escapeHTML(t('openProduct'))}: ${escapeHTML(name)}">
        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(name)}" />
      </a>
      <div class="product-copy">
        <span class="tag">${escapeHTML(productCategory(product))}</span>
        <h3>${escapeHTML(name)}</h3>
        <p>${escapeHTML(localValue(product, 'description'))}</p>
        <a class="card-link" href="product.html?id=${encodeURIComponent(product.id)}">${escapeHTML(t('openProduct'))} <span aria-hidden="true">←</span></a>
      </div>
    </article>`;
}

function renderCatalog() {
  const grid = document.querySelector('#products-grid');
  if (grid) grid.innerHTML = products.map(productCard).join('');
}

function ingredientsTemplate(ingredients = []) {
  return ingredients.map((ingredient, index) => {
    const id = `ingredient-description-${index}`;
    return `
      <article class="ingredient">
        <button class="ingredient-top" type="button" aria-expanded="false" aria-controls="${id}">
          <span class="ingredient-name">${escapeHTML(ingredient.name)}</span>
          <span class="ingredient-function"><span class="tag">${escapeHTML(ingredient.function)}</span><span class="ingredient-toggle" aria-hidden="true">+</span></span>
        </button>
        <p id="${id}" hidden>${escapeHTML(localValue(ingredient, 'description'))}</p>
      </article>`;
  }).join('');
}

function warningsTemplate(warnings = []) { return warnings.map((warning) => `<li>${escapeHTML(warning)}</li>`).join(''); }

function mediaTemplate(product) {
  const media = [];
  if (product.video) media.push(`<article class="media-panel youtube-panel"><h3>${escapeHTML(t('watch'))}</h3><p>${escapeHTML(localValue(product, 'video_title') || t('watch'))}</p><a class="button button-secondary" href="${escapeHTML(product.video)}" target="_blank" rel="noopener noreferrer">${escapeHTML(t('openYouTube'))} <span aria-hidden="true">↗</span></a></article>`);
  if (product.audio) media.push(`<article class="media-panel"><h3>${escapeHTML(t('listen'))}</h3><audio controls preload="metadata"><source src="${escapeHTML(product.audio)}" /></audio></article>`);
  return media.length ? `<section class="info-card media-card"><h2><span aria-hidden="true">▶</span>${escapeHTML(t('media'))}</h2><div class="media-grid">${media.join('')}</div></section>` : '';
}

function localItems(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveLocalItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function localDate(value) {
  return new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

function communityTemplate(productId, status = '') {
  const reviews = localItems(`pharmasmart-feedback-${productId}`);
  const questions = localItems(`pharmasmart-questions-${productId}`);
  const reviewsList = reviews.length
    ? reviews.slice().reverse().map((review) => `<li><span class="stars" aria-label="${escapeHTML(`${review.rating}/5`)}">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span><p>${escapeHTML(review.text)}</p><small>${escapeHTML(localDate(review.createdAt))}</small></li>`).join('')
    : `<li class="community-empty">${escapeHTML(t('noFeedback'))}</li>`;
  const questionsList = questions.length
    ? questions.slice().reverse().map((question) => `<li><p>${escapeHTML(question.text)}</p><small>${escapeHTML(localDate(question.createdAt))}</small></li>`).join('')
    : `<li class="community-empty">${escapeHTML(t('noQuestions'))}</li>`;
  return `
    <section class="info-card community-card" id="community">
      <div class="community-grid">
        <div class="community-panel">
          <h2><span aria-hidden="true">★</span>${escapeHTML(t('feedback'))}</h2>
          <p class="card-hint">${escapeHTML(t('feedbackHint'))}</p>
          <form class="local-feedback-form" novalidate>
            <fieldset class="rating-picker"><legend>${escapeHTML(t('rating'))}</legend><div>${[1, 2, 3, 4, 5].map((number) => `<button type="button" class="star-button" data-rating="${number}" aria-label="${number} of 5 stars" aria-pressed="false">★</button>`).join('')}</div></fieldset>
            <textarea name="feedback" rows="3" maxlength="280" placeholder="${escapeHTML(t('feedbackPlaceholder'))}"></textarea>
            <button class="button button-primary" type="submit">${escapeHTML(t('saveFeedback'))}</button>
          </form>
          <p class="local-status" role="status">${escapeHTML(status)}</p>
          <ul class="local-list">${reviewsList}</ul>
        </div>
        <div class="community-panel">
          <h2><span aria-hidden="true">?</span>${escapeHTML(t('questions'))}</h2>
          <p class="card-hint">${escapeHTML(t('questionHint'))}</p>
          <form class="local-question-form" novalidate>
            <textarea name="question" rows="3" maxlength="280" placeholder="${escapeHTML(t('questionPlaceholder'))}"></textarea>
            <button class="button button-secondary" type="submit">${escapeHTML(t('saveQuestion'))}</button>
          </form>
          <ul class="local-list">${questionsList}</ul>
        </div>
      </div>
    </section>`;
}

function setupCommunity(productId) {
  const community = document.querySelector('#community');
  if (!community) return;
  let selectedRating = 0;
  community.querySelectorAll('[data-rating]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedRating = Number(button.dataset.rating);
      community.querySelectorAll('[data-rating]').forEach((star) => {
        const active = Number(star.dataset.rating) <= selectedRating;
        star.classList.toggle('is-selected', active);
        star.setAttribute('aria-pressed', String(active));
      });
    });
  });
  community.querySelector('.local-feedback-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = new FormData(event.currentTarget).get('feedback').trim();
    if (!selectedRating) { community.querySelector('.local-status').textContent = t('chooseRating'); return; }
    if (!text) return;
    const key = `pharmasmart-feedback-${productId}`;
    saveLocalItems(key, [...localItems(key), { rating: selectedRating, text, createdAt: new Date().toISOString() }]);
    community.outerHTML = communityTemplate(productId, t('feedbackSaved'));
    setupCommunity(productId);
  });
  community.querySelector('.local-question-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = new FormData(event.currentTarget).get('question').trim();
    if (!text) return;
    const key = `pharmasmart-questions-${productId}`;
    saveLocalItems(key, [...localItems(key), { text, createdAt: new Date().toISOString() }]);
    community.outerHTML = communityTemplate(productId, t('questionSaved'));
    setupCommunity(productId);
  });
}

function renderProduct(product) {
  const content = document.querySelector('#product-content');
  if (!content) return;
  const assistant = product.assistant || {};
  const questions = Array.isArray(assistant.questions) ? assistant.questions : [];
  const name = productName(product);
  document.title = `${name} | PharmaSmart`;

  content.innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">${escapeHTML(t('home'))}</a><span aria-hidden="true">/</span><a href="index.html#products">${escapeHTML(t('demoProducts'))}</a><span aria-hidden="true">/</span><span>${escapeHTML(name)}</span></nav>
    <section class="details-hero" id="overview">
      <div class="details-image"><img src="${escapeHTML(product.image)}" alt="${escapeHTML(name)}" /></div>
      <div class="details-copy">
        <span class="tag">${escapeHTML(productCategory(product))}</span><h1>${escapeHTML(name)}</h1><p>${escapeHTML(localValue(product, 'description'))}</p>
        <div class="product-meta" aria-label="Product data">
          <div><small>${escapeHTML(t('manufacturingDate'))}</small><strong>${formatDate(product.manufacturing_date)}</strong></div>
          <div><small>${escapeHTML(t('expiryDate'))}</small><strong>${formatDate(product.expiry_date)}</strong></div>
          <div><small>${escapeHTML(t('batchNumber'))}</small><strong>${escapeHTML(product.batch_number || '—')}</strong></div>
        </div>
        <nav class="quick-links" aria-label="Product sections"><a href="#ingredients">${escapeHTML(t('ingredients'))}</a><a href="#guide">${escapeHTML(t('guide'))}</a><a href="#assistant">${escapeHTML(t('assistant'))}</a></nav>
      </div>
    </section>
    <div class="details-grid">
      <section class="info-card" id="ingredients"><h2><span aria-hidden="true">✦</span>${escapeHTML(t('understandIngredients'))}</h2><p class="card-hint">${escapeHTML(t('ingredientHint'))}</p><div class="ingredient-list">${ingredientsTemplate(product.ingredients)}</div></section>
      <section class="info-card" id="guide"><h2><span aria-hidden="true">⌁</span>${escapeHTML(t('guide'))}</h2><div class="guide-list">
        <article class="guide-row"><h3><span aria-hidden="true">◷</span>${escapeHTML(t('use'))}</h3><p>${escapeHTML(localValue(product, 'usage') || '—')}</p></article>
        <article class="guide-row"><h3><span aria-hidden="true">□</span>${escapeHTML(t('storage'))}</h3><p>${escapeHTML(localValue(product, 'storage') || '—')}</p></article>
      </div></section>
      <section class="info-card"><h2><span aria-hidden="true">!</span>${escapeHTML(t('warnings'))}</h2><ul class="warnings">${warningsTemplate(language === 'ar' ? (product.warnings_ar || product.warnings) : product.warnings)}</ul></section>
      <section class="info-card recycling"><h2><span aria-hidden="true">♲</span>${escapeHTML(t('recycling'))}</h2><p>${escapeHTML(localValue(product, 'recycling') || '—')}</p></section>
      ${mediaTemplate(product)}
      <section class="info-card assistant-card" id="assistant" aria-labelledby="assistant-title">
        <div class="assistant-top"><div class="assistant-avatar" aria-hidden="true">✦</div><div><h2 id="assistant-title">${escapeHTML(t('assistantTitle'))}</h2><p>${escapeHTML(t('assistantText'))}</p></div></div>
        <p class="assistant-welcome">${escapeHTML(localValue(assistant, 'welcome') || t('assistantText'))}</p>
        <div class="question-list">${questions.map((question, index) => `<button class="question" type="button" data-answer="${index}">${escapeHTML(localValue(question, 'question'))}</button>`).join('')}</div>
        <p class="answer" id="assistant-answer" hidden></p>
      </section>
      ${communityTemplate(product.id)}
      <aside class="information-note"><span aria-hidden="true">i</span><p>${escapeHTML(t('demoDisclaimer'))}</p></aside>
    </div>`;

  content.querySelectorAll('.ingredient-top').forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      const description = document.getElementById(button.getAttribute('aria-controls'));
      if (description) description.hidden = expanded;
    });
  });
  content.querySelector('.question-list')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-answer]');
    if (!button) return;
    const answer = content.querySelector('#assistant-answer');
    const question = questions[Number(button.dataset.answer)];
    if (!question || !answer) return;
    answer.textContent = localValue(question, 'answer');
    answer.hidden = false;
    answer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  setupCommunity(product.id);
}

function refreshPage() {
  applyLanguage();
  if (document.body.classList.contains('product-page')) {
    const id = new URLSearchParams(window.location.search).get('id');
    const product = products.find((item) => item.id === id);
    const target = document.querySelector('#product-content');
    if (!product && target) { target.innerHTML = errorState(t('notFoundTitle'), t('notFoundText'), 'index.html#products', t('backToProducts')); return; }
    if (product) renderProduct(product);
  } else {
    document.title = language === 'ar' ? 'PharmaSmart | تجربة التغليف الذكي' : 'PharmaSmart | Smart Packaging Prototype';
    renderCatalog();
  }
}

async function initialise() {
  applyLanguage();
  document.querySelectorAll('[data-language-toggle]').forEach((button) => button.addEventListener('click', () => {
    language = language === 'ar' ? 'en' : 'ar';
    localStorage.setItem('pharmasmart-language', language);
    refreshPage();
  }));
  const target = document.body.classList.contains('product-page') ? document.querySelector('#product-content') : document.querySelector('#products-grid');
  try { products = await loadProducts(); refreshPage(); } catch (error) { console.error(error); showLoadError(target); }
}

document.addEventListener('DOMContentLoaded', initialise);
