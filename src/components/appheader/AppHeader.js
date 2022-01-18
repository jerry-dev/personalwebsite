import stylesheet from './appheader.css' assert { type: 'css' };
import SiteNavigation from '../sitenavigation/SiteNavigation.js';
import MobileNavigationMenu from '../mobilenavigationmenu/MobileNavigationMenu.js';
import sharedApplicationData from '../../data/sharedApplicationData.json' assert { type: 'json' };
import appHeaderData from './appheader.json' assert { type: 'json' };

export default class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
        this.SCRIPTS();
    }

    HTML() {
        const innerContainer = document.createElement('div');
        innerContainer.setAttribute('id', 'innerContainer');

        const logo = document.createElement('img');
        logo.setAttribute('id', 'genericLogo');
        logo.setAttribute('src', sharedApplicationData.icons.logo);
        logo.setAttribute('alt', sharedApplicationData.text.logoAlt);

        const siteNavigation = document.createElement('site-navigation');
        siteNavigation.setAttribute('textcolor', 'colorscheme-1');

        const hamburgerMenuButton = document.createElement('button');
        hamburgerMenuButton.setAttribute('id', 'hamburgerMenuButton');
        hamburgerMenuButton.setAttribute('type', 'button');
        hamburgerMenuButton.setAttribute('data-state', 'idle');

        const hamburgerIdleMenuIcon = document.createElement('img');
        hamburgerIdleMenuIcon.setAttribute('id', 'hamburgerIdleMenuIcon');
        hamburgerIdleMenuIcon.setAttribute('src', appHeaderData.icons.hamburger);
        hamburgerIdleMenuIcon.setAttribute('alt', appHeaderData.text.hamburgerAlt);

        const hamburgerActiveMenuIcon = document.createElement('img');
        hamburgerActiveMenuIcon.setAttribute('id', 'hamburgerActiveMenuIcon');
        hamburgerActiveMenuIcon.setAttribute('src', appHeaderData.icons.close);
        hamburgerActiveMenuIcon.setAttribute('alt', appHeaderData.text.closeAlt);

        const mobileNavigationMenu = document.createElement('mobile-navigation-menu');
        mobileNavigationMenu.setAttribute('state', 'idle');

        hamburgerMenuButton.appendChild(hamburgerIdleMenuIcon);
        hamburgerMenuButton.appendChild(hamburgerActiveMenuIcon);

        innerContainer.appendChild(logo);
        innerContainer.appendChild(siteNavigation);
        innerContainer.appendChild(hamburgerMenuButton);
        innerContainer.appendChild(mobileNavigationMenu);

        this.shadowRoot.appendChild(innerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }

    SCRIPTS() {
        this.clickManager();
        this.keyPressManager();
        this.hydrateComponentAttributes('site-navigation', 'currentroute');
    }

    idLookUp(id) {
        return {
            hamburgerMenuButton: () => this.toggleMenu(),
        }[id]();
    }

    keyLookUp(key) {
        return {
            Escape: () => this.deactivateMenu(),
            Enter: () => this.toggleMenu(),
            ' ': () => this.toggleMenu(),
        }[key]();
    }

    clickManager() {
        this.shadowRoot.addEventListener('click', (event) => {
            const { id } = event.target;
            (id) ? this.idLookUp(id) : null;
        });
    }

    keyPressManager() {
        this.shadowRoot.addEventListener('keydown', (event) => {
            event.preventDefault();
            const { key } = event;
            (key) ? this.keyLookUp(key) : null;
        });
    }

    toggleMenu() {
        const hamburgerMenuButton = this.shadowRoot.getElementById('hamburgerMenuButton');

        (hamburgerMenuButton.getAttribute('data-state', 'idle') === 'idle')
            ? this.activateMenu()
            : this.deactivateMenu();
    }

    activateMenu() {
        const hamburgerMenuButton = this.shadowRoot.getElementById('hamburgerMenuButton');
        const mobileNavigationMenu = this.shadowRoot.querySelector('mobile-navigation-menu');

        window.addEventListener('resize', () => {
            if (window.innerWidth > 576) {
                this.deactivateMenu();
            }
        });

        hamburgerMenuButton.setAttribute('data-state', 'active');
        mobileNavigationMenu.setAttribute('state', 'visible');
    }

    deactivateMenu() {
        const hamburgerMenuButton = this.shadowRoot.getElementById('hamburgerMenuButton');
        const mobileNavigationMenu = this.shadowRoot.querySelector('mobile-navigation-menu');

        hamburgerMenuButton.setAttribute('data-state', 'idle');
        mobileNavigationMenu.setAttribute('state', 'hidden');
    }

    routeHydration(component, attribute) {
        const urlHref = window.location.href;
        const urlOrigin = window.location.origin;

        let param = urlHref.replace(urlOrigin, "").replace("/#/", "");
        const dynamicRoute = /portfolio\/[a-z]/i;
        (dynamicRoute.test(param)) ? param = param.replace(/portfolio\/.*/, 'portfolio') : null;
        this.shadowRoot.querySelector(component).setAttribute(attribute, param);
    }

    hydrateComponentAttributes(component, attribute) {
        this.routeHydration(component, attribute);
        window.addEventListener('popstate', () => {
            this.routeHydration(component, attribute);
        });
    }
}

window.customElements.define('app-header', AppHeader);