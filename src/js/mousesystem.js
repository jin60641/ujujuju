


function onMouseMove(e){
	if(GameState == 0)
	{
		MainMouseX=e.x-divleft;
		MainMouseY=e.y-divtop;
	}
	else if(GameState == 3)
	{
		hitterX = e.x-canvasleft-divleft;
		hitterY = e.y-canvastop-divtop;
	}
	else if(GameState == 19)
	{
		if(coalcatched)
		{
			coalX = e.x-canvasleft-divleft-10;
			coalY = e.y-canvastop-divtop-10
		}

	}
}

function onMouseDown(e){
	
	if(GameState == 52){
		clickX = e.x-divleft;
		clickY = e.y-divtop;
	console.log(clickX,clickY)
		switch(helpPage){
		case 0:
		if(clickX>=12 && clickX<=65 && clickY>=445 && clickY<=486)
		{
			GameState=0;
			mainindex=0;
			bMouseClicked=0;
		}
		else if(clickX>=530 && clickX<=585 && clickY>=445 && clickY<=486)
		{
			helpPage++;
			bMouseClicked=0;
		}
		break;
		case 1:
		if(clickX>=12 && clickX<=65 && clickY>=445 && clickY<=486)
		{
			helpPage--;
			bMouseClicked=0;
		}
		else if(clickX>=530 && clickX<=585 && clickY>=445 && clickY<=486)
		{
			helpPage++;
			bMouseClicked=0;
		}
		break;
		case 2:
		if(clickX>=12 && clickX<=65 && clickY>=445 && clickY<=486)
		{
			helpPage--;
			bMouseClicked=0;
		}
		else if(clickX >= 172 && clickX<=430 && clickY>=214 && clickY<=291){
			soundMain.load();
			GameMode=1;
			GameState=33;
			changeindex=20
			bMouseClicked=0;
		}
		break;
		}
	}
	if(GameState == 31){
		clickX = e.x-divleft;
		clickY = e.y-divtop;
		if(clickX>=350 && clickX <=550 && clickY>=380 && clickY<=445)
		{
			gamelifes=3;
			Stage=1;
			Level=1;
			GameTimenow=0;
			tmpState=RandomNextInt(8);
			story1index=0;
			story2index=0;
			story3index=0;
			story4index=0;
			mainindex=0;
			GameState=0;
			RenderLoopID = setInterval(Render,1000/30);
		}
	}
	if(GameState == 30){
		bMouseClicked=2;
	}
	if(GameState==50){
		clickX = e.x-divleft;
		clickY = e.y-divtop;
		if(clickX>=10 && clickX<=60 && clickY>=10 && clickY<=60)
		{
			bMouseClicked=1;
		}
	}
	else if(GameState==2)
	{
		clickX = e.x-canvasleft-divleft;
		clickY = e.y-canvastop-divtop;
		bMouseClicked = 1;
		solve()
	}
	if(GameState==3)
	{
		clickX = e.x-canvasleft-divleft;
		clickY = e.y-canvastop-divtop;
		hitterX = e.x-canvasleft-divleft;
		hitterY = e.y-canvastop-divtop;
		bMouseClicked = 1;
		soundFlyhitter.play();
		setTimeout(function(){soundFlyhitter.load();},450);
	}
	if(GameState == 7)
	{
		clickX = e.x-canvasleft-divleft;
		clickY = e.y-canvastop-divtop;
		bMouseClicked= 1;
		handSolve();
	}
	if(GameState==19)
	{
		clickX = e.x-canvasleft-divleft;
		clickY = e.y-canvastop-divtop;
		coalcount();
		bMouseClicked = 1;
	}
	else if(GameState==0)
	{
		clickX = e.x-divleft;
		clickY = e.y-divtop;
		if(clickX>=550&&clickX<=(550+imgHelp.width) && clickY >= 450 && clickY <= (450+imgHelp.height))
		{
			GameState=52;
		}
		bMouseClicked=1;
	}
}


function onMouseUp(e){

	if((GameState == 30) && (GameMode == 0) && bMouseClicked==2){
		clickX = e.x-divleft;
		clickY = e.y-divtop;
		console.log(clickX,clickY)
		if(clickX>=230&clickX<=370&clickY>=220&&clickY<=260)
		{
			gamelifes=3;
			Stage=1;
			Level=1;
			GameTimenow=0;
			tmpState=RandomNextInt(8);
			story1index=0;
			story2index=0;
			story3index=0;
			story4index=0;
			mainindex=0;
			RenderLoopID = setInterval(Render,1000/30)
			GameState=0;
			soundIngame.load();
			soundMain.play();
		}
		else if(clickX>=230&clickX<=370&clickY>=280&&clickY<=320)
		{
			gamelifes=3;
			Stage=0;
			Level=1;
			GameTimenow=0;
			tmpState=RandomNextInt(8);
			story1index=0;
			story2index=0;
			story3index=0;
			story4index=0;
			onGameClear();
			soundIngame.load();
			soundIngame.play();
			RenderLoopID = setInterval(Render,1000/30)
		}
		else if(clickX>=230&clickX<=370&clickY>=340&&clickY<=380)
		{
			gamelifes=3;
			Level=1;
			GameTimenow=0;
			tmpState=RandomNextInt(8);
			story1index=0;
			story2index=0;
			story3index=0;
			story4index=0;
			mainindex=0;
			GameState=51;
			RenderLoopID = setInterval(Render,1000/30)				
		}
		bMouseClicked=0;
	}
	else if((GameState==30) && GameMode && bMouseClicked==2)
	{
		clickX = e.x-divleft;
		clickY = e.y-divtop;
		if(clickX>=230&clickX<=370&clickY>=255&&clickY<=295)
		{
			gamelifes=3;
			Stage=0;
			Level=1;
			GameTimenow=0;
			tmpState=RandomNextInt(8);
			story1index=0;
			story2index=0;
			story3index=0;
			story4index=0;
			GameState = tmpState;
			onGameClear();
		}
		else if(clickX>=230&clickX<=370&clickY>=315&&clickY<=355)
		{
			gamelifes=3;
			Stage=1;
			Level=1;
			GameTimenow=0;
			tmpState=RandomNextInt(8);
			story1index=0;
			story2index=0;
			story3index=0;
			story4index=0;
			mainindex=0;
			GameState=0;
			RenderLoopID = setInterval(Render,1000/30)	
		}
	}
	else if(GameState==50)
	{
		clickX = e.x-divleft;
		clickY = e.y-divtop;
		if(clickX>=10 && clickX<=56 && clickY>=10 && clickY<=44)
		{
			soundRanking.load();
			soundMain.play();
			GameState=0;
			mainindex=0;
			bMouseClicked=0;
		}	
	}
	else if(GameState==0)
	{
		if(bMouseClicked && mainindex == 23){
			if(MainMouseX >= 238 && MainMouseX <=370 && MainMouseY >= 340 && MainMouseY <= 370)
			{
				soundMain.load();
				GameMode=1;
				GameState=33;
				changeindex=20
			}
			else if(MainMouseX >= 238 && MainMouseX<= 370 && MainMouseY >= 388 && MainMouseY <= 418)
			{
				soundMain.load();
				GameMode=0;
				GameState=33;
				changeindex=20
			}
			else if(MainMouseX >= 275 && MainMouseX <= 327 && MainMouseY>=435 && MainMouseY <= 465)
			{
				soundMain.load();
				soundIngame.load();
				soundRanking.play();
				GameState=50;
				getRank();
			}
		}
	}
	else if(GameState==19)
	{
		bMouseClicked=0;
		if(coalX >= 380-canvasleft && coalX<= 500-canvasleft && coalY >= 115-canvastop && coalY <= 288-canvastop)
		{	
			rocketcoal += (0.5 + 1/Level)
			coal=0;
			if(Math.floor(rocketcoal)>=3) // rocketcoal/3의 값이 3이상이되면 클리어 rocketcoal 은 석탄 하나넣을때마다 1증가
			{
				onGameClear();
			//	setTimeout(onGameClear,1300);
			}
		}
		coalcatched=0;
		coalX=95;
		coalY=300;
	}
	bMouseClicked=0;
}