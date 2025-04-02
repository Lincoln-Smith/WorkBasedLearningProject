function loadVideo(el) {
    el.innerHTML = `<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
}

function showFaqMessage(message) {
    const messageElement = document.getElementById('faq-message');
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 5000);
  }
  
  // Optional: Close message when clicking anywhere
  document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('faq-item')) {
      document.getElementById('faq-message').style.display = 'none';
    }
  });

  let currentMessageTimeout = null;

function showFaqMessage(message) {
  const messageElement = document.getElementById('faq-message');
  
  // Clear any pending timeout
  if (currentMessageTimeout) {
    clearTimeout(currentMessageTimeout);
    currentMessageTimeout = null;
  }
  
  // If same message is clicked, just return
  if (messageElement.textContent === message && messageElement.style.display === 'block') {
    return;
  }
  
  // Start fade out if another message is showing
  if (messageElement.style.display === 'block') {
    messageElement.style.opacity = '0';
    
    // After fade out completes, change message and fade in
    setTimeout(() => {
      messageElement.textContent = message;
      messageElement.style.opacity = '1';
      
      // Set timeout to hide after 5 seconds
      currentMessageTimeout = setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
          messageElement.style.display = 'none';
        }, 300);
      }, 5000);
    }, 300);
  } 
  // If no message showing, just fade in
  else {
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    messageElement.style.opacity = '1';
    
    // Set timeout to hide after 5 seconds
    currentMessageTimeout = setTimeout(() => {
      messageElement.style.opacity = '0';
      setTimeout(() => {
        messageElement.style.display = 'none';
      }, 300);
    }, 5000);
  }
}

// Close message when clicking anywhere
document.addEventListener('click', function(e) {
  if (!e.target.classList.contains('faq-item')) {
    const messageElement = document.getElementById('faq-message');
    if (messageElement.style.display === 'block') {
      messageElement.style.opacity = '0';
      setTimeout(() => {
        messageElement.style.display = 'none';
      }, 300);
    }
  }
});