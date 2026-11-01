// Experience page loader - Loads job data from exp.dat

async function loadExperience() {
    try {
        const response = await fetch('exp.dat');
        const text = await response.text();
        
        // Parse the exp.dat file
        const jobs = [];
        const lines = text.split('\n');
        let currentJob = {};
        let jobNumber = null;
        
        lines.forEach(line => {
            line = line.trim();
            
            // Skip empty lines and comments
            if (!line || line.startsWith('#')) {
                // Check if it's a job marker
                if (line.includes('# JOB')) {
                    // Save previous job if exists
                    if (Object.keys(currentJob).length > 0) {
                        jobs.push(currentJob);
                    }
                    currentJob = {};
                }
                return;
            }
            
            // Parse key=value pairs
            const equalIndex = line.indexOf('=');
            if (equalIndex > 0) {
                const key = line.substring(0, equalIndex).trim();
                const value = line.substring(equalIndex + 1).trim();
                
                // Extract the base key (position, company, date, jobDetails)
                const baseKey = key.replace(/\d+$/, '');
                currentJob[baseKey] = value;
            }
        });
        
        // Add the last job
        if (Object.keys(currentJob).length > 0) {
            jobs.push(currentJob);
        }
        
        return jobs;
    } catch (error) {
        console.error('Error loading experience data:', error);
        return null;
    }
}

// Populate experience on page load
document.addEventListener('DOMContentLoaded', async function() {
    const container = document.querySelector('.experience-container');
    
    // Hide container initially
    if (container) container.style.opacity = '0';
    
    const jobs = await loadExperience();
    
    if (jobs && jobs.length > 0) {
        if (container) {
            // Clear existing content
            container.innerHTML = '';
            
            // Create experience entries for each job
            jobs.forEach(job => {
                const article = document.createElement('article');
                article.className = 'experience-entry';
                
                // Job title
                const title = document.createElement('h2');
                title.className = 'job-title';
                title.textContent = job.position || 'Position';
                article.appendChild(title);
                
                // Company name
                const company = document.createElement('h3');
                company.className = 'company-name';
                company.textContent = job.company || 'Company';
                article.appendChild(company);
                
                // Date range
                const dateRange = document.createElement('time');
                dateRange.className = 'date-range';
                dateRange.textContent = job.date || 'Date';
                article.appendChild(dateRange);
                
                // Responsibilities list
                if (job.jobDetails) {
                    const ul = document.createElement('ul');
                    ul.className = 'responsibilities-list';
                    
                    // Split by semicolon for multiple responsibilities
                    const responsibilities = job.jobDetails.split(';').map(r => r.trim()).filter(r => r);
                    
                    responsibilities.forEach(responsibility => {
                        const li = document.createElement('li');
                        li.textContent = responsibility;
                        ul.appendChild(li);
                    });
                    
                    article.appendChild(ul);
                }
                
                container.appendChild(article);
            });
            
            // Fade in
            container.style.transition = 'opacity 0.3s ease';
            container.style.opacity = '1';
            
            console.log(`Loaded ${jobs.length} job experiences from exp.dat`);
        }
    }
});
