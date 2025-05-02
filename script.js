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

// Cart functionality for product pages
document.addEventListener('DOMContentLoaded', function() {
  // Add to cart button functionality
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      // Get product details from data attributes
      const title = this.dataset.title;
      const price = parseFloat(this.dataset.price);
      
      // Get selected size from dropdown (on product page)
      const sizeSelect = document.getElementById('sizeSelect');
      let size = '16 oz Decorative Lid'; // default
      if (sizeSelect) {
        size = sizeSelect.options[sizeSelect.selectedIndex].text;
      }
      
      // Get product image (on product page)
      let image = '';
      const mainImage = document.getElementById('mainProductImage');
      if (mainImage && mainImage.src) {
        image = mainImage.src;
      } else {
        // Fallback image if not on product page
        image = 'img/oneAndOne.webp';
      }
      
      // Get or initialize cart from localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Check if item already exists in cart
      const existingItemIndex = cart.findIndex(item => 
        item.title === title && item.size === size
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += 1;
      } else {
        // Add new item to cart
        cart.push({
          title: title,
          price: price,
          size: size,
          image: image,
          quantity: 1
        });
      }
      
      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update cart count in navbar
      updateCartCount();
      
      // Show confirmation
      alert('Item added to cart!');
    });
  });
  
  // Function to update cart count in navbar
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
  }
  
  // Initialize cart count on page load
  updateCartCount();
});

document.addEventListener('DOMContentLoaded', function() {
  // PRODUCT PAGE AUTOLOAD
  const params = new URLSearchParams(window.location.search);
  if(params.has('title')) {
      // Set text content
      document.getElementById('product-title').textContent = decodeURIComponent(params.get('title'));
      document.getElementById('product-subtitle').textContent = decodeURIComponent(params.get('subtitle'));
      document.getElementById('product-description').textContent = decodeURIComponent(params.get('description'));
      
      // Set main product image
      document.getElementById('mainProductImage').src = `img/${params.get('image')}`;
      document.title = `${decodeURIComponent(params.get('title'))} | Jersey Shore Candle`;
  }

  // Add to cart functionality for product page
  document.getElementById('addToCart')?.addEventListener('click', function() {
    const title = document.getElementById('product-title').textContent;
    const sizeSelect = document.getElementById('sizeSelect');
    const selectedSize = sizeSelect.options[sizeSelect.selectedIndex].text;
    const price = parseFloat(sizeSelect.value);
    const image = document.getElementById('mainProductImage').src;
    
    // Get or initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
      item.title === title && item.size === selectedSize
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      cart.push({
        title: `${title} - ${selectedSize}`,
        price: price,
        size: selectedSize,
        image: image,
        quantity: 1
      });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in navbar
    updateCartCount();
    
    // Show confirmation
    alert(`${title} (${selectedSize}) has been added to your cart!`);
  });

  // Function to update cart count in navbar
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = count;
    }
  }

  // Initialize cart count on page load
  updateCartCount();

  // FAQ MESSAGES
  let messageTimeout;
  window.showFaqMessage = function(message) {
      clearTimeout(messageTimeout);
      const faqMessage = document.getElementById('faq-message');
      faqMessage.textContent = message;
      faqMessage.style.display = 'block';
      messageTimeout = setTimeout(() => faqMessage.style.display = 'none', 5000);
  };
});