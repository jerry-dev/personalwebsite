import stylesheet from './projectnavigator.css' assert { type: 'css' };
import projectNavigatorData from './projectnavigator.json' assert { type: 'json' };

export default class ProjectNavigator extends HTMLElement {
    static get observedAttributes() {
        return [ 'previousProjectTitle', 'nextProjectTitle' ];
    }

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
        const previousProjectLink = document.createElement('a');
        const nextProjectLink = document.createElement('a');
        
        previousProjectLink.setAttribute('href', `#/portfolio/${this.getAttribute('previousProjectTitle').toLowerCase()}`);
        nextProjectLink.setAttribute('href', `#/portfolio/${this.getAttribute('nextProjectTitle').toLowerCase()}`);

        previousProjectLink.setAttribute('class', 'projectLink');
        nextProjectLink.setAttribute('class', 'projectLink');

        previousProjectLink.setAttribute('data-navigo', '');
        nextProjectLink.setAttribute('data-navigo', '');

        const previousProjectLinkContentContainer = document.createElement('div');
        const nextProjectLinkContentContainer = document.createElement('div');

        previousProjectLinkContentContainer.setAttribute('class', 'projectContentContainer');
        nextProjectLinkContentContainer.setAttribute('class', 'projectContentContainer');

        previousProjectLinkContentContainer.setAttribute('id', 'previousProjectContentContainer');
        nextProjectLinkContentContainer.setAttribute('id', 'nextProjectContentContainer');

        const previousProjectTitle = document.createElement('h3');
        const nextProjectLinkTitle = document.createElement('h3');

        previousProjectTitle.setAttribute('class', 'projectTitle');
        nextProjectLinkTitle.setAttribute('class', 'projectTitle');

        previousProjectTitle.append(this.caseReformatter(this.getAttribute('previousProjectTitle')).replace("_(wip)", ""));
        nextProjectLinkTitle.append(this.caseReformatter(this.getAttribute('nextProjectTitle')).replace("_(wip)", ""));

        const previousProjectSubtitle = document.createElement('p');
        const nextProjectLinkSubtitle = document.createElement('p');

        previousProjectSubtitle.setAttribute('class', 'projectSubtitle');
        nextProjectLinkSubtitle.setAttribute('class', 'projectSubtitle');

        previousProjectSubtitle.textContent = 'Previous Project';
        nextProjectLinkSubtitle.textContent = 'Next Project';

        const previousProjectTitleAndSubtitleContentContainer = document.createElement('span');
        const nextProjectTitleAndSubtitleContentContainer = document.createElement('span');

        previousProjectTitleAndSubtitleContentContainer.setAttribute('class', 'titleAndSubtitleContentContainer');
        nextProjectTitleAndSubtitleContentContainer.setAttribute('class', 'titleAndSubtitleContentContainer');

        previousProjectTitleAndSubtitleContentContainer.setAttribute('id', 'previousProjectTitleSubtitleContentContainer');
        nextProjectTitleAndSubtitleContentContainer.setAttribute('id', 'nextProjectTitleSubtitleContentContainer');

        previousProjectTitleAndSubtitleContentContainer.appendChild(previousProjectTitle);
        nextProjectTitleAndSubtitleContentContainer.appendChild(nextProjectLinkTitle);

        const leftArrow = document.createElement('img');
        const rightArrow = document.createElement('img');

        leftArrow.setAttribute('class', 'navigationArrow');
        rightArrow.setAttribute('class', 'navigationArrow');

        leftArrow.setAttribute('id', 'leftArrow');
        rightArrow.setAttribute('id', 'rightArrow');

        leftArrow.setAttribute('src', projectNavigatorData.icons.leftArrow);
        rightArrow.setAttribute('src', projectNavigatorData.icons.rightArrow);

        leftArrow.setAttribute('alt', projectNavigatorData.text.leftArrowAlt);
        rightArrow.setAttribute('alt', projectNavigatorData.text.rightArrowAlt);

        previousProjectLinkContentContainer.appendChild(leftArrow);
        nextProjectLinkContentContainer.appendChild(rightArrow);

        previousProjectTitleAndSubtitleContentContainer.appendChild(previousProjectTitle);
        nextProjectTitleAndSubtitleContentContainer.appendChild(nextProjectLinkTitle);

        previousProjectTitleAndSubtitleContentContainer.appendChild(previousProjectSubtitle);
        nextProjectTitleAndSubtitleContentContainer.appendChild(nextProjectLinkSubtitle);

        previousProjectLinkContentContainer.appendChild(previousProjectTitleAndSubtitleContentContainer);
        nextProjectLinkContentContainer.appendChild(nextProjectTitleAndSubtitleContentContainer);

        previousProjectLink.appendChild(previousProjectLinkContentContainer);
        nextProjectLink.appendChild(nextProjectLinkContentContainer);

        this.shadowRoot.appendChild(previousProjectLink);
        this.shadowRoot.appendChild(nextProjectLink);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }

    caseReformatter(text) {
        let newText = ``;

        for (let i = 0; i < text.length; i++) {
            (i === 0)
                ? newText += text[i].toUpperCase()
                : newText += text[i].toLowerCase();
        }
        
        return newText;
    }
}

if (!window.customElements.get('project-navigator')) {
    window.customElements.define('project-navigator', ProjectNavigator)
}