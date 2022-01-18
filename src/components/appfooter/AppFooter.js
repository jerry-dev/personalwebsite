import stylesheet from './appfooter.css' assert { type: 'css' };
import SiteNavigation from '../sitenavigation/SiteNavigation.js';
import SocialLinks from '../sociallinks/SocialLinks.js';
import sharedApplicationData from '../../data/sharedApplicationData.json' assert { type: 'json' };


export default class AppFooter extends HTMLElement {
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
        const appFooterInnerContainer = document.createElement('div');
        appFooterInnerContainer.id = 'appFooterInnerContainer';

        const logo = document.createElement('img');
        logo.id = 'genericLogo';
        logo.setAttribute('src', sharedApplicationData.icons.logo);
        logo.setAttribute('alt', sharedApplicationData.text.logoAlt);

        const siteNavigation = document.createElement('site-navigation');
        siteNavigation.setAttribute('textColor', 'colorscheme-2');

        const socialLinks = document.createElement('social-links');

        appFooterInnerContainer.appendChild(logo);
        appFooterInnerContainer.appendChild(siteNavigation);
        appFooterInnerContainer.appendChild(socialLinks);
        this.shadowRoot.append(appFooterInnerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

if (!window.customElements.get('app-footer')) {
    window.customElements.define('app-footer', AppFooter)
}