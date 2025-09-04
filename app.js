// Navbar logic

// 1. SEARCH BUTTON FUNCTIONALITY WITH SLIDE-OUT INPUT
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('.searchbar');
    const searchInput = searchForm.querySelector('input[type="text"]');
    const searchBtn = searchForm.querySelector('button');

    // Hide input initially
    searchForm.classList.remove('active');

    // Show input on search icon click
    searchBtn.addEventListener('click', function (e) {
        if (!searchForm.classList.contains('active')) {
            e.preventDefault();
            searchForm.classList.add('active');
            setTimeout(() => searchInput.focus(), 250);
        }
    });

    // Hide input if clicked outside
    document.addEventListener('click', function (e) {
        if (
            searchForm.classList.contains('active') &&
            !searchForm.contains(e.target)
        ) {
            searchForm.classList.remove('active');
            searchInput.value = '';
        }
    });

    // Submit search if input is visible and not empty
    searchForm.addEventListener('submit', function (e) {
        if (!searchForm.classList.contains('active')) {
            e.preventDefault();
            searchForm.classList.add('active');
            setTimeout(() => searchInput.focus(), 250);
            return;
        }
        const query = searchInput.value.trim();
        if (query) {
            alert(`You searched for: ${query}`);
        } else {
            e.preventDefault();
            alert('Please enter a search term.');
        }
    });
});

// 2. RESPONSIVE DROPDOWN MENU FOR NAVBAR
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    let isMenuOpen = false;

    // Create dropdown menu for mobile
    function createDropdown() {
        if (!document.querySelector('.dropdown-nav')) {
            const dropdown = navLinks.cloneNode(true);
            dropdown.classList.add('dropdown-nav');
            dropdown.style.display = 'none';
            dropdown.style.position = 'absolute';
            dropdown.style.top = '60px';
            dropdown.style.left = '0';
            dropdown.style.width = '100%';
            dropdown.style.background = '#fff';
            dropdown.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)';
            dropdown.style.zIndex = '999';
            document.body.appendChild(dropdown);
        }
    }

    // Show/hide dropdown
    function toggleDropdown() {
        const dropdown = document.querySelector('.dropdown-nav');
        if (!dropdown) return;
        isMenuOpen = !isMenuOpen;
        dropdown.style.display = isMenuOpen ? 'flex' : 'none';
        dropdown.style.flexDirection = 'column';
    }

    // Show/hide nav links and menu icon based on screen size
    function handleResize() {
        const dropdown = document.querySelector('.dropdown-nav');
        if (window.innerWidth < 768) {
            navLinks.style.display = 'none';
            menuIcon.style.display = 'flex';
            createDropdown();
            if (dropdown) dropdown.style.display = isMenuOpen ? 'flex' : 'none';
        } else {
            navLinks.style.display = 'flex';
            menuIcon.style.display = 'none';
            if (dropdown) dropdown.style.display = 'none';
            isMenuOpen = false;
        }
    }

    // Menu icon click
    menuIcon.addEventListener('click', toggleDropdown);

    // Hide dropdown when clicking outside
    document.addEventListener('click', function (e) {
        const dropdown = document.querySelector('.dropdown-nav');
        if (!dropdown) return;
        if (
            isMenuOpen &&
            !dropdown.contains(e.target) &&
            !menuIcon.contains(e.target)
        ) {
            dropdown.style.display = 'none';
            isMenuOpen = false;
        }
    });

    // Responsive on load and resize
    window.addEventListener('resize', handleResize);
    handleResize();
});

// 3. ABOUT SECTION ANIMATION (already present)
document.addEventListener('DOMContentLoaded', function () {
    const aboutSection = document.querySelector('.about-section');
    const aboutImg = document.querySelector('.about-img');
    const aboutText = document.querySelector('.about-text');

    function animateAbout() {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            aboutImg.classList.add('animate');
            aboutText.classList.add('animate');
            window.removeEventListener('scroll', animateAbout);
        }
    }

    window.addEventListener('scroll', animateAbout);
    animateAbout();
});

// Improved testimonial slider with 5s pause, then 2s sliding/crossfade animation
document.addEventListener('DOMContentLoaded', function () {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    let current = 0;
    let autoSlideTimeout = null;
    let isSliding = false;

    function clearAnimations() {
        testimonials.forEach(t => {
            t.classList.remove(
                'active',
                'slide-in-left',
                'slide-in-right',
                'slide-out-left',
                'slide-out-right'
            );
        });
    }

    function animateTestimonial(outIdx, inIdx, direction = 1) {
        clearAnimations();
        if (testimonials[outIdx]) {
            testimonials[outIdx].classList.add(direction === 1 ? 'slide-out-left' : 'slide-out-right');
        }
        if (testimonials[inIdx]) {
            testimonials[inIdx].classList.add('active', direction === 1 ? 'slide-in-right' : 'slide-in-left');
        }
        isSliding = true;
        setTimeout(() => {
            clearAnimations();
            testimonials[inIdx].classList.add('active');
            isSliding = false;
            startAutoSlide();
        }, 2000); // 2s = animation duration
    }

    function nextTestimonial() {
        if (isSliding) return;
        const prev = current;
        current = (current + 1) % testimonials.length;
        animateTestimonial(prev, current, 1);
    }

    function prevTestimonial() {
        if (isSliding) return;
        const prev = current;
        current = (current - 1 + testimonials.length) % testimonials.length;
        animateTestimonial(prev, current, -1);
    }

    function startAutoSlide() {
        clearTimeout(autoSlideTimeout);
        autoSlideTimeout = setTimeout(nextTestimonial, 5000); // Wait 5s before sliding
    }

    function stopAutoSlide() {
        clearTimeout(autoSlideTimeout);
    }

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevTestimonial();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextTestimonial();
    });

    // Initial state
    clearAnimations();
    testimonials[0].classList.add('active');
    startAutoSlide();
});