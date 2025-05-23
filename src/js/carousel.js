const track = document.querySelector('.carousel__track');
const slides = Array.from(document.querySelectorAll('.carousel__slide'));
const dots = Array.from(document.querySelectorAll('.carousel__indicator'));

document.addEventListener("DOMContentLoaded",() => {
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const currentSlide = [...slides].find(slide => slide.classList.contains('current__slide'));

      setTimeout(() => {
        document.querySelector(".carousel__indicator.active").classList.remove('active');
        currentSlide.classList.remove('current__slide');
        slides[index].classList.add('current__slide');
        dot.classList.add('active');
      }, 100);
    })
  })
});
// const setCurrentSlide = (index, previousIndex = null) => {
//   // If previousIndex is not provided, find the current slide
//   if (previousIndex === null) {
//     previousIndex = slides.findIndex(slide => slide.classList.contains('current__slide'));
//   }
  
//   // Determine direction (up or down)
//   const direction = index > previousIndex ? 1 : -1;
  
//   // Exit if trying to set the same slide
//   if (index === previousIndex) return;
  
//   // Remove current slide class
//   if (previousIndex >= 0) {
//     slides[previousIndex].classList.remove('current__slide');
//     // Move previous slide out of view
//     slides[previousIndex].style.transform = `translateY(${-100 * direction}%)`;
//   }
  
//   // Prepare new slide to enter from correct direction
//   slides[index].style.transform = `translateY(${100 * direction}%)`;
  
//   // Force reflow
//   void slides[index].offsetWidth;
  
//   // Add current class to new slide
//   slides[index].classList.add('current__slide');
  
//   // Move new slide into view
//   setTimeout(() => {
//     slides[index].style.transform = 'translateY(0)';
//   }, 20);
  
//   // Update active indicator
//   const activeIndicator = dots.find(dot => dot.classList.contains('active'));
//   if (activeIndicator) {
//     activeIndicator.classList.remove('active');
//   }
//   dots[index].classList.add('active');
// };

// // Add click event listeners to all indicators
// dots.forEach((dot, index) => {
//   dot.addEventListener('click', () => {
//     const currentIndex = slides.findIndex(slide => slide.classList.contains('current__slide'));
//     setCurrentSlide(index, currentIndex);
//   });
// });

// //Auto-play functionality
// let currentIndex = 0;
// const autoPlay = () => {
//   currentIndex = (currentIndex + 1) % slides.length;
//   setCurrentSlide(currentIndex);
// };

// // Uncomment the following lines to enable auto-play
// // const interval = 5000; // 5 seconds
// // const autoPlayTimer = setInterval(autoPlay, interval);

// // Optional: Add keyboard navigation
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'ArrowDown') {
//     currentIndex = (currentIndex + 1) % slides.length;
//     setCurrentSlide(currentIndex);
//   } else if (e.key === 'ArrowUp') {
//     currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//     setCurrentSlide(currentIndex);
//   }
// });

// // Initialize the carousel
// // Set initial state for all slides except the first one
// slides.forEach((slide, i) => {
//   if (i !== 0) {
//     slide.style.transform = 'translateY(100%)';
//   }
// });

// // Set the first slide as current
// setCurrentSlide(0);



// const slideHeight = slides[0].getBoundingClientRect().height;

// const setSlidePosition = (slide, index) => {
//   slide.style.bottom = slideHeight * index + 'px';
// }

// slides.forEach(setSlidePosition);

// const moveToSlide = (track, currentSlide, targetSlide) => {
//   track.style.transform = 'translateY(' + targetSlide.style.bottom + ')';
//   currentSlide.classList.remove('current__slide');
//   targetSlide.classList.add('current__slide');
// }

// const updateDots = (currentDot, targetDot) => {
//   currentDot.classList.remove('current__slide');
//   targetDot.classList.add('current__slide');
// }

// dotsNav.addEventListener('click', e => {
//   const targetDot = e.target.closest('button');
//   if(!targetDot) return;

//   const currentSlide = track.querySelector('.current__slide');
//   const currentDot = dotsNav.querySelector('.current__slide');
//   const targetIndex = dots.findIndex(dot => dot === targetDot);
//   const targetSlide = slides[targetIndex];

//   moveToSlide(track, currentSlide, targetSlide);
//   updateDots(currentDot, targetDot);
// })

// Make a loop for slides that starts going (when the slider is fully visible) with interval of 5sec through each slide and adds and then removes class current__slide and the same for the dots