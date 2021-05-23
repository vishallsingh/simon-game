var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

startgame();

function startgame() {
  $(document).keydown(function(evt) {
    var z = $("h1").text();
    //alert(z);
    if (z === "Game Over, Press any key to Restart." || z === "Press A Key to Start") {
      level = 0; //alert(level);
      gamePattern = [];
      userClickedPattern = [];
      nextSequence();
    }
  });
}


function checkAnswer(currentLevel) {
  //  alert("vishal");
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press any key to Restart.");
    startgame();
  }
}

function nextSequence() {
  level++; //console.log(level);
  $("h1").html("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  // console.log(gamePattern);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // console.log(userClickedPattern.length);
  // console.log(level);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
