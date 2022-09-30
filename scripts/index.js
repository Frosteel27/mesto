const popup = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_profile');
const uploadPopup = document.querySelector('.popup_type_upload');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit');
const newName = document.querySelector('.popup__input[name=login]');
const newJob = document.querySelector('.popup__input[name=job]');
const formSubmit = document.querySelector('.popup__form');
const closeButton = document.querySelectorAll('.popup__close');
const uploadButton = document.querySelector('.profile__add');

function openPopup(evt) {
    console.log(evt.target)
    if (evt.currentTarget == editButton) {
        profilePopup.classList.remove('popup_hidden');
        newName.value = profileName.textContent;
        newJob.value = profileJob.textContent;
    }
    if (evt.currentTarget == uploadButton) {
        uploadPopup.classList.remove('popup_hidden');
    }
}

function closePopup(evt) {
    evt.target.closest('.popup').classList.add('popup_hidden');
}

function savePopup(evt) {
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileJob.textContent = newJob.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
formSubmit.addEventListener('submit', savePopup);
uploadButton.addEventListener('click', openPopup);
closeButton.forEach(x => {
    x.addEventListener('click', closePopup)    
});