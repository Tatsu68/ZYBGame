var pathList = new Array();
const nr = 5;
pathList.push 
pathList.push(new PathNode(210,630,nr,null));
pathList.push(new PathNode(210,450,nr,pathList[pathList.length-1]));
pathList.push(new PathNode(450,450,nr,pathList[pathList.length-1]));
pathList.push(new PathNode(450,330,nr,pathList[pathList.length-1]));
pathList.push(new PathNode(570,330,nr,pathList[pathList.length-1]));
pathList.push(new PathNode(570,150,nr,pathList[pathList.length-1]));
pathList.push(new PathNode(270,150,nr,pathList[pathList.length-1]));
pathList.push(new PathNode(270,330,nr,pathList[pathList.length-1]));
pathList.push(new PathNode(150,330,nr,pathList[pathList.length-1]));
pathList.push(new PathNode(150,210,nr,pathList[pathList.length-1]));
pathList.push(new PathNode(-30,210,nr,pathList[pathList.length-1]));
firstNode = pathList[pathList.length-1];

homeNode = pathList[0];