
const roles = ["Android Developer", "Cross Platform App Developer", "Cybersecurity Analyst", "Java Developer"];
let currentRoleIndex = 0;

function changeRole() {
  document.getElementById('role').style.opacity = '0';
  setTimeout(() => {
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    document.getElementById('role').innerText = roles[currentRoleIndex];
    document.getElementById('role').style.opacity = '1';
  }, 500); 
}
setInterval(changeRole, 2000); 


function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ---------------- certification -----------------------------


const carousel = document.querySelector('.carousel');
const carouselItems = carousel.querySelectorAll('.carousel-item');
let animationInterval;

function startCarousel() {
  animationInterval = setInterval(() => {
    scrollCarousel('next');
  }, 3000); // Adjust the interval as needed (every 3 seconds in this example)
}

carousel.addEventListener('touchstart', () => {
  clearInterval(animationInterval); // Stop sliding when user interacts
});

carousel.addEventListener('touchend', () => {
  startCarousel(); // Resume sliding after interaction
});

startCarousel(); // Start carousel sliding automatically

// Logic for scrolling the carousel
function scrollCarousel(direction) {
  const scrollAmount = carousel.clientWidth; // Full width for scrolling one full item at a time
  const currentScrollLeft = carousel.scrollLeft;
  let newScrollLeft;

  if (direction === 'next') {
    newScrollLeft = currentScrollLeft + scrollAmount;
  } else {
    newScrollLeft = currentScrollLeft - scrollAmount;
  }

  // Check if the carousel should wrap around
  if (newScrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
    // If scrolling past the last item, wrap around to the first
    carousel.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  } else if (newScrollLeft < 0) {
    // If scrolling before the first item, wrap around to the last
    carousel.scrollTo({
      left: carousel.scrollWidth - carousel.clientWidth,
      behavior: 'smooth'
    });
  } else {
    // Otherwise, scroll normally
    carousel.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  }
}

