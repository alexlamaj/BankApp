'use strict';

// Tabbed Elements //
const buttons = document.querySelectorAll('.tab--buttons .btn--2');
const tabs = document.querySelectorAll('.tab');

buttons[0].classList.add('btn--active');
document.getElementById('tab--1').classList.add('tab--active');

buttons.forEach((button, index) => {

    button.addEventListener('click', function () {

        buttons.forEach(btn => btn.classList.remove('btn--active'));
        tabs.forEach(tab => tab.classList.remove('tab--active'));

        button.classList.add('btn--active');
        document.getElementById(`tab--${index + 1}`).classList.add('tab--active');

    });

});

// Slider Elements //
const sliders = document.querySelectorAll('.slider');
const dots = document.querySelectorAll('.dot');
const previousSlide = document.querySelector('.previous');
const nextSlide = document.querySelector('.next');

document.getElementById('slider--1').classList.add('slider--active');
document.getElementById('dot--1').classList.add('dot--active');

let currentSlide = 0;

const toSlide = function (slide) {

    sliders.forEach(sld => sld.classList.remove('slider--active'));
    dots.forEach(dot => dot.classList.remove('dot--active'));

    sliders[slide].classList.add('slider--active');
    dots[slide].classList.add('dot--active');

};

previousSlide.addEventListener('click', function () {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = sliders.length - 1;
    }

    toSlide(currentSlide);

});

nextSlide.addEventListener('click', function () {

    currentSlide++;

    if (currentSlide == sliders.length) {
        currentSlide = 0;
    }

    toSlide(currentSlide);

});

// Dropdowns on FAQ //
const items = document.querySelectorAll('.faq--item');

items.forEach(item => {

    item.querySelector('.faq--question').addEventListener('click', () => {

        items.forEach(faq => {

            if (faq !== item) {
                faq.classList.remove('faq--active');
            }

        });

        item.classList.toggle('faq--active');

    });

});

// Sticky Header //
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');

const observer = new IntersectionObserver((entries) => {

    if (!entries[0].isIntersecting) {
        header.classList.add('header--sticky');
    } else {
        header.classList.remove('header--sticky');
    }

}, {threshold: 0});

observer.observe(hero);

// Smooth Scrolling //
document.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        target.scrollIntoView({behavior: 'smooth'});

    });

});