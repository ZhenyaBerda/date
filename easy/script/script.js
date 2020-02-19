window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Timer
    const countTimer = (deadline) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        let clockId;

        const getTimeRemaining = () => {

            const addZero = (number) => {
                let strNumber = number.toString();

                if (strNumber.length === 1) {
                    return `0` + strNumber;
                } else {
                    return strNumber;
                }
            };

            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = addZero(Math.floor(timeRemaining % 60)),
                minutes = addZero(Math.floor((timeRemaining / 60) % 60)),
                hours = addZero(Math.floor(timeRemaining / 60 / 60));
            // day = Math.floor(timeRemaining / 60 / 60 / 24);

            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if (timer.timeRemaining <= 0) {
                clearInterval(clockId);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }

        };

        clockId = setInterval(updateClock, 1000);
    };

    countTimer('24 feb 2020');


    // menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');


        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    // popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

        let moveId, count;

        const movePopup = () => {
            moveId = requestAnimationFrame(movePopup);

            count += 5;

            if (popupContent.style.top !== '10%') {

                popupContent.style.top = `${count}%`;
            } else {
                cancelAnimationFrame(moveId);
            }

        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (document.documentElement.clientWidth > 768) {
                    popupContent.style.top = `-100%`;
                    count = -100;
                    popup.style.display = 'block';
                    movePopup();
                } else {
                    popup.style.display = 'block';
                }
            });
        });



        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopup();
});