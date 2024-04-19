<?php

$conexion = mysqli_connect("localhost","root","","cloe_pots");
		
mysqli_select_db($conexion,"cloe_pots") or die ("No se puede seleccionar la BD");
	
$resultado = mysqli_query($conexion, "select * from att_clien");
if (mysqli_connect_errno()) {
    printf("<p>Conexión fallida: %s</p>", mysqli_connect_error());
    exit();
}

if (isset($_GET["codped"])) {

    $codped = $_GET["codped"];
    $pregunta = $_GET["pregunta"];

    $insert = "insert into att_clien (id_ped, mensaje, estado, respuesta)
    values ('".$codped."', '".$pregunta."', 'nueva', NULL)";
    $resultado2 = mysqli_query($conexion,$insert);//insercion en la BBDD 

    
   
    $cat1 = array("codped" => $codped, 
    "pregunta" => $pregunta);
$array = array($cat1);
$json = json_encode($array);
echo $json;




}


?>