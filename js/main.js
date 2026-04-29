/* =========================
   COMMIT 6
   DARK MODE + NAVBAR SCROLL
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const body = document.body;
  const navbar = document.querySelector(".navbar");

  /* =========================
     BOUTON DARK MODE
  ========================= */
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "btn btn-sm btn-outline-light ms-3";
  toggleBtn.id = "theme-toggle";
  toggleBtn.innerText = "🌙";

  const navContainer = document.querySelector(".navbar .container");
  navContainer.appendChild(toggleBtn);

  /* =========================
     RESTAURATION THEME
  ========================= */
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    enableDarkMode();
  }

  /* =========================
     CLICK TOGGLE
  ========================= */
  toggleBtn.addEventListener("click", function () {

    if (body.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }

  });

  /* =========================
     FUNCTIONS
  ========================= */
  function enableDarkMode() {
    body.classList.add("dark-mode");
    toggleBtn.innerText = "☀️";
    localStorage.setItem("theme", "dark");
  }

  function disableDarkMode() {
    body.classList.remove("dark-mode");
    toggleBtn.innerText = "🌙";
    localStorage.setItem("theme", "light");
  }

  /* =========================
     NAVBAR SCROLL
  ========================= */
  window.addEventListener("scroll", function () {

    if (window.scrollY > 40) {
      navbar.style.padding = "10px 0";
      navbar.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
      navbar.style.background = "#111827";
    } else {
      navbar.style.padding = "18px 0";
      navbar.style.boxShadow = "none";
      navbar.style.background = "";
    }

  });

});