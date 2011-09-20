var normalelapse = 100;
var counter;
//var TotalTime = 900;
var TotalTime = 900;
var timer = null;
var t;
var nextelapse = 1000;
btn_start = null;
time_text="0:0:0";

function run_time() {
	t=0;
	var s_time = document.getElementById("s_time");
	btn_start = document.getElementById("btn_start");
	console.log(s_time);
	//s_time.innerText = "00:01:30:00";
	btn_start.disabled = true;
	counter = 0;
	timer = window.setInterval(onTimer, nextelapse);
}

function stop() {
	clearTimeout(timer);
}

function onTimer() {
	if(t>180) {
		clearInterval(timer);
		alert("time is up!");
		btn_start.disabled = false;
		return;
	}
	
/*
	var s_time = document.getElementById("s_time");

	var hms = new String(s_time.innerHTML).split(":");
	var ms = new Number(hms[3]);
	var s = new Number(hms[2]);
	var m = new Number(hms[1]);
	var h = new Number(hms[0]);
	ms -= 10;
	if(ms < 0) {
		ms = 90;
		s -= 1;
		if(s < 0) {
			s = 59;
			m -= 1;
		}
		if(m < 0) {
			m = 59;
			h -= 1;
		}
	}
	ms = ms < 10 ? ("0" + ms) : ms;
	var ss = s < 10 ? ("0" + s) : s;
	var sm = m < 10 ? ("0" + m) : m;
	var sh = h < 10 ? ("0" + h) : h;
	s_time.innerText = sh + ":" + sm + ":" + ss + ":" + ms;
	*/
	
	var ss=(t%60)
	var mm=parseInt((t)/60);
	var h="0";
	time_text=h+":"+mm+":"+ss;
	t+=1;
	
}

function time_out() {
	if(t>=180)
		return 1;
	else
		return 0;
}


function halftime(){
	return t>90?1:0;
	}