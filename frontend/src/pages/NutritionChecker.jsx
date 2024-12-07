import React, { useState } from "react";
import axios from "axios";

const NutritionChecker = () => {
  const [isFoodItem, setIsFoodItem] = useState("");
  const [nutritionResult, setNutritionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setIsFoodItem(event.target.value);
  };

  const handleSearch = async () => {
    if (!isFoodItem.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.edamam.com/api/nutrition-data`,
        {
          params: {
            app_id: "8cb03f6e",
            app_key: "417041a835bebc9c982aee0b3fedba17",
            ingr: isFoodItem,
          },
        }
      );

      const data = response.data;

      if (data.calories) {
        setNutritionResult({
          name: isFoodItem,
          calories: data.calories,
          totalFat: data.totalNutrients.FAT ? data.totalNutrients.FAT.quantity : "N/A",
          saturatedFat: data.totalNutrients.FASAT ? data.totalNutrients.FASAT.quantity : "N/A",
          cholesterol: data.totalNutrients.CHOLE ? data.totalNutrients.CHOLE.quantity : "N/A",
          sodium: data.totalNutrients.NA ? data.totalNutrients.NA.quantity : "N/A",
          carbohydrates: data.totalNutrients.CHOCDF ? data.totalNutrients.CHOCDF.quantity : "N/A",
          fiber: data.totalNutrients.FIBTG ? data.totalNutrients.FIBTG.quantity : "N/A",
          sugar: data.totalNutrients.SUGAR ? data.totalNutrients.SUGAR.quantity : "N/A",
          protein: data.totalNutrients.PROCNT ? data.totalNutrients.PROCNT.quantity : "N/A",
        });
      } else {
        setNutritionResult(null);
        setError("No nutrition information found for that food item.");
      }
    } catch (error) {
      console.error("Error fetching nutrition information:", error);
      setError("Error fetching nutrition information. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-[60vh] gap-10 my-12 bg-gray-800 text-gray-100">
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-2xl md:text-5xl font-bold text-center text-white">
          Nutrition Information Search
        </h1>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Enter food eg (1 apple)"
            value={isFoodItem}
            onChange={handleInputChange}
            className="py-2 px-4 appearance-none border border-gray-500 rounded-md md:text-xl text-base focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-700 text-white"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 rounded-md py-2 px-4 text-base md:text-xl text-white hover:bg-green-500 focus:ring-2 focus:ring-green-500"
          >
            Search
          </button>
        </div>
        {isLoading && <p className="text-white">Loading nutrition information...</p>}
        {error && <p className="text-red-400">{error}</p>}
      </div>

      {nutritionResult && (
        <div className="w-full overflow-x-auto xl:flex md:items-center md:justify-center">
          <table className="table-auto border-collapse border border-gray-500 min-w-[600px] bg-gray-700">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-gray-300">Name</th>
                <th className="border px-4 py-2 text-gray-300">Calories</th>
                <th className="border px-4 py-2 text-gray-300">Total Fat (g)</th>
                <th className="border px-4 py-2 text-gray-300">Saturated Fat (g)</th>
                <th className="border px-4 py-2 text-gray-300">Cholesterol (mg)</th>
                <th className="border px-4 py-2 text-gray-300">Sodium (mg)</th>
                <th className="border px-4 py-2 text-gray-300">Carbohydrates (g)</th>
                <th className="border px-4 py-2 text-gray-300">Fiber (g)</th>
                <th className="border px-4 py-2 text-gray-300">Sugar (g)</th>
                <th className="border px-4 py-2 text-gray-300">Protein (g)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 text-gray-200">{nutritionResult.name || "N/A"}</td>
                <td className="border px-4 py-2 text-gray-200">{nutritionResult.calories || "N/A"}</td>
                <td className="border px-4 py-2 text-gray-200">{nutritionResult.totalFat || "N/A"}</td>
                <td className="border px-4 py-2 text-gray-200">{nutritionResult.saturatedFat || "N/A"}</td>
                <td className="border px-4 py-2 text-gray-200">{nutritionResult.cholesterol || "N/A"}</td>
                <td className="border px-4 py-2 text-gray-200">{nutritionResult.sodium || "N/A"}</td>
                <td className="border px-4 py-2 text-gray-200">{nutritionResult.carbohydrates || "N/A"}</td>
                <td className="border px-4 py-2 text-gray-200">{nutritionResult.fiber || "N/A"}</td>
                <td className="border px-4 py-2 text-gray-200">{nutritionResult.sugar || "N/A"}</td>
                <td className="border px-4 py-2 text-gray-200">{nutritionResult.protein || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NutritionChecker;
