// ========== MOBILE MENU TOGGLE ==========
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

// Toggle mobile menu
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Close mobile menu when scrolling
window.onscroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    
    // Update active nav link on scroll
    updateActiveNavLink();
    
    // Show/hide scroll to top button
    handleScrollTopButton();
    
    // Add scrolled class to header
    handleHeaderScroll();
};

// ========== HEADER SCROLL EFFECT ==========
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ========== ACTIVE NAV LINK ON SCROLL ==========
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTop');

function handleScrollTopButton() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
}

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== TYPING ANIMATION FOR MULTI-TEXT ==========
const typedTextElement = document.querySelector('.multi_text');

if (typedTextElement) {
    const textArray = [
        'Web Developer',
        'Test Automation Engineer',
        'Software Tester',
        'Content Creater',
        'Quality Advocate'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeText() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 75;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500; // Pause before starting new text
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing animation
    setTimeout(typeText, 1000);
}

// ========== SCROLL REVEAL ANIMATION ==========
function revealOnScroll() {
    const reveals = document.querySelectorAll('.service_card, .project_card, .skill_content, .timeline_item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========== SKILLS BAR ANIMATION ==========
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skills_percentage');
    const skillsSection = document.querySelector('#skills');
    
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    bar.style.animation = 'skillsAnimation 1.5s ease-out forwards';
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
}

animateSkillBars();

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalButtonText = submitButton.innerHTML;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        
        try {
            // Get form data
            const formData = new FormData(contactForm);
            
            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            } else {
                // Show error message
                showNotification('Oops! There was a problem sending your message. Please try again.', 'error');
            }
        } catch (error) {
            // Show error message
            showNotification('Oops! There was a problem sending your message. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Set colors based on type
    let backgroundColor, icon;
    switch(type) {
        case 'success':
            backgroundColor = '#10B981';
            icon = 'bx-check-circle';
            break;
        case 'error':
            backgroundColor = '#EF4444';
            icon = 'bx-error-circle';
            break;
        default:
            backgroundColor = '#3B82F6';
            icon = 'bx-info-circle';
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="bx ${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${backgroundColor};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.5rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ========== ADD SCROLL ANIMATIONS CSS ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .service_card,
    .project_card,
    .skill_content,
    .timeline_item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service_card.revealed,
    .project_card.revealed,
    .skill_content.revealed,
    .timeline_item.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ========== PROJECT CARDS HOVER EFFECT ==========
const projectCards = document.querySelectorAll('.project_card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========== LOADING ANIMATION ==========
window.addEventListener('load', () => {
    // Hide loading screen if you add one
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }
    
    // Trigger initial animations
    revealOnScroll();
});

// ========== LAZY LOADING FOR IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ========== PREVENT CONTEXT MENU (OPTIONAL) ==========
// Uncomment if you want to disable right-click on images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', e => e.preventDefault());
});
*/

// ========== CONSOLE MESSAGE ==========
console.log('%c Portfolio Website ', 'background: #34D399; color: white; font-size: 20px; padding: 10px;');
console.log('%c Designed & Developed by Sachini Alwis ', 'background: #1a202c; color: #34D399; font-size: 14px; padding: 5px;');
console.log('🚀 Looking for opportunities in QA Engineering & Test Automation');
console.log('📧 Contact: sachini.alwis@email.com');

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll handler
window.onscroll = debounce(() => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    updateActiveNavLink();
    handleScrollTopButton();
    handleHeaderScroll();
    revealOnScroll();
}, 10);

// ========== THEME TOGGLE (OPTIONAL) ==========
// Uncomment if you want to add dark mode toggle
/*
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', 
            document.body.classList.contains('dark-theme') ? 'dark' : 'light'
        );
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}
*/

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    navLinks[0]?.classList.add('active');
    
    // Initial reveal check
    revealOnScroll();
    
    // Handle initial scroll position
    if (window.scrollY > 0) {
        handleHeaderScroll();
        handleScrollTopButton();
    }
});
