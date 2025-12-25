import { signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// LOGIN BUTTON
const loginBtn = document.getElementById("loginBtn");

loginBtn.onclick = () => {
  signInWithPopup(window.firebaseAuth, window.firebaseProvider)
    .then((result) => {
      const user = result.user;
      alert(`Kumusta, ${user.displayName}! You are logged in.`);
      console.log(user);
      // Change login button to logout
      loginBtn.textContent = "Logout";
      loginBtn.onclick = () => {
        signOut(window.firebaseAuth).then(() => {
          alert("Logged out!");
          loginBtn.textContent = "Login";
        });
      };
    })
    .catch((error) => {
      console.error(error);
      alert("Login failed. Try again.");
    });
};

// PROFILE BUTTONS
const profileButtons = document.querySelectorAll(".profile-card button");
profileButtons.forEach(btn => {
  btn.onclick = () => {
    alert("Profile page coming soon!");
  };
});
