<?php
	require_once './lib.php';

	/*VARIABLES*/
	/*string*/	$response	="";
	
	$response = get_all('hotels');
	print(json_encode($response));
?>