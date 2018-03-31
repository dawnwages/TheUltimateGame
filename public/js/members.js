$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    $("#user-id").attr("data", data.id);
    var id = data.id;
    $.get("/api/character_of_user/" + id)
      .then(function (response) {
        if (!response) {
          console.log("No character");
        }
        else {
          console.log(response)
          response.forEach(v => {
            console.log(v.char_name)
            $("#current-characters").append($("<a>")
            .attr("href", "/lvl/" + v.lvl_comp + "?ch=" + v.id).append($("<button>")
              .attr("character_id", v.id)
              .attr("class", "created-characters btn btn-default")
                .text("Continue as " + v.char_name)));
          })
        }
        // If there's an error, log the error
      }).catch(function (err) {
        console.log(err);
      });
  });

  $(".create-char").click(function (event) {
    event.preventDefault();
    var characterSelection = $('input[name=character-selection]:checked');
    $.post("/api/character", {
      char_name: $("#char_name").val().trim(),
      hp: characterSelection.attr('hp'),
      attack: characterSelection.attr('attack'),
      coins: 0,
      lvl_comp: 0,
      sprite: characterSelection.attr('value'),
      UserId: $("#user-id").attr('data')
    }).then(function (data) {
      console.log(data)
      var playerId = data.id;
      $.post("/api/pet", {
        pet_name: $("#pet_name").val().trim(),
        CharacterId: playerId
      }).then(function (data) {
        console.log(data);

        window.location.href = "/play?ch=" + playerId;


      }).catch(function (err) {
        console.log(err)
      })
    }).catch(function (err) {
      console.log(err);
    });
  });
});