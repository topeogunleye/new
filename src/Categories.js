import { Link } from 'react-router-dom';
import useFetchMealDbApi from './useFetchMealDbApi';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SkeletonCategory from './skeletons/SkeletonCategory';

const Categories = ({ ref = 'scroller' }) => {
  const history = useHistory();

  const [
    { data, isLoading, isError },
    doFetch,
  ] = useFetchMealDbApi(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
    { categories: [] }
  );

  if (data) {
    console.log(data);
  }

  return (
    <div className="max-w-3xl mx-auto text-center my-2">
      <h3 className="text-lg text-gray-900">Categories</h3>
      <div className="category">
        {isLoading
          ? // <div>Loading ...</div>
            [1, 2, 3, 4, 5].map((n) => (
              <SkeletonCategory Key={n} theme="dark" />
            ))
          : data.categories &&
            data.categories.map((category) => (
              <span className="mx-auto" key={category.idCategory}>
                <Link
                  to={`/CategoryInfo/${category.strCategory}`}
                  className="mx-0.5"
                >
                  <img
                    className="cat-img"
                    src={category.strCategoryThumb}
                    alt={category.strMeal}
                  />
                  <h2 className="categories">{category.strCategory}</h2>
                </Link>
              </span>
            ))}
      </div>
      <button
        className="absolute top-1 left-1 sm:top-4 sm:left-4 text-white hover:bg-white hover:text-black bg-gray-900 sm:bg-gray-700  py-1 px-1 sm:py-2 sm:px-4 md:hidden xl:block"
        onClick={() => {
          history.go(-1);
        }}
      >
        &laquo; Go Back
      </button>
      <div className="grid place-items-center my-8">
        <button
          className="flex justify-center hover:bg-white text-white hover:text-black bg-gray-900 md:bg-gray-700 py-1 px-1 sm:py-2 sm:px-4 mb-8"
          onClick={() => {
            history.go(-1);
          }}
        >
          &laquo; Go Back
        </button>
      </div>
    </div>
  );
};
export default Categories;
