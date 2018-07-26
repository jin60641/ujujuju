
var PlayerBulletOn = false;
var PlayerBulletArr = new Array();
var EnemyBulletArr = new Array();
var EnemyArr = new Array();
var EnemyCnt=0;
var PlayerXpos = 10;
var PlayerYpos = 200;
var NonCoolTime = false;
var EnemyKillCount=0;

function ufoUpdate(){
	if(inputSystem.isKeyDown(37))
	{
		PlayerXpos-=10;
		if(PlayerXpos<=5)
		{
			PlayerXpos=5
		}
	}
	if(inputSystem.isKeyDown(39))
	{	
		PlayerXpos+=10;
		if(PlayerXpos>=500-UFO.width)
		{
			PlayerXpos=500-UFO.width;
		}
	}

	if(inputSystem.isKeyDown(38))
	{
		PlayerYpos-=10;
		if(PlayerYpos<=5)
		{
			PlayerYpos=5;
		}
	}

	if(inputSystem.isKeyDown(40))
	{
		PlayerYpos+=10;
		if(PlayerYpos==300)
		{
			PlayerYpos-=10;
		}
	}
	if(inputSystem.isKeyDown(32))
	{
		if(NonCoolTime){
			MakePlayerBullet();
			NonCoolTime = false;
		}
	}

}



function MakeEnemyBullet(k)
{
	var Xpos = k.x
	var Ypos = k.y+10
	var Speed = Level+10;	// 보스게임4 적총알 날라오는속도
	var GOX = -100;
	var GOY = PlayerYpos;
	EnemyBulletArr.push({x:Xpos,y:Ypos, ObjSpeed:Speed, GoX : GOX, GoY : GOY, Type:k.Type});
	if(k.Type == 3)
	EnemyBulletArr[EnemyBulletArr.length-1].y +=80;
	EnemyBulletArr[EnemyBulletArr.length-1].x +=20;
}



function MakeEnemyBulletLoop()
{
	for(var i = 0; i < EnemyArr.length; i++)
	{
		if(EnemyArr[i].life>=1)
		{
			MakeEnemyBullet(EnemyArr[i]);
		}
	}
}

function MakeEnemy(){
	EnemyCnt++;
	var Xpos = 500;
	var Ypos = RandomNextInt(300)+40;
	var intType = RandomNextInt(3);
	var intLife = intType+2
	var Speed = Level*0.5+2.5; // 보스게임4 적 날라오는속도
	if(GameMode)
	{
		if(EnemyCnt==10)
		{
			EnemyArr.push({x:Xpos,y:100, ObjSpeed:Speed-1*0.8, Type : 3, life:15, index:0, width:212, height:200, clearcount:0});
			clearInterval(ObjCreateID1)
		}
		else
		{
			EnemyArr.push({x:Xpos,y:Ypos, ObjSpeed:Speed, Type : intType, life:intLife, index:0, width:88, height:55, clearcount:0});
		}
	}
	else
	{
		EnemyArr.push({x:Xpos,y:Ypos, ObjSpeed:Speed, Type : intType, life:intLife, index:0, width:88, height:55, clearcount:0});
		if(EnemyCnt==5) 
		{
			clearInterval(ObjCreateID1)
		}
	}
}

function PlayerBulletCoolTime()
{
	NonCoolTime = true;
}


function MakePlayerBullet(){
	var Xpos = PlayerXpos+UFO.width*0.5;
	var Ypos = PlayerYpos+UFO.height*0.9;
	var Speed = 10
	var GOX = 600;
	soundBullet.play();
	setTimeout(function(){soundBullet.load()},200);
	PlayerBulletArr.push({x:Xpos, y:Ypos, ObjSpeed:Speed, GoX : GOX});
}

function EnemyLoop(){
	for(var i = 0; i<EnemyArr.length; i++){
		EnemyArr[i].x-=EnemyArr[i].ObjSpeed;
		if(EnemyArr[i].life == 0) EnemyArr[i].clearcount+=33;
		if((EnemyArr[i].x  + EnemyArr[i].width) < 0 && EnemyArr[i].x > -400){onGameOver();}
		for(var j=0; j<PlayerBulletArr.length; j++)
		{
			if((PlayerBulletArr[j].x+20>=EnemyArr[i].x)&&((EnemyArr[i].x + EnemyArr[i].width)>=PlayerBulletArr[j].x)&&(PlayerBulletArr[j].y>=EnemyArr[i].y)&&(PlayerBulletArr[j].y<=(EnemyArr[i].y+EnemyArr[i].height)))
			{
				if(EnemyArr[i].life>=2)
				{
					PlayerBulletArr[j].x=1000;
					EnemyArr[i].life--;
				}
				else if(EnemyArr[i].life==1)
				{
					PlayerBulletArr[j].x=1000;
					EnemyArr[i].life--;
					EnemyArr[i].ObjSpeed=0;
				}
			}
		}
		if(GameMode)
		{
			if(EnemyKillCount==10){
				onGameClear();
				EnemyKillCount=0;
			}
		}
		else if(GameMode == 0)
		{
			if(EnemyKillCount==3){
				onGameClear();
				EnemyKillCount=0;
			}
		}

		if(EnemyArr[i].clearcount == 990) 
		{
			EnemyArr[i].x = -500;
			EnemyKillCount++;
		}
	}

}
function EnemyBulletLoop()
{
	for(var i =0 ; i<EnemyBulletArr.length ; i++)
	{
		var w =  EnemyBulletArr[i].GoX - EnemyBulletArr[i].x;
		var h =  EnemyBulletArr[i].GoY - EnemyBulletArr[i].y;
		EnemyBulletArr[i].x += Math.cos(Math.atan2(h,w))*EnemyBulletArr[i].ObjSpeed;
		EnemyBulletArr[i].y += Math.sin(Math.atan2(h,w))*EnemyBulletArr[i].ObjSpeed;
		if(EnemyBulletArr[i].Type == 3) 
		{
			EnemyBulletArr[i].x += Math.cos(Math.atan2(h,w))*EnemyBulletArr[i].ObjSpeed*0.8;
			EnemyBulletArr[i].y += Math.sin(Math.atan2(h,w))*EnemyBulletArr[i].ObjSpeed*0.8;
		}
	}
}
