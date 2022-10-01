const profilePopup = document.querySelector('.popup_type_profile');
const uploadPopup = document.querySelector('.popup_type_upload');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit');
const newName = document.querySelector('.popup__input[name=login]');
const newJob = document.querySelector('.popup__input[name=job]');
const imageName = document.querySelector('.popup__input[name=postname]');
const imageSrc = document.querySelector('.popup__input[name=postsrc]');
const formSubmitProfile = profilePopup.querySelector('.popup__form');
const formSubmitUpload = uploadPopup.querySelector('.popup__form');
const closeButton = document.querySelectorAll('.popup__close');
const uploadButton = document.querySelector('.profile__add');
const cardTemplate = document.querySelector('.card-template');
const gallery = document.querySelector('.gallery__grid');
const galleryPopup = document.querySelector('.popup_type_enlarge');
const popupImage = galleryPopup.querySelector('.popup__enlarge-image');
const popupCaption = galleryPopup.querySelector('.popup__enlarge-caption');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  function render() {
    initialCards.forEach((item) => {
        const currentCard = addCard(item.name, item.link);
        gallery.append(currentCard);
    })
  }

  function addCard(name, link) {
    const currentCard = cardTemplate.content.cloneNode(true);
    const currentCardName = currentCard.querySelector('.card__caption');
    const currentCardImage = currentCard.querySelector('.card__image');
    currentCardName.textContent = name;
    currentCardImage.src = link;
    currentCardImage.alt = name;

    const deleteButton = currentCard.querySelector('.card__delete');
    deleteButton.addEventListener('click', evt => {evt.target.closest('.card').remove();});

    function handleEnlargePopup() {
      popupImage.src = link;
      popupCaption.textContent = name;
      galleryPopup.classList.remove('popup_hidden');
    }

    const buttonEnlarge = currentCard.querySelector('.card__image');
    buttonEnlarge.addEventListener('click', handleEnlargePopup);


    function handleLike() {
      likeButton.classList.toggle('card__like_active')
    }

    const likeButton = currentCard.querySelector('.card__like');
    likeButton.addEventListener('click', handleLike);


    return currentCard;
  }

  function uploadCard(evt) {
    evt.preventDefault();
    const card = addCard(imageName.value, imageSrc.value);
    gallery.prepend(card);
    closePopup(evt);
  }

function openPopup(evt) {
    if (evt.currentTarget == editButton) {
        profilePopup.classList.remove('popup_hidden');
        newName.value = profileName.textContent;
        newJob.value = profileJob.textContent;
    }
    if (evt.currentTarget == uploadButton) {
        uploadPopup.classList.remove('popup_hidden');
        imageName.value = '';
        imageSrc.value = '';
    }
}

function closePopup(evt) {
    evt.target.closest('.popup').classList.add('popup_hidden');
}

function savePopup(evt) {
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileJob.textContent = newJob.value;
}

editButton.addEventListener('click', openPopup);
formSubmitProfile.addEventListener('submit', savePopup);
formSubmitUpload.addEventListener('submit', uploadCard);
uploadButton.addEventListener('click', openPopup);
closeButton.forEach(x => {
    x.addEventListener('click', closePopup)    
});

render();