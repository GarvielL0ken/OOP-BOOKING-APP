<?php
	require_once './functions.php';
	session_start();

	$first_name = get_post('first_name');
	$surname = get_post('surname');
	$email = get_post('email');
	$number_of_days = get_post('number_of_days');
	$check_in_date = get_post('check_in_date');
	$check_out_date = get_post('check_out_date');
	$hotel = get_post('hotel');

	$_SESSION['hotel'] = $hotel;
	header("location: ../site/compare.html");
?>