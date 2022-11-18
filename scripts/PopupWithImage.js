import Popup from "./Popup.js"

export default class PopupWithImage extends Popup{
    constructor(cardData, popupSelector){
        super(popupSelector);
        this._name = cardData.name;
        this._link = cardData.link;
    }

    open() {
        super.open();
        this._popup.querySelector('.popup__enlarge-image').src = this._link;
        this._popup.querySelector('.popup__enlarge-image').alt = this._name;
        this._popup.querySelector('.popup__enlarge-caption').textContent = this._name;
    }
}