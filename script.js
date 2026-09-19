(function () {
    const carousel      = document.querySelector('.carousel');
    const track         = document.querySelector('.carousel__track');
    const slides        = track.querySelectorAll('.carousel__slide');
    const prevBtn       = document.querySelector('.carousel__btn--prev');
    const nextBtn       = document.querySelector('.carousel__btn--next');
    const dotsContainer = document.querySelector('.carousel__dots');

    const total = slides.length;
    const AUTO_DELAY = 5000;   // 5 сек
    let current = 0;
    let autoTimer = null;

    // создаём точки
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel__dot';
        dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
        dot.addEventListener('click', () => {
            goTo(i);
            restartAuto();
        });
        dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll('.carousel__dot');

    // сдвиг трека
    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(next, AUTO_DELAY);
    }
    function stopAuto() {
        if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }
    function restartAuto() {
        stopAuto();
        startAuto();
    }

    nextBtn.addEventListener('click', () => { next(); restartAuto(); });
    prevBtn.addEventListener('click', () => { prev(); restartAuto(); });

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    goTo(0);
    startAuto();
})();


/* ============================================================
   FAQ — АККОРДЕОН
   ============================================================ */
document.querySelectorAll('.faq__item').forEach(item => {
    const btn = item.querySelector('.faq__question');
    btn.addEventListener('click', () => {
        item.classList.toggle('is-open');
    });
});

document.querySelectorAll('.ankety__item').forEach(item => {
    const btn = item.querySelector('.ankety__question');
    btn.addEventListener('click', () => {
        item.classList.toggle('is-open');
    });
});

(function () {
    function openByHash() {
        const hash = window.location.hash;
        if (!hash || !hash.startsWith('#anketa-')) return;

        const target = document.querySelector(hash);
        if (!target) return;

        // закрываем все открытые опросники
        document.querySelectorAll('.ankety__item.is-open').forEach(el => {
            el.classList.remove('is-open');
        });

        // открываем нужный
        target.classList.add('is-open');

        // плавно прокручиваем
        setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    openByHash();
    window.addEventListener('hashchange', openByHash);
})();