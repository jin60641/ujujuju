
var flyindex=0;
var hitterX;
var hitterY;
var flycount=0;
var arrFlys = new Array();

function makefly(){
	flycount++;
	var intX = RandomNextInt(450);
	var intY = RandomNextInt(350);
	var intgo_x = -0.5 + Math.random();
	var intgo_y = -0.5 + Math.random();
	var intspeed = Level*2 + RandomNextInt(4)+2 // 파리잡기게임 프레임당 파리 날라다니는속도
	arrFlys.push({x:intX,y:intY,go_x:intgo_x,go_y:intgo_y,flyspeed:intspeed,life:1});
}


function flyLoop(){
	for(var i =0 ; i<arrFlys.length ; i++){
		if(arrFlys[i].life){
		arrFlys[i].x += arrFlys[i].go_x * arrFlys[i].flyspeed;
		arrFlys[i].y += arrFlys[i].go_y * arrFlys[i].flyspeed;
		}
		if(flydie(arrFlys[i].x,arrFlys[i].y) && bMouseClicked) {if(arrFlys[i].life){arrFlys[i].life = 0; flycount--;}}
		
		if(arrFlys[i].x < 0 || arrFlys[i].x > 475)
		{
			
			arrFlys[i].go_x *=-1;
		}
		else if(arrFlys[i].y < 0 || arrFlys[i].y > 365)
		{
		
			arrFlys[i].go_y *=-1;
		}
		
	}
	if(flycount ==0 )
	{
		while(arrFlys.length!=0)
		arrFlys.pop()
		onGameClear();
	}
}


function flydie(x,y){
if((clickX-48 <= x && clickX+36 >= x ) &&
(clickY+12 >= y && clickY-48<=y)){return 1;}
else return 0;
}
