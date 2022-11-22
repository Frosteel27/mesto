import Popup from "./Popup.js"

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__enlarge-image');
        this._caption = this._popup.querySelector('.popup__enlarge-caption');
    }

    open(card) {
        this._image.src = card.link;
        this._image.alt = card.name;
        this._caption.textContent = card.name;
        super.open();
    }
}