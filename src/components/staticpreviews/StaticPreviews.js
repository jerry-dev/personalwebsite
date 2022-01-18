import stylesheet from './staticpreviews.css' assert { type: 'css' };

export default class StaticPreviews extends HTMLElement {
    static get observedAttributes() {
        return [
            'tabletImage1Source',
            'mobileImage1Source',
            'defaultImage1',
            'tabletImage2Source',
            'mobileimage2source',
            'defaultImage2'
        ];
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

        const picture1 = document.createElement('picture');
        const tabletImage1Source = document.createElement('source');
        const mobileImage1Source = document.createElement('source');
        const defaultImage1 = document.createElement('img');
        
        const picture2 = document.createElement('picture');
        const tabletImage2Source = document.createElement('source');
        const mobileImage2Source = document.createElement('source');
        const defaultImage2 = document.createElement('img');

        heading.append('Static Previews');
        heading.setAttribute('id', 'heading');

        // Static preview 1 
        picture1.setAttribute('id', 'picture1');
        picture1.setAttribute('class', 'picture');
        
        tabletImage1Source.media = '(max-width: 768px)';
        tabletImage1Source.srcset = this.getAttribute('tabletImage1Source');
        tabletImage1Source.type = 'image/jpg';

        mobileImage1Source.media = '(max-width: 576px)';
        mobileImage1Source.srcset = this.getAttribute('mobileImage1Source');
        mobileImage1Source.type = 'image/jpg';

        defaultImage1.alt = 'Large layout screenshot of the application.';
        defaultImage1.id = 'defaultImage1';
        defaultImage1.className = 'previewImage';
        defaultImage1.src = this.getAttribute('defaultImage1');

        picture1.appendChild(mobileImage1Source);
        picture1.appendChild(tabletImage1Source);        
        picture1.appendChild(defaultImage1);
        

        // Static preview 2
        picture2.setAttribute('id', 'picture2');
        picture2.setAttribute('class', 'picture');

        tabletImage2Source.media = '(max-width: 768px)';
        tabletImage2Source.srcset = this.getAttribute('tabletImage2Source');
        tabletImage2Source.type = 'image/jpg';
        
        mobileImage2Source.media = '(max-width: 576px)';
        mobileImage2Source.srcset = this.getAttribute('mobileimage2source');
        mobileImage2Source.type = 'image/jpg';

        defaultImage2.setAttribute('alt', `Multiple screenshots of the application's mobile layout.`);
        defaultImage2.setAttribute('id', 'defaultImage2');
        defaultImage2.setAttribute('class', 'previewImage');
        defaultImage2.setAttribute('src', this.getAttribute('defaultImage2'));

        picture2.appendChild(mobileImage2Source);
        picture2.appendChild(tabletImage2Source);        
        picture2.appendChild(defaultImage2);

        this.shadowRoot.appendChild(heading);
        this.shadowRoot.appendChild(picture1);
        this.shadowRoot.appendChild(picture2);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

if (!window.customElements.get('static-previews')) {
    window.customElements.define('static-previews', StaticPreviews)
}