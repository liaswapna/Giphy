# GifTastic
### Overview
---
In this assignment, use the GIPHY API to make a dynamic web page that populates with gifs of your choice. To finish this task, you must call the GIPHY API and use JavaScript and jQuery to change the HTML of your site.

### Requirements
---
The app takes the entered search term topics from a user input box and pushes them into array from which it creates buttons in the HTML. Clicking on a button grabs 10 static, non-animated gif images from the GIPHY API and places them on the page.
* When the user clicks one of the still GIPHY images, the gif should animate.
* If the user clicks the gif again, it should stop playing.
* With every gif is displayed its rating (PG, G, etc.).
### Files
---
* [index.html](https://github.com/liaswapna/Giphy/blob/master/index.html)

* [style.css](https://github.com/liaswapna/Giphy/blob/master/assets/css/style.css)

* [gif.js](https://github.com/liaswapna/Giphy/blob/master/assets/javascript/gif.js)

### Technologies Used
---
* HTML
* CSS Bootstrap
* JavaScript to make the page dynamic
* jQuery for Dom Manipulation
* AJAX for API GET requests

### Code Explanation
---
* A form was implemented to take the value from a user input box and add it into the topics array.
* CSS Bootstrap was used to arrange the page into columns and display the gifs in a gallery format.
* AJAX Call to Giphy's API was created to access the images by topic entered.
    * Code and Syntax for AJAX Call.
    ```javascript
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        //CODE HERE
    });
    ```
* Event listeners on "click" were utilized: 
    * To execute the function that adds topics to the array and render the buttons.
    * To display the details of the movie and gifs from two different APIs to the page by clicking on the topic buttons.
    * To pause and play the gifs by clicking on the Gifs.
    * To add the gifs to favourites by clicking the favourite buttton.
    * To remove the gifs from favourites by clicking the remove buttton.
    * To show the favourite gifs by clicking on the show favourite button.
    * To download the gifs by clicking download button.
#### Additional Features
* The app is fully mobile responsive.
* Integrated the search with additional APIs such as OMDB.
    * Code and Syntax to integrate search with OMDB APIs.
    ```javascript
    var queryURL2 = `http://www.omdbapi.com/?t=${movieName}&apikey=trilogy`;
    ```
* Allow users to request additional gifs to be added to the page.
    * Code and Syntax to request additional gifs.
    ```javascript
    var queryURL = `http://api.giphy.com/v1/gifs/search?q=${movieName}&api_key=A2Hw4RAXUAp9JUnpyZh9PqNapjox1Tj6&limit=${previousCount}`;
    ```
* Download button for each gif images that opens in new tab to right click and save image.
    * Code and Syntax to download gifs.
    ```javascript
    newAnchor.attr("download","file.jpg");
    ```

* Allow users to add/remove their favorite gifs to a `favorites` section, made this section persist even when the page is reloaded via `localStorage`.
    * Code and Syntax to store/retrieve data from localStorage.
    ```javascript
    localStorage.setItem("fav",JSON.stringify(favourites));

    favourites = JSON.parse(localStorage.getItem("fav"));
    ```
    * Code and Syntax to add gifs to favourites.
    ```javascript
    favourites.push(favId);
    ```
    * Code and Syntax to remove gifs from favourites.
    ```javascript
    favourites.splice(remIndex,1);
    ```

### NOTE
* [watch the demo video](https://youtu.be/BqreERTLjgQ)

* [Link to my GifTastic App](https://liaswapna.github.io/Giphy/)
