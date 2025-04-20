/**
 * Junaid Bot - Intelligent chatbot for Junaid Saeed's portfolio website
 * Features: Voice input/output, smart responses, project and blog link sharing
 */

// Chatbot Data Structure
const chatbotData = {
  // Knowledge base about Junaid's skills and services
  skills: {
    'audio engineering': {
      description: 'Junaid specializes in professional audio engineering services including mixing, mastering, and sound design.',
      link: '#services',
      linkText: 'Audio Engineering Services'
    },
    'ai voiceover': {
      description: 'Junaid creates natural-sounding AI voiceovers for various projects using cutting-edge voice synthesis technology.',
      link: '#services',
      linkText: 'AI Voiceover Services',
      relatedBlog: 'blog/natural-ai-voiceovers-guide.html'
    },
    'ai avatar': {
      description: 'Custom AI talking avatars for businesses, educational content, and marketing materials.',
      link: '#services',
      linkText: 'AI Avatar Services'
    },
    'voice cloning': {
      description: 'Create a digital replica of your voice or choose from a library of premium voice options.',
      link: '#services',
      linkText: 'Voice Cloning Services'
    },
    'audio production': {
      description: 'Full-service audio production including recording, editing, and post-production.',
      link: '#services',
      linkText: 'Audio Production Services',
      relatedBlog: 'blog/mastering-techniques-audio-production.html'
    }
  },
  
  // Projects information
  projects: {
    'audio engineering': {
      description: 'Explore Junaid\'s audio engineering projects including studio recordings and live event mixes.',
      link: 'projects/audio-engineering.html',
      linkText: 'Audio Engineering Projects'
    },
    'ai voice': {
      description: 'Check out AI voice projects for commercials, explainer videos, and narration.',
      link: 'projects/ai-voice.html',
      linkText: 'AI Voice Projects'
    },
    'ai avatar': {
      description: 'View custom AI avatar projects for various clients and industries.',
      link: 'projects/ai-avatar.html',
      linkText: 'AI Avatar Projects'
    }
  },
  
  // Blog information
  blog: {
    'audio mastering': {
      description: 'Learn about professional audio mastering techniques and best practices.',
      link: 'blog/mastering-techniques-audio-production.html',
      linkText: 'Mastering Techniques for Professional Audio Production'
    },
    'ai voices': {
      description: 'Discover how to create natural-sounding AI voiceovers using modern tools and techniques.',
      link: 'blog/natural-ai-voiceovers-guide.html',
      linkText: 'How to Create Natural-Sounding AI Voiceovers in 2023'
    }
  },
  
  // Contact information
  contact: {
    description: 'Get in touch with Junaid for inquiries, quotes, or project discussions.',
    link: '#contact',
    linkText: 'Contact Junaid',
    email: 'junaid@example.com'
  },
  
  // General information about Junaid
  about: {
    description: 'Junaid Saeed is an audio specialist focusing on audio engineering, AI voice synthesis, and AI talking avatars.',
    link: '#about',
    linkText: 'Learn more about Junaid'
  },
  
  // Conversational responses
  conversations: {
    'how are you': [
      "I'm doing great, thanks for asking! I'm here to help you learn about Junaid's services. What can I assist you with today?",
      "I'm operating at 100% efficiency! Ready to help you discover Junaid's audio engineering and AI services. What would you like to know?",
      "I'm excellent! As Junaid's digital assistant, I'm always ready to share information about his amazing work. How can I help you?"
    ],
    'who made you': [
      "I was created by Junaid Saeed, an audio engineering and AI specialist. I'm here to help visitors learn about his services and expertise.",
      "Junaid Saeed developed me to assist visitors like you in learning about his audio engineering and AI services. He's quite talented with both technology and audio!",
      "I'm Junaid Bot, developed by Junaid Saeed himself to help showcase his audio engineering and AI services. He programmed me with knowledge about all his offerings."
    ],
    'who is your creator': [
      "Junaid Saeed is my creator. He's an audio engineering specialist who also works with AI voiceovers and avatars. Can I tell you more about his services?",
      "I was created by Junaid Saeed, an expert in audio engineering and AI voice technologies. He built me to help people learn about his services."
    ],
    'who is your ceo': [
      "Junaid Saeed is essentially my CEO! He created me and oversees all my operations. Would you like to learn more about his services?",
      "Junaid Saeed is my boss! He's an audio specialist who built me to help visitors like you. What would you like to know about his work?"
    ],
    'what can you do': [
      "I can provide information about Junaid's services including audio engineering, AI voiceovers, and AI avatars. I can also direct you to his blog posts, projects, and contact information. Just ask me what you'd like to know!",
      "I'm here to help you learn about Junaid's expertise in audio engineering and AI services. I can tell you about his skills, share links to his projects, and help you get in touch with him. What are you interested in?"
    ],
    'thank you': [
      "You're welcome! If you have any more questions about Junaid's services, feel free to ask.",
      "Happy to help! Don't hesitate to ask if you need more information about Junaid's audio engineering or AI services.",
      "My pleasure! I'm here anytime you need information about Junaid's work."
    ],
    'your name': [
      "I'm Junaid Bot, your virtual guide to Junaid Saeed's portfolio and services. How can I assist you today?",
      "My name is Junaid Bot. I'm here to help you learn about Junaid Saeed's audio engineering and AI services. What would you like to know?"
    ],
    'who are you': [
      "I'm Junaid Bot, a virtual assistant designed to help you navigate Junaid Saeed's portfolio and learn about his services. I can provide information about his audio engineering, AI voiceovers, and AI avatar services.",
      "I'm an AI assistant for Junaid Saeed's website. I'm here to provide information about his audio and AI services, direct you to his projects, and answer any questions you might have."
    ]
  },
  
  // Pricing information
  pricing: {
    description: "Junaid offers various pricing packages for different services. Would you like information about a specific service's pricing?",
    link: "#pricing",
    linkText: "View Pricing Packages"
  }
};

// Default responses
const defaultResponses = [
  "I'm Junaid Bot, here to help you learn about Junaid's audio and AI services. What would you like to know?",
  "I can help you with information about Junaid's skills, projects, or services. How can I assist you today?",
  "Hi there! I'm here to provide information about Junaid's work. Ask me about his audio engineering or AI services.",
  "Looking for information about Junaid's services? I'm here to help! What are you interested in learning more about?"
];

// Greeting messages
const greetings = ["hi", "hello", "hey", "greetings", "howdy", "hola", "salam", "assalamualaikum"];

// Initialize the chatbot when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Log loading status
  console.log('Initializing Junaid Bot...');
  
  // Get DOM elements
  const chatbotButton = document.querySelector('.chatbot-button');
  const chatbotBox = document.querySelector('.chatbot-box');
  const minimizeBtn = document.querySelector('.minimize-btn');
  const closeBtn = document.querySelector('.close-btn');
  const messagesContainer = document.querySelector('.chatbot-messages');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-message');
  const voiceBtn = document.querySelector('.voice-btn');
  const voiceInputBtn = document.getElementById('voice-input');
  
  // Check if elements exist
  if (!chatbotButton || !chatbotBox || !messagesContainer || !userInput || !sendBtn) {
    console.error('Critical chatbot elements missing. Check your HTML structure.');
    return;
  }
  
  console.log('Chatbot DOM elements loaded successfully');
  
  // Speech recognition setup
  let recognition = null;
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Default language
    console.log('Speech recognition initialized');
  } else {
    console.log('Speech recognition not supported in this browser');
  }
  
  // Speech synthesis setup
  const synth = window.speechSynthesis;
  let speaking = false;
  if (synth) {
    console.log('Speech synthesis initialized');
  } else {
    console.log('Speech synthesis not supported in this browser');
  }
  
  // Toggle chatbot visibility
  chatbotButton.addEventListener('click', () => {
    console.log('Chat button clicked');
    chatbotBox.classList.toggle('active');
    if (chatbotBox.classList.contains('active') && messagesContainer.children.length === 0) {
      // First time opening - send welcome message
      const welcomeMessage = "👋 Hello! I'm Junaid Bot, your virtual assistant for Junaid Saeed's website. I can help you learn about Junaid's services, skills, and projects. What would you like to know?";
      sendBotMessage(welcomeMessage);
      speakText(welcomeMessage.replace(/(<([^>]+)>)/gi, "")); // Strip HTML tags for speaking
    }
  });
  
  // Minimize chatbot
  minimizeBtn.addEventListener('click', () => {
    console.log('Minimize button clicked');
    chatbotBox.classList.remove('active');
    stopSpeaking();
  });
  
  // Close chatbot
  closeBtn.addEventListener('click', () => {
    console.log('Close button clicked');
    chatbotBox.classList.remove('active');
    stopSpeaking();
  });
  
  // Send message on button click
  sendBtn.addEventListener('click', () => {
    sendMessage();
  });
  
  // Send message on Enter key
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Voice input button click
  if (recognition && voiceInputBtn) {
    voiceInputBtn.addEventListener('click', () => {
      if (voiceInputBtn.classList.contains('listening')) {
        // Stop listening
        recognition.stop();
        voiceInputBtn.classList.remove('listening');
      } else {
        // Start listening
        recognition.start();
        voiceInputBtn.classList.add('listening');
        userInput.placeholder = "Listening...";
      }
    });
    
    // Handle speech recognition results
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Voice input:', transcript);
      userInput.value = transcript;
      voiceInputBtn.classList.remove('listening');
      userInput.placeholder = "Ask me anything about Junaid's services...";
      sendMessage();
    };
    
    recognition.onend = () => {
      voiceInputBtn.classList.remove('listening');
      userInput.placeholder = "Ask me anything about Junaid's services...";
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      voiceInputBtn.classList.remove('listening');
      userInput.placeholder = "Ask me anything about Junaid's services...";
    };
  } else if (voiceInputBtn) {
    // Hide voice button if not supported
    voiceInputBtn.style.display = 'none';
  }
  
  // Voice output button
  if (voiceBtn && synth) {
    voiceBtn.addEventListener('click', () => {
      // Toggle voice output by speaking the last bot message
      const lastBotMessage = document.querySelector('.bot-message:last-child');
      if (lastBotMessage) {
        const textToSpeak = lastBotMessage.textContent || lastBotMessage.innerText;
        speakText(textToSpeak);
      }
    });
  } else if (voiceBtn) {
    voiceBtn.style.display = 'none';
  }
  
  // Function to send user message
  function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    console.log('User message:', message);
    
    // Add user message to chat
    addUserMessage(message);
    
    // Clear input
    userInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process and respond after delay (simulating thinking time)
    setTimeout(() => {
      processUserMessage(message);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  }
  
  // Add user message to chat
  function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
  }
  
  // Add bot message to chat
  function sendBotMessage(message) {
    // Remove typing indicator if exists
    const typingIndicator = document.querySelector('.typing');
    if (typingIndicator) {
      typingIndicator.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    messageElement.innerHTML = message; // Using innerHTML to support links
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
    
    // Auto-speak if not initiated by voice button
    if (!speaking) {
      speakText(message.replace(/(<([^>]+)>)/gi, "")); // Strip HTML tags for speaking
    }
  }
  
  // Text-to-speech function
  function speakText(text) {
    if (synth && !speaking) {
      // Stop any current speech
      stopSpeaking();
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      
      // Show sound wave animation
      const lastBotMessage = document.querySelector('.bot-message:last-child');
      if (lastBotMessage) {
        const soundWave = document.createElement('div');
        soundWave.classList.add('sound-wave');
        soundWave.innerHTML = '<div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>';
        lastBotMessage.appendChild(soundWave);
      }
      
      // Speaking state
      speaking = true;
      
      // Events
      utterance.onend = () => {
        speaking = false;
        const soundWaves = document.querySelectorAll('.sound-wave');
        soundWaves.forEach(wave => wave.remove());
      };
      
      utterance.onerror = () => {
        speaking = false;
        const soundWaves = document.querySelectorAll('.sound-wave');
        soundWaves.forEach(wave => wave.remove());
      };
      
      // Speak
      synth.speak(utterance);
    }
  }
  
  // Stop speaking
  function stopSpeaking() {
    if (synth) {
      synth.cancel();
      speaking = false;
      const soundWaves = document.querySelectorAll('.sound-wave');
      soundWaves.forEach(wave => wave.remove());
    }
  }
  
  // Show typing indicator
  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.classList.add('typing');
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typing);
    scrollToBottom();
  }
  
  // Scroll chat to bottom
  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Process user message and generate response
  function processUserMessage(message) {
    message = message.toLowerCase();
    console.log('Processing message:', message);
    
    // Check conversational queries first
    for (const [key, responses] of Object.entries(chatbotData.conversations)) {
      if (message.includes(key)) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        sendBotMessage(randomResponse);
        return;
      }
    }
    
    // Check for greetings
    if (greetings.some(greeting => message.includes(greeting))) {
      sendBotMessage("👋 Hello! How can I help you today? I can tell you about Junaid's services, skills, or projects.");
      return;
    }
    
    // Check for questions about the bot itself
    if (message.includes("who are you") || message.includes("what are you")) {
      sendBotMessage("I'm Junaid Bot, a virtual assistant created by Junaid Saeed. I'm here to help you learn about Junaid's audio engineering and AI services. Feel free to ask me anything about his work!");
      return;
    }
    
    // Check for contact requests
    if (message.includes("contact") || message.includes("email") || message.includes("reach") || message.includes("get in touch")) {
      sendBotMessage(`You can contact Junaid through the <a href="${chatbotData.contact.link}" target="_blank">${chatbotData.contact.linkText}</a> section, or email directly at ${chatbotData.contact.email}.`);
      return;
    }
    
    // Check for about requests
    if (message.includes("about") || message.includes("who is") || message.includes("junaid background")) {
      sendBotMessage(`${chatbotData.about.description} Check out the <a href="${chatbotData.about.link}" target="_blank">${chatbotData.about.linkText}</a> section for more details.`);
      return;
    }
    
    // Check for blog requests
    if (message.includes("blog") || message.includes("article") || message.includes("read")) {
      let response = "Junaid has written several blog posts on audio and AI topics. Here are some you might like:";
      
      for (const [topic, data] of Object.entries(chatbotData.blog)) {
        response += `<br>• <a href="${data.link}" target="_blank">${data.linkText}</a>`;
      }
      
      sendBotMessage(response);
      return;
    }
    
    // Check for pricing inquiries
    if (message.includes("price") || message.includes("cost") || message.includes("rates") || message.includes("pricing") || message.includes("packages")) {
      sendBotMessage(`${chatbotData.pricing.description} You can view all pricing details at <a href="${chatbotData.pricing.link}" target="_blank">${chatbotData.pricing.linkText}</a>.`);
      return;
    }
    
    // Check for skills and services
    for (const [skill, data] of Object.entries(chatbotData.skills)) {
      if (message.includes(skill)) {
        let response = `${data.description} You can learn more at the <a href="${data.link}" target="_blank">${data.linkText}</a> page.`;
        
        // Add related blog if available
        if (data.relatedBlog) {
          response += `<br><br>You might also be interested in reading: <a href="${data.relatedBlog}" target="_blank">Related Blog Post</a>`;
        }
        
        sendBotMessage(response);
        return;
      }
    }
    
    // Check for projects
    if (message.includes("project") || message.includes("portfolio") || message.includes("work") || message.includes("showcase")) {
      let response = "Junaid has worked on various projects. Here are some categories:";
      
      for (const [project, data] of Object.entries(chatbotData.projects)) {
        response += `<br>• <a href="${data.link}" target="_blank">${data.linkText}</a>`;
      }
      
      sendBotMessage(response);
      return;
    }
    
    // Check for specific service inquiries
    if (message.includes("audio")) {
      sendBotMessage("Junaid offers comprehensive audio services including engineering, production, mixing, and mastering. His expertise ensures professional sound quality for all projects. Would you like to know about a specific audio service?");
      return;
    }
    
    if (message.includes("voice") || message.includes("voiceover")) {
      sendBotMessage("Junaid specializes in AI voiceovers and voice cloning services, creating natural-sounding voices for commercials, explainer videos, e-learning, and more. Would you like to see examples of his <a href='projects/ai-voice.html' target='_blank'>voice projects</a>?");
      return;
    }
    
    if (message.includes("avatar")) {
      sendBotMessage("Junaid creates custom AI talking avatars for businesses, educational content, and marketing materials. These avatars feature synchronized lip movements and natural expressions for engaging visual presentations. Check out his <a href='projects/ai-avatar.html' target='_blank'>avatar projects</a>.");
      return;
    }
    
    // If no specific match, provide a general response
    sendBotMessage(getRandomResponse());
  }
  
  // Get random default response
  function getRandomResponse() {
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
  
  console.log('Junaid Bot initialization complete');
});