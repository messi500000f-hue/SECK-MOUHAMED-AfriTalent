/* =========================
   COMMIT 8
   FILTER + FORM VALIDATION
========================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     FILTRAGE FREELANCES
  ========================= */
  const categoryFilter = document.getElementById("categoryFilter");
  const budgetFilter = document.getElementById("budgetFilter");
  const searchFilter = document.getElementById("searchFilter");
  const freelancerCards = document.querySelectorAll(".freelancer-card");

  function filterFreelancers() {

    if (!freelancerCards.length) return;

    const categoryValue = categoryFilter
      ? categoryFilter.value
      : "all";

    const budgetValue = budgetFilter
      ? budgetFilter.value
      : "all";

    const searchValue = searchFilter
      ? searchFilter.value.toLowerCase().trim()
      : "";

    freelancerCards.forEach(function(card){

      const category = card.dataset.category;
      const budget = parseInt(card.dataset.budget);
      const name = card.dataset.name;

      /* Catégorie */
      const categoryMatch =
        categoryValue === "all" ||
        category === categoryValue;

      /* Budget */
      let budgetMatch = true;

      if (budgetValue === "low") {
        budgetMatch = budget < 100;
      }

      if (budgetValue === "mid") {
        budgetMatch = budget >= 100 && budget <= 150;
      }

      if (budgetValue === "high") {
        budgetMatch = budget > 150;
      }

      /* Recherche */
      const searchMatch =
        name.includes(searchValue);

      /* Affichage */
      if (
        categoryMatch &&
        budgetMatch &&
        searchMatch
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  }

  if (categoryFilter) {
    categoryFilter.addEventListener(
      "change",
      filterFreelancers
    );
  }

  if (budgetFilter) {
    budgetFilter.addEventListener(
      "change",
      filterFreelancers
    );
  }

  if (searchFilter) {
    searchFilter.addEventListener(
      "input",
      filterFreelancers
    );
  }

  /* =========================
     FORM VALIDATION
  ========================= */
  const form = document.getElementById("contactForm");

  if (!form) return;

  const nom = document.getElementById("nom");
  const prenom = document.getElementById("prenom");
  const email = document.getElementById("email");
  const sujet = document.getElementById("sujet");
  const message = document.getElementById("message");

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(input, text){

    input.classList.add("is-invalid");

    const error =
      input.parentElement.querySelector(
        ".error-message"
      );

    if(error){
      error.textContent = text;
    }

  }

  function clearError(input){

    input.classList.remove("is-invalid");

    const error =
      input.parentElement.querySelector(
        ".error-message"
      );

    if(error){
      error.textContent = "";
    }

  }

  form.addEventListener("submit", function(e){

    e.preventDefault();

    let isValid = true;

    /* Reset */
    [
      nom,
      prenom,
      email,
      sujet,
      message
    ].forEach(clearError);

    /* Nom */
    if (
      nom.value.trim().length < 2
    ) {

      showError(
        nom,
        "Nom invalide"
      );

      isValid = false;
    }

    /* Prénom */
    if (
      prenom.value.trim().length < 2
    ) {

      showError(
        prenom,
        "Prénom invalide"
      );

      isValid = false;
    }

    /* Email */
    if (
      !emailRegex.test(
        email.value.trim()
      )
    ) {

      showError(
        email,
        "Email invalide"
      );

      isValid = false;
    }

    /* Sujet */
    if (
      sujet.value === ""
    ) {

      showError(
        sujet,
        "Choisissez un sujet"
      );

      isValid = false;
    }

    /* Message */
    if (
      message.value.trim().length < 10
    ) {

      showError(
        message,
        "Message trop court"
      );

      isValid = false;
    }

    /* Success */
    if (isValid) {

      alert(
        "Message envoyé avec succès !"
      );

      form.reset();

    }

  });

});