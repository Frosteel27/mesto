class Card {
    static _template = document.querySelector('.card-template');
    static _gallery = document.querySelector('.gallery__grid');
    static _popup = document.querySelector('.popup_type_enlarge');

    constructor(imageName, imageSrc) {
        this._imageName = imageName;
        this._imageSrc = imageSrc;
    }

    _handleDelete = (evt) => {
        evt.target.closest('.card').remove();
    }

    _handleLike = (evt) => {
        evt.target.classList.toggle('card__like_active');
    }

    _handlePopup = () => {
        Card._popup.querySelector('.popup__enlarge-image').src = this._imageSrc;
        Card._popup.querySelector('.popup__enlarge-image').alt = this._imageName;
        Card._popup.querySelector('.popup__enlarge-caption').textContent = this._imageName
        Card._popup.classList.add('popup_opened');
        document.addEventListener('keydown', handleEscKey);
    }

    _setEventListeners = (card) => {
        card.querySelector('.card__delete').addEventListener('click', evt => this._handleDelete(evt));

        card.querySelector('.card__like').addEventListener('click', evt => this._handleLike(evt))

        card.querySelector('.card__image').addEventListener('click', this._handlePopup)
    }

    _createCard = (name, src) => {
        this._card = Card._template.content.cloneNode(true);
        this._cardImage = this._card.querySelector('.card__image');

        this._card.querySelector('.card__caption').textContent = name;
        this._cardImage.src = src;
        this._cardImage.alt = name;

        this._setEventListeners(this._card);

        return this._card;
    }

    render = () => {
        Card._gallery.append(this._createCard(this._imageName, this._imageSrc));
    }
}