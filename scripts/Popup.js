export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }

    _handleEscClose = (evt) => {
        if(evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners = () => {
        document.addEventListener('keydown', this._handleEscClose)
        this._popup.addEventListener('mousedown', (evt) => {
            if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')){
                this.close();
            }})
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
}