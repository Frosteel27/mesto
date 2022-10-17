const formObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  };


function showInputError(formElement, inputElement, errorMessage,) {
    const error = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formObject.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(formObject.errorClass);
}

function hideInputError(formElement, inputElement,) {
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

function toggleButton(formElement) {
    const inputSubmitButton = formElement.querySelector(formObject.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));

    if(hasInvalidInput(inputList)) {
        inputSubmitButton.classList.add(formObject.inactiveButtonClass)
    } else {
        inputSubmitButton.classList.remove(formObject.inactiveButtonClass)
    }
    inputSubmitButton.disabled = hasInvalidInput(inputList);
}

function checkValidity(formElement, inputElement,) {
    if (!inputElement.checkValidity()) {
        showInputError(formElement, inputElement, inputElement.validationMessage,);
    } else {
        hideInputError(formElement, inputElement,);
    }
}

function setEventListeners(formElement,) {
    const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
    toggleButton(formElement,);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement,);
            toggleButton(formElement, );
        })
    })
}

function enableValidation(){
    const formList = Array.from(document.querySelectorAll(formObject.formSelector));
    formList.forEach((formElement) => setEventListeners(formElement, ));
}

enableValidation();