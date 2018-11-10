// GLOBAL VARIABLES
var topics = ["Frozen","Avengers","Twilight","Inception","Black Panther","Spider Man"];
var previousMovie;
var previousCount = 10;
var favourites = [];
var result;
var resultGiphy;
var resultOMDB;

// Funtion to render the buttons.
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

// Add movie button click event function.
$("#add-movie").on("click",function(event){
    event.preventDefault();
    $("#plot-div").text("");
    $("#gif-div").text("");
    var value = $("#movie-input").val();

    // Blank space validation.
    if (value.trim() == ""){
        $("#plot-div").empty();
        $("#plot-div").append("<p style='color:red;padding:10px;'>Please enter a movie name!!!</p>")
    } else {

        // Avoid duplicate topic Button.
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
            $("#plot-div").empty();
            $("#plot-div").append("<p style='color:red;padding:10px;'>OOOPS!!!</p>")
            $("#gif-div").append(newMsg);
        }
    }
});

// Button click event to show the favourites.
$("#show-fav").on("click",function(event){

    // Get the favourite ID from the localStorage.
    favourites = JSON.parse(localStorage.getItem("fav"));
    event.preventDefault();
    showFavourite();
});

// Function to display the GIF images.
function displayGIF(){
    var movieName = $(this).attr("data-name");

    // Condition to add more gifs if the button is clicked more than once.
    if(previousMovie == movieName){
        previousCount +=10;
    } else if(previousMovie != movieName){
        previousCount = 10;
    }

    // Multiple ajax calls
    var queryURL1 = `http://api.giphy.com/v1/gifs/search?q=${movieName}&api_key=A2Hw4RAXUAp9JUnpyZh9PqNapjox1Tj6&limit=${previousCount}`;
    var queryURL2 = `http://www.omdbapi.com/?t=${movieName}&apikey=trilogy`;
    $.when( $.ajax({ url:queryURL1,method:"GET",dataType:"json"}), $.ajax({url:queryURL2,method:"GET",dataType:"json"})).then(function(response,omdbResponse ) {
        $("#gif-div").empty();
        $("#plot-div").empty();
        resultGiphy = response[0].data;
        resultOMDB = omdbResponse[0];
        var omdbTitle = resultOMDB.Title;
        var omdbPlot = resultOMDB.Plot; 
        var omdbPoster = resultOMDB.Poster;
        var omdbDiv = $("<div>");
        var omdbTitleDiv = $("<div><p><strong>TITLE: <strong><p><p>"+omdbTitle+"</p></div>");
        omdbDiv.append(omdbTitleDiv);
        var omdbImageDiv = $("<img src='"+omdbPoster+"'>");
        omdbDiv.append(omdbImageDiv);
        var omdbPlotDiv = $("<div><p><strong>PLOT: <strong><p><p>"+omdbPlot+"</p></div>");
        omdbDiv.append(omdbPlotDiv);
        $("#plot-div").append(omdbDiv);

        // Displays the gifs
        for(i=0;i<resultGiphy.length;i++){

            // Get the value, store the value and create a div to append.
            var stillurl = resultGiphy[i].images.fixed_height_still.url;
            var animateurl = resultGiphy[i].images.fixed_height.url;
            var rating = resultGiphy[i].rating.toUpperCase();
            var picId = resultGiphy[i].id;
            var newDiv = $("<div>");
            newDiv.attr("id","gif-rating-div");
            newDiv.addClass("text-center");

            // Create the image tag and append newDiv.
            var newImage = $("<img>");
            newImage.addClass("gif");
            newImage.attr("alt","MyImage");
            newImage.attr("status","still");
            newImage.attr("src",stillurl);
            newImage.attr("still-url",stillurl);
            newImage.attr("animate-url",animateurl);
            newDiv.append(newImage);

            // Create the rating <p> tag and append to newDiv.
            var newP = $("<p>Rating: "+rating+"</p>");
            newP.addClass("text-center");
            newP.attr("id","rating");
            newDiv.append(newP);

            // Create the <button> and <i> tag an append to newAnchor.
            var downButton = $("<button>");
            downButton.text("Download");
            downButton.addClass("btn btn-primary btn-sm downBtn");
            downButton.attr("style","margin-bottom:10px;border-radius:30px;");
            var newIcon = $("<i>");
            newIcon.addClass("fa fa-download");  
            downButton.prepend(newIcon);
            
            // Create anchor <a> tag and append with newDiv.
            var newAnchor = $("<a>");
            newAnchor.attr("href",stillurl);
            newAnchor.attr("download","file.jpg");
            newAnchor.attr("target","_blank");
            newAnchor.attr("id","anchor-image")
            newAnchor.append(downButton);
            newDiv.append(newAnchor);

            // Create favourite <button> tag and append with newDiv.
            var favButton = $("<button>");
            favButton.text("Favourite");
            favButton.addClass("btn btn-info btn-sm favouriteButton");
            favButton.attr("style","margin-left:10px; margin-bottom:10px;border-radius:30px;");
            favButton.attr("movie-name",picId);
            newDiv.append(favButton);
            $("#gif-div").append(newDiv);
        }
    });

    // Store the movie to be used to add more gifs.
    previousMovie = movieName;
}

// Funtion to toggle the GIF images.
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

// Function to display the favorites.
function showFavourite(){
    $("#gif-div").empty();
    $("#plot-div").empty();

    // API calls to each element in the favourites array.
    for(var i=0;i<favourites.length;i++){
        var favqueryURL = `http://api.giphy.com/v1/gifs/${favourites[i]}?api_key=A2Hw4RAXUAp9JUnpyZh9PqNapjox1Tj6`;
        $.ajax({
            url: favqueryURL,
            method: "GET"
        }).then(function(response){
            var favresult = response.data;
            var stillurl = favresult.images.fixed_height_still.url;
            var animateurl = favresult.images.fixed_height.url;
            var rating = favresult.rating.toUpperCase();
            var picId = favresult.id;
            var newDiv = $("<div>");
            newDiv.attr("id","gif-rating-div");
            newDiv.addClass("text-center");

            // Create the image tag and append newDiv.
            var newImage = $("<img>");
            newImage.addClass("gif");
            newImage.attr("alt","MyImage");
            newImage.attr("status","still");
            newImage.attr("src",stillurl);
            newImage.attr("still-url",stillurl);
            newImage.attr("animate-url",animateurl);
            newDiv.append(newImage);

            // Create the rating <p> tag and append to newDiv.
            var newP = $("<p>Rating: "+rating+"</p>");
            newP.addClass("text-center");
            newP.attr("id","rating");
            newDiv.append(newP);

            // Create the <button> and <i> tag an append to newAnchor.
            var downButton = $("<button>");
            downButton.text("Download");
            downButton.addClass("btn btn-primary btn-sm downBtn");
            downButton.attr("style","margin-bottom:10px;border-radius:30px;");
            var newIcon = $("<i>");
            newIcon.addClass("fa fa-download");  
            downButton.prepend(newIcon);

            // Create anchor <a>tag  and append with newDiv.
            var newAnchor = $("<a>");
            newAnchor.attr("href",stillurl);
            newAnchor.attr("download","file.jpg");
            newAnchor.attr("target","_blank");
            newAnchor.attr("id","anchor-image")
            newAnchor.append(downButton);
            newDiv.append(newAnchor);

            // Create favourite remove <button> tag .
            var remButton = $("<button>");
            remButton.text("Remove");
            remButton.addClass("btn btn-info btn-sm removeFavButton");
            remButton.attr("style","margin-left:10px; margin-bottom:10px;border-radius:30px;");
            remButton.attr("movie-name",picId);
            newDiv.append(remButton);
            $("#gif-div").append(newDiv);
        });
    }
}

// Function to add the IDs to the favourites array when the favorite button is clicked.
function addFavourite(){
    var favId = $(this).attr("movie-name");

    // Concdition to avoid duplicate values.
    if(favourites.indexOf(favId) == -1){

        // Reflect the changes to the array as well as the localStorage.
        favourites.push(favId);
        localStorage.setItem("fav",JSON.stringify(favourites));
    }
}

// Function to remove the IDs from the favourites array when the remove button is clicked.
function removeFavourite(){
    var remId = $(this).attr("movie-name");
    var remIndex = favourites.indexOf(remId);

    // Remove the ID from the array.
    favourites.splice(remIndex,1);
    showFavourite();

    // Reflect the changes to the localStorage.
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