// const url = 'http://localhost:8080/Profesionales'
const url = 'https://api-profesionalesvol.onrender.com/profesionales'

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
                `<td><button type="button" class="btn btn-danger" onclick=" confirmarEliminar('${usuario.nombre_profesional}')">Eliminar</button></td>` +
                `<td><button onclick="redireccionarEditar('${usuario.nombre_profesional}', '${usuario.tipo_documento}', '${usuario.numero_documento}', '${usuario.estado_voluntario}', '${usuario.fecha_registro}')">Editar</button></td>` +
                `</tr>`
            })
            objectId.innerHTML = contenido
        })

}

const registrarUsuario = () => {
    const nombre = document.getElementById('nombre').value
    const tipoDoc = document.getElementById('tipoDoc').value
    const numDoc = document.getElementById('numDoc').value
    const estado = document.getElementById('estado').value
    const FechaReg = document.getElementById('FechaReg').value

    if (nombre.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'

    }
    else if (tipoDoc.length == "Seleccionar") {
        document.getElementById('tipoDocHelp').innerHTML = 'Dato requerido'
    }
    else if (numDoc == 0) {
        document.getElementById('numDocHelp').innerHTML = 'Dato requerido'
    }
    else if (estado == "") {
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    }
    else if (FechaReg.length == 0) {
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    }
    else {
        let usuario = {
            nombre_profesional: nombre,
            tipo_documento: tipoDoc,
            numero_documento: numDoc,
            estado_voluntario: (estado.toLowerCase() === 'true'),
            fecha_registro: FechaReg
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
                    window.location.href='index.html';
                }, 1000);
            })
    }
}

const actualizarUsuario = () => {
    const nombre = document.getElementById('nombre').value
    const tipoDoc = document.getElementById('tipoDoc').value
    const numDoc = document.getElementById('numDoc').value
    const estado = document.getElementById('estado').value
    const FechaReg = document.getElementById('FechaReg').value

    if (nombre.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'

    }
    else if (tipoDoc.length == "Seleccionar") {
        document.getElementById('tipoDocHelp').innerHTML = 'Dato requerido'
    }
    else if (numDoc == 0) {
        document.getElementById('numDocHelp').innerHTML = 'Dato requerido'
    }
    else if (estado == "") {
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    }
    else if (FechaReg.length == 0) {
        document.getElementById('estadoHelp').innerHTML = 'Dato requerido'
    }
    else {
        let usuario = {
            nombre_profesional: nombre,
            tipo_documento: tipoDoc,
            numero_documento: numDoc,
            estado_voluntario: (estado.toLowerCase() === 'true'),
            fecha_registro: FechaReg
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
                    window.location.href='index.html';
                }, 1000);
            })
    }
}

const redireccionarEditar = (nombre_profesional, tipo_documento, numero_documento, estado, fecha_registro) => {
    document.location.href = `editarUsuarios.html?nombre_profesional=${nombre_profesional}&tipo_documento=${tipo_documento}&numero_documento=${numero_documento}&estado=${estado}&fecha_registro=${fecha_registro}`;
}

const editarUsuario = () => {
    //Obtener datos de la URL
    var urlParams = new URLSearchParams(window.location.search);
    //Asignar valores a cajas de texto
    document.getElementById('nombre').value = urlParams.get('nombre_profesional');
    document.getElementById('tipoDoc').value = urlParams.get('tipo_documento');
    document.getElementById('numDoc').value = urlParams.get('numero_documento');
    document.getElementById('estado').value = urlParams.get('estado');
    document.getElementById('FechaReg').value = urlParams.get('fecha_registro');
}

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
        const deleteUrl = `${url}`;  // Solo la ruta base, ya que el ID irá en el cuerpo de la solicitud

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ nombre_profesional })  // Incluye el ID en el cuerpo de la solicitud
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
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
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