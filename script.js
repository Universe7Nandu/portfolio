// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader-finish');
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }
    
    // Initialize particles.js
    initParticles();
});

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initCustomCursor();
    initTypingEffect();
    initSmoothScroll();
    initHamburgerMenu();
    initTabs();
    initPortfolioFilter();
    initFormSubmission();
    initScrollAnimations();
    init3DEffects();
    initThreeJsBackground();
});

// Initialize particles.js
function initParticles() {
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('Particles.js loaded successfully');
    });
}

// Initialize ThreeJS Background Effect
function initThreeJsBackground() {
    if (typeof THREE !== 'undefined') {
        // Only apply to certain sections
        const heroSection = document.querySelector('.hero-section');
        
        if (!heroSection) return;
        
        // Create scene
        const scene = new THREE.Scene();
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        
        // Append to hero section
        const threeJsContainer = document.createElement('div');
        threeJsContainer.classList.add('threejs-bg');
        threeJsContainer.style.position = 'absolute';
        threeJsContainer.style.top = '0';
        threeJsContainer.style.left = '0';
        threeJsContainer.style.width = '100%';
        threeJsContainer.style.height = '100%';
        threeJsContainer.style.zIndex = '-1';
        threeJsContainer.appendChild(renderer.domElement);
        heroSection.appendChild(threeJsContainer);
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Create material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x7928ca,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        // Create mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Animation
        function animate() {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0003;
            particlesMesh.rotation.y += 0.0003;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .project-card, .portfolio-item, .tab-btn');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Add hover effect for clickable elements
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.classList.add('cursor-active');
            follower.classList.add('cursor-active');
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.classList.remove('cursor-active');
            follower.classList.remove('cursor-active');
        });
    });
}

// Typing effect for role text
function initTypingEffect() {
    const options = {
        strings: ['Full-Stack Developer', 'React Developer', 'Web Designer', 'PHP Developer'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    };
    
    if(document.getElementById('typing-text')) {
        new Typed('#typing-text', options);
    }
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a, .cta-button, .back-to-top a');
    const header = document.querySelector('.header');
    
    // Handle smooth scrolling for all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navLinks = document.getElementById('nav-links');
                    const hamburger = document.getElementById('hamburger');
                    
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Highlight active link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Add scrolled class to header
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight active nav link
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Hamburger menu functionality
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Enhanced 3D effects for projects and portfolio
function init3DEffects() {
    // 3D effect for project cards with magnetic effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Magnetic effect variables
        let bounds;
        let mouseX = 0;
        let mouseY = 0;
        let mouseLeaveDelay = null;
        
        function magneticEffect() {
            const distX = mouseX - bounds.width/2;
            const distY = mouseY - bounds.height/2;
            
            const tiltX = (distY / bounds.height) * 10;
            const tiltY = (distX / bounds.width) * -10;
            const radius = Math.sqrt(Math.pow(tiltX, 2) + Math.pow(tiltY, 2));
            const degree = radius * 20;
            
            gsapAnimate(card, {
                transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`,
                ease: 'power2.out',
                duration: 0.5
            });
            
            const glowX = (distX / bounds.width) * 100;
            const glowY = (distY / bounds.height) * 100;
            
            card.style.setProperty('--glow-x', `${glowX}%`);
            card.style.setProperty('--glow-y', `${glowY}%`);
        }
        
        card.addEventListener('mouseenter', () => {
            bounds = card.getBoundingClientRect();
            document.addEventListener('mousemove', mouseMove);
        });
        
        function mouseMove(e) {
            const cardRect = bounds;
            mouseX = e.clientX - cardRect.left;
            mouseY = e.clientY - cardRect.top;
            
            const rotateX = (mouseY / (cardRect.height / 2) - 1) * -8;
            const rotateY = (mouseX / (cardRect.width / 2) - 1) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        }
        
        card.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', mouseMove);
            
            // Return to original position
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // 3D rotation for portfolio items with advanced flip effect
    const portfolioItems = document.querySelectorAll('.portfolio-item-inner');
    
    portfolioItems.forEach(item => {
        let isFlipped = false;
        
        item.addEventListener('click', function() {
            isFlipped = !isFlipped;
            if (isFlipped) {
                this.style.transform = 'rotateY(180deg)';
            } else {
                this.style.transform = 'rotateY(0)';
            }
        });
        
        item.addEventListener('mouseenter', function() {
            if (!isFlipped) {
                this.style.transform = 'rotateY(15deg) scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!isFlipped) {
                this.style.transform = 'rotateY(0) scale(1)';
            }
        });
    });
    
    // 3D cube animation in hero section with enhanced rotation
    const cube = document.querySelector('.cube');
    
    if (cube) {
        let rotateY = 0;
        let rotateX = 20;
        let rotateZ = 0;
        
        // Mouse parallax effect for cube
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const rotateXOffset = (mouseY - 0.5) * 20;
            const rotateYOffset = (mouseX - 0.5) * 20;
            
            gsapAnimate(cube, {
                transform: `rotateX(${20 + rotateXOffset}deg) rotateY(${rotateY + rotateYOffset}deg) rotateZ(${rotateZ}deg)`,
                ease: 'power1.out',
                duration: 1
            });
        });
        
        setInterval(() => {
            rotateY += 0.5;
            rotateZ += 0.1;
            if (!document.hidden) {
                cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
            }
        }, 50);
    }
}

// Helper function for smooth animations (GSAP-like)
function gsapAnimate(element, props) {
    const duration = props.duration || 0.5;
    const ease = props.ease || 'power2.out';
    delete props.duration;
    delete props.ease;
    
    const startTime = Date.now();
    const initialProps = {};
    const targetProps = {};
    
    // Get initial values
    for (let prop in props) {
        if (prop === 'transform') {
            initialProps[prop] = element.style.transform || 'none';
            targetProps[prop] = props[prop];
        }
        // Add more properties as needed
    }
    
    function update() {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        let easedProgress;
        
        // Simple easing functions
        if (ease === 'power1.out') {
            easedProgress = 1 - Math.pow(1 - progress, 1);
        } else if (ease === 'power2.out') {
            easedProgress = 1 - Math.pow(1 - progress, 2);
        } else if (ease === 'power3.out') {
            easedProgress = 1 - Math.pow(1 - progress, 3);
        } else {
            easedProgress = progress;
        }
        
        // Apply transform
        if ('transform' in initialProps) {
            element.style.transform = targetProps.transform;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// Tabs functionality for about section
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length && tabPanes.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding tab pane
                const tabId = this.getAttribute('data-tab');
                const activePane = document.getElementById(tabId);
                
                if (activePane) {
                    activePane.classList.add('active');
                    
                    // Add entrance animation
                    activePane.style.animation = 'none';
                    setTimeout(() => {
                        activePane.style.animation = 'fadeIn 0.5s forwards';
                    }, 10);
                    
                    // Animate skill bars if skills tab is active
                    if (tabId === 'skills') {
                        animateSkillBars();
                    }
                }
            });
        });
        
        // Animate skill bars on page load if skills tab is active
        if (document.querySelector('.tab-pane#skills.active')) {
            animateSkillBars();
        }
    }
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percentage = bar.parentElement.previousElementSibling.getAttribute('data-percentage');
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = percentage;
            bar.style.transition = 'width 1s ease-in-out';
        }, 100);
    });
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter portfolio items
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 200);
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
    }
}

// Form submission handling
function initFormSubmission() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let Netlify handle the form submission
            
            // Just show sending message until page redirects
            formMessage.innerHTML = '<div class="sending-message">Sending message...</div>';
            
            // Netlify will handle the rest - no need for fetch operations
            
            // Note: You can add custom success page in Netlify form settings
            // or set form-success attribute on the form to redirect
        });
        
        // Check if we're on a success page (can be customized in Netlify)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('success')) {
            formMessage.innerHTML = '<div class="success-message">Your message has been sent successfully! I will get back to you soon.</div>';
            
            // Hide message after a delay
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 6000);
        }
    }
}

// Scroll animations
function initScrollAnimations() {
    // Initialize AOS (Animate On Scroll) library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false
        });
    } else {
        // Fallback for scroll animations
        const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .portfolio-item, .contact-item');
        
        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        };
        
        const handleScrollAnimation = () => {
            animatedElements.forEach(element => {
                if (isElementInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated', 'fade-in');
                }
            });
        };
        
        window.addEventListener('scroll', handleScrollAnimation);
        handleScrollAnimation(); // Initial check
    }
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollValue = window.scrollY;
            heroSection.style.backgroundPositionY = scrollValue * 0.5 + 'px';
        });
    }
} 