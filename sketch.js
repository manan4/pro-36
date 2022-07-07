// variables for our coding
var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed ;
var lastFed;

// we create function preload to load our string's images in it.
function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

// here we crate dog sprite 
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

// we have create feed the dog button here
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

//we have create add food for the dog button here
  feeding=createButton("Feeding");
  feeding.position(700,95);
  feeding.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

//write code to read fedtime value from the database 
fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

//write code to display text lastFed time here
if(lastFed >= 12){
  text("Last Feed: " + lastFed  + "PM",200,80);

}
else if(lastFed ==0){
  text("Last Feed: 12 AM",350,30)
}
else{
  text("Last Feed: " + lastFed + "PM",200,80)
}
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

//write code here to update food stock and last fed time
foodS--;
database.ref('/').update({
  Food:foodS

})

fill("white");
textSize(20);

if(lastFed>=12){
  //show time in pm format when lastFed is greater than 12
  text("Last Feed: " + lastFed  + "PM",200,80)
  }else if(lastFed==0){
  text("last Feed : 12 AM",350,30);
  }else{
  //show time in AM format when lastFed is less than 12
  text("Last Feed: " + lastFed + "AM",200,80)
  }

var food_stock_val = foodObj.getFoodStock();
if(food_stock_val <= 0){
foodObj.updateFoodStock(food_stock_val *0);
}else{
foodObj.updateFoodStock(food_stock_val -1);
}

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}
