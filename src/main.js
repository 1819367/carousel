// ==========================
// 1. DOM SELECTORS & ARRAYS
// ==========================
const carousel = document.querySelector('.carousel')
// select the buttons in the carousel section
const previousButton = carousel.querySelector('.previous-button')
const nextButton = carousel.querySelector('.next-button')
// select the carousel contents
const contents = carousel.querySelector('.carousel__contents')
//select the dots container to update the dots state
const dotsContainer = carousel.querySelector('.carousel__dots')
//select the dots, create an array of dots
const dots = Array.from(carousel.querySelectorAll('.carousel__dot'))
// find the slide on the dom
const slides = Array.from(carousel.querySelectorAll('.carousel__slide'))

// ==========================
// 2. POSITION THE SLIDES
// ==========================
//find the width of one slide
const slideWidth = slides[0].getBoundingClientRect().width
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px'
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
    contents.style.transform = 'translateX(-' + destination + ')'
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
    contents.style.transform = 'translateX(-' + destination + ')'
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
  if (dot) {
    let clickedDotIndex

    for (let index = 0; index < dots.length; index++) {
      if (dots[index] === dot) {
        clickedDotIndex = index
      }
    }

    // Show slide
    const slideToShow = slides[clickedDotIndex]
    const destination = getComputedStyle(slideToShow).left

    contents.style.left = '-' + destination
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
  }
})