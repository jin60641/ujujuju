
var MakeMeteoFinished=0;
var meteoclearindex=1;
var meteocount=0;
var objtype=1;
var targetX=250;
var targetY=200;
var arrMeteos = new Array();
var meteoKilled=0;

function makemeteo()
{
	meteocount++;
	var intY = RandomNextInt(300)+30;
	var intgo_x = 5 + Level *1.2;       // 운석부수기게임 프레임당 운석 이동속도 ( 오른쪽으로 진행 )
	if(intgo_x > 11) intgo_x = 11;
	arrMeteos.push({x:-50,y:intY,go_x:intgo_x,life:1,crashed:0});
	if(arrMeteos.length >=(4 + Level*1))	// 운석부수기게임 운석 생산량
	{
		clearInterval(MakeMeteoID)
		MakeMeteoFinished=1;
	}
}

function meteodie(x,y)
{
	if((targetX <= x+100 && targetX  >= x ) && (targetY <= y+100 && targetY >=y))
	{
		return 1;
	}
	else 
	{
		return 0;
	}
}

function meteomove()
{
	for(var i =0 ; i<arrMeteos.length ; i++){
		arrMeteos[i].x += arrMeteos[i].go_x;
		if(arrMeteos[i].x < -100 || arrMeteos[i].x > 500+canvasleft)
		{
			if(arrMeteos[i].life)
			onGameOver();
		}	
	}
	if((meteoKilled == meteocount ) && MakeMeteoFinished)
	{
		
		meteocount=0;
		GameTimenow=0;
		if(meteoclearindex)
		{
			setTimeout(function(){while(arrMeteos.length !=0){arrMeteos.pop();} onGameClear(),meteoclearindex=1;},300)
		}
		meteoclearindex=0;
	}
}


function meteoUpdate(){
	if(inputSystem.isKeyDown(37)){
		targetX-=10;
	}

	if(inputSystem.isKeyDown(39)){
		targetX+=10;
	}

	if(inputSystem.isKeyDown(38)){
		targetY-=10;
	}

	if(inputSystem.isKeyDown(40)){
		targetY+=10;
	}
	if(targetX <=0){targetX =0;}
	if(targetY <=0){targetY =0;}
	if(targetX >=500){targetX = 500;}
	if(targetY >=400){targetY = 400;}
}