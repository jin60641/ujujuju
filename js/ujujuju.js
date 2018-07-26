
var divleft = (window.innerWidth-600)/2;
var divtop = (window.innerHeight-500)/2;	
document.getElementById("canvasDiv").style.left=divleft+"px"
document.getElementById("canvasDiv").style.top=divtop+"px"

window.addEventListener("keydown", onkeydown, false);
window.addEventListener("keyup", onkeyup, false);
window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mouseup", onMouseUp, false);
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener('resize', function(event){
divleft = (window.innerWidth-600)/2;
divtop = (window.innerHeight-500)/2;
document.getElementById("canvasDiv").style.left=divleft+"px"
document.getElementById("canvasDiv").style.top=divtop+"px"
});

var canvasleft = 48;
var canvastop = 32;
var helpPage=0;
var storyClicked=0;
var challengeCliced=0;
var rankClicked=0;
var quizClicked=0;
var MainMouseX=0;
var MainMouseY=0;
var Closedyet=1;
var gamelifes=3
var mainindex=0;
var story1index;
var story2index;
var story3index;
var story4index;
var changetmp=1;
var changeindex=0;
var index=0;
var num = RandomNextInt(36)
var GameMode;
var GameState=0;
var GameTimenow=0;
var Level = 1;
var clickX;
var clickY;
var isKey = 0;
var Stage=1;
var WormTimenow = 0;
var bMouseClicked=0;
var tmpState = RandomNextInt(8);
var paused = 0;
var FPS= 30;
game = new Array();
game[0]= 1;
game[1]= 2;
game[2] =3;
game[3] = 4;
game[4] = 5;
game[5] = 6;
game[6] = 7;
game[7] = 8;
game[8] = 19;
game[9] = 20;
game[10] = 21;
game[11] = 22;





function makeTimer(){
	GameTimenow +=0.1;
}

function RandomNextInt(num)
{
	return Math.floor(Math.random() * num);
}


function selectBack(num){
	if(GameMode&&(Stage==15))
	{
		return imgBoss1Back;
	}
	else if(GameMode&&(Stage==30))
	{
		return imgBoss2Back;
	}
	else if(GameMode&&(Stage==45))
	{
		return imgBoss3Back;
	}
	else if(GameMode&&(Stage==60))
	{
		return imgBoss4Back;
	}
	else{
		switch(num){
		case 0: return imgRocketBack;
		case 1: return imgCalBack;
		case 2: return imgFlyBack;
		case 3: return imgWheelBack;
		case 4: return imgKeyBack;
		case 5: return imgCoinBack;
		case 6: return imgHandBack;
		case 7: return imgCameraBack;
		case 8: return imgBoss1Back;
		case 9: return imgBoss2Back;
		case 10: return imgBoss3Back;
		case 11: return imgBoss4Back;
		}
	}
	
}

function drawScreen(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context= theCanvas.getContext("2d");
	if(GameState == 30){
		Context.fillStyle="#000"
		Context.fillRect(0,0,600,500)
		if(GameMode)
		{
			Context.drawImage(imgGameOver,215,100)
			Context.drawImage(imgToRetry,215,220)
			Context.drawImage(imgToMain,215,280)
		}
		else
		{
			Context.drawImage(imgGameOver,215,80);
			Context.drawImage(imgToRetry,215,245)
			Context.drawImage(imgToMain,215,185)
			Context.drawImage(imgToRank,215,305)
		}
		Context.drawImage(imgInGame,0,0);
		Context.drawImage(imgPlayer[(Level-1)%4],10,400)
	}
	else if(GameState == 31){
		Context.drawImage(imgClear,50,0);
		Context.drawImage(imgReturn,150,0);
	}
	else if(GameState != 0 && GameState != 33 && GameState !=34)
	{
		Context.drawImage(imgInGame,0,0); 
		Context.drawImage(imgPlayer[(Level-1)%4],10,400)
	}
}



function onGameStart(){
	GameState = game[tmpState];
	if(GameMode){
		if(Stage==15) GameState = 19
		else if(Stage==30) GameState = 20
		else if(Stage==45) GameState = 21
		else if(Stage==60) GameState = 22
	}
	clearInterval(RenderLoopID)
	GameLoopID = setInterval(gameLoop,1000/FPS);
	MakeTimerID = setInterval(makeTimer,100)

	if(GameState==1){
		gauge=0;
	}
	else if(GameState==2){
		while(ArrQuestion.length!=0)
		{
			ArrQuestion.pop();
		}
		questionindex=0;
		Solvedindex=0;
		isKey = 0;
		for(var i =0; i<=Level; i++) makeProblem(); // 암산게임 문제갯수 레벨과 갯수가 일치한다
		while(1)
		{
			fake1 = RandomNextInt(Level*Level + 6) + RandomNextInt(10)
			fake2 = RandomNextInt(Level*Level + 6) + RandomNextInt(10)
			fake3 = RandomNextInt(Level*Level + 6) + RandomNextInt(10)
			if((fake1 != fake2 )&&(fake2 != fake3) &&(fake1 != fake3)&&(ArrQuestion[Solvedindex].answer != fake1)&&(ArrQuestion[Solvedindex].answer !=fake2)&&(ArrQuestion[Solvedindex].answer!=fake3))
			{
				break;
			}
		}
	}
	else if(GameState==3)
	{
		while(arrFlys.length != 0)
		{
			arrFlys.pop()
		}
		flycount=0;
		flyindex=0;
		for(var i=0 ; i<4+Level; i++) // 레벨 + 4 만큼의 파리를생성
		{
			makefly();
		}
	}
	else if(GameState ==4){
		isKey = 38;	
		wheelx=0;
	}
	else if(GameState == 5){

		while(arrKeys.length != 0)
		{
			arrKeys.pop()
		}
		index=0;
		index2=0;
		for(var i =0; i<Level*2 ; i++)  // 키입력게임 레벨과 갯수가 일치한다
		{
			makeKeyQuiz()
		}
	}
	else if(GameState == 6){
		coincount=0;
		if(ObjectArr.length!=0){
			clearInterval(MakeObjId);
			while(ObjectArr.length!=0)
			{
				ObjectArr.pop()
			}
		}
		WalletX=200;
		MakeObjId = setInterval(MakeObj,300);
		coinindex=0;
	}
	else if(GameState == 7){
		HardHand = Math.random();
		HandSolved = 0;
		quiznum=0;
		handnum=0;		
		HandQuiz();
	}
	else if(GameState == 8){	
		UFOXpos=-5000;
		UFOYpos=-5000;
		setTimeout(MakeUFO,RandomNextInt(2500)+500)
	}
	else if(GameState == 19)
	{
		coalX=95;
		coalY=300;
		clickount=0;
		coal=0;
		rocketcoal =0;
		if(GameMode)
		{
		}
	}
	else if(GameState == 20)
	{
		MakeMeteoFinished=0;
		meteoKilled=0;
		targetX=250;
		targetY=200;
		meteocount=0;
		arrMeteos = new Array();
		while(arrMeteos.length!=0)
		{
			arrMeteos.pop()
		}
		meteoclearindex=1;
		MakeMeteoID = setInterval(makemeteo,500);
	}
	else if(GameState ==21)
	{
		InputIndex = 0 
		while(arrInputs.length!=0)
		{
			arrInputs.pop()
		}
		for(var i = 0; i<8+Level*2; i++) // 방향키 누르기게임  7 + 레벨 * 2 만큼 생성
		{
			arrInputs.push({x:i*(80+70/Level) + 650,key:RandomNextInt(4)+37,life:1});
		}
		isKey=arrInputs[0].key
	}
	else if(GameState == 22)
	{
		EnemyKillCount=0;
		EnemyBulletLoopID = setInterval(MakeEnemyBulletLoop,2000);
		ObjCreateID1 = setInterval(MakeEnemy,1000);
		PlayerBulletCool = setInterval(PlayerBulletCoolTime,1000/4);
		
	}

}

function gameLoop(){
	if((GameState == 19 || GameState == 20 || GameState == 21 || GameState == 22)){
		if(GameState == 19)
		{
			if(GameTimenow>=10)
			{
				onGameOver();
			}
		}
	}
	else if(GameTimenow>=5)
	{
		if(!yetcleared)
		{
			onGameOver();
		}
	}
	
	Render();

	if(GameState==3)
	{
		flyLoop();
	}
	if(GameState == 6)
	{
		WalletUpdate();
		ObjLoop();
	}
	else if(GameState == 8)
	{
		UFOLoop();
	}
	if(GameState == 20)
	{
		meteoUpdate();
		meteomove();
	}
	if(GameState == 22)
	{
		ufoUpdate();
		EnemyBulletLoop();
		EnemyLoop();
	}

}



function onGameOver(){
	GameTimenow = 0;
	clearInterval(MakeTimerID);
	clearInterval(GameLoopID);
	if((Stage==15 || Stage==30 || Stage==45 || Stage==60)&&GameMode)
	{
		gamelifes=0;
		if(Stage==30)
		{
			clearInterval(MakeMeteoID)
		}
		else if(Stage == 60)
		{
			clearInterval(ObjCreateID1)
			clearInterval(PlayerBulletCool)
			clearInterval(EnemyBulletLoopID)
		}
	}
	else
	{
		gamelifes--;
	}
	if(GameState ==8){
		console.log(UFODir,UFOXpos,UFOYpos)
	}
	if(gamelifes <= 0){
		GameState = 30;
		drawScreen();
	}
	else onGameClear();

}


function onGameClear(){
	//soundIngame.pause();
	clearInterval(MakeTimerID);
	clearInterval(GameLoopID);
	GameTimenow = 0;
	Render();
	
	while(1)
	{
		if(GameMode)
		{
			tmpState = RandomNextInt(8);
		}
		else 
		{
			tmpState = RandomNextInt(11);
		}
		if(GameState != game[tmpState])
		{
			break;
		}
	}
	
	if(GameMode&&(GameState==19))
	{
		story1index = 1;
		GameState=34;
		Stage=16;
		RenderLoopID = setInterval(Render,1000/(FPS * (28/30)))
		if(gamelifes<3) gamelifes++;
	}
	else if(GameMode&&(GameState==20))
	{
		story2index = 1;
		GameState=34;
		Stage=31;
		RenderLoopID = setInterval(Render,1000/(FPS * (28/30)))
		if(gamelifes<3) gamelifes++;
	}
	else if(GameMode&&(GameState == 21))
	{
		story3index = 1;
		GameState=34;
		Stage=46;
		RenderLoopID = setInterval(Render,1000/(FPS * (28/30)))
		if(gamelifes<3) gamelifes++;
	}
	else if(GameMode&&(GameState == 22))
	{
		story4index = 1;
		GameState=34;
		clearInterval(EnemyBulletLoopID)
		clearInterval(ObjCreateID1)
		clearInterval(PlayerBulletCool)
		RenderLoopID = setInterval(Render,1000/25)
		if(gamelifes<3) gamelifes++;
	}
	else
	{
		GameState=32;
		changeindex=0;
		MakeChangeID = setInterval(Render,1000/45)
		Stage++;
	}

	
	if(Stage%15 == 1 && Stage!=1)
	{
		Level++;
	}
	else if(GameState == 1)
	{
		isKey = 0;
		gauge=0;
	}
	else if(GameState == 2)
	{
		while(ArrQuestion.length!=0)
		{
			ArrQuestion.pop();
		}
		questionindex=0;
		Solvedindex=0;
	}
	else if(GameState == 3)
	{
		while(arrFlys.length != 0)
		{
			arrFlys.pop()
		}
		flycount=0;
		flyindex=0;
	}
	else if(GameState == 4)
	{
		wheelx=0;
	}
	else if(GameState == 5)
	{
		index=0;
		index2=0;
		while(arrKeys.length!=0)
		{
			arrKeys.pop()
		}
	}
	else if(GameState == 6)
	{
		clearInterval(MakeObjId);
		while(ObjectArr.length!=0)
		{
			ObjectArr.pop()
		}
		WalletX=200;
	}
	else if(GameState == 7)
	{
		HandSolved = 0;
	}
	else if(GameState == 8)
	{
		UFODir = 111
	}
	else if(GameState == 19)
	{
		coalX=95;
		coalY=300;
		clickount=0;
		coal=0;
		rocketcoal =0;
	}
	else if(GameState == 20)
	{
		targetX=250;
		targetY=200;
		meteocount=0;
		arrMeteos = new Array();
		while(arrMeteos.length!=0)
		{
			arrMeteos.pop()
		}
		meteoclearindex=1;
	}
	else if(GameState == 21)
	{
		InputIndex = 0 
		while(arrInputs.length!=0)
		{
			arrInputs.pop()
		}
	}
	else if(GameState ==22)
	{
		while(EnemyArr.length!=0)
		{
			EnemyArr.pop()
		}
		while(EnemyBulletArr.length!=0)
		{
			EnemyArr.pop()
		}
		while(PlayerBulletArr.length!=0)
		{
			PlayerBulletArr.pop();
		}
		EnemyCnt=0;
		EnemyKillCount=0;
		PlayerPosX = 10;
		PlayerPosY = 200;
		clearInterval(ObjCreateID1);
		clearInterval(PlayerBulletCool);
		clearInterval(EnemyBulletLoopID);
	}
}




function Render(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	if(GameState != 0 && GameState != 33 && GameState != 34 && Stage!=1 && GameState != 50&& GameState != 51)
	{
		Context.drawImage(imgInGame,0,0); 
		Context.drawImage(imgPlayer[(Level-1)%4],10,400);
	}
	if(GameState == 0){
		if(mainindex<=22)
		{
			Context.drawImage(Main,0 + mainindex * 600 ,0,600,500,0,0,600,500)
			mainindex++;
		}
		if(mainindex == 23){
			Context.drawImage(Main,0 + (mainindex-1) * 600 ,0,600,500,0,0,600,500)
			Context.drawImage(imgHelp,550,450)
			if(MainMouseX >= 238 && MainMouseX <=370 && MainMouseY >= 340 && MainMouseY <= 370)
				{
				if(bMouseClicked)
				{
					Context.drawImage(StoryClicked,218,323);
				}
				else
				{
					Context.drawImage(Story,226,321);
				}
				Context.drawImage(Challenge2,238,388);
				Context.drawImage(Ranking2,235,435);
			}
			else if(MainMouseX >= 238 && MainMouseX<= 370 && MainMouseY >= 388 && MainMouseY <= 418)
			{
				if(bMouseClicked)
				{
					Context.drawImage(ChallengeClicked,225,365); 
				}
				else
				{
					Context.drawImage(Challenge,238,368);
				}
				Context.drawImage(Story2,238,340);
				Context.drawImage(Ranking2,235,435);
			}
			else if(MainMouseX >= 275 && MainMouseX <= 327 && MainMouseY>=435 && MainMouseY <= 465)
			{
				if(bMouseClicked)
				{
				Context.drawImage(RankingClicked,208,413); 
				}
				else
				{
					Context.drawImage(Ranking,215,416);
				}
				Context.drawImage(Story2,238,340)
				Context.drawImage(Challenge2,238,388)
			}
			else
			{
				Context.drawImage(Story2,238,340);
				Context.drawImage(Challenge2,238,388)
				Context.drawImage(Ranking2,235,435);
			}
		}
	}

	else if(GameState == 1)
	{
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(imgRocketBack,0 + canvasleft,0 + canvastop)	
	
		if(gauge>=14)
		{
			Context.drawImage(imgRocket,0+rocketindex*140,0,140,263,120 + canvasleft,160-rocketindex*30 + canvastop - rockety*30,140,263);
			rocketindex++;
			if(rocketindex>=6){rocketindex=6;rockety++;}
		}
		else
		{
			Context.drawImage(imgRocketNormal,0,0,140,263,120 + canvasleft,160 + canvasleft,140,263);
		}
		if(gauge > 14)
		{
			gauge=14
		}
		if(gauge >= 0)
		{
			Context.drawImage(imgGauge[Math.floor(gauge)],400 + canvasleft,10 + canvastop)	
		}
	}
	else if(GameState==2)
	{
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(imgCalBack,0+canvasleft,0+canvastop)
		Context.fillStyle="#000"
		Context.font = "60px 'Arcade'";	
		if(Solvedindex<Level)
		{
			Context.save();
			Context.textAlign = 'center';
			Context.fillText(ArrQuestion[Solvedindex].a,120+canvasleft,143+canvastop)
			if(ArrQuestion[Solvedindex].sign)
			{
				Context.drawImage(imgPlus,115+canvasleft + 80,63+canvastop,120,120)
			}
			else 
			{
				Context.fillText("-",170+canvasleft + 80,143+canvastop)
			}
			Context.fillText(ArrQuestion[Solvedindex].b,170+ 205 + canvasleft, 143+canvastop)
			Context.font = "40px 'Arcade'";
			Context.drawImage(imgAnswer1,45+canvasleft,265+canvastop)
			Context.drawImage(imgAnswer2,200+canvasleft,265+canvastop)
			Context.drawImage(imgAnswer3,355+canvasleft,265+canvastop)					
			Context.fillText(fake1,90+canvasleft,330+canvastop)
			Context.fillText(fake2,245+canvasleft,330+canvastop)
			Context.fillText(fake3,400+canvasleft,330+canvastop)	
			switch(ArrQuestion[Solvedindex].x){
				case 45: Context.drawImage(imgAnswer1,45+canvasleft,265+canvastop);
				break;
				case 200: Context.drawImage(imgAnswer2,200+canvasleft,265+canvastop);
				break;
				case 355: Context.drawImage(imgAnswer3,355+canvasleft,265+canvastop);
				break;
			}
		
			Context.font = "40px 'Arcade'";
			Context.fillText(ArrQuestion[Solvedindex].answer,ArrQuestion[Solvedindex].x + 45+canvasleft, ArrQuestion[Solvedindex].y + 65+canvastop)
			Context.restore();
		}
	}
	else if(GameState == 3){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.fillStyle ="#fff"
		Context.drawImage(imgFlyBack,0+canvasleft,0+canvastop)
		flyindex+=0.5;
		for( var j = 0; j < arrFlys.length;j++)
		{
			if(flyindex>=3) 
			{
				flyindex-=3;
			}
			var flyindex2 = Math.floor(flyindex)
			if(arrFlys[j].life)
			{
				Context.drawImage(imgFly,0+flyindex2*32,0,32,32,arrFlys[j].x+canvasleft, arrFlys[j].y+canvastop,32,32);	
			}
			else
			{
				Context.drawImage(imgFlyDie,arrFlys[j].x+canvasleft,arrFlys[j].y+canvastop);
			}
		}

		if(bMouseClicked)
		{
			Context.drawImage(imgHits,hitterX -24 +canvasleft,hitterY-20+canvastop)
		}
		else
		{
			Context.drawImage(imgHit,hitterX -24 +canvasleft,hitterY-20+canvastop)
		}
	}
	else if(GameState == 4){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(imgWheelBack,0+canvasleft,0+canvastop)
		if(wheelx%2)
		{
			Context.drawImage(imgWheel1,wheelx+canvasleft,300+canvastop)
		}
		else
		{
			Context.drawImage(imgWheel2,wheelx+canvasleft,300+canvastop)
		}
	}
	else if(GameState == 5){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(imgKeyBack,0+canvasleft,0+canvastop)
		Context.drawImage(imgKey,40+canvasleft,85+canvastop,250,250);
		Context.drawImage(imgKey,210+canvasleft,85+canvastop,250,250);
		Context.fillStyle="#fff"
		Context.save()
		Context.textAlign = 'center';
		Context.font = "65px 'Arcade'"
		Context.fillText(arrKeys[index].key,170+canvasleft,235+canvastop);
		Context.fillText(arrKeys[index+1].key,335+canvasleft,235+canvastop);	
		Context.restore()
	}
	else if(GameState == 6)
	{
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(imgCoinBack,0+canvasleft,0+canvastop);
		for( var j = 0; j < ObjectArr.length;j++)
		{
			if(ObjectArr[j].type)
			{
				coinindex+=0.2
				var coinindex2= Math.floor(coinindex)
				if(coinindex>=4) coinindex=0;
				Context.drawImage(Coin,0+coinindex2*45,0,45,45,ObjectArr[j].x+canvasleft,ObjectArr[j].y+canvastop,45,45)
			}
			else
			{
				Context.drawImage(Spike,ObjectArr[j].x+canvasleft,ObjectArr[j].y+canvastop)
			}
		}
		Context.drawImage(Wallet,WalletX+canvasleft,300+canvastop)
	}
	else if(GameState == 7){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");

		Context.drawImage(imgHandBack,0+canvasleft,0+canvastop)
		if(Level>=4)
		{
			if(quiznum==0)
			{
				if(HardHand >= 0.4) 
					Context.drawImage(quizimage[3],115+canvasleft,0+canvastop);
				else 
					Context.drawImage(quizimage[0],150+canvasleft,0+canvastop);
			}
			else if(quiznum==2)
			{
				if(HardHand >= 0.4) Context.drawImage(quizimage[4],110+canvasleft,0+canvastop);
				else Context.drawImage(quizimage[2],150+canvasleft,0+canvastop);
			}
			else
			{
				Context.drawImage(quizimage[quiznum],150+canvasleft,0+canvastop);
			}
			Context.drawImage(handimage[handnum],180+canvasleft,95+canvastop);	
		}
		else
		{
			Context.drawImage(quizimage[quiznum],150+canvasleft,0+canvastop);	
			Context.drawImage(handimage[handnum],180+canvasleft,95+canvastop);			
		}
		for(var i=0; i<3; i++)
		{
			Context.drawImage(buttonimage[i],20+165*i+canvasleft,280+canvastop);
		}
	}
	else if(GameState == 8){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(imgCameraBack,0+canvasleft,0+canvastop);
		Context.drawImage(imgUFO,UFOXpos+canvasleft,UFOYpos+canvastop);
	}
	else if(GameState == 19){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(imgBoss1Back,0+canvasleft,0+canvastop);
		Context.drawImage(imgMine,35+canvasleft,100+canvastop)
		Context.drawImage(imgCoalRocket[Math.floor(rocketcoal)],380,115,120,173)
		if(coal)
		{
			Context.drawImage(Coal,coalX+canvasleft,coalY+canvastop,30,30)
		}
	}
	else if(GameState == 20){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(imgBoss2Back,0+canvasleft,0+canvastop)
		Context.drawImage(imgTarget,targetX+canvasleft-70,targetY+canvastop-57)
		Context.fillStyle="#fff"
		for(var i =0; i<arrMeteos.length; i++)
		{
			if(arrMeteos[i].life)
			{
				Context.drawImage(imgMeteo,0,0,100,100,arrMeteos[i].x,arrMeteos[i].y,100,100)	
			}
			else if(arrMeteos[i].crashed<=5)
			{
				Context.drawImage(imgMeteo,0 + arrMeteos[i].crashed*100,0,100,100,arrMeteos[i].x,arrMeteos[i].y,100,100)
				arrMeteos[i].crashed++;
			}
			else
			{
				arrMeteos[i].go_x = 0;
			}
		}
	}
	else if(GameState == 21)
	{
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(imgBoss3Back,canvasleft,canvastop)
		var Failed=0;
		for(var i =0; i<arrInputs.length;i ++)
		{
			arrInputs[i].x -= 10 + Level*1;
			if(arrInputs[i].life)
			{	
				switch(arrInputs[i].key)
				{
					case 37: Context.drawImage(imgLeft,arrInputs[i].x,200); break;
					case 38: Context.drawImage(imgUp,arrInputs[i].x,200); break;
					case 39: Context.drawImage(imgRight,arrInputs[i].x,200); break;
					case 40: Context.drawImage(imgDown,arrInputs[i].x,200); break;
				}
			}
			else
			{
				switch(arrInputs[i].key)
				{
					case 37: Context.drawImage(imgLeftd,arrInputs[i].x,200); break;
					case 38: Context.drawImage(imgUpd,arrInputs[i].x,200); break;
					case 39: Context.drawImage(imgRightd,arrInputs[i].x,200); break;
					case 40: Context.drawImage(imgDownd,arrInputs[i].x,200); break;
				}
			}
			if(arrInputs[i].life && (arrInputs[i].x <=-20) && arrInputs[i].x >= -100 && Failed == 0)
			{
				Failed=1;
				while(arrInputs.length!=0) arrInputs.pop();
			}
			else if(Failed)
			{
				arrInputs[i].x = -5000
			}
		}
		if(Failed) onGameOver();

	}
	else if(GameState== 22)
	{
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(imgBoss4Back,canvasleft,canvastop);



		for(var i=0; i<EnemyArr.length; i++)
		{
			if(EnemyArr[i].life){
				if(((EnemyArr[i].x<PlayerXpos+UFO.width*0.8)&&(EnemyArr[i].x+Monster1.width*0.8>PlayerXpos))&&((EnemyArr[i].y+Monster1.height*0.7>PlayerYpos)&&(EnemyArr[i].y<PlayerYpos+UFO.height*0.7)))
				onGameOver();
			}
			EnemyArr[i].index+=0.2;
			if(EnemyArr[i].life)
			{
				switch(EnemyArr[i].Type)
				{
					case 0: Context.drawImage(Monster1,0 + (Math.floor(EnemyArr[i].index%3)*88),0,88,55,EnemyArr[i].x+canvasleft, EnemyArr[i].y+canvastop,88,55); break;
					case 1: Context.drawImage(Monster2,0 + (Math.floor(EnemyArr[i].index%3)*88),0,88,55,EnemyArr[i].x+canvasleft, EnemyArr[i].y+canvastop,88,55); break; 
					case 2: Context.drawImage(Monster3,0 + (Math.floor(EnemyArr[i].index%3)*88),0,88,55,EnemyArr[i].x+canvasleft, EnemyArr[i].y+canvastop,88,55); break;
					case 3: Context.drawImage(Monster4,0 + (Math.floor(EnemyArr[i].index%3)*212),0,212,200,EnemyArr[i].x+canvasleft, EnemyArr[i].y+canvastop,212,200); break;
				}
			}
			else
			{
				switch(EnemyArr[i].Type)
				{
					case 0: Context.drawImage(Monster1death,EnemyArr[i].x+canvasleft, EnemyArr[i].y+canvastop); break;
					case 1: Context.drawImage(Monster2death,EnemyArr[i].x+canvasleft, EnemyArr[i].y+canvastop); break; 
					case 2: Context.drawImage(Monster3death,EnemyArr[i].x+canvasleft, EnemyArr[i].y+canvastop); break;
					case 3: Context.drawImage(Monster4death,EnemyArr[i].x+canvasleft, EnemyArr[i].y+canvastop); break;
				}
			}
		}
		
		for(var j=0; j<EnemyBulletArr.length; j++)
		{
			if(((EnemyBulletArr[j].x+20>PlayerXpos)&&(PlayerXpos+UFO.width*0.8>EnemyBulletArr[j].x))&&((EnemyBulletArr[j].y+3>PlayerYpos)&&(EnemyBulletArr[j].y<PlayerYpos+UFO.height*0.8)))
				onGameOver();
			switch(EnemyBulletArr[j].Type)
			{
				case 0: Context.drawImage(Bullet1,EnemyBulletArr[j].x+canvasleft, EnemyBulletArr[j].y+canvastop); break;
				case 1: Context.drawImage(Bullet2,EnemyBulletArr[j].x+canvasleft, EnemyBulletArr[j].y+canvastop); break;
				case 2: Context.drawImage(Bullet3,EnemyBulletArr[j].x+canvasleft, EnemyBulletArr[j].y+canvastop); break;
				case 3: Context.drawImage(Bullet4,EnemyBulletArr[j].x+canvasleft, EnemyBulletArr[j].y+canvastop); break;
			}
		}

	    	for(var i = 0; i<PlayerBulletArr.length; i++)
		{
			PlayerBulletArr[i].x+=PlayerBulletArr[i].ObjSpeed;
			if(PlayerBulletArr[i].x==500)
				PlayerBulletArr[i].y=1000;
			Context.drawImage(Bullet,PlayerBulletArr[i].x+canvasleft, PlayerBulletArr[i].y+canvastop);		
		}

		Context.drawImage(UFO,PlayerXpos+canvasleft,PlayerYpos+canvastop);
	}
	if(GameState!=0 && GameState!=33 && GameState!=34 && GameState != 50 && GameState != 51)
	{
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		
		Context.drawImage(imgInGame,0,0);
		for(var i =0; i<gamelifes; i++)
		{
			Context.drawImage(imgLife,557-i*43,0)
		}
		Context.drawImage(imgPlayer[(Level-1)%4],10,400)

		if(GameState!=30 && GameState!=19 && GameState!=20 && GameState!=21 && GameState !=22)
		{
			if(GameTimenow <=5)
			{
				Context.drawImage(Worms,Math.floor(GameTimenow*2.5)*93,0,93,66,507-(Math.floor(GameTimenow*1.2)*93),420,93,66)
			}
		}
		if(GameState == 19)
		{
			if(GameTimenow <= 10)
			{
				Context.drawImage(Timer,1104-92-Math.floor(GameTimenow)*92,0,92,95,500,405,92,92)
			}
		}
		switch(GameState){
		case 1:Context.drawImage(imgSpacebar,3,-20); break;
		case 2:Context.drawImage(imgMouse,-10,1); break;
		case 3:Context.drawImage(imgMouse,-10,1); break;
		case 4:Context.drawImage(imgArrow,-10,-15); break;
		case 5:Context.drawImage(imgKeyboard,0,1,60,27); break;
		case 6:Context.drawImage(imgArrow,-10,-15); break;
		case 7:Context.drawImage(imgMouse,-10,1); break;
		case 8:Context.drawImage(imgSpacebar,3,-20); break;
		case 19:Context.drawImage(imgMouse,-10,2); break;
		case 20: Context.drawImage(imgArrow,-10,-15);Context.drawImage(imgSpacebar,43,-20); break; 
		case 21:Context.drawImage(imgArrow,-10,-15); break;
		case 22:Context.drawImage(imgArrow,-10,-15);Context.drawImage(imgSpacebar,43,-20); break; 
		}
	}
	

	if(GameState == 32){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		
		if(Stage==1 && changetmp) Context.drawImage(Main,0 + (0 * 600) ,0,600,500,0,0,600,500)
		if(changetmp == 0)
		{
			Context.drawImage(selectBack(tmpState),0+canvasleft,0+canvastop)
		}
		if(1!=(Stage==1 && changetmp)) Context.drawImage(imgPlayer[(Level-1)%4],10,400)
		GameTimenow=0;

		Context.drawImage(StageChange,0+600*changeindex,0,600,500,0,0,600,500)
		if(paused == 0){

		if(changetmp){
			changeindex++;
			if(changeindex >19)
			{
				changetmp=0; 
				changeindex--;
			}
			soundChange.play();
		}
		else{ 
			changeindex--;
			if(changeindex < 1)
			{
				soundIngame.play();
				changetmp=1; 
				clearInterval(MakeChangeID); 
				onGameStart(); 
			}
			else
			{
				soundChange.play();
			}
		}
				Context.save()
		Context.textAlign = "center"
		Context.fillStyle="#fff"
		Context.font = '200px "Arcade+" '
		Context.fillText(Stage,300,-100+changeindex*(25))
		Context.restore();
		}
		else
		{
		Context.save()
		Context.textAlign = "center"
		Context.fillStyle="#fff"
		Context.font = '200px "Arcade+" '
		Context.fillText(Stage,300,-100+changeindex*(25))
		Context.restore();
			Context.drawImage(imgPause,0,0)

		}

		

	}
	if(GameState == 33){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		if(mainindex>=0){
		Context.drawImage(Main,0 + mainindex * 600 ,0,600,500,0,0,600,500)
		mainindex--;
		}
		if(mainindex==-1){
		Context.drawImage(Main,0 + (mainindex+1) * 600 ,0,600,500,0,0,600,500)
		mainindex = -2;
		clearInterval(RenderLoopID)
		GameState=32;
		changeindex=0;
		setTimeout(function(){MakeChangeID = setInterval(Render,1000/45)},200)
		}
	}
	else if(GameState == 34){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		if(story1index == 45){clearInterval(RenderLoopID); setTimeout(function(){story1index++; Stage=16; onGameStart()},2000)}
		else if(story1index>=1 && story1index<=44){
			Context.drawImage(imgStory1,0+(story1index * 600),0,600,500,0,0,600,500)
			story1index++;
		}
		else if(story2index == 45){clearInterval(RenderLoopID); setTimeout(function(){story2index++; Stage=31; onGameStart()},2000)}
		else if(story2index>=1 && story2index<=44){
			Context.drawImage(imgStory2,0+(story2index * 600),0,600,500,0,0,600,500)
			story2index++;
		}
		else if(story3index == 45){clearInterval(RenderLoopID); setTimeout(function(){story3index++; Stage=46; onGameStart()},2000)}
		else if(story3index>=1 && story3index<=44){
			Context.drawImage(imgStory3,0+(story3index * 600),0,600,500,0,0,600,500)
			story3index++;
		}
		else if(story4index == 83){clearInterval(RenderLoopID); setTimeout(function(){story4index++; GameState=31; drawScreen();},1000)}
		else if(story4index>=1 && story4index<=41){
			Context.drawImage(imgStory4,0+(story4index * 600),0,600,500,0,0,600,500)
			story4index++;
		}
		else if(story4index>=42 && story4index<=82){
			Context.drawImage(imgStory4,0+((story4index-42) * 600),500,600,500,0,0,600,500)
			story4index++;
		}
	}
	else if(GameState == 50){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(RankingPage,0,0);
		Context.fillStyle="white"
		//Context.fillStyle = "#0a2831"
		Context.font = '40px "Arcade+"'
		Context.save()
		Context.textAlign = "left"
		if(Rankers){
		Context.fillText("1.",90,200);
		Context.fillText("2.",90,260);
		Context.fillText("3.",90,320);
		Context.fillText("4.",90,380);
		Context.fillText("5.",90,440);
		Context.fillStyle="yellow"
		Context.fillText(Rankers[0].name,175,200)
		Context.fillText(Rankers[1].name,175,260)
		Context.fillText(Rankers[2].name,175,320)
		Context.fillText(Rankers[3].name,175,380)
		Context.fillText(Rankers[4].name,175,440)
		Context.fillStyle="white"
		Context.fillText(Rankers[0].stage,315,200);
		Context.fillText(Rankers[1].stage,315,260);
		Context.fillText(Rankers[2].stage,315,320);
		Context.fillText(Rankers[3].stage,315,380);
		Context.fillText(Rankers[4].stage,315,440);
		Context.restore();
		}
		if(bMouseClicked)
		Context.drawImage(RankBackButtonClicked,10,10);
		else
		Context.drawImage(RankBackButton,10,10);
	}
	else if(GameState == 51){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		Context.drawImage(RankingPage,0,0)
		Context.drawImage(RankStar,InputStar[starindex].x,InputStar[starindex].y)
		Context.drawImage(RankInput,0,0)
		Context.save();
		Context.font = "35px 'Arcade+'"
		Context.fillStyle="white"
		switch(InputRank.length)
		{
			case 1:	Context.fillText(InputRank[0],215,255);
				break;
			case 2:	Context.fillText(InputRank[0],215,255);
				Context.fillText(InputRank[1],285,255);
				break;
			case 3:	Context.fillText(InputRank[0],215,255);
				Context.fillText(InputRank[1],285,255);
				Context.fillText(InputRank[2],353,255);
				break;
		}
		Context.restore();
	}
	else if(GameState == 52){
		var theCanvas = document.getElementById("GameCanvas");
		var Context = theCanvas.getContext("2d");
		
		switch(helpPage){
			case 0:	Context.drawImage(imgHelpPage1,0,0);
				Context.drawImage(imgHelpPrev,0,0)
				Context.drawImage(imgHelpNext,0,0)
				break;
			case 1: Context.drawImage(imgHelpPage2,0,0); 
				Context.drawImage(imgHelpPrev,0,0)
				Context.drawImage(imgHelpNext,0,0);
				break;
			case 2: Context.drawImage(imgHelpPage3,0,0); 
				Context.drawImage(imgHelpPrev,0,0)
				break;
		}
	}
}

RenderLoopID = setInterval(Render,1000/30)
soundMain.play();
soundUFO.play();
