
// api documentation: www.themealdb.com/api
// main ingredient api: www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

const searchbtn = document.getElementById('search-btn')
const mealList = document.getElementById('meal')
const recipeCloseBtn = document.getElementById('recipe-close-btn')
const mealDetailsContent = document.querySelector('.meal-details-content');
const searchResult = document.getElementById('result');
     
searchResult.style.display = "none"


// get meal list that matches with the ingredients
const getMailList = () => {
    const searchInput = document.getElementById('search-input').value.trim()

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(response => response.json())
    .then(data => {
        
        console.log(data)

        let foundMeal = " ";

        if(data.meals){
            data.meals.forEach(meal =>{
                foundMeal += `
                <div class = "meal-item" data-id = "${meal.idMeal}">
                <div class = "meal-img">
                  <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                  <h3>${meal.strMeal}</h3>
                  <a href = "#" class = "recipe-btn">Get Recipe</a>
                </div>
              </div>
                `
            })

            mealList.classList.remove = 'notFound'
            searchResult.style.display = "block"
        }else{
            foundMeal = "sorry meal Not Found!"
            mealList.classList.add = 'notFound'
        }

        mealList.innerHTML = foundMeal
    });

}

searchbtn.addEventListener('click', getMailList);



// get the details of the recipe 

function getMealRecipe(e){
  e.preventDefault();
  if(e.target.classList.contains('recipe-btn')){
      let mealItem = e.target.parentElement.parentElement;
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals));

   }
}

mealList.addEventListener('click', getMealRecipe);



// create a modal
function mealRecipeModal(meal){
  console.log(meal);
  meal = meal[0];
  let html = `
      <h2 class = "recipe-title">${meal.strMeal}</h2>
      <p class = "recipe-category">${meal.strCategory}</p>
      <div class = "recipe-instruct">
          <h3>Instructions:</h3>
          <p>${meal.strInstructions}</p>
      </div>
      <div class = "recipe-meal-img">
          <img src = "${meal.strMealThumb}" alt = "">
      </div>
      <div class = "recipe-link">
          <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
      </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}

recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});




