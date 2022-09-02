(function () {

    let DB;

    listadoReserva = document.querySelector('#listado-reserva');

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if (window.indexedDB.open('reserva', 1)) {
            obtenerReserva();
        }


    });

    function crearDB() {
        const crearDB = window.indexedDB.open('reserva', 1);
        console.log(crearDB);

        crearDB.onerror = function () {
            console.log('error');
        };

        crearDB.onsuccess = function () {
            DB = crearDB.result;
            console.log(DB);

        };

        crearDB.onupgradeneeded = function (e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('reserva', { keyPath: 'id', autoIncrement: true });
            console.log(db);

            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('cancha', 'cancha', { unique: false });
            objectStore.createIndex('horaInicio', 'horaInicio', { unique: false });
            objectStore.createIndex('horaFinal', 'horaFinal', { unique: false });


        };


    }

    function obtenerReserva() {
        const abrirConexion = window.indexedDB.open('reserva', 1);

        abrirConexion.onerror = function () {
            console.log('error');
        }

        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;
            const objectStore = DB.transaction('reserva').objectStore('reserva');

            objectStore.openCursor().onsuccess = function (e) {
                const cursor = e.target.result;
                if (cursor) {
                    const { nombre, cancha, horaInicio, horaFinal } = cursor.value;

                    listadoReserva.innerHTML += `
                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p class="text-gray-700">${nombre}</p>                                
                            </td>
                            <td class="uppercase px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class=" text-gray-700">${cancha}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                                <p class="text-gray-600">${horaInicio}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                                <p class="text-gray-600">${horaFinal}</p>
                            </td>
                        </tr>
                    `;

                    cursor.continue();
                } else {
                    console.log('no hay mas reservas');
                }

            }
        }


    }

})();

