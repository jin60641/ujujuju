var quiznum=0;
var HardHand=0;
var HandSolved=0;
var handAnswer = 0;
var handnum=0;


function handSolve(){
	for(var i=0;i<=2;i++){
		if(clickX >= 20 + i * 165 && clickX <=20+i*165 + 110 && clickY >=280 && clickY <= 390)
		{
			if(handAnswer == i) 
			{
				if(Level>=5 && HandSolved>=4)
				{
					onGameClear();
				}
				else if(HandSolved == Level-1)
				{
					onGameClear();
				}
				else
				{ 
					HandSolved++; 
					HandQuiz();
				}
			}
			else onGameOver();
		}
	}
	bMouseClicked=0;
}
	

function HandQuiz(){
	HardHand = Math.random();
	quiznum = RandomNextInt(3)
	handnum = RandomNextInt(3)
	switch(quiznum){
	case 0:
		if(handnum ==0) handAnswer = 1;
		else if(handnum ==1) handAnswer = 2;
		else if(handnum ==2) handAnswer = 0;
		break;
	case 1:
		if(handnum ==0) handAnswer = 0;
		else if(handnum ==1) handAnswer = 1;
		else if(handnum ==2) handAnswer = 2;
		break;
	case 2:
		if(handnum ==0) handAnswer = 2;
		else if(handnum ==1) handAnswer = 0;
		else if(handnum ==2) handAnswer = 1;
		break;
	}
}

