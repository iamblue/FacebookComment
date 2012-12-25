<?php 
class FacebookRequestController extends AppController {


	private function get_url($url){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 5);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		$returnedData = curl_exec($ch);
		curl_close($ch);
		return $returnedData;
	}
/**
* @function name:ajaxgetfbcomments()
* @description:	Use Ajax to get facebook graph api,and callback to view.
* @param:							
* @return:			
* @author:			Blue Chen
* @since:			12/25/2012
* @last modified:	12/25/2012
* @called by: (javascript)function getFbComments()
*/
	public function ajaxgetfbcomments(){

		$post_id = @$_POST[0];
		$access_token = @$_POST[1];
		$api = 'https://graph.facebook.com/'.$post_id.'?access_token='.$access_token;
		$graph_data = false;
		try{
			$graphData = get_url($api);
		}
		catch (FacebookApiException $e){
			error_log($e);
		}
		$this->set('graphData', $graphData);
		$this->layout = 'ajax';
	}
}
?>