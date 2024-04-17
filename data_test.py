import numpy as np
import pandas as pd
from data_utils import pred_data_gen

# Define parameters
file_path = '../dataset/03062021_Pred_96.csv'  # Provide the path to your data file
data_term = 10  # Number of days for prediction
n_route = 100  # Number of routes
n_frame = 36  # Number of frames within a standard sequence unit
day_slot = 288  # Number of time slots per day

# Generate prediction dataset
dataset, data_len = pred_data_gen(file_path, data_term, n_route, n_frame, day_slot)

# Get the prediction data
x_pred = dataset.get_data('pred')

# Reshape prediction data for visualization
# Reshape to (data_len * n_frame, n_route)
x_pred_reshaped = x_pred.reshape(-1, n_route)

# Convert to DataFrame for easier handling
df_pred = pd.DataFrame(x_pred_reshaped)

# Write DataFrame to CSV file
output_csv = './dataset/prediction_data.csv'
df_pred.to_csv(output_csv, index=False)

print(f"Prediction data saved to {output_csv}")
