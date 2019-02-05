function Enemy(x,y,r,hp,image,speed,next,reward){
    this.x = x;
    this.y = y;
    this.r = r;
    this.hp = hp;
    this.speed = speed;
    this.image = image;
    this.next = next;
    this.dir = 0;
    this.reward = reward;
    //console.log("create Enemy!");
    this.update = function(){
        //console.log("Update enemy!");
        if(this.next!=null){
            posNext = getNextPosition(this.x,this.y,this.next.x,this.next.y,speed);
            this.x = posNext[0]; this.y = posNext[1];
            //console.log(getDistance(this,this.next));
            if (getDistance(this,this.next)<=this.next.r){
                this.next=this.next.next;
                //if(this.next!=null) console.log("switch to next path node."+"("+this.next.x+","+this.next.y+")");
                //else console.log("final node.");
            }
        }

        if(this.hp<=0)
        {
            soundEnemyDeath.play();
            //console.log("Enemy killed!");
            cash+=this.reward;
            score+=this.reward;
            destroyInArray(this, enemyList);
        }
        else if(getDistance(this,homeNode)<=homeNode.r)
        {
            soundEnemyHome.play();
            homeHP-=1;
            //console.log("Enemy reached home! Remaining Home HP:"+ homeHP);
            destroyInArray(this, enemyList);
        }
        //console.log("Enemy pos:(" + this.x + "," + this.y +")");

    }
}


function Tower(x,y,r,bulletRate,bulletSpeed,bulletPower,bulletImage,image,bulletSound){
    this.x=x;
    this.y=y;
    this.r=r;
    this.bulletRate = bulletRate;
    this.bulletSpeed = bulletSpeed;
    this.bulletPower = bulletPower;
    this.bulletImage = bulletImage;
    this.dir = 0;
    this.target = null;
    this.image = image;
    this.bulletSound = bulletSound;
    this.dir = 0;
    this.cd = 0;
    //Play Creation Sound
    this.update = function(){
        this.cd-=deltaTime;
        //Select target (Now depends on min distance)
        nearest = null;
        enemyList.forEach(element => {
            if (getDistance(this, element)<=this.r)
            {
                if(nearest == null)
                {
                    nearest = element;
                }
                else if(getDistance(this, element) < getDistance(this, nearest))
                {
                    nearest = element;
                }
            }
        });
        this.target = nearest;
        //
        if(this.cd<=0 && this.target!=null)
        {
            this.cd = bulletRate;
            bullet = new Bullet(this.x, this.y,this.bulletSpeed,this.bulletPower,this.bulletImage,this.bulletSound,this.target);
            bulletList.push(bullet);
        }
    }

}


function PathNode(x,y,r,next)
{
    this.x = x;
    this.y = y;
    this.r = r;
    this.next = next;
}

function Bullet(x,y,speed,power,image,sound,target){
    this.x=x;
    this.y=y;
    this.speed=speed;
    this.power=power;
    this.target=target;
    this.image=image;
    this.sound=sound;
    this.dir=0;
    sound.play();//Play Init Sound
    this.update = function(){
        if (target==null)
        {
            destroyInArray(this, bulletList);
            return;
        }
        posNext = getNextPosition(this.x,this.y,target.x,target.y,speed);
        this.x = posNext[0]; this.y = posNext[1];
        if(getDistance(this,target)<=target.r)
        {
            target.hp-=power;
            soundEnemyHit.play();//Play Hit Sound
            destroyInArray(this, bulletList);
        }
    }
}

function move(xm,ym,xt,yt,speed){
    xd = xt - xm;
    yd = yt - ym;
    if(xd == 0 && yd == 0)
    {
        return;
    }
    else
    {
        d = Math.sqrt(xd*xd+yd*yd);
        xdn = xd/d;
        ydn = yd/d;
        xm += xdn*speed*deltaTime;
        ym += ydn*speed*deltaTime;
    }
}

function getNextPosition(xm,ym,xt,yt,speed){
    var xd, yd, xdn, ydn, xnew, ynew;
    xd = xt - xm;
    yd = yt - ym;
    xnew = 0, ynew = 0;
    if(xd == 0 && yd == 0)
    {
        return[xm, ym];
    }
    else
    {
        d = Math.sqrt(xd*xd+yd*yd);
        xdn = xd/d;
        ydn = yd/d;
        xnew = xm + xdn*speed*deltaTime;
        ynew = ym + ydn*speed*deltaTime;
    }
    //console.log("Nextpos d:"+d+" xnew:"+xnew+" ynew"+ynew);
    return [xnew, ynew];
}


function getDistance(a,b)
{
    xd = b.x-a.x;
    yd = b.y-a.y;
    return Math.sqrt(xd*xd+yd*yd);
}

function destroyInArray(obj, arr)
{
    var index = arr.indexOf(obj);
    if (index > -1) {
        arr.splice(index, 1);
    }
    delete obj;
}