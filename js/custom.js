{
	function globtechnicSlider() {
		const SLIDER = document.getElementsByClassName('globtechnic-slider')[0];
		const SLIDES = document.getElementsByClassName('globtechnic-slider__slide');
		const BUTTONS = document.getElementsByClassName('globtechnic-slider__button');
		const DOTS_BOX = document.getElementsByClassName('globtechnic-slider__dots');
		const TEXT_BOXES = document.getElementsByClassName('globtechnic-slider__slide-text');

		let textsData = [];
		let touchPositions = [];

		function setSliderHeight() {
			let headerHeight = document.getElementById('header').offsetHeight;
			let sliderHeight = window.innerHeight - headerHeight;
			SLIDER.setAttribute('style', `--globtechnic-slider__height: ${sliderHeight}px;`);
		}

		function setTextOnSlide(index) {
			let currentSlide = index;
			let infoBox = document.querySelector('.globtechnic-slider__content');
			let title = infoBox.querySelector('.globtechnic-slider__information-title');
			let subtitle = infoBox.querySelector('.globtechnic-slider__information-subtitle');
			title.innerHTML = textsData[currentSlide].title;
			subtitle.innerHTML = textsData[currentSlide].subtitle;
		}

		function getAndRemoveSlidesText() {
			function getSlidesTexts() {
				let newObj = {};
				for (let i = 0; i < TEXT_BOXES.length; i++) {
					let texts = TEXT_BOXES[i].getElementsByTagName('p');
					let title, subtitle;
					for (let p of texts) {
						if (p.getAttribute('text-type') === 'title') {
							title = p.innerText;
						}
						if (p.getAttribute('text-type') === 'subtitle') {
							subtitle = p.innerText;
						}
					}
					newObj[i] = { title: `${title}`, subtitle: `${subtitle}` };
				}
				removeSlidesText();
				return newObj;
			}
			function removeSlidesText() {
				let clonedTextBoxes = Array.from(TEXT_BOXES);
				for (let box of clonedTextBoxes) {
					box.remove();
				}
			}

			function saveTextData(data) {
				let textsArray = data;
				textsData = textsArray;
			}
			return saveTextData(getSlidesTexts());
		}

		// Function to handle navigation button clicks
		function handleNavButtons(event) {
			let currentSlide = getCurrentSlide();
			let buttonType = event.target.getAttribute('move-to');
			if (typeof buttonType === 'string' && buttonType.length > 1) {
				if (buttonType === 'next') {
					SLIDES[currentSlide].classList.remove('active');
					currentSlide === SLIDES.length - 1 ? (currentSlide = 0) : currentSlide++;
					SLIDES[currentSlide].classList.add('active');
					updateDots(currentSlide);
					setTextOnSlide(currentSlide);
				}
				if (buttonType === 'prev') {
					SLIDES[currentSlide].classList.remove('active');
					currentSlide === 0 ? (currentSlide = SLIDES.length - 1) : currentSlide--;
					SLIDES[currentSlide].classList.add('active');
					updateDots(currentSlide);
					setTextOnSlide(currentSlide);
				}
			} else if (buttonType.length == 1) {
				SLIDES[currentSlide].classList.remove('active');
				SLIDES[parseInt(buttonType)].classList.add('active');
				updateDots(parseInt(buttonType));
				setTextOnSlide(parseInt(buttonType));
			}
		}

		function handleSwipe(event) {
			let currentX = event.changedTouches[0].screenX;
			touchPositions.push(currentX);

			if (touchPositions.length > 1) {
				let prevX = touchPositions[touchPositions.length - 2];
				if (currentX > prevX) {
					console.log('gest w prawo');
				} else if (currentX < prevX) {
					console.log('gest w lewo');
				}
			}
		}

		function changeSlide() {}

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
			SLIDES[x].classList.add('active');
			getAndRemoveSlidesText();
			setTextOnSlide(x);
		}

		// Function to get the index of the current active slide
		function getCurrentSlide() {
			for (let i = 0; i < SLIDES.length; i++) {
				if (SLIDES[i].classList.contains('active')) {
					return i;
				}
			}
		}
		for (let button of BUTTONS) {
			button.addEventListener('click', e => handleNavButtons(e));
		}

		SLIDER.addEventListener('touchmove', e => handleSwipe(e));

		setSliderHeight();
		setRandomSlide();
		generateDots();
	}
	window.addEventListener('DOMContentLoaded', function () {
		globtechnicSlider();
	});
}
