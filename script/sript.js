"use strict";

const headerCityButton = document.querySelector(".header__city-button");
const subheaderCart = document.querySelector(".subheader__cart");
const cartOverlay = document.querySelector(".cart-overlay");

headerCityButton.textContent = localStorage.getItem("Lomoda-location") || "Ваш город?";


headerCityButton.addEventListener("click", () => {
    const city = prompt("Укажите ваш город");
    headerCityButton.textContent = city;
    localStorage.setItem("Lomoda-location", city)
})

const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;

    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `;
}

const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY,
    })
};


// Модальное окно
const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
}

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll();
}




// Получение БД

const getData = async () =>{
    const data = await fetch('db.json')

    if (data.ok){
        return data.json();
    } else {
        throw new Error(`Данные не были получены. Ошибка: ${data.status} ${data.statusText}`)
    }
}

const getGoods = (callback) =>{
    getData()
        .then((data) => {
            callback(data);
        })
        .catch(err => {
            console.error(err);
        })
}

getGoods((data) => {
    console.log(data)
})



subheaderCart.addEventListener('click', () => {
    cartModalOpen();
});

cartOverlay.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('cart__btn-close') || target.matches('.cart-overlay')){
        cartModalClose();
    }
});
