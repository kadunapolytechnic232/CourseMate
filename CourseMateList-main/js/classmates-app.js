import { data } from "./classmates-data.js";
let classmates = data;

// ==============================
// Helpers
// ==============================
/*
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
*/
function shuffle(array, callback) {
  let i = array.length - 1;

  const interval = setInterval(() => {
    if (i <= 0) {
      clearInterval(interval);
      if (callback) callback(array); // return result when done
      return;
    }

    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];

    i--;
  }, 0); // 0 means "as fast as possible without blocking"
}


function saveClassmates() {
  localStorage.setItem("classmates", JSON.stringify(classmates));
}

document.querySelectorAll(".showPage").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.id);
  });
});

window.showPage = function (id) {
  document
    .querySelectorAll(".home, .view, .form, .team")
    .forEach((el) => el.classList.remove("active"));

  const page = document.getElementById(id);
  if (page) {
    page.classList.add("active");

    // render content when switching pages
    if (id === "team") {
      renderTeam();
    } else if (id === "classmates") {
      renderClassmates();
    }
  }
};


window.goHome = function () {
  document
    .querySelectorAll(".view, .form, .team")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById("home").classList.add("active");
};


// ==============================
// Render classmates
// ==============================
window.renderClassmates = function () {
  const container = document.getElementById("classmateContainer");
  const loader = document.getElementById("loadingIndicator");
  container.innerHTML = "";
  loader.style.display = "block";

  loader.style.display = "none";
  /*
  if (classmates.length > 0) {
    shuffle(classmates).forEach((st) => {
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
      container.appendChild(card);
    });
  } else {
    container.innerHTML = `<p>No classmates found.</p>`;
  }
  */
  if (classmates.length > 0) {
  shuffle(classmates);

  let i = 0;
  const interval = setInterval(() => {
    if (i >= classmates.length) {
      clearInterval(interval);
      return;
    }

    const st = classmates[i];
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
    container.appendChild(card);

    i++;
  }, 0); // 0ms = run as fast as possible without freezing UI
} else {
  container.innerHTML = `<p>No classmates found.</p>`;
  }


  
};

renderClassmates();

// ==============================
// Render team (static)
// ==============================
window.renderTeam = function () {
  const container = document.getElementById("teamContainer");
  container.innerHTML = "";
  const team = shuffle([
  {
    fullName: "Abdullahi Yahaya",
    regNo: "CST22NDEV2550",
    phone: "09162820838",
    gender: "Male",
    photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
  },
  {
    fullName: "Umar Abdulrahman Mustapha",
    regNo: "CST22NDEV2554",
    phone: "09161177782",
    gender: "Male",
    photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
  },
  {
    fullName: "Aminu Mubarak",
    regNo: "CST22NDEV2558",
    phone: "08169550626",
    gender: "Male",
    photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
  },
  {
    fullName: "Bashir Fatima Adam",
    regNo: "CST22NDEV2565",
    phone: "08116500931",
    gender: "Female",
    photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
  },
  {
    fullName: "Peter Favour Love",
    regNo: "CST22NDEV2557",
    phone: "08116500931",
    gender: "Female",
    photo: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
  },
]);
  console.log(team)
/*
  team.forEach((st) => {
    const card = document.createElement("div");
    card.className = "student-card";
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
  */

  let i = 0;
function renderCard() {
  if (i >= team.length) return;

  const st = team[i];
  const card = document.createElement("div");
  card.className = "student-card";
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

  i++;
  requestAnimationFrame(renderCard);
}
requestAnimationFrame(renderCard);

  
};

// ==============================
// Register student
// ==============================
document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const reg = document.getElementById("reg").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const gender = document.getElementById("gender").value;
  const photo = document.getElementById("photo").files[0];

  if (!photo) return alert("Photo is required.");

  const reader = new FileReader();
  reader.onload = function () {
    const student = {
      fullName: name,
      regNo: reg,
      phone,
      gender,
      state: document.getElementById("state").value.trim(),
      lga: document.getElementById("lga").value.trim(),
      town: document.getElementById("town").value.trim(),
      address: document.getElementById("address").value.trim(),
      photo: reader.result,
    };

    // ✅ Save this student in localStorage for syncing
    localStorage.setItem("pendingStudent", JSON.stringify(student));

    alert("Student saved locally. Sync when online.");
    document.getElementById("studentForm").reset();
    showPage("home");
  };
  reader.readAsDataURL(photo);
});


// ==============================
// Update student
// ==============================
window.updateStudent = function () {
  const reg = document.getElementById("reg").value.trim();
  if (!reg) return alert("Reg No is required to update.");

  const studentIndex = classmates.findIndex((s) => s.regNo === reg);
  if (studentIndex === -1) {
    alert("No record found for that Reg No.");
    return;
  }

  const oldStudent = classmates[studentIndex];
  const updatedStudent = {
    fullName: document.getElementById("name").value.trim(),
    regNo: reg,
    phone: document.getElementById("phone").value.trim(),
    gender: document.getElementById("gender").value,
    state: document.getElementById("state").value.trim(),
    lga: document.getElementById("lga").value.trim(),
    town: document.getElementById("town").value.trim(),
    address: document.getElementById("address").value.trim(),
    photo: oldStudent.photo,
  };

  const photoInput = document.getElementById("photo");
  if (photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function () {
      updatedStudent.photo = reader.result;
      classmates[studentIndex] = updatedStudent;
      saveClassmates();
      alert("Update successful!");
      document.getElementById("studentForm").reset();
      renderClassmates();
      showPage("classmates");
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    classmates[studentIndex] = updatedStudent;
    saveClassmates();
    alert("Update successful!");
    document.getElementById("studentForm").reset();
    renderClassmates();
    showPage("classmates");
  }
};













// ==============================
// Map helpers with offline detection
// ==============================
const isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
const mapsBase = isIOS ? "http://maps.apple.com/" : "https://www.google.com/maps/";

// Helper to check internet connectivity
function isOnline() {
  return navigator.onLine;
}

// Optional: show a subtle message
function showOfflineMessage() {
  if (!document.getElementById("offline-message")) {
    const msg = document.createElement("div");
    msg.id = "offline-message";
    msg.textContent = "You are currently offline. Map features may not work.";
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

    setTimeout(() => {
      msg.remove();
    }, 5000); // hide after 5 seconds
  }
}

window.openPlace = function (address) {
  try {
    if (!isOnline()) {
      showOfflineMessage();
      return;
    }

    const q = encodeURIComponent(address);
    const url = isIOS ? `${mapsBase}?q=${q}` : `${mapsBase}search/?api=1&query=${q}`;
    window.open(url, "_blank");
  } catch (error) {
    console.warn("Unable to open place:", error);
  }
};

window.openDirections = function (address) {
  try {
    if (!isOnline()) {
      showOfflineMessage();
      return;
    }

    const destination = encodeURIComponent(address);

    if (!navigator.geolocation) {
      openDirectionsNoOrigin(destination);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const url = isIOS
            ? `${mapsBase}?saddr=${latitude},${longitude}&daddr=${destination}`
            : `${mapsBase}dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`;
          window.open(url, "_blank");
        } catch (innerError) {
          console.warn("Error opening directions with geolocation:", innerError);
          openDirectionsNoOrigin(destination);
        }
      },
      (err) => {
        console.warn("Geolocation failed or denied:", err);
        openDirectionsNoOrigin(destination);
      },
      { timeout: 5000 }
    );
  } catch (error) {
    console.warn("Unable to get directions:", error);
  }
};

function openDirectionsNoOrigin(destination) {
  try {
    if (!isOnline()) {
      showOfflineMessage();
      return;
    }

    const url = isIOS
      ? `${mapsBase}?daddr=${destination}`
      : `${mapsBase}dir/?api=1&destination=${destination}`;
    window.open(url, "_blank");
  } catch (error) {
    console.warn("Unable to open directions:", error);
  }
}

// Optional: Listen for connection changes
window.addEventListener("offline", showOfflineMessage);




