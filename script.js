// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnJGJRlBw1spQ-1dY5L1miVyQ5ptnoNV4",
    authDomain: "tambayanngtropa-86436.firebaseapp.com",
    databaseURL: "https://tambayanngtropa-86436-default-rtdb.firebaseio.com",
    projectId: "tambayanngtropa-86436",
    storageBucket: "tambayanngtropa-86436.appspot.com",
    messagingSenderId: "1056515077642",
    appId: "1:1056515077642:web:6e4638e28f93dda68b11f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

// Elements
const loginModal = document.getElementById('loginModal');
const googleLogin = document.getElementById('googleLogin');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const closeModal = document.getElementById('closeModal');
const profilePage = document.getElementById('profilePage');
const logoutBtn = document.getElementById('logoutBtn');
const fullNameEl = document.getElementById('fullName');
const nicknameEl = document.getElementById('nickname');
const profilePicEl = document.getElementById('profilePic');

// Close modal
closeModal.onclick = () => { loginModal.style.display='none'; }

// Admin login
adminLoginBtn.onclick = () => {
    let password = prompt("Enter Admin Password:");
    if(password==="Kenichi"){
        get(child(ref(db), 'users/admin')).then((snapshot)=>{
            if(snapshot.exists()){
                showProfile(snapshot.val());
            } else {
                alert("Admin user not found!");
            }
        });
    } else {
        alert("Wrong password!");
    }
}

// Google login
googleLogin.onclick = () => {
    signInWithPopup(auth, provider).then((result)=>{
        const user = result.user;
        set(ref(db, 'users/' + user.uid), {
            fullName: user.displayName,
            nickname: user.displayName,
            profilePic: user.photoURL,
            backgroundPic: "default-bg.png",
            music: "default-music.mp3",
            friends: {},
            friendRequests: {}
        });
        showProfile({
            fullName: user.displayName,
            nickname: user.displayName,
            profilePic: user.photoURL,
            backgroundPic: "default-bg.png",
            music: "default-music.mp3"
        });
    }).catch((err)=>{ console.log(err); alert("Login failed!") });
}

// Logout
logoutBtn.onclick = () => {
    signOut(auth).then(()=>{
        profilePage.style.display='none';
        loginModal.style.display='flex';
    });
}

// Show profile
function showProfile(data){
    loginModal.style.display='none';
    profilePage.style.display='block';
    fullNameEl.textContent = data.fullName;
    nicknameEl.textContent = `(${data.nickname})`;
    profilePicEl.src = data.profilePic;

    // Auto-play background music
    let audio = document.createElement('audio');
    audio.src = data.music;
    audio.autoplay = true;
    audio.loop = true;
    profilePage.appendChild(audio);
}
