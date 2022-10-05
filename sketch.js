 
 var pikachu;
 var pikachuImg;
 var mar,marImg;
 var invisibleSea;
 var deadpikachu,deadpikachuImg;
 var lixoGroup,lixo1,lixo2,lixo3;

 var PLAY = 1;
 var END = 0;

 
 var gameState = PLAY;
 
 var gameover,gameoverImg;

 





function preload(){
    pikachuImg = loadImage("pikachu.png");
    lixo1 = loadImage("lixo1.png");
    lixo2 = loadImage("lixo1.png");
    lixo3 = loadImage("lixo1.png");
    
    marImg = loadAnimation("sea.jpg","sea2.jpg");
    gameoverImg = loadImage("gameover.png"); 
    deadpikachuImg = loadImage("deadpikachu.png")

}

function setup() {
 createCanvas(600,400); 
 
 pikachu = createSprite(150,260);
 pikachu.addImage(pikachuImg);
 pikachu.addAnimation(deadpikachuImg);
 pikachu.scale = 0.2

 mar = createSprite(200,200,400,20);
 mar.addAnimation("sea",marImg);
 mar.x = mar.width /2;
 
 invisibleSea = createSprite(190,280,400,10);
 invisibleSea.visible = true;
 
 gameover = createSprite(300,200);
 gameover.addImage(gameoverImg);
 gameover.scale = 0.5;

 lixoGroup = createGroup();

 pikachu.setCollider("rectangle",0,0,150,300);
 pikachu.debug = false

 ondas = 0;
}

function draw() {
background(180);

 text("ondas: " + ondas,500,50,);
 if (gameState === PLAY) {
    gameover.visible = false;
    
    ondas = ondas + Math.round(getFrameRate()/60);
   
   
    if (mar.x < 0){
        mar.x = ground.width/2;
      }

      if(keyDown("space")) {
        pikachu.velocityY = -12;
        
    }
 
    pikachu.velocityY = pikachu.velocityY + 0.8;
 
    spawnObstacles();
 
    if(lixoGroup.isTouching(pikachu)){

        
        gameState = END;
        
      
    }



} 
else if (gameState === END) {
    gameover.visible = true;
    
   
   //mudar a animação do trex
    pikachu.changeAnimation("collided", deadpikachuImg);
  
   
   
    mar.velocityX = 0;
    pikachu.velocityY = 0
    
   
    //definir tempo de vida aos objetos do jogo para que nunca sejam destruídos
  lixoGroup.setLifetimeEach(-1);
  
   
   lixoGroup.setVelocityXEach(0);
      
 }

 pikachu.collide(invisibleSea);









 drawSprites(); 
}


function spawnObstacles(){
    if (frameCount % 60 === 0){
      var lixo = createSprite(600,260,10,40);
      lixo.velocityX = -6;
      
       //gerar obstáculos aleatórios
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: lixo.addImage(lixo1);
                 break;
         case 2: lixo.addImage(lixo2);
                 break;
         case 3: lixo.addImage(lixo3);
                 break;
         default: break;
       }
      
       //atribua dimensão e tempo de vida aos obstáculos           
       lixo.scale = 0.1;
       lixo.lifetime = 300;
      
      //adicione cada obstáculo ao grupo
       lixoGroup.add(lixo);
    }
   }