//计算A B 之间的距离
function distance(arrA, arrB) {
	var x1 = arrA.x + arrA.width / 2;
	var y1 = arrA.y + arrA.height / 2;
	var x2 = arrB.x + arrB.width / 2;
	var y2 = arrB.y + arrB.height / 2;
	var d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
	return Math.sqrt(d);
}

//判断是否可以射门
function can_shot() {
	if(ball.master != null) {
		if(distance(ball.master, ball.team_d.s[0]) < 240) {
			return 1;
		} else {
			return 0;
		}
	} else {
		return 0;
	}
}

// 球员旁边是否没有防守人
function no_defender(arr) {
	return 1;
	var mems = ball.team_d.p;
	for(var m in mems) {
		if(distance(arr, m) < 10) {
			return 0;
		}
	}
	return 1;
}

// 球员的防守队员是不是都很远
function defender_is_far_away(arr) {
	return 1;
	var mems = ball.team_d.p;
	for(var m in mems) {
		var d = distance(arr, m);
		if(d < 5) {
			return 0;
		}
	}
	return 1;
}

// 球员的防守队员是不是都很近
function defender_is_near(arr) {
	return 0;
	var mems = ball.team_d.p;
	for(var m in mems) {
		var d = distance(arr, m);
		if(d > 5) {
			return 0;
		}
	}
	return 1;
}

//射门
function shem_action() {
	insert_txt("[射门][" + ball.team.name + "][" + ball.master.name + "]");
	var mems = ball.team_d.s[0];
	ball.target = ball.team_d.door;
	ball.master = null;
	ball.speed = 20;
	ball.state = "pass";
}

//传球
function chuanq_action() {
	var master = ball.master;
	ball.state = "pass";
	ball.master.state = "stop";
	master.target = ball.team_d.door;
	var new_target = null;
	var i = 1;
	var new_master;
	while(i < 100 && i > 0) {
		i++;
		var mems = ball.team.p;
		new_master = mems[Math.floor(mems.length * Math.random())];
		if(master != new_master) {
			new_target = new_master;
			break;
		}
	}
	ball.master = null;
	ball.target = new_target;
	ball.passer = master;
	insert_txt("[传球][" + ball.team.name + "][" + master.name + "=>" + ball.target.name + "]");
	var m = closest_member(master, ball.team_d.p);
}

//盘带
function pand_action() {
	//球和控球者的目标
	var master = ball.master;
	insert_txt("[盘带][" + ball.team.name + "][" + ball.master.name + "]");
	ball.state = "normal";
	ball.master.target = ball;
	ball.target = ball.team_d.door;
	ball.speed = master.speed;

	//攻方其他球员的目标
	/*var mems = ball.team.p;
	var i = 0;
	for(i; i < mems.length; i++) {
	var m = mems[i];
	if(m.name != master.name) {
	m.target = closest_member(m,ball.team_d.p);
	}
	}
	*/
	//防守方球员的目标
	/*	var mems_d = ball.team_d.p;
	 var j = 0;
	 for(j; j < mems_d.length; j++) {
	 var m = mems_d[j];
	 if(m.name != master.name) {
	 m.target = closest_member(m, ball.team.p);
	 }
	 }
	 */
}

//得到team中距离arr最近的球员
function closest_member(arr, team) {
	var i = 0;
	var re;
	var max_distence = 0;
	for(i; i < team.length; i++) {
		var m = team[i];
		if(m.name != arr.name) {
			var distance = (arr.x - m.x) * (arr.x - m.x) + (arr.y - m.y) * (arr.y - m.y);
			if(distance > max_distence) {
				max_distence = distance;
				re = m;
			}
		}
	}
	return re;
}

function found_a_not_in_b(team, mems) {
	var result = [];
	for(var big_t in team) {
		for(var min_t in mems) {
			if(big_t != mems) {
				result.push(big_t);
			}
		}
	}
	return result;
}

//依据各个对象的target，对其进行移动操作
function flush_map() {
	//球移动
	move(ball);
	//进攻方移动
	var mems = ball.team.p;
	var i = 0;
	for(i; i < mems.length; i++) {
		var m = mems[i];
		move(m);
	}
	//防守方移动
	var mems_d = ball.team_d.p;
	var j = 0;
	for(j; j < mems_d.length; j++) {
		var m = mems_d[j];
		move(m);
	}
	//门将移动
	var mj = ball.team.p;
	mj_move(1);

	var mj_d = ball.team_d.p;
	mj_move();
}

//素材移动，朝着自己的target前进
function move1(arr) {
	var t = arr.target;
	//if(t != null && arr.state !="stop") {
	if(t != null) {
		var x1 = arr.x;
		var y1 = arr.y;
		var x2 = t.x;
		var y2 = t.y;
		if(t.name == "tmp_target") {
			x2 = Math.floor(Math.random() * 500) + 300;
			y2 = Math.floor(Math.random() * 300) + 150;
		}
		if(arr.state != "stop") { //处于强制静止的物体不发生移动
			if(Math.abs(y2 - y1) <= Math.abs(x2 - x1)) {
				if(x2 != x1) {
					k = (y2 - y1) / (x2 - x1);
					b = (x2 * y1 - x1 * y2) / (x2 - x1);
				} else {
					k = 0;
					b = 1;
				}
				arr.x += (x1 > x2 ? -arr.speed : arr.speed);
				arr.y = parseInt(k * arr.x + b);
			} else {
				if(y2 != y1) {
					k = (x2 - x1) / (y2 - y1);
					b = (y2 * x1 - y1 * x2) / (y2 - y1);
				} else {
					k = 0;
					b = 1;
				}
				arr.y += (y1 > y2 ? -arr.speed : arr.speed);
				arr.x = parseInt(k * arr.y + b);
			}
		}
		if(arr.isball != 1) {//当球员移动到接近边线/底线时,将向场内移动
			if(arr.x <= 0 || arr.x >= 1024 || arr.y < 10 || arr.y > 600) {
				arr.target = tmp_target;
			}
			//console.log(arr);
		}

		if((t.isball == 1 || arr.isball == 1) && distance(t, arr) < 50) {//运动物体和目标接触了，则停止运动
			arr.state = "normal";
			t.state = "normal";
			if(t.isball == 1) {
				t.master = arr;
			} else if(arr.isball == 1) {
				arr.master = t;
			}
		}
//球接触到球门线,则进行进球处理
		if(arr.isball && (arr.x < Team_A.door.x_min + 50 && Team_A.door.y_min < arr.y && arr.y < Team_A.door.y_max)) {
			goal_action();
			//teamB进球
		} else if(arr.isball && (arr.x > Team_B.door.x_min - 50 && Team_B.door.y_min < arr.y && arr.y < Team_B.door.y_max)) {
			goal_action(1);
			//teamA进球
		}
	}
}

function move(arr) {
	var t = arr.target;
	//if(t != null && arr.state !="stop") {
	if(t != null) {
		var x1 = arr.x;
		var y1 = arr.y;
		var x2 = t.x;
		var y2 = t.y;

		if(t.name == "tmp_target") {
			//x2 = Math.floor(Math.random() * 500) + 300;
			//y2 = Math.floor(Math.random() * 300) + 150;
		}

		if(arr.state != "stop") {
			var sp = arr.speed;
			if(Math.abs(y2 - y1) <= Math.abs(x2 - x1)) {
				if(x2 != x1) {
					k = (y2 - y1) / (x2 - x1);
					b = (x2 * y1 - x1 * y2) / (x2 - x1);
				} else {
					k = 1;
					b = 1;
				}

				arr.x += (x1 > x2 ? -sp : sp);
				arr.y = parseInt(k * arr.x + b);
			} else {
				if(y2 != y1) {
					k = (x2 - x1) / (y2 - y1);
					b = (y2 * x1 - y1 * x2) / (y2 - y1);
				} else {
					k = 1;
					b = 1;
				}

				arr.y += (y1 > y2 ? -sp : sp);
				arr.x = parseInt(k * arr.y + b);
			}
		}
		if(arr.isball != 1) {
			if(arr.x <= 0 || arr.x >= 1024) {//|| arr.y < 10 || arr.y > 600) {
				arr.target = tmp_target;
			}
			console.log(arr);
		}

		//if((t.isball==1 || arr.isball==1) && (t.x>arr.x - 2)&& (t.x<arr.x - 2) && (t.y < arr.y + 2) && (t.y > arr.y - 2)) {//运动物体和目标接触了，则停止运动
		console.log(distance(t, arr));
		if((t.isball == 1 || arr.isball == 1) && distance(t, arr) < 50) {//运动物体和目标接触了，则停止运动
			arr.state = "normal";
			t.state = "normal";
			if(t.isball == 1) {
				t.master = arr;
			} else if(arr.isball == 1) {
				arr.master = t;
			}
		}

		if(arr.isball && (arr.x < Team_A.door.x_min + 50 && Team_A.door.y_min < arr.y && arr.y < Team_A.door.y_max)) {
			goal_action();
			//teamB进球
		} else if(arr.isball && (arr.x > Team_B.door.x_min - 50 && Team_B.door.y_min < arr.y && arr.y < Team_B.door.y_max)) {
			goal_action(1);
			//teamA进球
		}
	}
}

function goal_action(arr) {
	var msg="["+time_text+"][进球啦！][" + ball.team.name + "][" + ball.passer.name + "]";
	insert_txt(msg);
	var g_A = Team_A.score;
	var g_B = Team_B.score;
	show_mask("进球!");
	if(arr == 1) {//A队进球
		init_match_after_goal(1);
		Team_A.score = g_A + 1;
		Team_B.score = g_B;
		ball.team = teamB;
		ball.team_d = teamA;

	} else {//B队进球
		init_match_after_goal();
		Team_A.score = g_A;
		Team_B.score = g_B + 1;
		ball.team = teamA;
		ball.team_d = teamB;
	}
	//match_continue = setInterval(match_action, 5000);
	//match_action();
}

//下半场开始
function second_half_action(arr) {
	var g_A = Team_A.score;
	var g_B = Team_B.score;
	insert_txt("[" + time_text + "][上半场比赛结束]");
	//alert("上半场比赛结束");
	init_match();
	Team_A.score = g_A;
	Team_B.score = g_B;

}

//门将的移动控制
function mj_move(flag) {
	if(flag == 1) {
		var arr = ball.team.s[0];
		var x = arr.x;
		var y = arr.y;
		var door = ball.team.door;
		var x_min = door.x_min;
		var x_max = door.x_max;
		var y_max = door.y_max;
		var y_min = door.y_min;
		if(x <= x_min) {
			arr.x += arr.speed;
		} else if(x >= x_max) {
			arr.x -= arr.speed;
		} else {
			if(Math.floor(Math.random() * 100) > 50) {
				arr.x += arr.speed;
			} else {
				arr.x -= arr.speed;
			}
		}
		if(y <= y_min) {
			arr.y += arr.speed;
		} else if(y >= y_max) {
			arr.y -= arr.speed;
		} else {
			if(Math.floor(Math.random() * 100) > 50) {
				arr.y += arr.speed;
			} else {
				arr.y -= arr.speed;
			}
		}
	} else {//防守方门将，依据球的位置做简单移动
		var arr = ball.team_d.s[0];
		var x = ball.x;
		var y = ball.y;
		var door = ball.team_d.door;
		var x_min = door.x_min;
		var x_max = door.x_max;
		var y_min = door.y_min;
		var y_max = door.y_max;
		if(y > arr.y) {
			arr.y += arr.speed;
			if(arr.y > y_max) {
				arr.y = y_max;
			}
		} else {
			arr.y -= arr.speed;
			if(arr.y < y_min) {
				arr.y = y_min;
			}
		}
		if(arr.x <= x_min) {
			arr.x += arr.speed;
		} else if(arr.x >= x_max) {
			arr.x -= arr.speed;
		} else {
			if(Math.floor(Math.random() * 100) > 50) {
				arr.x += arr.speed;
			} else {
				arr.x -= arr.speed;
			}
		}
	}
}

function insert_txt(data) {
	var txt = document.getElementById("live_info").innerHTML;
	document.getElementById("live_info").innerHTML = data + "\n" + txt;
}

function init_match_after_goal(arr) {
	init_member();
	init_team();
	//球员归位
	START = 1;
	//设置第一个动作为开球
	if(arr) {
		Team_B.p[1].target = ball;
		ball.team = Team_B;
		ball.team_d = Team_A;

	} else {
		Team_A.p[1].target = ball;
		ball.team = Team_A;
		ball.team_d = Team_B;
	}
}

function init_match() {
	init_member();
	init_team();
	//球员归位
	START = 1;
	//设置第一个动作为开球
	if(HALF_FINISH == 0) {
		if(Math.floor(Math.random() * 100) > 50) {
			HALF_FINISH = 1;
			//上半场开球标志位
			//ball.master = Team_B.p[1];
			Team_B.p[1].target = ball;
			ball.team = Team_B;
			ball.team_d = Team_A;
		} else {
			HALF_FINISH = 2;
			//ball.master = Team_A.p[1];
			Team_A.p[1].target = ball;
			ball.team = Team_A;
			ball.team_d = Team_B;
		}
	} else {
		if(HALF_FINISH == 1) {
			//ball.master = Team_A.p[1];
			Team_A.p[1].target = ball;
			ball.team = Team_A;
			ball.team_d = Team_B;
		} else {
			//ball.master = Team_B.p[1];
			Team_B.p[1].target = ball;
			ball.team = Team_B;
			ball.team_d = Team_A;
		}
	}
	//ball.master.target=ball;
}

function init_member() {
	//tA_name_1 = $("#tA_name_1").val();
	tA_name_1 = $("#tA_name_1").val();
	tA_attack_1 = parseInt($("#tA_attack_1").val());
	tA_defense_1 = parseInt($("#tA_defense_1").val());
	tA_x_1 = parseInt($("#tA_x_1").val());
	tA_y_1 = parseInt($("#tA_y_1").val());
	tA_name_2 = $("#tA_name_2").val();
	tA_attack_2 = parseInt($("#tA_attack_2").val());
	tA_defense_2 = parseInt($("#tA_defense_2").val());
	tA_x_2 = parseInt($("#tA_x_2").val());
	tA_y_2 = parseInt($("#tA_y_2").val());
	tA_name_3 = $("#tA_name_3").val();
	tA_attack_3 = parseInt($("#tA_attack_3").val());
	tA_defense_3 = parseInt($("#tA_defense_3").val());
	tA_x_3 = parseInt($("#tA_x_3").val());
	tA_y_3 = parseInt($("#tA_y_3").val());
	//Team B
	tB_name_1 = $("#tB_name_1").val();
	tB_attack_1 = parseInt($("#tB_attack_1").val());
	tB_defense_1 = parseInt($("#tB_defense_1").val());
	tB_x_1 = parseInt($("#tB_x_1").val());
	tB_y_1 = parseInt($("#tB_y_1").val());
	tB_name_2 = $("#tB_name_2").val();
	tB_attack_2 = parseInt($("#tB_attack_2").val());
	tB_defense_2 = parseInt($("#tB_defense_2").val());
	tB_x_2 = parseInt($("#tB_x_2").val());
	tB_y_2 = parseInt($("#tB_y_2").val());
	tB_name_3 = $("#tB_nam_3").val();
	tB_attack_3 = parseInt($("#tB_attack_3").val());
	tB_defense_3 = parseInt($("#tB_defense_3").val());
	tB_x_3 = parseInt($("#tB_x_3").val());
	tB_y_3 = parseInt($("#tB_y_3").val());

}

function init_team() {
	Team_A = {
		"p" : [{
			"name" : tA_name_1,
			"attack" : tA_attack_1,
			"defense" : tA_defense_1,
			"x" : tA_x_1,
			"y" : tA_y_1,
			"image" : "./images/mem_A.png",
			"width" : 0,
			"height" : 0,
			"speed" : 6,
			"state" : "normal",
		}, {
			"name" : tA_name_2,
			"attack" : tA_attack_2,
			"defense" : tA_defense_2,
			"x" : tA_x_2,
			"y" : tA_y_2,
			"image" : "./images/mem_A.png",
			"width" : 0,
			"height" : 0,
			"speed" : 6,
			"state" : "normal",
		}],

		"s" : [{
			"name" : tA_name_3,
			"attack" : tA_attack_3,
			"defense" : tA_defense_3,
			"x" : tA_x_3,
			"y" : tA_y_3,
			"image" : "./images/goalkeeper_A.png",
			"speed" : 2,
			"width" : 0,
			"height" : 0,
		}],
		"score" : 0,
		"name" : "Team_A",
		"door" : {
			"x" : 0,
			"y" : (map.height - map.height / 10) / 2,
			"x_min" : 10,
			"x_max" : parseInt(map.width / 20) + 10,
			"y_min" : parseInt((map.height - map.height / (68 / 18)) / 2),
			"y_max" : parseInt((map.height + map.height / (68 / 18)) / 2),
		}
	};
	console.log(Team_A);
	Team_B = {
		"p" : [{
			"name" : tB_name_1,
			"attack" : tB_attack_1,
			"defense" : tB_defense_1,
			"x" : tB_x_1,
			"y" : tB_y_1,
			"image" : "./images/mem_B.png",
			"width" : 0,
			"height" : 0,
			"speed" :4,
			"state" : "normal",
		}, {
			"name" : tB_name_2,
			"attack" : tB_attack_2,
			"defense" : tB_defense_2,
			"x" : tB_x_2,
			"y" : tB_y_2,
			"image" : "./images/mem_B.png",
			"width" : 0,
			"height" : 0,
			"speed" : 4,
			"state" : "normal",
		}],
		"s" : [{
			"name" : tB_name_3,
			"attack" : tB_attack_3,
			"defense" : tB_defense_3,
			"x" : tB_x_3,
			"y" : tB_y_3,
			"image" : "./images/goalkeeper_B.png",
			"speed" : 2,
			"width" : 0,
			"height" : 0,
		}],
		"score" : 0,
		"name" : "Team_B",
		"door" : {
			"x" : map.width - 100,
			"y" : (map.height - map.height / 10) / 2,
			"x_min" : map.width - parseInt(map.width / 20) - 20,
			"x_max" : map.width - 20,
			"y_min" : parseInt((map.height - 18 * map.height / 68) / 2),
			"y_max" : parseInt((map.height + 18 * map.height / 68) / 2),
		}
	};
	ball = {
		"x" : 509,
		"y" : 300,
		"height" : 10,
		"width" : 10,
		"state" : 0,
		"e_x" : 0,
		"e_y" : 0,
		"master" : null,
		"team" : null,
		"team_d" : null,
		"target" : null,
		"base_speed" : 5,
		"speed" : 5,
		"isball" : 1,
		"passer" : null,//传球人
	};
}

function get_my_master() {
	var dis = distance(ball, ball.target);
	if(dis < 20) {
		ball.master = ball.target;
		ball.state = "narmal";
	}
}