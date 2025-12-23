document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    //event.preventDefault();

    // Récupérer les valeurs des champs
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const dateAnniversaire = document.getElementById("dateAnniversaire").value;
    const adresse = document.getElementById("adresse").value;

    // Réinitialiser les messages d'erreur
    document.getElementById("nomError").textContent = "";
    document.getElementById("prenomError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("dateAnniversaireError").textContent = "";
    document.getElementById("adresseError").textContent = "";

    // Validation côté JavaScript
    const nomRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    const prenomRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const adresseRegex = /^[A-Za-z0-9\s,.-]+$/;

    let isValid = true;

    if (!nomRegex.test(nom)) {
      document.getElementById("nomError").textContent = "Nom invalide";
      isValid = false;
    }
    if (!prenomRegex.test(prenom)) {
      document.getElementById("prenomError").textContent = "Prénom invalide";
      isValid = false;
    }
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent = "Email invalide";
      isValid = false;
    }
    if (!dateAnniversaire) {
      document.getElementById("dateAnniversaireError").textContent =
        "Date d'anniversaire invalide";
      isValid = false;
    }
    if (!adresseRegex.test(adresse)) {
      document.getElementById("adresseError").textContent = "Adresse invalide";
      isValid = false;
    }

    if (isValid) {
      // Stocker les informations dans le localStorage
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ nom, prenom, email, dateAnniversaire, adresse })
      );

      // Rediriger vers la page de compte
      //window.location.href = "compte.html";
    }
  });
