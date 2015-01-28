<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

$url = explode('/', $_SERVER['PATH_INFO']);

$data = file_get_contents('data.json');
$response = json_decode($data, true);
$tips = $response['tips'];
echo json_encode($response);exit;
switch($url[2]){
    //if you pass `get`, you get the whole array unless you pass `card`, in which case, you get a random one
    case 'get':
        if($url[3] === 'tip'){
            $r = array_rand($tips, 1);
            $response['tips'] = [$tips[$r]];
        }

        if($url[3] === 'tips'){
            echo json_encode($response);
        }
    break;

    //if you post anything, it's going to respond with the second param, literally whatever it is. IDGAF
    case 'post':
        $response['tips'] = [];
        $response['added'] = $url[3];
    break;

    //assume you broke something
    default:
        $response['statusCode'] = 404;
        $response['success'] = false;
        $response['message'] = "Whatever url you just passed was dumb";
        $response['tips'] = [];
}

//RESPOND
echo json_encode($response);
