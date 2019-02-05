function createEnemyA(rd)
{
    var enemy = new Enemy(firstNode.x,firstNode.y,20,100+rd*40,imgEnemyA,100+round*10,firstNode, 20);
    //objectList.push(enemy);
    enemyList.push(enemy);
}


function createEnemyB(rd)
{
    var enemy = new Enemy(firstNode.x,firstNode.y,20,60+rd*24,imgEnemyB,140+round*14,firstNode, 10);
    //objectList.push(enemy);
    enemyList.push(enemy);
}
function createEnemyC(rd)
{
    var enemy = new Enemy(firstNode.x,firstNode.y,20,200+rd*80,imgEnemyC,60+round*6,firstNode, 40);
    //objectList.push(enemy);
    enemyList.push(enemy);
}

function createBoss(rd)
{
    var enemy = new Enemy(firstNode.x,firstNode.y,30,3000+rd*300,imgBoss,80+round*8,firstNode, round*100);
    //objectList.push(enemy);
    enemyList.push(enemy);
}

function CreationTimer()
{
    this.countdown=10;
    this.countdownCreate=0;
    this.amountRemain=0;
    this.amountA = 18+2*round;
    this.amountB = 36+4*round;
    this.amountC = 9+round;
    this.rate = 1;
    this.update = function(){
        this.countdown-=deltaTime;
        this.countdownCreate-=deltaTime;
        if(this.countdown<=0)
        {
            round++;
            this.amountA = 18+2*round;
            console.log(this.amountA);
            this.amountB = 36+4*round;
            this.amountC = 9+round;
            console.log("New round:" + round);
            if(round % 10 == 0)
            {
                createBoss(round);
                console.log("createBoss:"+ firstNode.x + "|" + firstNode.y);
                this.countdown=12;
            }
            else if (round % 3 == 1)
            {
                this.rate=0.5/(1+0.05*round);
                this.amountRemain = this.amountA;
                this.countdown = this.rate*this.amountA+6;
                this.countdownCreate = 0;
            }
            else if (round % 3 == 2)
            {
                this.rate = 0.4/(1+0.05*round);
                this.amountRemain = this.amountB;
                this.countdown = this.rate*this.amountB+6;
                this.countdownCreate = 0;
            }
            
            else
            {
                this.rate = 0.6/(1+0.05*round);
                this.amountRemain = this.amountC;
                this.countdown = this.rate*this.amountC+6;
                this.countdownCreate = 0;
            }
        }
        if (round%10!=0 && this.countdownCreate<=0 && this.amountRemain>0)
        {
            this.countdownCreate = this.rate;
            this.amountRemain--;
            if (round % 3 == 1)
            {
                createEnemyA(round);console.log(this.amountRemain);
                console.log("createA:"+ firstNode.x + "|" + firstNode.y);
            }
            else if (round % 3 == 2)
            {
                createEnemyB(round);
                console.log("createB:"+ firstNode.x + "|" + firstNode.y);
            }
            
            else
            {
                createEnemyC(round);
                console.log("createC:"+ firstNode.x + "|" + firstNode.y);
            }
        }

    }
}