<?php


$db = new SQLite3('train_progress.db' );
$db->exec('CREATE TABLE IF NOT EXISTS Schedule ( train_uid TEXT, schedule_days_run TEXT, service_code TEXT );' );
$db->exec('CREATE INDEX IF NOT EXISTS idx_Schedule_train_uid ON Schedule (train_uid );' );
$db->exec('CREATE TABLE IF NOT EXISTS Segments ( sched_id INTEGER, train_uid INTEGER, type TEXT, tiploc TEXT, tme TEXT );' );
$db->exec('CREATE INDEX IF NOT EXISTS idx_segments_train_uid ON Segments (train_uid );' );


$cnt = 0;
for( $i = 1; $i < count($argv ); $i++ ){
     $db->exec( 'BEGIN;' );
     if (($handle = fopen($argv[$i], "r")) !== FALSE) {
     	while (($data = fgets($handle )) !== FALSE) {
	   $sched_ = json_decode( $data );
	   if( property_exists( $sched_, "JsonScheduleV1" ) ){
#	       print( $sched_->JsonScheduleV1->CIF_train_uid  . "\n" );
	       print( $cnt . "\r" );
	       $cnt = $cnt + 1;
	       if( $cnt % 1000 == 1 ){
	       	   $db->exec( "COMMIT;" );
		   $db->exec( "BEGIN;");
	       }
	       $stmt = $db->prepare( 'INSERT INTO Schedule (train_uid, schedule_days_run, service_code ) VALUES (?,?,? );' );
	       $stmt->bindValue( 1, $sched_->JsonScheduleV1->CIF_train_uid );
	       $stmt->bindValue( 2, $sched_->JsonScheduleV1->schedule_days_runs );
	       $stmt->bindValue( 3, $sched_->JsonScheduleV1->schedule_segment->CIF_train_service_code );
	       $stmt->execute();
	       if(property_exists( $sched_->JsonScheduleV1, 'schedule_segment' ) && property_exists( $sched_->JsonScheduleV1->schedule_segment, 'schedule_location' ) ){
		   $locations =$sched_->JsonScheduleV1->schedule_segment->schedule_location;
	           for( $j = 0; $j < count($locations ); $j++ ){
	              $stmt = $db->prepare( 'INSERT INTO Segments ( sched_id, train_uid, type, tiploc, tme ) VALUES( ?,?,?,?,?);' );
		      $stmt->bindValue( 1, $j );
		      $stmt->bindValue( 2, $sched_->JsonScheduleV1->CIF_train_uid );
		      $stmt->bindValue( 3, $locations[$j]->location_type );
		      $stmt->bindValue( 4, $locations[$j]->tiploc_code );
		      $tme = "";
		      if( $locations[$j]->location_type == "LT" ){ # terminates
		         $tme=$locations[$j]->arrival;
		      }else {
		         $tme = $locations[$j]->departure;
		      }		  
		      $stmt->bindValue( 5, $tme );
		      $stmt->execute();
                   }
	       }
	   }
#	   var_dump( $sched_);
	}
     }
     $db->exec( 'COMMIT;' );
}
if( 0 ){
$row = 1;
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
}
?>
