import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(handleSubmit, popupSelector) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = super._popup.querySelector('form');
    }

    _setEventListeners = () => {
        super._setEventListeners();
        this._handleSubmit(this.form)
    }

    close = () => {
        super.close();
        this.form.reset();
    }
}