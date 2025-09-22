const toggle = () => {
  const d = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', d ? 'dark' : 'light');
};

// Kitabların siyahısı
const books = [
  { t: 'Qadın dili', p: 16, img: 'https://i.imgur.com/SpcmZXN.jpg', link: 'kitablar/Qadin dili.html' },
  { t: 'Bazmanın 30 günlük təlimi', p: 10, img: 'https://i.imgur.com/IS2DQl8.jpg', link: 'kitablar/Bazmanin 30 gunluk telimi.html' },
  { t: 'QADINLARLA FLÖRTETMƏ SƏNƏTİ', p: 30, img: 'https://i.imgur.com/fxo5sUc.jpg', link: 'kitablar/Qadinlarla flortetme seneti.html' },
  { t: 'QADIN TOVLAMA SƏNƏTİ', p: 40, img: 'https://i.imgur.com/yZ9zPeo.jpg', link: 'kitablar/Qadin tovlama seneti.html' },
  { t: 'ALFA KİŞİ XARAKTERİ', p: 30, img: 'https://i.imgur.com/3aodR8x.jpg', link: 'kitablar/Alfa kisi xarakteri.html' },
  { t: 'QADINLARLA TƏSİRLİ MESAJLAŞMA VƏ İLK MESAJ', p: 0, img: 'https://i.imgur.com/kwMqYGO.jpg', link: 'kitablar/Qadinlarla tesirli mesajlasma ve ilk mesaj.html' },
  { t: 'MÜASİR HƏYATDA KİŞİ OLMAQ', p: 0, img: 'https://i.imgur.com/kcfFDWH.jpeg', link: 'kitablar/Muasir heyatda kisi olmaq.html' },
  { t: 'ARSIZ-MƏZƏLİ ÜSULU', p: 0, img: 'https://i.imgur.com/ERKHrOJ.jpg', link: 'kitablar/Arsiz-mezeli usulu.html' },
  { t: 'MÜASİR KİŞİNİN SEKS BƏLƏDÇİSİ', p: 0, img: 'https://i.imgur.com/PlhrJHZ.jpg', link: 'kitablar/Muasir kisinin seks beledcisi.html' },
  { t: 'YÜKSƏK SƏVİYYƏLİ TAKTİKALAR', p: 0, img: 'https://i.imgur.com/w3wD8Bc.jpg', link: 'kitablar/Yuksek seviyyeli taktikalar.html' },
];

// Yükləmə funksiyası
function yukle(ad, qiymet) {
  const gmail = prompt('Gmailinizi daxil edin:');
  if (!gmail) return;
  const msg = `Kitab: ${ad}\nQiymət: ${qiymet} AZN\nGmail: ${gmail}`;
  window.open(`https://wa.me/994778037177?text=${encodeURIComponent(msg)}`, '_blank');
}

// Banner funksiyası
function setupBanner() {
  if (document.getElementById('customBanner')) return;

  const bannerHTML = `
    <div id="customBanner" class="custom-banner">
      <div class="banner-image-container">
        <img src="https://i.imgur.com/SpcmZXN.jpg/150x80?text=Yeni+Şəkil" alt="Banner Şəkil">
      </div>
      <div class="banner-text">
        <p><strong>30 Sentyabra qədər-QADIN DİLİ e-kitabı CƏMİ 16 azn.</p>
      </div>
      <button class="close-btn">Bağla</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', bannerHTML);

  const banner = document.getElementById('customBanner');
  const closeBtn = banner.querySelector('.close-btn');

  function showBanner() {
    banner.classList.add('show');
  }
  function hideBanner() {
    banner.classList.remove('show');
  }

  closeBtn.addEventListener('click', hideBanner);
  showBanner();
  setTimeout(hideBanner, 10000);

  banner.addEventListener('click', (event) => {
    if (event.target === closeBtn) return;
    if (banner.classList.contains('show')) {
      window.open('https://bazman.az/kitablar.html', '_blank');
      hideBanner();
    }
  });
}

// DOM hazır olduqda
window.addEventListener('DOMContentLoaded', () => {
  // Tema
  if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', toggle);

  // Kitablar
  const booksGrid = document.getElementById('booksGrid');
  function renderBooks(bookList) {
    if (!booksGrid) return;
    booksGrid.innerHTML = bookList.map(b => `
      <div class="book-card">
        <a href="${b.link}" target="_blank">
          <img src="${b.img}" alt="${b.t}">
        </a>
        <h3>${b.t}</h3>
        <p class="price">Qiymət: ${b.p} AZN</p>
        <div class="actions">
          <button class="btn" onclick="yukle('${b.t}', ${b.p})">Yüklə</button>
        </div>
      </div>
    `).join('');
  }
  renderBooks(books);

  // Axtarış
  const searchInput = document.getElementById('bookSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = books.filter(book => book.t.toLowerCase().includes(query));
      renderBooks(filtered);
    });
  }

  // Reviews
  const reviewsEl = document.getElementById('reviews');
  if (reviewsEl) {
    const list = JSON.parse(localStorage.getItem('reviews') || '[]');
    const renderReviews = () => {
      reviewsEl.innerHTML = list.map(r => `<div class="card"><b>${r.n}</b><p>${r.t}</p></div>`).join('');
    };
    renderReviews();
    const revBtn = document.getElementById('revAdd');
    if (revBtn) {
      revBtn.addEventListener('click', () => {
        const n = document.getElementById('revName').value.trim();
        const t = document.getElementById('revText').value.trim();
        if (!n || !t) return;
        list.push({ n, t });
        localStorage.setItem('reviews', JSON.stringify(list));
        renderReviews();
        document.getElementById('revName').value = '';
        document.getElementById('revText').value = '';
      });
    }
  }

 

  // Banner
  setupBanner();
});
