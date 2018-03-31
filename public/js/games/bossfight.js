$(document).ready(function () {
  var userId = location.search.split("=") || [0, 1];
  userId = userId[1];
  $(".nav-links").each(function () {
    if (userId) {
      $(this).attr("href", $(this).attr("href") + "?ch=" + userId);
    }
    else {
      $(this).attr("href", $(this).attr("href") + "?ch=1");
    }
  });

  function runModal() {
    $("#modal-title").text("Game 4: Ultimate Boss Fight");
    $("#modal-text").text("It's your final confrontation with the evil wizard, but it's very likely not everyone will walk away from the encounter. Use your potions and special skill wisely, and you'll come out ahead!");
    $("#game-modal").modal("toggle");
  }
  var user = {};
  function getUserStats() {
    if (userId) {
      $.get("/api/character/" + userId)
        .then(function (response) {
          console.log(response[0]);
          user = {
            char_name: response[0].char_name,
            hp: response[0].hp,
            attack: response[0].attack,
            coins: response[0].coins,
            sprite: `../images/${response[0].sprite}.png`
          }
          renderImage();
          renderHP();
          renderPotions();
        });
    } else {
      user = {
        char_name: "Our Hero",
        hp: 100,
        attack: 20,
        coins: 10,
        sprite: "https://i.redd.it/ob52245zficy.gif"
      }
      renderImage();
      renderHP();
      renderPotions();
    }
  }

  //modifiable elements on page
  var attackBtn = $("#attack");
  var potionBtn = $("#potion");
  var specialBtn = $("#special");
  var bossHP = $("#boss-hp");
  var userHP = $("#user-hp");
  var bossImg = $("#boss-img");
  var userImg = $("#user-img");
  var userPotions = $("#user-potions");
  var battleResults = $("#battle-results");
  var userName = $("#char-name");
  // var themeMusic = new Audio("assets/audio/theme.mp3");
  // var userAttackSound = new Audio("assets/audio/userAttack.mp3");
  // var bossAttackSound = new Audio("assets/audio/bossAttack.mp3");
  // var gameOverMusic = new Audio("assets/audio/gameOverMusic.mp3");
  var gameTurn = 0; // if 0, it's user's turn. if 1, it's boss's turn. Might not need this in final version

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
    userName.text(user.char_name);
  };

  function winGame() {
    alert("You win!")
  };

  function loseGame() {
    alert("You lose! :( )")
  };

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
    //do something depending on user's character choice

  })

  //run immediately
  getUserStats();
  runModal();

});