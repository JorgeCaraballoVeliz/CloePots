<?php

$conexion = mysqli_connect("localhost","root","","cloe_pots");
		
mysqli_select_db($conexion,"cloe_pots") or die ("No se puede seleccionar la BD");
	
$resultado = mysqli_query($conexion, "select * from pedidos");
if (mysqli_connect_errno()) {
    printf("<p>Conexión fallida: %s</p>", mysqli_connect_error());
    exit();
}

if (isset($_GET["cambio"])) {

    $cambio = $_GET["cambio"];
    $id = $_GET["id"];

    $insert = "update pedidos set estado='".$cambio."' where id=".$id;;
    $resultado2 = mysqli_query($conexion,$insert);//insercion en la BBDD 

    
   
    $cat1 = array("cambio" => $cambio, "id" => $id);
$array = array($cat1);
$json = json_encode($array);
echo $json;




}


?>