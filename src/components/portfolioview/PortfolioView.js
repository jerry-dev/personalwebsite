import stylesheet from './portfolioview.css' assert { type: 'css' };
import viewAnimationStyleSheet from '../../stylesheets/viewAnimation.css' assert { type: 'css' };
import PortfolioIndex from '../portfolioindex/PortfolioIndex.js';
import ProjectDetail from '../projectdetail/ProjectDetail.js';
import CallToAction from '../calltoaction/CallToAction.js';
import router from '../../lib/router/index.js';

export default class PortfolioView extends HTMLElement {
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
        const portfolioViewRoute = document.createElement('output');
        portfolioViewRoute.setAttribute('id', 'portfolioViewRoute');

        const portfolioIndex = document.createElement('portfolio-index');
        const callToAction = document.createElement('call-to-action');

        portfolioViewRoute.appendChild(portfolioIndex);

        this.shadowRoot.appendChild(portfolioViewRoute);
        this.shadowRoot.appendChild(callToAction);
    }
    
    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet, viewAnimationStyleSheet ];
    }
}

if (!window.customElements.get('portfolio-view')) {
    window.customElements.define('portfolio-view', PortfolioView)
}