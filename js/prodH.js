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


    /////productos
    console.log("señal de sesion");
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        console.log('toiiii');
        if (this.readyState == 4 && this.status == 200) {
            var cats = JSON.parse(this.response);
            console.log(cats);
            
            //console.log(cats['id']);
            //
            cats['nombre'][i]
            for(var i=0; i< cats['id'].length; i++) {
                var fprod = "";
                if(cats['estado'][i] == 'herramienta'){
                  
                    if (cats['nombre'][i] == 'Pala'){
                      fprod = "Pala.webp";
                    } else if (cats['nombre'][i] == 'Regadera'){
                      fprod = "Regadera.avif";
                    } else if (cats['nombre'][i] == 'Pulverizador'){
                      fprod = "Pulverizador.jpg";
                    } else if (cats['nombre'][i] == 'Guantes'){
                      fprod = "Guantes.webp";
                    }
                  
                  var produs = "<div class='card'>" +
                    "<div class='card-body'>" +
                    "<div style='display: flex; align-items: center;'>" +
                    "<img src='images/" + fprod + "' class='card-img-top' alt='imagen para el producto' style='max-width: 200px; max-height: 200px object-fit: contain;;'>" +
                    "<div style='margin-left: 10px; flex-grow: 1;'>" +
                    "<h5 class='card-title' style='text-align: right;'>" + cats['nombre'][i] + "</h5>" +
                    "<p class='card-text descrip' style='text-align: right;'>" + cats['descripcion'][i] + "</p><br>" +
                    "<p class='card-text' style='text-align: right;'>Actualmente " + cats['cantidad'][i] + " en Stock</p>" +
                    "<div class='dropdown' style='text-align: right;'>" +
                    "<button class='btn btn-outline-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Seleccione cantidad a comprar</button>" +
                    "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>" +
                    "<a class='dropdown-item' onclick='return cantidadelegida(1);'>1</a>" +
                    "<a class='dropdown-item' onclick='return cantidadelegida(2);'>2</a>" +
                    "<a class='dropdown-item' onclick='return cantidadelegida(3);'>3</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='presio' style='text-align: right;'>" +
                    "<p class='card-text'>" + cats['precio_unitario'][i] + "€</p>" +
                    "</div>" +
                    "<div style='clear: both;'></div>" +
                    "<button class='btn btn-success' onclick='return anadir(\"" + cats['nombre'][i] + "\", " + cats['id'][i] + "," + cats['precio_unitario'][i] + ");'>Añadir al carrito</button>" +
                    "</div>" +
                    "</div><br>";
                var produsElement = document.getElementById("produs");
                produsElement.innerHTML += produs;
                } 
            } 
    }   
}

xhttp.open("GET", "php/productos.php", true);
xhttp.send();
return false;
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

function cantidadelegida(can) {
  sessionStorage.setItem('cantidadactual', can);
}
globalThis.carrito = [];
function anadir(nombre, id, precio) {
  var compraunitaria = [id, nombre, precio, sessionStorage.getItem('cantidadactual')];
  globalThis.carrito.push(compraunitaria);
  console.log(globalThis.carrito);

  var carritoString = JSON.stringify(globalThis.carrito);
  sessionStorage.setItem('compratotal', carritoString);
  console.log(sessionStorage.getItem('compratotal'));
}
