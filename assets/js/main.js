// ===============================
// Configuration and Initialization
// ===============================
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// ===============================
// Data
// ===============================
const newsItems = [
    {
        title: 'Breaking: Star Player Signs Record-Breaking Contract',
        excerpt: 'In a shocking turn of events, the football world was stunned as...',
        image: 'news1.jpg'
    },
    // Add more news items here
];

const highlightItems = [
    {
        title: 'Match Highlights: Finals',
        views: '1.2M views',
        time: '2 days ago',
        thumbnail: 'highlight1.jpg'
    },
    // Add more highlight items here
];

// ===============================
// DOM Elements
// ===============================
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('.hero');
const statsSection = document.querySelector('.hero-stats');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// ===============================
// Navigation and Scrolling
// ===============================
// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation state
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===============================
// Animations and Effects
// ===============================
// Stats animation
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const text = stat.textContent;
        // Extract numeric value and special characters
        const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
        const specialChars = text.replace(/[0-9]/g, '').trim();
        
        let current = 0;
        const increment = numericValue / 30;
        
        const updateCount = () => {
            if (current < numericValue) {
                current += increment;
                stat.textContent = `${Math.ceil(current)}${specialChars}`;
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = `${numericValue}${specialChars}`;
            }
        };
        updateCount();
    });
};

// Stats intersection observer
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// Parallax effect
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
}

// ===============================
// Card Interactions
// ===============================
// Featured cards hover
document.querySelectorAll('.featured-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
});

// Highlight cards hover
document.querySelectorAll('.highlight-card').forEach(card => {
    const playButton = card.querySelector('.play-button');
    card.addEventListener('mouseenter', () => playButton.style.transform = 'scale(1.1)');
    card.addEventListener('mouseleave', () => playButton.style.transform = 'scale(1)');
});

// Highlight thumbnails hover
document.querySelectorAll('.highlight-thumbnail').forEach(thumbnail => {
    const playButton = thumbnail.querySelector('.play-button');
    thumbnail.addEventListener('mouseenter', () => {
        playButton.style.transform = 'scale(1.2) rotate(360deg)';
        playButton.style.background = 'var(--gradient)';
    });
    thumbnail.addEventListener('mouseleave', () => {
        playButton.style.transform = 'scale(1) rotate(0deg)';
        playButton.style.background = 'rgba(255, 255, 255, 0.2)';
    });
});

// ===============================
// Performance Optimizations
// ===============================
// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ===============================
// Live Match Statistics Update
// ===============================
function updateMatchStats() {
    // This would typically fetch data from an API
    // For demo, we'll use mock data updates
    const mockUpdates = {
        goals: {
            team1: Math.floor(Math.random() * 4),
            team2: Math.floor(Math.random() * 3)
        },
        possession: {
            team1: Math.floor(Math.random() * 30) + 40, // 40-70%
            team2: function() { return 100 - this.team1; }
        },
        shots: {
            team1: Math.floor(Math.random() * 5) + 1,
            team2: Math.floor(Math.random() * 4) + 1
        },
        matchTime: Math.floor(Math.random() * 90) + 1
    };

    // Update Goals
    document.querySelector('.score .team1').textContent = mockUpdates.goals.team1;
    document.querySelector('.score .team2').textContent = mockUpdates.goals.team2;
    document.querySelector('.match-time').textContent = mockUpdates.matchTime + "'";

    // Update Possession
    const team1Possession = mockUpdates.possession.team1;
    const team2Possession = 100 - team1Possession;
    document.querySelector('.team1-bar').style.width = team1Possession + '%';
    document.querySelector('.team2-bar').style.width = team2Possession + '%';
    document.querySelector('.team1-bar').textContent = team1Possession + '%';
    document.querySelector('.team2-bar').textContent = team2Possession + '%';

    // Update Shots
    const team1Shots = document.querySelector('.team1-shots');
    const team2Shots = document.querySelector('.team2-shots');
    team1Shots.innerHTML = Array(mockUpdates.shots.team1).fill('<i class="fas fa-circle"></i>').join('');
    team2Shots.innerHTML = Array(mockUpdates.shots.team2).fill('<i class="fas fa-circle"></i>').join('');
    document.querySelector('.shots-text span:first-child').textContent = mockUpdates.shots.team1;
    document.querySelector('.shots-text span:last-child').textContent = mockUpdates.shots.team2;
}

// Update stats every 30 seconds
setInterval(updateMatchStats, 30000);

// Initial update
document.addEventListener('DOMContentLoaded', updateMatchStats);
