var ObjectArr = new Array();
var coincount=0;
var WalletX=200;

var coinindex=0;


function WalletUpdate(){
	if(inputSystem.isKeyDown(37)){
		WalletX-=15;
	}

	if(inputSystem.isKeyDown(39)){
		WalletX+=15;
	}
	if(WalletX <=1){WalletX =1;}
	if(WalletX >=400){WalletX = 400;}
}


function ObjLoop()
{
	for(var i =0 ; i<ObjectArr.length ; i++)
	{
		ObjectArr[i].y += ObjectArr[i].ObjSpeed 
		if(ObjectArr[i].y>=400)
		{
			ObjectArr[i].x=1000;
		}
		if((ObjectArr[i].x+22>=WalletX) && (ObjectArr[i].x + 22<=WalletX+99) && (ObjectArr[i].y >=300)&&(ObjectArr[i].y <=340))
		{
			ObjectArr[i].x=1000;
			if(ObjectArr[i].type == 0)
			{
				clearInterval(MakeObjId)
				coincount =0; 
				while(ObjectArr.length !=0)
				{
					ObjectArr.pop();
				}
				onGameOver();
			}
			else{
			coincount++;
			soundCoin.play();
			setTimeout(function(){soundCoin.load();},200)
			}
			if(coincount >= 3)
			{
				clearInterval(MakeObjId)		
				coincount =0; 
				while(ObjectArr.length !=0)
				{
					ObjectArr.pop();
				}
				onGameClear();
			}
		}
	}
}	

function MakeObj()
{
	var Xpos = RandomNextInt(455);
	var Speed = Level*2 + 8;	// 동전먹기게임 낙하물 프레임당 이동속도
	if(objtype)
	{
		ObjectArr.push({x:Xpos,y:-80, ObjSpeed:Speed, type:0});
		objtype=0;
	}
	else
	{
		ObjectArr.push({x:Xpos,y:-80, ObjSpeed:Speed, type:1});
		objtype=1;
	}
}   