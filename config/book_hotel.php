<?php
	require_once './lib.php';

	session_start();

	$first_name = $_SESSION['first_name'];
	$surname = $_SESSION['surname'];
	$email = $_SESSION['email'];
	
	$hotel = $_GET['hotel'];
	
	$full_name = $first_name . " " . $surname;
	$subject = "Hotel Booking: " . $full_name . "@" . $hotel;
	$message = generate_booking_message($full_name, $hotel);
	print($message);
	send_email('jedmikasarkis@gmail.com', $subject, $message);
?>