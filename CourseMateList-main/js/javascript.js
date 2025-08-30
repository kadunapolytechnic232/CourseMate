// ==============================
// Firebase setup
// ==============================
import { data } from "./data.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhAfv-0uP5ut_fn8woLTt2YxkNGqN3Ui4",
  authDomain: "viewclassmatelist.firebaseapp.com",
  databaseURL: "https://viewclassmatelist-default-rtdb.firebaseio.com",
  projectId: "viewclassmatelist",
  storageBucket: "viewclassmatelist.appspot.com",
  messagingSenderId: "379525249130",
  appId: "1:379525249130:web:6c1a0ad90e2c3105a8f213",
  measurementId: "G-8HRFMWX7ZF"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getDatabase(app);


let classmates = data;

// Listen to DB and update array
onValue(ref(db, "classmates"), (snapshot) => {
  classmates = []; // reset array
  snapshot.forEach((child) => {
    classmates.push(child.val());
  });
  //console.log("✅ Classmates updated:", classmates);
  renderClassmates(); // refresh UI automatically
});



// ==============================
// Helpers
// ==============================
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


document.querySelectorAll(".showPage").forEach((e)=>{
e.addEventListener('click',()=>{
  let id = e.dataset.id;
  showPage(`${id}`)
})
})




window.showPage = function (id) {
  document.querySelectorAll('.home, .view, .form, .team').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
};

window.goHome = function () {
  document.querySelectorAll('.view, .form, .team').forEach(el => el.classList.remove('active'));
  document.getElementById('home').classList.add('active');
};

// ==============================
// Render classmates (from array)
// ==============================
window.renderClassmates = function () {
  const container = document.getElementById('classmateContainer');
  const loader = document.getElementById('loadingIndicator');
  container.innerHTML = '';
  loader.style.display = 'block';

  loader.style.display = 'none';
  if (classmates.length > 0) {
    shuffle(classmates).forEach(st => {
      const card = document.createElement('div');
      card.className = 'student-card';
      card.innerHTML = `
        <img src="${st.photo}" alt="${st.fullName}">
        <div class="details">
          <p><strong>Name:</strong> ${st.fullName}</p>
          <p><strong>Reg No:</strong> ${st.regNo}</p>
          <p><strong>Phone:</strong> ${st.phone}</p>
          <p><strong>Gender:</strong> ${st.gender}</p>
          ${st.state ? `<p><strong>State:</strong> ${st.state}</p>` : ''}
          ${st.lga ? `<p><strong>LGA:</strong> ${st.lga}</p>` : ''}
          ${st.town ? `<p><strong>Town:</strong> ${st.town}</p>` : ''}
          ${st.address ? `<p><strong>Address:</strong> ${st.address}</p>` : ''}
        </div>
      `;
      container.appendChild(card);
    });
  } else {
    container.innerHTML = `<p>No classmates found.</p>`;
  }
};
renderClassmates(); // refresh UI automatically
// ==============================
// Render team (static)
// ==============================
window.renderTeam = function () {
  const container = document.getElementById('teamContainer');
  container.innerHTML = '';
  const team = shuffle([
    { fullName: "Yahya Abdullahi", regNo: "CST22NDEV2550", phone: "09162820838", gender: "Male", photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" },
    { fullName: "Bala Abdulsalam", regNo: "CST22NDEV2546", phone: "09131100280", gender: "Male", photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" },
    { fullName: "Aliyu Muhammad Lawal", regNo: "CST22NDEV2618", phone: "08065691994", gender: "Male", photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" },
    { fullName: "Faiza Adam", regNo: "CST22NDEV2675", phone: "08160306356", gender: "Female", photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" },
    { fullName: "Hauwa`U Ashir", regNo: "CST22NDEV2488", phone: "07069141658", gender: "Female", photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" }
  ]);

  team.forEach(st => {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
      <img src="${st.photo}" alt="${st.fullName}">
      <div class="details">
        <p><strong>Name:</strong> ${st.fullName}</p>
        <p><strong>Reg No:</strong> ${st.regNo}</p>
        <p><strong>Phone:</strong> ${st.phone}</p>
        <p><strong>Gender:</strong> ${st.gender}</p>
      </div>
    `;
    container.appendChild(card);
  });
};

// ==============================
// Register student
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  renderTeam();

  document.getElementById('studentForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const reg = document.getElementById('reg').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.getElementById('gender').value;
    const photo = document.getElementById('photo').files[0];

    if (!photo) return alert('Photo is required.');

    const regExists = classmates.some(s => s.regNo === reg);
    const phoneExists = classmates.some(s => s.phone === phone);

    if (regExists || phoneExists) {
      alert("You already have an account.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function () {
      const student = {
        fullName: name,
        regNo: reg,
        phone,
        gender,
        state: document.getElementById('state').value.trim(),
        lga: document.getElementById('lga').value.trim(),
        town: document.getElementById('town').value.trim(),
        address: document.getElementById('address').value.trim(),
        photo: reader.result
      };

      await set(ref(db, 'classmates/' + reg), student);
      alert("Registration successful!");
      document.getElementById('studentForm').reset();
      showPage('classmates');
    };
    reader.readAsDataURL(photo);
  });
});

// ==============================
// Update student
// ==============================
window.updateStudent = async function () {
  const reg = document.getElementById('reg').value.trim();
  if (!reg) return alert("Reg No is required to update.");

  const studentIndex = classmates.findIndex(s => s.regNo === reg);
  if (studentIndex === -1) {
    alert("No record found for that Reg No.");
    return;
  }

  const oldStudent = classmates[studentIndex];
  const updatedStudent = {
    fullName: document.getElementById('name').value.trim(),
    regNo: reg,
    phone: document.getElementById('phone').value.trim(),
    gender: document.getElementById('gender').value,
    state: document.getElementById('state').value.trim(),
    lga: document.getElementById('lga').value.trim(),
    town: document.getElementById('town').value.trim(),
    address: document.getElementById('address').value.trim(),
    photo: oldStudent.photo
  };

  const photoInput = document.getElementById('photo');
  if (photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = async function () {
      updatedStudent.photo = reader.result;
      await set(ref(db, 'classmates/' + reg), updatedStudent);
      alert("Update successful!");
      document.getElementById('studentForm').reset();
      showPage('classmates');
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    await set(ref(db, 'classmates/' + reg), updatedStudent);
    alert("Update successful!");
    document.getElementById('studentForm').reset();
    showPage('classmates');
  }
};
