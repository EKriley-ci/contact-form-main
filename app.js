// Récupérer tous les éléments HTML et les stocker dans des variables

const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const queryOptions = document.querySelectorAll('input[name="option"]');
const messageInput = document.getElementById('message');
const conditionInput = document.getElementById('condition');
const submitBtn = document.getElementById('submitBtn');
const erreur = document.querySelectorAll('.erreur');
const popupMessage = document.querySelector('.popup-message');

// Variables utiles pour les regex
const regexName = /^[a-zA-Z]+$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Fonction pour vérifier la validité de l'email
function validateEmail(email) {
    return regexEmail.test(email);
}

// Fonction pour vérifier la validité du nom et prénom
function validateName(name) {
    return regexName.test(name);
}

// Fonction pour vérifier si l'utilisateur a coché une option
function validateOptions() {
    let isChecked = false;

    // Parcours des radios pour vérifier leur statut
    queryOptions.forEach((radio) => {
        if (radio.checked) {
            isChecked = true;
        }
    });

        return isChecked;
    }
    
    // Fonction pour valider le formulaire
    function valideForm() {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        let isValid = true;
    
        // vérifie si le prénom est valide
        if (!validateName(firstName)) {
            erreur[0].style.display = 'block';
            firstNameInput.style.border = '1px solid red';
            firstNameInput.focus();
            isValid = false;
        } else {
            erreur[0].style.display = 'none';
            firstNameInput.style.border = '1px solid hsl(187, 24%, 22%)';
        }
    
        // vérifie si le nom est valide
        if (!validateName(lastName)) {
            erreur[1].style.display = 'block';
            lastNameInput.style.border = '1px solid red';
            isValid = false;
        } else {
            erreur[1].style.display = 'none';
            lastNameInput.style.border = '1px solid hsl(187, 24%, 22%)';
        }
    
        // vérifie si l'email est valide
        if (!validateEmail(email)) {
            erreur[2].style.display = 'block';
            emailInput.style.border = '1px solid red';
            isValid = false;
        } else {
            erreur[2].style.display = 'none';
            emailInput.style.border = '1px solid hsl(187, 24%, 22%)';
        }
    
        // vérifie si le message n'est pas vide
        if (message === "") {
            erreur[4].style.display = 'block';
            messageInput.style.border = '1px solid red';
            isValid = false;
        } else {
            erreur[4].style.display = 'none';
            messageInput.style.border = '1px solid hsl(187, 24%, 22%)';
        }
        
        // vérifie si l'utilisateur a coché une option
        if (!validateOptions()) {
            erreur[3].style.display = 'block';
            isValid = false;
        } else {
            erreur[3].style.display = 'none';
        }

        // vérifie si les conditions sont acceptées
        if (!conditionInput.checked) {
            erreur[5].style.display = 'block';
            isValid = false;
        } else {
            erreur[5].style.display = 'none';
        }
        return isValid;
    }

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    if(valideForm()) {
        // vidé tous les champs de saisir
        firstNameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        queryOptions.forEach((radio) => {
            radio.checked = false;
        });
        conditionInput.checked = false;
        // Afficher le message de succès

        popupMessage.style.display = 'block';
        setTimeout(() => {
            popupMessage.style.display = 'none';
        }, 3000);
    }else{
        popupMessage.style.display = 'none';
    }
});