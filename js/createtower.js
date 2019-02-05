function createTowerA(x,y)
{
    var tower = new Tower(x,y,180,0.2,800,50,imgBullet01,imgTowerA,soundBullet01);
    towerList.push(tower);
    return tower;
}
function createTowerB(x,y)
{
    var tower = new Tower(x,y,240,0.1,1000,20,imgBullet02,imgTowerB,soundBullet02);
    towerList.push(tower);
    return tower;
}
function createTowerC(x,y)
{
    var tower = new Tower(x,y,150,0.4,600,120,imgBullet03,imgTowerC,soundBullet03);
    towerList.push(tower);
    return tower;
}



function TowerLot(x,y)
{
    this.x = x;
    this.y = y;
    this.tower = null;
}

var towerLotList = new Array();

var  towerLotPos 
= [
    [90,90],
    [90,150],
    [90,210],
    [90,270],
    [90,330],
    [90,390],
    [90,450],
    [90,510],
    [90,570],
    [90,630],//2
    [150,90],
    [150,150],
    [150,210],
    [150,630],//3
    [210,210],
    [210,330],
    [210,390],
    [210,450],
    [210,510],
    [210,630],//4
    [270,90],
    [270,210],
    [270,330],
    [270,390],
    [270,450],
    [270,510],
    [270,630],//5
    [330,90],
    [330,330],
    [330,390],
    [330,630],//6
    [390,90],
    [390,150],
    [390,210],
    [390,270],
    [390,330],
    [390,390],
    [390,510],
    [390,570],
    [390,630],//7
    [450,90],
    [450,150],
    [450,510],
    [450,570],//8
    [510,90],
    [510,150],
    [510,270],
    [510,330],
    [510,390],
    [510,450],
    [510,510]
];

towerLotPos.forEach(pos => {
    towerLotList.push(new TowerLot(pos[1],pos[0]));
});