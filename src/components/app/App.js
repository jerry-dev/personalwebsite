import stylesheet from './app.css' assert { type: 'css' };
import AppHeader from '../appheader/AppHeader.js';
import HomeView from '../homeview/HomeView.js';
import PortfolioView from '../portfolioview/PortfolioView.js';
import ContactMeView from '../contactmeview/ContactMeView.js';
import AppFooter from '../appfooter/AppFooter.js';
import router from '../../lib/router/index.js';

export default class App extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
        this.routerInit();
    }

    render() {
        this.readyingUp();
        this.CSS();
        this.HTML();
    }

    HTML() {
        const mainRoute = document.createElement('output');
        mainRoute.setAttribute('id', 'mainRoute');

        const appInnerContainerLayer1 = document.createElement('div');
        appInnerContainerLayer1.setAttribute('id', 'appInnerContainer-layer-1');

        const appInnerContainerLayer2 = document.createElement('div');
        appInnerContainerLayer2.setAttribute('id', 'appInnerContainer-layer-2');

        const appHeader = document.createElement('app-header');
        const homeView = document.createElement('home-view');
        const appFooter = document.createElement('app-footer');

        mainRoute.appendChild(homeView);

        appInnerContainerLayer2.appendChild(appHeader);
        appInnerContainerLayer2.appendChild(mainRoute);
        
        appInnerContainerLayer1.appendChild(appInnerContainerLayer2);
        appInnerContainerLayer1.appendChild(appFooter);
 
        this.shadowRoot.appendChild(appInnerContainerLayer1);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }

    routerInit() {
        this.mainRoute = this.shadowRoot.querySelector('#mainRoute');

        router.on({
            '/': {
                as: 'home',
                uses: () => this.mainRoute.appendChild(document.createElement('home-view')),
                hooks: {
                    before: (done) => {
                        this.beforeNewViewRenderedOperations();
                        done();
                    },
                }
            },
            '/portfolio': {
                as: 'portfolio',
                uses: () => this.mainRoute.appendChild(document.createElement('portfolio-view')),
                hooks: {
                    before: (done) => {
                        this.beforeNewViewRenderedOperations();
                        this.enteredAtInnerPathOperations();
                        done();
                    },
                }
            },
            '/portfolio/:project': {
                uses: ({ data }) => {
                    if (!router.lastResolved()) {
                        router.navigate(`/portfolio`);
                        router.navigate(`/portfolio/${data.project}`);
                        this.shadowRoot.querySelector('app-header').hydrateComponentAttributes('site-navigation', 'currentroute');
                    } else {            
                        const productDetail = document.createElement('project-detail');
                        productDetail.setAttribute('project', data.project);
                        
                        this.mainRoute.querySelector('portfolio-view')
                            .shadowRoot.querySelector('#portfolioViewRoute')
                                .appendChild(productDetail);
                    }
                },
                hooks: {
                    before: (done) => {
                        if (router.lastResolved() && router.lastResolved()[0].url) {
                            const portfolioViewRoute = this.mainRoute.querySelector('portfolio-view')
                                .shadowRoot.querySelector('#portfolioViewRoute');
                            this.clearRoute(portfolioViewRoute);
                        }
                        this.jumpToTop();
                        done();
                    },
                }
            },
            '/contactme': {
                as: 'contactme',
                uses: () => this.mainRoute.appendChild(document.createElement('contact-me-view')),
                hooks: {
                    before: (done) => {
                        this.beforeNewViewRenderedOperations();
                        this.enteredAtInnerPathOperations();
                        done();
                    },
                }
            },
        })

        router.resolve();
    }

    clearRoute(route) {
        route.textContent = ``;
    }

    jumpToTop() {
        const topLevelContainer = this.shadowRoot.querySelector('#appInnerContainer-layer-1');
        
        window.scroll({
            top: topLevelContainer.offsetTop - 64,
            behavior: "auto"
        });
    }

    beforeNewViewRenderedOperations() {
        this.clearRoute(this.mainRoute);
        this.jumpToTop();
    }

    enteredAtInnerPathOperations() {
        if (!router.lastResolved()) {
            this.shadowRoot.querySelector('app-header').hydrateComponentAttributes('site-navigation', 'currentroute');
        }
    }

    readyingUp() {
        this.setAttribute('state', 'notReady');

        setTimeout(() => {
            this.setAttribute('state', 'isReady');
        }, 150);
    }
}

window.customElements.define('jerry-dormetus', App);