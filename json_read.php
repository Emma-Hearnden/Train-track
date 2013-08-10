<?php


$db = new SQLite3('train_progress.db' );
$db->exec('CREATE TABLE IF NOT EXISTS Stanox ( STANOX Text, Alpha3 TEXT, TIPLOC Text, Desc TEXT );' );
$db->exec('CREATE INDEX IF NOT EXISTS idx_stanox_stanox ON STANOX (STANOX);' );
# {"STANOX":"37225","UIC":"28060","3ALPHA":"ALT",
# "NLCDESC16":" ","TIPLOC":"ALTRNHM","NLC":"280600","NLCDESC":"ALTRINCHAM"}
$row = 1;
$data = json_decode(file_get_contents( 'CORPUSExtract.json') );# from 
$db->exec( "BEGIN;" );
$tiploc = $data->TIPLOCDATA;
foreach( $tiploc as $key => $value ){
#	 var_dump( $value->STANOX );
	$stmt = $db->prepare( 'INSERT INTO Stanox (STANOX, Alpha3, TIPLOC, Desc ) VALUES ( ?,?,?,? );' );
	$stmt->bindValue( 1, $value->STANOX );
	$stmt->bindValue( 2, $value->{'3ALPHA'} );
	$stmt->bindValue( 3, $value->TIPLOC );

	$stmt->bindValue( 4, $value->NLCDESC );
	$stmt->execute();

}
$db->exec( "COMMIT;" );
?>
