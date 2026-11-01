// Projects page loader - Loads project data from proj.dat

async function loadProjects() {
    try {
        const response = await fetch('proj.dat');
        const text = await response.text();
        
        // Parse the proj.dat file
        const projects = [];
        const lines = text.split('\n');
        let currentProject = {};
        
        lines.forEach(line => {
            line = line.trim();
            
            // Skip empty lines
            if (!line) {
                // Save current project if it has data
                if (Object.keys(currentProject).length > 0) {
                    projects.push(currentProject);
                    currentProject = {};
                }
                return;
            }
            
            // Parse key=value pairs
            const equalIndex = line.indexOf('=');
            if (equalIndex > 0) {
                const key = line.substring(0, equalIndex).trim();
                const value = line.substring(equalIndex + 1).trim();
                
                // Extract the base key and project number
                const match = key.match(/^([A-Za-z]+)(\d+)$/);
                if (match) {
                    const baseKey = match[1];
                    currentProject[baseKey] = value;
                }
            }
        });
        
        // Add the last project if exists
        if (Object.keys(currentProject).length > 0) {
            projects.push(currentProject);
        }
        
        return projects;
    } catch (error) {
        console.error('Error loading projects data:', error);
        return null;
    }
}

// Populate projects on page load
document.addEventListener('DOMContentLoaded', async function() {
    const grid = document.querySelector('.projects-grid');
    
    // Hide grid initially
    if (grid) grid.style.opacity = '0';
    
    const projects = await loadProjects();
    
    if (projects && projects.length > 0) {
        if (grid) {
            // Clear existing content
            grid.innerHTML = '';
            
            // Create project cards for each project
            projects.forEach((project, index) => {
                const article = document.createElement('article');
                article.className = 'project-card';
                
                // Project image
                const figure = document.createElement('figure');
                figure.className = 'project-image';
                const img = document.createElement('img');
                img.src = `assets/images/projects/project${index + 1}.jpg`;
                img.alt = `${project.Project || 'Project'} screenshot`;
                img.loading = 'lazy';
                figure.appendChild(img);
                article.appendChild(figure);
                
                // Project content container
                const content = document.createElement('div');
                content.className = 'project-content';
                
                // Project title
                const title = document.createElement('h2');
                title.className = 'project-title';
                title.textContent = project.Project || 'Project';
                content.appendChild(title);
                
                // Project description
                const description = document.createElement('p');
                description.className = 'project-description';
                description.textContent = project.Details || 'Project description';
                content.appendChild(description);
                
                // Project tags (technologies)
                if (project.Highlight) {
                    const tagsDiv = document.createElement('div');
                    tagsDiv.className = 'project-tags';
                    
                    const tags = project.Highlight.split(';').map(t => t.trim()).filter(t => t);
                    tags.forEach(tag => {
                        const span = document.createElement('span');
                        span.className = 'tag';
                        span.textContent = tag;
                        tagsDiv.appendChild(span);
                    });
                    
                    content.appendChild(tagsDiv);
                }
                
                // Project links
                const linksDiv = document.createElement('div');
                linksDiv.className = 'project-links';
                
                if (project.demo) {
                    const demoLink = document.createElement('a');
                    demoLink.href = project.demo;
                    demoLink.className = 'project-link';
                    demoLink.target = '_blank';
                    demoLink.rel = 'noopener noreferrer';
                    demoLink.textContent = 'View Demo';
                    linksDiv.appendChild(demoLink);
                }
                
                if (project.code) {
                    const codeLink = document.createElement('a');
                    codeLink.href = project.code;
                    codeLink.className = 'project-link';
                    codeLink.target = '_blank';
                    codeLink.rel = 'noopener noreferrer';
                    codeLink.textContent = 'View Code';
                    linksDiv.appendChild(codeLink);
                }
                
                content.appendChild(linksDiv);
                article.appendChild(content);
                grid.appendChild(article);
            });
            
            // Fade in
            grid.style.transition = 'opacity 0.3s ease';
            grid.style.opacity = '1';
            
            console.log(`Loaded ${projects.length} projects from proj.dat`);
        }
    }
});
