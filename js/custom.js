{
	function globtechnicSlider() {
		const SLIDES = document.getElementsByClassName('globtechnic-slider__slide');
		const BUTTONS = document.getElementsByClassName('globtechnic-slider__button');
		const DOTS_BOX = document.getElementsByClassName('globtechnic-slider__dots');
		const TEXT_BOXES = document.getElementsByClassName('globtechnic-slider__slide-text');
		console.log(TEXT_BOXES);

		// Function to handle navigation button clicks
		function handleNavButtons(event) {
			let currentSlide = getCurrentSlide();
			let buttonType = event.target.getAttribute('move-to');
			if (typeof buttonType == 'string' && buttonType.length > 1) {
				if (buttonType == 'next') {
					SLIDES[currentSlide].classList.remove('active');
					currentSlide == SLIDES.length - 1 ? (currentSlide = 0) : currentSlide++;
					SLIDES[currentSlide].classList.add('active');
					updateDots(currentSlide);
				}
				if (buttonType == 'prev') {
					SLIDES[currentSlide].classList.remove('active');
					currentSlide == 0 ? (currentSlide = SLIDES.length - 1) : currentSlide--;
					SLIDES[currentSlide].classList.add('active');
					updateDots(currentSlide);
				}
			} else {
				SLIDES[currentSlide].classList.remove('active');
				SLIDES[parseInt(buttonType)].classList.add('active');
				updateDots(parseInt(buttonType));
			}
		}

		// Function to update the dots navigation
		function updateDots(index) {
			let dots = document.getElementsByClassName('globtechnic-slider__dot');
			for (let i = 0; i < dots.length; i++) {
				dots[i].classList.remove('active');
			}
			if (index == getCurrentSlide()) {
				dots[index].classList.add('active');
			}
		}

		// Function to generate dots for slide navigation
		function generateDots() {
			for (let i = 0; i < SLIDES.length; i++) {
				let dot = document.createElement('div');
				dot.classList.add('globtechnic-slider__dot');
				dot.setAttribute('move-to', i);
				dot.addEventListener('click', e => handleNavButtons(e));
				DOTS_BOX[0].appendChild(dot);
			}
			updateDots(getCurrentSlide());
		}

		// Function to set a random slide as active
		function setRandomSlide() {
			let x = Math.floor(Math.random() * SLIDES.length);
			return SLIDES[x].classList.add('active');
		}

		// Function to get the index of the current active slide
		function getCurrentSlide() {
			for (let i = 0; i < SLIDES.length; i++) {
				if (SLIDES[i].classList.contains('active')) {
					return i;
				}
			}
		}

		// Adding event listeners to navigation buttons
		for (let button of BUTTONS) {
			button.addEventListener('click', e => handleNavButtons(e));
		}
		// Setting a random slide initially
		setRandomSlide();
		// Generating dots for slide navigation
		generateDots();
	}
	// Event listener for when the DOM content with page-index class is loaded
	window.addEventListener('DOMContentLoaded', function () {
		if (document.body.classList.contains('page-index')) {
			globtechnicSlider();
		}
	});
}
