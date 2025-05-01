document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile nav if it doesn't exist
            if (!document.querySelector('.mobile-nav')) {
                const mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                
                const closeBtn = document.createElement('div');
                closeBtn.className = 'close-menu';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                
                const navContent = document.querySelector('nav').cloneNode(true);
                
                mobileNav.appendChild(closeBtn);
                mobileNav.appendChild(navContent);
                body.appendChild(mobileNav);
                
                // Close menu event
                closeBtn.addEventListener('click', function() {
                    mobileNav.classList.remove('active');
                });
                
                // Mobile nav links
                const mobileLinks = mobileNav.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileNav.classList.remove('active');
                    });
                });
            }
            
            // Toggle mobile nav
            const mobileNav = document.querySelector('.mobile-nav');
            mobileNav.classList.add('active');
        });
    }
    
    // Menu Category Tabs
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuItems = document.querySelectorAll('.menu-category-items');
    
    if (menuCategories.length > 0) {
        menuCategories.forEach(category => {
            category.addEventListener('click', function() {
                // Remove active class from all categories
                menuCategories.forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked category
                this.classList.add('active');
                
                // Hide all menu items
                menuItems.forEach(item => item.classList.remove('active'));
                
                // Show selected menu items
                const categoryId = this.getAttribute('data-category');
                document.getElementById(categoryId).classList.add('active');
            });
        });
    }
    
    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('nav a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Scroll Spy (Highlight nav items based on scroll position)
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // In a real application, you would send this data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.section-header, .about-content, .menu-item, .gallery-item, .contact-item');
    
    // Add fade-in class to elements when they come into view
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Create images directory and placeholder images
    function createPlaceholderImages() {
        // This is just a visual enhancement for the demo
        // In a real application, you would use actual images
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const aboutImage = document.querySelector('.about-image img');
        
        // Set placeholder background colors for gallery items
        if (galleryItems.length > 0) {
            const colors = ['#8B5A2B', '#A67C52', '#C49A6C', '#D4AF37', '#E6BE8A', '#F5DEB3'];
            
            galleryItems.forEach((item, index) => {
                item.style.backgroundColor = colors[index % colors.length];
                item.style.minHeight = '250px';
            });
        }
        
        // Set placeholder for about image
        if (aboutImage) {
            aboutImage.style.backgroundColor = '#8B5A2B';
            aboutImage.style.minHeight = '400px';
        }
    }
    
    createPlaceholderImages();
});
