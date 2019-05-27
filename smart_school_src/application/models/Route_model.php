<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Route_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->current_session = $this->setting_model->getCurrentSession();
    }

    public function get($id = null) {
        $this->db->select()->from('transport_route');
        if ($id != null) {
            $this->db->where('transport_route.id', $id);
        } else {
            $this->db->order_by('transport_route.id');
        }
        $query = $this->db->get();
        if ($id != null) {
            return $query->row_array();
        } else {
            return $query->result_array();
        }
    }


    public function remove($id) {
        $this->db->where('id', $id);
        $this->db->delete('transport_route');
    }


    public function add($data) {
        if (isset($data['id'])) {
            $this->db->where('id', $data['id']);
            $this->db->update('transport_route', $data);
        } else {
            $this->db->insert('transport_route', $data);
            return $this->db->insert_id();
        }
    }

    public function listroute() {
        $this->db->select()->from('transport_route');
        $listtransport = $this->db->get();
        return $listtransport->result_array();
    }

    public function listvehicles() {
        $this->db->select()->from('vehicles');
        $listvehicles = $this->db->get();
        return $listvehicles->result_array();
    }

    function studentTransportDetails($carray) {

        $userdata = $this->customlib->getUserData();

        if (($userdata["role_id"] == 2) && ($userdata["class_teacher"] == "yes")) {
            if (!empty($carray)) {

                $this->db->where_in("student_session.class_id", $carray);
            } else {
                $this->db->where_in("student_session.class_id", "");
            }
        }

        $query = $this->db->select('students.firstname,students.id,students.admission_no,classes.class,sections.section,students.lastname,students.mobileno,transport_route.route_title,transport_route.fare,vehicles.vehicle_no,vehicles.vehicle_model,vehicles.driver_name,vehicles.driver_contact')->join('student_session', 'students.id = student_session.student_id')->join('sections', 'sections.id = student_session.section_id')->join('classes', 'classes.id = student_session.class_id')->join("vehicle_routes", "students.vehroute_id = vehicle_routes.id")->join("vehicles", "vehicle_routes.vehicle_id = vehicles.id")->join("transport_route", "vehicle_routes.route_id = transport_route.id")->where("students.is_active", "yes")->get("students");
        return $query->result_array();
    }

    function searchTransportDetails($section_id, $class_id, $route_title, $vehicle_no) {

        if ((!empty($route_title)) && (!empty($section_id)) && (!empty($class_id)) && (empty($vehicle_no))) {

            $condition = array('student_session.section_id' => $section_id, 'student_session.class_id' => $class_id, 'transport_route.route_title' => $route_title, 'students.is_active' => 'yes');
        } else if ((empty($route_title)) && (!empty($section_id)) && (!empty($class_id)) && (!empty($vehicle_no))) {

            $condition = array('student_session.section_id' => $section_id, 'student_session.class_id' => $class_id, 'vehicles.vehicle_no' => $vehicle_no, 'students.is_active' => 'yes');
        } else if ((!empty($route_title)) && (!empty($section_id)) && (!empty($class_id)) && (!empty($vehicle_no))) {

            $condition = array('student_session.section_id' => $section_id, 'student_session.class_id' => $class_id, 'vehicles.vehicle_no' => $vehicle_no, 'transport_route.route_title' => $route_title, 'students.is_active' => 'yes');
        } else if ((empty($route_title)) && (!empty($section_id)) && (!empty($class_id)) && (empty($vehicle_no))) {

            $condition = array('student_session.section_id' => $section_id, 'student_session.class_id' => $class_id);
        } else if ((!empty($route_title)) && (empty($section_id)) && (empty($class_id)) && (!empty($vehicle_no))) {

            $condition = array('vehicles.vehicle_no' => $vehicle_no, 'transport_route.route_title' => $route_title);
        } else if ((!empty($route_title)) && (empty($section_id)) && (empty($class_id)) && (empty($vehicle_no))) {

            $condition = array('transport_route.route_title' => $route_title);
        } elseif ((empty($route_title)) && (empty($section_id)) && (empty($class_id)) && (!empty($vehicle_no))) {

            $condition = array('vehicles.vehicle_no' => $vehicle_no);
        } else {           
            $condition = "1 = 1";
        }

        $query = $this->db->select('students.firstname,students.id,students.admission_no,classes.class,sections.section,students.lastname,students.mobileno,transport_route.route_title,transport_route.fare,vehicles.vehicle_no,vehicles.vehicle_model,vehicles.driver_name,vehicles.driver_contact')->join('student_session', 'students.id = student_session.student_id')->join('sections', 'sections.id = student_session.section_id')->join('classes', 'classes.id = student_session.class_id')->join("vehicle_routes", "students.vehroute_id = vehicle_routes.id")->join("vehicles", "vehicle_routes.vehicle_id = vehicles.id")->join("transport_route", "vehicle_routes.route_id = transport_route.id")->where($condition)->get("students");

        return $query->result_array();
    }

}
