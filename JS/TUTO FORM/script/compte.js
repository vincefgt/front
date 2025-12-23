function getParamsURL() {

    let varParams = {};

    let search = window.location.search.substring(1);

    console.info(search);

    let varSearch = search.split('&');

    console.info(varSearch);


    for(let i=0; i<varSearch.length; i++) {

        let parameter = varSearch[i].split('=');

        if (parameter[0] === "email") {
            parameter[1] = parameter[1].replaceAll('%40', '@');
        }

        if (parameter[0] === "adresse") {

            parameter[1] = parameter[1].replaceAll('+', ' ');
        }

        varParams[parameter[0]] = parameter[1].toUpperCase();
    }

    console.info(varParams);

    return varParams;
}


// Récupérer les informations de l'utilisateur depuis le localStorage
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

// si l'objet est bien présent dans le localstorage
// mise à jour des éléments html
if (userInfo) {
  document.getElementById("nom").textContent = userInfo.nom;
  document.getElementById("prenom").textContent = userInfo.prenom;
  document.getElementById("email").textContent = userInfo.email;
  document.getElementById("dateAnniversaire").textContent =
    userInfo.dateAnniversaire;
  document.getElementById("adresse").textContent = userInfo.adresse;
}

document.addEventListener("DOMContentLoaded", function() {

  let params = getParamsURL();

  console.dir(params);

  document.getElementById("nom").textContent = params.no
  +m;
  document.getElementById("prenom").textContent = params.prenom;
  document.getElementById("email").textContent = params.email;
  document.getElementById("dateAnniversaire").textContent = params.dateAnniversaire;
  document.getElementById("adresse").textContent = params.adresse;

})