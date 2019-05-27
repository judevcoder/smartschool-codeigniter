<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Version_302 extends CI_Migration {

    function __construct() {
        parent::__construct();
    }

    public function up() {
        $query = $this->db->query('SELECT * FROM `users` WHERE childs != "" ORDER BY `users`.`childs` DESC');

        foreach ($query->result() as $row) {
            print_r($row);
            echo "<br/>";
        }

        echo 'Total Results: ' . $query->num_rows();
        exit();
    }

    public function down() {
        
    }

}
?>



