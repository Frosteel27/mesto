import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards, formObject, buttonEdit, newName, newJob, buttonUpload } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css'

const userInfo = new UserInfo({nameSelector:'.profile__name', jobSelector: '.profile__job'})
const handleProfilePopup = ({name, job}) => {
  userInfo.setUserInfo(name, job);
}

const popupEnlarge = new PopupWithImage('.popup_type_enlarge');
popupEnlarge.setEventListeners();
const handleEnlargePopup = (cardData) => {
  popupEnlarge.open(cardData);
  
}

const assembleCard = ({name, link}) => {
  return new Card({name, link}, handleEnlargePopup, '.card-template').createCard()
}

const handleUploadPopup = (object) => {
  const assembledCard = assembleCard(object)
  defaultCards.addItem(assembledCard);
}


const popupUpload = new PopupWithForm(handleUploadPopup, '.popup_type_upload');
popupUpload.setEventListeners();
buttonUpload.addEventListener('click', () => {
  popupUpload.open();
  validatorUpload.enableValidation();
});

const popupProfile = new PopupWithForm(handleProfilePopup, '.popup_type_profile');
popupProfile.setEventListeners();
buttonEdit.addEventListener('click', () => {
  popupProfile.open();
  const newData = userInfo.getUserInfo();
  newName.value = newData.name;
  newJob.value = newData.job;
});

const defaultCards = new Section({items: initialCards, renderer:  (item) => {
  const assembledCard = assembleCard(item);
  defaultCards.addItem(assembledCard);
}}, '.gallery__grid');

const [validatorProfile, validatorUpload] = Array.from(document.querySelectorAll(formObject.formSelector)).map(formElement => {
  return new FormValidator(formElement, formObject);
})

validatorProfile.enableValidation();
validatorUpload.enableValidation()

defaultCards.render();