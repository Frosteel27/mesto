import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards, formObject, buttonEdit, newName, newJob, buttonUpload } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css'

const handleProfilePopup = ([name, job]) => {
  new UserInfo({nameSelector:'.profile__name', jobSelector: '.profile__job'}).setUserInfo(name, job);
}

const handleEnlargePopup = (cardData, selector) => {
  new PopupWithImage(cardData, selector).open();
  new PopupWithImage(cardData, selector).setEventListeners();
}

const handleUploadPopup = ([name, link]) => {
  const assembledCard = new Card({name, link}, handleEnlargePopup).createCard();
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

const defaultCards = new Section({items: initialCards, renderer:  (item) => {
  const assembledCard = new Card(item, handleEnlargePopup).createCard();
  defaultCards.addItem(assembledCard);
}}, '.gallery__grid');

document.querySelectorAll(formObject.formSelector).forEach(formElement => {
  new FormValidator(formElement, formObject).enableValidation();
})

defaultCards.render();