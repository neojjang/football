// JavaScript Document
def_d_A = 100;
//铲球距离
def_d_B = 200;
//抢断距离
match_continue = null;
action_count = 0;
START = 0;
//比赛开场标志位（上下半场都有效）

HALF_FINISH = 0;
//半场开球标志位，0:未开球  1:上半场teamA开球       2:上半场teamB开球    3:下半场已经开球

var test_interval = null;

function game_start() {

	//开始比赛计时
	run_time();
	//设置上场球员的位置的属性
	init_match();

	if(time_out() == 0) {
		match_continue = setInterval(match_action, 10);
	}
	//setInterval(test, 10);
	//change_master();
}

function mask() {
	document.getElementById('mask').disabled = ture;
}

//动作核心控制模块，用于控制球员的动作
function match_action() {
	if(time_out() == 1) {
		clearInterval(match_continue);
		return;
	}
	flush_map();
	
	//if(halftime()){
	//	second_half_action();
	//	return;
	//}
	//刷新球员、球和其他素材的位置（所有的对象都向自己的 target移动）

	//传递中的球，需要确定目前是否已经有人获得（传球成功，被人截断）
	if(ball.state == "pass") {
		get_my_master();
	}
	
	if(ball.master != null && action_count > 10 && ball.state != "pass") {
		action_count = 0;
		if(START == 1) {//开球动作，必须是传球
			START = 0;
			chuanq_action();
			//pand_action();
		} else {
			if(can_shot()) {
				shem_action();
			} else {
				if(Math.floor(Math.random() * 100) > 50) {
					chuanq_action();
				} else {
					pand_action();
				}
			}
			/*
			 if(can_shot()) {
			 shem_action();
			 } else {
			 if(no_defender(ball.master)) {
			 chuanq_action();
			 } else {
			 if(defender_is_far_away(ball.master)) {
			 pand_action();
			 } else {
			 if(defender_is_near(ball.master)) {
			 chuanq_action();
			 } else {
			 guor_action();
			 }
			 }
			 }
			 }
			 */
		}
	} else {
		action_count++;

	}
}

k = 0;
b = 0;
function test() {
	if(time_out() == 1) {
		clearInterval(test_interval);
		return;
	}
	if(ball.status == 0) {
		var t = ball.team;
		ball.status = 1;
		k = 0;
		b = 0;
	} else if(ball.status == 1) {
		var x1 = ball.x;
		var y1 = ball.y;
		var x2 = ball.e_x;
		var y2 = ball.e_y;

		if(k == 0) {
			k = (y2 - y1) / (x2 - x1);
			b = (x2 * y1 - x1 * y2) / (x2 - x1);
		}

		if(Math.abs(x1 - x2) <= 3 && Math.abs(y1 - y2) <= 3) {
			ball.status = -1;
			clearInterval(test_interval);
			k = 0;
			change_master();
			return;
		}

		ball.x += (x1 > x2 ? -2 : 2);
		ball.y = parseInt(k * ball.x + b);

		//console.log(ball.x+".."+ball.y+"=========");
		if(ball.x == 0 || ball.y == 0 || ball.x > map.width || ball.y > map.height) {
			ball.status = -1;
			alert('stop');
			return;
		}
	}
	$("#s_score").html("x1:" + x1 + " y1:" + y1 + "<br />x2:" + x2 + " y2:" + y2 + "<br />status:" + ball.status);
	//setInterval(test, 1000);
}

function change_master() {
	//alert("changer_master!");
	var len = ball.team_d.p.length;

	var tmp_t = ball.team_d;
	var m = tmp_t.p[Math.round(len * Math.random())];
	ball.team_d = ball.team;
	ball.team = tmp_t;
	ball.master = ball.target;
	len = ball.team_d.p.length;
	console.log(len);
	var r = Math.round(len * Math.random());
	if(r >= len)
		r = len - 1;
	if(r < 0)
		r = 0;
	console.log("r=" + r);
	ball.target = ball.team_d.p[r];
	console.log(ball.team_d.name);
	console.log(ball.target);
	console.log(ball.target.name);
	ball.e_x = ball.target.x + ball.target.width / 2;
	ball.e_y = ball.target.y + ball.target.height;

	//alert(ball.e_x+"   "+ball.e_y);
	ball.status = 1;
	test_interval = setInterval(test, 10);
}