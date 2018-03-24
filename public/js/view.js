// When user clicks add-btn
$("#add-btn").on("click", event => {
    event.preventDefault();

    // Make a newBook object
    const newBook = {
        title: $("#title").val().trim(),
        author: $("#author").val().trim(),
        genre: $("#genre").val().trim(),
        pages: $("#pages").val().trim()
    };

    // Send an AJAX POST-request with jQuery
    $.post("/api/new", newBook).then(data => console.log(data));

    // Empty each input box by replacing the value with an empty string
    $("#title").val("");
    $("#author").val("");
    $("#genre").val("");
    $("#pages").val("");
});

// When user hits the search-btn
$("#search-btn").on("click", (event) => {
    event.preventDefault();

    // Save the book they typed into the book-search input
    const bookSearched = $("#book-search").val().trim();

    // Make an AJAX get request to our api, including the user's book in the url
    $.get("/api/" + bookSearched, data => {

        console.log(data);
        // Call our renderBooks function to add our books to the page
        renderBooks(data);
    });

});

// When user hits the author-search-btn
$("#author-search-btn").on("click", function() {

  // Save the author they typed into the author-search input
  var authorSearched = $("#author-search").val().trim();

  // Make an AJAX get request to our api, including the user's author in the url
  $.get("/api/author/" + authorSearched, function(data) {

    // Log the data to the console
    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderBooks(data);

  });

});

// When user hits the genre-search-btn
$("#genre-search-btn").on("click", function() {

  // Save the book they typed into the genre-search input
  var genreSearched = $("#genre-search").val().trim();

  // Make an AJAX get request to our api, including the user's genre in the url
  $.get("/api/genre/" + genreSearched, function(data) {

    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderBooks(data);

  });

});

function renderBooks(data) {
  if (data.length !== 0) {
      $("#stats").empty();
      $("#stats").show();

      data.forEach((book, i) => {
          const div = $("<div>");

          div.append(`<h2>${book.title}</h2>`);
          div.append(`<p>Author: ${book.author}</p>`);
          div.append(`<p>Genre: ${book.genre}</p>`);
          div.append(`<p>Pages: ${book.pages}</p>`);
          div.append(`<button class='delete' data-id="${book.id}">DELETE BOOK</button>`);

          $("#stats").append(div);
      });
  }
}  

$(".delete").click(event => {
      $.post("/api/delete", { id: $(event.target).attr("data-id") })
          // On success, run the following code
          .then(delData => {
              // Log the data we found
              console.log(delData);
              console.log("Deleted Successfully!");
      });

      $(event.target).closest("div").remove();

});


