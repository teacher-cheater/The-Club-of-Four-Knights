export function initParticipantsSlider() {
    const slider = document.getElementById('participantsSlider');
    const track = document.getElementById('participantsTrack');

    const prevBtnDesktop = document.getElementById('participantsPrev');
    const nextBtnDesktop = document.getElementById('participantsNext');
    const currentSpanDesktop = document.querySelector(
        '.participants__nav--desktop .participants__current',
    );
    const totalSpanDesktop = document.querySelector(
        '.participants__nav--desktop .participants__total',
    );

    const prevBtnMobile = document.getElementById('participantsPrevMobile');
    const nextBtnMobile = document.getElementById('participantsNextMobile');
    const currentSpanMobile = document.getElementById(
        'participantsCurrentMobile',
    );
    const totalSpanMobile = document.getElementById('participantsTotalMobile');

    if (!slider || !track) return;

    let cards = Array.from(track.children);
    let totalCards = cards.length;
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    function setTotalCount() {
        if (totalSpanDesktop) totalSpanDesktop.textContent = totalCards;
        if (totalSpanMobile) totalSpanMobile.textContent = totalCards;
    }
    setTotalCount();

    function getCardsPerView() {
        const width = window.innerWidth;
        if (width >= 1366) return 4;
        if (width >= 1024) return 3;
        if (width >= 768) return 2;
        return 1;
    }

    function updateSlider() {
        if (cards.length === 0) return;

        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 20;
        const scrollPosition = currentIndex * (cardWidth + gap);

        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
        });

        updateButtons();
        updateCounter();
    }

    function updateButtons() {
        const maxIndex = totalCards - cardsPerView;

        if (prevBtnDesktop && nextBtnDesktop) {
            prevBtnDesktop.disabled = currentIndex <= 0;
            nextBtnDesktop.disabled = currentIndex >= maxIndex;
        }

        if (prevBtnMobile && nextBtnMobile) {
            prevBtnMobile.disabled = currentIndex <= 0;
            nextBtnMobile.disabled = currentIndex >= maxIndex;
        }
    }

    function updateCounter() {
        const currentNumber = currentIndex + 1;
        if (currentSpanDesktop) currentSpanDesktop.textContent = currentNumber;
        if (currentSpanMobile) currentSpanMobile.textContent = currentNumber;
    }

    if (prevBtnDesktop) {
        prevBtnDesktop.addEventListener('click', function () {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    if (nextBtnDesktop) {
        nextBtnDesktop.addEventListener('click', function () {
            const maxIndex = totalCards - cardsPerView;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    if (prevBtnMobile) {
        prevBtnMobile.addEventListener('click', function () {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    if (nextBtnMobile) {
        nextBtnMobile.addEventListener('click', function () {
            const maxIndex = totalCards - cardsPerView;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    let isScrolling = false;
    slider.addEventListener('scroll', function () {
        if (isScrolling) return;
        isScrolling = true;
        requestAnimationFrame(() => {
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(getComputedStyle(track).gap) || 20;
            const scrollPosition = slider.scrollLeft;
            const newIndex = Math.round(scrollPosition / (cardWidth + gap));

            if (
                newIndex !== currentIndex &&
                newIndex >= 0 &&
                newIndex <= totalCards - cardsPerView
            ) {
                currentIndex = newIndex;
                updateButtons();
                updateCounter();
            }
            isScrolling = false;
        });
    });

    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                currentIndex = 0;
                updateSlider();
            }
        }, 150);
    });

    setTimeout(() => {
        slider.scrollLeft = 0;
        updateButtons();
        updateCounter();
    }, 100);
}
