let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let editButton = document.querySelector('.profile__edit');
let newName = document.querySelector('.popup__input[name=login]');
let newJob = document.querySelector('.popup__input[name=job]');
let formSubmit = document.querySelector('.popup__form');
let closeButton = document.querySelector('.popup__close');

newName.textContent = profileName.textContent

function togglePopup() {
    popup.classList.toggle('popup_hidden');
    newName.value = profileName.textContent;
    newJob.value = profileJob.textContent;
}

function savePopup(evt) {
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileJob.textContent = newJob.value;
    togglePopup();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
formSubmit.addEventListener('submit', savePopup)