
<?php

  $db = new SQLite3('train_progress.db' );

   	   
  $rows = array();
  $result = $db->query( "SELECT train_id, Lat, long, toc_id, DateTime( whatTime, 'unixepoch') as WhatTime FROM trains t JOIN Stanox st ON t.stanox = st.STANOX JOIN Stations sta ON sta.tiploccode=st.tiploc ORDER BY whatTime DESC;" );
	   
  while( $row = $result->fetchArray(SQLITE3_ASSOC) ){
     $rows[] = $row;
  }
  print json_encode( $rows );
?>