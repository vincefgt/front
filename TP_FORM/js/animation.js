// step actualy
let currentFormStep = 0;

// Gestion du formulaire 1
submit.addEventListener('click', (e) => {
    e.preventDefault();
 try {
    if (currentFormStep === 0) {
        // 1e : passer au formulaire suivant
        if(validateForm(formArea1)){
        slideToNextFormHTML(0, 1);
        currentFormStep = 1;}
    } else if (currentFormStep === 1) {
        // 2e: valider
        openPrintModal();
    }
} catch {error}
});
// Stockage des données
const formData = {};
// Validation du formulaire
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        if (input.required && !input.value) {
            formGroup.classList.add('error');
            isValid = false;
        } else {
            formGroup.classList.remove('error');
        }
    });
    return isValid;
}
// Sauvegarder les données du formulaire
function saveFormData(form) {
    const formElements = form.elements;
    for (let element of formElements) {
        if (element.name && element.name !== '') {
            formData[element.name] = element.value;
        }
    }
}
// Fonction pour glisser vers le formulaire suivant
function slideToNextFormHTML(currentStep, nextStep) {
    const formArea1 = document.getElementById('formArea1');
    const formArea2 = document.getElementById('formArea2');
    if (currentStep === 0 && nextStep === 1) {
        // Attendre un court instant pour que le contenu soit chargé
        setTimeout(() => {
            // Animer formArea1 vers la gauche
            formArea1.style.transition = 'transform 0.6s ease-in-out';
            formArea1.style.transform = 'translateX(-100%)';

            // Animer formArea2 depuis la droite
            formArea2.style.transition = 'transform 0.6s ease-in-out';
            formArea2.style.transform = 'translateX(-100%)';
        }, 100);
        //lock formArea1
        document.getElementById('prenom').disabled = true;
        document.getElementById('nom').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('horaireStart').disabled = true;
        document.getElementById('horaireEnd').disabled = true;
        document.getElementById('openPickerBtn').disabled = true;
        document.getElementById('openPickerBtn').style.pointerEvents = 'none';

        // Changer le texte du bouton après l'animation
        const submitButton = document.getElementById('submit');
        setTimeout(() => {
            // Changer le texte dans les deux span-mother
            const spanMother1 = submitButton.querySelector('.span-mother');
            const spanMother3 = submitButton.querySelector('.span-mother2');
            if (spanMother1) {
                spanMother1.innerHTML = `
                    <span style="padding-right: 5px;">✦</span>
                    <span>V</span>
                    <span>a</span>
                    <span>l</span>
                    <span>i</span>
                    <span>d</span>
                    <span>e</span>
                    <span>r</span>
                `;
            }
            if (spanMother3) {
                spanMother3.innerHTML = `
                    <span>✦</span>
                    <span>V</span>
                    <span>a</span>
                    <span>l</span>
                    <span>i</span>
                    <span>d</span>
                    <span>e</span>
                    <span>r</span>
                `;
            }
        }, 600);
    }
}
const modalPrint = document.getElementById('modalPrint');
// Fonction pour ouvrir le modal d'impression
function openPrintModal() {
    if (overlay && modalPrint) {
        // Afficher l'overlay
        //overlay.style.display = 'block';
        overlay.classList.add('active');
        // Afficher le modal
        modalPrint.classList.remove('hidden');
        modalPrint.style.display = 'block';
        // Ajouter les événements aux boutons si ce n'est pas déjà fait
        setupPrintModalButtons();
    }
}
// Fonction pour configurer les boutons du modal d'impression
function setupPrintModalButtons() {
    const modalPrint = document.getElementById('modalPrint');
    const buttons = modalPrint.querySelectorAll('button');
    
    if (buttons.length >= 2) {
        // Bouton "Envoyer par email"
        buttons[0].onclick = function() {
            arrowMove();
            sendEmail();
        };
        
        // Bouton "Imprimer"
        buttons[1].onclick = function() {
            arrowMove();
            printForm();
        };
    }
}

// Fonction pour fermer le modal d'impression
function closePrintModal() {
    overlay.classList.remove('active');
    modalPrint.classList.add('hidden');
    modalPrint.style.display = 'none';
}

// Fonction pour envoyer par email
function sendEmail() {
    // Récupérer les données du formulaire
    const emailData = {
        nom: formData.nom || '',
        prenom: formData.prenom || '',
        email: formData.email || '',
        startDate: formData.startDate || document.getElementById('startDate').value || '',
        endDate: formData.endDate || document.getElementById('endDate').value || '',
        horaireStart: formData.horaireStart || '',
        horaireEnd: formData.horaireEnd || ''
    };

    // Créer le contenu de l'email
    const subject = encodeURIComponent('Demande d\'absence - ' + emailData.prenom + ' ' + emailData.nom);
    const body = encodeURIComponent(
        `Bonjour,\n\n` +
        `Demande d'absence pour :\n` +
        `Nom : ${emailData.nom}\n` +
        `Prénom : ${emailData.prenom}\n` +
        `Email : ${emailData.email}\n\n` +
        `Période : Du ${emailData.startDate} au ${emailData.endDate}\n` +
        (emailData.horaireStart && emailData.horaireEnd ? 
            `Horaires : De ${emailData.horaireStart} à ${emailData.horaireEnd}\n\n` : '\n') +
        `Cordialement`
    );
    
    // Ouvrir le client email
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    closePrintModal();
}

// Fonction pour imprimer
function printForm() {
    window.print();
    closePrintModal();
}

const button = document.getElementById("button");
const arrow = document.getElementById("arrow");
const progress = document.getElementById("progress");
const check = document.getElementById("check");

// Time for the download animation itself
let loadingTime = 1000;
let blocked = false;

function arrowMove() {
if(blocked) return;
  blocked = true;
  
  arrow.classList.add("animate-down");

  let percent = 0;
  let load = setInterval(() => {
    percent++;
    progress.style.height = percent + "%";
  }, loadingTime / 100);

  setTimeout(() => {
    clearInterval(load);
    // appiration cleck
    setTimeout(() => {
      progress.classList.remove("bg-white/20");
      progress.classList.add("bg-white/0");
      check.classList.remove("w-0");
      check.classList.add("w-10"); //size check

      // switch init 
      setTimeout(() => {
        check.classList.add("w-0");
        check.classList.remove("w-10");
        setTimeout(() => {
          reset();
        }, 500); //time appear arrow
      }, 5000); // time display check
    }, 500); // time display progress full
  }, loadingTime);
  closePrintModal();
};

function reset() {  
    progress.style.height = "0%";
    arrow.classList.remove("animate-down");

    setTimeout(() => {
    progress.classList.remove("bg-opacity-0");
    progress.classList.add("bg-opacity-20");
    blocked = false;
    }, 200)
}