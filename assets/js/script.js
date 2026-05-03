// Mobile-Optimized Portfolio JavaScript
// Author: Muhammad Ridho Hafidz
// Description: Mobile-first interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all mobile features
    initializeMobileOptimizations();
    initializeAnimations();
    initializeInteractivity();
    initializeMobileNavigation();
    initializeScrollProgress();
    initializeTouchGestures();
    showWelcomeMessage();
});

// Mobile Optimizations
function initializeMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Optimize scrolling for mobile
        optimizeMobileScrolling();
        
        // Add touch feedback
        addTouchFeedback();
        
        // Optimize images for mobile
        optimizeImagesForMobile();
        
        // Add pull-to-refresh prevention
        preventPullToRefresh();
    }
    
    // Viewport meta tag optimization
    optimizeViewport();
    
    // Add mobile-specific CSS
    addMobileCSS();
}

function optimizeMobileScrolling() {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optimize scroll performance
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                updateScrollProgress();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
}

function addTouchFeedback() {
    // Add visual feedback for touch interactions
    const touchElements = document.querySelectorAll('.contact-item, .skill-tag, .cert-item, .position-item');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
}

function optimizeImagesForMobile() {
    // Lazy load images if any
    const images = document.querySelectorAll('img');
    
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for older browsers
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

function preventPullToRefresh() {
    // Prevent pull-to-refresh on mobile
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].pageY;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        if (startY <= 10 && e.touches[0].pageY > startY) {
            e.preventDefault();
        }
    }, { passive: false });
}

function optimizeViewport() {
    // Dynamic viewport adjustment for mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    
    if (!viewport) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(meta);
    }
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.scrollTo(0, 1);
        }, 100);
    });
}

function addMobileCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .touch-active {
            transform: scale(0.98) !important;
            opacity: 0.8 !important;
            transition: all 0.1s ease !important;
        }
        
        .mobile-device .position-item {
            cursor: pointer;
        }
        
        .mobile-device .position-item:active {
            background: rgba(52, 152, 219, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Animations for Mobile
function initializeAnimations() {
    // Intersection Observer for mobile-optimized animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        animationObserver.observe(section);
    });

    // Stagger animations for mobile
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });
}

// Mobile-Optimized Interactivity
function initializeInteractivity() {
    // Touch-friendly skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            vibrate(50); // Haptic feedback
            showMobileTooltip(this.textContent, this);
        });
    });

    // Touch-friendly certificates
    document.querySelectorAll('.cert-item').forEach(cert => {
        cert.addEventListener('click', function() {
            vibrate(30);
            showMobileTooltip(this.querySelector('span').textContent, this);
        });
    });

    // Expandable job duties on mobile
    document.querySelectorAll('.position-item').forEach(item => {
        item.addEventListener('click', function() {
            vibrate(20);
            const duties = this.querySelector('.job-duties');
            duties.classList.toggle('expanded');
            
            // Update indicator text
            if (duties.classList.contains('expanded')) {
                this.style.setProperty('--expand-text', '"Tap to collapse"');
            } else {
                this.style.setProperty('--expand-text', '"Tap to expand"');
            }
        });
    });

    // Contact items with mobile optimization
    document.querySelectorAll('.contact-item a').forEach(item => {
        item.addEventListener('click', function(e) {
            vibrate(30);
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.parentElement.getBoundingClientRect();
            const size = 50;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            this.parentElement.style.position = 'relative';
            this.parentElement.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Mobile Navigation
function initializeMobileNavigation() {
    // Create floating action button
    const fab = document.createElement('button');
    fab.className = 'fab-mobile';
    fab.innerHTML = '<i class="fas fa-arrow-up"></i>';
    fab.style.display = 'none';
    document.body.appendChild(fab);
    
    // Show/hide FAB based on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            fab.style.display = 'flex';
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                fab.style.transform = 'translateY(100px)';
            } else {
                // Scrolling up
                fab.style.transform = 'translateY(0)';
            }
        } else {
            fab.style.display = 'none';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // FAB click handler
    fab.addEventListener('click', function() {
        vibrate(50);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Progress Indicator
function initializeScrollProgress() {
    // Create scroll progress indicator
    const progressContainer = document.createElement('div');
    progressContainer.className = 'mobile-scroll-indicator';
    progressContainer.innerHTML = '<div class="mobile-scroll-progress"></div>';
    document.body.appendChild(progressContainer);
}

function updateScrollProgress() {
    const progress = document.querySelector('.mobile-scroll-progress');
    if (!progress) return;
    
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progress.style.width = Math.min(scrollPercent, 100) + '%';
}

// Touch Gestures
function initializeTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchStartX - touchEndX;
        const deltaY = touchStartY - touchEndY;
        
        // Minimum swipe distance
        const minSwipeDistance = 100;
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe left
                    handleSwipeLeft();
                } else {
                    // Swipe right
                    handleSwipeRight();
                }
            }
        }
        
        // Reset
        touchStartX = 0;
        touchStartY = 0;
    }, { passive: true });
}

function handleSwipeLeft() {
    // Navigate to next section if applicable
    vibrate(20);
}

function handleSwipeRight() {
    // Navigate to previous section if applicable
    vibrate(20);
}

// Mobile-Optimized Utilities
function vibrate(duration = 50) {
    if ('vibrate' in navigator) {
        navigator.vibrate(duration);
    }
}

function showMobileTooltip(text, element) {
    // Remove existing tooltips
    document.querySelectorAll('.mobile-tooltip').forEach(tooltip => {
        tooltip.remove();
    });
    
    const tooltip = document.createElement('div');
    tooltip.className = 'mobile-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 12px 16px;
        border-radius: 24px;
        font-size: 14px;
        max-width: 90%;
        z-index: 10000;
        opacity: 0;
        animation: tooltipSlideUp 0.3s ease forwards;
        text-align: center;
        line-height: 1.4;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes tooltipSlideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes tooltipSlideDown {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(tooltip);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        tooltip.style.animation = 'tooltipSlideDown 0.3s ease forwards';
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }, 3000);
}

// Performance Optimizations for Mobile
function initializePerformanceOptimizations() {
    // Throttle resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleMobileResize();
        }, 100); // Faster for mobile
    });
    
    // Optimize animations for mobile
    if (window.DeviceMotionEvent) {
        // Reduce animations on mobile for better performance
        document.body.classList.add('mobile-optimized');
    }
    
    // Lazy load non-critical content
    lazyLoadContent();
}

function handleMobileResize() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile-specific adjustments
        document.body.classList.add('mobile-layout');
    } else {
        document.body.classList.remove('mobile-layout');
    }
    
    // Update dynamic elements
    updateScrollProgress();
}

function lazyLoadContent() {
    // Lazy load certification icons
    const certItems = document.querySelectorAll('.cert-item');
    
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                certObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    certItems.forEach(item => {
        certObserver.observe(item);
    });
}

function showWelcomeMessage() {
    console.log(`
🚀 Mobile-Optimized Portfolio Loaded! (2026)
📱 Touch-friendly interface activated
📧 Contact: mridhohafidz12@gmail.com
💼 LinkedIn: linkedin.com/in/ridhohafidz
⭐ 4+ Years Experience | Mobile-First Design
    `);
    
    // Show mobile-specific welcome
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            showMobileTooltip('👋 Swipe and tap to explore!', null);
        }, 1000);
    }
}

// Add ripple animation for mobile
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Export functions
window.MobilePortfolioUtils = {
    showMobileTooltip,
    vibrate,
    updateScrollProgress,
    handleMobileResize
};

// Service Worker for mobile performance (optional)
if ('serviceWorker' in navigator && window.innerWidth <= 768) {
    navigator.serviceWorker.register('/sw.js').catch(console.log);
}
