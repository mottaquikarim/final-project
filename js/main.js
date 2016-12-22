// first, retrieve all HTML elements with class = js-search
// and store into variable as jQuery object
const search = $('.js-search');

// set up a keypress event handler on the jQuery object that we selected
search.keypress(onKeyPressed);

const movieSearchButton = $('.js-search-btn');
movieSearchButton.click(onSearchPress);

	const urlToRequest = `http://www.omdbapi.com/?t=Jaws&tomatoes=true&y=&plot=short&r=json`;
	console.log(urlToRequest)

	const data = $.get( urlToRequest );
	
	data.then(onDataBack);



function onSearchPress(e) {

	const currentElement = $('.js-search');

	const queryString = currentElement.val();

	
	console.log('enter key pressed', queryString)

	//skip the updating of the label for now...


	const container = $('.js-container');
	container.html('');

	const urlToRequest = `http://www.omdbapi.com/?t=${queryString}&tomatoes=true&y=&plot=short&r=json`;
	console.log(urlToRequest)

	const data = $.get( urlToRequest );
	
	data.then(onDataBack);
}



//??can't get search buttont to work

//1. set up search button...
	//how to tie it to the onKeyPressed function???

//2. wrap images in clear fix...
	//can't seem to get both images to appear in same div
	//is container too narrow?

//3. set up some kind of scoring styling...


//clear search field on button press

$('.js-reset').click(function(onKeyPressed){
        $('input[type="text"]').val('');
});


//not sure how to run function on button press as well as enter press???

function onKeyPressed(e) {
	if (e.which === 13) {

	const currentElement = $(this);

	const queryString = currentElement.val();

	
	console.log('enter key pressed', queryString)

	//skip the updating of the label for now...


	const container = $('.js-container');
	container.html('');

	const urlToRequest = `http://www.omdbapi.com/?t=${queryString}&tomatoes=true&y=&plot=short&r=json`;
	console.log(urlToRequest)

	const data = $.get( urlToRequest );
	
	data.then(onDataBack);
	
	}
}



// const randomNum = $('.js-random');
// randomNum.html('');
// randomNum.append(randomNum);

//clear search field

$('.js-reset').click(function(){
        $('input[type="text"]').val('');
 		const movieData = $('.js-container');
		movieData.html('');
});

// $('.js-search').click(function(onDataBack){
//   //       $('input[type="text"]').val('');
//  	// 	const movieData = $('.js-container');
// 		// movieData.html('');
// });


// function getMovieByTitle(title){
// 	const urlToRequest = `http://www.omdbapi.com/?t=${title}&tomatoes=true&y=&plot=short&r=json`;
// 	console.log(urlToRequest)

// 	const data = $.get( urlToRequest );

// 	data.then(onDataBack);
// }

let tomatoRating;

function onDataBack(response) {
	console.log('data is back!')
	console.log(response);

	//removed .js-movie-data and put in js-conatimer
	const movieData = $('.js-container');
	movieData.html('');
	 // if (typeof response === "undefined" || typeof p2 === "undefined") {
  //       alert("movie by that name not found");

  //   }

//posts movie poster
	const moviePoster = response.Poster;
	console.log(moviePoster);
	const movieHtml = `<img src="${moviePoster}">`;

//posts RT rating
	tomatoRating = response.tomatoMeter;
	if (tomatoRating === "N/A") {
		movieData.append("pick another movie")
		$('input[type="text"]').val('');
		 return
	}

	// const tomatoMeter = parseInt(response.tomatoMeter, 10);
	console.log(tomatoRating);

	// const tomRate = `<div>Rotten Tomato sore: ${tomatoRating}</div>`;

//posts movie release date
	// const tomatoYear = response.Year;
	// console.log(tomatoYear);
	// const tomYear = `<div>Year released: ${tomatoYear}</div>`;

//posts movie plot
	// const tomatoPlot = response.Plot;
	// console.log(tomatoPlot);
	// const tomPlot = `<div>Plot: ${tomatoPlot}</div>`;

//rules of the game
	const tomRules = `<div class="js-label label-style">Click rotten if score is less than 50, tomato if above</div>`;


//posts rotten image
	const rottenImg = `<img src="images/rotten.png">`;
	// console.log("rottenImg");
	// const tomRotten = `${rottenImg}`;
	const tomRotten = `<div class="js-rotten-button button-choices">${rottenImg}</div>`;
	// console.log("tomRotten");

//posts fresh image
	const freshImg = `<img src="images/fresh.png">`;
	// console.log("freshImg");
	// const tomFresh = `${freshImg}`;
	const tomFresh = `<div class="js-fresh-button button-choices">${freshImg}</div>`;
	// console.log("tomFresh");

	movieData.append(movieHtml, tomRules, tomRotten, tomFresh);
	// movieData.append(tomatoRating);
}




//bind images with js and .clickevent

const rottenGuess = $('.js-button-choice');
rottenGuess.click(imageEnter);

$('body').on('click', '.js-rotten-button', imageEnter);

function imageEnter(e){
	
	if (tomatoRating < 50){
		$('.js-label').text("Correct! Nice Job!");
		console.log('correct');
	} else {
		$('.js-label').text("Wrong! Try another movie");
		console.log('wrong');
	}

};



$('body').on('click', '.js-fresh-button', imageEnterFresh);

function imageEnterFresh(e){
	
	if (tomatoRating >= 50){
		$('.js-label').text("Correct! Good guess");
		console.log('correct');
	} else {
		$('.js-label').text("Incorrect, enter another movie");
		console.log('wrong');
	}
};









