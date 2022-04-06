import stylesheet from './projectsummary.css' assert { type: 'css' };

export default class ProjectSummary extends HTMLElement {
    static get observedAttributes() {
        return [
            'projectTitle',
            'projectDescription',
            'projectType',
            'techStack',
            'websiteLink'
        ];
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
        const containerOne = document.createElement('div');
        const containerTwo = document.createElement('div');

        containerOne.className = 'container';
        containerTwo.className = 'container';

        containerOne.id = 'containerOne';
        containerTwo.id = 'containerTwo';

        const projectTitle = document.createElement('h2');
        const projectDescriptionGeneral = document.createElement('p');
        const projectDescriptionTablet = document.createElement('p');
        const projectType = document.createElement('h4');
        const techStack = document.createElement('h4');
        const websiteLink = document.createElement('a');

        projectTitle.id = 'projectTitle';
        projectDescriptionGeneral.id ='projectDescriptionGeneral';
        projectDescriptionTablet.id = 'projectDescriptionTablet';
        projectDescriptionGeneral.className = 'projectDescription';
        projectDescriptionTablet.className = 'projectDescription';
        projectType.id = 'projectType';
        techStack.id = 'techStack';
        websiteLink.id = 'linkToProject';

        projectTitle.textContent = this.getAttribute('projectTitle').replace("_", " ");

        projectDescriptionGeneral.innerHTML = this.getAttribute('projectDescription');
        projectDescriptionTablet.innerHTML = this.getAttribute('projectDescription');
        projectType.textContent = this.getAttribute('projectType');
        techStack.textContent = this.getAttribute('techStack');

        websiteLink.textContent = 'VIEW WEBSITE';
        websiteLink.href = this.getAttribute('websiteLink');
        websiteLink.target = "_blank";

        containerOne.appendChild(projectTitle);
        containerOne.appendChild(projectDescriptionGeneral);
        containerOne.appendChild(projectType);
        containerOne.appendChild(techStack);
        containerOne.appendChild(websiteLink);

        containerTwo.appendChild(projectDescriptionTablet);

        this.shadowRoot.appendChild(containerOne);
        this.shadowRoot.appendChild(containerTwo);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

if (!window.customElements.get('project-summary')) {
    window.customElements.define('project-summary', ProjectSummary)
}