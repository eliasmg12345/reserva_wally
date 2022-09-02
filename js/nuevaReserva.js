(function () {

    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        conectarBD();


        formulario.addEventListener('submit', validarReserva);

    });

    function conectarBD() {
        const abrirConexion = window.indexedDB.open('reserva', 1);
        console.log(abrirConexion);

        abrirConexion.onerror = function () {
            console.log('error');
        };

        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;
            console.log(DB);

        };



    }

    function validarReserva(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const cancha = document.querySelector('#cancha').value;
        const horaInicio = document.querySelector('#horaInicio').value;
        const horaFinal = document.querySelector('#horaFinal').value;

        if (nombre === '' || cancha === '' || horaInicio === '' || horaFinal === '') {

            imprimirAlerta('Campos requeridos', 'error');
            return;

        }

        const reserva = {
            nombre,
            cancha,
            horaInicio,
            horaFinal,
        };
        reserva.id = Date.now();

        crearNuevaReserva(reserva);
    }

    function crearNuevaReserva(reserva) {
        const transaction = DB.transaction(['reserva'], 'readwrite');

        const objectStore = transaction.objectStore('reserva');

        objectStore.add(reserva);

        transaction.onerror = function () {
            imprimirAlerta('Hubo un error', 'error');
        };

        transaction.oncomplete = function () {
            console.log('cliente agregado');
            imprimirAlerta('Reserva agregada exitosamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        };
    }


})();

