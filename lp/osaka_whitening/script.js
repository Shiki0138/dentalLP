document.addEventListener('DOMContentLoaded', function () {
    // 1. Scroll Animations (Fade Up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Add fade-up class to key elements if they don't have it
    const animatedElements = document.querySelectorAll('.section-title, .features-bar__item, .problems__item, .comparison__table-wrap, .flow__item, .cases__item, .pricing__card');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-up');
        // Add staggered delays for lists
        if (el.classList.contains('features-bar__item')) {
            el.style.transitionDelay = `${index * 0.1}s`;
        }
        observer.observe(el);
    });

    // 2. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Parallax Effect for Hero
    const heroImg = document.querySelector('.hero__img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < 800) { // Only animate when visible
                heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }

    // 4. Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
