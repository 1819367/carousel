// ==========================
// 1. DOM SELECTORS & ARRAYS
// ==========================
const carousel = document.querySelector('.carousel')
const previousButton = carousel.querySelector('.previous-button')
const nextButton = carousel.querySelector('.next-button')
const contents = carousel.querySelector('.carousel__contents')
const dotsContainer = carousel.querySelector('.carousel__dots')
const dots = [...carousel.querySelectorAll('.carousel__dot')]  //use arry spread
const slides = [...carousel.querySelectorAll('.carousel__slide')] //use array spread

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

// ==========================
// 3. BUTTON EVENT HANDLERS
// ==========================

// make the next button clickable
nextButton.addEventListener('click', e => {
  const currentSlide = contents.querySelector('.is-selected')
  const nextSlide = currentSlide.nextElementSibling
  const currentDot = dotsContainer.querySelector('.is-selected')
  const nextDot = currentDot.nextElementSibling
  
  switchSlide(currentSlide, nextSlide)
  highlightDot(currentDot, nextDot)

  // show previous button
  previousButton.removeAttribute('hidden')

  // hides next button
  if(!nextSlide.nextElementSibling) {
      nextButton.setAttribute('hidden', true)
  }
})

//make the previous button clickable
previousButton.addEventListener('click', e => {
  const currentSlide = contents.querySelector('.is-selected')
  const previousSlide = currentSlide.previousElementSibling
  const currentDot = dotsContainer.querySelector('.is-selected')
  const previousDot = currentDot.previousElementSibling

  switchSlide(currentSlide, previousSlide)
  highlightDot(currentDot, previousDot)

  // show the next button
  nextButton.removeAttribute('hidden')
  
  // hides previous button
  if(!previousSlide.previousElementSibling) {
      previousButton.setAttribute('hidden', true)
  }
})

// ==========================
// 4. DOTS EVENT HANDLER
// ==========================

dotsContainer.addEventListener('click', event => {
  const dot = event.target.closest('button')
  if (!dot) return //use early return

  // Use findIndex directly and only once:
  const clickedDotIndex = dots.findIndex(d => d === dot);

  // Show slide
  const slideToShow = slides[clickedDotIndex]
  const destination = getComputedStyle(slideToShow).left

  contents.style.transform = `translateX(-${destination})`  //update with transform & template literals
  slides.forEach(slide => { slide.classList.remove('is-selected') })
  slideToShow.classList.add('is-selected')

  // Highlight dot
  dots.forEach(d => { d.classList.remove('is-selected') })
  dot.classList.add('is-selected')

  // Show / hide buttons
  if (clickedDotIndex === 0) {
    previousButton.setAttribute('hidden', true)
    nextButton.removeAttribute('hidden')
  } else if (clickedDotIndex === dots.length - 1) {
    previousButton.removeAttribute('hidden')
    nextButton.setAttribute('hidden', true)
  } else {
    previousButton.removeAttribute('hidden')
    nextButton.removeAttribute('hidden')
  }
})