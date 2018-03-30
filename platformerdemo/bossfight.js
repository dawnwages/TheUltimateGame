$(document).ready(function () {
  //modifiable elements on page
  var attackBtn = $("#attack");
  var potionBtn = $("#potion");
  var specialBtn = $("#special");
  var bossHP = $("#boss-hp");
  var userHP = $("#user-hp");
  var bossImg = $("#boss-img");
  var userImg = $("#user-img");
  var userPotions = $("#user-potions");
  var userSpecial = $("#user-special");
  var battleResults = $("#battle-results");
  var themeMusic = new Audio("assets/audio/theme.mp3");
  var userAttackSound = new Audio("assets/audio/userAttack.mp3");
  var bossAttackSound = new Audio("assets/audio/bossAttack.mp3");
  var gameOverMusic = new Audio("assets/audio/gameOverMusic.mp3");
  var gameTurn = 0; // if 0, it's user's turn. if 1, it's boss's turn. Might not need this in final version

  var user = {
    char_name: "Dude",
    hp: 100,
    attack: 20,
    coins: 10,
    war: 1,
    sprite: "https://i.redd.it/ob52245zficy.gif"
  }

  var boss = {
    char_name: "Evil Wizard",
    hp: 200,
    attack: 10,
    sprite: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Bowser_-_New_Super_Mario_Bros_2.png/220px-Bowser_-_New_Super_Mario_Bros_2.png"
  }


  // Basic game functions
  function renderHP() {
    bossHP.text(boss.hp);
    userHP.text(user.hp);
  };

  function renderPotions() {
    userPotions.text(user.coins);
  };

  function renderSpecial() {
    userSpecial.text(user.war);
  };

  function changeHP(person, value) {
    person.hp = value;
  };

  function changeAttack(person, value) {
    person.attack = value;
  };

  function bossAttack() {
    user.hp -= boss.attack;
    if (user.hp <= 0) {
      loseGame();
    }
    else {
      renderHP();
    }
  };
  //render sprite images on page
  function renderImage() {
    bossImg.attr("src", boss.sprite).attr("style", "height:100px; width:100px;");
    userImg.attr("src", user.sprite).attr("style", "height:100px; width:100px;");
  };

  function winGame() {
    alert("You win!")
  };

  function loseGame() {
    alert("You lose! :( )")
  };


  // run immediately
  renderImage();
  renderHP();
  renderPotions();
  renderSpecial();

  // Game Logic
  $("#attack").click(function (event) {
    event.preventDefault();
    boss.hp -= user.attack;
    if (boss.hp <= 0) {
      winGame();
    }
    else {
      renderHP();
      setTimeout(bossAttack, 1000);
    }
  });

  $("#potion").click(function (event) {
    event.preventDefault();
    if (user.coins > 0) {
      user.hp += 1;
      user.coins -= 1;
      renderHP();
      renderPotions();
    }
  })

  $("#special").click(function (event) {
    event.preventDefault();
    //### If special, do something(skip the boss's attack for a round, heal, double attack, something like that)
    //* War - double attack
    var warSpl = (user['attack'] * 2);
    var warSplAttc = bossAttack.warSpl;
    boss.hp -= (user.attack * 2);
    if (boss.hp <= 0) {
    winGame();
    }
    else {
    renderHP();
    setTimeout(bossAttack, 1000);
  }

      //* Wiz - adding "x" potion
      //* Thf_ takes "x" points from boss
    })
});




/* 
 Pseudo code

#1 - Grab character data from API, save as object (possibly a constructor????)
#2 - Display current HP, image on the screen (along with boss image)
#3 - When the user clicks the first button, it initiates the game loop
    ## So long as no one is dead, the game starts
    ## User's action goes first
       ### If attack, update boss's HP with the lower value
       ### If potion, increase user's HP by a certain amount, and decrease total number of available potions (we'll need to figure this out)

       ### If special, do something (skip the boss's attack for a round, heal, double attack, something like that)
        * War-double attack
        * Wiz- adding "x" potion
        * Thf_ takes "x" points from boss


    ## If boss still isn't dead, boss attacks
				### If user dies, present option to restart the game
        ### If boss dies, move user onto "end credits" page
#4 - If everyone's still alive after that round, go back to #3
*/