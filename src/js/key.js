
var index2=0;
var quiz = new Array();
for(var i=48; i<=57; i++)
{
	quiz.push({keycode:i,key:String.fromCharCode(i)});
}
for(var i=65; i<=90; i++)
{
	quiz.push({keycode:i,key:String.fromCharCode(i)});
}
var arrKeys = new Array();


function makeKeyQuiz(){
	var a = RandomNextInt(36)
	while(1)
	{
		if(index2%2)
		{	
			if(arrKeys[index2-1].keycode == quiz[a].keycode)
			{
				a=RandomNextInt(36); 
			}
			else
			{
				break;
			}
		}
		else
		{
			break;
		}		
	}
	index2++;
	arrKeys.push({keycode:quiz[a].keycode,key:quiz[a].key})
}

function check(){
	if(inputSystem.isKeyDown(arrKeys[index].keycode) && inputSystem.isKeyDown(arrKeys[index+1].keycode)) 
	{
		if(index+2>=arrKeys.length)
		{
			onGameClear(); 
		}
		else 
		{
			index+=2;
		}
	}

}