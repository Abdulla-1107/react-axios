import React from 'react';
import { Star, Flame, Timer, Users, ChefHat } from 'lucide-react';

const Card = ({ item }) => {
  if (!item) {
    return <div className="text-red-600 dark:text-red-400 text-center py-6 text-lg"></div>;
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] max-w-sm mx-auto">
      {item.image && (
        <img
          src={item.image}
          alt={item.name || 'Recipe'}
          className="w-full h-60 object-cover rounded-t-2xl"
        />
      )}
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{item.name}</h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-1">
          <span className="font-semibold text-gray-700 dark:text-gray-200">Cuisine:</span> {item.cuisine}
        </p>

        <p className="text-gray-600 dark:text-gray-300 mb-1">
          <span className="font-semibold text-gray-700 dark:text-gray-200">Difficulty:</span> {item.difficulty}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-3 text-gray-700 dark:text-gray-300 text-sm">
          <div className="flex items-center gap-1"><Timer className="w-4 h-4" /> Prep: {item.prepTimeMinutes} min</div>
          <div className="flex items-center gap-1"><ChefHat className="w-4 h-4" /> Cook: {item.cookTimeMinutes} min</div>
          <div className="flex items-center gap-1"><Users className="w-4 h-4" /> Serves: {item.servings}</div>
          <div className="flex items-center gap-1"><Flame className="w-4 h-4" /> {item.caloriesPerServing} kcal</div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
          <span className="text-gray-800 dark:text-gray-100 font-medium">{item.rating}</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">({item.reviewCount} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);