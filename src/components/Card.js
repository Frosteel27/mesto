export default class Card {
    constructor(cardData, handlePopup, templateSelector) {
        this._cardData = cardData
        this._handlePopup = handlePopup;
        this._template = document.querySelector(templateSelector);
    }

    _handleDelete() {
        this._element.remove();
        this._element = null;
    }

    _handleLike() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active')
    }


    _setEventListeners() {
        this._element.querySelector('.card__delete').addEventListener('click', () => this._handleDelete());

        this._element.querySelector('.card__like').addEventListener('click', () => this._handleLike())

        this._element.querySelector('.card__image').addEventListener('click', () => this._handlePopup(this._cardData))
    }

    createCard() {
        this._element = this._template.content.querySelector('.card').cloneNode(true);
        this._caption = this._element.querySelector('.card__caption');
        this._image = this._element.querySelector('.card__image');

        this._caption.textContent = this._cardData.name;
        this._image.src = this._cardData.link;
        this._image.alt = this._cardData.name;

        this._setEventListeners();

        return this._element;
    }
}