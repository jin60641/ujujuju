
function InputSystem(){
	this.isKeyPressed=[];
	return this;
}

var inputSystem=new InputSystem();


InputSystem.prototype.isKeyDown=function(keyCode){
	if(this.isKeyPressed[keyCode]==true){
		return true;
	} else {
		return false;
	}
}

function onkeydown(e){
	if(GameState == 51){
		if(e.keyCode == 39)//우
		{
			starindex+=1
	        }
		else if(e.keyCode == 37)//좌	
		{
			starindex-=1	
		}
		else if(e.keyCode == 38)//상
		{
			if(starindex == 36) starindex -=10
			else if(starindex ==37) starindex -=3
			else if(starindex ==23 || starindex == 22)		
			{
				if(starindex == 23)
				starindex -= 14;    
				if(starindex == 22)
				starindex -= 13;
			}
			else if(10<=starindex&& starindex<=23)
				starindex-=12;			
			else if(24<=starindex && starindex<=35)			
				starindex-=13;	
		}	
		else if(e.keyCode == 40)//하
		{
			if(starindex == 10)	
				starindex += 14;
			else if(0<=starindex&& starindex<=9)
			    	starindex+=12;
			else if(10<=starindex && starindex<=23)
				starindex+=13;	
			else if(24<=starindex && starindex <=29)
				starindex=36;
			else if(30<=starindex && starindex<=35)
				starindex=37;
		}
		else if(e.keyCode == 13)
		{
			if(starindex >= 0 && starindex<=35)
			{
				if(InputRank.length==3)
				{
					InputRank.pop();
				}
				InputRank.push(quiz[starindex].key);
				if(quiz[starindex].key >= '0' && quiz[starindex].key <= '8')
				{
					InputRank.pop();
					InputRank.push(quiz[starindex+1].key);
				} 
				else if(quiz[starindex].key == '9')
				{
					InputRank.pop();
					InputRank.push('0');
				}
			}
			else if(starindex==36)
			{
				InputRank.pop();
			}
			else if(starindex==37)
			{
				if(InputRank.length==3)
				{
					sendData();
					Stage=1;
					GameState=0;
					starindex=0;
					InputRank.pop()
					InputRank.pop()
					InputRank.pop()
				}
			}
		}
		if(starindex<0) starindex = 0;
		if(starindex>37) starindex=37;
	}
	
	if(GameState == 32){
		if(e.keyCode == 80)
		{
			if(paused){
				//MakeChangeID = setInterval(Render,1000/30)
				paused=0;
			}
			else{
				//clearInterval(MakeChangeID); 
				paused=1;
			}
		}
	}
	if(GameState == 1)
	{
		if(e.keyCode ==  32)
		{
			if(isKey){
				isKey=0;
				if(gauge<=14) 
				{
					gauge += 3/(Level/2+1.5); // 로켓발사게임 스페이스바 누를 때 게이지 차오르는속도
				}
			
				if(yetcleared == 0)
				{
					if(gauge >= 14)
					{
						soundRocket.play();
						yetcleared=1;	
						setTimeout(RocketCleared,1000);
					}
				}
			}
		}
	}
	if(GameState == 4){
		if(e.keyCode>=37 && e.keyCode<=40)
		{
			switch(e.keyCode){
			case 37: if(isKey == 40) 
				{	
					isKey = e.keyCode;
					wheelx +=(40/(Level+2))+10; // 바퀴게임 키입력당 움직이는 량
				}
				break;
			case 38:if(isKey == 37) 
				{
					isKey = e.keyCode;
					wheelx +=(40/(Level+2))+10; // 바퀴게임 키입력당 움직이는 량
				}
				break;
			case 39:if(isKey == 38)
				{
					isKey = e.keyCode;
					wheelx +=(40/(Level+2))+10; // 바퀴게임 키입력당 움직이는 량
				}
				break;
			case 40:if(isKey == 39)
				{
					isKey = e.keyCode;
					wheelx +=(40/(Level+2))+10; // 바퀴게임 키입력당 움직이는 량
				}
				break;
			}
		}
		if(wheelx >= 400)
		{
			wheelx=0;
			onGameClear();
		}
	}

	if(GameState == 5)
	{
		if((e.keyCode != arrKeys[index].keycode) && (e.keyCode != arrKeys[index+1].keycode))
		{
			onGameOver(); 
		}
		inputSystem.isKeyPressed[e.keyCode]=true;
		check()
	}

	if(GameState == 6)
	{
		inputSystem.isKeyPressed[e.keyCode]=true;
	}
	else if(GameState == 8)
	{
		if(e.keyCode==32)
		{	
			soundCamera.play()
			if((UFOXpos>-200)&&(UFOXpos<500)&&(UFOYpos>-200)&&(UFOXpos<500)) 
				onGameClear();
			else
				onGameOver();
		}
	}
	if(GameState == 20)
	{
		if(e.keyCode == 32)
		{
			for(var i=0; i<arrMeteos.length; i++)
			{
				if(meteodie(arrMeteos[i].x,arrMeteos[i].y))
				{
					if(arrMeteos[i].life)
					{
						soundMeteo.play()
						setTimeout(function(){soundMeteo.load()},500)
						arrMeteos[i].life=0; 
						arrMeteos[i].crashed=0; 
						meteoKilled++;
					}
				}
			}
			
		}
		inputSystem.isKeyPressed[e.keyCode]=true;
	}
	if(GameState == 21)
	{
		if(e.keyCode>=37 && e.keyCode<=40)
		{
			switch(e.keyCode){
			case 37: if(isKey == 37)
				{ 
					arrInputs[InputIndex].life = 0; 
					InputIndex++; 
					if(InputIndex+1 > arrInputs.length)
					{
						onGameClear();
					} 
					else 
					{
						isKey=arrInputs[InputIndex].key;
					}
				}
				else 
				{
					onGameOver();
				}
				break;
			case 38: if(isKey == 38)
				{ 
					arrInputs[InputIndex].life = 0; 
					InputIndex++; 
					if(InputIndex+1 > arrInputs.length)
					{
						onGameClear();
					} 
					else 
					{
						isKey=arrInputs[InputIndex].key;
					}
				}
				else 
				{
					onGameOver();
				}
				break;
			case 39: if(isKey == 39)
				{ 
					arrInputs[InputIndex].life = 0; 
					InputIndex++; 
					if(InputIndex+1 > arrInputs.length)
					{
						onGameClear();
					} 
					else 
					{
						isKey=arrInputs[InputIndex].key;
					}
				}
				else 
				{
					onGameOver();
				}
				break;
			case 40: if(isKey == 40)
				{ 
					arrInputs[InputIndex].life = 0; 
					InputIndex++; 
					if(InputIndex+1 > arrInputs.length)
					{
						onGameClear();
					} 
					else 
					{
						isKey=arrInputs[InputIndex].key;
					}
				}
				else
				{
					onGameOver();
				}
				break;
			}
		}
	}	
	if(GameState == 22)
	{
		inputSystem.isKeyPressed[e.keyCode]=true;
	}
}





function onkeyup(e){
	inputSystem.isKeyPressed[e.keyCode]=false;
	if(GameState == 1)
	{
		isKey = 1;
	}
}
