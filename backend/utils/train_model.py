import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC
import joblib
import os

# Load training dataset
train_df = pd.read_csv("datasets/Training.csv")

# Prepare features and labels
X = train_df.drop("prognosis", axis=1)
y = train_df["prognosis"]

# Label encode the target variable
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Train the model
model = SVC(kernel="linear", probability=True)
model.fit(X, y_encoded)

# Save model and encoder
os.makedirs("datasets", exist_ok=True)
joblib.dump(model, "datasets/svc.pkl")
joblib.dump(le, "datasets/label_encoder.pkl")

print("✅ Model and label encoder saved successfully.")
