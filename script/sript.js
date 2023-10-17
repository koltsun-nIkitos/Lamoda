"use strict";

const headerCityButton = document.querySelector(".header__city-button");


headerCityButton.textContent = localStorage.getItem("Lomoda-location") || "Ваш город?";


headerCityButton.addEventListener("click", () => {
    const city = prompt("Укажите ваш город");
    headerCityButton.textContent = city;
    localStorage.setItem("Lomoda-location", city)
})