/**
 * JS Favicon Generator
 * Creates an animated favicon with "JS" text and loading animation
 * For Junaid Saeed's portfolio
 */

// Initialize favicon when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create favicon instance
    const jsFavicon = new JSFavicon();
    jsFavicon.init();
  });
  
  class JSFavicon {
    constructor() {
      // Canvas configuration
      this.size = 32; // Standard favicon size
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = this.size;
      this.canvas.height = this.size;
      
      // Animation properties
      this.animationFrame = null;
      this.animationStartTime = null;
      this.animationDuration = 2000; // 2 seconds for full animation
      this.isAnimating = false;
      
      // Colors (blue-teal theme)
      this.colors = {
        primary: '#00a8cc',
        secondary: '#0dbda1',
        background: '#0f1f2c',
        highlight: '#00e5ff'
      };
      
      // Link element for favicon
      this.faviconLink = null;
    }
    
    init() {
      // Create or get existing favicon link
      this.faviconLink = document.querySelector('link[rel="icon"]');
      if (!this.faviconLink) {
        this.faviconLink = document.createElement('link');
        this.faviconLink.rel = 'icon';
        this.faviconLink.type = 'image/x-icon';
        document.head.appendChild(this.faviconLink);
      }
      
      // Create static favicon first
      this.drawStaticFavicon();
      
      // Then start animation
      this.startAnimation();
    }
    
    drawStaticFavicon() {
      const ctx = this.ctx;
      const size = this.size;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Draw background
      ctx.fillStyle = this.colors.background;
      ctx.fillRect(0, 0, size, size);
      
      // Draw "JS" text
      ctx.fillStyle = this.colors.primary;
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('JS', size/2, size/2);
      
      // Apply favicon
      this.updateFavicon();
    }
    
    drawAnimatedFavicon(progress) {
      const ctx = this.ctx;
      const size = this.size;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Draw background
      ctx.fillStyle = this.colors.background;
      ctx.fillRect(0, 0, size, size);
      
      // Calculate animation effects
      const angle = progress * Math.PI * 2;
      const scale = 0.8 + Math.sin(progress * Math.PI) * 0.2;
      const opacity = Math.min(1, progress * 2);
      
      // Draw loading circle
      ctx.strokeStyle = this.colors.secondary;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(size/2, size/2, size/2 - 4, 0, angle);
      ctx.stroke();
      
      // Save context for transformations
      ctx.save();
      
      // Apply scale transformation
      ctx.translate(size/2, size/2);
      ctx.scale(scale, scale);
      ctx.translate(-size/2, -size/2);
      
      // Create gradient for text
      const gradient = ctx.createLinearGradient(size/4, size/4, size*3/4, size*3/4);
      gradient.addColorStop(0, this.colors.primary);
      gradient.addColorStop(1, this.colors.secondary);
      
      // Draw "JS" text with gradient and glow
      ctx.globalAlpha = opacity;
      
      // Add glow effect
      if (progress > 0.5) {
        ctx.shadowColor = this.colors.highlight;
        ctx.shadowBlur = 8 * (progress - 0.5) * 2;
      }
      
      ctx.fillStyle = gradient;
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('JS', size/2, size/2);
      
      // Restore context
      ctx.restore();
      
      // Update favicon
      this.updateFavicon();
    }
    
    updateFavicon() {
      // Convert canvas to data URL and update favicon
      const faviconUrl = this.canvas.toDataURL('image/png');
      this.faviconLink.href = faviconUrl;
    }
    
    startAnimation() {
      this.isAnimating = true;
      this.animationStartTime = performance.now();
      this.animate();
    }
    
    animate(currentTime) {
      if (!this.isAnimating) return;
      
      if (!this.animationStartTime) {
        this.animationStartTime = currentTime;
      }
      
      // Calculate progress (0 to 1)
      const elapsed = currentTime - this.animationStartTime;
      let progress = elapsed / this.animationDuration;
      
      // Complete animation cycle
      if (progress >= 1) {
        progress = 1;
        this.isAnimating = false;
      }
      
      // Draw current animation frame
      this.drawAnimatedFavicon(progress);
      
      // Continue animation
      if (this.isAnimating) {
        this.animationFrame = requestAnimationFrame(this.animate.bind(this));
      }
    }
    
    // Call this when user switches to another tab and comes back
    restartAnimation() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
      this.startAnimation();
    }
  }
  
  // Optional: Restart animation when user returns to the page
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden && window.jsFavicon) {
      window.jsFavicon.restartAnimation();
    }
  });