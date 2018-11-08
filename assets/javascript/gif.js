// GLOBAL VARIABLES
var topics = ["Frozen","Avengers","Twilight","Inception","Black Panther","Spider Man"];
var previousMovie;
var previousCount = 10;

// funtion to render the buttons.
function renderButton(){
    $("#button-list").empty();
    for(i=0;i<topics.length;i++){
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
        //$("#movie-input").val("Select a movie not in the list");
    }
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
    var queryURL = `http://api.giphy.com/v1/gifs/search?q=${movieName}&api_key=A2Hw4RAXUAp9JUnpyZh9PqNapjox1Tj6&limit=${previousCount}`;
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
            console.log(stillurl);
            newImage.attr("animate-url",animateurl);
            newDiv.append(newImage);

            // create the rating <p> tag and append to newDiv.
            var newP = $("<p>Rating: "+rating+"</p>");
            newP.addClass("text-center");
            newP.attr("id","rating");
            newDiv.append(newP);

            // create the <button> and <a> tag an append to newDiv.
            var newButton = $("<button>");
            newButton.text("Download");
            newButton.addClass("btn btn-info");
            newButton.attr("id","dymanicBtn");
            //newButton.css("background-color","blue");
            var newIcon = $("<i>");
            newIcon.addClass("fa fa-download");  
            newButton.prepend(newIcon);
            
            // create anchor tag  and append with newDiv.
            var newAnchor = $("<a>");
            newAnchor.attr("href",stillurl);
            newAnchor.attr("download","file.jpg");
            newAnchor.attr("target","_blank");
            newAnchor.attr("id","anchor-image")
            newAnchor.append(newButton);
            newDiv.append(newAnchor);
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

// gif image click event.
$(document).on("click", ".gif", toggleGIF);

// movie button click event.
$(document).on("click", ".movie", displayGIF);


// call the renderButton function.
renderButton();