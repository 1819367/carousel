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
// 2. POSITION THE SLIDES
// ==========================
//find the width of one slide
const slideWidth = slides[0].getBoundingClientRect().width
slides.forEach((slide, index) => {
    slide.style.left = `${slideWidth * index}px` //update with template literal
})

// ==========================
// 3. BUTTON EVENT HANDLERS
// ==========================

// make the next button clickable
nextButton.addEventListener('click', e => {
  const currentSlide = contents.querySelector('.is-selected')
  const nextSlide = currentSlide.nextElementSibling
  const destination = getComputedStyle(nextSlide).left
  
  //Shows next slide
  contents.style.transform = `translateX(-${destination})` //update with template literal
  currentSlide.classList.remove('is-selected')
  nextSlide.classList.add('is-selected')

  // show previous button
  previousButton.removeAttribute('hidden')

  // hides next button
  if(!nextSlide.nextElementSibling) {
      nextButton.setAttribute('hidden', true)
  }

  //Highlight dot
  const currentDot = dotsContainer.querySelector('.is-selected')
  const nextDot = currentDot.nextElementSibling
  currentDot.classList.remove('is-selected')
  nextDot.classList.add('is-selected')
})

//make the previous button clickable
previousButton.addEventListener('click', e => {
  const currentSlide = contents.querySelector('.is-selected')
  const previousSlide = currentSlide.previousElementSibling
  const destination = getComputedStyle(previousSlide).left
  
  // shows previous slide
  contents.style.transform = `translateX(-${destination})` //update with template literal
  currentSlide.classList.remove('is-selected')
  previousSlide.classList.add('is-selected')

  // show the next button
  nextButton.removeAttribute('hidden')
  
  // hides previous button
  if(!previousSlide.previousElementSibling) {
      previousButton.setAttribute('hidden', true)
  }

  //Highlight dot
  const currentDot = dotsContainer.querySelector('.is-selected')
  const previousDot = currentDot.previousElementSibling
  currentDot.classList.remove('is-selected')
  previousDot.classList.add('is-selected')
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