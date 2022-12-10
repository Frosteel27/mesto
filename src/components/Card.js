export default class Card {
    constructor(cardData, handlePopup, templateSelector, userId, handleDelete, handleLike, handleDislike) {
        this._cardData = cardData
        this._handlePopup = handlePopup;
        this._template = document.querySelector(templateSelector);
        this._userId = userId;
        this._handleDelete = handleDelete;
        this._handleLike = handleLike;
        this._handleDislike = handleDislike;
    }

    delete() {
        this._element.remove();
        this._element = null;

    }

    _handleLikeClick() {
        if(this._btnLike.classList.contains('card__like-button_active')) {
            this._handleDislike();
        } else {
            this._handleLike();
        }
        this._btnLike.classList.toggle('card__like-button_active');
    }

    _checkUserLike() {
        this._likes.forEach(like => {
            if(like._id === this._userId) {
                this._btnLike.classList.add('card__like-button_active')
            } else {
                this._btnLike.classList.remove('card__like-button_active')
            }
        })
    }


    _setEventListeners() {
        this._btnDelete.addEventListener('click', () => this._handleDelete(this._cardData));

        this._btnLike.addEventListener('click', () => this._handleLikeClick())

        this._image.addEventListener('click', () => this._handlePopup(this._cardData))
    }

    _checkOwnership() {
        if(this._cardData.owner._id !== this._userId) {
            this._btnDelete.remove();
        }
    }

    countLikes(likes) {
        this._likeCounter.textContent = likes.length
    }

    createCard() {
        this._element = this._template.content.querySelector('.card').cloneNode(true);
        this._caption = this._element.querySelector('.card__caption');
        this._image = this._element.querySelector('.card__image');
        this._btnLike = this._element.querySelector('.card__like');
        this._btnDelete = this._element.querySelector('.card__delete');
        this._likeCounter = this._element.querySelector('.card__like-counter')

        this._caption.textContent = this._cardData.name;
        this._image.src = this._cardData.link;
        this._image.alt = this._cardData.name;
        this._id = this._cardData._id;
        this._likes = this._cardData.likes;
        

        this._setEventListeners();
        this._checkOwnership();
        this._checkUserLike();
        this.countLikes(this._likes);


        return this._element;
    }
}