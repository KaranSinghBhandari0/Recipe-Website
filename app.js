let headingH2 = document.querySelector("h2");
let searchBtn = document.querySelector("#btn");
let input = document.querySelector("input");
let container = document.querySelector(".container");
let closepopup = document.querySelector(".fa-xmark");
let popupDIV = document.querySelector(".popup");
let DishName = document.querySelector(".popup h1");
let Method = document.querySelector(".popup p");
let list = document.querySelector("ul");

// after pressing closepopup button
closepopup.addEventListener("click",(e)=> {
    e.preventDefault();
    popupDIV.style.display = "none";
});

// get recipe Details function
let getRecipeDetails = (data) => {
    popupDIV.style.display = "block";
    DishName.innerText = data.strMeal;

    for(let i=1; i<=20; i++) {
        if(data[`strIngredient${i}`]) {
            el = document.createElement('li');
            el.innerHTML = `${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}`;
            list.appendChild(el);
        }
    }

    Method.innerText = data.strInstructions;
}

// get recipe function
let getRecipe = async (dish) => {
    container.innerHTML = "";
    headingH2.innerText = "Fetching Recipes...";

    try {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`;
        let data = await fetch(url).then(response => response.json());
        headingH2.innerText = "";
        for(let i=0; i<data.meals.length; i++) {
            // make babba for each
            let div = document.createElement('div');
            div.classList.add('child');
            div.innerHTML = `<img src="${data.meals[i].strMealThumb}"> 
            <h3>${data.meals[i].strMeal}</h3>`;

            // view recipe button
            let button = document.createElement('button');
            button.innerText = "View Recipe";
            div.appendChild(button);

            button.addEventListener("click", (e)=> {
                e.preventDefault();
                getRecipeDetails(data.meals[i]);
            })

            // append all dabas in container
            container.appendChild(div);

            // choice div ko gayab kardo
            document.querySelector(".choice-div").style.display = "none";
        }
    } catch(error) {
        headingH2.innerText = "Error in fetching recipes !!!";
        document.querySelector(".choice-div").style.display = "flex";
    }
}

// after pressing search button
searchBtn.addEventListener("click",(e)=> {
    e.preventDefault();
    popupDIV.style.display = "none";
    let dish = input.value.trim();      // to remove spaces
    if(dish == "") {
        headingH2.innerText = "Please enter a dish...";
    } else {
        getRecipe(dish);
    }
});