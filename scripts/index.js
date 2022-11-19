import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import { initialCards, formObject } from "./constants.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";


const popupList = document.querySelectorAll('.popup');
const popupUpload = document.querySelector('.popup_type_upload');
const popupProfile = document.querySelector('.popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const buttonEdit = document.querySelector('.profile__edit');
const newName = document.querySelector('.popup__input[name=name]');
const newJob = document.querySelector('.popup__input[name=job]');
const imageName = document.querySelector('.popup__input[name=postname]');
const imageSrc = document.querySelector('.popup__input[name=postsrc]');
const formSubmitProfile = popupProfile.querySelector('.popup__form');
const formSubmitUpload = popupUpload.querySelector('.popup__form');
const buttonUpload = document.querySelector('.profile__add');
const gallery = document.querySelector('.gallery__grid');
const popupEnlarge = document.querySelector('.popup_type_enlarge');


const handleProfilePopup = ([name, job]) => {
  new UserInfo({nameSelector:'.profile__name', jobSelector: '.profile__job'}).setUserInfo(name, job);
}

const handleEnlargePopup = (cardData, selector) => {
  new PopupWithImage(cardData, selector).open();
  new PopupWithImage(cardData, selector).setEventListeners();
}



// const handleUploadPopup = (form, {name, link}) => {
//   form.addEventListener('submit', (name, link) => (evt) => {
//     evt.preventDefault();
//     const assembledCard = new Card({name, link}).createCard();
//     defaultCards.addItem(assembledCard);
//   })
// }

const handleUploadPopup = ([name, link]) => {
  const assembledCard = new Card({name, link}).createCard();
  defaultCards.addItem(assembledCard);
}

new PopupWithForm(handleUploadPopup, '.popup_type_upload').setEventListeners();
buttonUpload.addEventListener('click', () => {
  new PopupWithForm(handleUploadPopup, '.popup_type_upload').open();
});

new PopupWithForm(handleProfilePopup, '.popup_type_profile').setEventListeners();
buttonEdit.addEventListener('click', () => {
  new PopupWithForm(handleProfilePopup, '.popup_type_profile').open();
  let newData = new UserInfo({nameSelector:'.profile__name', jobSelector: '.profile__job'}).getUserInfo();
  newName.value = newData.name;
  newJob.value = newData.job;
});

// function handleOpenProfilePopup() {
//   openPopup(popupProfile);
//   newName.value = profileName.textContent; 
//   newJob.value = profileJob.textContent;
// }

// function handleOpenUploadPopup() {
//   openPopup(popupUpload);
// }

// export function openEnlargePopup(cardData) {
//   popupEnlarge.querySelector('.popup__enlarge-image').src = cardData.link;
//   popupEnlarge.querySelector('.popup__enlarge-image').alt = cardData.name;
//   popupEnlarge.querySelector('.popup__enlarge-caption').textContent = cardData.name
//   openPopup(popupEnlarge);
// }

// function handleEscKey(evt) {
//     if(evt.key === 'Escape') {
//       const popupOpened = document.querySelector('.popup_opened')
//       closePopup(popupOpened);
//     }
//   }


// function openPopup(popupCurrent) {
//     popupCurrent.classList.add('popup_opened');
//     document.addEventListener('keydown', handleEscKey)
// }

// function closePopup(popupCurrent) {
//     popupCurrent.classList.remove('popup_opened');
//     document.removeEventListener('keydown', handleEscKey)
// }

// function savePopup(evt) {
//     evt.preventDefault();
//     profileName.textContent = newName.value;
//     profileJob.textContent = newJob.value;
//     closePopup(evt.target.closest('.popup'));
// }

// buttonEdit.addEventListener('click', handleOpenProfilePopup);
// formSubmitProfile.addEventListener('submit', savePopup);


// popupList.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
//       closePopup(popup);
//     }
//   })
// })

const defaultCards = new Section({items: initialCards, renderer:  (item) => {
  const assembledCard = new Card(item, handleEnlargePopup).createCard();
  defaultCards.addItem(assembledCard);
}}, '.gallery__grid');

// function uploadCard() {
//   const assembledCard = new Card({
//     name : imageName.value,
//     link : imageSrc.value
//   }).createCard();
//   defaultCards.addItem(assembledCard)
// };

// function renderCard(card) {
//   gallery.prepend(card);
// }

// function uploadCard(evt) {
//   evt.preventDefault();
//   renderCard(new Card({
//     name : imageName.value,
//     link : imageSrc.value
//   }).createCard())
//   closePopup(evt.target.closest('.popup'));
//   formSubmitUpload.reset();
//   new FormValidator(formSubmitUpload, formObject).enableValidation();
// }

// formSubmitUpload.addEventListener('submit', uploadCard);

// initialCards.forEach((item) => {  
//   renderCard(new Card(item).createCard())
// })

document.querySelectorAll(formObject.formSelector).forEach(formElement => {
  new FormValidator(formElement, formObject).enableValidation();
})

defaultCards.render();

// export {handleEscKey, gallery, popupEnlarge, openPopup}