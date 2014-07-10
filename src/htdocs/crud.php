<?php
error_reporting(E_ALL);

include '_config.inc.php';


try {
   $conn = new PDO ($DB_URL, $DB_USER, $DB_PASS);
   $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch ( PDOException $e ) {
   print( "Error connecting to SQL Server." );
   die(print_r($e));
}
// read
$rs = $conn->query("select * from Team");
$teams = $rs->fetchAll(PDO::FETCH_ASSOC);
$rs->closeCursor();
$conn = NULL;

for($i = 0, $ilen = count($teams); $i<$ilen; $i++){
    $teams[$i]["id"] = intval($teams[$i]["ID"]);
}

try {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    print(json_encode($teams));
} catch (Exception $e) {
  print ("Error: " . $e->getMessage());  
}

?>