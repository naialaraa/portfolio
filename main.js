// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');
const animatedElements = document.querySelectorAll('.hidden');

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    animateOnScroll();
});

// Mobile Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Transform hamburger to X
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking a nav link
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Scroll animations
function animateOnScroll() {
    const triggerBottom = window.innerHeight * 0.8;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
            section.querySelectorAll('.hidden').forEach(el => {
                el.classList.add('fade-in');
                el.classList.remove('hidden');
            });
        }
    });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animateOnScroll();
    }, 300);
    
    const elements = document.querySelectorAll('.about-content, .skills-categories, .projects-grid, .contact-content');
    elements.forEach(el => {
        el.classList.add('hidden');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, 
                behavior: 'smooth'
            });
        }
    });
});

// Skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 500);
    });
}

// Run skill bar animation when skills section is in view
const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    observer.observe(skillsSection);
}

// Add active class to navigation links when scrolling
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100; 
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Run initial navigation update
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

// Style the scroll to top button
scrollTopBtn.style.position = 'fixed';
scrollTopBtn.style.bottom = '30px';
scrollTopBtn.style.right = '30px';
scrollTopBtn.style.width = '50px';
scrollTopBtn.style.height = '50px';
scrollTopBtn.style.borderRadius = '50%';
scrollTopBtn.style.backgroundColor = 'var(--primary-color)';
scrollTopBtn.style.color = 'white';
scrollTopBtn.style.border = 'none';
scrollTopBtn.style.fontSize = '1.2rem';
scrollTopBtn.style.cursor = 'pointer';
scrollTopBtn.style.display = 'none';
scrollTopBtn.style.zIndex = '999';
scrollTopBtn.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
scrollTopBtn.style.transition = 'all 0.3s ease';

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'block';
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0';
        setTimeout(() => {
            if (window.scrollY <= 500) {
                scrollTopBtn.style.display = 'none';
            }
        }, 300);
    }
});

// Scroll to top when button is clicked
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollTopBtn.addEventListener('mouseover', () => {
    scrollTopBtn.style.backgroundColor = 'var(--accent-color)';
    scrollTopBtn.style.transform = 'translateY(-3px)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.backgroundColor = 'var(--primary-color)';
    scrollTopBtn.style.transform = 'translateY(0)';
});

// Project Modal Functionality
const modalOverlay = document.getElementById('projectModalOverlay');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const projectModals = document.getElementById('projectModals');
const body = document.body;

// Store project data with IDs
const projectData = [
    { id: "project1", title: "E-commerce Sales Analysis" },
    { id: "project2", title: "Financial Performance Dashboard" },
    { id: "project3", title: "Customer Segmentation Analysis" },
    { id: "project4", title: "Supply Chain Optimization" }
];

// Open modal when "View Project" button is clicked
document.querySelectorAll('a[data-project-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const projectId = btn.dataset.projectId;

        const projectModalContent = document.querySelector(`.project-modal[data-project-id="${projectId}"]`);

        if (projectModalContent) {
            const contentClone = projectModalContent.cloneNode(true);
            modalContent.innerHTML = '';
            modalContent.appendChild(contentClone);

            modalOverlay.style.display = 'flex';
            body.classList.add('modal-open');
            setupImagePreview();
        }
    });
});

// Close modal when X is clicked
if (modalClose) {
    modalClose.addEventListener('click', () => {
        closeModal();
    });
}

// Close modal when clicking outside the modal content
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeImagePreview();
    }
});

// Function to close modal
function closeModal() {
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
        body.classList.remove('modal-open');
    }
}

// Create image preview functionality
function setupImagePreview() {
    // Create image preview elements
    if (!document.querySelector('.img-preview-overlay')) {
        const imgPreviewOverlay = document.createElement('div');
        imgPreviewOverlay.className = 'img-preview-overlay';
        
        const imgPreviewContainer = document.createElement('div');
        imgPreviewContainer.className = 'img-preview-container';
        
        const imgPreviewImg = document.createElement('img');
        imgPreviewContainer.appendChild(imgPreviewImg);
        
        const imgPreviewClose = document.createElement('div');
        imgPreviewClose.className = 'img-preview-close';
        imgPreviewClose.innerHTML = '<i class="fas fa-times"></i>';
        imgPreviewContainer.appendChild(imgPreviewClose);
        
        imgPreviewOverlay.appendChild(imgPreviewContainer);
        document.body.appendChild(imgPreviewOverlay);
        
        // Close image preview when X is clicked
        imgPreviewClose.addEventListener('click', closeImagePreview);
        
        // Close image preview when clicking outside the image
        imgPreviewOverlay.addEventListener('click', (e) => {
            if (e.target === imgPreviewOverlay) {
                closeImagePreview();
            }
        });
    }
    
    // Add click event to all gallery images
    const galleryImages = document.querySelectorAll('.modal-gallery img');
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            const imgPreviewOverlay = document.querySelector('.img-preview-overlay');
            const imgPreviewImg = document.querySelector('.img-preview-container img');
            
            imgPreviewImg.src = e.target.src;
            imgPreviewOverlay.style.display = 'flex';
        });
    });
}

// Function to close image preview
function closeImagePreview() {
    const imgPreviewOverlay = document.querySelector('.img-preview-overlay');
    if (imgPreviewOverlay) {
        imgPreviewOverlay.style.display = 'none';
    }
}

// Make sure modal is closed when page loads
window.addEventListener('load', () => {
    closeModal();
});

// Vibrant Footer Animations
document.addEventListener('DOMContentLoaded', () => {
    const socialIcons = document.querySelectorAll('.vibrant-footer .social-icon');
    
    socialIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(10px)';
        
        // Animate entry
        setTimeout(() => {
            icon.style.transition = 'all 0.3s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
        
        // Add hover ripple effect
        icon.addEventListener('mouseenter', function() {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255, 255, 255, 0.7)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            
            // Add keyframes for ripple animation
            if (!document.querySelector('style#ripple-animation')) {
                const style = document.createElement('style');
                style.id = 'ripple-animation';
                style.textContent = `
                    @keyframes ripple {
                        to { transform: scale(2.5); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    const footer = document.querySelector('.vibrant-footer');
    if (footer) {
        const footerGradient = document.querySelector('.footer-gradient');
        if (footerGradient) {
            footer.addEventListener('mouseenter', () => {
                footerGradient.style.animationDuration = '2s';
            });
            
            footer.addEventListener('mouseleave', () => {
                footerGradient.style.animationDuration = '5s';
            });
        }
    }
});

// Certificate Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.certificate-track');
    const items = document.querySelectorAll('.certificate-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (track && items.length > 0 && dots.length > 0) {
        let currentIndex = 0;
        const itemCount = items.length;
        
        // Initialize slider
        updateSlider();
        
        // Event listeners for controls
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + itemCount) % itemCount;
                updateSlider();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % itemCount;
                updateSlider();
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.dataset.index || index);
                updateSlider();
            });
        });
        
        // Auto slide every 5 seconds
        let slideInterval = setInterval(autoSlide, 3000);
        
        // Pause auto slide on hover
        if (track.parentElement) {
            track.parentElement.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            track.parentElement.addEventListener('mouseleave', () => {
                slideInterval = setInterval(autoSlide, 5000);
            });
        }
        
        function autoSlide() {
            currentIndex = (currentIndex + 1) % itemCount;
            updateSlider();
        }
        
        function updateSlider() {
            // Update track position
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Add touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                // Swipe left - next slide
                currentIndex = (currentIndex + 1) % itemCount;
                updateSlider();
            } else if (touchEndX - touchStartX > 50) {
                // Swipe right - previous slide
                currentIndex = (currentIndex - 1 + itemCount) % itemCount;
                updateSlider();
            }
        }
    }
});

// Typing animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (typingText && cursor) {
        const words = ['Data Enthusiast', 'Computer Engineering', 'College Students'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeDelay = 150;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Deleting text
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeDelay = 50;  // Faster deletion speed
            } else {
                // Typing text
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeDelay = 150;  // Normal typing speed
            }
            
            // If word is complete, start deleting after delay
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeDelay = 1500;  // Pause at the end of word
            } 
            // If deletion is complete, move to next word
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeDelay = 500;  // Pause before starting new word
            }
            
            setTimeout(typeEffect, typeDelay);
        }
        
        // Start the typing animation immediately
        typeEffect();
    }
    
    // Skills slider with logos
    if (skillsSection) {
        // Create the skills slider HTML if it doesn't exist
        const skillsContainer = skillsSection.querySelector('.container');
        
        if (skillsContainer && !document.querySelector('.skills-slider-container')) {
            // Create the skills slider HTML
            const skillsLogos = [
                { name: 'Python', image: 'python-logo.png', fallback: 'python.png' },
                { name: 'SQL', image: 'sql-logo.png', fallback: 'SQL.png' },
                { name: 'Looker', image: 'looker-logo.png', fallback: 'Looker.png' },
                { name: 'Power BI', image: 'powerbi-logo.png', fallback: 'powerBI.png' },
                { name: 'Excel', image: 'excel-logo.png', fallback: 'excel.png' },
                { name: 'Pandas', image: 'pandas-logo.png', fallback: 'pandas.png' },
                { name: 'Seaborn', image: 'seaborn-logo.png', fallback: 'seaborn.png' },
                { name: 'Tableau', image: 'Tableau-logo.png', fallback: 'tableau.png' },
                { name: 'BigQuery', image: 'BigQuery-logo.png', fallback: 'BigQuery.png' },
                { name: 'Jupyter', image: 'jupyter-logo.png', fallback: 'jupyter.png' }
            ];
            
            // Create markup for the skills slider
            const skillsSliderHTML = `
                <h2 class="section-title">My Skills</h2>
                <div class="skills-slider-container">
                    <div class="skills-slider">
                        <div class="skills-track">
                            ${skillsLogos.map(skill => `
                                <div class="skill-logo">
                                    <img src="${skill.fallback}" data-original="${skill.image}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            skillsContainer.innerHTML = skillsSliderHTML;
        }
        
        // Initialize the automatic sliding animation
        const skillsTrack = document.querySelector('.skills-track');
        if (skillsTrack) {
            skillsTrack.innerHTML += skillsTrack.innerHTML;
            
            // Add CSS animation
            if (!document.querySelector('style#skills-animation')) {
                const style = document.createElement('style');
                style.id = 'skills-animation';
                style.textContent = `
                    @keyframes slideSkills {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Animation function for automatic sliding
            function startSkillsSlider() {
                skillsTrack.style.animation = 'slideSkills 40s linear infinite';
            }
            
            // Start the animation when skills section comes into view
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startSkillsSlider();
                        skillsObserver.unobserve(entry.target);
                    }
                });
            });
            
            skillsObserver.observe(skillsSection);
        }
    }
    
    // Add scroll reveal animations to sections
    const revealElements = document.querySelectorAll('.section-title, .project-card, .certificate-card, .about-content');
    
    // Create custom scroll reveal functionality
    const scrollRevealFunc = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                scrollRevealFunc.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    if (!document.querySelector('style#reveal-animation')) {
        const style = document.createElement('style');
        style.id = 'reveal-animation';
        style.textContent = `
            .reveal-element {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    revealElements.forEach(el => {
        el.classList.add('reveal-element');
        scrollRevealFunc.observe(el);
    });
});

// contact cards - Animation and interaction
document.addEventListener('DOMContentLoaded', function() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.2}s`;
        card.style.opacity = '0';
        
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.animation = 'pulse 0.8s ease infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.animation = '';
        });
    });
    
    if (!document.getElementById('contact-animations')) {
        const style = document.createElement('style');
        style.id = 'contact-animations';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(40px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.15);
                }
                100% {
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    contactCards.forEach(card => {
        const link = card.querySelector('a');
        link.addEventListener('click', function(e) {
            console.log('Contact card clicked:', this.href);
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const headerTitle = document.querySelector('header h1') || document.querySelector('header .logo');
    
    if (headerTitle) {
      if (!headerTitle.querySelector('.animated-underline')) {
        const underline = document.createElement('span');
        underline.className = 'animated-underline';
        headerTitle.appendChild(underline);
        
        if (!document.getElementById('header-animation-styles')) {
          const style = document.createElement('style');
          style.id = 'header-animation-styles';
          style.textContent = `
            header h1, header .logo {
              position: relative;
              display: inline-block;
            }
            
            .animated-underline {
              position: absolute;
              bottom: -3px;
              left: 0;
              height: 3px;
              width: 40%;
              background: var(--accent-color, #0088ff);
              border-radius: 3px;
              animation: moveUnderline 3s ease-in-out infinite;
            }
            
            @keyframes moveUnderline {
              0% { left: 0; width: 0; }
              25% { left: 0; width: 50%; }
              50% { left: 50%; width: 50%; }
              75% { left: 100%; width: 0; }
              100% { left: 0; width: 0; }
            }
          `;
          document.head.appendChild(style);
        }
      }
    }
  });