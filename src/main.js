// select the carousel section
const carousel = document.querySelector('.carousel')
// select the buttons in the carousel section
const previousButton = carousel.querySelector('.previous-button')
const nextButton = carousel.querySelector('.next-button')
// select the carousel contents
const contents = carousel.querySelector('.carousel__contents')
//select the dots container to updat the dots state
const dotsContainer = carousel.querySelector('.carousel__dots')


// make the next button clickable
nextButton.addEventListener('click', e => {
    // select the current slide
    const currentSlide = contents.querySelector('.is-selected')
    // select the next slide
    const nextSlide = currentSlide.nextElementSibling
    // get the next slide's location
    const destination = getComputedStyle(nextSlide).left
    // use the destination value to set the left property
    contents.style.left = '-' + destination
    //remove is-selected from the current slide
    currentSlide.classList.remove('is-selected')
    //add is-selected to the next slide
    nextSlide.classList.add('is-selected')

    // show previous button
    previousButton.removeAttribute('hidden')

    // hides next button
    if(!nextSlide.nextElementSibling) {
        nextButton.setAttribute('hidden', true)
    }

    //update the dot state when clicking buttons
    //find the current dot
    const currentDot = dotsContainer.querySelector('.is-selected')
    //find the next dot
    const nextDot = currentDot.nextElementSibling
    //remove class is-selected from the current dot
    currentDot.classList.remove('is_selected')
    //add class is-selcted to the next dot
    nextDot.classList.add('is-selected')
})

//make the previous button clickable

previousButton.addEventListener('click', e => {
    //select the current slide
    const currentSlide = contents.querySelector('.is-selected')
    // get the previous slide
    const previousSlide = currentSlide.previousElementSibling
    // get the destination using getComputedStyle
    const destination = getComputedStyle(previousSlide).left
    // use the destination value to set the left property
    contents.style.left = '-' + destination
    //remove is-selcted from the current slide
     currentSlide.classList.remove('is-selected')
    //add is-selected to the next slide
    previousSlide.classList.add('is-selected')

    // show the previous button
    nextButton.removeAttribute('hidden')
    
    // hides previous button
    if(!previousSlide.previousElementSibling) {
        previousButton.setAttribute('hidden', true)
    }

    //update the dot state when clicking previous buttons
    //find the current dot
    const currentDot = dotsContainer.querySelector('.is-selected')
    //find the next dot
    const previousDot = currentDot.previousElementSibling
    //remove class is-selected from the current dot
    currentDot.classList.remove('is_selected')
    //add class is-selcted to the next dot
    previousDot.classList.add('is-selected')

})

// Dots
//select the dots, create an array of dots
const dots = Array.from(carousel.querySelectorAll('.carousel__dot'))
// find the slide on the dom
const slides = Array.from(carousel.querySelectorAll('.carousel__slide'))

// FIND THE DOT //
//  loop over the dots array
// Add an event listener to the dots
// find the clicked dot using dots[0] and if else statement => middle step
// loop through dots and check which dot was clicked dot using index, let clickedDotIndex
//
dots.forEach(dot => {
    dot.addEventListener('click', e => {
        // if (dots[0] === dot ) {
        //     console.log('clicked first dot')
        // } else {
        //     console.log('clicked another dot')
        // }
        let clickedDotIndex

        for (let index = 0; index < dots.length; index++) {
            if (dots[index] === dot)  {
                clickedDotIndex = index
            } 
        }
        // console.log(clickeddotindex)

        // find the slide using the index (i.e. clickedDotIndex)
        const slideToShow = slides[clickedDotIndex]
        // console.log(slideToShow)

        // get the slides position using getComputedStyle
        const destination = getComputedStyle(slideToShow).left
        // console.log(destination)

        // show the slide by changing the .carousel__content's left position
        contents.style.left = '-' + destination

        // update the location of is-selected, start by removing it from each slide by using a forEach loop
        slides.forEach(slide => slide.classList.remove('is-selected'))
        //add .is-selected to the slide to show
        slideToShow.classList.add('is-selected')

        //update the is-selected class on the dots
        dots.forEach(dot => dot.classList.remove('is-selected')) //remove from each dot
        dot.classList.add('is-selected') //add to the selected dot

        //show / hide buttons
        if(clickedDotIndex === 0) {
            previousButton.setAttribute('hidden', true)
            nextButton.removeAttribute('hidden')
        } //else if (clickedDotIndex === 2) // 
            else if (clickedDotIndex === dots.length -1) //so it works with any number of dots
            {
            previousButton.removeAttribute('hidden')
            nextButton.setAttribute('hidden', true)
        } else {
            previousButton.removeAttribute('hidden')
            nextButton.removeAttribute('hidden')
        }
    })
})

//POSITION THE SLIDES

//find the width of one slide
// const rect = slides[0].getBoundingClientRect()
// const slideWidth = rect.width
// console.log(slideWidth)

//shorten the code above
const slideWidth = slides[0].getBoundingClientRect().width

//position the slides, make the calculations consistent
// slides[0].style.left = slideWidth * 0 + 'px'
// slides[1].style.left = slideWidth * 1 + 'px'
// slides[2].style.left = slideWidth * 2 + 'px'

//use the index of each slide to calcultate the correct left value
//use a forEach loop
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px'
})
