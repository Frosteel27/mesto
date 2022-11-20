export default class FormValidator {
    constructor (formElement, formObject) {
        this._formElement = formElement;
        this._formObject = formObject;
        this._inputElements = Array.from(this._formElement.querySelectorAll(this._formObject.inputSelector))
        this._submitButton = this._formElement.querySelector(this._formObject.submitButtonSelector)
    }
    
    _showInputError(input, errorMessage)  {
        const error = this._formElement.querySelector(`.${input.id}-error`);
        input.classList.add(this._formObject.inputErrorClass);
        error.textContent = errorMessage;
        error.classList.add(this._formObject.errorClass);
    }

    _hideInputError(input) {
        const error = this._formElement.querySelector(`.${input.id}-error`);
        input.classList.remove(this._formObject.inputErrorClass);
        error.textContent = '';
        error.classList.remove(this._formObject.errorClass);
    }

    _hasInvalidInput() {
        return this._inputElements.some((input) => {
            return !input.checkValidity();
          })
    }

    _toggleButton() {
        if(this._hasInvalidInput()) {
            this._submitButton.classList.add(this._formObject.inactiveButtonClass);
        } else {
            this._submitButton.classList.remove(this._formObject.inactiveButtonClass);
        }
        this._submitButton.disabled = this._hasInvalidInput();
    }

    _checkValidity(input) {
        if (!input.checkValidity()) {
            this._showInputError(input, input.validationMessage);
        } else {
            this._hideInputError(input)
        }
    }

    enableValidation() {
        this._toggleButton();
        this._inputElements.forEach(input => {
            input.addEventListener('input', () => {
                this._checkValidity(input);
                this._toggleButton();
            })
        })
    }
}