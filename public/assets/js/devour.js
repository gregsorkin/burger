$(document).ready(function() {
  
  // Connect the Eat Da Burger buttons  
  $(".eatDaBurger").on("click", function(event) {
    event.preventDefault();

    let burger_id = $(this).attr("data-id");
    console.log(burger_id);
    $.ajax({
      method: "PUT",
      url: "/burgers/" + burger_id
    }).then(function(data) {
      // reload page to display devoured burger in proper column
      location.reload();
    });
  });
});
