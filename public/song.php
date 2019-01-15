<?php

	ini_set( "display_errors", 0 );
	set_time_limit(0);
	require( "config.php");
	if (  $_GET[ "media" ] == "kkbox" ) {
		$html = file_get_contents( "https://widget.kkbox.com/v1/?id=" . $_GET[ "id" ] . "&type=song&terr=tw&lang=tc&autoplay=true" );
		$dom = new DOMDocument;
		$dom->loadHTML($html);
		$finder = new DomXPath($dom);
		$classname="___iso-state___";
		$nodes = $finder->query("//*[contains(@class, '$classname')]");
		$data = json_decode( $nodes->item(0)->attributes->item(3)->value );
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
		header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
		echo $data->feed->data->trial_url;
		exit();
	}

	if (  $_GET[ "media" ] == "spotify" ) {
		$html = file_get_contents( "https://open.spotify.com/embed?uri=http://open.spotify.com/track/" . $_GET[ "id" ]  );
		$dom = new DOMDocument;
		$dom->loadHTML($html);
		$finder = new DomXPath($dom);
		$classname="track-row";
		$nodes = $finder->query("//*[contains(@class, '$classname')]");
		echo $nodes->item(0)->attributes->item(6)->value;
		exit();
	}