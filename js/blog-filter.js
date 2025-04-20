/**
 * Blog Filter Script
 * Handles filtering of blog posts by category
 */

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Add click event to filter buttons
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get selected filter
        const filter = this.getAttribute('data-filter');
        
        // Filter blog cards
        filterBlogCards(filter);
      });
    });
    
    // Filter function
    function filterBlogCards(filter) {
      blogCards.forEach(card => {
        // First add fade-out to all cards
        card.classList.add('fade-out');
        
        // After animation completes, hide cards that don't match filter
        setTimeout(() => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
          
          // Remove fade-out after a short delay to animate cards back in
          setTimeout(() => {
            if (!card.classList.contains('hidden')) {
              card.classList.remove('fade-out');
            }
          }, 50);
        }, 300);
      });
    }
    
    // Back to top button functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });