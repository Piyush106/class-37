class Game{
    constructor(){

    }
    getState(){
        var gameStateRef=database.ref("gameState");
        gameStateRef.on("value",(data)=>{
           gameState=data.val();
    
        })
    }
     update(state){
         database.ref('/').update({
             gameState:state
         })
     }
     async start(){
         if(gameState===0){
             player=new Player();
             var playerCountRef=await database.ref("playerCount").once("value");
             if(playerCountRef.exists()){
                 playerCount=playerCountRef.val();
                 player.getCount();

             }
             form=new Form();
             form.display();
         
         }
     }
     play(){
         background("lightblue");
         form.hide();
         textSize(30);
         textFont("algerian");
         text('GAME START',120,100);
         Player.getPlayerInfo();
         if(allPlayers!==undefined){
             var pos=130;
             for(var plr in allPlayers){
                 if(plr==="player"+player.index){
                     fill ("red");

                 }
                 else{
                     fill("black");

                 }
                 pos+=30
                 textSize(20);
                 text(allPlayers[plr].name+" : "+allPlayers[plr].distance,120,pos);
             }
         }
     if(keyIsDown(UP_ARROW)&&player.index!==null){
         player.distance+=50;
         player.update();
         
     }    
     }

}