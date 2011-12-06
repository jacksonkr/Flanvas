<?php

mysql_connect('internal-db.s64527.gridserver.com', 'db64527_flanvas', '193Fsjfe9@slsels0') or die('could not connect');
mysql_select_db('db64527_flanvas') or die(mysql_error());

if(strrpos($_SERVER['HTTP_REFERER'], 'flanvas.com') > -1) {
	if($_POST['name']) {
		$query = "INSERT INTO ztype_high_scores (`id`,`time`,`name`,`score`) VALUES(NULL, NOW(), '".$_POST['name']."', '".$_POST['score']."')";
		mysql_query($query) or die(mysql_error());
	}
} else if($_SERVER['HTTP_REFERER']) {
	die('[clever phrase about how you should not cheat]');
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Ztype Remix - High Scores</title>
</head>

<body>

Ztype-remix high scores!

<pre>
<?php
	$query = "SELECT * FROM ztype_high_scores";
	$query .= " ORDER BY score DESC";
	$result = mysql_query($query) or die(mysql_error());
	while($row = mysql_fetch_assoc($result)) {
		echo($row['score'] . " - " . $row['name'] . "\n");	
	}
?>
</pre>
</body>
</html>