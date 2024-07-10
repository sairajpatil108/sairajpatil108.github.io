
const roles = ["Android Developer", "Cross Platform App Developer", "Cybersecurity Analyst", "Java Developer"];
let currentRoleIndex = 0;

function changeRole() {
  document.getElementById('role').style.opacity = '0';
  setTimeout(() => {
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    document.getElementById('role').innerText = roles[currentRoleIndex];
    document.getElementById('role').style.opacity = '1';
  }, 500); // Wait for 0.5 seconds for the transition to complete
}
setInterval(changeRole, 2000); // Change role every 3 seconds


function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ---------------- certification -----------------------------

const carousel = document.querySelector('.carousel');
const carouselItems = carousel.querySelectorAll('.carousel-item');

let isDragging = false;
let touchStartX = 0;
let scrollLeftStart = 0;
let animationInterval;

function startCarousel() {
  animationInterval = setInterval(() => {
    scrollCarousel('next');
  }, 5000); // Adjust the interval as needed
}

function stopCarousel() {
  clearInterval(animationInterval);
}

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
  scrollLeftStart = carousel.scrollLeft;
  isDragging = true;
  stopCarousel(); // Stop sliding when user interacts
}

function handleTouchMove(e) {
  if (!isDragging) return;
  const touchCurrentX = e.touches[0].clientX;
  const diffX = touchCurrentX - touchStartX;
  carousel.scrollLeft = scrollLeftStart - diffX;
}

function handleTouchEnd(e) {
  isDragging = false;
  startCarousel(); // Resume sliding after interaction
}

carousel.addEventListener('touchstart', handleTouchStart);
carousel.addEventListener('touchmove', handleTouchMove);
carousel.addEventListener('touchend', handleTouchEnd);

// Start the carousel sliding automatically
startCarousel();
