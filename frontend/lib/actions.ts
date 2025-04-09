// lib/actions.ts
import axios from "axios";

export async function predictDiseaseFromAPI(userSymptoms: string[]) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      { symptoms: userSymptoms },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );
    return response.data; // { disease, description, medications, precautions, workouts, diets }
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Failed to fetch disease prediction");
  }
}
