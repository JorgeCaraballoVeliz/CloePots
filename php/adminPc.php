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
    $fa = $_GET["fa"];

    $insert = "update pedidos set fecha_entrega='".$fa."' , estado='".$cambio."' where id=".$id;;
    $resultado2 = mysqli_query($conexion,$insert);//insercion en la BBDD 

    
   
    $cat1 = array("cambio" => $cambio, "id" => $id);
$array = array($cat1);
$json = json_encode($array);
echo $json;




}


?>