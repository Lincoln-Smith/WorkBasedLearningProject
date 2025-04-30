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
// script.js
// Product Database
const products = {
  // Iconic Jersey Shore Scents
  'Boardwalk': {
    title: 'Boardwalk',
    subtitle: 'The perfect blend of Boardwalk favorites',
    description: 'Experience the nostalgic aroma of the iconic Jersey Shore boardwalk with this captivating blend of sweet treats, salty sea air, and summer memories.',
    image: 'boardwalk.avif'
  },
  'Ocean-Breeze': {
    title: 'Ocean Breeze',
    subtitle: 'A reminiscent scent of beach memories',
    description: 'Capture the essence of coastal living with this refreshing blend of salty sea air, fresh linen, and subtle citrus notes.',
    image: 'oceanBreeze.avif'
  },
  'Twisted-Creamsicle': {
    title: 'Twisted Creamsicle',
    subtitle: 'Fill your home with the scent of an ice cream Shore favorite',
    description: 'A playful blend of creamy vanilla and bright orange zest that recreates the beloved summer treat.',
    image: 'twistedCream.avif'
  },
  'Funnel-Cake': {
    title: 'Funnel Cake',
    subtitle: 'Fill your home with the warm aroma of funnel cake',
    description: 'Indulge in the warm, sugary aroma of fresh funnel cakes dusted with powdered sugar.',
    image: 'funnelCake.avif'
  },
  'Beach-House': {
    title: 'Beach House',
    subtitle: 'A refreshing scent of cool salt air and fresh citrus notes',
    description: 'A sophisticated blend of sea salt, fresh linen, and driftwood with subtle hints of coconut and citrus.',
    image: 'beachHouse.avif'
  },
  'Salt-Water-Taffy': {
    title: 'Salt Water Taffy',
    subtitle: 'The perfect blend of sweet vanilla sugar, fruits & berries',
    description: 'A sweet and playful mix of vanilla sugar, ripe berries, and a touch of sea salt.',
    image: 'saltWaterTaffy.avif'
  },

  // Culinary Best Sellers
  'Salted-Caramel': {
    title: 'Salted Caramel',
    subtitle: 'A divine combination of caramelized sugar & pure vanilla',
    description: 'A luxurious blend of golden caramel, Himalayan sea salt, and Madagascar vanilla.',
    image: 'saltedCaramel.avif'
  },
  'Sugar-Cookie': {
    title: 'Sugar Cookie',
    subtitle: 'Vanilla bean, sugar, butter and rich nutty scents',
    description: 'The essence of holiday baking with notes of buttercream, vanilla bean, and almond extract.',
    image: 'sugarCookie.avif'
  },
  'Warm-Vanilla': {
    title: 'Warm Vanilla',
    subtitle: 'A true vanilla scent through and through!',
    description: 'A sophisticated take on classic vanilla with layers of tonka bean and creamy musk.',
    image: 'warmVanilla.avif'
  },

  // Herbal Blends
  'Lemongrass-Sage': {
    title: 'Lemongrass Sage',
    subtitle: 'Sparkling notes of citrus and lemongrass',
    description: 'An invigorating blend of bright lemongrass, earthy sage, and subtle green tea notes.',
    image: 'lemongrass.avif'
  },
  'Calming-Lavender': {
    title: 'Calming Lavender',
    subtitle: 'Let the aroma of lavender fields captivate your soul',
    description: 'A soothing combination of French lavender and herbal notes.',
    image: 'calmingLavender.avif'
  },

  // Winter
  'Home-For-Holidays': {
    title: 'Home For the Holidays',
    subtitle: 'Cheerful blend of cinnamon, apples and spices',
    description: 'A festive mix of cinnamon sticks, baked apples, and winter spices.',
    image: 'homeForTheHolidays.avif'
  },

  // Spring
  'Cherry-Blossom': {
    title: 'Cherry Blossom',
    subtitle: 'Floral essence of springtime blooms',
    description: 'Delicate fragrance of blooming cherry trees with hints of fresh greenery.',
    image: 'cherryBlossom.avif'
  },
  'Fresh-Linen': {
    title: 'Fresh Linen',
    subtitle: 'Breeze of fresh spring air',
    description: 'Crisp and clean scent reminiscent of sun-dried linens.',
    image: 'freshLinen.avif'
  },

  // Summer
  'Citronella': {
    title: 'Citronella',
    subtitle: 'Helps ward off mosquitoes',
    description: 'Fresh citrus scent with natural mosquito-repelling properties.',
    image: 'scentsOneOnOneAndOne.avif'
  },
  'Cucumber-Melon': {
    title: 'Cucumber Melon',
    subtitle: 'Fresh cucumbers and sweet melons',
    description: 'A refreshing combination of crisp cucumber and ripe honeydew.',
    image: 'cucumberMelon.avif'
  },
  'Peaches-Cream': {
    title: 'Peaches & Cream',
    subtitle: 'Sweet cream and fresh peaches',
    description: 'Juicy ripe peaches blended with sweet vanilla cream.',
    image: 'Peaches.avif'
  },

  // Fall
  'Pumpkin-Spice': {
    title: 'Pumpkin Spice',
    subtitle: 'Pumpkin blended with spices',
    description: 'Warm autumn spices blended with sweet pumpkin puree.',
    image: 'pumpkinSpice.avif'
  },
  'Baked-Apple-Pie': {
    title: 'Baked Apple Pie',
    subtitle: 'Warm apples, butter and spices',
    description: 'The comforting aroma of freshly baked apple pie.',
    image: 'bakedApplePie.avif'
  },
  'Cranberry-Chutney': {
    title: 'Cranberry Chutney',
    subtitle: 'Intriguing cranberry blend',
    description: 'Tart cranberries balanced with warm baking spices.',
    image: 'cranberry.avif'
  },

  // Jersey Strong
  'Jersey-Strong': {
    title: 'Jersey Strong',
    subtitle: 'Invigorating New Jersey pride',
    description: 'Bold fragrance representing New Jersey resilience and pride.',
    image: 'img/jerseyStrong.avif'
  }
};

/***** PRODUCT PAGE LOADER *****/
function loadProductPage() {
  if (!window.location.pathname.endsWith('product.html')) return;

  const params = new URLSearchParams(window.location.search);
  const productName = params.get('name');

  if (!productName || !products[productName]) {
    window.location.href = 'shopscents.html';
    return;
  }

  const product = products[productName];
  
  // Update page content
  document.title = `${product.title} | Jersey Shore Candle`;
  
  // Image handling
  const productImage = document.getElementById('product-image');
  productImage.src = `img/${product.image}`;
  productImage.alt = `${product.title} Candle`;
  
  // Text content
  document.getElementById('product-title').textContent = product.title;
  document.getElementById('product-subtitle').textContent = product.subtitle;
  document.getElementById('product-description').textContent = product.description;
  
  // Show confirmation
  document.getElementById('selection-confirmation').style.display = 'block';
}

/***** FAQ MESSAGE HANDLER *****/
let currentMessageTimeout = null;

function showFaqMessage(message) {
  const messageElement = document.getElementById('faq-message');
  
  if (currentMessageTimeout) {
    clearTimeout(currentMessageTimeout);
  }
  
  messageElement.textContent = message;
  messageElement.style.display = 'block';
  
  currentMessageTimeout = setTimeout(() => {
    messageElement.style.display = 'none';
    currentMessageTimeout = null;
  }, 5000);
}

/***** INITIALIZE PAGE *****/
document.addEventListener('DOMContentLoaded', function() {
  loadProductPage();
});

// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Product click handler
  document.querySelectorAll('.product-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const params = new URLSearchParams({
        title: this.dataset.title,
        subtitle: this.dataset.subtitle,
        description: this.dataset.description,
        image: this.dataset.image
      });
      window.location.href = `product.html?${params.toString()}`;
    });
  });

  // Product page loader
  if (window.location.pathname.includes('product.html')) {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('title')) {
      window.location.href = 'shopscents.html';
      return;
    }

    document.getElementById('product-title').textContent = params.get('title');
    document.getElementById('product-subtitle').textContent = params.get('subtitle');
    document.getElementById('product-description').textContent = params.get('description');
    document.getElementById('product-image').src = `img/${params.get('image')}`;
    document.title = `${params.get('title')} | Jersey Shore Candle`;
  }

  // FAQ handler
  let currentMessageTimeout = null;
  window.showFaqMessage = function(message) {
    const messageElement = document.getElementById('faq-message');
    if (currentMessageTimeout) clearTimeout(currentMessageTimeout);
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    currentMessageTimeout = setTimeout(() => {
      messageElement.style.display = 'none';
    }, 5000);
  };

  // Collection filtering
  const filterLinks = document.querySelectorAll('.filter-collection');
  filterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const collection = this.dataset.collection;
      // Implement your filtering logic here
    });
  });
});