import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(handleSubmit, popupSelector) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('form');
        this._formInputs = Array.from(this._form.querySelectorAll('input'));
        this._btnSubmit = this._popup.querySelector('.popup__submit');
        this._btnText = this._btnSubmit.textContent
    }

    _getInputValues() {
        this._inputValues = this._formInputs.reduce((object, target) => {
            const key = target.getAttribute('name');
            object[key] = target.value;
            return object;
        }, {})
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
            // this.close();
        })
    }

    showLoading(bool) {
        if(bool) {
            this._btnSubmit.textContent = 'Сохранение...';
        }else {
            this._btnSubmit.textContent = this._btnText;
        }
    }

    close() {
        super.close();
        this._form.reset();
    }
}