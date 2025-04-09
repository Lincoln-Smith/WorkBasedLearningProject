// FAQ message functions (keep your existing ones)
let currentMessageTimeout = null;

function showFaqMessage(message) {
  const messageElement = document.getElementById('faq-message');
  // ... (keep your existing FAQ code) ...
}

// Collection Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterLinks = document.querySelectorAll('.filter-collection');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  // Track if we should navigate on next click
  let shouldNavigateNextClick = false;

  filterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const collection = this.getAttribute('data-collection');
      filterScents(collection);
      
      // Update active state
      filterLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // Set flag to navigate on next dropdown click
      shouldNavigateNextClick = true;
    });
  });

  // Handle dropdown toggle click
  dropdownToggle.addEventListener('click', function(e) {
    if (shouldNavigateNextClick) {
      // Navigate to shop scents page
      window.location.href = 'shopscents.html';
      e.preventDefault();
    }
    // Otherwise let Bootstrap handle the dropdown normally
  });

  // Reset flag when dropdown closes
  dropdownMenu.addEventListener('hidden.bs.dropdown', function() {
    shouldNavigateNextClick = false;
  });

  function filterScents(collection) {
    const allScents = document.querySelectorAll('[data-collection]');
    const topContent = document.getElementById('top-content');
    const collectionHeaders = document.getElementById('collection-headers');
    
    // Hide all headers first
    document.querySelectorAll('.collection-header').forEach(header => {
      header.style.display = 'none';
    });
    
    // Show/hide content based on selection
    if (collection === 'all') {
      topContent.style.display = 'block';
      collectionHeaders.style.display = 'none';
    } else {
      topContent.style.display = 'none';
      collectionHeaders.style.display = 'block';
      // Show the specific collection header
      const headerId = `${collection}-header`;
      const headerElement = document.getElementById(headerId);
      if (headerElement) {
        headerElement.style.display = 'block';
      }
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