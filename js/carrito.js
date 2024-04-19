function load() {
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

  console.log(sessionStorage.getItem('compratotal'));
  var compratotalString = sessionStorage.getItem('compratotal');
  var compratotalArray = JSON.parse(compratotalString);
  console.log(compratotalArray);
  var pago = 0;

  for (var i = 0; i < compratotalArray.length; i++) {
    var pagocanti = 0;
    var produs = "<div class='card-body'>" +
      "<h5 class='card-title'>" + compratotalArray[i][1] + "</h5>" +
      "<div class='presio'>" +
      "<p class='card-text' style='text-align: right;'>cantidad: " + compratotalArray[i][3] + "</p>" +
      "<p class='card-text' style='text-align: right;'>precio unitario: " + parseFloat(compratotalArray[i][2].toFixed(2)).toFixed(2) + "€</p>" +
      "</div>" +
      "</div><br>";

    pagocanti = compratotalArray[i][3] * compratotalArray[i][2];
    pago += pagocanti;

    var produsElement = document.getElementById("produs");
    produsElement.innerHTML += produs;
  }

  pago = formatPrice(pago);

  var produs = "<div class='card-body'>" +
    "<h5 class='card-title'>Precio Total: " + pago + "€</h5>" +
    "</div><br>";
  globalThis.ticket = pago;
  var produsElement = document.getElementById("produs");
  produsElement.innerHTML += produs;
}

window.onload = load;

function sesiont() {
  sessionStorage.removeItem('username');
  location.replace("sesion.html");
}

function buscado() {
  textobuscado = document.getElementById("textobuscado").value;
  sessionStorage.setItem('buscasion', textobuscado);
  location.replace("busqueda.html");
}

function comprafinal() {
  if (sessionStorage.getItem('username') == null) {
    alert("Inicie sesión para continuar con su compra.");
    location.replace("sesion.html");
  } else {
    sessionStorage.setItem('ticketfinal', globalThis.ticket);
    location.replace("pago.html");
  }
}

function formatPrice(value) {
  var fixedValue = parseFloat(value).toFixed(2);
  var parts = fixedValue.split('.');

  if (parts[1].length === 1) {
    fixedValue += '0';
  }

  return fixedValue;
}
