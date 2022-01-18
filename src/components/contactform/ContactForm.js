import router from '../../lib/router/index.js';
import ToastNotification from '../toastnotification/ToastNotification.js';
import stylesheet from './contactform.css' assert { type: 'css' };
import contactFormData from './contactform.json' assert { type: 'json' };

export default class ContactForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
        this.SCRIPTS();
    }

    HTML() {
        const toastNotification = document.createElement('toast-notification');
        toastNotification.setAttribute('state', 'stand-by');
        toastNotification.setAttribute('message', '');

        const title = document.createElement('h2');
        title.id = 'title';
        title.textContent = `Contact Me`;

        const contactFormContainer = document.createElement('form');
        contactFormContainer.id = 'contactFormContainer';
        contactFormContainer.setAttribute('novalidate', '');

        const nameLabel = document.createElement('label');
        nameLabel.id = 'nameLabel';
        nameLabel.textContent = `Name`;
        nameLabel.htmlFor = `nameInput`;

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'nameInput';
        nameInput.className = 'formInput';
        nameInput.placeholder = 'Jane Appleseed';
        nameInput.setAttribute('required', '');
        nameInput.pattern = "[a-zA-Z ]+";
        nameInput.setAttribute('minlength', '6');
        nameInput.setAttribute('maxlength', '70');

        const nameInputErrorMessage = document.createElement('span');
        nameInputErrorMessage.dataset.state = 'idle';
        nameInputErrorMessage.className = 'errorMessage';
        nameInputErrorMessage.id = 'nameInputErrorMessage';

        const emailLabel = document.createElement('label');
        emailLabel.htmlFor = 'emailInput';
        emailLabel.id = 'emailLabel';
        emailLabel.textContent = `Email Address`;

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.id = 'emailInput';
        emailInput.className = 'formInput';
        emailInput.placeholder = 'example';
        emailInput.setAttribute('required', '');
        emailInput.pattern = "^[a-zA-Z0-9][a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.(com|net|dev|org|gov|edu|int|de|us|fr)$";
        emailInput.setAttribute('minlength', '8');
        emailInput.setAttribute('maxlength', '62');

        const emailInputErrorMessage = document.createElement('span');
        emailInputErrorMessage.dataset.state = 'idle';
        emailInputErrorMessage.className = 'errorMessage';
        emailInputErrorMessage.id = 'emailInputErrorMessage';

        const messageLabel = document.createElement('label');
        messageLabel.setAttribute('for', 'messageInput');
        messageLabel.setAttribute('id', 'messageLabel');
        messageLabel.append('Message');

        const messageInput = document.createElement('textarea');
        messageInput.setAttribute('cols', '30');
        messageInput.setAttribute('rows', '8');
        messageInput.setAttribute('id', 'messageInput');
        messageInput.setAttribute('class', 'formInput');
        messageInput.setAttribute('placeholder', 'How can I help?');
        messageInput.setAttribute('required', '');
        messageInput.setAttribute('minlength', '15');
        messageInput.setAttribute('maxlength', '150');

        const textAreaErrorMessage = document.createElement('span');
        textAreaErrorMessage.dataset.state = 'idle';
        textAreaErrorMessage.className = 'errorMessage';
        textAreaErrorMessage.id = 'textAreaErrorMessage';

        const sendMessageButton = document.createElement('button');
        sendMessageButton.setAttribute('id', 'sendMessageButton');
        sendMessageButton.setAttribute('type', 'submit');
        sendMessageButton.textContent = `SEND MESSAGE`;

        const nameSection = document.createElement('section');
        const emailSection = document.createElement('section');
        const messageSection = document.createElement('section');

        nameLabel.setAttribute('class', 'inputLabel');
        emailLabel.setAttribute('class', 'inputLabel');
        messageLabel.setAttribute('class', 'inputLabel');

        nameSection.setAttribute('class', 'inputSection');
        emailSection.setAttribute('class', 'inputSection');
        messageSection.setAttribute('class', 'inputSection');

        nameSection.appendChild(nameLabel);
        nameSection.appendChild(nameInput);
        nameSection.appendChild(nameInputErrorMessage);

        emailSection.appendChild(emailLabel);
        emailSection.appendChild(emailInput);
        emailSection.appendChild(emailInputErrorMessage);

        messageSection.appendChild(messageLabel);
        messageSection.appendChild(messageInput);
        messageSection.appendChild(textAreaErrorMessage);

        contactFormContainer.appendChild(nameSection);
        contactFormContainer.appendChild(emailSection);
        contactFormContainer.appendChild(messageSection);
        contactFormContainer.appendChild(sendMessageButton);

        this.shadowRoot.appendChild(title);
        this.shadowRoot.appendChild(contactFormContainer);
        this.shadowRoot.appendChild(toastNotification);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }

    SCRIPTS() {
        this.formManager();
    }

    formManager() {
        const theInputs = this.shadowRoot.querySelectorAll('.formInput');

        this.shadowRoot.addEventListener('submit', (event) => {
            event.preventDefault();
            theInputs.forEach((input) => {
                if (!input.validity.valid) {
                    return this.showAllErrors();
                }
                
                const name = this.shadowRoot.querySelectorAll('form .inputSection')[0].querySelector('input').value;
                const email = this.shadowRoot.querySelectorAll('form .inputSection')[1].querySelector('input').value;
                const message = this.shadowRoot.querySelectorAll('form .inputSection')[2].querySelector('textarea').value;

                const payload = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                    })
                };

                const toastNotification = this.shadowRoot.querySelector('toast-notification');

                if (toastNotification.getAttribute('state') === 'shown') {
                    toastNotification.setAttribute('state', 'stand-by');
                    toastNotification.setAttribute('message', '');
                }

                fetch(contactFormData.links.destination, payload)
                    .then(() => {
                        toastNotification.setAttribute('message', 'Message sent');
                        toastNotification.setAttribute('state', 'shown');
                        this.clearInputValues();
                    })
                    .catch((response) => {
                        console.error(response);
                        toastNotification.setAttribute('message', 'Something went wrong');
                        toastNotification.setAttribute('state', 'shown');
                        this.clearInputValues();
                    });
                });
            });

        const idLookUp = (id) => {
            return {
                nameInput: () => this.nameInputErrorManager(),
                emailInput: () => this.emailInputErrorManager(),
                messageInput: () => this.messageInputErrorManager()
            }[id]();
        }

        this.shadowRoot.addEventListener('input', (event) => {
            idLookUp(event.target.id);
        });
    }

    showAllErrors() {
        this.nameInputErrorManager();
        this.emailInputErrorManager();
        this.messageInputErrorManager();
    }

    nameInputErrorManager() {
        const nameInput = this.shadowRoot.querySelectorAll('form .inputSection')[0].querySelector('input');
        const nameError = this.shadowRoot.querySelectorAll('form .inputSection')[0].querySelector('span');

        if (nameInput.validity.valueMissing) {
            nameError.textContent = "Please enter a name.";
            nameError.dataset.state = `active`;
            return;
        } else if (nameInput.validity.typeMismatch) {
            nameError.textContent = "Please enter a valid name using the correct type of characters.";
            nameError.dataset.state = `active`;
            return;
        } else if (nameInput.validity.patternMismatch) {
            nameError.textContent = `Please do not use numeric characters nor special characters.`;
            nameError.dataset.state = `active`;
            return;
        } else if (nameInput.validity.tooShort) {
            nameError.textContent = `The name needs to be at least ${nameInput.minLength} characters long.`;
            nameError.dataset.state = `active`;
            return;
        } else if (nameInput.validity.tooLong) {
            nameError.textContent = `The maximum number of characters is ${nameInput.maxLength}. You are exceeding this.`;
            nameError.dataset.state = `active`;
            return;
        } else {
            nameError.textContent = "";
            nameError.dataset.state = `idle`;
        }
    }

    emailInputErrorManager() {
        const emailInput = this.shadowRoot.querySelectorAll('form .inputSection')[1].querySelector('input');
        const emailError = this.shadowRoot.querySelectorAll('form .inputSection')[1].querySelector('span');

        if (emailInput.validity.valueMissing) {
            emailError.textContent = "Please enter an email address.";
            emailError.dataset.state = `active`;
            return;
        } else if (emailInput.validity.typeMismatch) {
            emailError.textContent = "Please enter a valid email using the correct type of characters.";
            emailError.dataset.state = `active`;
            return;
        } else if (emailInput.validity.patternMismatch) {
            emailError.textContent = `Exluding the @ symbole and the period symbol where approapriate, please do not use special characters.`;
            emailError.dataset.state = `active`;
            return;
        } else if (emailInput.validity.tooShort) {
            emailError.textContent = `The email needs to be at least ${emailInput.minLength} characters long.`;
            emailError.dataset.state = `active`;
            return;
        } else if (emailInput.validity.tooLong) {
            emailError.textContent = `The maximum number of characters is ${emailInput.maxLength}. You are exceeding this.`;
            emailError.dataset.state = `active`;
            return;
        } else {
            emailError.textContent = "";
            emailError.dataset.state = `idle`;
        }
    }

    messageInputErrorManager() {
        const messageInput = this.shadowRoot.querySelectorAll('form .inputSection')[2].querySelector('textarea');
        const textAreaErrorMessage = this.shadowRoot.querySelectorAll('form .inputSection')[2].querySelector('span');

        if (messageInput.validity.valueMissing) {
            textAreaErrorMessage.textContent = "Please provide me with some details on how we can work together.";
            textAreaErrorMessage.dataset.state = `active`;
            return;
        } else if (messageInput.validity.tooShort) {
            textAreaErrorMessage.textContent = `The message needs to be at least ${messageInput.minLength} characters long.`;
            textAreaErrorMessage.dataset.state = `active`;
            return;
        } else if (messageInput.validity.tooLong) {
            textAreaErrorMessage.textContent = `The maximum number of characters is ${messageInput.maxLength}. You are exceeding this.`;
            textAreaErrorMessage.dataset.state = `active`;
            return;
        } else {
            textAreaErrorMessage.textContent = "";
            textAreaErrorMessage.dataset.state = `idle`;
        }
    }

    clearInputValues() {
        this.shadowRoot.querySelectorAll('form .inputSection')[0].querySelector('input').value = '';
        this.shadowRoot.querySelectorAll('form .inputSection')[1].querySelector('input').value = '';
        this.shadowRoot.querySelectorAll('form .inputSection')[2].querySelector('textarea').value = '';
    }


}

if (!window.customElements.get('contact-form')) {
    window.customElements.define('contact-form', ContactForm)
}