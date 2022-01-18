import router from '../../lib/router/index.js';
import stylesheet from './sitenavigation.css' assert { type: 'css' };

export default class SiteNavigation extends HTMLElement {
    static get observedAttributes() {
        return [ 'currentroute' ];
    }

    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (newValue !== oldValue) {
            this[attrName] = this.hasAttribute(attrName);
        }

        this.attributeSync(attrName);
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
        const listOfLinks = document.createElement('ul');
        listOfLinks.setAttribute('class', `listOfLinks`);

        const listElementOne = document.createElement('li');
        const linkOne = document.createElement('a');
        linkOne.setAttribute('href', `#/`);
        linkOne.setAttribute('data-navigo', "");
        linkOne.append(`HOME`);
        listElementOne.appendChild(linkOne);

        const listElementTwo = document.createElement('li');
        const linkTwo = document.createElement('a');
        linkTwo.setAttribute('href', `#/portfolio`);
        linkTwo.setAttribute('data-navigo', "");
        linkTwo.append(`PORTFOLIO`);
        listElementTwo.appendChild(linkTwo);

        const listElementThree = document.createElement('li');
        const linkThree = document.createElement('a');
        linkThree.setAttribute('href', `#/contactme`);
        linkThree.setAttribute('data-navigo', "");
        linkThree.append(`CONTACT ME`);
        listElementThree.appendChild(linkThree);

        listOfLinks.appendChild(listElementOne);
        listOfLinks.appendChild(listElementTwo);
        listOfLinks.appendChild(listElementThree);

        this.shadowRoot.appendChild(listOfLinks);
    }

    CSS() {
		this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }

    SCRIPTS() {
        this.routeBaseTextHighlight();
    }

    routeBaseTextHighlight() {
        if (!this.shadowRoot || !this.shadowRoot.querySelectorAll('.listOfLinks li a')) return;

        const anchorsCollectionObject = document.querySelector('jerry-dormetus')
            .shadowRoot.querySelector('app-header')
            .shadowRoot.querySelector('site-navigation')
            .shadowRoot.querySelectorAll('.listOfLinks li a');

        for (let index = 0; index < anchorsCollectionObject.length; index++) {
            anchorsCollectionObject[index].style.color = '';
        }

        const hightlightColor = getComputedStyle(document.documentElement).getPropertyValue("--color-4");

        switch (this.getAttribute('currentroute')) {
            case 'portfolio':
                anchorsCollectionObject[1].style.color = hightlightColor;
                break;
            case 'contactme':
                anchorsCollectionObject[2].style.color = hightlightColor;
                break;
            default:
                anchorsCollectionObject[0].style.color = hightlightColor;
                break;
        }
    }

    attributeSync(attribute) {
        return {
            currentroute: () => this.routeBaseTextHighlight()
        }[attribute]();
    }

}

window.customElements.define('site-navigation', SiteNavigation);