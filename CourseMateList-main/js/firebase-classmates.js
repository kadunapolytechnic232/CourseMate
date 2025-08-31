// ==============================
// Firebase setup
// ==============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getDatabase, ref, set, get, update, remove, onValue } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

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




//import { db, ref, set, onValue } from "./firebase.js";

const classmatesContainer = document.getElementById("classmateContainer");

// ==============================
// 1. Sync pending student
// ==============================
async function syncPendingStudent() {
  const pending = localStorage.getItem("pendingStudent");
  if (!pending) return; // nothing to sync

  const student = JSON.parse(pending);

  try {
    await set(ref(db, "classmates/" + student.regNo), student);
    console.log("Uploaded:", student.fullName);

    // ✅ remove from localStorage once synced
    localStorage.removeItem("pendingStudent");
  } catch (err) {
    console.error("Error syncing student:", err);
  }
}

// ==============================
// 2. Live update classmates list
// ==============================
function listenToClassmates() {
  onValue(ref(db, "classmates"), (snapshot) => {
    classmatesContainer.innerHTML = "";

    if (!snapshot.exists()) {
      classmatesContainer.innerHTML = "<p>No classmates found.</p>";
      return;
    }

    snapshot.forEach((child) => {
      const st = child.val();
      const card = document.createElement("div");
      card.className = "student-card";
      card.innerHTML = `
        <img src="${st.photo}" alt="${st.fullName}">
        <div class="details">
          <p><strong>Name:</strong> ${st.fullName}</p>
          <p><strong>Reg No:</strong> ${st.regNo}</p>
          <p><strong>Phone:</strong> ${st.phone}</p>
          <p><strong>Gender:</strong> ${st.gender}</p>
          ${st.state ? `<p><strong>State:</strong> ${st.state}</p>` : ""}
          ${st.lga ? `<p><strong>LGA:</strong> ${st.lga}</p>` : ""}
          ${st.town ? `<p><strong>Town:</strong> ${st.town}</p>` : ""}
          ${st.address ? `<p><strong>Address:</strong> ${st.address}</p>` : ""}

          <div class="actions">
            <a href="tel:${st.phone}" class="call-btn">📞 Call</a>
            ${st.address ? `<button onclick="openPlace('${st.address}')" class="map-btn">📍 Find</button>` : ""}
            ${st.address ? `<button onclick="openDirections('${st.address}')" class="dir-btn">🗺️ Directions</button>` : ""}
          </div>
        </div>
      `;
      classmatesContainer.appendChild(card);
    });
  });
}


// ==============================
// Run when page loads
// ==============================
document.addEventListener("DOMContentLoaded", async () => {
  await syncPendingStudent(); // send offline student to Firebase
  listenToClassmates();       // always keep classmates updated
});

















// ==============================
// Map helpers (works iOS + Android)
// ==============================
const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
const mapsBase = isIOS ? "http://maps.apple.com/" : "https://www.google.com/maps/";

window.openPlace = function (address) {
  const q = encodeURIComponent(address);
  const url = isIOS ? `${mapsBase}?q=${q}` : `${mapsBase}search/?api=1&query=${q}`;
  window.open(url, "_blank");
};

window.openDirections = function (address) {
  const destination = encodeURIComponent(address);
  if (!navigator.geolocation) {
    return openDirectionsNoOrigin(destination);
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = isIOS
        ? `${mapsBase}?saddr=${latitude},${longitude}&daddr=${destination}`
        : `${mapsBase}dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`;
      window.open(url, "_blank");
    },
    () => openDirectionsNoOrigin(destination)
  );
};

function openDirectionsNoOrigin(destination) {
  const url = isIOS
    ? `${mapsBase}?daddr=${destination}`
    : `${mapsBase}dir/?api=1&destination=${destination}`;
  window.open(url, "_blank");
}








