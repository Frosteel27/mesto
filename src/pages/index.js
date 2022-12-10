import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
   initialCards, 
   formObject, 
   buttonEdit, 
   newName, 
   newJob, 
   buttonUpload, 
   buttonAvatar
  } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import './index.css';

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  token: '6be036db-04ca-4720-a099-747661651e0b'

})


const deleteCard = (card) => {
  console.log(card);
  api.deleteCard(card);
  card.delete();
  popupConfirmDelete.close();
}

const popupConfirmDelete = new PopupWithConfirmation(deleteCard, '.popup_type_confirm')
popupConfirmDelete.setEventListeners()

const userInfo = new UserInfo({nameSelector:'.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar'})
const handleProfilePopup = async ({name, job: about}) => {
  popupProfile.showLoading(true);
  await api.setUserInfo({name, about});
  userInfo.setUserInfo({name, about});
  popupProfile.showLoading(false);
  popupProfile.close();
  console.log(about);
}

const popupEnlarge = new PopupWithImage('.popup_type_enlarge');
popupEnlarge.setEventListeners();
const handleEnlargePopup = (cardData) => {
  popupEnlarge.open(cardData);
}

const handleAvatarPopup = async ({avatar}) => {
  document.querySelector('.profile__avatar').src = avatar;
  popupAvatar.showLoading(true);
  await api.setUserAvatar(avatar);
  popupAvatar.showLoading(false);
  popupAvatar.close();
}

const popupAvatar = new PopupWithForm(handleAvatarPopup, '.popup_type_avatar')
popupAvatar.setEventListeners();
buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
})

const assembleCard = (cardObject) => {
  const card = new Card(
            cardObject, 
            handleEnlargePopup, 
            '.card-template',
            userId, 
            () => {popupConfirmDelete.open(card)},
            async () => {
              const res = await api.putLike(card);
              card.countLikes(res.likes)
            },
            async () => {
              const res = await api.deleteLike(card)
              card.countLikes(res.likes)
            }
            );
  return card.createCard()
}

const handleUploadPopup = async(cardData) => {
  popupUpload.showLoading(true);
  const card = await api.uploadCard(cardData);
  popupUpload.showLoading(false);
  popupUpload.close();
  defaultCards.render(card)
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

const defaultCards = new Section((item) => {
  const assembledCard = assembleCard(item);
  defaultCards.addItem(assembledCard);
}, '.gallery__grid');

const [validatorProfile, validatorUpload, validatorAvatar] = Array.from(document.querySelectorAll(formObject.formSelector)).map(formElement => {
  return new FormValidator(formElement, formObject);
})

validatorProfile.enableValidation();
validatorUpload.enableValidation();
validatorAvatar.enableValidation();

Promise.all([api.getInintialCards(), api.getUserInfo()])
  .then(([initialCards, user])=> {
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user.avatar)
    userId = user._id;
    defaultCards.render(initialCards.reverse());
  })



