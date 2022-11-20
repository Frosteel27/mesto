export default class Card {
    static _template = document.querySelector('.card-template');

    constructor(cardData, handlePopup) {
        this._cardData = cardData
        this._handlePopup = handlePopup;
    }

    _handleDelete(evt) {
        evt.target.closest('.card').remove();
    }

    _handleLike(evt) {
        evt.target.classList.toggle('card__like_active');
    }


    _setEventListeners(card) {
        card.querySelector('.card__delete').addEventListener('click', evt => this._handleDelete(evt));

        card.querySelector('.card__like').addEventListener('click', evt => this._handleLike(evt))

        card.querySelector('.card__image').addEventListener('click', () => this._handlePopup(this._cardData, '.popup_type_enlarge'))
    }

    createCard() {
        const card = Card._template.content.cloneNode(true);
        card.querySelector('.card__caption').textContent = this._cardData.name;
        card.querySelector('.card__image').src = this._cardData.link;
        card.querySelector('.card__image').alt = this._cardData.name;

        this._setEventListeners(card);

        return card;
    }
}