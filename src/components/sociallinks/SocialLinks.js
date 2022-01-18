import stylesheet from './sociallinks.css' assert { type: 'css' };
import socialLinksData from './sociallinks.json' assert { type: 'json' };

export default class SocialLinks extends HTMLElement {
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
        const socialLinks = document.createElement('ul');
        socialLinks.setAttribute('id', 'socialLinks');

        const listElementOne = document.createElement('li');
        listElementOne.setAttribute('class', 'listElement');

        const githubLink = document.createElement('a');
        githubLink.setAttribute('href', socialLinksData.links.github);
        githubLink.setAttribute('target', '_blank');

        const githubIcon = document.createElement('img');
        githubIcon.setAttribute('src', socialLinksData.icons.github);
        githubIcon.setAttribute('alt', socialLinksData.text.githubAlt);
        githubLink.append(githubIcon);
        listElementOne.append(githubLink);

        const listElementTwo = document.createElement('li');
        listElementTwo.setAttribute('class', 'listElement');

        const twitterLink = document.createElement('a');
        twitterLink.setAttribute('href', socialLinksData.links.twitter);
        twitterLink.setAttribute('target', '_blank');


        const twitterIcon = document.createElement('img');
        twitterIcon.setAttribute('src', socialLinksData.icons.twitter);
        twitterIcon.setAttribute('alt', socialLinksData.text.twitterAlt);
        twitterLink.append(twitterIcon);
        listElementTwo.append(twitterLink);

        const listElementThree = document.createElement('li');
        listElementThree.className = 'listElement';

        const linkedInLink = document.createElement('a');
        linkedInLink.setAttribute('href', socialLinksData.links.linkedin);
        linkedInLink.setAttribute('target', '_blank');

        const linkedInIcon = document.createElement('img');
        linkedInIcon.setAttribute('src', socialLinksData.icons.linkedin);
        linkedInIcon.setAttribute('alt', socialLinksData.text.linkedinAlt);
        linkedInLink.append(linkedInIcon);
        listElementThree.append(linkedInLink);     

        socialLinks.appendChild(listElementOne);
        socialLinks.appendChild(listElementTwo);
        socialLinks.appendChild(listElementThree);

        this.shadowRoot.append(socialLinks);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

if (!window.customElements.get('social-links')) {
    window.customElements.define('social-links', SocialLinks)
}