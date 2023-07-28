const API_CATALOGO = SERVER + 'public/catalogo.php?action=';
document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que muestra el detalle del producto seleccionado previamente.
    readRows(API_CATALOGO);
});
document.getElementById('search-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    searchRows(API_CATALOGO, 'search-form');
});
function fillTable(dataset) {
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se establece un icono para el estado del producto.
        content += `
<div class="col s12 m6 l4">
    <div class="card small hoverable">
        <div class="card-image">
            <img src="${SERVER}images/productos/${row.imagen_prod}" class="activator materialboxed">
        </div>
        <div class="card-reveal">
        <span class="card-title">Descripcion<i class="material-icons right">close</i></span>
            <p>${row.descripcion}</p>
        </div>
        <div class="card-content">
            <a href="detail.html?id=${row.id_producto}"
                class="btn-floating halfway-fab waves-effect waves-light red tooltipped" data-tooltip="Ver detalle">
                <i class="material-icons">more_horiz</i>
            </a>
            <span class="card-title">${row.nombre}</span>
            <h6>${row.tipo_producto}</h6>
            <p>Precio(US$) ${row.precio}</p>
        </div>
    </div>
</div>
`;
    });
    document.getElementById('productos').innerHTML = content;
}