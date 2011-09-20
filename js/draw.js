// JavaScript Document

var backgroundImg = new Image();
var ctx = null;
screenWidth = 1024;
//画布宽度
screenHeight = 640;
//画布高度
function mainLoop() {
	backgroundImg = new Image();
	//背景图
	backgroundImg.src = "./images/backgroud.jpg";
	//背景
	var ballImg = new Image();
	//足球
	ballImg.src = "./images/ball.png";

	var canvas = document.getElementById('canvas_main');
	ctx = canvas.getContext('2d');
	//获取2d画布
	ctx.clearRect(0, 0, screenWidth, screenHeight);
	ctx.save();
	//ctx.drawImage(backgroundImg, 0, 0,1024,640);

	ctx.drawImage(ballImg, ball.x, ball.y);
	ball.width=ballImg.width;
	ball.height = ballImg.height;

	//画队A
	$.each(Team_A.p, function(index, item) {
		var p_A_Img = new Image();
		//球员A
		p_A_Img.src = item.image;
		ctx.drawImage(p_A_Img, item.x, item.y);
		item.width = p_A_Img.width;
		item.height = p_A_Img.height;
		
	});
	
	//$("#mouse").html(Team_A.p[0].width+"  "+Team_A.p[0].height);
	var goalkeeper_A_Img = new Image();
	var gk_A = Team_A.s[0];
	goalkeeper_A_Img.src = gk_A.image;
	ctx.drawImage(goalkeeper_A_Img, gk_A.x, gk_A.y);

	//画队B
	$.each(Team_B.p, function(index, item) {
		var p_A_Img = new Image();
		//球员A
		p_A_Img.src = item.image;
		ctx.drawImage(p_A_Img, item.x, item.y);
		item.width = p_A_Img.width;
		item.height = p_A_Img.height;

	});
	var goalkeeper_B_Img = new Image();
	var gk_B = Team_B.s[0];
	goalkeeper_B_Img.src = gk_B.image;
	ctx.drawImage(goalkeeper_B_Img, gk_B.x, gk_B.y);
	ctx.fillStyle = "#000000";
	ctx.font = 'italic 40px sans-serif ';
	ctx.fillText(Team_A.name+":"+Team_A.score, (screenWidth-screenWidth/3)/2, screenHeight/15);
	ctx.fillText(Team_B.name+":"+Team_B.score, (screenWidth+screenWidth/10)/2, screenHeight/15);
	ctx.fillText(time_text,50,50);
	ctx.restore(ballImg);
	
	ctx.fillStyle   = "#00f"; // blue   
ctx.strokeStyle = "#f00"; // red   
ctx.lineWidth   = 3;   
// Draw some rectangles.   
/*ctx.fillRect  (0,   0, 150, 50);   
ctx.strokeRect(0,  60, 150, 50);   
ctx.clearRect (30, 25,  90, 60); */  
//ctx.strokeRect(Team_A.door.x_min, Team_A.door.y_min, Team_A.door.x_max, Team_A.door.y_max-Team_A.door.y_min); 
//ctx.strokeRect(Team_B.door.x_min, Team_B.door.y_min, Team_B.door.x_max-Team_B.door.x_min, Team_B.door.y_max-Team_B.door.y_min); 
	//console.log(backgroundImg.src);
}