/*
* Este controlador es de uso general en las páginas web del sitio público.
* Sirve para manejar las plantillas del encabezado y pie del documento.
*/

// Constante para establecer la ruta y parámetros de comunicación con la API.
const API = SERVER + 'public/clientes.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Petición para determinar si se ha iniciado sesión.
    fetch(API + 'getUser', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se define una variable para asignar el encabezado del documento.
                let header = '';
                // Se comprueba si el usuario está autenticado para establecer el encabezado respectivo.
                if (response.session && !document.getElementById('token') && !document.getElementById('changepasswordium')) {
                    header = `
<div class="navbar-fixed">
    <nav class="nav-extended">
        <div class="nav-wrapper">
            <a href="index.html" class="brand-logo"><img src="${SERVER}/images/logo.png" height="64"></a>
            <a data-target="mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
                <li><a href="cart.html"><i class="material-icons left">shopping_cart</i>Carrito</a></li>
                <li><a href="#" class="dropdown-trigger" data-target="desktop-dropdown">
                        <i class="material-icons left">verified_user</i>Cuenta: <b>${response.username}</b>
                    </a></li>
            </ul>
           </div>  
       
    </nav>
    <ul id="desktop-dropdown" class="dropdown-content">
        <li><a href="profile.html"><i class="material-icons">face</i>Editar perfil</a></li>
        <li><a href="password.html"><i class="material-icons">lock</i>Cambiar clave</a></li>
        <li><a onclick="logOut()"><i class="material-icons">clear</i>Salir</a></li>
    </ul>
</div>
<ul class="sidenav" id="mobile">
    <li><img src="../../resources/img/jellyfishanimated.gif" width="90%" /></li>
    <li><a href="cart.html"><i class="material-icons left">shopping_cart</i>Carrito</a></li>
    <li>
        <a href="#" class="dropdown-trigger" data-target="mobile-dropdown">
            <i class="material-icons left">verified_user</i>Cuenta: <b>${response.username}</b>
        </a>
    </li>
</ul>
<ul id="mobile-dropdown" class="dropdown-content">
    <li><a href="profile.html">Editar perfil</a></li>
    <li><a href="password.html">Cambiar clave</a></li>
    <li><a onclick="logOut()">Salir</a></li>
</ul>
`;
if (document.getElementById('username')) {
    document.getElementById('username').innerHTML=response.username  
}

                } else {
                    header = `
<div class="navbar-fixed">
    <nav class="nav-extended  pink lighten-2">
        <div class="nav-wrapper">
            <a href="index.html" class="brand-logo"><img src="${SERVER}images/logo.png" height="80"></a>
            <a data-target="mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
                <li><a href="signup.html"><i class="material-icons left">person</i>Crear cuenta</a></li>
                <li><a href="login.html"><i class="material-icons left">login</i>Iniciar sesión</a></li>
                <li></li>
            </ul>
        </div>
    </nav>
</div>
<ul class="sidenav" id="mobile">
    <li><img src="${SERVER}images/logo.png" width="90%" /></li>
    <li><a href="signup.html"><i class="material-icons left">person</i>Crear cuenta</a></li>
    <li><a href="login.html"><i class="material-icons left">login</i>Iniciar sesión</a></li>
</ul>
`;
if (document.getElementById('username')) {
    document.getElementById('username').innerHTML='anonimo'
}
                }
                // Se asigna a la página web el contenido del encabezado.
                document.querySelector('header').innerHTML = header;
                // Se define el componente Parallax.
                let slider = `
                <div class="slider">
                <ul class="slides" id="slider-images">
                </ul>
              </div>
`;
                // Se asigna el componente Parallax antes de la etiqueta footer.
                document.querySelector('main').insertAdjacentHTML('beforebegin', slider);
                // Se establece el pie del encabezado.
                const footer = `
<div class="container">
    <div class="row">
        <div class="col l6 s12">
            <h5 class="white-text">Contáctanos</h5>
            <ul>
                <a class="ligth" href="mailto:jellyfish@info.com"><span class="material-icons">email</span></a>
                <a class="ligth" href="tel:+50374686573"><span class="material-icons">call</span></a>
            </ul>
        </div>
        <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Redes sociales</h5>
            <ul>
                <li>
                    <a class="grey-text text-lighten-3" href="https://www.instagram.com/" target="_blank"><img
                            class="social" src="../../resources/img/social/instagram2.png" width="20 px"
                            heigth="20px" />Instagram</a>
                </li>
                <li>
                    <a class="grey-text text-lighten-3" href="https://www.facebook.com/" target="_blank"><img
                            class="social" src="../../resources/img/social/facebook2.png" width="20 px"
                            heigth="20px" />Facebook</a>
                </li>
                <li>
                    <a class="grey-text text-lighten-3" href="https://api.whatsapp.com/send?phone=50374686573"
                        target="_blank"><img class="social" src="../../resources/img/social/whatsapp2.png" width="20 px"
                            heigth="20px" />Whatsapp</a>
                </li>
                <li>
                    <a class="grey-text text-lighten-3" href="https://www.twitter.com/" target="_blank"><img
                            class="social" src="../../resources/img/social/twitter2.png" width="20 px"
                            heigth="20px" />Twitter</a>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="footer-copyright">
    <div class="container white-text">
        &reg 2022 Jellyfish hardware, todos los derechos reservados "tecnología de calidad en un solo lugar" y el logo
        son marcas registras de <a href="https://dinypoladus.wixsite.com/central">dinypoladus corporation &reg</a>
    </div>
</div>
`;
                // Se asigna a la página web el contenido del pie.
                document.querySelector('footer').innerHTML = footer;
                // Se inicializa el componente Sidenav para que funcione la navegación lateral.
                M.Sidenav.init(document.querySelectorAll('.sidenav'));
                //se inicializa para que foncione el dropdown
                M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
                // Se declara e inicializa un arreglo con los nombres de las imagenes que se pueden utilizar en el efecto parallax.
                let images = ['img01.jpeg', 'img02.jpg', 'img03.jpg', 'img04.jpg', 'img05.jpg'];
                // Se declara e inicializa una variable para obtener un elemento del arreglo de forma aleatoria.
                images.forEach(function(image) {
                    let slide = document.createElement('li');
                    slide.innerHTML = '<img src="../../resources/img/parallax/' + image + '">';
                    document.getElementById('slider-images').appendChild(slide);
                  });
                // Se inicializa el efecto Parallax.
                M.Slider.init(document.querySelectorAll('.slider'));
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});