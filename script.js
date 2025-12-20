/* ============================================
   NOBLES CROWN - ENHANCED JAVASCRIPT
   Production-ready interactions and animations
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // PARTICLES.JS CONFIGURATION
    // ============================================
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 300,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // ============================================
    // TYPING EFFECT
    // ============================================
    const typingTexts = [
        'Modern Designs That Stand Out',
        'Fast Turnaround - 7 Days',
        '24/7 AI-Powered Support',
        'Mobile-First Development',
        'SEO Optimized Websites'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const typedTextElement = document.querySelector('.typed-text');
    
    function typeText() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typingSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing effect
    if (typedTextElement) {
        setTimeout(typeText, 1000);
    }

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const scrollProgress = document.querySelector('.scroll-progress');
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercentage + '%';
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('header');
    
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Stagger animation
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .benefit-card, .portfolio-card, .pricing-card, ' +
        '.timeline-step, .testimonial-card, .faq-item, .contact-method, .contact-form'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const toggle = question.querySelector('.faq-toggle');
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(a => {
                if (a !== answer) {
                    a.classList.remove('active');
                }
            });
            
            document.querySelectorAll('.faq-toggle').forEach(t => {
                if (t !== toggle) {
                    t.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            answer.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    });

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                business: document.getElementById('business').value,
                phone: document.getElementById('phone').value,
                type: document.getElementById('type').value,
                need: document.getElementById('need').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value
            };
            
            // Create WhatsApp message
            const whatsappMessage = `Hi Nobles Crown, I'd like a quote.

Name: ${formData.name}
Business: ${formData.business}
Phone: ${formData.phone}
Business Type: ${formData.type}
Need: ${formData.need}
Budget: ${formData.budget}

Message: ${formData.message}`;
            
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/254111627474?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
        });
    }
    
    function showSuccessMessage() {
        const formContainer = contactForm.parentElement;
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            background: linear-gradient(135deg, #10B981, #059669);
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            text-align: center;
            animation: fadeInUp 0.5s ease-out;
        `;
        successMsg.textContent = '✅ Opening WhatsApp... Your message is ready to send!';
        
        formContainer.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.style.animation = 'fadeOutDown 0.5s ease-out';
            setTimeout(() => successMsg.remove(), 500);
        }, 3000);
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        const rect = button.getBoundingClientRect();
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple-effect');
        
        ripple.style.cssText += `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rippleEffect = button.querySelector('.ripple-effect');
        if (rippleEffect) {
            rippleEffect.remove();
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Add ripple to all buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .header-cta').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeOutDown {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // PARALLAX EFFECT FOR SECTIONS
    // ============================================
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        
        const parallaxElements = document.querySelectorAll('.benefit-icon, .portfolio-image');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5;
            const yPos = -(scrolled * speed * (index % 2 === 0 ? 1 : -1));
            el.style.transform = `translateY(${yPos * 0.1}px)`;
        });
    }
    
    window.addEventListener('scroll', parallaxEffect);

    // ============================================
    // LAZY LOADING FOR IMAGES
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // ANIMATE NUMBERS (FOR STATS IF NEEDED)
    // ============================================
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Example usage for counting animations
    const statsElements = document.querySelectorAll('[data-count]');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const endValue = parseInt(el.dataset.count);
                animateValue(el, 0, endValue, 2000);
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    statsElements.forEach(el => statsObserver.observe(el));

    // ============================================
    // PERFORMANCE OPTIMIZATIONS
    // ============================================
    
    // Throttle function for scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply throttling to scroll-heavy functions
    const throttledScroll = throttle(() => {
        updateScrollProgress();
        handleHeaderScroll();
        parallaxEffect();
    }, 10);
    
    window.addEventListener('scroll', throttledScroll);

    // ============================================
    // ACCESSIBILITY ENHANCEMENTS
    // ============================================
    
    // Add keyboard navigation for FAQ
    faqQuestions.forEach(question => {
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
    
    // Focus management for modal/forms
    const firstFocusableElement = contactForm?.querySelector('input, select, textarea, button');
    if (firstFocusableElement) {
        const contactSection = document.getElementById('contact');
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && window.location.hash === '#contact') {
                    setTimeout(() => firstFocusableElement.focus(), 500);
                }
            });
        }, { threshold: 0.5 });
        
        if (contactSection) {
            contactObserver.observe(contactSection);
        }
    }

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c👑 Nobles Crown Inc', 'font-size: 24px; font-weight: bold; color: #F97316;');
    console.log('%cLooking for a developer? We\'re hiring!', 'font-size: 14px; color: #1E3A8A;');
    console.log('%cContact us: solutions@noblescrown.co.ke', 'font-size: 12px; color: #4B5563;');

    // ============================================
    // INITIALIZATION COMPLETE
    // ============================================
    console.log('✅ Nobles Crown website initialized');
    
    // Remove loading class if present
    document.body.classList.remove('loading');
    
})();