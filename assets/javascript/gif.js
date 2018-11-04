// GLOBAL VARIABLES
var movies = ["Frozen","Avengers","Twilight","Inception","Black Panther","Spider Man"];

// funtion to render the buttons.
function renderButton(){
    $("#button-list").empty();
    for(i=0;i<movies.length;i++){
        var newBtn = $("<button>");
        newBtn.attr("data-name",movies[i]);
        newBtn.text(movies[i]);
        newBtn.addClass("movie btn-info");
        $("#button-list").append(newBtn);
    }
}

// add movie button click even function.
$("#add-movie").on("click",function(event){
    event.preventDefault();
    var value = $("#movie-input").val();
    movies.push(value);
    renderButton();
});

// function to display the GIF images.
function displayGIF(){
    var movieName = $(this).attr("data-name");
    var queryURL = `http://api.giphy.com/v1/gifs/search?q=${movieName}&api_key=A2Hw4RAXUAp9JUnpyZh9PqNapjox1Tj6&limit=10`;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var result = response.data;
        $("#gif-div").empty();
        for(i=0;i<result.length;i++){
            var stillurl = result[i].images.fixed_height_still.url;
            var animateurl = result[i].images.fixed_height.url;
            var rating = result[i].rating;
            var newDiv = $("<div>");
            var newP = $("<p>Rating: "+rating+"</p>");
            newDiv.append(newP);
            var newImage = $("<img>");
            newImage.addClass("gif");
            newImage.attr("alt","MyImage")
            newImage.attr("status","still");
            newImage.attr("src",stillurl);
            newImage.attr("still-url",stillurl);
            newImage.attr("animate-url",animateurl);
            newDiv.append(newImage);
            $("#gif-div").append(newDiv);
        }
    });
}

// funtion to toggle the GIF images.
function toggleGIF(){
    var imageStatus = $(this).attr("status");
    if(imageStatus == "still"){
        $(this).attr("src",$(this).attr("animate-url"));
        $(this).attr("status","animate");
    }
    if (imageStatus == "animate"){
       $(this).attr("src",$(this).attr("still-url"));
    $(this).attr("status","still");
    }
}

// gif image click event.
$(document).on("click", ".gif", toggleGIF);

// movie button click event.
$(document).on("click", ".movie", displayGIF);


// call the renderButton function.
renderButton();