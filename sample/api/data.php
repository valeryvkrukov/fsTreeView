<?php 

if(!empty($_SERVER['HTTP_X_REQUESTED_WITH'])&&strtolower($_SERVER['HTTP_X_REQUESTED_WITH'])=='xmlhttprequest'){
	if(isset($_POST['apiKey'])&&trim($_POST['apiKey'])=='someApiKeyIfNeeded'){
		$response=array('status'=>'ok','files'=>array());
		$path=realpath(__DIR__.'/../directory');
		$files=getData($path);
		if(is_array($files)&&sizeof($files)>0){
			$response['files']=$files;
		}
		header('Content-type: application/json');
		echo json_encode($response);
	}
}

function getData($dir){
	$dirContent=array();
	if(file_exists($dir)){
		foreach(scandir($dir) as $item){
			if(!$item||$item[0]=='.') continue;
			if(is_dir($dir.DS.$item)){
				$dirContent[]=array(
					'name'=>$item,
					'type'=>'folder',
					'path'=>$dir.DS.$item,
					'items'=>getData($dir.DS.$item)
				);
			}else{
				$dirContent[]=array(
					'name'=>$item,
					'type'=>'file',
					'path'=>$dir.DS.$item,
					'size'=>filesize($dir.DS.$item)
				);
			}
		}
	}
	return $dirContent;
}
