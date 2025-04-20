/**
 * Advanced Search System
 * Searches across all website content including pages, services, projects and blog posts
 */

// Log when script loads for debugging
console.log('Search script loaded');

class AdvancedSearch {
  constructor() {
    this.searchData = null;
    this.searchIndex = {};
    this.isLoading = false;
    this.initialized = false;
    
    // DOM Elements
    this.searchTrigger = document.querySelector('.search-trigger');
    this.searchOverlay = document.querySelector('.search-overlay');
    
    // Check if elements exist before proceeding
    if (!this.searchTrigger || !this.searchOverlay) {
      console.error('Search elements not found in DOM. Initialization aborted.');
      return; // Early exit if elements don't exist
    }
    
    this.searchClose = document.querySelector('.search-close');
    this.searchInput = document.getElementById('search-input');
    this.searchClear = document.getElementById('search-clear');
    this.searchResults = document.getElementById('search-results');
    this.searchStats = document.getElementById('search-stats');
    
    // Cache Elements
    this.emptyState = document.querySelector('.search-empty-state');
    
    // Make sure we have all required elements
    if (!this.searchClose || !this.searchInput || !this.searchClear || 
        !this.searchResults || !this.searchStats || !this.emptyState) {
      console.error('Some search elements are missing. Please check HTML structure.');
      return;
    }
    
    this.noResults = document.createElement('div');
    this.noResults.className = 'search-no-results';
    this.noResults.innerHTML = '<i class="fas fa-search-minus"></i><p>No results found. Try different keywords.</p>';
    this.searchResults.appendChild(this.noResults);
    
    this.loadingEl = document.createElement('div');
    this.loadingEl.className = 'search-loading';
    this.loadingEl.innerHTML = '<div class="spinner"></div>';
    this.searchResults.appendChild(this.loadingEl);
    
    // Related results section
    this.relatedSection = document.createElement('div');
    this.relatedSection.className = 'related-results-section';
    this.relatedSection.innerHTML = '<h3>Related Content</h3><div class="related-results-container"></div>';
    this.relatedSection.style.display = 'none';
    this.searchResults.appendChild(this.relatedSection);
    this.relatedContainer = this.relatedSection.querySelector('.related-results-container');
    
    // Bind methods
    this.init = this.init.bind(this);
    this.loadSearchData = this.loadSearchData.bind(this);
    this.buildSearchIndex = this.buildSearchIndex.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.renderRelatedContent = this.renderRelatedContent.bind(this);
    this.handleEscKey = this.handleEscKey.bind(this);
    
    // Initialize
    this.init();
  }
  
  async init() {
    console.log('Initializing search system');
    
    // Event listeners
    this.searchTrigger.addEventListener('click', this.toggleSearch);
    this.searchClose.addEventListener('click', this.closeSearch);
    this.searchInput.addEventListener('input', this.handleInput);
    this.searchClear.addEventListener('click', this.clearSearch);
    document.addEventListener('keydown', this.handleEscKey);
    
    // Load search data (from cache if available)
    await this.loadSearchData();
    
    this.initialized = true;
    console.log('Search system initialization complete');
  }
  
  async loadSearchData() {
    console.log('Loading search data');
    
    // Check if we have cached data
    const cachedData = localStorage.getItem('junaidSearchData');
    const cacheTimestamp = localStorage.getItem('junaidSearchTimestamp');
    const cacheAge = cacheTimestamp ? (Date.now() - parseInt(cacheTimestamp)) : null;
    
    // Use cache if less than 24 hours old
    if (cachedData && cacheAge && cacheAge < 24 * 60 * 60 * 1000) {
      try {
        this.searchData = JSON.parse(cachedData);
        this.buildSearchIndex();
        console.log('Using cached search data');
        return;
      } catch (e) {
        console.error('Failed to parse cached search data:', e);
        // Continue to fetch fresh data
      }
    }
    
    this.isLoading = true;
    
    try {
      // Our search data structure
      this.searchData = {
        pages: [
          {
            title: "Home",
            path: "/",
            url: "index.html",
            content: "Junaid Saeed is an audio engineering specialist offering AI voiceovers, AI avatars, and voice cloning services. Professional audio production and sound design for various projects.",
            category: "page",
            tags: ["audio", "engineering", "AI", "voiceover", "avatar", "voice", "cloning"]
          },
          {
            title: "About",
            path: "/about",
            url: "#about",
            content: "Learn about Junaid Saeed, an audio specialist with experience in professional sound engineering, AI voice synthesis, and multimedia production. Discover his skills and professional background.",
            category: "page",
            tags: ["about", "background", "experience", "skills", "audio", "specialist"]
          },
          {
            title: "Services",
            path: "/services",
            url: "#services",
            content: "Professional audio services including audio engineering, AI voiceovers, AI avatars, voice cloning, and full audio production. Quality sound solutions for all your projects.",
            category: "page",
            tags: ["services", "audio", "engineering", "voiceover", "avatar", "voice", "cloning", "production"]
          },
          {
            title: "Contact",
            path: "/contact",
            url: "#contact",
            content: "Get in touch with Junaid Saeed for inquiries about audio engineering, AI voice services, or project collaborations. Professional audio solutions for your needs.",
            category: "page",
            tags: ["contact", "email", "inquiry", "collaboration", "project"]
          }
        ],
        services: [
          {
            title: "Audio Engineering",
            path: "/services/audio-engineering",
            url: "#services",
            content: "Professional audio engineering services including mixing, mastering, and sound design. Get professional sound quality for your music, podcasts, videos, and more. Studio-quality results for all projects.",
            category: "service",
            tags: ["audio", "engineering", "mixing", "mastering", "sound", "design", "music", "podcast", "studio"]
          },
          {
            title: "AI Voiceovers",
            path: "/services/ai-voiceovers",
            url: "#services",
            content: "Natural-sounding AI voiceovers for commercials, explainer videos, e-learning, and more. Modern voice synthesis technology with natural intonation and clear pronunciation.",
            category: "service",
            tags: ["AI", "voiceover", "voice", "commercial", "explainer", "video", "e-learning", "synthesis", "narration"]
          },
          {
            title: "AI Talking Avatars",
            path: "/services/ai-avatars",
            url: "#services",
            content: "Custom AI talking avatars for businesses, educational content, and marketing materials. Engaging visual presentations with synchronized lip movements and natural expressions.",
            category: "service",
            tags: ["AI", "avatar", "talking", "business", "education", "marketing", "presentation", "lip sync", "virtual"]
          },
          {
            title: "Voice Cloning",
            path: "/services/voice-cloning",
            url: "#services",
            content: "Create a digital replica of your voice or choose from a library of premium voice options. Use your cloned voice for consistent branding across all audio content.",
            category: "service",
            tags: ["voice", "cloning", "replica", "digital", "branding", "audio", "premium"]
          },
          {
            title: "Audio Production",
            path: "/services/audio-production",
            url: "#services",
            content: "Full-service audio production including recording, editing, and post-production. Studio-quality results for music, podcasts, audiobooks, and multimedia projects.",
            category: "service",
            tags: ["audio", "production", "recording", "editing", "post-production", "studio", "music", "podcast", "audiobook"]
          }
        ],
        projects: [
          {
            title: "Professional Podcast Production",
            path: "/projects/audio-engineering",
            url: "projects/audio-engineering.html",
            content: "Full podcast production including recording, editing, mixing, and mastering. Professional equipment and studio setup for optimal sound quality.",
            category: "project",
            tags: ["podcast", "production", "recording", "editing", "mixing", "mastering", "studio", "audio", "equipment"]
          },
          {
            title: "Corporate Explainer Video Voiceover",
            path: "/projects/ai-voice",
            url: "projects/ai-voice.html",
            content: "AI-generated voiceover for corporate explainer videos with natural intonation and professional delivery. Clear and engaging narration tailored to brand voice.",
            category: "project",
            tags: ["AI", "voice", "voiceover", "corporate", "explainer", "video", "narration", "brand", "professional"]
          },
          {
            title: "Educational AI Avatar",
            path: "/projects/ai-avatar",
            url: "projects/ai-avatar.html",
            content: "Custom AI avatar for educational content with synchronized lip movements and natural expressions. Engaging visual presentation for enhanced learning experience.",
            category: "project",
            tags: ["AI", "avatar", "educational", "lip sync", "expression", "learning", "visual", "presentation"]
          }
        ],
        blog: [
          {
            title: "Mastering Techniques for Professional Audio Production",
            path: "/blog/mastering-techniques-audio-production",
            url: "blog/mastering-techniques-audio-production.html",
            content: "Learn professional mastering techniques for audio production, including EQ, compression, limiting, and stereo enhancement. Achieve studio-quality sound for your music and audio projects.",
            category: "blog",
            tags: ["mastering", "audio", "production", "EQ", "compression", "limiting", "stereo", "enhancement", "music", "studio"]
          },
          {
            title: "How to Create Natural-Sounding AI Voiceovers in 2023",
            path: "/blog/natural-ai-voiceovers-guide",
            url: "blog/natural-ai-voiceovers-guide.html",
            content: "Discover the latest techniques for creating natural-sounding AI voiceovers using modern tools and technology. Tips for realistic intonation, pacing, and emotional delivery.",
            category: "blog",
            tags: ["AI", "voiceover", "natural", "tools", "technology", "intonation", "pacing", "delivery", "voice"]
          }
        ]
      };
      
      // Additionally, let's crawl the page to find more content
      this.crawlPageContent();
      
      // Store in localStorage
      localStorage.setItem('junaidSearchData', JSON.stringify(this.searchData));
      localStorage.setItem('junaidSearchTimestamp', Date.now().toString());
      
      // Build search index
      this.buildSearchIndex();
      console.log('Fresh search data loaded');
    } catch (error) {
      console.error('Error loading search data:', error);
    } finally {
      this.isLoading = false;
    }
  }
  
  crawlPageContent() {
    // Get all text content from the page
    try {
      console.log('Crawling page content');
      // Only crawl if we're on the page
      if (document.body) {
        // Get all headings
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
          const section = heading.closest('section');
          if (section && section.id) {
            // Create a page entry for each section with an ID
            const content = section.textContent.slice(0, 300).trim();
            
            this.searchData.pages.push({
              title: heading.textContent.trim(),
              path: `/${section.id}`,
              url: `#${section.id}`,
              content: content,
              category: "page",
              tags: [section.id, "section", heading.textContent.toLowerCase().trim()]
            });
          }
        });
        
        // Add any known blog URLs that might not be in the current page
        const knownBlogUrls = [
          {
            title: "Mastering Techniques for Professional Audio Production",
            path: "/blog/mastering-techniques-audio-production",
            url: "blog/mastering-techniques-audio-production.html",
            content: "Learn professional mastering techniques for audio production, including EQ, compression, limiting, and stereo enhancement. Achieve studio-quality sound for your music and audio projects.",
            category: "blog",
            tags: ["mastering", "audio", "production", "EQ", "compression", "limiting", "stereo", "enhancement", "music", "studio"]
          },
          {
            title: "How to Create Natural-Sounding AI Voiceovers in 2023",
            path: "/blog/natural-ai-voiceovers-guide",
            url: "blog/natural-ai-voiceovers-guide.html",
            content: "Discover the latest techniques for creating natural-sounding AI voiceovers using modern tools and technology. Tips for realistic intonation, pacing, and emotional delivery.",
            category: "blog",
            tags: ["AI", "voiceover", "natural", "tools", "technology", "intonation", "pacing", "delivery", "voice"]
          }
        ];
        
        // Check if these are already in our data, if not add them
        knownBlogUrls.forEach(blog => {
          const exists = this.searchData.blog.some(item => item.url === blog.url);
          if (!exists) {
            this.searchData.blog.push(blog);
          }
        });
      }
    } catch (error) {
      console.error('Error crawling page content:', error);
    }
  }
  
  buildSearchIndex() {
    console.log('Building search index');
    // Reset index
    this.searchIndex = {};
    
    // Function to index a single item
    const indexItem = (item) => {
      // First, process the direct content
      const words = `${item.title} ${item.content}`.toLowerCase().split(/\s+/);
      
      // Also add tags to the words to be indexed
      if (item.tags && Array.isArray(item.tags)) {
        words.push(...item.tags.map(tag => tag.toLowerCase()));
      }
      
      // Create a set to avoid duplicates
      const uniqueWords = new Set(words);
      
      uniqueWords.forEach(word => {
        // Skip very short words and common words
        if (word.length <= 1 || ['the', 'and', 'for', 'with', 'is', 'in', 'to', 'of', 'a'].includes(word)) {
          return;
        }
        
        // Clean the word (remove punctuation)
        word = word.replace(/[^\w]/g, '');
        
        if (!word) return;
        
        if (!this.searchIndex[word]) {
          this.searchIndex[word] = [];
        }
        
        // Avoid duplicates in the index for this word
        if (!this.searchIndex[word].some(indexedItem => indexedItem.url === item.url)) {
          this.searchIndex[word].push(item);
        }
      });
    };
    
    // Index all content types
    ['pages', 'services', 'projects', 'blog'].forEach(type => {
      if (this.searchData[type]) {
        this.searchData[type].forEach(indexItem);
      }
    });
    
    console.log('Search index built with words:', Object.keys(this.searchIndex).length);
  }
  
  toggleSearch() {
    console.log('Toggle search overlay');
    this.searchOverlay.classList.add('active');
    setTimeout(() => {
      this.searchInput.focus();
    }, 300);
    
    // Add body class to prevent scrolling
    document.body.classList.add('search-active');
  }
  
  closeSearch() {
    console.log('Close search overlay');
    this.searchOverlay.classList.remove('active');
    
    // Remove body class
    document.body.classList.remove('search-active');
    
    // Clear search
    setTimeout(() => {
      this.clearSearch();
    }, 300);
  }
  
  handleInput() {
    const query = this.searchInput.value.trim();
    
    // Show/hide clear button
    if (query.length > 0) {
      this.searchClear.classList.add('visible');
    } else {
      this.searchClear.classList.remove('visible');
    }
    
    // Process even single character for better responsiveness
    if (query.length >= 1) {
      this.performSearch(query);
    } else {
      // Reset to empty state
      this.emptyState.style.display = 'flex';
      this.noResults.style.display = 'none';
      this.relatedSection.style.display = 'none';
      this.searchStats.textContent = '';
      
      // Clear existing results
      const results = this.searchResults.querySelectorAll('.search-result-item:not(.related-result)');
      results.forEach(result => result.remove());
      
      // Clear related results
      this.relatedContainer.innerHTML = '';
    }
  }
  
  clearSearch() {
    this.searchInput.value = '';
    this.searchClear.classList.remove('visible');
    
    // Reset to empty state
    this.emptyState.style.display = 'flex';
    this.noResults.style.display = 'none';
    this.relatedSection.style.display = 'none';
    this.searchStats.textContent = '';
    
    // Clear existing results
    const results = this.searchResults.querySelectorAll('.search-result-item:not(.related-result)');
    results.forEach(result => result.remove());
    
    // Clear related results
    this.relatedContainer.innerHTML = '';
  }
  
  performSearch(query) {
    console.log('Performing search for:', query);
    
    if (!this.initialized || this.isLoading) {
      this.emptyState.style.display = 'none';
      this.noResults.style.display = 'none';
      this.relatedSection.style.display = 'none';
      this.loadingEl.style.display = 'flex';
      return;
    }
    
    // Hide empty state and loading
    this.emptyState.style.display = 'none';
    this.loadingEl.style.display = 'none';
    
    // Clear existing results
    const existingResults = this.searchResults.querySelectorAll('.search-result-item:not(.related-result)');
    existingResults.forEach(result => result.remove());
    
    // Search logic
    const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    let results = [];
    let scoring = {};
    
    queryWords.forEach(word => {
      // Process every word, no matter how short
      const matchingItems = this.searchIndex[word] || [];
      
      matchingItems.forEach(item => {
        // Use URL as unique identifier
        const id = item.url;
        
        if (!scoring[id]) {
          scoring[id] = {
            item: item,
            score: 0,
            matched: new Set()
          };
        }
        
        // Scoring algorithm
        let score = 0;
        
        // Title match is worth more
        if (item.title.toLowerCase().includes(word)) {
          score += 10;
          
          // Exact title match worth even more
          if (item.title.toLowerCase() === word) {
            score += 20;
          }
        }
        
        // Content match
        if (item.content.toLowerCase().includes(word)) {
          score += 5;
        }
        
        // Tag match is valuable
        if (item.tags && item.tags.some(tag => tag.toLowerCase() === word)) {
          score += 15;
        }
        
        // Boost certain categories
        if (item.category === 'blog') score *= 1.2; // Prioritize blog content
        if (item.category === 'service') score *= 1.1; // Then services
        if (item.category === 'project') score *= 1.15; // Projects are important too
        
        scoring[id].score += score;
        scoring[id].matched.add(word);
      });
    });
    
    console.log('Raw scoring results:', Object.keys(scoring).length);
    
    // For single-character queries, be more aggressive about showing relevant content
    if (query.length === 1) {
      // Convert all items to results
      results = Object.values(scoring);
    }
    // For multi-word queries
    else if (queryWords.length > 1) {
      // First pass: include items matching all words
      const perfectMatches = Object.values(scoring).filter(item => 
        item.matched.size === queryWords.length
      );
      
      // If we have perfect matches, use only those
      if (perfectMatches.length > 0) {
        results = perfectMatches;
      } else {
        // Otherwise, include those that match at least one word
        results = Object.values(scoring);
      }
    } else {
      // For single word queries, include all matches
      results = Object.values(scoring);
    }
    
    // Sort by score
    results.sort((a, b) => b.score - a.score);
    
    // Get top 10 results
    const topResults = results.slice(0, 10).map(r => r.item);
    
    // Get related content (projects and blogs specifically)
    const relatedContent = this.getRelatedContent(query, results.map(r => r.item));
    
    console.log('Processed search results:', topResults.length);
    console.log('Related content items:', relatedContent.length);
    
    // Render results
    this.renderResults(topResults, query);
    
    // Render related content if we have any
    if (relatedContent.length > 0) {
      this.renderRelatedContent(relatedContent, query);
    } else {
      this.relatedSection.style.display = 'none';
    }
  }
  
  getRelatedContent(query, mainResults) {
    // Focus on getting related projects and blogs
    const projectsAndBlogs = [];
    const mainResultUrls = new Set(mainResults.map(item => item.url));
    
    // Split the query into words
    const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    
    // Get all related projects and blogs from our data
    ['projects', 'blog'].forEach(type => {
      if (this.searchData[type]) {
        this.searchData[type].forEach(item => {
          // Skip if this item is already in the main results
          if (mainResultUrls.has(item.url)) return;
          
          // Check if the item's tags, title, or content contain any of the query words
          const isRelated = queryWords.some(word => {
            // Check tags first
            if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(word))) {
              return true;
            }
            
            // Check title and content
            if (item.title.toLowerCase().includes(word) || 
                item.content.toLowerCase().includes(word)) {
              return true;
            }
            
            return false;
          });
          
          if (isRelated) {
            projectsAndBlogs.push(item);
          }
        });
      }
    });
    
    // Additionally, try to find semantically related content
    // These are common related terms in the audio/AI domain
    const relatedTerms = {
      'audio': ['sound', 'recording', 'podcast', 'music', 'voice', 'mixing', 'mastering'],
      'voice': ['speech', 'audio', 'speaking', 'voiceover', 'narration', 'vocal'],
      'ai': ['artificial intelligence', 'machine learning', 'automated', 'synthesis', 'neural'],
      'voiceover': ['narration', 'voice', 'speaking', 'audio', 'recording'],
      'avatar': ['character', 'virtual', 'digital', 'talking', 'animation'],
      'production': ['recording', 'studio', 'editing', 'mixing', 'mastering']
    };
    
    // Check if any query word has related terms
    queryWords.forEach(word => {
      if (relatedTerms[word]) {
        // Find content related to these terms
        relatedTerms[word].forEach(relatedTerm => {
          ['projects', 'blog'].forEach(type => {
            if (this.searchData[type]) {
              this.searchData[type].forEach(item => {
                // Skip if already included
                if (mainResultUrls.has(item.url) || 
                    projectsAndBlogs.some(p => p.url === item.url)) {
                  return;
                }
                
                // Check if related to this term
                if ((item.tags && item.tags.some(tag => tag.toLowerCase().includes(relatedTerm))) ||
                     item.title.toLowerCase().includes(relatedTerm) || 
                     item.content.toLowerCase().includes(relatedTerm)) {
                  projectsAndBlogs.push(item);
                }
              });
            }
          });
        });
      }
    });
    
    // Remove duplicates and limit to 6 related items
    const uniqueRelated = [];
    const seenUrls = new Set();
    
    projectsAndBlogs.forEach(item => {
      if (!seenUrls.has(item.url)) {
        uniqueRelated.push(item);
        seenUrls.add(item.url);
      }
    });
    
    return uniqueRelated.slice(0, 6);
  }
  
  renderResults(results, query) {
    // Show no results message if needed
    if (results.length === 0) {
      this.noResults.style.display = 'block';
      this.searchStats.textContent = 'No results found';
      return;
    }
    
    // Hide no results message
    this.noResults.style.display = 'none';
    
    // Update stats
    this.searchStats.textContent = `Found ${results.length} result${results.length === 1 ? '' : 's'}`;
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Function to highlight matching text
    const highlightText = (text, query) => {
      const words = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
      let highlightedText = text;
      
      words.forEach(word => {
        // Use case-insensitive regex to find all occurrences
        const regex = new RegExp(`(${word})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="search-highlight">$1</span>');
      });
      
      return highlightedText;
    };
    
    // Helper function to get icon based on category
    const getCategoryIcon = (category) => {
      switch (category) {
        case 'page':
          return 'fas fa-file';
        case 'service':
          return 'fas fa-cogs';
        case 'project':
          return 'fas fa-briefcase';
        case 'blog':
          return 'fas fa-newspaper';
        default:
          return 'fas fa-file';
      }
    };
    
    // Helper to get color based on category
    const getCategoryColor = (category) => {
      switch (category) {
        case 'page':
          return '#F97316'; // Orange
        case 'service':
          return '#10B981'; // Green
        case 'project':
          return '#3B82F6'; // Blue
        case 'blog':
          return '#EC4899'; // Pink
        default:
          return '#F97316'; // Default orange
      }
    };
    
    console.log('Rendering results to DOM');
    
    // Render each result
    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-result-item';
      
      // Create a snippet from content
      let snippet = result.content;
      
      // If query is in content, center snippet around it
      const queryPos = result.content.toLowerCase().indexOf(query.toLowerCase());
      if (queryPos > 30) {
        const start = Math.max(0, queryPos - 30);
        const end = Math.min(result.content.length, queryPos + 100);
        snippet = '...' + result.content.substring(start, end) + '...';
      }
      
      // Highlight the query in the title and snippet
      const highlightedTitle = highlightText(result.title, query);
      const highlightedSnippet = highlightText(snippet, query);
      
      // Get icon and color
      const icon = getCategoryIcon(result.category);
      const categoryColor = getCategoryColor(result.category);
      
      resultItem.innerHTML = `
        <div class="search-result-icon" style="background-color: ${categoryColor}20; color: ${categoryColor};">
          <i class="${icon}"></i>
        </div>
        <div class="search-result-content">
          <div class="search-result-title">${highlightedTitle}</div>
          <div class="search-result-path">${result.path}</div>
          <div class="search-result-snippet">${highlightedSnippet}</div>
          <div class="search-result-category category-${result.category}">${result.category}</div>
        </div>
      `;
      
      // Click handler to navigate to the result
      resultItem.addEventListener('click', () => {
        // Open in new tab
        window.open(result.url, '_blank');
        
        // Close search overlay
        this.closeSearch();
      });
      
      fragment.appendChild(resultItem);
    });
    
    // Append all results at once
    this.searchResults.appendChild(fragment);
  }
  
  renderRelatedContent(relatedItems, query) {
    // Clear existing related content
    this.relatedContainer.innerHTML = '';
    
    // Create document fragment
    const fragment = document.createDocumentFragment();
    
    // Helper function to get icon and color based on category
    const getCategoryIcon = (category) => {
      switch (category) {
        case 'project':
          return 'fas fa-briefcase';
        case 'blog':
          return 'fas fa-newspaper';
        default:
          return 'fas fa-file';
      }
    };
    
    const getCategoryColor = (category) => {
      switch (category) {
        case 'project':
          return '#3B82F6'; // Blue
        case 'blog':
          return '#EC4899'; // Pink
        default:
          return '#F97316'; // Default orange
      }
    };
    
    // Render each related item
    relatedItems.forEach(item => {
      const relatedItem = document.createElement('div');
      relatedItem.className = 'search-result-item related-result';
      
      const icon = getCategoryIcon(item.category);
      const categoryColor = getCategoryColor(item.category);
      
      relatedItem.innerHTML = `
        <div class="search-result-icon" style="background-color: ${categoryColor}20; color: ${categoryColor};">
          <i class="${icon}"></i>
        </div>
        <div class="search-result-content">
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-category category-${item.category}">${item.category}</div>
        </div>
      `;
      
      // Click handler
      relatedItem.addEventListener('click', () => {
        window.open(item.url, '_blank');
        this.closeSearch();
      });
      
      fragment.appendChild(relatedItem);
    });
    
    // Add to related container
    this.relatedContainer.appendChild(fragment);
    
    // Show the related section
    this.relatedSection.style.display = 'block';
  }
  
  handleEscKey(e) {
    if (e.key === 'Escape' && this.searchOverlay.classList.contains('active')) {
      this.closeSearch();
    }
    
    // Admin shortcut to reindex: Shift + Ctrl + I
    if (e.shiftKey && e.ctrlKey && e.key === 'I') {
      // Clear cache and reload
      localStorage.removeItem('junaidSearchData');
      localStorage.removeItem('junaidSearchTimestamp');
      this.loadSearchData().then(() => {
        console.log('Search data reindexed successfully');
        alert('Search index rebuilt successfully!');
      });
    }
  }
}

// Initialize search when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing search');
  
  // Add a small delay to ensure all elements are rendered
  setTimeout(() => {
    try {
      const searchSystem = new AdvancedSearch();
      
      // Add to window for debugging
      window.junaidSearch = searchSystem;
      
      // Log success message
      console.log('Search system initialized successfully');
    } catch (error) {
      console.error('Error initializing search system:', error);
    }
  }, 500);
});