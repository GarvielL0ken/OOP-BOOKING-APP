<?php
	require_once 'database.php';

	function connect_to_database()
	{
		global $dbhost, $dbname, $dbusername, $dbpassword;

		$conn = new PDO("mysql:host=$dbhost", $dbusername, $dbpassword);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$conn->exec("CREATE DATABASE IF NOT EXISTS $dbname");
		$conn->query("use $dbname");
		$sql = "CREATE TABLE IF NOT EXISTS `hotels` (
			`id_hotel`		INT(4)		AUTO INCREMENT	PRIMARY KEY,
			`title`			VARCHAR(60)	NOT NULL,
			`daily_rate`	FLOAT(8, 2)	NOT NULL
			);";
		$conn->exec($sql);
		return ($conn);
	} catch (PDOException $pe) {
		die("Could not connect to the database $dbname :" . $pe->getMessage());
	}
?>