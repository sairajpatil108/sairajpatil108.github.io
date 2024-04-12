function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}



function toggleDescription(descriptionId) {
  var description = document.getElementById(descriptionId);
  description.classList.toggle('show');
}
