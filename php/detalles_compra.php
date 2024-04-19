<?php

$conexion = mysqli_connect("localhost","root","","cloe_pots");
		
mysqli_select_db($conexion,"cloe_pots") or die ("No se puede seleccionar la BD");
	
$resultado = mysqli_query($conexion, "select * from detalles_pedidos");
if (mysqli_connect_errno()) {
    printf("<p>Conexión fallida: %s</p>", mysqli_connect_error());
    exit();
}

if (isset($_GET["idped"])) {

    $idped = $_GET["idped"];
    $idprod = $_GET["idprod"];
    $cantidad = $_GET["cantidad"];
    $precio = $_GET["precio"];

    $insert = "insert into detalles_pedidos (id_pedido, id_prod, cantidad, precio)
    values (".$idped.", ".$idprod.",".$cantidad.",".$precio.")";
    $resultado2 = mysqli_query($conexion,$insert);//insercion en la BBDD 

  /*  
   
    $cat1 = array("idclie" => $idclie, 
    "fechap" => $fechap);
$array = array($cat1);
$json = json_encode($array);
echo $json;


*/

}


?>