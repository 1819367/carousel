// ==========================
// 1. DOM SELECTORS & ARRAYS
// ==========================
const carousel = document.querySelector('.carousel')
const previousButton = carousel.querySelector('.previous-button')
const nextButton = carousel.querySelector('.next-button')
const contents = carousel.querySelector('.carousel__contents')
const slides = [...carousel.querySelectorAll('.carousel__slide')] 
const dotsContainer = createDots(slides)
carousel.appendChild(dotsContainer) //append dotsContainer to the the parent element
const dots = [...dotsContainer.children]


// ==========================
// 2. Functions
// ==========================

/**Create dots for the carousel
 * @returns The HTML for dots
 */
function createDots() {
  const dotsContainer = document.createElement('div')
  dotsContainer.classList.add('carousel__dots')

  slides.forEach(slide => {
    const dot = document.createElement('button')
    dot.classList.add('carousel__dot')

    if (slide.classList.contains('is-selected')) {
      dot.classList.add('is-selected')
    }
    dotsContainer.appendChild(dot)    
  })
  return dotsContainer //this lets us use dotsContainer anywhere we need to
}

/**
 * Set slide positions
 */
function setSlidePositions() {
  const slideWidth = slides[0].getBoundingClientRect().width
  slides.forEach((slide, index) => {
    slide.style.left = `${slideWidth * index}px` 
})
}
//Call the function
setSlidePositions()

/**
 * Switches slides
 * @params {number} currentSlideIndex
 * @params {number} targetSlideIndex
 */
function switchSlide(currentSlideIndex, targetSlideIndex) { //update the params
  const currentSlide = slides[currentSlideIndex] //find the current slide 
  const targetSlide = slides[targetSlideIndex] //find the target slide
  const destination = getComputedStyle(targetSlide).left
  
  contents.style.transform = `translateX(-${destination})` 
  currentSlide.classList.remove('is-selected')
  targetSlide.classList.add('is-selected')
}

/**
 * Highlights selected dots
 * @params {number} currentDotIndex
 * @params {number} targetDotIndex
 */
function highlightDot(currentSlideIndex, targetSlideIndex) {
  const currentDot = dots[currentSlideIndex]
  const targetDot = dots[targetSlideIndex]

  currentDot.classList.remove('is-selected')
  targetDot.classList.add('is-selected')
}

/**
 * Show and hide arrow buttons
 * @param {number} targetsSlideIndex
 */
function showHideArrowButtons (targetSlideIndex) {
   if (targetSlideIndex === 0) {
    previousButton.setAttribute('hidden', true)
    nextButton.removeAttribute('hidden') 
  } else if (targetSlideIndex === dots.length - 1) {
    previousButton.removeAttribute('hidden')
    nextButton.setAttribute('hidden', true)
  } else {
    previousButton.removeAttribute('hidden')
    nextButton.removeAttribute('hidden')
  }
}

/**
 * Gets the current slide index
 * @returns {number}
 */
function getCurrentSlideIndex () {
  const currentSlide = contents.querySelector('.is-selected')
  return slides.findIndex(slide => slide === currentSlide)
}

// ==========================
// 3. ARROW BUTTON EVENT HANDLERS
// ==========================

// make the next button clickable
nextButton.addEventListener('click', e => {
  const currentSlideIndex = getCurrentSlideIndex()
  const nextSlideIndex = currentSlideIndex + 1 //find nextSlideIndex using currentSlideIndex

  const currentDot = dotsContainer.querySelector('.is-selected') 
  const nextDot = currentDot.nextElementSibling 

  switchSlide(currentSlideIndex, nextSlideIndex)
  highlightDot(currentSlideIndex, nextSlideIndex)
  showHideArrowButtons(nextSlideIndex)
})

//make the previous button clickable
previousButton.addEventListener('click', e => {
  const currentSlideIndex = getCurrentSlideIndex()
  const previousSlideIndex = currentSlideIndex -1
 
  switchSlide(currentSlideIndex, previousSlideIndex)
  highlightDot(currentSlideIndex, previousSlideIndex)
  showHideArrowButtons(previousSlideIndex)
})

// ==========================
// 4. DOTS EVENT HANDLER
// ==========================

dotsContainer.addEventListener('click', event => {
  const dot = event.target.closest('button')
  if (!dot) return 

  // Show Slide
  const currentSlideIndex = getCurrentSlideIndex()
  const targetSlideIndex = dots.findIndex(d => d === dot);

  switchSlide(currentSlideIndex, targetSlideIndex)
  highlightDot(currentSlideIndex, targetSlideIndex)
  showHideArrowButtons(targetSlideIndex)
})