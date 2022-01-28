<?php
	require_once './lib.php';
	session_start();

	$_SESSION['first_name'] = get_post('first_name');
	$_SESSION['surname'] = get_post('surname');
	$_SESSION['email'] = get_post('email');
	$_SESSION['number_of_days'] = get_post('number_of_days');
	$_SESSION['check_in_date'] = get_post('check_in_date');
	$_SESSION['check_out_date'] = get_post('check_out_date');
	$_SESSION['hotel'] = get_post('hotel');

	header("location: ../site/compare.html");
?>