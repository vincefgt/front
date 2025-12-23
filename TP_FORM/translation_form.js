 // Animation de transition entre les formulaires HTML
        function slideToNextFormHTML(currentIndex, nextIndex) {
            const currentForm = document.getElementById(`form-${currentIndex}`);
            const nextForm = document.getElementById(`form-${nextIndex}`);
            
            // Afficher le nouveau formulaire
            nextForm.style.display = 'block';
            nextForm.style.transform = 'translateX(100%)';
            
            // Animer la sortie de l'ancien formulaire
            setTimeout(() => {
                currentForm.style.transform = 'translateX(-100%)';
                nextForm.style.transform = 'translateX(0)';
            }, 10);

            // Masquer l'ancien formulaire après l'animation
            setTimeout(() => {
                currentForm.style.display = 'none';
                currentForm.style.transform = 'translateX(0)';
            }, 600);
        }