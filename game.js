var gamePattern=[];
var userClickedPattern=[];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.muted = false;
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

function playSound(name){
    
    var audio = new sound(name);
    //$('#'+randomChosenColour).on('click', ()=>{
        audio.play();
   // })
}

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  $('.btn').on('click',function(){
    var  userChosenbtn = $(this).attr('id')
    
    userClickedPattern.push(userChosenbtn);
    console.log(userClickedPattern);
    var src='sounds/'+userChosenbtn+'.mp3';
    playSound(src);
    
    animatePress(userChosenbtn);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern=[];

    level++;
    $('#level-title').text('Level '+level);
    var randomnumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColors[randomnumber];
    gamePattern.push(randomChosenColour);
    
    console.log(gamePattern);

    $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var src='sounds/'+randomChosenColour+'.mp3';
    playSound(src);
   
 
}

function animatePress(currentColor){
    $('#'+currentColor).on('click',function(){
        $('#'+currentColor).addClass('pressed');
        setTimeout(function(){
            $('#'+currentColor).removeClass('pressed');

        },100)
    });
   
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        
        if(userClickedPattern.length=== gamePattern.length){
            console.log('success');
            setTimeout(function () {
                nextSequence();
              }, 1000);
              
        }
    }
    else{
        playSound('sounds/wrong.mp3');
        $('body').addClass('game-over');
        setInterval(function () {
            $('body').removeClass('game-over');
        },200)
        startOver();
        console.log('fail');
    }

}

function startOver(){
level=0;
gamePattern=[];
started=false;
$('#level-title').text('Game Over Press any key to start again');
}


  










