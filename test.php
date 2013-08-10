<?php
// Network Rail Stomp Handler example by ian13
$server = "tcp://datafeeds.networkrail.co.uk:61618";
$user = "steve@hearnden.org.uk";
$password = "W1cked4Kids!";
$channel = "TRAIN_MVT_ALL_TOC";


$db = new SQLite3('train_progress.db' );
$db->exec('CREATE TABLE IF NOT EXISTS Trains (train_id TEXT, stanox TEXT, next_stanox, whatTime INTEGER, trainServiceCode TEXT, eventType TEXT, toc_id TEXT );' );
$db->exec('CREATE INDEX IF NOT EXISTS idx_Trains_train_id ON Trains (train_id );');
$db->exec('CREATE TABLE IF NOT EXISTS TrainSchedule (train_uid TEXT, train_id TEXT, schedule_start_date TEXT,train_service_code TEXT  );' );
$db->exec('CREATE INDEX IF NOT EXISTS idx_ts_train_id ON TrainSchedule (train_id );' );

 
$con = 0;
try {
    $con = new Stomp($server, $user, $password );
}
catch ( StompException $e ){
      var_dump( $e);
}
if (!$con) {
   die('Connection failed: ' . stomp_connect_error());
}
 
$con->subscribe("/topic/" . $channel);
# $db->busyTimeout( 5000 );
while($con){
   if ($con->hasFrame()){
       $msg = $con->readFrame();
       if( $msg != false ){
       	   print ("start .." );
	   do {
       	      $db->exec( 'BEGIN;' );
	      if( $db->lastErrorCode() != 0 ){
	         sleep( 1 );
		 print( "_" );
	      }
	   }while( $db->lastErrorCode() != 0 );
       	   foreach (json_decode($msg->body) as $event) {
	       if( $event->header->msg_type == "0003" ) {
       	          $stmt = $db->prepare( 'DELETE FROM Trains WHERE train_id = ?;' );
	          $stmt->bindValue( 1, $event->body->train_id );
	          $stmt->execute();
	          $stmt = $db->prepare( 'INSERT INTO Trains (train_id, stanox, next_stanox, whatTime, trainServiceCode, eventType, toc_id )' .
	       	       		    ' VALUES (?,?,?,?,?,?,? );' );
                  $stmt->bindValue( 1, $event->body->train_id );
	          $stmt->bindValue( 2, $event->body->loc_stanox );
	          $stmt->bindValue( 3, $event->body->next_report_stanox );
	          $stmt->bindValue( 4, $event->body->actual_timestamp / 1000 ); # convert milliseconds to seconds.
	          $stmt->bindValue( 5, $event->body->train_service_code );
	          $stmt->bindValue( 6, $event->body->planned_event_type );
	          $stmt->bindValue( 7, $event->body->toc_id);
		  $stmt->execute();
#		  var_dump( $event );
	       } else if ( $event->header->msg_type == "0001" ){
	          //var_dump( $event );
	          $stmt = $db->prepare( 'INSERT INTO TrainSchedule (train_uid, train_id, schedule_start_date, train_service_code ) VALUES (?,?,?, ? );' );
                  $stmt->bindValue( 1, $event->body->train_uid );
                  $stmt->bindValue( 2, $event->body->train_id );
		  $stmt->bindValue( 3, $event->body->schedule_start_date );
		  $stmt->bindValue( 4, $event->body->train_service_code );
		  $stmt->execute();
               }

       	   }
       	   $con->ack($msg);
       	   $db->exec("delete from trains where eventtype='DESTINATION' and datetime(whattime, 'unixepoch','5 minutes') < datetime('now');");
       	   $db->exec("delete from trains where datetime(whattime, 'unixepoch','12 hours') < datetime('now');");
	   do {
   	      $db->exec( 'COMMIT;' );	
	      if( $db->lastErrorCode() != 0 ){
	         sleep( 1 );
		 print( "_" );
	      }
	   }while( $db->lastErrorCode() != 0 );

	   print( "done\n" );
       }
   }
}
 
die('Connection lost: ' . time());
?>

