function showInputError(formElement, inputElement, errorMessage, formObject) {
    const error = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formObject.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(formObject.errorClass);
}

function hideInputError(formElement, inputElement, formObject) {
    const error = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formObject.inputErrorClass);
    error.textContent = '';
    error.classList.remove(formObject.errorClass);
}

function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.checkValidity();
      })
}

function toggleButton(inputList, inputSubmitButton, formObject) {
    if(hasInvalidInput(inputList)) {
        inputSubmitButton.classList.add(formObject.inactiveButtonClass)
    } else {
        inputSubmitButton.classList.remove(formObject.inactiveButtonClass)
    }
    inputSubmitButton.disabled = hasInvalidInput(inputList);
}

function checkValidity(formElement, inputElement, formObject) {
    if (!inputElement.checkValidity()) {
        showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
    } else {
        hideInputError(formElement, inputElement, formObject);
    }
}

function setEventListeners(formElement, formObject) {
    const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
    const inputSubmitButton = formElement.querySelector(formObject.submitButtonSelector);

    toggleButton(inputList, inputSubmitButton, formObject);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, formObject);
            toggleButton(inputList, inputSubmitButton, formObject);
        })
    })
}

function enableValidation(formObject){
    const formList = Array.from(document.querySelectorAll(formObject.formSelector));
    formList.forEach((formElement) => setEventListeners(formElement, formObject));
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
})