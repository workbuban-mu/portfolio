// Main JavaScript file - General utilities

// Smooth scrolling for anchor links (Task 4.3)
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (empty anchor)
            if (targetId === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
                
                // Set focus to target for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        });
    });
    
    // Lazy loading for images (Task 4.4)
    implementLazyLoading();
});

// Function to implement lazy loading for images
function implementLazyLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Skip if image already has loading attribute
        if (img.hasAttribute('loading')) {
            return;
        }
        
        // Check if image is above the fold (profile image on home page)
        const isAboveFold = img.classList.contains('profile-image') || 
                           img.closest('.hero') !== null;
        
        // Add loading="lazy" to below-fold images
        if (!isAboveFold) {
            img.setAttribute('loading', 'lazy');
        }
    });
}
