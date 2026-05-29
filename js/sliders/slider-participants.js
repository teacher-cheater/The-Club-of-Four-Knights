export function initParticipantsSlider() {
    const slider = document.getElementById('participantsSlider');
    const track = document.getElementById('participantsTrack');
    const prevBtn = document.getElementById('participantsPrev');
    const nextBtn = document.getElementById('participantsNext');
    const currentSpan = document.querySelector('.participants__current');
    const totalSpan = document.querySelector('.participants__total');

    if (!slider || !track) return;

    let cards = Array.from(track.children);
    let totalCards = cards.length;
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    if (totalSpan) {
        totalSpan.textContent = totalCards;
    }

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

        if (prevBtn) {
            prevBtn.disabled = currentIndex <= 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= maxIndex;
        }
    }

    function updateCounter() {
        if (currentSpan) {
            currentSpan.textContent = currentIndex + 1;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxIndex = totalCards - cardsPerView;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    let isScrolling = false;
    slider.addEventListener('scroll', () => {
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
    window.addEventListener('resize', () => {
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
