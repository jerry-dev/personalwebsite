import ProjectSummary from '../projectsummary/ProjectSummary.js';
import ProjectBackground from '../projectbackground/ProjectBackground.js';
import StaticPreviews from '../staticpreviews/StaticPreviews.js';
import ProjectNavigator from '../projectnavigator/ProjectNavigator.js';
import stylesheet from './projectdetail.css' assert { type: 'css' };
import sharedApplicationData from '../../data/sharedApplicationData.json' assert { type: 'json' };

export default class ProjectDetail extends HTMLElement {
    static get observedAttributes() {
        return [ 'project' ];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.projectIndex = 0;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.HTML();
        this.CSS();
    }

    HTML() {
        const imageBannerContainer = document.createElement('picture');
        imageBannerContainer.id = 'imageBannerContainer';

        const imageSource1 = document.createElement('source');
        const imageSource2 = document.createElement('source');
        const imageOutput = document.createElement('img');
        const projectSummary = document.createElement('project-summary');
        const projectBackground = document.createElement('project-background');
        const staticPreviews = document.createElement('static-previews');
        const projectNavigator = document.createElement('project-navigator');

        imageSource1.media = '(max-width: 768px)';
        imageSource1.type = 'image/jpg';
        imageSource2.media = '(max-width: 576px)';
        imageSource2.type = 'image/jpg';

        imageOutput.alt = 'Screenshots of the project';
        imageOutput.id = 'imageOutput';

        sharedApplicationData.portfolioItems.forEach((project, index) => {
            if (project.projectParameter === this.getAttribute('project')) {
                this.projectIndex = index;
                imageSource1.srcset = project.images.detail.heroTablet;
                imageSource2.srcset = project.images.detail.heroMobile;
                imageOutput.src = project.images.detail.heroDesktop;

                projectSummary.setAttribute('projectTitle', project.title);
                projectSummary.setAttribute('projectDescription', project.description);
                
                const projectType = project.projectType.join(" / ");
                const projectTechStack = project.techstack.join(" / ");

                projectSummary.setAttribute('projectType', projectType);
                projectSummary.setAttribute('techStack', projectTechStack);
                projectSummary.setAttribute('websiteLink', project.projectLinks.websiteLink);

                projectBackground.setAttribute('paragraph', project.background);

                staticPreviews.setAttribute('tabletImage1Source', project.images.detail.staticPreviewOneTablet);
                staticPreviews.setAttribute('mobileImage1Source', project.images.detail.staticPreviewOneMobile);
                staticPreviews.setAttribute('defaultImage1', project.images.detail.staticPreviewOneDesktop);
                
                staticPreviews.setAttribute('tabletImage2Source', project.images.detail.staticPreviewTwoTablet);
                staticPreviews.setAttribute('mobileimage2source', project.images.detail.staticPreviewTwoMobile);
                staticPreviews.setAttribute('defaultImage2', project.images.detail.staticPreviewTwoDesktop);

                let previousProject = 0;
                let nextProject = 1;

                (sharedApplicationData.portfolioItems[this.projectIndex - 1])
                    ? previousProject = sharedApplicationData.portfolioItems[this.projectIndex - 1].title
                    : previousProject = sharedApplicationData.portfolioItems[sharedApplicationData.portfolioItems.length - 1].title;

                (sharedApplicationData.portfolioItems[this.projectIndex + 1])
                    ? nextProject = sharedApplicationData.portfolioItems[this.projectIndex + 1].title
                    : nextProject = sharedApplicationData.portfolioItems[0].title;

                projectNavigator.setAttribute('previousProjectTitle', previousProject);
                projectNavigator.setAttribute('nextProjectTitle', nextProject);
            }
        });

        const backgroundAndPreviewContainer = document.createElement('div');
        backgroundAndPreviewContainer.id = 'backgroundAndPreviewContainer';
        backgroundAndPreviewContainer.appendChild(projectBackground);
        backgroundAndPreviewContainer.appendChild(staticPreviews);

        imageBannerContainer.appendChild(imageSource2);
        imageBannerContainer.appendChild(imageSource1);        
        imageBannerContainer.appendChild(imageOutput);

        this.shadowRoot.appendChild(imageBannerContainer);
        this.shadowRoot.appendChild(projectSummary);
        this.shadowRoot.appendChild(backgroundAndPreviewContainer);
        this.shadowRoot.appendChild(projectNavigator);
    }

    CSS() {
        this.shadowRoot.adoptedStyleSheets = [ stylesheet ];
    }
}

if (!window.customElements.get('project-detail')) {
    window.customElements.define('project-detail', ProjectDetail)
}