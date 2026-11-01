// Navigation configuration loader - Controls which nav items to show

async function loadConfig() {
    try {
        const response = await fetch('conf.properties');
        const text = await response.text();
        
        // Parse properties file
        const config = {};
        const lines = text.split('\n');
        
        lines.forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const [key, value] = line.split('=');
                if (key && value) {
                    config[key.trim()] = value.trim();
                }
            }
        });
        
        return config;
    } catch (error) {
        console.error('Error loading configuration:', error);
        return null;
    }
}

// Configure navigation visibility on page load
document.addEventListener('DOMContentLoaded', async function() {
    const config = await loadConfig();
    
    if (config) {
        // Disable Projects link if showProjects is false
        if (config.showProjects === 'false') {
            const projectsLinks = document.querySelectorAll('a[href="projects.html"]');
            projectsLinks.forEach(link => {
                // Disable the link
                link.style.pointerEvents = 'none';
                link.style.cursor = 'not-allowed';
                link.style.opacity = '0.5';
                link.style.color = '#999';
                link.style.backgroundColor = '#e0e0e0';
                
                // Prevent navigation
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    return false;
                });
            });
            console.log('Projects navigation disabled via configuration');
        }
    }
});
