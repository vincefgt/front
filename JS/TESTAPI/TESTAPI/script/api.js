
    const resultDiv = document.getElementById('result');
    const spinner = document.getElementById('spinner');

    // Affiche ou cache le spinner
    function toggleSpinner(show) {
      spinner.style.display = show ? 'block' : 'none';
    }

    // 1. Avec XMLHttpRequest
    function getWithXHR() {
      toggleSpinner(true);
      resultDiv.innerHTML = "Chargement avec XMLHttpRequest...";
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://swapi.dev/api/people/1/');
      xhr.onload = function() {
        toggleSpinner(false);
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          displayResult(data, "XMLHttpRequest");
        } else {
          resultDiv.innerHTML = `<p style="color: red;">Erreur : ${xhr.statusText}</p>`;
        }
      };
      xhr.onerror = function() {
        toggleSpinner(false);
        resultDiv.innerHTML = `<p style="color: red;">Erreur réseau.</p>`;
      };
      xhr.send();
    }

    // 2. Avec Fetch (version classique)
    function getWithFetch() {
      toggleSpinner(true);
      resultDiv.innerHTML = "Chargement avec Fetch...";
      fetch('https://swapi.dev/api/peojjple/1/')
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur réseau');
          }
          return response.json();
        })
        .then(data => {
          toggleSpinner(false);
          displayResult(data, "Fetch");
        })
        .catch(error => {
          toggleSpinner(false);
          resultDiv.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
        });
    }

    // 3. Avec Axios (version classique)
    function getWithAxios() {
      toggleSpinner(true);
      resultDiv.innerHTML = "Chargement avec Axios...";
      axios.get('https://swapi.dev/api/people/1/')
        .then(response => {
          toggleSpinner(false);
          displayResult(response.data, "Axios");
        })
        .catch(error => {
          toggleSpinner(false);
          resultDiv.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
        });
    }

    // 4. Avec async/await (Fetch et Axios)
    async function getFilmWithAsyncAwait() {
      toggleSpinner(true);
      resultDiv.innerHTML = "Chargement du film avec async/await...";
      try {
        // Version Fetch
        const response = await fetch('https://swapi.dev/api/films/1/');
        if (!response.ok) throw new Error('Erreur réseau');
        const filmData = await response.json();

        // Version Axios (décommenter pour tester)
        // const { data: filmData } = await axios.get('https://swapi.dev/api/films/1/');

        toggleSpinner(false);
        displayFilmResult(filmData, "async/await");
      } catch (error) {
        toggleSpinner(false);
        resultDiv.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
      }
    }

    // Fonction pour afficher le résultat d'un personnage
    function displayResult(data, method) {
      resultDiv.innerHTML = `
        <h3>Données récupérées avec ${method} :</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
        <h4>Informations sur le personnage :</h4>
        <p><strong>Nom :</strong> ${data.name}</p>
        <p><strong>Taille :</strong> ${data.height} cm</p>
        <p><strong>Poids :</strong> ${data.mass} kg</p>
        <p><strong>Couleur des cheveux :</strong> ${data.hair_color}</p>
      `;
    }

    // Fonction pour afficher le résultat d'un film
    function displayFilmResult(data, method) {
      resultDiv.innerHTML = `
        <h3>Données du film récupérées avec ${method} :</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
        <h4>Informations sur le film :</h4>
        <p><strong>Titre :</strong> ${data.title}</p>
        <p><strong>Réalisateur :</strong> ${data.director}</p>
        <p><strong>Date de sortie :</strong> ${data.release_date}</p>
        <p><strong>Résumé :</strong> ${data.opening_crawl}</p>
      `;
    }