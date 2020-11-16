window.onload = function(){
	let $favouritesWrapper = document.querySelector(".favourites-joke-wrapper");
	$favouritesWrapper.addEventListener("favouritesChange", renderFavouriteItems, false);
	localStorage.setItem('favourites', JSON.stringify(favouriteJokes));
	renderFavouriteJokes(favouriteJokes);
}

// Show Favourites on Tablets and Mobiles
const $burgerBtn = document.querySelector('.favourites-menu-btn');
const $favouritesWrapper = document.querySelector('.favourites-wrapper');

$burgerBtn.addEventListener("click", function () {
	this.classList.toggle('active');
	$favouritesWrapper.classList.toggle('active');
});

const $categoriesWrapper = document.querySelector('.categories-wrapper');
const $getJokeBtn = document.querySelector('.content-form__submit');

// Getting favourite jokes from Localstorage
let store = localStorage.getItem('favourites');
let favouriteJokes = store ? JSON.parse(store): {};


// Getting all available categories from API
const getCategories = () => {
	const url = 'https://api.chucknorris.io/jokes/categories';

	fetch(url)
		.then(response => response.json())
		.then(data => {
			data.map(item => {
				const $categoriesBtn = document.createElement('input');
				$categoriesBtn.type = "radio";
				$categoriesBtn.id = `${item}`;
				$categoriesBtn.name = "categories";

				const $label = document.createElement('label');
				$label.htmlFor = `${item}`;
				$label.textContent = `${item}`;

				$categoriesWrapper.append($categoriesBtn, $label);
			});
		});
};
document.addEventListener("DOMContentLoaded", getCategories);

// Rendering jokes
function getJoke(joke, i=0) {
	const lastUpdated = Math.ceil((Date.now() - new Date(joke.updated_at))/(1000 * 3600));
	return `<div class="joke-item">
		<span class="joke__icon">
			<img src="img/message.svg" alt="message">
		</span>
		<p class="joke__id">ID: <a class="joke__link" href="${joke.url}" target = "_blank">${joke.id} </a></p>
		<button class="btn-favourite" id="${i}" data-id="${joke.id}"></button>
		<p class="joke__text">${joke.value}</p>
		<div class="joke__info">
			<span class="joke__updated">Last update: <span>${lastUpdated}</span> hours ago</span>
			${joke.categories.length > 0 ? `<span class="joke__category">${ joke.categories }</span>` : `<span></span>`}
		</div>
	</div>`;
};

function renderJokes(data) {
	let jokes = ``;
	for (let i=0; i<data.length; i++ ) {
		jokes += getJoke(data[i], i);
	}

	document.querySelector('.content-joke-wrapper').innerHTML = jokes;
	
	let $favouriteBtns = document.querySelectorAll(".content-joke-wrapper > .joke-item > .btn-favourite");
	for (let i=0; i < $favouriteBtns.length; i++ ) {
		$favouriteBtns[i].addEventListener( 'click', function(e) {
			e.target.classList.toggle('liked');
			if (e.target.classList.contains('liked')) {
				favouriteJokes[data[e.target.id].id] ? delete favouriteJokes[data[e.target.id].id] : (favouriteJokes[data[e.target.id].id] = data[e.target.id]);
			} else {
				delete favouriteJokes[data[e.target.id].id]
			}
			localStorage.setItem('favourites', JSON.stringify(favouriteJokes));
			const myEvent = new CustomEvent("favouritesChange", {
				detail: favouriteJokes,
			});
			document.querySelector(".favourites-joke-wrapper").dispatchEvent(myEvent);
		}, false );
			for (let item in favouriteJokes) {
					if (item == data[i].id){
						$favouriteBtns[i].classList.add('liked');
					}
			}
	};
};

// Rendering favourite jokes
function renderFavouriteJokes(jokesFav) {
	let favJokes = ``;
	for (let item in jokesFav) {
		favJokes += getJoke(jokesFav[item], item);
	}
	document.querySelector('.favourites-joke-wrapper').innerHTML = favJokes;
	let $favouriteBtns = document.querySelectorAll(".favourites-joke-wrapper > .joke-item > .btn-favourite");
	for (let i=0; i < $favouriteBtns.length; i++ ) {
		$favouriteBtns[i].addEventListener( 'click', function(e) {
			e.target.classList.toggle('liked');
			delete favouriteJokes[e.target.id];
			localStorage.setItem('favourites', JSON.stringify(favouriteJokes));

			var myEvent = new CustomEvent("favouritesChange", {
					detail: favouriteJokes,
			});
			document.querySelector(".favourites-joke-wrapper").dispatchEvent(myEvent);
			}, false );
			$favouriteBtns[i].classList.add('liked');
	}
};

function renderFavouriteItems(e) {
	renderFavouriteJokes(e.detail);
};

// Work with form inputs
const $random = document.querySelector("#random");
const $categories = document.querySelector("#categories");
const $search = document.querySelector("#search");

$search.addEventListener("click", function() {
	const $searchInput = document.querySelector("#jokes-search");
	$searchInput.classList.remove('hide-search-input');

	$categoriesWrapper.classList.add('hide-categories');
});

$random.addEventListener("click", function() {
	const $searchInput = document.querySelector("#jokes-search");
	$searchInput.classList.add('hide-search-input');

	$categoriesWrapper.classList.add('hide-categories');
});

$categories.addEventListener("click", function() {
	const $searchInput = document.querySelector("#jokes-search");
	$searchInput.classList.add('hide-search-input');

	$categoriesWrapper.classList.remove('hide-categories');
});

// Getting random joke from api
const getRandomJoke = () => {
	const url = 'https://api.chucknorris.io/jokes/random';

	fetch(url)
		.then(response => response.json())
		.then(data => {
			renderJokes([data]);
		});
};

// Getting random joke from given category from api
const getJokeFromCategory = () => {
	const $categories = document.querySelectorAll('input[name = "categories"]');

	let category;

	$categories.forEach(item => {
		if (item.checked) {
			category = item.id;
		}
	});

	if (category) {
		const url = `https://api.chucknorris.io/jokes/random?category=${category}`;

		fetch(url)
			.then(response => response.json())
			.then(data => {
				renderJokes([data]);
			});
	}
};

// Getting random joke from free text search from api
const getJokeFromTextSearch = () => {
	const $searchValue = document.querySelector("#jokes-search").value;

	if ($searchValue) {
		const url = `https://api.chucknorris.io/jokes/search?query=${$searchValue}`;

		fetch(url)
			.then(response => response.json())
			.then(data => {
				const result = data.result;
				renderJokes(result);
			});
	}
};

// Choosing search variant from inputs
const searchJoke = () => {
	if ($random.checked) {
		getRandomJoke();
	} else if ($categories.checked) {
		getJokeFromCategory();
	} else if ($search) {
		getJokeFromTextSearch();
	}
};

$getJokeBtn.addEventListener("click", e => {
	e.preventDefault();
});
$getJokeBtn.addEventListener("click", searchJoke);


