// FAQ message functions only
function showFaqMessage(message) {
  const messageElement = document.getElementById('faq-message');
  messageElement.textContent = message;
  messageElement.style.display = 'block';
  
  // Hide message after 5 seconds
  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 5000);
}

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

// Collection Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterLinks = document.querySelectorAll('.filter-collection');
  
  filterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const collection = this.getAttribute('data-collection');
      filterScents(collection);
      
      // Update active state
      filterLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  function filterScents(collection) {
    const allScents = document.querySelectorAll('[data-collection]');
    
    allScents.forEach(scent => {
      if (collection === 'all' || scent.getAttribute('data-collection') === collection) {
        scent.style.display = 'block';
      } else {
        scent.style.display = 'none';
      }
    });
    
    // Update the URL without reloading
    history.pushState(null, null, `?collection=${collection}`);
  }
  
  // Check for collection parameter on page load
  const urlParams = new URLSearchParams(window.location.search);
  const initialCollection = urlParams.get('collection') || 'all';
  
  // Set initial filter
  filterScents(initialCollection);
  
  // Set active state for initial collection
  document.querySelector(`.filter-collection[data-collection="${initialCollection}"]`)?.classList.add('active');
});


// Collection Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterLinks = document.querySelectorAll('.filter-collection');
  
  filterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const collection = this.getAttribute('data-collection');
      filterScents(collection);
      
      // Update active state
      filterLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  function filterScents(collection) {
    const allScents = document.querySelectorAll('[data-collection]');
    const topContent = document.getElementById('top-content');
    
    // Show/hide top content based on selection
    if (collection === 'all') {
      topContent.style.display = 'block';
    } else {
      topContent.style.display = 'none';
    }
    
    // Filter scent cards
    allScents.forEach(scent => {
      if (collection === 'all' || scent.getAttribute('data-collection') === collection) {
        scent.style.display = 'block';
      } else {
        scent.style.display = 'none';
      }
    });
    
    // Update the URL without reloading
    history.pushState(null, null, `?collection=${collection}`);
  }
  
  // Check for collection parameter on page load
  const urlParams = new URLSearchParams(window.location.search);
  const initialCollection = urlParams.get('collection') || 'all';
  
  // Set initial filter
  filterScents(initialCollection);
  
  // Set active state for initial collection
  document.querySelector(`.filter-collection[data-collection="${initialCollection}"]`)?.classList.add('active');
});