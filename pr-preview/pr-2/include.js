document.addEventListener('DOMContentLoaded', () => {

    const isSmallScreen = window.innerWidth <= 800; // Check if the screen width is 800px or less

    if (isSmallScreen) {
        // Disable JavaScript functionality for small screens
        console.log('Small screen detected. Resetting transforms and enabling normal scrolling.');

        // Reset transforms, transitions, and position styles
        document.querySelectorAll('.vibrations-section, .inferno-section, .contact-section').forEach((section) => {
            section.style.transform = 'none'; // Reset transform
            section.style.transition = 'none'; // Disable transitions
            section.style.position = 'relative'; // Allow normal block positioning
            section.style.height = 'auto'; // Reset height
            section.style.overflow = 'visible'; // Disable independent scrolling
        });

        document.body.style.overflow = 'auto'; // Enable normal scrolling
        document.body.style.height = 'auto'; // Reset body height
        return; // Exit the script for small screens
    }

    
    const vibrationsSection = document.querySelector('.vibrations-section');
    const infernoSection = document.querySelector('.inferno-section');
    const contactSection = document.querySelector('.contact-section');
    const backgroundImage = document.querySelector('.backgroundimg');
    const tourPresave = document.querySelector('.tourpresave');
    const shopLink = document.querySelector('.menu a[href="#shop"]'); // Select SHOP link
    const musicLink = document.querySelector('.menu a[href="MUSIC"]'); // Select MUSIC link
    const ticketsLink = document.querySelector('.menu a[href="TICKETS"]'); // Select TICKETS link

    let currentStep = 0; // 0 = initial, 1 = vibrations visible, 2 = inferno visible, 3 = contact visible
    let fullyViewedVibrations = false; // True when user has scrolled to bottom of vibrations
    let isTransitioning = false; // Prevents multiple rapid transitions

    // Function to toggle sections
    function toggleSection(section) {
        if (section.classList.contains('active')) {
            // Reverse the change as soon as the button is clicked
            if (section === vibrationsSection) {
                backgroundImage.src = 'https://acidwaves.art/c084ff3e-c789-4d7b-84ac-842e7e5b5a5f.webp';
                tourPresave.style.display = 'flex';
            }
            section.classList.remove('active');
            currentStep = 0;
        } else {
            vibrationsSection.classList.remove('active');
            infernoSection.classList.remove('active');
            contactSection.classList.remove('active');

            section.classList.add('active');
            currentStep = section === vibrationsSection ? 1 : section === infernoSection ? 2 : 3;

            if (section === vibrationsSection) {
                section.addEventListener('transitionend', () => {
                    backgroundImage.src = 'https://acidwaves.art/releasesbg.webp';
                    tourPresave.style.display = 'none';
                }, { once: true });
            }
        }
    }

    // Function to handle scrolling down
    function handleScrollDown() {
        if (currentStep === 0) {
            isTransitioning = true;
            vibrationsSection.classList.add('active');
            vibrationsSection.addEventListener('transitionend', () => {
                backgroundImage.src = 'https://acidwaves.art/releasesbg.webp';
                tourPresave.style.display = 'none';
            }, { once: true });
            currentStep = 1;

            setTimeout(() => { isTransitioning = false; }, 1000);
        } else if (currentStep === 1 && fullyViewedVibrations) {
            isTransitioning = true;
            infernoSection.classList.add('active');
            currentStep = 2;
            setTimeout(() => { isTransitioning = false; }, 1000);
        } else if (currentStep === 2) {
            isTransitioning = true;
            contactSection.classList.add('active');
            currentStep = 3;
            setTimeout(() => { isTransitioning = false; }, 1000);
        }
    }

    // Function to handle scrolling up
    function handleScrollUp() {
        if (currentStep === 3) {
            isTransitioning = true;
            contactSection.classList.remove('active');
            currentStep = 2;
            setTimeout(() => { isTransitioning = false; }, 1000);
        } else if (currentStep === 2) {
            isTransitioning = true;
            infernoSection.classList.remove('active');
            currentStep = 1;
            setTimeout(() => { isTransitioning = false; }, 1000);
        } else if (currentStep === 1) {
            if (vibrationsSection.scrollTop === 0) {
                backgroundImage.src = 'https://acidwaves.art/c084ff3e-c789-4d7b-84ac-842e7e5b5a5f.webp';
                tourPresave.style.display = 'flex';
                isTransitioning = true;
                vibrationsSection.classList.remove('active');
                currentStep = 0;
                fullyViewedVibrations = false;
                setTimeout(() => { isTransitioning = false; }, 1000);
            }
        }
    }

    // Attach click events to menu links
    shopLink.addEventListener('click', (event) => {
        event.preventDefault();
        toggleSection(infernoSection);
    });

    musicLink.addEventListener('click', (event) => {
        event.preventDefault();
        toggleSection(vibrationsSection);
    });

    ticketsLink.addEventListener('click', (event) => {
        event.preventDefault();
        toggleSection(infernoSection);
    });

    // Wheel event for custom scrolling
    window.addEventListener('wheel', function (e) {
        if (isTransitioning) return;

        if (e.deltaY > 0) {
            handleScrollDown();
        } else if (e.deltaY < 0) {
            handleScrollUp();
        }
    });

    // Detect when user reaches the bottom of vibrations-section
    vibrationsSection.addEventListener('scroll', function () {
        if (currentStep === 1) {
            const scrollTop = vibrationsSection.scrollTop;
            const scrollHeight = vibrationsSection.scrollHeight;
            const clientHeight = vibrationsSection.clientHeight;

            if (scrollTop + clientHeight >= scrollHeight - 5) {
                fullyViewedVibrations = true;
            } else {
                fullyViewedVibrations = false;
            }
        }
    });

    // Optional: Reset fullyViewedVibrations when inferno-section is hidden
    infernoSection.addEventListener('transitionend', function () {
        if (!infernoSection.classList.contains('active')) {
            if (currentStep === 1) {
                vibrationsSection.classList.add('active');
            }
        }
    });
});
