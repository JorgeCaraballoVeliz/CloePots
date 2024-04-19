function load() {
    /////sesion
    console.log("Page loaded!");
  var storedUsername = sessionStorage.getItem('username');
  if (storedUsername) {
    globalThis.usu = storedUsername;
    var nombreUsuario = "<li class='nav-item dropdown'><a class='nav-link dropdown-toggle' href='#' id='navbardrop' data-toggle='dropdown'>" + globalThis.usu + "</a><div class='dropdown-menu'><a class='dropdown-item' href='#' onclick='return sesiont();'>Cerrar sesión</a></div></li>";

    var nombreUsuarioElement = document.getElementById("nombreUsuario");
    nombreUsuarioElement.innerHTML = nombreUsuario;
  } else {
    console.log("User session data not found");
  }


}
window.onload = load;

function sesiont() { //cerrar sesion
    sessionStorage.removeItem('username');
    location.replace("sesion.html");
}

function buscado() {
  textobuscado = document.getElementById("textobuscado").value;
  sessionStorage.setItem('buscasion', textobuscado);
  location.replace("busqueda.html");
}
