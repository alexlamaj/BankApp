'use strict';

// Tabbed Elements //
const buttons = document.querySelectorAll('.tab--buttons .btn--2');
const tabs = document.querySelectorAll('.tab');

buttons.forEach(function (button, index) {

    button.addEventListener('click', () => {

        buttons.forEach(btn => btn.classList.remove('btn--active'));
        tabs.forEach(tab => tab.classList.remove('tab--active'));

        button.classList.add('btn--active');

        if(tabs[index]) {
            tabs[index].classList.add('tab--active');
        }

    });

});

// Slide Elements //
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const slides = document.querySelectorAll('.client');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;

const toSlide = function (slide) {

    slides.forEach(slide => slide.classList.remove('client--active'));
    dots.forEach(dot => dot.classList.remove('dot--active'));

    slides[slide].classList.add('client--active');
    dots[slide].classList.add('dot--active');

}

previous.addEventListener('click', function () {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    toSlide(currentSlide);

});

next.addEventListener('click', function () {

    currentSlide++;

    if (currentSlide > slides.length - 1) {
        currentSlide = 0;
    }

    toSlide(currentSlide);

});

// FAQ //
const items = document.querySelectorAll('.faq--el');
const answers = document.querySelectorAll('.answer');
const icons = document.querySelectorAll('.drop');

items.forEach((item, index) => {

    item.addEventListener('click', function () {

        answers[index].classList.toggle('answer--active');
        icons[index].classList.toggle('drop--active');

    });

});

// Smooth Scrolling //
const links = document.querySelectorAll('nav a');

links.forEach(link => {

    link.addEventListener('click', function (e) {

        e.preventDefault();

        const target = document.querySelector(link.getAttribute('href'));

        target.scrollIntoView({behavior: 'smooth', block: 'start'});

    });

});