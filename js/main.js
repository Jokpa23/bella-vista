/* ==========================================================================
   Bella Vista Restaurant - Main JavaScript
   All interactive features and functionality
   ========================================================================== */

(function() {
    'use strict';

    // ===========================
    // 1. Loading Screen
    // ===========================
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 600);
        }, 1000);
    });

    // ===========================
    // 2. Theme Toggle
    // ===========================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('bella-vista-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('bella-vista-theme', newTheme);
    });

    // ===========================
    // 3. Sticky Navbar & Scroll Effects
    // ===========================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar shadow
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===========================
    // 4. Mobile Menu Toggle
    // ===========================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking nav link
    document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===========================
    // 5. Smooth Scrolling
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ===========================
    // 6. Active Navigation Highlighting
    // ===========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ===========================
    // 7. Scroll Reveal Animations
    // ===========================
    const revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            const revealPoint = 80;

            if (top < windowHeight - revealPoint) {
                el.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    window.addEventListener('load', revealOnScroll);

    // ===========================
    // 8. Animated Statistics Counters
    // ===========================
    const statNumbers = document.querySelectorAll('.stat-num');
    let statAnimated = false;

    function animateCounters() {
        if (statAnimated) return;

        const statsSection = document.getElementById('stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            statAnimated = true;

            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * target);

                    if (target >= 1000) {
                        num.textContent = current.toLocaleString() + '+';
                    } else {
                        num.textContent = current + '+';
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (target >= 1000) {
                            num.textContent = target.toLocaleString() + '+';
                        } else {
                            num.textContent = target + '+';
                        }
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }

    window.addEventListener('scroll', animateCounters, { passive: true });

    // ===========================
    // 9. Render Menu Items
    // ===========================
    const menuGrid = document.getElementById('menuGrid');

    function renderMenu(filter = 'all') {
        if (!menuGrid) return;

        const filtered = filter === 'all'
            ? menuData
            : menuData.filter(item => item.category === filter);

        menuGrid.innerHTML = '';

        if (filtered.length === 0) {
            menuGrid.innerHTML = '<p style="text-align:center; color: var(--text-muted); grid-column: 1/-1; padding: 40px;">No items found in this category.</p>';
            return;
        }

        filtered.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.setAttribute('data-category', item.category);
            card.style.animationDelay = `${index * 0.05}s`;

            const stars = '★'.repeat(Math.floor(item.rating)) + '☆'.repeat(5 - Math.floor(item.rating));

            card.innerHTML = `
                <div class="menu-card-img">
                    <span class="menu-card-tag">${item.tag}</span>
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="menu-card-body">
                    <div class="menu-card-header">
                        <h3 class="menu-card-name">${item.name}</h3>
                        <span class="menu-card-price">${item.price}</span>
                    </div>
                    <p class="menu-card-desc">${item.desc}</p>
                    <div class="menu-card-rating">
                        <span class="stars">${stars}</span>
                        <span>(${item.rating})</span>
                    </div>
                    <button class="btn btn-primary" onclick="handleOrder('${item.name}')">
                        <span>Order Now</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            `;
            menuGrid.appendChild(card);
        });
    }

    // ===========================
    // 10. Menu Category Filter
    // ===========================
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderMenu(filter);
        });
    });

    // Initial render
    renderMenu();

    // ===========================
    // 11. Render Gallery
    // ===========================
    const galleryGrid = document.getElementById('galleryGrid');

    function renderGallery() {
        if (!galleryGrid) return;

        galleryData.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.setAttribute('data-index', galleryData.indexOf(item));
            div.innerHTML = `
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="gallery-item-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.category}</p>
                </div>
            `;
            div.addEventListener('click', () => openLightbox(galleryData.indexOf(item)));
            galleryGrid.appendChild(div);
        });
    }

    renderGallery();

    // ===========================
    // 12. Lightbox Functionality
    // ===========================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentLightboxIndex = 0;

    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        const item = galleryData[currentLightboxIndex];
        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
        lightboxCaption.textContent = `${item.title} - ${item.category}`;
    }

    function nextImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length;
        updateLightbox();
    }

    function prevImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
        updateLightbox();
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // ===========================
    // 13. Testimonial Slider
    // ===========================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testDots = document.getElementById('testDots');
    const testPrev = document.getElementById('testPrev');
    const testNext = document.getElementById('testNext');
    let currentTestimonial = 0;
    let testimonialAutoplay;

    function renderTestimonials() {
        if (!testimonialTrack) return;

        testimonialData.forEach((t, index) => {
            const stars = '★'.repeat(t.rating);
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="testimonial-content">
                    <div class="testimonial-stars">${stars}</div>
                    <p class="testimonial-text">${t.text}</p>
                    <div class="testimonial-author">
                        <img src="${t.image}" alt="${t.name}" loading="lazy">
                        <div class="testimonial-info">
                            <h4>${t.name}</h4>
                            <span>${t.role}</span>
                        </div>
                    </div>
                </div>
            `;
            testimonialTrack.appendChild(card);

            // Create dot
            const dot = document.createElement('span');
            dot.className = 'testimonial-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            testDots.appendChild(dot);
        });
    }

    function goToTestimonial(index) {
        currentTestimonial = index;
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll('.testimonial-dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonialData.length;
        goToTestimonial(next);
    }

    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + testimonialData.length) % testimonialData.length;
        goToTestimonial(prev);
    }

    if (testNext && testPrev) {
        testNext.addEventListener('click', () => {
            nextTestimonial();
            resetAutoplay();
        });

        testPrev.addEventListener('click', () => {
            prevTestimonial();
            resetAutoplay();
        });
    }

    function startAutoplay() {
        testimonialAutoplay = setInterval(nextTestimonial, 5000);
    }

    function resetAutoplay() {
        clearInterval(testimonialAutoplay);
        startAutoplay();
    }

    renderTestimonials();
    startAutoplay();

    // ===========================
    // 14. FAQ Accordion
    // ===========================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => i.classList.remove('active'));

            // Open current if it was closed
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===========================
    // 15. Form Validation
    // ===========================
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[\d\s+\-()]{8,}$/.test(phone);
    }

    function validateField(input) {
        const value = input.value.trim();
        const type = input.type;

        if (input.hasAttribute('required') && !value) {
            showError(input, 'This field is required');
            return false;
        }

        if (type === 'email' && value && !validateEmail(value)) {
            showError(input, 'Please enter a valid email');
            return false;
        }

        if (type === 'tel' && value && !validatePhone(value)) {
            showError(input, 'Please enter a valid phone number');
            return false;
        }

        clearError(input);
        return true;
    }

    function showError(input, message) {
        input.classList.add('error');
        let error = input.parentNode.querySelector('.error-message');
        if (!error) {
            error = document.createElement('span');
            error.className = 'error-message';
            input.parentNode.appendChild(error);
        }
        error.textContent = message;

        setTimeout(() => clearError(input), 3000);
    }

    function clearError(input) {
        input.classList.remove('error');
        const error = input.parentNode.querySelector('.error-message');
        if (error) error.remove();
    }

    // ===========================
    // 16. Reservation Form
    // ===========================
    const reservationForm = document.getElementById('reservationForm');

    if (reservationForm) {
        // Set min date to today
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = reservationForm.querySelectorAll('input, select, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                showModal('Almost there!', 'Please fill in all required fields correctly.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = reservationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Reserving...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                showModal(
                    'Reservation Confirmed!',
                    'Thank you! Your reservation request has been received. We will send a confirmation to your email shortly.',
                    'success'
                );
                reservationForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });

        // Real-time validation
        reservationForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('blur', () => validateField(input));
        });
    }

    // ===========================
    // 17. Contact Form
    // ===========================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (!validateField(input)) isValid = false;
            });

            if (!isValid) return;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                showModal(
                    'Message Sent!',
                    'Thank you for reaching out! We\'ll get back to you within 24 hours.',
                    'success'
                );
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });

        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => validateField(input));
        });
    }

    // ===========================
    // 18. Newsletter Form
    // ===========================
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');

            if (!validateField(input)) return;

            const btn = newsletterForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Subscribing...';
            btn.disabled = true;

            setTimeout(() => {
                showModal(
                    'Subscribed!',
                    'Welcome to the Bella Vista family! Check your email for a special welcome offer.',
                    'success'
                );
                newsletterForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }

    // ===========================
    // 19. Modal
    // ===========================
    const modal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    function showModal(title, message, type = 'success') {
        modalTitle.textContent = title;
        modalMessage.textContent = message;

        const icon = modal.querySelector('.modal-icon');
        if (type === 'success') {
            icon.innerHTML = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
        } else {
            icon.innerHTML = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===========================
    // 20. Order Button Handler
    // ===========================
    window.handleOrder = function(itemName) {
        showModal(
            'Added to Cart!',
            `${itemName} has been added to your order. This is a demo — no real order has been placed.`,
            'success'
        );
    };

    // ===========================
    // 21. Parallax Effect for Hero
    // ===========================
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    // ===========================
    // 22. Set min date for reservation on load
    // ===========================
    window.addEventListener('DOMContentLoaded', () => {
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    });

    // ===========================
    // Initial Calls
    // ===========================
    revealOnScroll();
    highlightNav();
    handleScroll();

    // ===========================
    // 23. Smooth Page Load Transitions
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function() {
            // Add a small visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // ===========================
    // 24. Touch Swipe for Mobile Testimonials
    // ===========================
    let touchStartX = 0;
    let touchEndX = 0;

    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextTestimonial();
            } else {
                prevTestimonial();
            }
            resetAutoplay();
        }
    }

    // ===========================
    // 25. Image Lazy Loading Fade-In
    // ===========================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 50);
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===========================
    // 26. Console Welcome Message
    // ===========================
    console.log(
        '%c🍽️ Bella Vista Restaurant',
        'color: #d4a574; font-size: 24px; font-weight: bold; font-family: Georgia, serif;'
    );
    console.log(
        '%cWelcome to the code! Crafted with passion for fine dining.',
        'color: #b8b8b8; font-size: 14px;'
    );

})();
