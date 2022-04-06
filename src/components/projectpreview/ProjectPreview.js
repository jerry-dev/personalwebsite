import stylesheet from './projectpreview.css' assert { type: 'css' };
import router from '../../lib/router/index.js';

export default class ProjectPreview extends HTMLElement {
    static get observeredAttributes() {
        return [
            'desktopIndexImage',
            'tabletIndexImage',
            'mobileIndexImage',
            'title',
            'description',
            'imagePosition',
            'projectParameter'
        ];
    }

    constructor() {
        super()
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
        const imageBlock = document.createElement('picture');
        const tabletImageSource = document.createElement('source');
        const mobileImageSource = document.createElement('source');
        const defaultImageOutput = document.createElement('img');

        tabletImageSource.setAttribute('srcset', this.getAttribute('tabletIndexImage'));
        mobileImageSource.setAttribute('srcset', this.getAttribute('mobileIndexImage'));
        defaultImageOutput.setAttribute('src', this.getAttribute('desktopIndexImage'));

        mobileImageSource.setAttribute('media', '(max-width: 576px)');
        tabletImageSource.setAttribute('media', '(max-width: 768px)');
        defaultImageOutput.setAttribute('alt', `A preview image for the '${this.getAttribute('title')}' project`);

        tabletImageSource.setAttribute('type', 'image/jpg');
        mobileImageSource.setAttribute('type', 'image/jpg');
        defaultImageOutput.setAttribute('class', 'projectPreviewImage');
        imageBlock.setAttribute('class', 'imageBlock');

        imageBlock.appendChild(mobileImageSource);
        imageBlock.appendChild(tabletImageSource);        
        imageBlock.appendChild(defaultImageOutput);

        const descriptionBlock = document.createElement('div');
        const descriptionContainer = document.createElement('div');
        const title = document.createElement('h2');
        const descriptionParagraph = document.createElement('p');
        const viewProjectLink = document.createElement('a');

        descriptionBlock.setAttribute('id', 'descriptionBlock');

        title.append(this.getAttribute('title'));
        title.setAttribute('id', 'title');

        descriptionParagraph.innerHTML = this.getAttribute('description');
        console.log(this.getAttribute('description'))
        descriptionParagraph.setAttribute('id', 'descriptionParagraph');

        descriptionContainer.setAttribute('id', 'descriptionContainer');
        viewProjectLink.append('VIEW PROJECT');
        viewProjectLink.setAttribute('id', 'viewProjectLink');
        viewProjectLink.setAttribute('data-navigo', '');
        viewProjectLink.setAttribute('href', `#/portfolio/${this.getAttribute('projectParameter')}`);

        descriptionContainer.appendChild(title);
        descriptionContainer.appendChild(descriptionParagraph);
        descriptionContainer.appendChild(viewProjectLink);

        descriptionBlock.appendChild(descriptionContainer);

        this.shadowRoot.appendChild(imageBlock);
        this.shadowRoot.appendChild(descriptionBlock);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

window.customElements.define('project-preview', ProjectPreview);
