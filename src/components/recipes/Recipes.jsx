import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../card/Card';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tag, setTag] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const getRecipes = async () => {
    setLoading(true);
    try {
      const url = selectedTag
        ? `https://dummyjson.com/recipes/tag/${selectedTag}?limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`;
      const res = await axios.get(url);
      setRecipes((prev) => (skip === 0 ? res.data.recipes : [...prev, ...res.data.recipes]));
      setTotal(res.data.total);
    } catch (error) {
      setError(error.message || "Xato");
    } finally {
      setLoading(false);
    }
  };

  const getRecipesTag = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/recipes/tags");
      setTag(res.data);
    } catch (error) {
      setError(error.message || "Xato");
    }
  };

  useEffect(() => {
    getRecipes();
  }, [skip, selectedTag]);

  useEffect(() => {
    getRecipesTag();
  }, []);

  const handleSeeMore = () => {
    setSkip((prev) => prev + limit);
  };

  const handleRecipeTag = (tag) => {
    setSelectedTag(tag);
    setSkip(0); 
    setRecipes([]); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">Recipes</h1>

      <ul className="flex gap-3 mb-9 overflow-x-auto scrollbar-hidden">
        <li
          onClick={() => handleRecipeTag(null)}
          className={`border text-[18px] items-center border-gray-400 dark:border-gray-600 rounded-[10px] px-5 py-1 cursor-pointer text-nowrap text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            selectedTag === null ? 'bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600' : ''
          }`}
        >
          All
        </li>
        {tag?.map((item, idx) => (
          <li
            key={idx}
            onClick={() => handleRecipeTag(item)}
            className={`border text-[18px] items-center border-gray-400 dark:border-gray-600 rounded-[10px] px-5 py-1 cursor-pointer text-nowrap text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${
              selectedTag === item ? 'bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600' : ''
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {error && <div className="text-center text-red-600 dark:text-red-400 text-xl mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>

      {loading && <div className="text-center text-gray-600 dark:text-gray-300 mt-6">Yuklanmoqda...</div>}

      {!loading && total > recipes.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleSeeMore}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Recipes);