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
    // If JSON fails to load, the website will still work with static HTML content
  }
}

// Initialize website with JSON data
function initializeWebsite() {
  if (!portfolioData) return;

  populatePersonalInfo();
  populateSocialLinks();
  populateProfessionalJourney();
  populateEducation();
  populateTechStack();
  populateProjects();
  populateContact();
  initializeRoleRotation();
  setStaticProfileImage();
}

// Populate personal information
function populatePersonalInfo() {
  const { personal } = portfolioData;

  // Update name
  document.querySelector('.title').textContent = personal.name;

  // Update title
  document.querySelector('.section__text__p2').textContent = personal.title;

  // Set static profile image
  document.getElementById('profile-pic').src = './assets/Untitled design.png';

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



// Timeline tree generation — disabled in minimalist design
function generateTimelineTrees() {
  return;
}

// Populate professional journey
function populateProfessionalJourney() {
  const { professionalJourney } = portfolioData;
  const timelineContainer = document.querySelector('.timeline-container');

  timelineContainer.innerHTML = '';

  professionalJourney.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.style.animationDelay = `${index * 0.1}s`;
    timelineItem.setAttribute('data-index', index);

    const badges = item.technologies.map(tech =>
      `<span class="badge">${tech}</span>`
    ).join('');

    timelineItem.innerHTML = `
      <div class="timeline-content">
        <div class="timeline-date">${item.period}</div>
        <h3 class="timeline-title">${item.title}</h3>
        <div class="timeline-company">${item.company}</div>
        <div class="timeline-description">${item.description}</div>
        <div>${badges}</div>
      </div>
    `;

    timelineContainer.appendChild(timelineItem);
  });
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
  const containers = document.querySelectorAll('#experience .details-container .article-container');

  if (containers[0]) populateTechSection(containers[0], techStack.product);
  if (containers[1]) populateTechSection(containers[1], techStack.engineering);
  if (containers[2]) populateTechSection(containers[2], techStack.domains);
}

function populateTechSection(container, items) {
  container.innerHTML = '';

  items.forEach(item => {
    const article = document.createElement('article');
    article.innerHTML = `<h3>${item.name}</h3>`;
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
      ${project.role ? `<p class="project-meta">${project.role} &nbsp;·&nbsp; ${project.period}</p>` : ''}
      ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
    `;
    projectsContainer.appendChild(projectDiv);
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

// Set static profile image
function setStaticProfileImage() {
  const profileImageElement = document.getElementById('profile-pic');
  if (profileImageElement) {
    profileImageElement.src = './assets/Untitled design.png';
  }
}



// Toggle menu function
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Sky elements — disabled in minimalist design
function initializeSkyProfile() { return; }
function createHotAirBalloons() { return; }



// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolioData();
});