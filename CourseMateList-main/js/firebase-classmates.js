/*
// ==============================
// Firebase setup
// ==============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

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

const classmatesContainer = document.getElementById("classmateContainer");

// ==============================
// Offline helper
// ==============================
function isOnline() {
  return navigator.onLine;
}

function showOfflineMessage() {
  if (!document.getElementById("offline-message")) {
    const msg = document.createElement("div");
    msg.id = "offline-message";
    msg.textContent = "You are currently offline. Some features may not work.";
    msg.style.position = "fixed";
    msg.style.bottom = "10px";
    msg.style.left = "50%";
    msg.style.transform = "translateX(-50%)";
    msg.style.backgroundColor = "#f44336";
    msg.style.color = "#fff";
    msg.style.padding = "8px 16px";
    msg.style.borderRadius = "5px";
    msg.style.zIndex = "1000";
    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 5000);
  }
}

// ==============================
// Sync pending student
// ==============================
async function syncPendingStudent() {
  const pending = localStorage.getItem("pendingStudent");
  if (!pending) return;

  const student = JSON.parse(pending);

  if (!isOnline()) {
    showOfflineMessage();
    return;
  }

  try {
    await set(ref(db, "classmates/" + student.regNo), student);
    console.log("Uploaded:", student.fullName);
    localStorage.removeItem("pendingStudent");
  } catch (err) {
    console.warn("Error syncing student:", err);
  }
}

// ==============================
// Live update classmates list
// ==============================
function listenToClassmates() {
  try {
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
  } catch (err) {
    console.warn("Error listening to classmates:", err);
  }
}

// ==============================
// Run when page loads
// ==============================
document.addEventListener("DOMContentLoaded", async () => {
  await syncPendingStudent();
  listenToClassmates();
});


// ==============================
// Map helpers (iOS + Android) with offline handling
// ==============================
const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
const mapsBase = isIOS ? "http://maps.apple.com/" : "https://www.google.com/maps/";

window.openPlace = function (address) {
  if (!isOnline()) {
    showOfflineMessage();
    return;
  }
  try {
    const q = encodeURIComponent(address);
    const url = isIOS ? `${mapsBase}?q=${q}` : `${mapsBase}search/?api=1&query=${q}`;
    window.open(url, "_blank");
  } catch (err) {
    console.warn("Error opening place:", err);
  }
};

window.openDirections = function (address) {
  if (!isOnline()) {
    showOfflineMessage();
    return;
  }
  const destination = encodeURIComponent(address);

  if (!navigator.geolocation) {
    return openDirectionsNoOrigin(destination);
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const url = isIOS
          ? `${mapsBase}?saddr=${latitude},${longitude}&daddr=${destination}`
          : `${mapsBase}dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`;
        window.open(url, "_blank");
      } catch (err) {
        console.warn("Error opening directions:", err);
        openDirectionsNoOrigin(destination);
      }
    },
    () => openDirectionsNoOrigin(destination),
    { timeout: 5000 }
  );
};

function openDirectionsNoOrigin(destination) {
  if (!isOnline()) {
    showOfflineMessage();
    return;
  }
  try {
    const url = isIOS
      ? `${mapsBase}?daddr=${destination}`
      : `${mapsBase}dir/?api=1&destination=${destination}`;
    window.open(url, "_blank");
  } catch (err) {
    console.warn("Error opening directions without origin:", err);
  }
}

// Optional: Listen to offline events
window.addEventListener("offline", showOfflineMessage);

*/







