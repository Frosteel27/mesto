import { handleEscKey } from "./index.js";

export class Card {
    static _template = document.querySelector('.card-template');
    static _gallery = document.querySelector('.gallery__grid');
    static _popup = document.querySelector('.popup_type_enlarge');

    constructor(cardData) {
        this._cardData = cardData
    }

    _handleDelete = (evt) => {
        evt.target.closest('.card').remove();
    }

    _handleLike = (evt) => {
        evt.target.classList.toggle('card__like_active');
    }

    _handlePopup = () => {
        Card._popup.querySelector('.popup__enlarge-image').src = this._cardData.link;
        Card._popup.querySelector('.popup__enlarge-image').alt = this._cardData.name;
        Card._popup.querySelector('.popup__enlarge-caption').textContent = this._cardData.name
        Card._popup.classList.add('popup_opened');
        document.addEventListener('keydown', handleEscKey);
    }

    _setEventListeners = (card) => {
        card.querySelector('.card__delete').addEventListener('click', evt => this._handleDelete(evt));

        card.querySelector('.card__like').addEventListener('click', evt => this._handleLike(evt))

        card.querySelector('.card__image').addEventListener('click', this._handlePopup)
    }

    _createCard = () => {
        const card = Card._template.content.cloneNode(true);
        card.querySelector('.card__caption').textContent = this._cardData.name;
        card.querySelector('.card__image').src = this._cardData.link;
        card.querySelector('.card__image').alt = this._cardData.name;

        this._setEventListeners(card);

        return card;
    }

    render = () => {
        Card._gallery.prepend(this._createCard())
    }
}