import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(handleSubmit, popupSelector) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('form');
    }

    _getInputValues() {
        this._formInputs = Array.from(this._form.querySelectorAll('input'));
        this._inputValues = this._formInputs.map((input) => {return input.value});

        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
            this.close();
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}