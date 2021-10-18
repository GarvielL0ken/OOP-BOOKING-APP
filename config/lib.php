<?php
	require_once './database.php';
	require_once './setup.php';

	//return the value, specified by the given key, from the POST method
	function get_post($key) {
			return ($_POST[$key]);
	}

	function get_all($table) {
		/*VARIABLES*/

		/*PDO Connection*/	$conn		=null;
		/*PDO Statement*/	$stmt		=null;

		/*string*/			$results	='';
		/*string*/			$sql		='';

		$sql = 'SELECT * FROM ' . $table;
		$conn = connect_to_database();
		$stmt = $conn->prepare($sql);
		$stmt->execute();
		$results = $stmt->fetchAll();
		
		return ($results);
	}
?>