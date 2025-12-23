// Remplacez 'VOTRE_CLE_API' par votre clé API OpenWeatherMap
const WEATHER_API_KEY = '1d9fb53b2b3ae593f39b8fd98fdc4e11';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${WEATHER_API_KEY}&units=metric&lang=fr`;
const SWAPI_URL = 'https://swapi.tech/api/people/1/';

async function fetchData() {
    try {
        // Récupérer les données de SWAPI
        const starWarsResponse = await fetch(SWAPI_URL);
        const starWarsData = await starWarsResponse.json();
        //console.log(starWarsData);

        // Récupérer les données de OpenWeatherMap
        const weatherResponse = await fetch(WEATHER_API_URL);
        const weatherData = await weatherResponse.json();
        console.log(weatherData);

        // Construire le DOM pour afficher les informations de Star Wars
        const starWarsInfo = document.createElement('div');
        starWarsInfo.classList.add('info-box');
        starWarsInfo.innerHTML = `
            <h2>Personnage de Star Wars</h2>
            <p>Nom : ${starWarsData["result"]["properties"].name}</p>
            <p>Hauteur : ${starWarsData["result"]["properties"].height} cm</p>
            <p>Poids : ${starWarsData["result"]["properties"].mass} kg</p>
            <p>Couleur des cheveux : ${starWarsData["result"]["properties"].hair_color}</p>
            <p>Couleur des yeux : ${starWarsData["result"]["properties"].eye_color}</p>
        `;

        // Construire le DOM pour afficher les informations météo
        const weatherInfo = document.createElement('div');
        weatherInfo.classList.add('info-box');
        weatherInfo.innerHTML = `
            <h2>Météo à Paris</h2>
            <p>Température : ${weatherData.main.temp} °C</p>
            <p>Conditions : ${weatherData.weather[0].description}</p>
            <p>Humidité : ${weatherData.main.humidity} %</p>
            <p>Vitesse du vent : ${weatherData.wind.speed} m/s</p>
        `;

        // Ajouter les éléments au conteneur
        const infoContainer = document.getElementById('infoContainer');
        infoContainer.appendChild(starWarsInfo);
        infoContainer.appendChild(weatherInfo);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        alert("problemes")
    }
}

// Appeler la fonction pour récupérer les données
fetchData();
