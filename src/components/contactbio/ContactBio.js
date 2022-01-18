import stylesheet from './contactbio.css' assert { type: 'css' };
import contactBioData from './contactbio.json' assert { type: 'json' };
import SocialLinks from '../sociallinks/SocialLinks.js';

export default class ContactBio extends HTMLElement {
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
        const title = document.createElement('h2');
        title.id = 'title';
        title.textContent = contactBioData.text.title;

        const detailsContainer = document.createElement('div');
        detailsContainer.id = 'detailsContainer';

        const paragraph = document.createElement('p');
        paragraph.id = 'paragraph';

        const reformattedText = contactBioData.text.bio.replace('hard-working', `hard${String.fromCharCode(8209)}working`);
        paragraph.textContent = reformattedText;

        const socialLinks = document.createElement('social-links');
        socialLinks.setAttribute('color-scheme-2', "");

        detailsContainer.appendChild(paragraph);
        detailsContainer.appendChild(socialLinks);

        this.shadowRoot.appendChild(title);
        this.shadowRoot.appendChild(detailsContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

if (!window.customElements.get('contact-bio')) {
    window.customElements.define('contact-bio', ContactBio)
}