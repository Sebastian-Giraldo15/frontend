
const url = 'http://localhost:8080/Profesionales'
// const url = 'https://api-profesionalesvol.onrender.com/profesionales'

const listarUsuarios = async () => {
    //Objeto del html donde se deslegará la información
    let objectId = document.getElementById('contenido')
    let contenido = ''//Contiene filas y celdas que se desplegarán en el tbody

    //Fecth permite reaizar peticiones http a una url
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(function (data) {//Se manipulan los datos obtenidos de la url
            let listaUsuarios = data.msg //msg es el nombre de la lista retorna con json
            // console.log(listaUsuarios)
            listaUsuarios.map(function (usuario) {
                //Configurar el objeto para enviarlo por URL
                objetoUsuario = Object.keys(usuario).map(key => key + '=' + encodeURIComponent(usuario[key])).join('&');
                // console.log(usuario)
                contenido = contenido + `<tr>` +
                    `<td>` + usuario.nombre_profesional + `</td>` +
                    `<td>` + usuario.tipo_documento + `</td>` +
                    `<td>` + usuario.numero_documento + `</td>` +
                    `<td>` + usuario.estado_voluntario + `</td>` +
                    `<td>` + usuario.fecha_registro + `</td>` +
                    `<td>` + usuario.preciodolar.toFixed(2) + `</td>` +
                    `<td><button type="button" class="btn btn-danger" onclick=" confirmarEliminar('${usuario.nombre_profesional}')">Eliminar</button></td>` +
                    `<td><button onclick="redireccionarEditar('${usuario.nombre_profesional}', '${usuario.tipo_documento}', '${usuario.numero_documento}', '${usuario.estado_voluntario}', '${usuario.fecha_registro}', '${usuario.preciodolar.toFixed(2)}')">Editar</button></td>` +
                    `</tr>`;
                
            })
            objectId.innerHTML = contenido
        })

}

const obtenerPrecioDolar = async () => {
    try {
        const response = await fetch('https://www.datos.gov.co/resource/mcec-87by.json');
        if (!response.ok) {
            throw new Error(`Error al obtener el precio del dólar. Código de respuesta: ${response.status}`);
        }
        const data = await response.json();
        
        const preciodolar = parseFloat(data[0].valor);
        return preciodolar;
    } catch (error) {
        console.error('Error al obtener el precio del dólar:', error.message);
        throw error;
    }
};

const llenarPrecioDolarEnFormulario = async () => {
    try {
        const preciodolar = await obtenerPrecioDolar();
        document.getElementById('preciodolar').value = preciodolar;
    } catch (error) {
        
        console.error('Error al llenar el campo de precio del dólar en el formulario:', error.message);
    }
};

const registrarUsuario = async () => {
    try {
        await llenarPrecioDolarEnFormulario();

        const nombre = document.getElementById('nombre').value;
        const tipoDoc = document.getElementById('tipoDoc').value;
        const numDoc = document.getElementById('numDoc').value;
        const estado = document.getElementById('estado').value;
        const FechaReg = document.getElementById('FechaReg').value;
        const preciodolar = document.getElementById('preciodolar').value;

        if (nombre.length == 0) {
            document.getElementById('nombreHelp').innerHTML = 'Dato requerido'

        }
        else if (tipoDoc.length == 0) {
            document.getElementById('tipoDocHelp').innerHTML = 'Dato requerido'
        }
        else if (numDoc.length == 0) {
            document.getElementById('numDocHelp').innerHTML = 'Dato requerido';
        }
        else if (estado == 0) {
            document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
        }
        else if (FechaReg.length == 0) {
            document.getElementById('FechaRegHelp').innerHTML = 'Dato requerido'
        }
        else if (preciodolar.length == 0) {
            document.getElementById('preciodolarHelp').innerHTML = 'Dato requerido'
        }
        else {
            let usuario = {
                nombre_profesional: nombre,
                tipo_documento: tipoDoc,
                numero_documento: numDoc,
                estado_voluntario: (estado.toLowerCase() === 'true'),
                fecha_registro: FechaReg,
                preciodolar: parseFloat(preciodolar)
            }

            //Fecth permite reaizar peticiones http a una url
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(usuario),//Convertir el objeto a JSON
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })

                .then((res) => res.json())//Obtener respuesta de la petición
                .then(json => {
                    alert(json.msg) //Imprimir el mensaje de la transacción
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                })
        }

    } catch (error) {
        console.error('Error al registrar el profesional:', error.message);
        alert('Error al registrar el profesional. Por favor, inténtalo de nuevo más tarde.');
    }
};



const actualizarUsuario = () => {
    const nombre = document.getElementById('nombre').value
    const tipoDoc = document.getElementById('tipoDoc').value
    const numDoc = document.getElementById('numDoc').value
    const estado = document.getElementById('estado').value
    const FechaReg = document.getElementById('FechaReg').value
    const preciodolar = document.getElementById('preciodolar').value

    if (nombre.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'

    }
    else if (tipoDoc.length == "Seleccionar") {
        document.getElementById('tipoDocHelp').innerHTML = 'Dato requerido'
    }
    else if (numDoc.length == 0) {
        document.getElementById('numDocHelp').innerHTML = 'Dato requerido';
    }
    else if (estado == 0) {
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    }
    else if (FechaReg.length == 0) {
        document.getElementById('FechaRegHelp').innerHTML = 'Dato requerido'
    }
    else if (preciodolar.length == 0) {
        document.getElementById('preciodolarHelp').innerHTML = 'Dato requerido'
    }
    else {
        let usuario = {
            nombre_profesional: nombre,
            tipo_documento: tipoDoc,
            numero_documento: numDoc,
            estado_voluntario: (estado.toLowerCase() === 'true'),
            fecha_registro: FechaReg,
            preciodolar: parseFloat(preciodolar)
        }

        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: (json.msg),
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            })
    }
}

const redireccionarEditar = (nombre_profesional, tipo_documento, numero_documento, estado, fecha_registro, preciodolar) => {
    document.location.href = `editarUsuarios.html?nombre_profesional=${nombre_profesional}&tipo_documento=${tipo_documento}&numero_documento=${numero_documento}&estado=${estado}&fecha_registro=${fecha_registro}&preciodolar=${preciodolar}`;
}



const editarUsuario = async () => {
    // Obtener datos de la URL
    var urlParams = new URLSearchParams(window.location.search);
    // Asignar valores a cajas de texto
    document.getElementById('nombre').value = urlParams.get('nombre_profesional');
    document.getElementById('tipoDoc').value = urlParams.get('tipo_documento');
    document.getElementById('numDoc').value = urlParams.get('numero_documento');
    document.getElementById('estado').value = urlParams.get('estado');
    document.getElementById('FechaReg').value = urlParams.get('fecha_registro');

    try {
        // Obtener el precio actual del dólar desde la API
        const response = await fetch('https://www.datos.gov.co/resource/mcec-87by.json');
        if (!response.ok) {
            throw new Error(`Error al obtener el precio del dólar. Código de respuesta: ${response.status}`);
        }
        const data = await response.json();
        const preciodolar = parseFloat(data[0].valor);
        document.getElementById('preciodolar').value = preciodolar;

    } catch (error) {
        console.error('Error al obtener el precio del dólar:', error.message);
        alert('Error al obtener el precio del dólar. Por favor, inténtalo de nuevo más tarde.');
    }

};


if (document.querySelector('#btnRegistrar')) { //Si el objeto existe
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarUsuario)
}
if (document.querySelector('#btnActualizar')) {
    document.querySelector('#btnActualizar')
        .addEventListener('click', actualizarUsuario)
}


const eliminarProfesional = async (nombre_profesional) => {
    try {
        const deleteUrl = `${url}`;

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ nombre_profesional })
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código de respuesta: ${response.status}`);
        }

        const json = await response.json();
        Swal.fire({
            position: "center",
            icon: "success",
            title: (json.msg),
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            listarUsuarios();
        }, 1000);

    } catch (error) {
        console.error('Error al eliminar el profesional:', error.message);
        alert('Error al eliminar el profesional. Por favor, inténtalo de nuevo más tarde.');
    }

};
function confirmarEliminar(nombre_profesional) {


    Swal.fire({
        title: "¿Estás seguro de que deseas eliminar este Profesional?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarProfesional(nombre_profesional);
        }
    });
}

llenarPrecioDolarEnFormulario()