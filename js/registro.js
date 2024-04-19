function registro() {
    console.log('uwu');

   
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var cats = JSON.parse(this.response);
           console.log(cats);//verificar que se han enviado los datos correctamente
           if (typeof cats !== 'undefined') {
           alert("USUARIO CREADO CORRECTAMENTE");
           //location.replace("index.html");
        }
        }
    };

    var nusuario = document.getElementById("nusuario").value;
    var ncontrasena = document.getElementById("ncontrasena").value;
    var rcontrasena = document.getElementById("rcontrasena").value;


    if (nusuario == '') { //por aqui los pattern
        alert("INTRODUCE UN USUARIO POR FAVOR");
    } else if (rcontrasena != ncontrasena) { 
        alert("LAS CONTRASEÑAS DEBEN COINCIDIR");
    } else {
        xhttp.open("GET", "php/registro.php?nusuario="+ nusuario +"&ncontrasena="+ncontrasena,false);
        xhttp.send();
        return false;
    }
    



}

const validatePass = (pass) => {//comprobar formato de contraseña
    return pass.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    );
  };
  
  const validateP = () => {
    const $result = $('#result');
    const pass = $('#ncontrasena').val();
    $result.text('');
  
    if (validatePass(pass)) {
        $result.text('');
    } else {
      $result.text('El formato de la contraseña no es válido. Debe contener al menos 8 caracteres, poseer al menos una letra mayúscula, una minúscula y un numero. ');
      $result.css('color', 'red');
    }
    return false;
  }
  
  $('#ncontrasena').on('input', validateP);


