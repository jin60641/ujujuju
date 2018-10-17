var calckey =0;
var questionindex=0;
var ArrQuestion = new Array();
var a,b;
var Solvedindex = 0;
var fake1, fake2, fake3;

function Question(){
	switch(RandomNextInt(2))
	{
	case 0:this.answer=a+b; 
		this.sign = 1; 
		break;
	case 1:this.answer=a-b; 
		this.sign = 0; 
		break;
	}
	this.a=a;
	this.b=b;
	this.x=RandomNextInt(3) * 155 + 45;
	this.y=265;
	return this;
}

function makeProblem(){
	a = RandomNextInt(Level*Level+10)+(Level-1)*3; // 레벨 당 숫자커짐
	b = RandomNextInt(Level*Level+10)+(Level-1)*3; // 레벨 당 숫자커짐
	if(a<b)
	{ 
		var tmp=a; 
		a=b; 
		b=tmp
	}
	ArrQuestion[questionindex] = new Question();
	questionindex++;
}




function solve(){
	if(bMouseClicked)
	{
		if(clickX >= ArrQuestion[Solvedindex].x && clickX <= ArrQuestion[Solvedindex].x+100 && clickY >= ArrQuestion[Solvedindex].y && clickY <= ArrQuestion[Solvedindex].y+100)
		{
			Solvedindex++;
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
			if(Level>=7)
			{
				if(Solvedindex >= 4)
				{
					onGameClear();
				}
			}
			else if(Solvedindex >= (Level+1) /2) 
			{
				onGameClear();
			}
		}	
		else if(clickX>=45 && clickX <= 145 && clickY >=265 && clickY <= 365)
		{
			onGameOver();
		}
		else if(clickX>=210 && clickX <= 310 && clickY >=265 && clickY <= 365)
		{
			onGameOver();
		}
		else if(clickX>=375 && clickX <= 475 && clickY >=265 && clickY <= 365)
		{
			onGameOver();
		}
	}

}
