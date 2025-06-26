// Global variable to store portfolio data
let portfolioData = null;

// Load JSON data and initialize the website
async function loadPortfolioData() {
  try {
    const response = await fetch('./data.json');
    portfolioData = await response.json();
    initializeWebsite();
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    // Fallback to original hardcoded values if JSON fails to load
    initializeFallback();
  }
}

// Initialize website with JSON data
function initializeWebsite() {
  if (!portfolioData) return;

  populatePersonalInfo();
  populateSocialLinks();
  populateAboutSection();
  populateProfessionalJourney();
  populateEducation();
  populateTechStack();
  populateProjects();
  populateCertifications();
  populateContact();
  initializeRoleRotation();
  initializeProfileImageRotation();
  initCarousel();
}

// Populate personal information
function populatePersonalInfo() {
  const { personal } = portfolioData;

  // Update name
  document.querySelector('.title').textContent = personal.name;

  // Update title
  document.querySelector('.section__text__p2').textContent = personal.title;

  // Update main profile image
  document.getElementById('profile-pic').src = personal.mainProfileImage;

  // Update CV link
  document.querySelector('.download-cv-btn-color').onclick = () => {
    window.open(personal.cvLink);
  };
}

// Populate social links
function populateSocialLinks() {
  const { socialLinks } = portfolioData;
  const socialsContainer = document.getElementById('socials-container');

  socialsContainer.innerHTML = '';

  socialLinks.forEach(social => {
    const img = document.createElement('img');
    img.src = social.icon;
    img.alt = `${social.name} profile`;
    img.className = 'icon';
    if (social.name === 'Google Developer') {
      img.width = 45;
    }
    img.onclick = () => window.open(social.url);
    socialsContainer.appendChild(img);
  });
}

// Populate about section
function populateAboutSection() {
  const { about } = portfolioData;
  const aboutTextContainer = document.querySelector('#About .text-container p');
  if (aboutTextContainer) {
    aboutTextContainer.textContent = about.description;
  }
}

// Function to generate trees throughout the timeline
function generateTimelineTrees() {
  const timelineContainer = document.querySelector('.timeline-container');
  if (!timelineContainer) return;

  const isMobile = window.innerWidth <= 768;

  // Wait for timeline items to render, then generate trees
  setTimeout(() => {
    const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
    const totalTimelineHeight = timelineItems.length > 0 ?
      timelineItems[timelineItems.length - 1].offsetTop + timelineItems[timelineItems.length - 1].offsetHeight + 200 :
      1000; // Fallback height

    // Clear any existing trees
    timelineContainer.querySelectorAll('.timeline-tree-left, .timeline-tree-right, .timeline-tree-bg').forEach(tree => tree.remove());

    // Create trees distributed throughout the entire timeline
    const treesPerSection = isMobile ? 8 : 12;
    const timelineItemCount = timelineItems.length || 3; // Fallback to 3
    const totalTrees = Math.max(treesPerSection, timelineItemCount * treesPerSection);

    for (let i = 0; i < totalTrees; i++) {
      const progress = i / totalTrees;
      const basePosition = progress * totalTimelineHeight;
      const randomOffset = (Math.random() - 0.5) * 120;
      const treeTop = Math.max(0, basePosition + randomOffset);

      // Left side trees (avoid road area: 45-125px is road zone)
      if (Math.random() > 0.3) {
        const leftTree = document.createElement('div');
        leftTree.className = 'timeline-tree-left';
        leftTree.innerHTML = Math.random() > 0.5 ? '🌲' : '🌳';
        leftTree.style.position = 'absolute';
        leftTree.style.left = `${isMobile ? 2 + Math.random() * 35 : 5 + Math.random() * 35}px`; // Max 40px to avoid road
        leftTree.style.top = `${treeTop}px`;
        leftTree.style.fontSize = `${(isMobile ? 18 : 28) + Math.random() * (isMobile ? 12 : 20)}px`;
        leftTree.style.zIndex = '1';
        leftTree.style.userSelect = 'none';
        leftTree.style.pointerEvents = 'none';
        timelineContainer.appendChild(leftTree);
      }

      // Right side trees (avoid road area)
      if (Math.random() > 0.2) {
        const rightTree = document.createElement('div');
        rightTree.className = 'timeline-tree-right';
        rightTree.innerHTML = Math.random() > 0.5 ? '🌲' : '🌳';
        rightTree.style.position = 'absolute';
        rightTree.style.right = `${isMobile ? -25 + Math.random() * 40 : -40 + Math.random() * 60}px`;
        rightTree.style.top = `${treeTop + Math.random() * 80}px`;
        rightTree.style.fontSize = `${(isMobile ? 20 : 30) + Math.random() * (isMobile ? 12 : 18)}px`;
        rightTree.style.zIndex = '1';
        rightTree.style.userSelect = 'none';
        rightTree.style.pointerEvents = 'none';
        timelineContainer.appendChild(rightTree);
      }
    }

    // Add background trees for depth throughout the timeline
    const bgTreeCount = Math.floor(totalTimelineHeight / (isMobile ? 150 : 100));
    for (let i = 0; i < bgTreeCount; i++) {
      const bgTree = document.createElement('div');
      bgTree.className = 'timeline-tree-bg';
      bgTree.innerHTML = ['🌲', '🌳', '🌲'][i % 3];
      bgTree.style.position = 'absolute';

      // Randomly place on left or right, but far from road
      if (Math.random() > 0.5) {
        bgTree.style.left = `${Math.random() * (isMobile ? 25 : 35)}px`; // Keep away from road
      } else {
        bgTree.style.right = `${-70 + Math.random() * (isMobile ? 30 : 50)}px`;
      }

      bgTree.style.top = `${Math.random() * totalTimelineHeight}px`;
      bgTree.style.fontSize = `${(isMobile ? 12 : 18) + Math.random() * (isMobile ? 8 : 15)}px`;
      bgTree.style.zIndex = '0';
      bgTree.style.opacity = `${0.3 + Math.random() * 0.4}`;
      bgTree.style.userSelect = 'none';
      bgTree.style.pointerEvents = 'none';
      timelineContainer.appendChild(bgTree);
    }
  }, 150); // Allow time for timeline items to render
}

// Populate professional journey
function populateProfessionalJourney() {
  const { professionalJourney } = portfolioData;
  const timelineContainer = document.querySelector('.timeline-container');

  // Add adventure classes to the section
  const professionJourneySection = document.querySelector('.about-details-container');
  const sectionTitle = professionJourneySection.querySelector('.section-title');
  if (sectionTitle && sectionTitle.textContent.includes('Professional Journey')) {
    sectionTitle.classList.add('adventure-title');
    professionJourneySection.classList.add('adventure-journey');
  }

  timelineContainer.innerHTML = '';



  // Create the single traveling car
  const travelingCar = document.createElement('div');
  travelingCar.className = 'traveling-car';

  const carImage = document.createElement('img');
  carImage.src = './assets/car.png';
  carImage.alt = 'Car';
  carImage.className = 'car-image';

  travelingCar.appendChild(carImage);
  timelineContainer.appendChild(travelingCar);

  professionalJourney.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.style.animationDelay = `${(index + 1) * 0.3}s`;
    timelineItem.setAttribute('data-index', index);

    const badges = item.technologies.map(tech =>
      `<span class="badge">${tech}</span>`
    ).join('');

    timelineItem.innerHTML = `
      <div class="timeline-milestone" data-index="${index}">📍</div>
      <div class="timeline-content">
        <div class="timeline-date">${item.period}</div>
        <h3 class="timeline-title">
          <img src="./assets/experience.png" alt="Experience icon" class="icon" />
          ${item.title}
        </h3>
        <div class="timeline-company">${item.company}</div>
        <div class="timeline-description">${item.description}</div>
        <div>${badges}</div>
      </div>
    `;

    // Add hover event listeners for car movement
    const timelineContent = timelineItem.querySelector('.timeline-content');

    timelineContent.addEventListener('mouseenter', () => {
      moveCarToPosition(index);
    });

    timelineContainer.appendChild(timelineItem);
  });

  // Initialize car interactions
  initializeCarMovement();

  // Generate trees after all timeline items are created
  generateTimelineTrees();
}

// Car movement functionality
let currentCarPosition = 0;

function moveCarToPosition(targetIndex) {
  const travelingCar = document.querySelector('.traveling-car');
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (!travelingCar || !timelineItems[targetIndex]) return;

  // Calculate the vertical position based on the timeline item
  const targetItem = timelineItems[targetIndex];
  const itemOffset = targetItem.offsetTop;

  // Position the car at the target milestone
  travelingCar.style.top = `${itemOffset + 32}px`; // Align with milestone
  travelingCar.classList.add('moving');

  // Add movement animation
  if (targetIndex !== currentCarPosition) {
    travelingCar.classList.add('traveling');
  }

  // Update current position
  currentCarPosition = targetIndex;

  // Remove animation classes after movement
  setTimeout(() => {
    travelingCar.classList.remove('moving', 'traveling');
  }, 1000);

  // Highlight the active milestone
  highlightMilestone(targetIndex);
}

function highlightMilestone(activeIndex) {
  const milestones = document.querySelectorAll('.timeline-milestone');

  milestones.forEach((milestone, index) => {
    if (index === activeIndex) {
      milestone.style.transform = 'scale(1.3)';
      milestone.style.background = 'linear-gradient(135deg, #FF7F2E, #FFB347)';
    } else {
      milestone.style.transform = 'scale(1)';
      milestone.style.background = 'linear-gradient(135deg, #666666, #999999)';
    }
  });
}

function initializeCarMovement() {
  const travelingCar = document.querySelector('.traveling-car');
  const firstItem = document.querySelector('.timeline-item[data-index="0"]');

  if (travelingCar && firstItem) {
    // Position car at the first milestone initially
    travelingCar.style.top = `${firstItem.offsetTop + 32}px`;
    highlightMilestone(0);
  }
}

// Populate education section
function populateEducation() {
  const { education } = portfolioData;

  document.querySelector('.degree').textContent = education.degree;
  document.querySelector('.institute').textContent = education.institute;
  document.querySelector('.duration').textContent = education.duration;
  document.querySelector('.education-details p').textContent = education.description;

  const badgeContainer = document.querySelector('.badge-container');
  badgeContainer.innerHTML = '';

  education.keyCourses.forEach(course => {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = course;
    badgeContainer.appendChild(badge);
  });
}

// Populate tech stack
function populateTechStack() {
  const { techStack } = portfolioData;

  // Populate languages
  const languagesContainer = document.querySelector('.details-container:nth-child(1) .article-container');
  populateTechSection(languagesContainer, techStack.languages);

  // Populate development
  const developmentContainer = document.querySelector('.details-container:nth-child(2) .article-container');
  populateTechSection(developmentContainer, techStack.development);

  // Populate tools
  const toolsContainer = document.querySelector('.details-container:nth-child(3) .article-container');
  populateTechSection(toolsContainer, techStack.tools);
}

function populateTechSection(container, items) {
  container.innerHTML = '';

  items.forEach(item => {
    const article = document.createElement('article');
    article.innerHTML = `
      <img src="./assets/checkmark.png" alt="Experience icon" class="icon" />
      <div>
        <h3>${item.name}</h3>
        ${item.subtitle ? `<h6>${item.subtitle}</h6>` : ''}
        <p>${item.level}</p>
      </div>
    `;
    container.appendChild(article);
  });
}

// Populate projects
function populateProjects() {
  const { projects } = portfolioData;
  const projectsContainer = document.querySelector('#projects .about-containers');

  projectsContainer.innerHTML = '';

  projects.forEach(project => {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'details-container color-container';
    projectDiv.innerHTML = `
      <div class="article-container">
        <img src="${project.image}" alt="${project.name}" class="project-img" />
      </div>
      <h2 class="experience-sub-title project-title">${project.name}</h2>
      <div class="btn-container">
        <button class="btn btn-color-2" onclick="window.open('${project.githubUrl}')">
          Github
        </button>
      </div>
    `;
    projectsContainer.appendChild(projectDiv);
  });
}

// Populate certifications
function populateCertifications() {
  const { certifications } = portfolioData;
  const carousel = document.querySelector('.carousel');

  carousel.innerHTML = '';

  certifications.forEach(cert => {
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';
    carouselItem.innerHTML = `<img src="${cert.image}" alt="${cert.name}">`;
    carousel.appendChild(carouselItem);
  });
}

// Populate contact information
function populateContact() {
  const { contact } = portfolioData;

  // Update email links
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.href = `mailto:${contact.email}`;
    if (link.textContent.includes('@')) {
      link.textContent = contact.email;
    }
  });

  // Update LinkedIn link
  const linkedinLink = document.querySelector('.contact-info-container p a[href*="linkedin"]');
  if (linkedinLink) {
    linkedinLink.href = contact.linkedin;
  }
}

// Initialize role rotation with JSON data
function initializeRoleRotation() {
  const roles = portfolioData.personal.roles;
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
}

// Initialize profile image rotation with JSON data
function initializeProfileImageRotation() {
  const profilePics = portfolioData.personal.profileImages;
  let currentIndex = 0;
  const profileImageElement = document.getElementById('profile-pic');

  function changeProfilePicture() {
    currentIndex = (currentIndex + 1) % profilePics.length;
    profileImageElement.src = profilePics[currentIndex];
  }

  setInterval(changeProfilePicture, 500);
}

// Fallback initialization with original hardcoded values
function initializeFallback() {
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

  const profilePics = [
    './assets/Untitled design (1).png',
    './assets/Untitled design (2).png',
    './assets/Untitled design (4).png',
    './assets/Untitled design.png',
  ];

  let currentIndex = 0;
  const profileImageElement = document.getElementById('profile-pic');

  function changeProfilePicture() {
    currentIndex = (currentIndex + 1) % profilePics.length;
    profileImageElement.src = profilePics[currentIndex];
  }

  setInterval(changeProfilePicture, 500);
  initCarousel();
}

// Toggle menu function
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Carousel functionality
const carousel = document.querySelector('.carousel');
let carouselItems, prevBtn, nextBtn, indicatorsContainer;
let carouselCurrentIndex = 0;
let isAutoPlaying = true;
let autoPlayInterval;

function initCarousel() {
  // Wait for carousel items to be populated
  setTimeout(() => {
    carouselItems = document.querySelectorAll('.carousel-item');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    indicatorsContainer = document.getElementById('carouselIndicators');

    if (carouselItems.length === 0) return;

    // Clear existing indicators
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
    }

    // Create indicators
    carouselItems.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'carousel-indicator';
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      if (indicatorsContainer) {
        indicatorsContainer.appendChild(indicator);
      }
    });

    // Start auto-play
    startAutoPlay();

    // Event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
      });
    }

    // Pause auto-play on hover
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        isAutoPlaying = false;
      });

      carousel.addEventListener('mouseleave', () => {
        isAutoPlaying = true;
      });

      // Handle scroll events
      carousel.addEventListener('scroll', () => {
        const itemWidth = carouselItems[0].offsetWidth + 32;
        const scrollPosition = carousel.scrollLeft;
        carouselCurrentIndex = Math.round(scrollPosition / itemWidth);
        updateIndicators();
      });
    }
  }, 100);
}

// Go to specific slide
function goToSlide(index) {
  carouselCurrentIndex = index;
  const itemWidth = carouselItems[0].offsetWidth + 32;
  carousel.scrollTo({
    left: carouselCurrentIndex * itemWidth,
    behavior: 'smooth'
  });
  updateIndicators();
}

// Update indicators
function updateIndicators() {
  if (!indicatorsContainer) return;
  const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === carouselCurrentIndex);
  });
}

// Next slide
function nextSlide() {
  carouselCurrentIndex = (carouselCurrentIndex + 1) % carouselItems.length;
  goToSlide(carouselCurrentIndex);
}

// Previous slide
function prevSlide() {
  carouselCurrentIndex = (carouselCurrentIndex - 1 + carouselItems.length) % carouselItems.length;
  goToSlide(carouselCurrentIndex);
}

// Start auto-play
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    if (isAutoPlaying) {
      nextSlide();
    }
  }, 4000);
}

// Stop auto-play
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Initialize minimalist profile section
function initializeSkyProfile() {
  createHotAirBalloons();
}

// Create minimal sky elements
function createHotAirBalloons() {
  const profileSection = document.getElementById('profile');
  const skyContainer = document.createElement('div');
  skyContainer.className = 'sky-elements';

  const elements = [
    { emoji: '☁️', left: '15%', top: '10%', size: '55px', type: 'cloud' },
    { emoji: '☁️', right: '25%', top: '8%', size: '42px', type: 'cloud' },
    { emoji: '☁️', left: '5%', top: '35%', size: '38px', type: 'cloud' },
    { emoji: '☁️', right: '10%', top: '45%', size: '48px', type: 'cloud' },
    { emoji: '☁️', left: '75%', top: '12%', size: '35px', type: 'cloud' },
    { emoji: '☁️', right: '70%', top: '60%', size: '40px', type: 'cloud' },
    { emoji: '🪁', right: '20%', top: '25%', size: '35px', type: 'kite' },
    { emoji: '🪁', left: '85%', top: '20%', size: '40px', type: 'kite' },
    { emoji: '🎈', left: '12%', top: '70%', size: '32px', type: 'balloon' },
    { emoji: '🎈', right: '15%', top: '75%', size: '35px', type: 'balloon' }
  ];

  elements.forEach((element, index) => {
    const skyElement = document.createElement('div');
    skyElement.className = `sky-element ${element.type}`;
    skyElement.textContent = element.emoji;

    if (element.left) skyElement.style.left = element.left;
    if (element.right) skyElement.style.right = element.right;
    skyElement.style.top = element.top;
    skyElement.style.fontSize = element.size;
    skyElement.style.animationDelay = (index * 5) + 's';
    skyElement.style.animationDuration = (40 + Math.random() * 20) + 's';

    skyContainer.appendChild(skyElement);
  });

  profileSection.appendChild(skyContainer);
}



// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolioData();
  setTimeout(initializeSkyProfile, 500); // Slight delay to ensure DOM is ready
});

// Regenerate trees on window resize to handle mobile/desktop switches
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    generateTimelineTrees();
  }, 300); // Debounce resize events
});

// Expose tree generation function globally for future use
window.refreshTimelineTrees = generateTimelineTrees;