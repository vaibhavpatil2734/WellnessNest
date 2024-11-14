import React, { useState } from "react";

const BmrCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male"); // default gender
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [calories, setCalories] = useState({
    deficit: "",
    maintenance: "",
    bulking: "",
  });

  const calculateBMR = () => {
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseInt(age, 10);

    if (isNaN(weightInKg) || isNaN(heightInCm) || isNaN(ageInYears)) {
      alert("Please enter valid numbers for age, weight, and height.");
      return;
    }

    let BMR = 0;
    // Harris-Benedict Equation for BMR
    if (gender === "male") {
      BMR =
        88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * ageInYears;
    } else {
      BMR =
        447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * ageInYears;
    }

    // Calculating different calorie levels
    const maintenanceCalories = BMR * 1.2; // sedentary activity level
    const deficitCalories = maintenanceCalories - 500;
    const bulkingCalories = maintenanceCalories + 500;

    setCalories({
      deficit: Math.round(deficitCalories),
      maintenance: Math.round(maintenanceCalories),
      bulking: Math.round(bulkingCalories),
    });
  };

  return (
    <div className="flex justify-center items-center my-10 bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-white text-center">BMR Calculator</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-gray-700 text-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300">Weight (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300">Height (cm):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-gray-700 text-white"
            />
          </div>

          <button
            onClick={calculateBMR}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Calculate Calories
          </button>

          <table className="w-full mt-6 table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left text-gray-300">Calorie Type</th>
                <th className="border px-4 py-2 text-left text-gray-300">Calories</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 text-gray-400">Deficit</td>
                <td className="border px-4 py-2 text-gray-400">{calories.deficit}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-gray-400">Maintenance</td>
                <td className="border px-4 py-2 text-gray-400">{calories.maintenance}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-gray-400">Bulking</td>
                <td className="border px-4 py-2 text-gray-400">{calories.bulking}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BmrCalculator;
