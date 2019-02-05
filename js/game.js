const price = 1000;
var round = 0;
var cash, homeHP, score;
var objectList = new Array();
var enemyList = new Array();
var towerList = new Array();
var bulletList = new Array();
var firstNode, homeNode;
var timePrev = 0, timeCurrent = 0, deltaTime;
var date = new Date();
var isGaming = false;
//
var imgEnemyA = new Image();imgEnemyA.src = 'resources/tanglang.png';
var imgEnemyB = new Image();imgEnemyB.src = 'resources/zhanglang.png';
var imgEnemyC = new Image();imgEnemyC.src = 'resources/qianglang.png';
var imgBoss = new Image();imgBoss.src = 'resources/zhangyu.png';
var imgTowerA = new Image();imgTowerA.src = 'resources/wujing.png';
var imgTowerB = new Image();imgTowerB.src = 'resources/zhangjinlai.png';
var imgTowerC = new Image();imgTowerC.src = 'resources/sunxiaochuan.png';
var imgBullet01 = new Image();imgBullet01.src = 'resources/bl01.png';
var imgBullet02 = new Image();imgBullet02.src = 'resources/bl02.png';
var imgBullet03 = new Image();imgBullet03.src = 'resources/bl03.png';
var imgMap = new Image();imgMap.src = 'resources/tdmap.png';

var soundBullet01 = new Howl({src: ['resources/dui.wav'], html5: true});
var soundBullet02 = new Howl({src: ['resources/jing.wav'], html5: true});
var soundBullet03 = new Howl({src: ['resources/xiao.wav'], html5: true});
var soundEnemyHit = new Howl({src: ['resources/bin.wav'], html5: true});
var soundEnemyDeath = new Howl({src: ['resources/aah.wav'], html5: true});
var soundEnemyHome = new Howl({src: ['resources/chiku.wav'], html5: true});
var soundGameOver = new Howl({src: ['resources/bell.wav'], html5: true});
//
var canvas;  
var canvasBuffer;  
var context;  
var contextBuffer;  

var creationTimer;

function updateAll()
{
    //refresh Time
    date = new Date();
    timeCurrent = date.getTime();
    deltaTime = (timeCurrent-timePrev)/1000;
    timePrev = timeCurrent;
    //Check isGaming
    if(!isGaming) {
        drawAll();
        setTimeout(() => {
            updateAll();
        }, 1);
      //console.log("Not in game!");
      return;
    }
    //Update Objects
    creationTimer.update();

    enemyList.forEach(element => {
        element.update();
    });
    towerList.forEach(element => {
        element.update();
    });
    bulletList.forEach(element => {
        element.update();
    });
    //DataDisplay
    roundText.innerHTML = "波数："+round;
    cashText.innerHTML = "批币："+cash;
    hpText.innerHTML = "节肏："+homeHP;
    //Home
    if (homeHP<=0)
    {
        endGame();
    }


    drawAll();
    //console.log("Updated!CD:"+creationTimer.countdown + " deltaTime:"+deltaTime + " timeCurrent:"+timeCurrent);
    setTimeout(() => {
        updateAll();
      }, 1);
}
function drawAll()
{
    context.clearRect(0, 0, canvas.width, canvas.height)  
    contextBuffer.clearRect(0, 0, canvasBuffer.width, canvasBuffer.height);  

    contextBuffer.drawImage(imgMap,0,0);

    towerList.forEach(element => {
        contextBuffer.drawImage(element.image,element.x-(element.image.width)/2,element.y-(element.image.height)/2);
    });
    enemyList.forEach(element => {
        contextBuffer.drawImage(element.image,element.x-(element.image.width)/2,element.y-(element.image.height)/2);
    });
    bulletList.forEach(element => {
        contextBuffer.drawImage(element.image,element.x-(element.image.width)/2,element.y-(element.image.height)/2);
    });


    //draw lot selection
    if (selectedLot!=null && drawSelection == true)
    {
        if(cash>=price)
        {
            contextBuffer.fillStyle = "green";
        }
        else {
            
            contextBuffer.fillStyle = "maroon";
        }
        contextBuffer.beginPath();
        contextBuffer.arc(selectedLot.x,selectedLot.y,20,0,2*Math.PI);
        contextBuffer.fill();
    }

    context.drawImage(canvasBuffer, 0, 0); 
}

function startGame()
{
    objectList = [];
    round = 0;
    cash = 2000;
    homeHP = 5;
    score = 0;
    creationTimer = new CreationTimer();
    isGaming = true;
}

function endGame()
{
    soundGameOver.play();
    objectList = [];
    enemyList = [];
    towerList = [];
    bulletList = [];
    towerLotList.forEach(element => {
        element.tower=null;
    });

    isGaming = false;
    setBtnState(-1);
    scoreText.innerHTML = "分数："+score;
    divStart.style.visibility="visible";
    divEnd.style.visibility="visible";
}

function main()
{
    canvas = document.getElementById("canvas");  
    canvasBuffer = document.createElement("canvas");  
    canvasBuffer.width = canvas.width;  
    canvasBuffer.height = canvas.height;  
    context = canvas.getContext("2d");  
    contextBuffer = canvasBuffer.getContext("2d");  
    context.clearRect(0, 0, canvas.width, canvas.height);
    contextBuffer.clearRect(0, 0, canvasBuffer.width, canvasBuffer.height);

    canvas.onmousedown = function(ev){canvasMouseDown(ev.clientX,ev.clientY)};
    canvas.onmousemove = function(ev){canvasMouseMove(ev.clientX,ev.clientY)};

    timeCurrent = date.getTime();
    timePrev = timeCurrent;
    deltaTime = 0;
    
    updateAll();

}

function canvasMouseMove(x,y)
{
    selectedLot = null;
    drawSelection = false;
    if (btnTowerState>0)
    {
        towerLotList.forEach(pos => {
            if (x>=pos.x-30 && x<pos.x+30 && y>=pos.y-30 && y<pos.y+30)
            {
                selectedLot = pos;
            }
        });
    }
    if (selectedLot!=null)
    {
        if (selectedLot.tower == null)
        {
            //console.log("Mouse at empty tower lot. ("+x +","+y+"),("+selectedLot.x+","+selectedLot.y+")");
            drawSelection = true;
        }
    }
}

function canvasMouseDown(x,y)
{
    if (btnTowerState<=0 || cash<price ||selectedLot == null) return;
    if (selectedLot.tower == null)
    {
        var tower = null;
        if (btnTowerState == 1)
        {
            tower = createTowerA(selectedLot.x, selectedLot.y);
        }
        else if(btnTowerState == 2)
        {
            tower = createTowerB(selectedLot.x, selectedLot.y);
        }
        else
        {
            tower = createTowerC(selectedLot.x, selectedLot.y);
        }
        selectedLot.tower = tower;
        cash-=price;
    }
}