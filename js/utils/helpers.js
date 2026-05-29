export function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

export function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

export function getCardsPerView(breakpoints = {}) {
    const width = window.innerWidth;
    const sortedBreakpoints = Object.keys(breakpoints)
        .map(Number)
        .sort((a, b) => b - a);

    for (const bp of sortedBreakpoints) {
        if (width >= bp) {
            return breakpoints[bp];
        }
    }
    return breakpoints.default || 1;
}
