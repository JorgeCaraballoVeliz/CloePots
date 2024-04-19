function cargabase() {
    console.log("señal de sesion");
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        console.log('toiiii');
        if (this.readyState == 4 && this.status == 200) {
    
            
            var cats = JSON.parse(this.response);
            console.log(cats);
            
            //console.log(cats['id']);
            $c = "";
            for(var i=0; i< cats['id'].length; i++) {
               // console.log(cats['nombre'][i]);
              // console.log(document.getElementById("usuario").value);
               if(document.getElementById("usuario").value == cats['nombre'][i] && document.getElementById("contrasena").value == cats['contrasena'][i]) {
                $c == 0;
                $usu = cats['nombre'][i];
                if(cats['admin'][i] == "si") {
                    globalThis.usu = $usu;
                    sessionStorage.setItem('username', globalThis.usu);
                    location.replace("admin.html");
                }else{
                    globalThis.usu = $usu;
                    sessionStorage.setItem('username', globalThis.usu);
                    sessionStorage.setItem('userid', cats['id'][i]);
                    location.replace("index.html");
                }
               } else {
                    $c++;
               }
            }
            console.log($c)
            if ($c > 1) {
                var produs ="<div class='card-body'>" +
                    "<h5 class='card-title text-danger'>Usuario o contraseña incorrectos</h5>" +
                    "</div><br>";
                var produsElement = document.getElementById("pregun");
                produsElement.innerHTML = produs;
            }
    }
    
}

xhttp.open("GET", "php/sesion.php", true);
xhttp.send();
return false;
}

///jquery
$(function() {
    console.log("uwu");

});





function load() {
  
    var storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      globalThis.usu = storedUsername;
      var nombreUsuario = "<li class='nav-item dropdown'><a class='nav-link dropdown-toggle' href='#' id='navbardrop' data-toggle='dropdown'>" + globalThis.usu + "</a><div class='dropdown-menu'><a class='dropdown-item' href='#'>Cerrar sesión</a></div></li>";
  
      var nombreUsuarioElement = document.getElementById("nombreUsuario");
      nombreUsuarioElement.innerHTML = nombreUsuario;
    } else {
      console.log("User session data not found");
    }


  }
  
  window.onload = load;
  

  
