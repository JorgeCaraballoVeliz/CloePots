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
            console.log(cats);
            
            //console.log(cats['id']);
            //
            for(var i=0; i< cats['id'].length; i++) {
                    var produs = "<tr>" +
                    "<td>"+cats['id'][i]+"</td>";
                    if(cats['id_ped'][i]==0){
                      produs +="<td>SOLICITUD DE CONTRASEÑA DE USUARIO</td>";
                    }else{
                      produs +="<td>"+cats['id_ped'][i]+"</td>";
                    }
                    produs +="<td>"+cats['mensaje'][i]+"</td>";
              if(cats['estado'][i]=="nueva"){
                produs +="<td class='text-bg-danger'>"
              } else {
                produs +="<td class='text-bg-success'>"
              }
              produs += "<a class='nav-link dropdown-toggle' href='#' id='navbardrop' data-toggle='dropdown'>"+cats['estado'][i]+"</a>" +
                        "<div class='dropdown-menu dropdown-menu-right' style='max-width: 200px;'>" +
                            "<a class='dropdown-item' href='#' onclick='return cambiarEn("+cats['id'][i]+", this);'>Nueva</a>" +
                            "<a class='dropdown-item' href='#' onclick='return cambiarEr("+cats['id'][i]+", this);'>Resuelta</a>" +
                        "</div>" +
                    "</td>" +
                    "<td>" ;
                    if(cats['respuesta'][i]==null){
                      produs += "Sin respuesta." ;
                    }else{
                      produs += cats['respuesta'][i] ;
                    }
                    produs +="<textarea rows='4' cols='80' class='form-control' name='pregunta' id='pregunta' placeholder='Introduce aquí la respuesta...' onkeyup='txtglobal(this)'></textarea>" +
                        "<br>" +
                        "<button type='button' id='sesion' class='btn btn-success btn-block text-center' onclick='return cambiarR("+cats['id'][i]+");'>&emsp; Modificar &emsp;</button>" +
                    "</td>" +
                "</tr>";
                
                var produsElement = document.getElementById("produs");
                produsElement.innerHTML += produs;
            } 
  
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

///funciones de peticiones

function cambiarEn(clave, estado) {
  console.log(estado.innerText);

  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.response);
          var cats = JSON.parse(this.response);
          console.log(cats);//verificar que se han enviado los datos correctamente
          if (typeof cats !== 'undefined') {
          //location.replace("index.html");
      }
      }
  };
  xhttp.open("GET", "php/adminN.php?cambio="+estado.innerText+"&id="+clave,false);
  xhttp.send();
  return false;
}

function cambiarEr(clave, estado) {

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
  xhttp.open("GET", "php/adminR.php?cambio="+estado.innerText+"&id="+clave,false);
  xhttp.send();
  return false;
}
function txtglobal(valor){//recibir valor del texto
  console.log(valor.value);
  globalThis.textoc = valor.value;
}
function cambiarR(clave) {
  console.log(clave);
    console.log(textoc);

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var cats = JSON.parse(this.response);
           console.log(cats);//verificar que se han enviado los datos correctamente
           if (typeof cats !== 'undefined') {
           alert("DATOS ACTUALIZADOS CORRECTAMENTE");
        }
        }
    };
  

      xhttp.open("GET", "php/adminC.php?comentario="+ textoc+"&id="+clave,false);
        xhttp.send();
        
        return false;
    
}

