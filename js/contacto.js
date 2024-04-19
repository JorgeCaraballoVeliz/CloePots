function preguntaT() {
    console.log('uwu');

   
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var cats = JSON.parse(this.response);
           console.log(cats);//verificar que se han enviado los datos correctamente
           if (typeof cats !== 'undefined') {
           //alert("PREGUNTA ENVIADA CORRECTAMENTE");
           //location.replace("index.html");
           var produs ="<div class='card-body'>" +
           "<h5 class='card-title text-success'>PREGUNTA ENVIADA CORRECTAMENTE</h5>" +
           "</div><br>";
         var produsElement = document.getElementById("pregun");
         produsElement.innerHTML = produs;
        }
        }
    };

    var codped = document.getElementById("codped").value;
    var pregunta = document.getElementById("pregunta").value;

    if (codped == '') { //por aqui los pattern
        //alert("Introduce el código del pedido por favor");
        var produs ="<div class='card-body'>" +
            "<h5 class='card-title text-danger'>EL CÓDIGO INTRODUCIDO NO ES VÁLIDO, POR FAVOR INTRODUZCA UN CÓDIGO EXISTENTE</h5>" +
            "</div><br>";
          var produsElement = document.getElementById("pregun");
          produsElement.innerHTML = produs;
    } else {
        xhttp.open("GET", "php/contacto.php?codped="+ codped +"&pregunta="+pregunta,false);
        xhttp.send();
        return false;
    }
    



}


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
