// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const colorButtons = document.querySelectorAll('.color-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const skillBars = document.querySelectorAll('.skill-progress');

// Theme Switching Functionality
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

// Color Scheme Changing
colorButtons.forEach(button => {
    button.addEventListener('click', function() {
        const color = this.getAttribute('data-color');
        changeColorScheme(color);
        localStorage.setItem('primaryColor', color);
    });
});

// Apply saved color scheme
const savedColor = localStorage.getItem('primaryColor');
if (savedColor) {
    changeColorScheme(savedColor);
}

function changeColorScheme(primaryColor) {
    const secondaryColor = adjustColorBrightness(primaryColor, -20);
    
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    colorButtons.forEach(btn => {
        if (btn.getAttribute('data-color') === primaryColor) {
            btn.style.transform = 'scale(1.2)';
            btn.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)';
        } else {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = 'none';
        }
    });
}

// Helper function to adjust color brightness
function adjustColorBrightness(hex, percent) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = clamp(r + percent);
    g = clamp(g + percent);
    b = clamp(b + percent);

    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function clamp(num) {
    return Math.min(255, Math.max(0, num));
}

// Portfolio Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Skill bars animation
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObj = {};
        formData.forEach((value, key) => {
            formObj[key] = value;
        });
        
        this.innerHTML = '<div class="success-message">Thanks for your message! I\'ll get back to you soon.</div>';
        console.log('Form submitted with data:', formObj);
    });
}

// Scroll to top button functionality
function addScrollTopButton() {
    const scrollWrapper = document.createElement('div');
    scrollWrapper.className = 'scroll-top-wrapper';
    
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollTopBtn';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.setAttribute('title', 'Scroll to top');
    
    scrollWrapper.appendChild(scrollBtn);
    document.body.appendChild(scrollWrapper);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Loading spinner functionality
function addLoadingSpinner() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    
    loading.appendChild(spinner);
    document.body.appendChild(loading);
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loading.classList.add('hide');
            setTimeout(function() {
                loading.remove();
            }, 500);
        }, 500);
    });
}

// Color button tooltips
function addTooltipsToColorButtons() {
    const colorButtons = document.querySelectorAll('.color-btn');
    const colorNames = {
        'blue': 'Blue Theme',
        'purple': 'Purple Theme',
        'green': 'Green Theme',
        'orange': 'Orange Theme'
    };
    
    colorButtons.forEach(button => {
        const colorClass = Array.from(button.classList).find(cls => colorNames[cls]);
        if (colorClass) {
            button.classList.add('tooltip');
            
            const tooltip = document.createElement('span');
            tooltip.className = 'tooltiptext';
            tooltip.textContent = colorNames[colorClass];
            
            button.appendChild(tooltip);
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            if (entry.target.id === 'about') {
                animateSkillBars();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Mobile menu functionality
function setupMobileMenu() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    document.querySelector('nav').appendChild(menuToggle);

    menuToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
        this.innerHTML = navLinks.classList.contains('show') ? '✕' : '☰';
    });

    // Add responsive styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 70px;
                left: 0;
                width: 100%;
                background-color: var(--header-bg);
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                padding: 20px 0;
                z-index: 1000;
            }
            
            .nav-links.show {
                display: flex;
            }
            
            .nav-links li {
                margin: 10px 0;
            }
            
            .menu-toggle {
                display: block;
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 15px;
            }
            
            .theme-options {
                margin-right: 15px;
            }
        }
    `;
    document.head.appendChild(styleElement);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Initialize UI elements
    addScrollTopButton();
    addLoadingSpinner();
    addTooltipsToColorButtons();
    setupMobileMenu();
});

// Page load animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const heroElements = document.querySelectorAll('.hero-text h1, .hero-text p, .cta-btn, .profile-img');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animated');
        }, 300 * index);
    });
});