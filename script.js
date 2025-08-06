// DOM Elements
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');
const faqItems = document.querySelectorAll('.faq-item');
const loanApplicationForm = document.getElementById('loanApplicationForm');
const contactForm = document.getElementById('contactForm');

// Header Scroll Effect
function handleScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile Navigation Toggle
hamburger?.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile nav when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    });
});

// Loan Application Form Handler
loanApplicationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(loanApplicationForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!validateLoanForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = loanApplicationForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your application! We\'re connecting you with suitable lenders. You should hear from them within 24 hours.');
        loanApplicationForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Contact Form Handler
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Form Validation Functions
function validateLoanForm(data) {
    const required = ['loanAmount', 'loanPurpose', 'firstName', 'lastName', 'email', 'phone', 'zipCode', 'creditScore'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Email validation
    if (!isValidEmail(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Phone validation
    if (!isValidPhone(data.phone)) {
        alert('Please enter a valid phone number.');
        return false;
    }
    
    // ZIP code validation
    if (!isValidZipCode(data.zipCode)) {
        alert('Please enter a valid ZIP code.');
        return false;
    }
    
    return true;
}

function validateContactForm(data) {
    const required = ['firstName', 'lastName', 'email', 'subject', 'message'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Email validation
    if (!isValidEmail(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isValidZipCode(zipCode) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .loan-card, .step, .info-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
function initAnimations() {
    const elements = document.querySelectorAll('.feature-card, .loan-card, .step, .info-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Form Input Enhancements
function enhanceFormInputs() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
        
        // Check initial values
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }
    });
}

// Phone Number Formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        if (value.length <= 3) {
            formattedValue = `(${value}`;
        } else if (value.length <= 6) {
            formattedValue = `(${value.substring(0, 3)}) ${value.substring(3)}`;
        } else {
            formattedValue = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
        }
    }
    
    input.value = formattedValue;
}

// Add phone formatting to phone inputs
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
        formatPhoneNumber(this);
    });
});

// Loading Animation for Buttons
function addButtonLoadingState() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.type === 'submit') {
                // Let form handlers manage loading state
                return;
            }
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Parallax Effect for Hero Section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    enhanceFormInputs();
    addButtonLoadingState();
    addParallaxEffect();
    initLazyLoading();
    
    // Initial animation trigger
    animateOnScroll();
});

// Event Listeners
window.addEventListener('scroll', () => {
    handleScroll();
    animateOnScroll();
});

window.addEventListener('resize', () => {
    // Close mobile nav on resize
    nav.classList.remove('active');
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add error handling for fetch requests (if used in future)
window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason);
    // Optionally show user-friendly error message
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    handleScroll();
    animateOnScroll();
}, 10);

window.removeEventListener('scroll', () => {
    handleScroll();
    animateOnScroll();
});

window.addEventListener('scroll', debouncedScroll);