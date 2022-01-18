import styleSheet from './toastnotification.css' assert { type: 'css' };

export default class ToastNotification extends HTMLElement {
    static get observedAttributes() {
        return [ 'state', 'message' ];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue !== oldValue) {
            this[attrName] = this.hasAttribute(attrName);
        }
        
        this.attributeSync(attrName);
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        const innerText = document.createElement('p');
        innerText.id = 'innerText';
        innerText.textContent = this.getAttribute('message');

        this.shadowRoot.appendChild(innerText);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ styleSheet ];
    }

    attributeSync(attribute) {
        return {
            state: () => null,
            message: () => this.attributeMessageSync(),
        }[attribute]();
    }

    attributeMessageSync() {
        if (!this.shadowRoot || !this.shadowRoot.querySelector('#innerText')) return;
        
        this.shadowRoot.querySelector('#innerText').textContent = this.getAttribute('message');
    }
}

if (!window.customElements.get('toast-notification')) {
    window.customElements.define('toast-notification', ToastNotification)
}