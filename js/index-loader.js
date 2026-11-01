// Index page loader - Loads name from conf.properties

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

// Populate name and social links on page load
document.addEventListener('DOMContentLoaded', async function() {
    const config = await loadConfig();
    
    if (config) {
        // Update name
        if (config.name) {
            // Update hero name
            const heroName = document.querySelector('.hero h1');
            if (heroName) {
                heroName.style.opacity = '0';
                heroName.textContent = config.name;
                // Fade in after update
                setTimeout(() => {
                    heroName.style.transition = 'opacity 0.3s ease';
                    heroName.style.opacity = '1';
                }, 50);
            }
            
            // Update footer copyright
            const copyright = document.querySelector('.copyright');
            if (copyright) {
                const year = new Date().getFullYear();
                copyright.textContent = `© ${year} ${config.name}. All rights reserved.`;
            }
            
            console.log(`Loaded name: ${config.name}`);
        }
        
        // Update social links in footer
        const footerSocialLinks = document.querySelectorAll('.footer-social-links a');
        
        if (config.linkedin && footerSocialLinks[0]) {
            footerSocialLinks[0].href = config.linkedin;
        }
        
        if (config.github && footerSocialLinks[1]) {
            footerSocialLinks[1].href = config.github;
        }
        
        if (config.facebook && footerSocialLinks[2]) {
            footerSocialLinks[2].href = config.facebook;
        }
        
        console.log('Loaded social links from configuration');
    }
});
