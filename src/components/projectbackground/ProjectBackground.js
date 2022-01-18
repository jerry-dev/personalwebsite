import stylesheet from './projectbackground.css' assert { type: 'css' };

export default class ProjectBackground extends HTMLElement {
    static get observedAttributes() {
        return [ 'paragraph' ];
    }

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
        const heading = document.createElement('h3');
        const paragraph = document.createElement('p');

        heading.append('Project Background');

        heading.setAttribute('id', 'heading');
        paragraph.setAttribute('id', 'paragraph');

        paragraph.append(this.getAttribute('paragraph'));

        this.shadowRoot.appendChild(heading);
        this.shadowRoot.appendChild(paragraph);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

if (!window.customElements.get('project-background')) {
    window.customElements.define('project-background', ProjectBackground)
}