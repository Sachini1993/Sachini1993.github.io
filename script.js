/**
 * Portfolio Website - JavaScript
 * Interactive functionality for Sachini Alwis Portfolio
 */

// ===================================
// ANIMATED JOB TITLE ROTATION
// ===================================
const jobTitles = [
    'Web Developer',
    'Test Automation Engineer',
    'Content Creator'
];

let currentTitleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150; // Speed of typing in milliseconds
let deletingSpeed = 100; // Speed of deleting in milliseconds
let pauseTime = 2000; // Pause time after complete word

const animatedRoleElement = document.querySelector('.animated-role');

function typeEffect() {
    const currentTitle = jobTitles[currentTitleIndex];
    
    if (!isDeleting && charIndex < currentTitle.length) {
        // Typing
        animatedRoleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeEffect, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        animatedRoleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, deletingSpeed);
    } else if (!isDeleting && charIndex === currentTitle.length) {
        // Finished typing, pause then start deleting
        isDeleting = true;
        setTimeout(typeEffect, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next title
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % jobTitles.length;
        setTimeout(typeEffect, 500);
    }
}

// Start the typing effect when page loads
window.addEventListener('DOMContentLoaded', () => {
    if (animatedRoleElement) {
        setTimeout(typeEffect, 1000); // Start after 1 second delay
    }
});

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Reveal element when it's 100px from the bottom of the viewport
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

// Initial check for elements already in view
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ===================================
// NAVIGATION DOTS FUNCTIONALITY
// ===================================
const navDots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('.section');

// Click handler for navigation dots
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sections[index].scrollIntoView({ behavior: 'smooth' });
    });
});

// Update active dot on scroll
const updateActiveDot = () => {
    let current = 0;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Check if section is in viewport
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = index;
        }
    });

    // Update dot states
    navDots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === current) {
            dot.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveDot);

// ===================================
// SMOOTH PARALLAX EFFECT
// ===================================
const parallaxCircles = document.querySelectorAll('.decorative-circle');

const createParallaxEffect = () => {
    const scrolled = window.pageYOffset;
    
    parallaxCircles.forEach((circle, index) => {
        // Different speed for each circle
        const speed = 0.5 + (index * 0.2);
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
};

window.addEventListener('scroll', createParallaxEffect);

// ===================================
// DOWNLOAD CV BUTTON
// ===================================
const downloadBtn = document.querySelector('.download-cv-btn');

if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        // Add a click animation
        downloadBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            downloadBtn.style.transform = '';
        }, 200);
        
        // The actual download is handled by the href and download attributes in HTML
        // This just provides visual feedback
        console.log('Downloading CV: MYRESUME.pdf');
    });
}

// ===================================
// SKILL ITEMS INTERACTION
// ===================================
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Add a subtle scale effect
        item.style.transform = 'translateX(10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = '';
    });
});

// ===================================
// IMAGE LAZY LOADING ENHANCEMENT
// ===================================
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Add fade-in effect when image loads
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease-in';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            // If image is already loaded (cached)
            if (img.complete) {
                img.style.opacity = '1';
            }
            
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// CONTACT ITEMS CLICK TO COPY
// ===================================
const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
    item.addEventListener('click', () => {
        const text = item.querySelector('span').textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            // Visual feedback
            const originalBg = item.style.background;
            item.style.background = 'var(--brown-medium)';
            item.style.color = 'var(--white)';
            
            // Show temporary tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Copied!';
            tooltip.style.cssText = `
                position: absolute;
                background: var(--brown-dark);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.9rem;
                pointer-events: none;
                z-index: 1000;
                animation: fadeIn 0.3s ease-in;
            `;
            
            item.style.position = 'relative';
            item.appendChild(tooltip);
            
            // Reset after 1.5 seconds
            setTimeout(() => {
                item.style.background = originalBg;
                item.style.color = '';
                tooltip.remove();
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});

// ===================================
// CATEGORY IMAGES HOVER EFFECT
// ===================================
const categoryImages = document.querySelectorAll('.category-image-frame');

categoryImages.forEach(frame => {
    frame.addEventListener('mouseenter', () => {
        const img = frame.querySelector('.category-image');
        img.style.transform = 'scale(1.1)';
    });
    
    frame.addEventListener('mouseleave', () => {
        const img = frame.querySelector('.category-image');
        img.style.transform = 'scale(1)';
    });
});

// ===================================
// HERO IMAGE FRAME ANIMATION
// ===================================
const heroImageFrame = document.querySelector('.hero-image-frame');

if (heroImageFrame) {
    // Add subtle rotation on mouse move
    heroImageFrame.addEventListener('mousemove', (e) => {
        const rect = heroImageFrame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        const img = heroImageFrame.querySelector('.hero-image');
        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    heroImageFrame.addEventListener('mouseleave', () => {
        const img = heroImageFrame.querySelector('.hero-image');
        img.style.transform = '';
    });
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(revealOnScroll, 100));
window.addEventListener('scroll', throttle(updateActiveDot, 100));
window.addEventListener('scroll', throttle(createParallaxEffect, 50));

// ===================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for internal links
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('DOMContentLoaded', () => {
    // Add animation class to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Animate hero elements sequentially
    const heroElements = [
        '.hero-image-container',
        '.hero-title',
        '.hero-subtitle',
        '.hero-role',
        '.hero-description',
        '.hero-stats',
        '.languages-badge'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        }
    });
});

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Keyboard navigation for skill items
skillItems.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    
    item.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// Keyboard navigation for navigation dots
navDots.forEach((dot, index) => {
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `Navigate to section ${index + 1}`);
    
    dot.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c👋 Welcome to Sachini Alwis Portfolio!', 'color: #8B6F47; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the GitHub repo!', 'color: #634832; font-size: 14px;');

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Prevent right-click on images (optional - remove if not needed)
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/
