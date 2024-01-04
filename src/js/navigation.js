function burgerMenuActive() {

    document.querySelector('.header__background-navigation_bar').addEventListener('click', (e) => {
        const menuOpen = document.querySelector('.header__background-navigation_menu');
        const burgerButton = document.querySelector('.header__background-navigation_bar-burger');
        const crossButton = document.querySelector('.header__background-navigation_bar-cross');
        if (burgerButton.classList.contains('active')) {
            burgerButton.classList.add('hide');
            burgerButton.classList.remove('active');
            menuOpen.classList.remove('hide');
            crossButton.classList.add('active');
            menuOpen.classList.add('active');

        } else if (crossButton.classList.contains('active')) {
            crossButton.classList.remove('active');
            menuOpen.classList.remove('active');
            menuOpen.classList.add('hide');
            burgerButton.classList.add("active");
        }

    });

}

burgerMenuActive();
//
// window.addEventListener('click', (e) => {
//     const menuOpen = document.querySelector('.header__background-navigation_menu');
//     const burgerButton = document.querySelector('.header__background-navigation_bar-burger');
//     const crossButton = document.querySelector('.header__background-navigation_bar-cross');
//     if (!e.target.menuOpen) {
//         crossButton.classList.remove('active');
//         menuOpen.classList.remove('active');
//         menuOpen.classList.add('hide');
//         burgerButton.classList.add("active");
//     }
// });







