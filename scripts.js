document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Functionality ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dark/Light Mode Toggle ---
    const modeToggle = document.querySelector('.mode-toggle');
    const toggleIcon = modeToggle.querySelector('i');
    const toggleText = modeToggle.querySelector('.toggle-text');

    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
            toggleText.textContent = 'Light Mode';
        } else {
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
            toggleText.textContent = 'Dark Mode';
        }
    });

    // --- Scroll-Triggered Animations ---
    const animateOnScroll = (element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = (rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 100);
        if (isVisible) {
            element.classList.add('visible');
        }
    };

    const animatedElements = document.querySelectorAll('.scroll-animation-element');

    const checkAnimations = () => {
        animatedElements.forEach(el => animateOnScroll(el));
    };

    window.addEventListener('load', checkAnimations);
    window.addEventListener('scroll', checkAnimations);

    // --- Progress Bar Animation on Academics Page ---
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 50) {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
            }
        });
    };

    window.addEventListener('load', animateProgressBars);
    window.addEventListener('scroll', animateProgressBars);
    
});
// --- Search Bar Functionality (Updated with Suggestions) ---
    const searchInput = document.querySelector('.search-bar input');
    const searchSuggestions = document.querySelector('.search-suggestions');
    
    // A list of keywords for suggestions
    const searchKeywords = [
        "academics", "projects", "fab academy", "japoe pot", "technology", "bhutan innovation forum", "makeathon", 
        "space settlement", "sprinting", "basketball", "sports", "japan", "thailand", "travels", "about me",
        "hydroponics", "AI regulation", "geography", "history", "mathematics", "english"
    ];

    // Function to perform search on Enter key
    function performSearch(searchTerm) {
        const sections = document.querySelectorAll('.content-section');
        let found = false;

        sections.forEach(section => {
            const sectionText = section.textContent.toLowerCase();
            const searchWords = searchTerm.split(' ').filter(Boolean);
            const isMatch = searchWords.some(word => sectionText.includes(word));

            if (isMatch) {
                section.style.display = 'block';
                found = true;
            } else {
                section.style.display = 'none';
            }
        });

        // --- NEW CODE: Scroll to the first visible section ---
        if (found) {
            const firstFoundSection = document.querySelector('.content-section[style*="display: block"]');
            if (firstFoundSection) {
                firstFoundSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // --- END OF NEW CODE ---

        if (!found) {
            alert('No results found. Please try a different search term.');
            sections.forEach(section => section.style.display = 'block');
        }
    }

    searchInput.addEventListener('keyup', (event) => {
        const query = searchInput.value.toLowerCase();
        searchSuggestions.innerHTML = '';

        if (query.length > 0) {
            const filteredKeywords = searchKeywords.filter(keyword => keyword.includes(query));

            if (filteredKeywords.length > 0) {
                filteredKeywords.forEach(keyword => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = keyword;
                    
                    suggestionItem.addEventListener('click', () => {
                        searchInput.value = keyword;
                        searchSuggestions.style.display = 'none';
                        performSearch(keyword);
                    });
                    
                    searchSuggestions.appendChild(suggestionItem);
                });
                searchSuggestions.style.display = 'block';
            } else {
                searchSuggestions.style.display = 'none';
            }
        } else {
            searchSuggestions.style.display = 'none';
        }

        if (event.key === 'Enter') {
            searchSuggestions.style.display = 'none';
            performSearch(query);
        }
    });

    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target)) {
            searchSuggestions.style.display = 'none';
        }
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value.length === 0) {
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'block';
            });
        }
    });