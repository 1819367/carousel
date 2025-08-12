// ==========================
// 1. DOM SELECTORS & ARRAYS
// ==========================
const carousel = document.querySelector('.carousel')
const previousButton = carousel.querySelector('.previous-button')
const nextButton = carousel.querySelector('.next-button')
const contents = carousel.querySelector('.carousel__contents')
const dotsContainer = carousel.querySelector('.carousel__dots')
const dots = [...carousel.querySelectorAll('.carousel__dot')] 
const slides = [...carousel.querySelectorAll('.carousel__slide')] 

// ==========================
// 2. Functions
// ==========================
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
 * @params {HTMLElement} currentSlide
 * @params {HTMLElement} targetSlide
 */
function switchSlide(currentSlide, targetSlide) {
  const destination = getComputedStyle(targetSlide).left
  contents.style.transform = `translateX(-${destination})` 
  currentSlide.classList.remove('is-selected')
  targetSlide.classList.add('is-selected')
}

/**
 * Highlights selected dots
 * @params {HTMLElement} currentDot
 * @params {HTMLElement} targetDot
 */
function highlightDot(currentDot, targetDot) {
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

// ==========================
// 3. ARROW BUTTON EVENT HANDLERS
// ==========================

// make the next button clickable
nextButton.addEventListener('click', e => {
  const currentSlide = contents.querySelector('.is-selected')
  const nextSlide = currentSlide.nextElementSibling
  const nextSlideIndex = slides.findIndex((slide => slide === nextSlide))
  const currentDot = dotsContainer.querySelector('.is-selected')
  const nextDot = currentDot.nextElementSibling
  
  switchSlide(currentSlide, nextSlide)
  highlightDot(currentDot, nextDot)
  showHideArrowButtons(nextSlideIndex)
})

//make the previous button clickable
previousButton.addEventListener('click', e => {
  const currentSlide = contents.querySelector('.is-selected')
  const previousSlide = currentSlide.previousElementSibling
  const previousSlideIndex = slides.findIndex((slide => slide === previousSlide))
  const currentDot = dotsContainer.querySelector('.is-selected')
  const previousDot = currentDot.previousElementSibling
 

  switchSlide(currentSlide, previousSlide)
  highlightDot(currentDot, previousDot)
  showHideArrowButtons(previousSlideIndex)
})

// ==========================
// 4. DOTS EVENT HANDLER
// ==========================

dotsContainer.addEventListener('click', event => {
  const dot = event.target.closest('button')
  if (!dot) return 

  // Show Slide
  const currentSlide = contents.querySelector('.is-selected') //find current slide
  const currentDots = dotsContainer.querySelector('.is-selected') //find the current dot
  const clickedDotIndex = dots.findIndex(d => d === dot);
  const slideToShow = slides[clickedDotIndex]

  switchSlide(currentSlide, slideToShow)
  highlightDot(currentDots, dot)
  showHideArrowButtons(clickedDotIndex)
})