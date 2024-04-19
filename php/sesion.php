<?php

$conexion = mysqli_connect("localhost","root","","cloe_pots");
		
mysqli_select_db($conexion,"cloe_pots") or die ("No se puede seleccionar la BD");
	
$resultado = mysqli_query($conexion, "select * from usuarios");
if (mysqli_connect_errno()) {
    printf("<p>Conexión fallida: %s</p>", mysqli_connect_error());
    exit();
}

$numr = mysqli_num_rows($resultado);


$arrayN = [];
if($numr > 0){
    for ($i = 0; $i < $numr; $i++){
       					
        $fila = mysqli_fetch_array($resultado,MYSQLI_ASSOC);
         // print_r($fila);
         
         foreach ($fila as $key => $value) {
             $arrayN[$key][] = $value;
         }
    }
}

//    echo "<br><br>";
//    print_r($arrayN);

$json = json_encode($arrayN);
 echo $json;


?>