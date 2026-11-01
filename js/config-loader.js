// Configuration loader - Loads contact information from conf.properties

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

// Populate contact information on page load
document.addEventListener('DOMContentLoaded', async function() {
    const config = await loadConfig();
    
    if (config) {
        // Update email
        const emailLink = document.querySelector('.email-link');
        if (emailLink && config.email) {
            emailLink.href = `mailto:${config.email}`;
            emailLink.textContent = config.email;
        }
        
        // Update contact number (if you want to display it)
        if (config.contact) {
            // You can add a contact number display element if needed
            console.log('Contact number loaded:', config.contact);
        }
        
        // Update social media links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Update LinkedIn
            if (href.includes('linkedin') && config.linkedin) {
                link.href = config.linkedin;
            }
            
            // Update GitHub
            if (href.includes('github') && config.github) {
                link.href = config.github;
            }
            
            // Update Twitter/Facebook
            if (href.includes('facebook') && config.facebook) {
                link.href = config.facebook;
                const icon = link.querySelector('.social-icon');
                const span = link.querySelector('span');
                if (icon) icon.alt = 'Facebook';
                if (span) span.textContent = 'Facebook';
            }
        });
        
        // Update footer social links
        const footerLinks = document.querySelectorAll('.footer-social-links a');
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href.includes('linkedin') && config.linkedin) {
                link.href = config.linkedin;
            }
            
            if (href.includes('github') && config.github) {
                link.href = config.github;
            }
            
            if (href.includes('facebook') && config.facebook) {
                link.href = config.facebook;
                const icon = link.querySelector('.footer-social-icon');
                if (icon) icon.alt = 'Facebook';
            }
        });
        
        console.log('Configuration loaded successfully');
    }
});
