import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(handleConfirm, popupSelector) {
        super(popupSelector);
        this._handleConfirm = handleConfirm;
        this._btnAccept = this._popup.querySelector('.popup__submit')
    }

    setEventListeners() {
        super.setEventListeners();

        this._btnAccept.addEventListener('click', () => {this._handleConfirm(this._item)})
    }

    open(item) {
        super.open();
        this._item = item;
    }
}