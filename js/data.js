// JavaScript Document
//Team A
var tA_name_1;
var tA_attack_1;
var tA_defense_1;
var tA_x_1;
var tA_y_1;

var tA_name_2;
var tA_attack_2;
var tA_defense_2;
var tA_x_2;
var tA_y_2;

var tA_name_3;
var tA_attack_3;
var tA_defense_3;
var tA_x_3;
var tA_y_3;

//Team B
var tB_name_1;
var tB_attack_1;
var tB_defense_1;
var tB_x_1;
var tB_y_1;

var tB_name_2;
var tB_attack_2;
var tB_defense_2;
var tB_x_2;
var tB_y_2;

var tB_name_3;
var tB_attack_3;
var tB_defense_3;
var tB_x_3;
var tB_y_3;
Team_A = null;
Team_B = null;
Team = null;
ball = null;
map = null;
ball_order = null;

speed_l=null;
speed_h=null;
speed_n=null;

tmp_target={
		"x":300,
		"y":300,
		"name":"temp_target",
};
function init_data() {
	speed_l=4;
	speed_h=6;
	speed_n=5;
	map = {
		"height" : 640,
		"width" : 1024,
	};
	init_member();
	init_team();
	Team = [Team_A, Team_B];
	ball_order = [Team_A.p.p1, Team_B.p.p1, Team_A.p.p2, Team_B.p.p2];
}

function get_Team_A() {
	return Team_A;
}

function get_Team_B() {
	return Team_B;
}

function get_ball() {
	return ball;

}


$(document).ready(function(e) {
	$("input").change(function() {
		init_data();
	});
});

/*
function write_data() {
	$.each(Team_A.p, function(index, item) {
		$("#tA_name_" + (index + 1)).val(item.name);
		$("#tA_attack_" + (index + 1)).val(item.attack);
		$("#tA_defense_" + (index + 1)).val(item.defense);
		$("#tA_x_" + (index + 1)).val(item.x);
		$("#tA_y_" + (index + 1)).val(item.y);
	});
	var tA_s = Team_A.s[0];
	$("#tA_name_3").val(tA_s.name);
	$("#tA_attack_3").val(tA_s.attack);
	$("#tA_defense_3").val(tA_s.defense);
	$("#tA_x_3").val(tA_s.x);
	$("#tA_y_3").val(tA_s.y);
	//Team B
	$.each(Team_B.p, function(index, item) {
		$("#tA_name_" + (index + 1)).val(item.name);
		$("#tA_attack_" + (index + 1)).val(item.attack);
		$("#tA_defense_" + (index + 1)).val(item.defense);
		$("#tA_x_" + (index + 1)).val(item.x);
		$("#tA_y_" + (index + 1)).val(item.y);
	});
	var tB_s = Team_B.s[0];
	$("#tA_name_3").val(tB_s.name);
	$("#tA_attack_3").val(tB_s.attack);
	$("#tA_defense_3").val(tB_s.defense);
	$("#tA_x_3").val(tB_s.x);
	$("#tA_y_3").val(tB_s.y);
}*/