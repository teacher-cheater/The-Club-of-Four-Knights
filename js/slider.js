document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('stagesSlider');
    const prevBtn = document.getElementById('stagesPrev');
    const nextBtn = document.getElementById('stagesNext');
    const dotsContainer = document.getElementById('stagesDots');

    if (!slider || !prevBtn || !nextBtn || !dotsContainer) return;

    let currentIndex = 0;
    let slides = Array.from(slider.children);
    let totalSlides = slides.length;
    let dots = [];

    function updateSlider() {
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
    }

    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - 1;
    }

    function createDots() {
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

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    let isScrolling = false;
    slider.addEventListener('scroll', function () {
        if (isScrolling) return;
        isScrolling = true;
        requestAnimationFrame(() => {
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
    window.addEventListener('resize', function () {
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
});
