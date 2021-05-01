import { useParams } from 'react-router';
import useFetchMealDbApi from './useFetchMealDbApi';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

const MealInfo = () => {
  const { mealID } = useParams();
  const [ingredients, setIngredients] = useState('');
  const history = useHistory();

  const [{ data, isLoading, isError }, doFetch] = useFetchMealDbApi();

  useEffect(
    () =>
      doFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`),
    [doFetch, mealID, data]
  );

  function createIngredientsArray(meal) {
    const ingredientsData = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredientsData.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }

    setIngredients(ingredientsData);
  }

  console.log(ingredients);

  if (data && ingredients === '') {
    console.log(data);
    const meal = data.meals[0];
    createIngredientsArray(meal);
  }

  return (
    <div id="single-meal">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        ingredients &&
        data && (
          <div className="w-screen h-screen">
            <div className="max-w-4xl md:max-w-2xl lg:max-w-4xl mx-auto md:my-8 text-white">
              <div className="recipe-summary wrapper md:mt-8 flex flex-col-reverse w-full align-center justify-between md:flex-row">
                <div className="recipe-details">
                  <div className="primary-info-text">
                    <div className="primary-info-left-wrapper">
                      <h1 className="recipe-title font-bold text-xl md:text-4xl text-white mt-0 ml-2 mb-4 max-w-min md:mb-8 font-sans">
                        {data.meals[0].strMeal}
                      </h1>
                    </div>
                  </div>
                  <div className="summary-item-wrapper flex relative justify-center md:justify-start">
                    <div className="recipe-summary-item  text-4xl flex flex-col w-28 border-r border-gray-400  justify-center items-center">
                      <span className="value font-light text-4xl h-12">
                        {ingredients.length}
                      </span>
                      <span className="unit font-normal text-sm leading-3">
                        Ingredients
                      </span>
                    </div>
                    <div className="recipe-summary-item unit text-4xl flex flex-col w-36 border-r border-gray-400 justify-center items-center">
                      <span className="value font-light text-4xl h-12">25</span>
                      <span className="unit font-normal text-sm leading-3">
                        Minutes
                      </span>
                    </div>
                    <div className="recipe-summary-item nutrition text-4xl flex flex-col w-36 justify-center items-center">
                      <span className="value font-light text-4xl h-12">
                        210
                      </span>
                      <span className="unit font-normal text-sm leading-3">
                        Calories
                      </span>
                    </div>
                  </div>

                  <div className="main mt-6 text-center md:text-justify m-8">
                    <h2 className="h-8 text-center md:text-justify font-bold">
                      Ingredients
                    </h2>
                    <ul className="single-meal-ul w-11/12 mx-auto md:mx-0">
                      {ingredients.map((ing) => (
                        <li className="single-meal-ul-li" key={uuidv4()}>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="recipe-details-image w-full">
                  <img
                    alt="Cranberry Orange Muffins"
                    src={data.meals[0].strMealThumb}
                    className="recipe-image max-w-full rounded-b-lg md:rounded-lg"
                  />
                </div>
              </div>
              <p className="single-meal-p w-11/12 m-auto md:mt-6 list-none">
                {data.meals[0].strInstructions}
              </p>
            </div>
          </div>
        )
      )}
      <div className="grid place-items-center my-8"></div>
      <button
        className="absolute top-1 left-1 sm:top-4 sm:left-4 text-white hover:bg-white hover:text-black bg-gray-800 py-1 px-1 sm:py-2 sm:px-4"
        onClick={() => {
          history.go(-1);
        }}
      >
        &laquo; Go Back
      </button>
    </div>
  );
};

export default MealInfo;
