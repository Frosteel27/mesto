import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {initialCards} from "./initial-cards.js"

const popupList = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupUpload = document.querySelector('.popup_type_upload');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const buttonEdit = document.querySelector('.profile__edit');
const newName = document.querySelector('.popup__input[name=name]');
const newJob = document.querySelector('.popup__input[name=job]');
const imageName = document.querySelector('.popup__input[name=postname]');
const imageSrc = document.querySelector('.popup__input[name=postsrc]');
const formSubmitProfile = popupProfile.querySelector('.popup__form');
const formSubmitUpload = popupUpload.querySelector('.popup__form');
const buttonClose = document.querySelectorAll('.popup__close');
const buttonUpload = document.querySelector('.profile__add');

const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

function openProfilePopup(popupCurrent) {
  openPopup(popupCurrent);
  newName.value = profileName.textContent; 
  newJob.value = profileJob.textContent;
}

function openUploadPopup(popupCurrent) {
  openPopup(popupCurrent);
}

export function handleEscKey(evt) {
    if(evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened')
      closePopup(popupOpened);
    }
  }


function openPopup(popupCurrent) {
    popupCurrent.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscKey)
}

function closePopup(popupCurrent) {
    popupCurrent.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscKey)
}

function savePopup(evt) {
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileJob.textContent = newJob.value;
    closePopup(evt.target.closest('.popup'));
}

buttonEdit.addEventListener('click', () => {openProfilePopup(popupProfile)});
formSubmitProfile.addEventListener('submit', savePopup);
buttonUpload.addEventListener('click', () => {openUploadPopup(popupUpload)});
buttonClose.forEach(x => {
    x.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')))    
});

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
})

function renderCards(evt) {
  evt.preventDefault();
  new Card({
    name : imageName.value,
    link : imageSrc.value
  }).render()
  closePopup(evt.target.closest('.popup'));
}

formSubmitUpload.addEventListener('submit', renderCards);

initialCards.forEach((item) => {
  new Card(item).render();
})

document.querySelectorAll(formObject.formSelector).forEach(formElement => {
  new FormValidator(formElement, formObject).enableValidation();
})
