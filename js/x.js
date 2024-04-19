function solicitar() {
    console.log("señal de sesion");
    var xhttp = new XMLHttpRequest();
  
    xhttp.onreadystatechange = function() {
      console.log('toiiii');
      if (this.readyState == 4 && this.status == 200) {
        var cats = JSON.parse(this.response);
        console.log(cats);
  
        var produs = "";
        var inputId = document.getElementById("codped").value;
        var matchingOrderFound = false;
  
        for (var i = 0; i < cats['id'].length; i++) {
          if (inputId == cats['id'][i]) {
            console.log("Matching order found. ID: " + cats['id'][i]);
            matchingOrderFound = true;
  
            produs = "<br><div class='card'>" +
              "<div class='card-body'>" +
              "<h5 class='card-title'>Nº de pedido: " + cats['id'][i] + "</h5>" +
              "<div class='presio'>" +
              "<p class='card-text'>Estado actual de tu pedido: <i>" + cats['estado'][i] + "</i></p>" +
              "<br><p class='card-text'>El pedido fue enviado el: <i>" + cats['fecha_pedido'][i] + "</i></p>";
  
            if (cats['fecha_entrega'][i] == "0000-00-00") {
              produs += "<p class='card-text'>El pedido no ha sido entregado todavía</p>";
            } else {
              produs += "<p class='card-text'>El pedido fue entregado el: <i>" + cats['fecha_entrega'][i] + "</i></p>";
            }
            produs += "<hr><h6 class='card-title'><b>Tu compra fue la siguiente:</b></h6><hr>";
            break; // salir del bucle cuando se haya encontrado la coincidencia
          }
        }
  
        if (matchingOrderFound) {
          var produsElement = document.getElementById("produs");
          produsElement.innerHTML = produs;
  
          // Datos de la tabla detalles pedido
          var xhttp2 = new XMLHttpRequest();
          xhttp2.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              var otherData = JSON.parse(this.response);
              console.log(otherData);
  
              // Datos de la tabla producto
              var xhttp3 = new XMLHttpRequest();
              xhttp3.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  var thirdData = JSON.parse(this.response);
                  console.log(thirdData);
  
                  var presioElement = document.querySelector(".presio");
                  var outputHTML = ""; // Store the final HTML output
  
                  for (var j = 0; j < otherData['id_pedido'].length; j++) {
                    if (inputId == otherData['id_pedido'][j]) {
                      console.log("Matching order details found. ID Pedido: " + otherData['id_pedido'][j]);
  
                      var prodId = otherData['id_prod'][j];
                      var cantidad = otherData['cantidad'][j];
                      var precio = otherData['precio'][j];
  
                      for (var m = 0; m < thirdData['id'].length; m++) {
                        if (prodId == thirdData['id'][m]) {
                          var produsDetails = "<p class='card-text'style='text-align: center;'>Producto: <i>" + thirdData['nombre'][m] + "</i></p>" +
                            "<p class='card-text'style='text-align: center;'>Precio: <i>" + precio + "</i></p>" +
                            "<p class='card-text'style='text-align: center;'>Cantidad: <i>" + cantidad + "</i></p><br>";
  
                          outputHTML += produsDetails;
                          break;
                        }
                      }
                    }
                  }
  
                  
                  presioElement.innerHTML += outputHTML;
                }
              };
  
              xhttp3.open("GET", "php/productos.php", true);
              xhttp3.send();
            }
          };
  
          xhttp2.open("GET", "php/seguimientoD.php", true);
          xhttp2.send();
        } else {
          var produs = "<br><div class='card'>" +
            "<div class='card-body'>" +
            "<h5 class='card-title text-danger'>EL CÓDIGO INTRODUCIDO NO ES VÁLIDO, POR FAVOR INTRODUZCA UN CÓDIGO EXISTENTE</h5>" +
            "</div><br>";
          var produsElement = document.getElementById("produs");
          produsElement.innerHTML = produs;
        }
      }
    };
  
    xhttp.open("GET", "php/seguimiento.php", true);
    xhttp.send();
    return false;
  }
  