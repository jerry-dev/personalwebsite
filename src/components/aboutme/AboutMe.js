import stylesheet from './aboutme.css' assert { type: 'css' };
import aboutMeData from './aboutme.json' assert { type: 'json' };

export default class AboutMe extends HTMLElement {
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
        const aboutMeInnerContainer = document.createElement('div');
        aboutMeInnerContainer.id = 'aboutMeInnerContainer';
        
        const portrait = document.createElement('picture');
        portrait.id = 'portrait';

        const mobilePortraitSource = document.createElement('source');
        mobilePortraitSource.srcset = aboutMeData.images.desktop.portrait;
        mobilePortraitSource.media = '(max-width: 576px)';
        mobilePortraitSource.type = 'image/jpg';
        portrait.appendChild(mobilePortraitSource);

        const tabletPortraitSource = document.createElement('source');
        tabletPortraitSource.srcset = aboutMeData.images.tablet.portrait;
        tabletPortraitSource.media = '(max-width: 768px)';
        tabletPortraitSource.type = 'image/jpg';
        portrait.appendChild(tabletPortraitSource);

        const desktopPortraitFallback = document.createElement('img');
        desktopPortraitFallback.src = aboutMeData.images.desktop.portrait;
        desktopPortraitFallback.alt = aboutMeData.text.portraitAlt;
        portrait.appendChild(desktopPortraitFallback);

        const bioContainer = document.createElement('div');
        const bioInnerContainer = document.createElement('div');

        bioContainer.id = 'bioContainer';
        bioInnerContainer.id = 'bioInnerContainer';

        portrait.className = 'aboutMeSection';
        bioContainer.className = 'aboutMeSection';

        const bioTitle = document.createElement('h2');
        bioTitle.id = 'bioTitle';
        bioTitle.textContent = aboutMeData.text.title;;

        const bioParagraph = document.createElement('p');
        bioParagraph.id = 'bioParagraph';
        bioParagraph.textContent = aboutMeData.text.bio;

        const goToPortfolioLinkButton = document.createElement('a');
        goToPortfolioLinkButton.id = 'goToPortfolioLinkButton';
        goToPortfolioLinkButton.textContent = 'GO TO PORTFOLIO';
        goToPortfolioLinkButton.setAttribute('href', '#/portfolio');

        const goToPortfolioLinkButtonContainer = document.createElement('div');
        goToPortfolioLinkButtonContainer.id = 'goToPortfolioLinkButtonContainer';

        bioInnerContainer.appendChild(bioTitle);
        bioInnerContainer.appendChild(bioParagraph);
        goToPortfolioLinkButtonContainer.appendChild(goToPortfolioLinkButton);
        bioInnerContainer.appendChild(goToPortfolioLinkButtonContainer);

        bioContainer.appendChild(bioInnerContainer);

        aboutMeInnerContainer.appendChild(portrait);
        aboutMeInnerContainer.appendChild(bioContainer);

        this.shadowRoot.append(aboutMeInnerContainer);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

if (!window.customElements.get('about-me')) {
    window.customElements.define('about-me', AboutMe)
}