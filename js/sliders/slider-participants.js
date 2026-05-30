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
    const originalCards = [...cards];
    let totalRealCards = originalCards.length;
    let currentRealIndex = 0;
    let cardsPerView = getCardsPerView();
    let autoplayInterval = null;
    let isInteracting = false;

    function setTotalCount() {
        if (totalSpanDesktop) totalSpanDesktop.textContent = totalRealCards;
        if (totalSpanMobile) totalSpanMobile.textContent = totalRealCards;
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
        const scrollPosition = currentRealIndex * (cardWidth + gap);

        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
        });

        updateCounter();
    }

    function updateCounter() {
        const currentNumber = currentRealIndex + 1;
        if (currentSpanDesktop) currentSpanDesktop.textContent = currentNumber;
        if (currentSpanMobile) currentSpanMobile.textContent = currentNumber;
    }

    function nextSlide() {
        if (currentRealIndex < totalRealCards - cardsPerView) {
            currentRealIndex++;
        } else {
            currentRealIndex = 0;
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(getComputedStyle(track).gap) || 20;
            slider.scrollLeft = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        if (currentRealIndex > 0) {
            currentRealIndex--;
        } else {
            currentRealIndex = totalRealCards - cardsPerView;
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(getComputedStyle(track).gap) || 20;
            slider.scrollLeft = currentRealIndex * (cardWidth + gap);
        }
        updateSlider();
    }

    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(() => {
            if (!isInteracting) {
                nextSlide();
            }
        }, 4000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    const handlePrevClick = () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    };

    const handleNextClick = () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    };

    if (prevBtnDesktop)
        prevBtnDesktop.addEventListener('click', handlePrevClick);
    if (nextBtnDesktop)
        nextBtnDesktop.addEventListener('click', handleNextClick);
    if (prevBtnMobile) prevBtnMobile.addEventListener('click', handlePrevClick);
    if (nextBtnMobile) nextBtnMobile.addEventListener('click', handleNextClick);

    slider.addEventListener('mouseenter', () => {
        isInteracting = true;
        stopAutoplay();
    });

    slider.addEventListener('mouseleave', () => {
        isInteracting = false;
        startAutoplay();
    });

    slider.addEventListener('touchstart', () => {
        isInteracting = true;
        stopAutoplay();
    });

    slider.addEventListener('touchend', () => {
        setTimeout(() => {
            isInteracting = false;
            startAutoplay();
        }, 3000);
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                if (currentRealIndex + cardsPerView > totalRealCards) {
                    currentRealIndex = totalRealCards - cardsPerView;
                }
                updateSlider();
            }
        }, 150);
    });

    startAutoplay();
    setTimeout(() => {
        slider.scrollLeft = 0;
        updateCounter();
    }, 100);
}
