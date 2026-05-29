import { initParticipantsSlider } from './sliders/slider-participants.js';
import { initStagesSlider } from './sliders/slider-stages.js';

document.addEventListener('DOMContentLoaded', () => {
    initStagesSlider();
    initParticipantsSlider();
});

window.addEventListener('load', () => {
    initStagesSlider();
    initParticipantsSlider();
});
