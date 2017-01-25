<?php 

$pathname = isset($_SERVER['PATH_INFO'])? $_SERVER['PATH_INFO']: null;
$method = $_SERVER['REQUEST_METHOD'];

$db = new PDO('mysql:host=localhost;dbname=mp212fg0_php_rest', 'mp212fg0_admin', 'ant600673');
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

function response($data){
    header('Content-type: application/json');
    echo json_encode($data);
    exit;
}

/// Test si le Path contient des informations
if(preg_match('#^/(.+)$#', $pathname, $matches)){ 
    if($method == 'GET') {
        try{
            $posts = $db->query('SELECT * FROM phptest_users WHERE email = '. $db->quote($matches[1]));
            response($posts->fetch());
        } catch(PDOException $e){
            //file_put_contents(__DIR__.'/api.log', date('Y-m-d H:i:s'). ' SQL: '. $e->getMessage() ."\n", FILE_APPEND);
            response(false);
        }
    }
    else if($method === 'PUT'){
        $datas = json_decode(file_get_contents('php://input'));
        $fields = ['email', 'password', 'active'];
        $query = 'UPDATE phptest_users SET ';
        $i = 0;
        foreach($fields as $field){
            if(!isset($datas->$field)){
                continue;
            }
            if($i){
                $query .= ', ';
            }
            $query .= $field. ' = ' .$db->quote($datas->$field);
            $i++;
        }
        $query .= ' WHERE email = '.$db->quote($matches[1]);
        $update = $db->exec($query);
        
        response($update !== false);
    }
    else if($method === 'DELETE') {
        $response = $db->exec('DELETE FROM phptest_users WHERE email = '.$db->quote($matches[1]));
        response($response !== false);
    }
}
else {
    if($method === 'GET') {
        $users = $db->query('SELECT * FROM phptest_users ORDER BY date DESC');
        $data = $users->fetchAll();
        response($data);
    }
    else if($method === 'POST') {
        try{
            $datas = json_decode(file_get_contents('php://input'));
            $insert = $db->prepare('INSERT INTO phptest_users (email, password, active, date) VALUES (:email, :password, :active, NOW())');
            $insert->execute(array(
                'email' => $datas->email,
                'password' => $datas->password,
                'active' => $datas->active,
            ));
            response($insert ? $db->lastInsertId() : false);
        } catch(PDOException $e){
            file_put_contents(__DIR__.'/api.log', date('Y-m-d H:i:s'). ' SQL: '. $e->getMessage() ."\n", FILE_APPEND);
            response(false);
        }
    }
}