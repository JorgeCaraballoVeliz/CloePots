<?php

$conexion = mysqli_connect("localhost","root","","cloe_pots");
		
mysqli_select_db($conexion,"cloe_pots") or die ("No se puede seleccionar la BD");
	
$resultado = mysqli_query($conexion, "select * from usuarios");
if (mysqli_connect_errno()) {
    printf("<p>Conexión fallida: %s</p>", mysqli_connect_error());
    exit();
}

if (isset($_GET["nusuario"])) {

    $usuario = $_GET["nusuario"];
    $contrasena = $_GET["ncontrasena"];

    $insert = "insert into usuarios (nombre, contrasena, admin)
    values ('".$usuario."', '".$contrasena."', 'no')";
    $resultado2 = mysqli_query($conexion,$insert);//insercion en la BBDD 

    
   
    $cat1 = array("usuario" => $usuario, 
    "contrasena" => $contrasena);
$array = array($cat1);
$json = json_encode($array);
echo $json;




}


?>