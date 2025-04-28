// Add this to your script.js file
function showFaqMessage(message) {
  const messageElement = document.getElementById('faq-message');
  
  // Clear any existing timeout to prevent quick messages from disappearing
  if (currentMessageTimeout) {
    clearTimeout(currentMessageTimeout);
  }
  
  // Display the message
  messageElement.textContent = message;
  messageElement.style.display = 'block';
  
  // Hide the message after 5 seconds
  currentMessageTimeout = setTimeout(() => {
    messageElement.style.display = 'none';
    currentMessageTimeout = null;
  }, 5000);
}

let currentMessageTimeout = null;

function showFaqMessage(message) {
  const messageElement = document.getElementById('faq-message');
  
  // Clear any existing timeout to prevent quick messages from disappearing
  if (currentMessageTimeout) {
    clearTimeout(currentMessageTimeout);
  }
  
  // Display the message
  messageElement.textContent = message;
  messageElement.style.display = 'block';
  messageElement.style.opacity = '1';
  
  // Hide the message after 5 seconds
  currentMessageTimeout = setTimeout(() => {
    messageElement.style.opacity = '0';
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 300); // Match this with your CSS transition time
    currentMessageTimeout = null;
  }, 5000);
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

// Add this at the BOTTOM of your existing script.js
// Product Database
const products = {
  'Salted-Caramel': {
    title: 'Salted Caramel',
    subtitle: 'A divine combination of caramelized sugar & pure vanilla',
    description: 'A wonderfully divine combination of caramelized sugar & pure vanilla with bottom notes of fresh coconut will fill your home with sweet memories.',
    image: 'saltedCaramel.avif'
  },
  // Add other products using this pattern:
  /*
  'UNIQUE-NAME': {
    title: 'Product Name',
    subtitle: 'Short Description',
    description: 'Full description text',
    image: 'filename.avif'
  },
  */
};

// Product Page Loader
function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const productName = params.get('name');
  
  if (products[productName]) {
    const product = products[productName];
    document.title = `Jersey Shore Candle - ${product.title}`;
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-subtitle').textContent = product.subtitle;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-image').src = `img/${product.image}`;
  }
}

// Initialize product page
if (window.location.pathname.includes('product.html')) {
  loadProduct();
}

const products = {
  // Iconic Jersey Shore Scents
  'Boardwalk': {
    title: 'Boardwalk',
    subtitle: 'The perfect blend of Boardwalk favorites',
    description: 'Experience the nostalgic aroma of the iconic Jersey Shore boardwalk with this captivating blend of sweet treats, salty sea air, and summer memories. A timeless fragrance that evokes the joy of carefree beach days.',
    image: 'boardwalk.avif'
  },
  'Ocean-Breeze': {
    title: 'Ocean Breeze',
    subtitle: 'A reminiscent scent of beach memories',
    description: 'Capture the essence of coastal living with this refreshing blend of salty sea air, fresh linen, and subtle citrus notes. Perfect for creating a calm, relaxing atmosphere in any space.',
    image: 'oceanBreeze.avif'
  },
  'Twisted-Creamsicle': {
    title: 'Twisted Creamsicle',
    subtitle: 'Classic frozen treat transformed',
    description: 'A playful blend of creamy vanilla and bright orange zest that recreates the beloved summer treat. This sweet yet refreshing scent will transport you to sunny days on the boardwalk.',
    image: 'twistedCream.avif'
  },
  'Funnel-Cake': {
    title: 'Funnel Cake',
    subtitle: 'Fairground favorite in candle form',
    description: 'Indulge in the warm, sugary aroma of fresh funnel cakes dusted with powdered sugar. This comforting scent features notes of fried dough, vanilla, and a hint of cinnamon.',
    image: 'funnelCake.avif'
  },
  'Beach-House': {
    title: 'Beach House',
    subtitle: 'Coastal living captured',
    description: 'A sophisticated blend of sea salt, fresh linen, and driftwood with subtle hints of coconut and citrus. Evokes the serenity of a seaside retreat.',
    image: 'beachHouse.avif'
  },
  'Salt-Water-Taffy': {
    title: 'Salt Water Taffy',
    subtitle: 'Classic shore sweetness',
    description: 'A sweet and playful mix of vanilla sugar, ripe berries, and a touch of sea salt. Reminiscent of freshly pulled taffy from your favorite boardwalk shop.',
    image: 'saltWaterTaffy.avif'
  },

  // Culinary Best Sellers
  'Salted-Caramel': {
    title: 'Salted Caramel',
    subtitle: 'Sweet & salty perfection',
    description: 'A luxurious blend of golden caramel, Himalayan sea salt, and Madagascar vanilla. Features bottom notes of toasted coconut for added depth and warmth.',
    image: 'saltedCaramel.avif'
  },
  'Sugar-Cookie': {
    title: 'Sugar Cookie',
    subtitle: 'Fresh-baked goodness',
    description: 'The essence of holiday baking with notes of buttercream, vanilla bean, and almond extract. A comforting scent that feels like a warm hug from grandma\'s kitchen.',
    image: 'sugarCookie.avif'
  },
  'Warm-Vanilla': {
    title: 'Warm Vanilla',
    subtitle: 'Pure vanilla essence',
    description: 'A sophisticated take on classic vanilla with layers of tonka bean, creamy musk, and a touch of amber. Simple yet deeply comforting.',
    image: 'warmVanilla.avif'
  },

  // Herbal Blends
  'Lemongrass-Sage': {
    title: 'Lemongrass Sage',
    subtitle: 'Citrus herbal freshness',
    description: 'An invigorating blend of bright lemongrass, earthy sage, and subtle green tea notes. Creates a spa-like atmosphere