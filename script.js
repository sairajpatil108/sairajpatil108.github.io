
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


