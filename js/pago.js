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

function getCurrentDate() {//recoger fecha
  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, '0'); 
  var day = String(today.getDate()).padStart(2, '0'); 
  var formattedDate = year + '-' + month + '-' + day;
  return formattedDate;
}

function pagof() {
  console.log('uwu');
  
  

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var cats = JSON.parse(this.response);
          console.log(cats); // verificar que se han enviado los datos correctamente
          
      }
  };

  var nutar = document.getElementById("nutar").value;
  var notar = document.getElementById("notar").value;
  var fechM = document.getElementById("fechM").value;
  var fechA = document.getElementById("fechA").value;
  var cvv = document.getElementById("cvv").value;

  if (notar == '' || nutar == '' || fechM == '' || fechA == '' || cvv == '') {
    //alert(sessionStorage.getItem('userid'));
      var produs = "<br>" +
          "<div class='card-body'>" +
          "<h5 class='card-title text-danger'>Rellene todos los datos para realizar el pago por favor</h5>" +
          "<br>";
      var produsElement = document.getElementById("produs");
      produsElement.innerHTML = produs;
  } else {
      xhttp.open("GET", "php/pago.php?nutar=" + nutar + "&notar=" + notar + "&fechM=" + fechM + "&fechA=" + fechA + "&cvv=" + cvv, false);
      xhttp.send();

      // Insertar datos de pago
      var xhttp2 = new XMLHttpRequest();
      xhttp2.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            
          }
      };
    
      var idclie = sessionStorage.getItem('userid');
      var fechap = getCurrentDate();

      xhttp2.open("GET", "php/compra.php?idclie=" + idclie + "&fechap=" + fechap , false);
      xhttp2.send();
      ///////cargar pedidos
      var xhttp4 = new XMLHttpRequest();
      xhttp4.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var thirdData = JSON.parse(this.response);
          console.log(thirdData);

          for (var j = 0; j < thirdData['id'].length; j++) {
            globalThis.numped=thirdData['id'][j];
          }
          console.log(globalThis.numped);
          detapag();//llamar a la función que recoge los detalles de pago
          sessionStorage.setItem('nuevoped', globalThis.numped);
          location.replace("ticket.html");
        }
      };

      xhttp4.open("GET", "php/pedidos.php", true);
      xhttp4.send();
  } 
}

function detapag() {
  // Insertar datos de detalles de pago
  var compratotalString = sessionStorage.getItem('compratotal');
  var compratotalArray = JSON.parse(compratotalString);
  for(var i=0; i< compratotalArray.length; i++) {
    console.log(compratotalArray[i][1]);
    var pagocanti = 0;
    pagocanti = compratotalArray[i][3]*compratotalArray[i][2];

  var xhttp3 = new XMLHttpRequest();
  xhttp3.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          // Process the response
         /* var cats = JSON.parse(this.response);
      console.log(cats); // verificar que se han enviado los datos correctamente
      if (typeof cats !== 'undefined') {
        //borrar sesion de carrito
         
      }*/
      }
  };

  var idped = globalThis.numped;//id del pedido
  var idprod = compratotalArray[i][0];//id del producto
  var cantidad = compratotalArray[i][3];//cantidad
  var precio = pagocanti;//precio sumado
  console.log("se lia xikos");
  console.log(idped);
  console.log(idprod);
  console.log(cantidad);
  console.log(precio);

  xhttp3.open("GET", "php/detalles_compra.php?idped=" + idped + "&idprod=" + idprod + "&cantidad=" + cantidad+ "&precio=" + precio , false);
  xhttp3.send();
} 
}