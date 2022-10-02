const popupProfile = document.querySelector('.popup_type_profile');
const popupUpload = document.querySelector('.popup_type_upload');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const buttonEdit = document.querySelector('.profile__edit');
const newName = document.querySelector('.popup__input[name=login]');
const newJob = document.querySelector('.popup__input[name=job]');
const imageName = document.querySelector('.popup__input[name=postname]');
const imageSrc = document.querySelector('.popup__input[name=postsrc]');
const formSubmitProfile = popupProfile.querySelector('.popup__form');
const formSubmitUpload = popupUpload.querySelector('.popup__form');
const buttonClose = document.querySelectorAll('.popup__close');
const buttonUpload = document.querySelector('.profile__add');
const cardTemplate = document.querySelector('.card-template');
const gallery = document.querySelector('.gallery__grid');
const popupGallery = document.querySelector('.popup_type_enlarge');
const popupImage = popupGallery.querySelector('.popup__enlarge-image');
const popupCaption = popupGallery.querySelector('.popup__enlarge-caption');


  function render() {
    initialCards.forEach((item) => {
        const cardCurrent = addCard(item);
        gallery.append(cardCurrent);
    })
  }

  function addCard(cardData) {
    const cardCurrent = cardTemplate.content.cloneNode(true);
    const cardNameCurrent = cardCurrent.querySelector('.card__caption');
    const cardImageCurrent = cardCurrent.querySelector('.card__image');
    cardNameCurrent.textContent = cardData.name;
    cardImageCurrent.src = cardData.link;
    cardImageCurrent.alt = cardData.name;

    const buttonDelete = cardCurrent.querySelector('.card__delete');
    buttonDelete.addEventListener('click', evt => {evt.target.closest('.card').remove();});

    function handleEnlargePopup() {
      popupImage.src = cardData.link;
      popupImage.alt = cardData.name;
      popupCaption.textContent = cardData.name;
      popupGallery.classList.remove('popup_hidden');
    }

    const buttonEnlarge = cardCurrent.querySelector('.card__image');
    buttonEnlarge.addEventListener('click', handleEnlargePopup);

    const likeButton = cardCurrent.querySelector('.card__like');
    likeButton.addEventListener('click', () => {likeButton.classList.toggle('card__like_active')});


    return cardCurrent;
  }

  function uploadCard(evt) {
    evt.preventDefault();
    const cardData = {
      name: imageName.value,
      link: imageSrc.value
    }
    const card = addCard(cardData);
    gallery.prepend(card);
    closePopup(evt);
  }

function openPopup(popupCurrent) {
    popupCurrent.classList.remove('popup_hidden')
}

function closePopup(evt) {
    evt.target.closest('.popup').classList.add('popup_hidden');
}

function savePopup(evt) {
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileJob.textContent = newJob.value;
    closePopup(evt);
}

buttonEdit.addEventListener('click', () => {openPopup(popupProfile)});
formSubmitProfile.addEventListener('submit', savePopup);
formSubmitUpload.addEventListener('submit', uploadCard);
buttonUpload.addEventListener('click', () => {openPopup(popupUpload)});
buttonClose.forEach(x => {
    x.addEventListener('click', closePopup)    
});

render();
