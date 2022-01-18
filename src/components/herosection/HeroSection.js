import stylesheet from './herosection.css' assert { type: 'css' };
import heroSectionData from './herosection.json' assert { type: 'json' };

export default class HeroSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.CSS();
        this.HTML();        
    }

    HTML() {
        const figure = document.createElement('figure');

        const heroSectionPicture = document.createElement('picture');
        heroSectionPicture.id = 'heroSectionPicture';

        const heroSectionMobileSource = document.createElement('source');
        heroSectionMobileSource.srcset = heroSectionData.images.mobile;
        heroSectionMobileSource.media = `(max-width: 576px)`;
        heroSectionMobileSource.type = `image/jpg`;
        heroSectionPicture.appendChild(heroSectionMobileSource);

        const heroSectionTabletSource = document.createElement('source');
        heroSectionTabletSource.srcset = heroSectionData.images.tablet;
        heroSectionTabletSource.media = `(max-width: 768px)`;
        heroSectionTabletSource.type = `image/jpg`;
        heroSectionPicture.appendChild(heroSectionTabletSource);

        const heroSectionDesktopFallback = document.createElement('img');
        heroSectionDesktopFallback.src = heroSectionData.images.desktop;
        heroSectionDesktopFallback.alt = heroSectionData.text.HeroImageAlt;
        heroSectionPicture.appendChild(heroSectionDesktopFallback);

        figure.appendChild(heroSectionPicture);

        const bioCaption = document.createElement('figcaption');
        bioCaption.id = 'bioCaption';

        const bioBoxInnerContainer = document.createElement('div');
        bioBoxInnerContainer.id = 'bioBoxInnerContainer';
        bioBoxInnerContainer.className = 'bioBoxInnerContainer';

        const miniBioText = document.createElement('p');
        miniBioText.id = 'miniBioText';
        miniBioText.textContent = heroSectionData.text.miniBio;

        const aboutMeBox = document.createElement('div');
        aboutMeBox.id = 'aboutMeBox';
        aboutMeBox.className = 'aboutMeBox';

        const downArrowButton = document.createElement('button');
        downArrowButton.type = 'button';
        downArrowButton.id = 'downArrowButton';
        downArrowButton.className = 'downArrowButton';
        downArrowButton.innerHTML = `<img alt="${heroSectionData.text.downArrowAlt}" src="${heroSectionData.icons.downArrow}"/>`;

        const aboutMeBoxText = document.createElement('p');
        aboutMeBoxText.id = 'aboutMeBoxText';
        aboutMeBoxText.className = 'aboutMeBoxText';
        aboutMeBoxText.textContent = 'ABOUT ME';

        aboutMeBox.appendChild(downArrowButton);
        aboutMeBox.appendChild(aboutMeBoxText);

        bioBoxInnerContainer.appendChild(miniBioText);
        bioCaption.appendChild(bioBoxInnerContainer);
        bioCaption.appendChild(aboutMeBox);

        figure.appendChild(bioCaption);
        this.shadowRoot.appendChild(figure);
    }
    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

if (!window.customElements.get('hero-section')) {
    window.customElements.define('hero-section', HeroSection)
}