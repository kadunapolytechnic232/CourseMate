import { data } from "./classmates-data.js";
let classmates = JSON.parse(localStorage.getItem("classmates")) || data;

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

function saveClassmates() {
  localStorage.setItem("classmates", JSON.stringify(classmates));
}

document.querySelectorAll(".showPage").forEach((e) => {
  e.addEventListener("click", () => {
    let id = e.dataset.id;
    showPage(`${id}`);
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
      fullName: "Yahya Abdullahi",
      regNo: "CST22NDEV2550",
      phone: "09162820838",
      gender: "Male",
      photo:
        "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    },
    {
      fullName: "Bala Abdulsalam",
      regNo: "CST22NDEV2546",
      phone: "09131100280",
      gender: "Male",
      photo:
        "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    },
    {
      fullName: "Aliyu Muhammad Lawal",
      regNo: "CST22NDEV2618",
      phone: "08065691994",
      gender: "Male",
      photo:
        "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    },
    {
      fullName: "Faiza Adam",
      regNo: "CST22NDEV2675",
      phone: "08160306356",
      gender: "Female",
      photo:
        "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    },
    {
      fullName: "Hauwa`U Ashir",
      regNo: "CST22NDEV2488",
      phone: "07069141658",
      gender: "Female",
      photo:
        "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    },
  ]);

  console.log(team)

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
// Map helpers
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

