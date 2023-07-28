// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_CATALOGO = SERVER + 'public/catalogo.php?action=';
const API_PEDIDOS = SERVER + 'public/pedidos.php?action=';
  // Se busca en la URL las variables (parámetros) disponibles.
  let params = new URLSearchParams(location.search);
  // Se obtienen los datos localizados por medio de las variables.
  const ID = params.get('id');
// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que muestra el detalle del producto seleccionado previamente.
    readOneProducto(ID);
    readComents(API_CATALOGO);
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
});
// Función para obtener y mostrar los datos del producto seleccionado.
function readOneProducto(id) {
    // Se define un objeto con los datos del producto seleccionado.
   const data = new FormData();
    data.append('id_producto', id); 
    // Petición para obtener los datos del producto solicitado.
    fetch(API_CATALOGO + 'readOne', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se colocan los datos en la tarjeta de acuerdo al producto seleccionado previamente.
                    document.getElementById('imagen').setAttribute('src', SERVER + 'images/productos/' + response.dataset.imagen_prod);
                    document.getElementById('nombre').textContent = response.dataset.nombre;
                    document.getElementById('descripcion').textContent = response.dataset.descripcion;
                    document.getElementById('precio').textContent = response.dataset.precio;
                    // Se asigna el valor del id del producto al campo oculto del formulario.
                    document.getElementById('id_producto').value = response.dataset.id_producto;
                    switch (response.dataset.valoracion) {
                        case 5:
                            document.getElementById('radio5').setAttribute('checked','on')
                            break;
                        case 4:
                            document.getElementById('radio4').setAttribute('checked','on')
                            break;
                        case 3:
                            document.getElementById('radio3').setAttribute('checked','on')
                            break;
                        case 2:
                            document.getElementById('radio2').setAttribute('checked','on')
                            break;
                        case 1:
                            document.getElementById('radio1').setAttribute('checked','on')
                            break;
                        default:
                            break;
                    }
                    document.getElementById('votantes').textContent = response.dataset.clientes;
                } else {
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById('title').innerHTML = `<i class="material-icons small">cloud_off</i><span class="red-text">${response.exception}</span>`;
                    // Se limpia el contenido cuando no hay datos para mostrar.
                    document.getElementById('detalle').innerHTML = '';
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de agregar un producto al carrito.
document.getElementById('shopping-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para agregar un producto al pedido.
    fetch(API_PEDIDOS + 'createDetail', {
        method: 'post',
        body: new FormData(document.getElementById('shopping-form'))
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
                if (response.status) {
                    sweetAlert(1, response.message, 'cart.html');
                } else {
                    // Se verifica si el cliente ha iniciado sesión para mostrar la excepción, de lo contrario se direcciona para que se autentique. 
                    if (response.session) {
                        sweetAlert(2, response.exception, null);
                    } else {
                        sweetAlert(3, response.exception, 'login.html');
                    }
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

let radioVal;

const radios = document.querySelectorAll('input[name="estrellas"]');
radios.forEach(radio => {
  radio.addEventListener('click', function () {
    radioVal = radio.value;
    console.log(radioVal);
  });
});

document.getElementById('a_valoracion').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se define una variable para establecer la acción a realizar en la API.
    // Se comprueba si el campo oculto del formulario esta seteado para actualizar, de lo contrario será para crear.
    (document.getElementById('id_producto').value);
    // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
    saveRow(API_CATALOGO,'Rating', 'a_valoracion',null);
});

function readComents(api) {
    fetch(api + 'readComents', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                let data = [];
                // Se comprueba si la respuesta es satisfactoria para obtener los datos, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    data = response.dataset;
                // Se envían los datos a la función del controlador para llenar la tabla en la vista.
                let content = '';
                // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                data.map(function (row) {
                    // Se establece un icono para el estado del producto.
                    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                    switch (row.valoracion) {
                        case 5:
                            valo=`   <p class="clasificacion-test">   
                            <input id="valo5" type="radio" value="5" disabled checked>
                            <label for="valo5">★</label>
                            <input id="valo4" type="radio" value="4" disabled>
                              <label for="valo4">★</label>
                              <input id="valo3" type="radio" value="3" disabled>
                                <label for="valo3">★</label>
                                <input id="valo2" type="radio" value="2" disabled>
                                  <label for="valo2">★</label>
                                  <input id="valo1" type="radio" value="1" disabled>
                                    <label for="valo1">★</label>
                                    </p>`
                            break;
                        case 4:
                            valo=`   <p class="clasificacion-test">
                               <input id="valo5" type="radio" value="5" disabled>
                            <label for="valo5">★</label>
                            <input id="valo4" type="radio" value="4" disabled checked>
                              <label for="valo4">★</label>
                              <input id="valo3" type="radio" value="3" disabled>
                                <label for="valo3">★</label>
                                <input id="valo2" type="radio" value="2" disabled>
                                  <label for="valo2">★</label>
                                  <input id="valo1" type="radio" value="1" disabled>
                                    <label for="valo1">★</label>
                                    </p>`
                            break;
                        case 3:
                            valo=`     <p class="clasificacion-test">
                             <input id="valo5" type="radio" value="5" disabled>
                            <label for="valo5">★</label>
                            <input id="valo4" type="radio" value="4" disabled>
                              <label for="valo4">★</label>
                              <input id="valo3" type="radio" value="3" disabled checked>
                                <label for="valo3">★</label>
                                <input id="valo2" type="radio" value="2" disabled>
                                  <label for="valo2">★</label>
                                  <input id="valo1" type="radio" value="1" disabled>
                                    <label for="valo1">★</label>
                                    </p>`
                            break;
                        case 2:
                            valo=`     <p class="clasificacion-test">
                             <input id="valo5" type="radio" value="5" disabled>
                            <label for="valo5">★</label>
                            <input id="valo4" type="radio" value="4" disabled>
                              <label for="valo4">★</label>
                              <input id="valo3" type="radio" value="3" disabled>
                                <label for="valo3">★</label>
                                <input id="valo2" type="radio" value="2" disabled checked>
                                  <label for="valo2">★</label>
                                  <input id="valo1" type="radio" value="1" disabled>
                                    <label for="valo1">★</label>
                                    </p>`
                            break;
                        case 1:
                            valo=`    <p class="clasificacion-test">
                              <input id="valo5" type="radio" value="5" disabled>
                            <label for="valo5">★</label>
                            <input id="valo4" type="radio" value="4" disabled>
                              <label for="valo4">★</label>
                              <input id="valo3" type="radio" value="3" disabled>
                                <label for="valo3">★</label>
                                <input id="valo2" type="radio" value="2" disabled>
                                  <label for="valo2">★</label>
                                  <input id="valo1" type="radio" value="1" disabled checked>
                                    <label for="valo1">★</label>
                                    </p>`
                            break;
                        default:
                            break;
                    }
             if (response.user==row.id_cliente) {
                    content += `
                    <div class="card joe"><span class="card-title indigo-text">${row.usuario}</span><div class="card-content white black-text"><h6>${row.comentario}</h6>${valo}</div><div class="card-action">
                    <a id="editar" onclick="editar(${ID})" class="btn waves-effect blue"><i class="material-icons md-light">edit</i><a></div></div>
                      `;
                }else{
                    content += `
                  <div class="card joe"><span class="card-title indigo-text">${row.usuario}</span><div class="card-content white black-text"><h6>${row.comentario}</h6>${valo}</div></div>
                    `;
                }});
                // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                document.getElementById('m_comentarios').innerHTML = content;
                }else {
                    content = `
                    <div class="card joe"><div class="card-content center white black-text"><h6>${response.exception}</h6></div></div
                      `;
                    document.getElementById('m_comentarios').innerHTML = content ;
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

function editar(id) {
    const data = new FormData();
    data.append('id_produ', id);
    fetch(API_CATALOGO + 'readComent', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    let content = '';
                    switch (response.dataset.valoracion) {
                        case 5:
                            rating=`   <p class="clasificacion-test">   
                            <input id="editvalo5" type="radio" value="5" name="rating" checked>
                            <label for="editvalo5">★</label>
                            <input id="editvalo4" type="radio" value="4" name="rating">
                              <label for="editvalo4">★</label>
                              <input id="editvalo3" type="radio" value="3" name="rating">
                                <label for="editvalo3">★</label>
                                <input id="editvalo2" type="radio" value="2" name="rating">
                                  <label for="editvalo2">★</label>
                                  <input id="editvalo1" type="radio" value="1" name="rating">
                                    <label for="editvalo1">★</label>
                                    </p>`
                            break;
                        case 4:
                            rating=`   <p class="clasificacion-test">
                               <input id="editvalo5" type="radio" value="5" name="rating">
                            <label for="editvalo5">★</label>
                            <input id="editvalo4" type="radio" value="4" name="rating" checked>
                              <label for="editvalo4">★</label>
                              <input id="editvalo3" type="radio" value="3" name="rating">
                                <label for="editvalo3">★</label>
                                <input id="editvalo2" type="radio" value="2" name="rating">
                                  <label for="editvalo2">★</label>
                                  <input id="editvalo1" type="radio" value="1" name="rating">
                                    <label for="editvalo1">★</label>
                                    </p>`
                            break;
                        case 3:
                            rating=`     <p class="clasificacion-test">
                             <input id="editvalo5" type="radio" value="5" name="rating">
                            <label for="editvalo5">★</label>
                            <input id="editvalo4" type="radio" value="4" name="rating">
                              <label for="editvalo4">★</label>
                              <input id="editvalo3" type="radio" value="3" name="rating" checked>
                                <label for="editvalo3">★</label>
                                <input id="editvalo2" type="radio" value="2" name="rating">
                                  <label for="editvalo2">★</label>
                                  <input id="editvalo1" type="radio" value="1" name="rating">
                                    <label for="editvalo1">★</label>
                                    </p>`
                            break;
                        case 2:
                            rating=`     <p class="clasificacion-test">
                             <input id="editvalo5" type="radio" value="5" name="rating">
                            <label for="editvalo5">★</label>
                            <input id="editvalo4" type="radio" value="4" name="rating">
                              <label for="editvalo4">★</label>
                              <input id="editvalo3" type="radio" value="3" name="rating">
                                <label for="editvalo3">★</label>
                                <input id="editvalo2" type="radio" value="2" name="rating" checked>
                                  <label for="editvalo2">★</label>
                                  <input id="editvalo1" type="radio" value="1" name="rating">
                                    <label for="editvalo1">★</label>
                                    </p>`
                            break;
                        case 1:
                            rating=`    <p class="clasificacion-test">
                              <input id="editvalo5" type="radio" value="5" name="rating">
                            <label for="editvalo5">★</label>
                            <input id="editvalo4" type="radio" value="4" name="rating">
                              <label for="editvalo4">★</label>
                              <input id="editvalo3" type="radio" value="3" name="rating">
                                <label for="editvalo3">★</label>
                                <input id="editvalo2" type="radio" value="2" name="rating">
                                  <label for="editvalo2">★</label>
                                  <input id="editvalo1" type="radio" value="1" name="rating" checked>
                                    <label for="editvalo1">★</label>
                                    </p>`
                            break;
                        default:
                            break;
                    }
                    content += `
                    <div class="card joe"><form id="e_valoracion"><textarea name="edit_comentario">${response.dataset.comentario}</textarea>${rating}<div class="card-action">  <a onclick="guardar()" class="btn waves-effect blue tooltipped" data-tooltip="Editar">
                    <i class="material-icons">save</i>
                </a></form></div>
                      `;
                    document.getElementById('m_comentarios').innerHTML = content ;
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}
 function guardar() {
    saveRow(API_CATALOGO,'updateRating', 'e_valoracion',null);
 }