/**
 * Junaid Saeed - Audio & AI Specialist Portfolio
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
  
    // Preloader
    setTimeout(function() {
      document.querySelector('.preloader').style.opacity = '0';
      setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
      }, 500);
    }, 4000); // Show for 4 seconds
  
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
  
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        if (mobileMenu.classList.contains('active')) {
          mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    }
  
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.querySelector('.back-to-top');
  
    window.addEventListener('scroll', function() {
      // Navbar scroll class
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      // Back to top button visibility
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
      
      // Active nav link based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let scrollPosition = window.scrollY;
  
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
        } else {
          document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
        }
      });
    });
  
    // Back to top button
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
    // Fixed: Theme toggle - proper class name & functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    let isDarkMode = true; // Default to dark mode
    
    if (themeToggle) {
      // Check if user has a saved preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
        if (!isDarkMode) {
          body.classList.add('light-mode');
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
      }
      
      themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
          body.classList.remove('light-mode');
          themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
          localStorage.setItem('theme', 'dark');
        } else {
          body.classList.add('light-mode');
          themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
          localStorage.setItem('theme', 'light');
        }
      });
    }
  
    // Services Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
  
    if (tabBtns.length > 0) {
      tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // Remove active class from all buttons
          tabBtns.forEach(b => b.classList.remove('active'));
          // Add active class to clicked button
          this.classList.add('active');
          
          // Hide all tab panes
          tabPanes.forEach(pane => pane.classList.remove('active'));
          
          // Show selected tab pane
          const tabId = this.getAttribute('data-tab') + '-tab';
          document.getElementById(tabId).classList.add('active');
        });
      });
    }
  
    // Projects Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
  
    if (filterBtns.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // Remove active class from all buttons
          filterBtns.forEach(b => b.classList.remove('active'));
          // Add active class to clicked button
          this.classList.add('active');
          
          const filterValue = this.getAttribute('data-filter');
          
          // Filter projects
          projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
              card.style.display = 'block';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 10);
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
    }
  
    // Testimonials Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
  
    if (testimonialSlider && testimonials.length > 0) {
      // Initialize slider
      showTestimonial(currentIndex);
      
      // Previous arrow click
      if (prevArrow) {
        prevArrow.addEventListener('click', function() {
          currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
          showTestimonial(currentIndex);
        });
      }
      
      // Next arrow click
      if (nextArrow) {
        nextArrow.addEventListener('click', function() {
          currentIndex = (currentIndex + 1) % testimonials.length;
          showTestimonial(currentIndex);
        });
      }
      
      // Dot clicks
      if (dots.length > 0) {
        dots.forEach((dot, index) => {
          dot.addEventListener('click', function() {
            currentIndex = index;
            showTestimonial(currentIndex);
          });
        });
      }
      
      // Auto slide
      let slideInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
      }, 5000);
      
      // Pause auto slide on hover
      testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
      });
      
      testimonialSlider.addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
          currentIndex = (currentIndex + 1) % testimonials.length;
          showTestimonial(currentIndex);
        }, 5000);
      });
      
      // Function to show testimonial
      function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
          testimonial.style.display = 'none';
        });
        
        // Show selected testimonial
        testimonials[index].style.display = 'block';
        
        // Update active dot
        dots.forEach((dot, i) => {
          if (i === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    }
    
    // Copy email functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    if (copyButtons.length > 0) {
      copyButtons.forEach(button => {
        button.addEventListener('click', function() {
          const email = this.getAttribute('data-email');
          navigator.clipboard.writeText(email).then(() => {
            // Change button text temporarily
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            // Return to original text after 2 seconds
            setTimeout(() => {
              this.innerHTML = originalText;
            }, 2000);
          });
        });
      });
    }
    
    // Initialize VanillaTilt for cards
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll(".contact-card, .pricing-card"), {
        max: 15,
        speed: 300,
        glare: true,
        "max-glare": 0.5,
      });
    }
    
    // Current Year
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
      const currentYear = new Date().getFullYear();
      yearElements.forEach(el => {
        el.textContent = currentYear;
      });
    }
    
    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      
      // Register ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);
      
      // Hero animations
      gsap.from(".hero-headings .greeting", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out"
      });
      
      gsap.from(".hero-headings .name", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
      });
      
      gsap.from(".hero-headings .profession", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out"
      });
      
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out"
      });
      
      gsap.from(".hero-cta", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out"
      });
      
      gsap.from(".hero-image-container", {
        opacity: 0,
        x: 100,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
      });
      
      // Sound wave animation
      gsap.from(".waveform-overlay", {
        opacity: 0,
        duration: 1.5,
        delay: 1,
        ease: "power3.inOut"
      });
      
      // Scroll animations
      
      // About section
      gsap.from(".about-image", {
        opacity: 0,
        x: -100,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%"
        }
      });
      
      gsap.from(".about-text", {
        opacity: 0,
        x: 100,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%"
        }
      });
      
      // Skills section
      gsap.from(".skills-category", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 80%"
        }
      });
      
      // Projects section
      gsap.from(".project-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 80%"
        }
      });
      
      // Services section
      gsap.from(".tabs-nav", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 80%"
        }
      });
      
      gsap.from(".pricing-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 70%"
        }
      });
      
      // Testimonials section
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 80%"
        }
      });
      
      // Contact section
      gsap.from(".contact-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%"
        }
      });
      
      // Footer animations
      gsap.from(".footer-content > div", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 90%"
        }
      });
    }
    
    // Audio wave animation with gsap (if no svg available)
    const generateWavePoints = (numberOfPoints) => {
      let points = [];
      for (let i = 0; i < numberOfPoints; i++) {
        const height = Math.random() * 20 + 5;
        points.push(height);
      }
      return points;
    };
    
    const waveforms = document.querySelectorAll('.audio-waveform');
    if (waveforms.length > 0 && typeof gsap !== 'undefined') {
      waveforms.forEach(waveform => {
        if (!waveform.querySelector('svg')) {
          waveform.innerHTML = '';
          const numberOfBars = 40;
          
          for (let i = 0; i < numberOfBars; i++) {
            const bar = document.createElement('div');
            bar.className = 'waveform-bar';
            bar.style.height = Math.random() * 20 + 5 + 'px';
            bar.style.width = '2px';
            bar.style.background = 'var(--primary-color)';
            bar.style.borderRadius = '1px';
            bar.style.opacity = '0.6';
            bar.style.margin = '0 1px';
            waveform.appendChild(bar);
          }
          
          gsap.to('.waveform-bar', {
            height: () => Math.random() * 20 + 5,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
              each: 0.1,
              from: "random",
              repeat: -1
            }
          });
        }
      });
    }
});