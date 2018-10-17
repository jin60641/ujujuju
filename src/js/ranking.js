
function Star(){
this.x = 0;
this.y = 0;
return this;
}
var starindex=0;
var InputStar= new Array(3);
for(var i = 0; i<=37; i++)
	InputStar[i]=new Star();
InputStar[0].x=142;
for(var i=0;i<=35;i++){
InputStar[i].x=142 + i*33.6
InputStar[i].y=279;
	if(i>=10)
	{
		InputStar[i].y += 49;
		InputStar[i].x = 73 + 33.6 * (i-10);
		if(i==16 || i==17) InputStar[i].x+=2.6	
		if(i==22) InputStar[i].x+=2.1
		if(i==23) InputStar[i].x+=4	
	}
	if(i>=24)
	{
		InputStar[i].y += 49;
		InputStar[i].x = 102.7 + 34.8 * (i-24);
	}
}

InputStar[36].x = 180
InputStar[36].y = 425
InputStar[37].x = 456
InputStar[37].y = 425
var InputRank = new Array();


function sendData()
{	
	xhr = new XMLHttpRequest();
	xhr.open("POST", "/game_rank", false)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.send('name=' + InputRank[0]+InputRank[1]+InputRank[2] + '&stage=' + Stage)
}
  
function getRank()
{
	Rankers = 0;
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function (event) {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			Rankers = JSON.parse(xhr.responseText);
			for(var i = 0; i <= 4; i++ ){	
				if(Rankers[i] == undefined){
					Rankers[i] = {
						name : "AAA",
						stage : 0
					}
				}
				for(var j = 5-Rankers[i].stage.toString().length; j>0; j--){
					Rankers[i].stage = '0' + Rankers[i].stage;
				}
			}
		}
	}
        }
	xhr.open("GET","game_getrank",true);
	xhr.send();
}
