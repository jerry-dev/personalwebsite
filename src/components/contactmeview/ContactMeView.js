import ContactBio from '../contactbio/ContactBio.js';
import ContactForm from '../contactform/ContactForm.js';
import styleSheet from './contactmeview.css' assert { type: 'css' };
import viewAnimationStyleSheet from '../../stylesheets/viewAnimation.css' assert { type: 'css' };

export default class ContactMeView extends HTMLElement {
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
    }

    HTML() {
        const contactBio = document.createElement('contact-bio');
        const contactForm = document.createElement('contact-form');

        this.shadowRoot.appendChild(contactBio);
        this.shadowRoot.appendChild(contactForm);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet, viewAnimationStyleSheet ];
    }
}

if (!window.customElements.get('contact-me-view')) {
    window.customElements.define('contact-me-view', ContactMeView)
}