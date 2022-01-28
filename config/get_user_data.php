<?php
	/*Used via XHRRequest to get the name of the hotel that was set on the first page*/
	
	session_start();
	$user_data = ['first_name' => $_SESSION['first_name'],
					'surname' => $_SESSION['surname'],
					'email' => $_SESSION['email'],
					'numberOfDays' => $_SESSION['number_of_days'],
					'checkInDate' => $_SESSION['check_in_date'],
					'checkOutDate' => $_SESSION['check_out_date'],
					'hotel' => $_SESSION['hotel']];
	
	print(json_encode($user_data));
?>