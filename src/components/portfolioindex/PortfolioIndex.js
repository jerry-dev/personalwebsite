import stylesheet from './portfolioindex.css' assert { type: 'css' };
import sharedApplicationData from '../../data/sharedApplicationData.json' assert { type: 'json' };
import ProjectPreview from '../projectpreview/ProjectPreview.js';

export default class PortfolioIndex extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.CSS();
        this.HTML();
    }

    HTML() {
        sharedApplicationData.portfolioItems.forEach((data, index) => {
            this.shadowRoot.appendChild( this.previewHydrator(data, index) );
        })
    }
    
    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }

    previewHydrator(data, index) {
        const position = (index % 2 === 0) ? 1 : 2;
        const projectPreview = document.createElement('project-preview');
        
        projectPreview.setAttribute('desktopIndexImage', data.images.portfolio.desktop);
        projectPreview.setAttribute('tabletIndexImage', data.images.portfolio.tablet);
        projectPreview.setAttribute('mobileIndexImage', data.images.portfolio.mobile);

        projectPreview.setAttribute('title', data.title);
        projectPreview.setAttribute('description', data.description);
        projectPreview.setAttribute('imagePosition', position);
        projectPreview.setAttribute('projectParameter', data.projectParameter);
        projectPreview.setAttribute('websiteLink', data.websiteLink);
        return projectPreview;
    }
}

if (!window.customElements.get('portfolio-index')) {
    window.customElements.define('portfolio-index', PortfolioIndex)
}