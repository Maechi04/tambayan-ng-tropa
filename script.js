document.getElementById("loginBtn").onclick = () => {
  alert("Login gamit ang Google — coming next!");
};

const profileButtons = document.querySelectorAll(".profile-card button");

profileButtons.forEach(btn => {
  btn.onclick = () => {
    alert("Profile page coming soon!");
  };
});
