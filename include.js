document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 700;

    if (!isMobile) {
        const vibrationsSection = document.querySelector('.vibrations-section');
        const infernoSection = document.querySelector('.inferno-section');
        const contactSection = document.querySelector('.contact-section');
        const backgroundImage = document.querySelector('.backgroundimg');
        const tourPresave = document.querySelector('.tourpresave');
        const shopLink = document.querySelector('.menu a[href="#shop"]');
        const musicLink = document.querySelector('.menu a[href="MUSIC"]');
        const ticketsLink = document.querySelector('.menu a[href="TICKETS"]');

        let currentStep = 0;
        let fullyViewedVibrations = false;
        let isTransitioning = false;

        function toggleSection(section) {
            if (section.classList.contains('active')) {
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

        window.addEventListener('wheel', function (e) {
            if (isTransitioning) return;

            if (e.deltaY > 0) {
                handleScrollDown();
            } else if (e.deltaY < 0) {
                handleScrollUp();
            }
        });

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
    } else {
        document.querySelectorAll('.vibrations-section, .inferno-section, .contact-section').forEach(section => {
            section.style.transform = 'none';
            section.style.transition = 'none';
        });

        document.body.style.overflowY = 'auto';
    }
});
