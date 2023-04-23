var recipes;
var links = document.querySelectorAll(".nav-link");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    var currentMeal = e.target.innerHTML;
    getRecipes(currentMeal);
  });
}

getRecipes("pizza");
async function getRecipes(meal) {
  var response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
  var recipesData = await response.json();
  recipes = recipesData.recipes;
  displayRecipes();
}

function displayRecipes() {
  var cartona = "";
  for (var i = 0; i < recipes.length; i++) {
    cartona += `
                <div class="col-sm-6 col-md-4 col-lg-3 my-3">
                    <div class="recipe">
                        <div>
                        <img src="${recipes[i].image_url}" alt="${recipes[i].title}" class="w-100 recipe-image">
                        </div>
                        <div class="recipe-title">
                            <h3>${recipes[i].title}</h3>
                        </div>
                        <div> 
                            <a target="_blank" href="${recipes[i].source_url}" class="btn btn-info ms-1 me-3">Source</a>
                            <a data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getSingleRecipe(${recipes[i].recipe_id})" class="btn btn-warning">Details</a>
                        </div>
                    </div> 
                </div>
              `;
  }
  document.getElementById("recipesRow").innerHTML = cartona;
}

var recipeDetails = {};
async function getSingleRecipe(recipeId) {
  var response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
  recipeDetails = await response.json();
  displaySingleRecipe();
}

function displaySingleRecipe() {
  var details = recipeDetails.recipe;
  var recipeDetailsData = `
                            <img src="${details.image_url}" class="w-100">
                            <h3 class="my-2">${details.title}</h3>
                            <div class="line"></div>
                          `;
  for (var i = 0; i < details.ingredients.length; i++) {
    recipeDetailsData += `
                                <ul>
                                    <li>${details.ingredients[i]}</li>
                                </ul>
                          `;
  }
  document.getElementById("recipeData").innerHTML = recipeDetailsData;
}