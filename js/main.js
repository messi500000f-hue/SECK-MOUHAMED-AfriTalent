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

});/* =========================
   COMMIT 7
   COUNTERS + FADE IN
========================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     FADE IN ELEMENTS
  ========================= */
  const fadeElements = document.querySelectorAll(
    "section, .card, img, .col-md-4, .col-md-3, .col-md-6"
  );

  fadeElements.forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease";
  });

  const fadeObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

      if(entry.isIntersecting){
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }

    });

  },{
    threshold:0.15
  });

  fadeElements.forEach(function(el){
    fadeObserver.observe(el);
  });

  /* =========================
     COUNTERS
  ========================= */
  const counters = document.querySelectorAll("[data-target]");

  const counterObserver = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

      if(entry.isIntersecting){

        const counter = entry.target;
        const target = +counter.getAttribute("data-target");

        let start = 0;
        const speed = 25;

        const updateCounter = () => {

          start += Math.ceil(target / 80);

          if(start < target){
            counter.innerText = start;
            setTimeout(updateCounter, speed);
          }else{
            counter.innerText = target;
          }

        };

        updateCounter();
        counterObserver.unobserve(counter);

      }

    });

  },{
    threshold:0.5
  });

  counters.forEach(function(counter){
    counterObserver.observe(counter);
  });

});