var block = document.getElementById("block");
var menu = document.getElementById("menu");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var score = document.getElementById("score");
var finalScore = document.getElementById("final-score");
var game = false;
var counter = 0;
var index = 0;

// randomizine the place of the hole
hole.addEventListener("animationiteration", () => {
  let random = Math.random() * 300;
  hole.style.top = -250 - random + "px";
  counter++;
  score.innerText = counter;
});

const fail = () => {
  finalScore.innerText = counter;
  game = false;
  menu.style.display = "flex";
};

setInterval(() => {
  if (game == true) {
    // gravity effect
    var characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );
    character.style.top = characterTop + 3 + "px";

    //game over effect
    var blockLeft = parseInt(
      window.getComputedStyle(block).getPropertyValue("left")
    );
    var holeTop = parseInt(
      window.getComputedStyle(hole).getPropertyValue("top")
    );

    if (
      characterTop > -200 ||
      (blockLeft < 80 &&
        blockLeft > 40 &&
        !(characterTop < holeTop && characterTop > holeTop - 170))
    ) {
      fail();
    }
  }
}, 10);

// jump effect
const jump = () => {
  var jumpCount = 0;
  let jumpInterval = setInterval(() => {
    var characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );
    if (-characterTop < 750) {
      character.style.top = characterTop - 7 + "px";
    }
    jumpCount++;
    if (jumpCount == 30) clearInterval(jumpInterval);
  }, 10);
};
startGame = () => {
  game = true;
  menu.style.display = "none";
  counter = 0;
  character.style.top = -620 + "px";
  block.style.animation = "none";
  block.offsetHeight; /* trigger reflow */
  block.style.animation = null;
  hole.style.animation = "none";
  hole.offsetHeight; /* trigger reflow */
  hole.style.animation = null;
  score.innerText = 0;
};

setInterval(() => {
  if (game == true) {
    const array = [
      "url(/assets/yellowbird-upflap.png)",
      "url(/assets/yellowbird-midflap.png)",
      "url(/assets/yellowbird-downflap.png)",
      "url(/assets/yellowbird-midflap.png)",
    ];
    character.style.backgroundImage = array[index];
    index == 3 ? (index = 0) : index++;
  }
}, 200);
