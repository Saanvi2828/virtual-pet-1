var position,database;
var dog,happyDog,dogSprite;
var foods;

function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
  dogSprite = createSprite(width/2,height/2,20,20);
  dogSprite.addImage("dog",dog);
  dogSprite.scale=0.5;
  var FoodStock = database.ref("stock");
    FoodStock.on("value",readStock);
}


function draw() {  
background(46, 139, 87)
  
  //add styles here
  fill("yellow");
  text("Note:press UP_ARROW key to feed dog",width/2,50);
  text("food remaining: " + foods,width/2,475)
  
  if (keyWentDown(UP_ARROW)&& foods>0){
    dogSprite.addImage(happyDog)
    writeStock(foods);
    //dogSprite.addImage(happyDog)
  }
  drawSprites();
}

function writeStock(x){
    database.ref('/').update({
    stock : x-1})
}

function showError(){
   console.log("error");
}

function readStock(data){
   foods=data.val()
}


