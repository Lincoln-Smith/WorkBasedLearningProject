document.addEventListener('DOMContentLoaded', function() {
  // FAQ Message Handling
  let faqTimeout;
  window.showFaqMessage = function(message) {
    const messageElement = document.getElementById('faq-message');
    
    // Clear any existing timeout
    if (faqTimeout) clearTimeout(faqTimeout);
    
    // Update message content
    messageElement.textContent = message;
    
    // Add active class to trigger animation
    messageElement.classList.add('active');
    
    // Set timeout to remove active class
    faqTimeout = setTimeout(() => {
      messageElement.classList.remove('active');
    }, 5000);
  };

  // Collection Filter Functionality
  const filterLinks = document.querySelectorAll('.filter-collection');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
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
      window.location.href = 'shopscents.html';
      e.preventDefault();
    }
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
    
    if (collection === 'all') {
      topContent.style.display = 'block';
      collectionHeaders.style.display = 'none';
    } else {
      topContent.style.display = 'none';
      collectionHeaders.style.display = 'block';
      const headerId = `${collection}-header`;
      const headerElement = document.getElementById(headerId);
      if (headerElement) headerElement.style.display = 'block';
    }
    
    allScents.forEach(scent => {
      scent.style.display = (collection === 'all' || scent.getAttribute('data-collection') === collection) 
        ? 'block' 
        : 'none';
    });
    
    history.pushState(null, null, `?collection=${collection}`);
  }

  // Initialize collection filter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const initialCollection = urlParams.get('collection') || 'all';
  filterScents(initialCollection);
  document.querySelector(`.filter-collection[data-collection="${initialCollection}"]`)?.classList.add('active');

  // Product Page Loader
  if (window.location.pathname.includes('product.html')) {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('name');
    
    if (productName && products[productName]) {
      const product = products[productName];
      document.title = `Jersey Shore Candle - ${product.title}`;
      document.getElementById('product-title').textContent = product.title;
      document.getElementById('product-subtitle').textContent = product.subtitle;
      document.getElementById('product-description').textContent = product.description;
      document.getElementById('product-image').src = `img/${product.image}`;
    } else {
      window.location.href = 'shopscents.html';
    }
  }
});

const products = {
};