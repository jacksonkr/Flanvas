<?php

if(strstr($_SERVER['HTTP_REFERER'], 'jacksonkr.com') && $_GET['url'] || true) {
	header('Content-Type: image/jpeg');
	
	$url = $_GET['url'];
	//$url = "http://cbk1.google.com/cbk?output=tile&zoom=0&x=0&y=0&cb_client=maps_sv&fover=2&onerr=3&v=4&panoid=zyrl6-M3EzLJ6L3lvJ8hYg";
	//$url = "http://www.google.com/intl/en_ALL/images/srpr/logo1w.png";
	
	$ch = curl_init();
	
	curl_setopt($ch, CURLOPT_URL, $url);
	//curl_setopt($ch, CURLOPT_REFERER, "http://www.theirdomain.com/");
	curl_setopt($ch, CURLOPT_HEADER, false);
	
	curl_exec($ch);
	//$info = curl_getinfo($ch);
	//$ct = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
	curl_close($ch);
	
	/*
	print("<pre>");
	print_r($info);
	print($ct);
	*/
}

?>