let mCurrentIndex = 0 
let mImages = [] 
const mUrl = 'images.json' 
const mWaitTime = 5000
 // Timer interval in milliseconds

 $(document).ready(() => {
  $('.details').hide()

  setInterval(() => {
    showNextPhoto()
  }, mWaitTime)

  $('.moreIndicator').click(() => {
    $('.moreIndicator').toggleClass('rot90 rot270')
    $('.details').slideToggle()
  })

  $('#nextPhoto').click(() => {
    showNextPhoto()
  })

  $('#prevPhoto').click(() => {
    showPrevPhoto()
  })
  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON () {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: (data) => {
      mImages = data.images
      swapPhoto() 
      startTimer()
    }
  })
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  if (mImages.length > 0) {
    const currentImage = mImages[mCurrentIndex];
    $('#photo').attr('src', currentImage.imgPath);
    $('.location').text(`From: ${currentImage.imgLocation}`);
    $('.description').text(`Description: ${currentImage.description}`);
    $('.birthday').text(`Birthday: ${currentImage.birthday}`);
  }
}


function showNextPhoto () {
  mCurrentIndex = (mCurrentIndex + 1) % mImages.length
  swapPhoto()
}

function showPrevPhoto () {
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length
  swapPhoto()
}

// Starter code for the timer function
function startTimer () {
  setInterval(() => {
    mCurrentIndex = (mCurrentIndex + 1) % mImages.length 
    swapPhoto()
  }, mWaitTime)
}