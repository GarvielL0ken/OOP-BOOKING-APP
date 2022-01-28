<?php
	require_once 'database.php';

	/*Create a PDO object using the values specified in database.php,
		Then create a database with the specified database name if it does not already exits
		Create a table for hotels if not already created
		return the connection to allow outside methods to make calls to the database
	*/
	function connect_to_database()
	{
		global $dbhost, $dbname, $dbusername, $dbpassword;
		try {
			$conn = new PDO("mysql:host=$dbhost", $dbusername, $dbpassword);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$conn->exec("CREATE DATABASE IF NOT EXISTS $dbname");
			$conn->query("use $dbname");
			$sql = "CREATE TABLE IF NOT EXISTS `hotels` (
				`id_hotel`		INT(4)		AUTO_INCREMENT	PRIMARY KEY,
				`title`			VARCHAR(60)	NOT NULL,
				`features`		VARCHAR(60)	NOT NULL,
				`daily_rate`	FLOAT(8, 2)	NOT NULL
				);";
			$conn->exec($sql);
			return ($conn);
		} catch (PDOException $pe) {
			die("Could not connect to the database $dbname :" . $pe->getMessage());
		}
	}
?>