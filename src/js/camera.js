
var UFOXpos=-500;
var UFOYpos=-500; 
var UFODir;



function UFOLoop(){
	var Speed = 20 + Level*10; // 카메라게임 UFO 프레임당 이동속도
	switch(UFODir)
	{
	case 0:	
		UFOYpos += Speed;
		if(UFOYpos >= 500 && UFOYpos <= 900)
		{
			UFOYpos = -5000;
			onGameOver();
		}
		break;
	case 1:
		UFOYpos -= Speed;
		if(UFOYpos <= -200 && UFOYpos >= -500)
		{
			UFOYpos = -5000;
			onGameOver();
		}
		break;
	case 2:
		UFOXpos += Speed;
		if(UFOXpos >= 500 && UFOXpos <= 900)
		{
			UFOXpos = -5000;
			onGameOver();
		}
		break;
	case 3:
		UFOXpos -= Speed;
		if(UFOXpos <= -200 && UFOXpos >= -500)
		{
			UFOXpos = -5000;
			onGameOver();
		}
		break;
	default:break;
	}
}

function MakeUFO(){
	UFODir = RandomNextInt(4);
	
	switch(UFODir)
	{
        case 0:
 		UFOXpos = RandomNextInt(300)+20
		UFOYpos = -200;
		break;
        case 1:
		UFOXpos = RandomNextInt(300)+20
		UFOYpos = 500;
		break;
	case 2:
		UFOXpos = -200;
		UFOYpos = RandomNextInt(200)+20
		break;
	case 3:
		UFOXpos = 500;
		UFOYpos = RandomNextInt(200)+20
		break;
	}
}   
