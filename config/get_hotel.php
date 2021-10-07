<?php
	/*Used via XHRRequest to get the name of the hotel that was set on the first page*/
	
	session_start();
	print(json_encode($_SESSION['hotel']));
?>