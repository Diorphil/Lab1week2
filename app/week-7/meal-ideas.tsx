"use client";

import { useState, useEffect } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealIdeasProps = {
  ingredient: string;
};

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMealIdeas() {
      if (!ingredient) {
        setMeals([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );
        const data = await response.json();
        setMeals(data.meals ?? []);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
        setMeals([]);
      }

      setLoading(false);
    }

    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Meal Ideas {ingredient && `for: ${ingredient}`}
      </h2>

      {loading && <p>Loading...</p>}

      {!loading && meals.length === 0 && ingredient && (
        <p>No meals found.</p>
      )}

      <ul className="space-y-2">
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            className="bg-slate-800 text-slate-100 p-3 rounded-lg"
          >
            {meal.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
}