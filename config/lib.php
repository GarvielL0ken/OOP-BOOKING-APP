<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;

	require_once './database.php';
	require_once './setup.php';
	require_once './vendor/autoload.php';

	function generate_booking_message($full_name, $hotel_title) {
		/*VARIABLES*/

		/*array*/	$hotel			="";

		/*int*/		$number_of_days	=0;

		/*float*/	$daily_rate		=0;

		/*string*/	$email			="";
		/*string*/	$check_in_date	="";
		/*string*/	$check_out_date	="";
		/*string*/	$message		="";
		
		$hotel = get_where('hotels', 'title', $hotel_title)[0];
		
		$number_of_days = $_SESSION['number_of_days'];
		$check_in_date = $_SESSION['check_in_date'];
		$check_out_date = $_SESSION['check_out_date'];
		
		$daily_rate = $hotel['daily_rate'];
		$total = intval($number_of_days) * floatval($daily_rate);

		$email = $_SESSION['email'];
		
		$message = $full_name .
					" has requested to book a room at " . $hotel_title .
					" for " . $number_of_days . " days, " .
					" from " . $check_in_date . " to " . $check_out_date ."." .
					" The cost will be R" . $total . "@ R" . $daily_rate . "/day" .
					"<br>".
					"Contact " . $full_name . " @ " . $email;
	
		return ($message);
	}

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

	function get_where($table, $key, $value) {
		/*VARIABLES*/

		/*PDO Connection*/	$conn		=null;
		/*PDO Statement*/	$stmt		=null;

		/*array*/			$data		=null;
		/*string*/			$results	='';
		/*string*/			$sql		='';

		$sql = 'SELECT * FROM `' . $table . '` WHERE `' .$key. '` = :value';
		$data = array('value' => $value);
		$conn = connect_to_database();
		$stmt = $conn->prepare($sql);
		$stmt->execute($data);
		$results = $stmt->fetchAll();
		
		return ($results);
	}
	
	function send_email($to, $subject, $message)
	{
		$mail = new PHPMailer(true);

		try {
			//Server settings
			$mail->SMTPDebug = SMTP::DEBUG_SERVER;
			$mail->isSMTP();
			$mail->Host			= 'smtp.mailtrap.io';
			$mail->SMTPAuth		= true;
			$mail->Username		= '4c6b1b4bab0cfa';
			$mail->Password		= '06499a85bd5d2e';
			$mail->SMTPSecure	= PHPMailer::ENCRYPTION_STARTTLS;
			$mail->Port			= 587;
		
			//Recipients
			$mail->setFrom('jedmikasarkis@gmail.com', 'Garviel');
			$mail->addAddress($to);
		
			// Content
			$mail->Subject	= $subject;
			$mail->Body		= $message;
		
			$mail->send();
		} catch (Exception $e) {
			echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
		}
	}
?>