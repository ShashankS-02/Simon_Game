var gamePattern =[];

var buttonColors=["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level=0;

var started=false;

$("body").keypress(function(event){
  if(!started){
    $("h1").text("Level: "+level);
    nextSequence();
    start=true;
  }
});

$(".btn").click(function handler(event){
  var userChosenColor= event.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);}
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over. Press any key to Restart");
    startOver();
  }


}


function startOver(){
  level=0;
  gamepattern= [];
  started = false;
}


function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function () {
$("."+currentColor).removeClass("pressed");
  }, 100);
}


function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level: "+level);
  var rno=Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[rno];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    $("h1").text("Level: "+level);
}


function playSound(randomChosenColor){
  var audio= new Audio("sounds/"+randomChosenColor+".mp3");
  audio.play();
}
