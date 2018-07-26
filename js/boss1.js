
var coalcatched=0;
var rocketcoal=0;

var coal=0;
var coalX=95;
var coalY=300;
var clickcount=0;


function coalcount(){
if(clickX >= 35 && clickX <= 200 && clickY >= 100 && clickY <= 240)
{
	clickcount++;
	soundCoal.play()
	setTimeout(function(){soundCoal.load()},300)
	if(clickcount>=3) {clickcount=0; coal = 1;}
}
else if(clickX>=coalX+5 && clickX<=coalX+35 && clickY >= coalY && clickY<= coalY+35)
{
	coalcatched=1;
}

}