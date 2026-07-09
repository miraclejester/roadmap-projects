import { projectData } from './projects.js';

function createProjectElement(project, root) {
    const aElement = document.createElement('a');
    aElement.href = `projects/${root}/${project.path}/index.html`;
    aElement.textContent = project.name;
    return aElement;
}

function createProjectSetElement(projectSet) {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('content-block');
    
    const setTitle = document.createElement('h2');
    setTitle.textContent = projectSet.title;
    mainDiv.appendChild(setTitle);
    
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('content-single-group');
    const groupElements = projectSet.projects.map((project) => createProjectElement(project, projectSet.root));
    groupDiv.append(...groupElements);
    mainDiv.append(groupDiv);
    
    return mainDiv;
}

const projectSetElements = projectData
    .map((projectSet) => createProjectSetElement(projectSet));

const projectSetContainer = document.querySelector('#project-set-container');
projectSetContainer.append(...projectSetElements);