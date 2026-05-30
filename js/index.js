import { initParticipantsSlider } from './sliders/slider-participants.js';
import { initStagesSlider } from './sliders/slider-stages.js';

function initScrollAnimations() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initStagesSlider();
    initParticipantsSlider();
    initScrollAnimations();
});

window.addEventListener('load', () => {
    initStagesSlider();
    initParticipantsSlider();
    initScrollAnimations();
});
