export function initStagesSlider() {
    const slider = document.getElementById('stagesSlider');

    if (!slider) return;

    const prevBtn = document.getElementById('stagesPrev');
    const nextBtn = document.getElementById('stagesNext');
    const dotsContainer = document.getElementById('stagesDots');
    const mobilePrevBtn = document.getElementById('stagesMobilePrev');
    const mobileNextBtn = document.getElementById('stagesMobileNext');
    const mobileDotsContainer = document.getElementById('stagesMobileDots');

    let currentIndex = 0;
    let slides = Array.from(slider.children);
    let totalSlides = slides.length;
    let dots = [];
    let mobileDots = [];

    function updateSlider() {
        if (slides.length === 0) return;
        const slideWidth = slides[0].offsetWidth;
        const gap = parseInt(getComputedStyle(slider).gap) || 16;
        const scrollPosition = currentIndex * (slideWidth + gap);
        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
        });
        updateDots();
        updateButtons();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        mobileDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateButtons() {
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalSlides - 1;
        }
        if (mobilePrevBtn && mobileNextBtn) {
            mobilePrevBtn.disabled = currentIndex === 0;
            mobileNextBtn.disabled = currentIndex >= totalSlides - 1;
        }
    }

    function createDots() {
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            dots = [];
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('stages__dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateSlider();
                });
                dotsContainer.appendChild(dot);
                dots.push(dot);
            }
        }

        if (mobileDotsContainer) {
            mobileDotsContainer.innerHTML = '';
            mobileDots = [];
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('stages__mobile-dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateSlider();
                });
                mobileDotsContainer.appendChild(dot);
                mobileDots.push(dot);
            }
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
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    if (mobilePrevBtn) {
        mobilePrevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    if (mobileNextBtn) {
        mobileNextBtn.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
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
            if (slides.length === 0) return;
            const slideWidth = slides[0].offsetWidth;
            const gap = parseInt(getComputedStyle(slider).gap) || 16;
            const scrollPosition = slider.scrollLeft;
            const newIndex = Math.round(scrollPosition / (slideWidth + gap));

            if (
                newIndex !== currentIndex &&
                newIndex >= 0 &&
                newIndex < totalSlides
            ) {
                currentIndex = newIndex;
                updateDots();
                updateButtons();
            }
            isScrolling = false;
        });
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlider();
        }, 150);
    });

    createDots();
    updateButtons();

    setTimeout(() => {
        slider.scrollLeft = 0;
    }, 100);
}
