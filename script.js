// Global cart functions
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  
  document.querySelectorAll('#cart-count').forEach(element => {
      element.textContent = count;
  });
  
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) checkoutBtn.disabled = count === 0;
}

document.addEventListener('DOMContentLoaded', function() {
  // FAQ Message Handling
  let faqTimeout;
  window.showFaqMessage = function(message) {
      const messageElement = document.getElementById('faq-message');
      if (faqTimeout) clearTimeout(faqTimeout);
      messageElement.textContent = message;
      messageElement.classList.add('active');
      faqTimeout = setTimeout(() => messageElement.classList.remove('active'), 5000);
  };

  // Collection Filter Functionality
  const filterLinks = document.querySelectorAll('.filter-collection');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  let shouldNavigateNextClick = false;

  filterLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const collection = this.dataset.collection;
          filterScents(collection);
          filterLinks.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
          shouldNavigateNextClick = true;
      });
  });

  dropdownToggle.addEventListener('click', function(e) {
      if (shouldNavigateNextClick) {
          window.location.href = 'shopscents.html';
          e.preventDefault();
      }
  });

  dropdownMenu.addEventListener('hidden.bs.dropdown', () => shouldNavigateNextClick = false);

  // Initialize collection filter
  const urlParams = new URLSearchParams(window.location.search);
  filterScents(urlParams.get('collection') || 'all');
  document.querySelector(`.filter-collection[data-collection="${urlParams.get('collection')}"]`)?.classList.add('active');

  // Initialize cart count
  updateCartCount();
});

function filterScents(collection) {
  const allScents = document.querySelectorAll('[data-collection]');
  const topContent = document.getElementById('top-content');
  const collectionHeaders = document.getElementById('collection-headers');
  
  document.querySelectorAll('.collection-header').forEach(header => header.style.display = 'none');
  
  if (collection === 'all') {
      topContent.style.display = 'block';
      collectionHeaders.style.display = 'none';
  } else {
      topContent.style.display = 'none';
      collectionHeaders.style.display = 'block';
      document.getElementById(`${collection}-header`).style.display = 'block';
  }
  
  allScents.forEach(scent => {
      scent.style.display = (collection === 'all' || scent.dataset.collection === collection) ? 'block' : 'none';
  });
  
  history.pushState(null, null, `?collection=${collection}`);
}