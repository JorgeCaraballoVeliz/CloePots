<?php

$conexion = mysqli_connect("localhost","root","","cloe_pots");
		
mysqli_select_db($conexion,"cloe_pots") or die ("No se puede seleccionar la BD");
	
$resultado = mysqli_query($conexion, "select * from pedidos");
if (mysqli_connect_errno()) {
    printf("<p>Conexión fallida: %s</p>", mysqli_connect_error());
    exit();
}

if (isset($_GET["idclie"])) {

    $idclie = $_GET["idclie"];
    $fechap = $_GET["fechap"];

    $insert = "insert into pedidos (id_clie, fecha_pedido, fecha_entrega, estado)
    values (".$idclie.", '".$fechap."', '0000-00-00', 'pendiente')";
    $resultado2 = mysqli_query($conexion,$insert);//insercion en la BBDD 

    
   
    $cat1 = array("idclie" => $idclie, 
    "fechap" => $fechap);
$array = array($cat1);
$json = json_encode($array);
echo $json;




}


?>