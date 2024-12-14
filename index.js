document.addEventListener("DOMContentLoaded", function () {
    const bt_ejercicio1 = document.getElementById('ejercicio-1');
    const bt_ejercicio2 = document.getElementById('ejercicio-2');
    const bt_ejercicio3 = document.getElementById('ejercicio-3');

    /*-------------------------------------------------------------*/
    const redirigir = (relative_URL) => {
        window.location.href = relative_URL;
    }

    /*-------------------------------------------------------------*/
    bt_ejercicio1.addEventListener('click', () => redirigir('Ejercicio no. 1/ejercicio1.html'));
    bt_ejercicio2.addEventListener('click', () => redirigir('Ejercicio no. 2/ejercicio2.html'));
    bt_ejercicio3.addEventListener('click', () => redirigir('Ejercicio no. 3/ejercicio3.html'));
});