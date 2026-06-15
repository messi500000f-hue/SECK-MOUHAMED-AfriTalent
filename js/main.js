
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const navbar = document.querySelector(".navbar");

  if (navbar) {

    const toggleBtn = document.createElement("button");

    toggleBtn.id = "theme-toggle";
    toggleBtn.className = "btn btn-sm btn-outline-light ms-3";
    toggleBtn.textContent = "🌙";

    const navContainer = navbar.querySelector(".container");

    if (navContainer) {
      navContainer.appendChild(toggleBtn);
    }

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      enableDarkMode();
    }

    toggleBtn.addEventListener("click", () => {

      if (body.classList.contains("dark-mode")) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }

    });

    function enableDarkMode() {
      body.classList.add("dark-mode");
      toggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    }

    function disableDarkMode() {
      body.classList.remove("dark-mode");
      toggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }

  }

  if (navbar) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 40) {

        navbar.style.padding = "10px 0";
        navbar.style.boxShadow =
          "0 10px 20px rgba(0,0,0,0.08)";
        navbar.style.background = "#111827";

      } else {

        navbar.style.padding = "";
        navbar.style.boxShadow = "";
        navbar.style.background = "";

      }

    });

  }

  const fadeElements = document.querySelectorAll(
    "section, .card, img, .col-md-3, .col-md-4, .col-md-6"
  );

  fadeElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.8s ease";

  });

  const fadeObserver = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform =
            "translateY(0)";

        }

      });

    },

    {
      threshold: 0.15
    }

  );

  fadeElements.forEach((element) => {
    fadeObserver.observe(element);
  });

  const counters =
    document.querySelectorAll("[data-target]");

  const counterObserver = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target =
          parseInt(counter.dataset.target);

        let current = 0;

        const increment =
          Math.ceil(target / 80);

        function updateCounter() {

          current += increment;

          if (current < target) {

            counter.textContent = current;
            setTimeout(updateCounter, 25);

          } else {

            counter.textContent = target;

          }

        }

        updateCounter();

        counterObserver.unobserve(counter);

      });

    },

    {
      threshold: 0.5
    }

  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  const categoryFilter =
    document.getElementById("categoryFilter");

  const budgetFilter =
    document.getElementById("budgetFilter");

  const searchFilter =
    document.getElementById("searchFilter");

  const freelancerCards =
    document.querySelectorAll(".freelancer-card");

  function filterFreelancers() {

    if (!freelancerCards.length) return;

    const categoryValue =
      categoryFilter?.value || "all";

    const budgetValue =
      budgetFilter?.value || "all";

    const searchValue =
      searchFilter?.value.toLowerCase().trim() || "";

    freelancerCards.forEach((card) => {

      const category =
        card.dataset.category;

      const budget =
        parseInt(card.dataset.budget);

      const name =
        card.dataset.name.toLowerCase();

      const categoryMatch =
        categoryValue === "all" ||
        category === categoryValue;

      let budgetMatch = true;

      if (budgetValue === "low") {
        budgetMatch = budget < 100;
      }

      if (budgetValue === "mid") {
        budgetMatch =
          budget >= 100 &&
          budget <= 150;
      }

      if (budgetValue === "high") {
        budgetMatch = budget > 150;
      }

      const searchMatch =
        name.includes(searchValue);

      card.style.display =
        categoryMatch &&
        budgetMatch &&
        searchMatch
          ? "block"
          : "none";

    });

  }

  categoryFilter?.addEventListener(
    "change",
    filterFreelancers
  );

  budgetFilter?.addEventListener(
    "change",
    filterFreelancers
  );

  searchFilter?.addEventListener(
    "input",
    filterFreelancers
  );

  const form =
    document.getElementById("contactForm");

  if (!form) return;

  const nom =
    document.getElementById("nom");

  const prenom =
    document.getElementById("prenom");

  const email =
    document.getElementById("email");

  const sujet =
    document.getElementById("sujet");

  const message =
    document.getElementById("message");

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(input, text) {

    input.classList.add("is-invalid");

    const error =
      input.parentElement.querySelector(
        ".error-message"
      );

    if (error) {
      error.textContent = text;
    }

  }

  function clearError(input) {

    input.classList.remove("is-invalid");

    const error =
      input.parentElement.querySelector(
        ".error-message"
      );

    if (error) {
      error.textContent = "";
    }

  }

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    let isValid = true;

    [nom, prenom, email, sujet, message]
      .forEach(clearError);

    if (nom.value.trim().length < 2) {
      showError(nom, "Nom invalide");
      isValid = false;
    }

    if (prenom.value.trim().length < 2) {
      showError(prenom, "Prénom invalide");
      isValid = false;
    }

    if (
      !emailRegex.test(
        email.value.trim()
      )
    ) {
      showError(email, "Email invalide");
      isValid = false;
    }

    if (sujet.value === "") {
      showError(
        sujet,
        "Choisissez un sujet"
      );
      isValid = false;
    }

    if (
      message.value.trim().length < 10
    ) {
      showError(
        message,
        "Message trop court"
      );
      isValid = false;
    }

    if (isValid) {

      alert(
        "Message envoyé avec succès !"
      );

      form.reset();

    }

  });

});