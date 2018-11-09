// GLOBAL VARIABLES
var topics = ["Frozen","Avengers","Twilight","Inception","Black Panther","Spider Man"];
var previousMovie;
var previousCount = 10;
var favourites = [];

// funtion to render the buttons.
function renderButton(){
    $("#button-list").empty();
    for(var i=0;i<topics.length;i++){
        var newBtn = $("<button>");
        newBtn.attr("data-name",topics[i]);
        newBtn.text(topics[i]);
        newBtn.addClass("movie btn-info");
        $("#button-list").append(newBtn);
    }
    $("#movie-input").val('');
}

// add movie button click event function.
$("#add-movie").on("click",function(event){
    event.preventDefault();
    $("#gif-div").text("");
    var value = $("#movie-input").val();

    // convert an topics arrray to upperCase to compare with the new value.
    // checks if the movie button is already present in the list.
    var upperTopics = String.prototype.toUpperCase.apply(topics).split(",");
    if(upperTopics.indexOf(value.toUpperCase())<0){
        topics.push(value);
         renderButton();
    }
    else {
        var newMsg = $("<div>");
        newMsg.text("Select a Movie that is not in the list!!");
        newMsg.attr("id","msg");
        newMsg.css("color", "red");
        newMsg.css("padding","10px");
        $("#gif-div").append(newMsg);
    }
});

// Button click event to show the favourites.
$("#show-fav").on("click",function(event){
    favourites = JSON.parse(localStorage.getItem("fav"));
    event.preventDefault();
    showFavourite();
});

// function to display the GIF images.
function displayGIF(){
    var movieName = $(this).attr("data-name");
    console.log(previousMovie);
    if(previousMovie == movieName){
        previousCount +=10;
    } else if(previousMovie != movieName){
        previousCount = 10;
    }
    console.log("count:",previousCount);
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${movieName}&api_key=A2Hw4RAXUAp9JUnpyZh9PqNapjox1Tj6&limit=${previousCount}`;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var result = response.data;
        $("#gif-div").empty();
        for(i=0;i<result.length;i++){

            // get the value, store the value and create a div to append.
            var stillurl = result[i].images.fixed_height_still.url;
            var animateurl = result[i].images.fixed_height.url;
            var rating = result[i].rating.toUpperCase();
            var picId = result[i].id;
            console.log(picId);
            var newDiv = $("<div>");
            newDiv.attr("id","gif-rating-div");
            newDiv.addClass("text-center");

            // create the image tag and append newDiv.
            var newImage = $("<img>");
            newImage.addClass("gif");
            newImage.attr("alt","MyImage");
            newImage.attr("status","still");
            newImage.attr("src",stillurl);
            newImage.attr("still-url",stillurl);
            newImage.attr("animate-url",animateurl);
            newDiv.append(newImage);

            // create the rating <p> tag and append to newDiv.
            var newP = $("<p>Rating: "+rating+"</p>");
            newP.addClass("text-center");
            newP.attr("id","rating");
            newDiv.append(newP);

            // create the <button> and <a> tag an append to newDiv.
            var downButton = $("<button>");
            downButton.text("Download");
            downButton.addClass("btn btn-primary btn-sm downBtn");
            downButton.attr("style","margin-bottom:10px;border-radius:30px;");
            var newIcon = $("<i>");
            newIcon.addClass("fa fa-download");  
            downButton.prepend(newIcon);
            
            // create anchor tag  and append with newDiv.
            var newAnchor = $("<a>");
            newAnchor.attr("href",stillurl);
            newAnchor.attr("download","file.jpg");
            newAnchor.attr("target","_blank");
            newAnchor.attr("id","anchor-image")
            newAnchor.append(downButton);
            newDiv.append(newAnchor);

            // create button tag and the star icon
            var favButton = $("<button>");
            favButton.text("Favourite");
            favButton.addClass("btn btn-info btn-sm favouriteButton");
            favButton.attr("style","margin-left:10px; margin-bottom:10px;border-radius:30px;");
            favButton.attr("movie-name",picId);
            // var newSpan = $("<span>");
            // newSpan.addClass("glyphicon glyphicon-star");
            // newButton2.append(newSpan);
            newDiv.append(favButton);
            $("#gif-div").append(newDiv);
        }
    });
    previousMovie = movieName;
    console.log(previousMovie);
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
function showFavourite(){
    $("#gif-div").empty();
    for(var i=0;i<favourites.length;i++){
        var favqueryURL = `https://api.giphy.com/v1/gifs/${favourites[i]}?api_key=A2Hw4RAXUAp9JUnpyZh9PqNapjox1Tj6`;
    console.log("favqueryURL: "+favqueryURL);
    $.ajax({
        url: favqueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var favresult = response.data;
        var stillurl = favresult.images.fixed_height_still.url;
        var animateurl = favresult.images.fixed_height.url;
        var rating = favresult.rating.toUpperCase();
        var picId = favresult.id;
        var newDiv = $("<div>");
        newDiv.attr("id","gif-rating-div");
        newDiv.addClass("text-center");

        // create the image tag and append newDiv.
        var newImage = $("<img>");
        newImage.addClass("gif");
        newImage.attr("alt","MyImage");
        newImage.attr("status","still");
        newImage.attr("src",stillurl);
        newImage.attr("still-url",stillurl);
        newImage.attr("animate-url",animateurl);
        newDiv.append(newImage);

        // create the rating <p> tag and append to newDiv.
        var newP = $("<p>Rating: "+rating+"</p>");
        newP.addClass("text-center");
        newP.attr("id","rating");
        newDiv.append(newP);

        // create the <button> and <a> tag an append to newDiv.
        var downButton = $("<button>");
        downButton.text("Download");
        downButton.addClass("btn btn-primary btn-sm downBtn");
        downButton.attr("style","margin-bottom:10px;border-radius:30px;");
        var newIcon = $("<i>");
        newIcon.addClass("fa fa-download");  
        downButton.prepend(newIcon);

        // create anchor tag  and append with newDiv.
        var newAnchor = $("<a>");
        newAnchor.attr("href",stillurl);
        newAnchor.attr("download","file.jpg");
        newAnchor.attr("target","_blank");
        newAnchor.attr("id","anchor-image")
        newAnchor.append(downButton);
        newDiv.append(newAnchor);

        // create button tag and the star icon
        var remButton = $("<button>");
        remButton.text("Remove");
        remButton.addClass("btn btn-info btn-sm removeFavButton");
        remButton.attr("style","margin-left:10px; margin-bottom:10px;border-radius:30px;");
        remButton.attr("movie-name",picId);
        // var newSpan = $("<span>");
        // newSpan.addClass("glyphicon glyphicon-star");
        // newButton2.append(newSpan);
        newDiv.append(remButton);
        $("#gif-div").append(newDiv);
    });
    }
}

function addFavourite(){
    var favId = $(this).attr("movie-name");
    //console.log("favourite ID: ",favId);
    favourites.push(favId);
    localStorage.setItem("fav",JSON.stringify(favourites));
}

function removeFavourite(){
    var remId = $(this).attr("movie-name");
    var remIndex = favourites.indexOf(remId);
    favourites.splice(remIndex,1);
    showFavourite();
    localStorage.setItem("fav",JSON.stringify(favourites));
    console.log("after splice: "+favourites);
}

// gif image click event.
$(document).on("click", ".gif", toggleGIF);

// movie button click event.
$(document).on("click", ".movie", displayGIF);

// movie favourite button click event.
$(document).on("click", ".favouriteButton", addFavourite);

// movie favourite remove button.
$(document).on("click", ".removeFavButton", removeFavourite);

// call the renderButton function.
renderButton();