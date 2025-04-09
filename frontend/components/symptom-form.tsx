"use client";

import React, { useState } from "react";

interface PredictionResult {
  disease: string;
  description: string[];
  medications: string[];
  precautions: string[];
  diets: string[];
  workouts: string[];
}

const SymptomForm: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [inputSymptom, setInputSymptom] = useState<string>("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddSymptom = () => {
    if (inputSymptom && !selectedSymptoms.includes(inputSymptom)) {
      setSelectedSymptoms([...selectedSymptoms, inputSymptom]);
      setInputSymptom("");
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) return;
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Prediction Error:", error);
      alert("An error occurred while predicting the disease.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        🩺 Symptom Checker
      </h2>

      <div className="flex gap-2">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full"
          value={inputSymptom}
          onChange={(e) => setInputSymptom(e.target.value.toLowerCase())}
          placeholder="Enter a symptom (e.g., headache)"
        />
        <button
          onClick={handleAddSymptom}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedSymptoms.map((symptom, index) => (
          <span
            key={index}
            className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center"
          >
            {symptom}
            <button
              onClick={() => handleRemoveSymptom(symptom)}
              className="ml-2 text-red-500 font-bold"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Predicting..." : "Submit Symptoms"}
      </button>

      {result && (
        <div className="mt-6 space-y-4 bg-gray-100 p-4 rounded-lg shadow-inner">
          <h3 className="text-xl font-bold text-gray-800">
            🧬 Predicted Disease:{" "}
            <span className="text-blue-600">{result.disease}</span>
          </h3>

          <div>
            <h4 className="font-semibold">📝 Description:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {result.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">💊 Medications:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {result.medications.map((med, i) => (
                <li key={i}>{med}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">🛡️ Precautions:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {result.precautions.map((prec, i) => (
                <li key={i}>{prec}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">🥗 Diets:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {result.diets.map((diet, i) => (
                <li key={i}>{diet}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">🏃 Workouts:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {result.workouts.map((work, i) => (
                <li key={i}>{work}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomForm;
