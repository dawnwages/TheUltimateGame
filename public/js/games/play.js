$(document).ready(function () {
    function runModal() {
        $("#game-modal").modal("toggle");
    }

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

    runModal();
});

