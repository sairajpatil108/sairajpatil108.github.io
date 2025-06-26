# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. The website is fully data-driven, allowing easy updates through a JSON configuration file.

## Features

- **Data-Driven**: All content is managed through `data.json` for easy updates
- **Responsive Design**: Works seamlessly across all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Dynamic Content**: Auto-rotating profile images and job roles
- **Interactive Carousel**: Showcase certifications with smooth navigation
- **Social Integration**: Direct links to all professional profiles

## How to Update Your Portfolio

### Quick Updates
To update any content on your website, simply edit the `data.json` file. Changes will be reflected immediately when you refresh the website.

### JSON Structure Guide

#### Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "roles": ["Role 1", "Role 2", "Role 3"],
  "profileImages": ["image1.png", "image2.png"],
  "mainProfileImage": "./assets/main-profile.png",
  "cvLink": "https://your-cv-link.com"
}
```

#### Adding New Social Links
```json
"socialLinks": [
  {
    "name": "Platform Name",
    "url": "https://your-profile-url.com",
    "icon": "./assets/icon.png"
  }
]
```

#### Adding New Experience
```json
"professionalJourney": [
  {
    "period": "Start Date - End Date",
    "title": "Job Title",
    "company": "Company Name",
    "description": "Job description...",
    "technologies": ["Tech1", "Tech2", "Tech3"]
  }
]
```

#### Adding New Projects
```json
"projects": [
  {
    "name": "Project Name",
    "image": "./assets/project-image.png",
    "githubUrl": "https://github.com/username/repo"
  }
]
```

#### Updating Tech Stack
```json
"techStack": {
  "languages": [
    { "name": "Technology", "level": "Experience Level" }
  ],
  "development": [
    { 
      "name": "Technology", 
      "subtitle": "(Optional subtitle)",
      "level": "Experience Level" 
    }
  ],
  "tools": [
    { "name": "Tool", "level": "Experience Level" }
  ]
}
```

#### Adding New Certifications
```json
"certifications": [
  { 
    "name": "Certificate Name", 
    "image": "./assets/certificate.jpg" 
  }
]
```

### File Structure
```
portfolio/
├── index.html          # Main HTML file
├── style.css           # Styling
├── script.js           # JavaScript functionality
├── data.json           # Portfolio data (EDIT THIS FILE)
├── assets/             # Images and assets
└── README.md           # This file
```

### Adding New Assets
1. Add your images to the `assets/` folder
2. Update the paths in `data.json` to reference the new images
3. Use relative paths like `"./assets/your-image.png"`

### Common Updates

**Change Your Name**: Edit `personal.name` in `data.json`

**Update CV Link**: Edit `personal.cvLink` in `data.json`

**Add New Job**: Add a new object to the `professionalJourney` array

**Add New Project**: Add a new object to the `projects` array

**Add New Certificate**: Add a new object to the `certifications` array

**Update Contact Info**: Edit the `contact` section

### Tips
- Always use relative paths for images (`./assets/image.png`)
- Ensure image files exist in the assets folder before referencing them
- The website includes fallback functionality if JSON loading fails
- Test your JSON syntax using online JSON validators
- Keep image sizes optimized for web (compress large images)

### Development
To run locally, simply open `index.html` in a web browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

The website will automatically load data from `data.json` and populate all sections dynamically. 
