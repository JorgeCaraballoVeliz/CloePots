<?php

$conexion = mysqli_connect("localhost","root","","cloe_pots");
		
mysqli_select_db($conexion,"cloe_pots") or die ("No se puede seleccionar la BD");
	
$resultado = mysqli_query($conexion, "select * from metod_pago");
if (mysqli_connect_errno()) {
    printf("<p>Conexión fallida: %s</p>", mysqli_connect_error());
    exit();
}

if (isset($_GET["nutar"])) {

    $nutar = $_GET["nutar"];
    $notar = $_GET["notar"];
    $fechM = $_GET["fechM"];
    $fechA = $_GET["fechA"];
    $cvv = $_GET["cvv"];

    $insert = "insert into metod_pago (numero, nombre, mes, ano, cvv)
    values (".$nutar.", '".$notar."', ".$fechM.", ".$fechA.", ".$cvv.")";
    $resultado2 = mysqli_query($conexion,$insert);//insercion en la BBDD 

    
   
    $cat1 = array("nutar" => $nutar, 
    "notar" => $notar, 
    "fechM" => $fechM, 
    "fechA" => $fechA, 
    "cvv" => $cvv);
$array = array($cat1);
$json = json_encode($array);
echo $json;




}


?>