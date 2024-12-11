import React, { useState, useEffect } from "react";
import axios from "axios";

const WorkoutDatabase = () => {
  const [isExercise, setIsExercise] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleSelectChange = (event) => {
    setIsExercise(event.target.value);
  };

  const handleSearch = async () => {
    if (!isExercise) return;

    setIsLoading(true);
    setError("");
    const options = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${isExercise}`,
      headers: {
        "x-rapidapi-key": "acb432e861msh0a6a7fc49dcdd9cp14e045jsn1cfd7eadc480",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setExercises(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch exercises. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApiStatus = async () => {
    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/status",
      headers: {
        "x-rapidapi-key": "acb432e861msh0a6a7fc49dcdd9cp14e045jsn1cfd7eadc480",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setStatus(response.data.status || "Service operational");
    } catch (error) {
      console.error("Error fetching status:", error);
      setStatus("Error fetching status");
    }
  };

  useEffect(() => {
    fetchApiStatus();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-[60vh] gap-10 my-12 bg-gray-900">
      <div className="w-full flex flex-col justify-center items-center gap-6 max-w-4xl mx-auto p-6 bg-gray-800 shadow-xl rounded-lg">
        <h1 className="text-5xl font-extrabold text-center text-white">Find Your Perfect Exercise</h1>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row w-full">
          <select
            value={isExercise}
            onChange={handleSelectChange}
            className="py-3 px-5 appearance-none border border-gray-600 rounded-md text-xl text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
          >
            <option value="">Select a Muscle Group</option>
            <option value="back">Back</option>
            <option value="cardio">Cardio</option>
            <option value="chest">Chest</option>
            <option value="lower%20arms">Lower Arms</option>
            <option value="lower%20legs">Lower Legs</option>
            <option value="neck">Neck</option>
            <option value="shoulders">Shoulders</option>
            <option value="upper%20arms">Upper Arms</option>
            <option value="upper%20legs">Upper Legs</option>
            <option value="waist">Waist</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-green-700 rounded-md py-3 px-6 text-xl text-white hover:bg-green-600 transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
          >
            Search
          </button>
        </div>
        {isLoading ? (
          <p className="text-gray-400">Loading exercises...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : exercises.length === 0 ? (
          <p className="text-gray-400">Exercises will be displayed here once available.</p>
        ) : null}
      </div>


      <div className="w-full">
        {exercises.length > 0 && (
          <div className="flex w-full flex-wrap items-center justify-center gap-6">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex flex-col items-center text-center pt-10 rounded-xl gap-4 bg-gray-700 w-72 min-h-96 hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
              >
                {exercise?.gifUrl ? (
                  <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    className="max-h-64 object-contain rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="max-h-64 bg-gray-600 flex items-center justify-center text-white rounded-lg">
                    No Image Available
                  </div>
                )}
                <h3 className="capitalize text-white font-semibold text-xl px-4">{exercise?.name || "Exercise Name Not Available"}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutDatabase;
