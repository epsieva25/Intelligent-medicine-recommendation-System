# Intelligent Medicine Recommendation System

The Intelligent Medicine Recommendation System is an AI-driven web application designed to assist users in identifying potential diseases based on symptoms and providing relevant medical recommendations. The system integrates machine learning with an intuitive user interface to deliver personalized healthcare support.

## Key Features

- Disease prediction using Support Vector Machine (SVM) model
- Recommendation of appropriate medications, diets, workouts, and precautions
- Integrated Flask backend for handling ML logic and data processing
- Interactive Next.js frontend for symptom input and result display
- Clean and user-friendly interface for improved healthcare accessibility

## Technologies Used

- Python
- Flask
- Scikit-learn (SVM)
- Pandas and NumPy
- Next.js (React)
- HTML/CSS/JavaScript

## Dataset Details

- symptoms_df.csv – List of symptoms associated with diseases
- medications.csv – Medicines mapped to predicted diseases
- precautions_df.csv – Preventive measures based on condition
- workout_df.csv – Suggested physical activities per condition
- diets.csv – Dietary recommendations
- description.csv – Disease descriptions
- Training.csv – Main dataset for SVM model training

## ML Model

- Support Vector Classifier (SVC) trained on symptom data
- Model saved as svc.pkl for backend deployment
- Real-time predictions based on user symptom input

## Backend Functionality

- Processes user symptoms through trained ML model
- Extracts corresponding recommendations from datasets
- Sends JSON response to frontend for display

## Frontend Functionality

- Symptom selection via dropdown interface
- Displays predicted disease and all associated recommendations
- Developed using Next.js for fast and responsive UI

## Installation and Setup

1. Clone the repository
2. Set up a Python virtual environment and install backend dependencies
3. Run the Flask server for API and model access
4. Start the Next.js frontend for user interaction
5. Access the application via localhost

## Future Improvements

- Add user authentication for tracking health history
- Enable multi-language support
- Expand dataset for broader coverage
- Integrate with healthcare APIs for real-time updates

## Contributors

- Mary Jasper Epsibha R
