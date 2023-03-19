const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

let meals = [];

searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  if (searchTerm.length > 2) {
    searchMeals(searchTerm);
  } else {
    clearResults();
  }
});

function searchMeals(searchTerm) {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      meals = data.meals;
      displayResults();
    })
    .catch((error) => console.error(error));
}

function displayResults() {
  clearResults();
  meals.forEach((meal) => {
    const mealCard = createMealCard(meal);
    searchResults.appendChild(mealCard);
  });
}

function clearResults() {
  searchResults.innerHTML = "";
}

function createMealCard(meal) {
  const mealCard = document.createElement("div");
  mealCard.className = "col-md-4 my-3";
  mealCard.innerHTML = `
    <div class="card">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <button class="btn btn-primary" onclick="addToFavorites('${meal.idMeal}')">Add to favorites</button>
        <a href="./meal.html?id=${meal.idMeal}" class="btn btn-secondary">View details</a>
      </div>
    </div>
  `;
  return mealCard;
}

function addToFavorites(mealId) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const existingFavorite = favorites.find((favorite) => favorite.idMeal === mealId);
  if (!existingFavorite) {
    const newFavorite = meals.find((meal) => meal.idMeal === mealId);
    favorites.push(newFavorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

