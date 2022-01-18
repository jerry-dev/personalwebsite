import SiteNavigation from '../sitenavigation/SiteNavigation.js';
import stylesheet from './mobilenavigationmenu.css' assert { type: 'css' };

export default class MobileNavigationMenu extends HTMLElement {
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
        const sitenavigation = document.createElement('site-navigation');
        sitenavigation.setAttribute('textcolor', 'colorscheme-2')
        this.shadowRoot.appendChild(sitenavigation);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

if (!window.customElements.get('mobile-navigation-menu')) {
    window.customElements.define('mobile-navigation-menu', MobileNavigationMenu)
}