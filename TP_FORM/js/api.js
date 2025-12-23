const resultDiv = document.getElementById('result');
const urlApi =  'https://vincefgt.github.io/JsonAPI/motif.json';
const urlLocal= 'https://127.0.0.1:5000/resources/motif.json';
// 4. Avec async/await 
async function loadMotifs() {
    try {
    // Version Fetch
    const response = await fetch(urlApi);
    if (!response.ok) throw new Error('Erreur réseau');
    const dataJson = await response.json();
    console.log(dataJson) //raw visualization in console
    generateMotifsForm(dataJson, "async/await");

    } catch (error) {
    resultDiv.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
    }
}
// Fonction pour générer le formulaire des motifs
function generateMotifsForm(motifs, method) {
    const formArea2 = document.getElementById('formArea2');
    
    let html = '<div class="sticky top-0 bg-white z-50"><h1 style="margin-bottom: 10px;">Modif de l\'absence</h1></div><div class="form-container" style="overflow-y:scroll; top:70px; height:85%;">';
    
    motifs.forEach((motif, index) => {
        html += `
            <div class="form-group motif-group">
                <label class="motif-title">${motif.title}</label>
        `;
        // Si le motif a des options
        if (motif.options && motif.options.length > 0) {
            html += '<div class="options-container">';
            motif.options.forEach(option => {
                const optionId = `${option.id}_${index}`;
                const label = option.label
                html += `
                    <div class="option-item">
                        <label for="${optionId}">${label}</label>
                        <input type="radio" id="${optionId}" name="motif" value="${option.id}"data-label="${label}" ${option.checked ? 'checked' : ''}></div>
                `;});
            html += '</div>';
        } else {
            // Pour les motifs sans options (comme Code 99)
            const motifId = `motif_${index}`;
            html += `
                <div class="option-item">
                    <label for="${motifId}">Sélectionner ce motif</label>
                    <input type="radio" id="${motifId}" name="motif" value="code_${index}"data-label="${motif.title}">
                </div>
            `;
        }
        html += '</div>';
    });
    html += `
        <div class="form-group">
            <label for="commentaire">Commentaire (optionnel)</label>
            <textarea 
                id="commentaire" 
                name="commentaire" 
                rows="4" 
                placeholder="Ajoutez des détails supplémentaires..."
                class="form-textarea"
            ></textarea>
        </div>`;
    html += '</div>';
    formArea2.innerHTML = html;
}
// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {loadMotifs();});
 /*   
// Ajouter l'événement pour le bouton retour
    document.getElementById('btnRetour').addEventListener('click', () => {
        // Retourner à la première colonne
        const rightColumn = document.querySelector('.right-column');
        if (rightColumn) {
            rightColumn.style.transform = 'translateX(0)';
        }
    });
    
    // Ajouter l'événement de soumission du formulaire
    formStep1.addEventListener('submit', handleFormSubmit);
}

// Fonction pour gérer la soumission du formulaire avec Axios
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Récupérer les données du premier formulaire
    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const horaireStart = document.getElementById('horaireStart').value;
    const horaireEnd = document.getElementById('horaireEnd').value;
    
    // Récupérer le motif sélectionné
    const motifSelectionne = document.querySelector('input[name="motif"]:checked');
    const commentaire = document.getElementById('commentaire').value;
    
    if (!motifSelectionne) {
        alert('Veuillez sélectionner un motif d\'absence');
        return;
    }
    
    // Créer l'objet avec toutes les données
    const formData = {
        prenom,
        nom,
        periode: {
            debut: startDate,
            fin: endDate
        },
        horaires: {
            debut: horaireStart,
            fin: horaireEnd
        },
        motif: {
            id: motifSelectionne.value,
            label: motifSelectionne.dataset.label || motifSelectionne.nextElementSibling.textContent
        },
        commentaire,
        dateEnvoi: new Date().toISOString()
    };
    
    console.log('Données du formulaire:', formData);
    
    try {
        // Envoyer les données au serveur avec Axios
        const response = await axios.post('/api/absence', formData, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000 // 5 secondes de timeout
        });
        
        console.log('Réponse du serveur:', response.data);
        
        // Afficher un message de succès
        alert('Formulaire d\'absence soumis avec succès !');
        
        // Réinitialiser les formulaires
        document.getElementById('formStep0').reset();
        document.getElementById('formStep1').reset();
        
        // Retourner à la première étape
        const rightColumn = document.querySelector('.right-column');
        if (rightColumn) {
            rightColumn.style.transform = 'translateX(0)';
        }
        
    } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        
        let errorMessage = 'Erreur lors de la soumission du formulaire.';
        
        if (error.response) {
            errorMessage = `Erreur ${error.response.status}: ${error.response.data.message || error.response.statusText}`;
        } else if (error.request) {
            errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
        }
        
        alert(errorMessage);
    }
} */
/*
// Si vous utilisez le système de navigation entre colonnes
//const formStep0 = document.getElementById('formStep0');
//if (formStep0) {
submit.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validation des champs
    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const horaireStart = document.getElementById('horaireStart').value;
    const horaireEnd = document.getElementById('horaireEnd').value;
    
    // Afficher les erreurs si nécessaire
    let hasError = false;
    if (!prenom) {
        document.querySelector('#prenom').parentElement.querySelector('.error-message').style.display = 'block';
        hasError = true;
    };
    if (!nom) {
        document.querySelector('#nom').parentElement.querySelector('.error-message').style.display = 'block';
        hasError = true;
    };
    if (!startDate && !endDate) {
        alert('Veuillez sélectionner une période');
        hasError = true;
    };
    if (!horaireStart || !horaireEnd) {
        document.querySelector('.time-range').parentElement.querySelector('.error-message').style.display = 'block';
        hasError = true;
    };
    
    if (hasError) {return;
    } else {
    // Assurez-vous que les motifs sont chargés
    if (document.getElementById('formStep1').innerHTML.trim() === '') {loadMotifs();}
    // Naviguer vers la colonne suivante
    slideToNextFormHTML(0, 1)
    };
});
//}*/

