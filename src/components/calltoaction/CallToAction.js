import stylesheet from './calltoaction.css' assert { type: 'css' };
import callToActionData from './calltoaction.json' assert { type: 'json' };

export default class CallToAction extends HTMLElement {
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
        const ctaSentence = document.createElement('h3');
        ctaSentence.id = 'ctaSentence';
        ctaSentence.textContent = callToActionData.text.ctaSentence;

        const centerLine = document.createElement('span');
        centerLine.id = 'centerLine';

        const ctaLinkButton = document.createElement('a');
        ctaLinkButton.id = 'ctaLinkButton';
        ctaLinkButton.textContent = 'CONTACT ME'
        ctaLinkButton.setAttribute('href', '#/contactme');

        const ctaLinkButtonContainer = document.createElement('div');
        ctaLinkButtonContainer.id = 'ctaLinkButtonContainer';

        ctaLinkButtonContainer.append(ctaLinkButton);
        this.shadowRoot.appendChild(ctaSentence);
        this.shadowRoot.appendChild(centerLine);
        this.shadowRoot.appendChild(ctaLinkButtonContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

if (!window.customElements.get('call-to-action')) {
    window.customElements.define('call-to-action', CallToAction)
}