function load() {
    /////sesion
    console.log("Page loaded!");

  var storedUsername = sessionStorage.getItem('username');
  if (storedUsername) {
    globalThis.usu = storedUsername;
    var nombreUsuario = "<li class='nav-item dropdown'><a class='nav-link dropdown-toggle text-success' href='#' id='navbardrop' data-toggle='dropdown'>" + globalThis.usu + "</a><div class='dropdown-menu dropdown-menu-right' style='max-width: 200px;'><a class='dropdown-item' href='#' onclick='return sesiont();'>Salir</a></div></li>";

    var nombreUsuarioElement = document.getElementById("nombreUsuario");
    nombreUsuarioElement.innerHTML = nombreUsuario;
  } else {
    console.log("User session data not found");
  }

  //cargar peticiones
  var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        console.log('toiiii');
        if (this.readyState == 4 && this.status == 200) {
            var cats = JSON.parse(this.response);
            
  ////cargar pedidos
            var xhttp3 = new XMLHttpRequest();
              xhttp3.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  var thirdData = JSON.parse(this.response);
                  console.log(thirdData);

                  for (var j = 0; j < thirdData['id'].length; j++) {
                    var produs = "<tr>" +
                        "<td>"+thirdData['id'][j]+"</td>";
                        if(thirdData['id_clie'][j]==0){
                          produs +="<td>CLIENTE ANONIMO</td>";
                        }else{
                          produs +="<td>"+thirdData['id_clie'][j]+"</td>";
                        }
                        produs +="<td>"+thirdData['fecha_pedido'][j]+"</td>"+
                        "</td>";
                        if (thirdData['fecha_entrega'][j]=="0000-00-00"){
                            produs +="<td>No se ha realizado la entrega todavía</td>";
                        } else {
                            produs +="<td>" +
                         thirdData['fecha_entrega'][j] +
                          "</td>";
                        }
                        if(thirdData['estado'][j]=="entregado"){
                          produs +="<td class='text-bg-success'>";
                        } else if (thirdData['estado'][j]=="enviado"){
                          produs +="<td class='text-bg-warning'>";
                        } else {
                          produs +="<td class='text-bg-danger'>";
                        }
                         
                          produs += "<a class='nav-link dropdown-toggle' href='#' id='navbardrop' data-toggle='dropdown'>"+thirdData['estado'][j]+"</a>" +
                            "<div class='dropdown-menu dropdown-menu-right' style='max-width: 200px;'>" +
                                "<a class='dropdown-item' href='#' onclick='return cambiarPa("+thirdData['id'][j]+", this);'>Pendiente</a>" +
                                "<a class='dropdown-item' href='#' onclick='return cambiarPb("+thirdData['id'][j]+", this);'>Enviado</a>" +
                                "<a class='dropdown-item' href='#' onclick='return cambiarPc("+thirdData['id'][j]+", this);'>Entregado</a>" +
                                "</div></tr>";
                    
                    var produsElement = document.getElementById("pregun");
                    produsElement.innerHTML += produs;

                     
                  }
                }
              };

              xhttp3.open("GET", "php/pedidos.php", true);
              xhttp3.send();
    }   
}

xhttp.open("GET", "php/admin.php", true);
xhttp.send();
return false;


}
window.onload = load;

function sesiont() { //cerrar sesion
    sessionStorage.removeItem('username');
    location.replace("sesion.html");
}


function getCurrentDate() {//recoger fecha
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0'); 
    var day = String(today.getDate()).padStart(2, '0'); 
    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
  }
  

///funciones de pedidos

function cambiarPa(clave, estado) {
  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    
      if (this.readyState == 4 && this.status == 200) {
        
          var cats = JSON.parse(this.response);
          console.log(cats);//verificar que se han enviado los datos correctamente
          if (typeof cats !== 'undefined') {
          //location.replace("index.html");
      }
      }
  };
  var fa = "0000-00-00";
  xhttp.open("GET", "php/adminPc.php?cambio="+estado.innerText+"&id="+clave+"&fa="+fa,false);
  xhttp.send();
  return false;
}

function cambiarPb(clave, estado) {
  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    
      if (this.readyState == 4 && this.status == 200) {
        
          var cats = JSON.parse(this.response);
          console.log(cats);//verificar que se han enviado los datos correctamente
          if (typeof cats !== 'undefined') {
          //location.replace("index.html");
      }
      }
  };
  var fa = "0000-00-00";
  xhttp.open("GET", "php/adminPc.php?cambio="+estado.innerText+"&id="+clave+"&fa="+fa,false);
  xhttp.send();
  return false;
}

function cambiarPc(clave, estado) {
  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    
      if (this.readyState == 4 && this.status == 200) {
        
          var cats = JSON.parse(this.response);
          console.log(cats);//verificar que se han enviado los datos correctamente
          if (typeof cats !== 'undefined') {
          //location.replace("index.html");
      }
      }
  };
  var fa = getCurrentDate();
  xhttp.open("GET", "php/adminPc.php?cambio="+estado.innerText+"&id="+clave+"&fa="+fa,false);
  xhttp.send();
  return false;
}