const loader = document.querySelector('.loader');

window.onload = function () {
    loader.classList.add('_loaded');
    window.setTimeout(function () {
        loader.classList.add('_hide');
        loader.classList.remove('_loaded');
    }, 500);
};
