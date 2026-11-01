// About page loader - Loads skills and languages from conf.properties

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

// Populate skills and languages on page load
document.addEventListener('DOMContentLoaded', async function() {
    const skillsList = document.querySelector('.skills-list');
    const languagesList = document.querySelector('.language-list');
    
    // Hide lists initially
    if (skillsList) skillsList.style.opacity = '0';
    if (languagesList) languagesList.style.opacity = '0';
    
    const config = await loadConfig();
    
    if (config) {
        // Load Skills
        if (config.skills) {
            const skillsArray = config.skills.split(';').map(skill => skill.trim()).filter(skill => skill);
            
            if (skillsList && skillsArray.length > 0) {
                skillsList.innerHTML = '';
                skillsArray.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });
                // Fade in
                skillsList.style.transition = 'opacity 0.3s ease';
                skillsList.style.opacity = '1';
                console.log(`Loaded ${skillsArray.length} skills from configuration`);
            }
        }
        
        // Load Programming Languages
        if (config.language) {
            const languagesArray = config.language.split(';').map(lang => lang.trim()).filter(lang => lang);
            
            if (languagesList && languagesArray.length > 0) {
                languagesList.innerHTML = '';
                languagesArray.forEach(language => {
                    const li = document.createElement('li');
                    li.textContent = language;
                    languagesList.appendChild(li);
                });
                // Fade in
                languagesList.style.transition = 'opacity 0.3s ease';
                languagesList.style.opacity = '1';
                console.log(`Loaded ${languagesArray.length} programming languages from configuration`);
            }
        }
    }
});
