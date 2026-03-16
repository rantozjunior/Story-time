// ===================================
// STORY TIME - Landing Page Script
// ===================================

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe story cards and features
document.addEventListener('DOMContentLoaded', () => {
    const storyCards = document.querySelectorAll('.story-card');
    const features = document.querySelectorAll('.feature');
    
    storyCards.forEach(card => observer.observe(card));
    features.forEach(feature => observer.observe(feature));
});

// Start reading function
function startReading(storySlug, chapter) {
    // Save story selection to localStorage
    localStorage.setItem('currentStory', storySlug);
    localStorage.setItem('currentChapter', chapter);
    
    // Navigate to reader page
    window.location.href = `reader.html?story=${storySlug}&chapter=${chapter}`;
}

// Add hover effects to story cards
document.addEventListener('DOMContentLoaded', () => {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
