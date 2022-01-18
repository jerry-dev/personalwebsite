import HeroSection from '../herosection/HeroSection.js';
import AboutMe from '../aboutme/AboutMe.js';
import CallToAction from '../calltoaction/CallToAction.js';
import stylesheet from './homeview.css' assert { type: 'css' };
import viewAnimationStyleSheet from '../../stylesheets/viewAnimation.css' assert { type: 'css' };

export default class HomeView extends HTMLElement {
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
        const heroSection = document.createElement('hero-section');
        const aboutMe = document.createElement('about-me');
        const callToAction = document.createElement('call-to-action');

        this.shadowRoot.appendChild(heroSection);
        this.shadowRoot.appendChild(aboutMe);
        this.shadowRoot.appendChild(callToAction);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet, viewAnimationStyleSheet ];
    }
}

if (!window.customElements.get('home-view')) {
    window.customElements.define('home-view', HomeView)
}