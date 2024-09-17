from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import joblib  # To save and load the model
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)

# Load and train the Random Forest model
def train_and_save_model():
    # Load the dataset (adjust the path as needed)
    file_path = "C:\\Users\\DELL_G3\\Desktop\\Nadeee_project\\backend\\HR_Vvision.csv"  # Update with the correct file path
    hr_data = pd.read_csv(file_path)
    
    # Set thresholds for performance classification
    low_threshold = 0.4
    high_threshold = 0.7
    
    # Create a performance score based on last_evaluation
    hr_data['performance_score'] = hr_data['last_evaluation'].apply(
        lambda x: 'LOW' if x < low_threshold else ('HIGH' if x >= high_threshold else 'AVERAGE')
    )
    
    # Drop 'last_evaluation' since it's used to compute the performance score
    hr_data = hr_data.drop(columns=['last_evaluation'])
    
    # Train-test split
    X = hr_data.drop(columns='performance_score', axis=1)  # Assuming 'performance_score' is the target column
    Y = hr_data['performance_score']
    
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=2)
    
    # Train the Random Forest model
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train, Y_train)
    
    # Save the model to a .pkl file
    model_file_path = "C:\\Users\\DELL_G3\\Desktop\\Nadeee_project\\backend\\rforest_model.pkl"
    joblib.dump(rf_model, model_file_path)
    print("Model saved to", model_file_path)

# Uncomment this to train and save the model (only needs to be done once)
# train_and_save_model()

# Load the model from the .pkl file
model_file_path = "C:\\Users\\DELL_G3\\Desktop\\Nadeee_project\\backend\\rforest_model.pkl"  # Path to the saved model
model = joblib.load(model_file_path)

@app.route('/api/predict', methods=['POST'])
def predict_performance():
    req_data = request.json

    # List of required fields
    required_fields = ['number_project', 'average_monthly_hours', 
                       'time_spend_company', 'Work_accident', 'left', 
                       'promotion_last_5years', 'Department', 'salary', 'satisfaction_level']
    
    # Check for missing fields
    missing_fields = [field for field in required_fields if field not in req_data]
    if missing_fields:
        return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

    try:
        # Extract features from the request
        number_project = int(req_data['number_project'])
        average_monthly_hours = float(req_data['average_monthly_hours'])
        time_spend_company = int(req_data['time_spend_company'])
        Work_accident = int(req_data['Work_accident'])
        left = int(req_data['left'])
        promotion_last_5years = int(req_data['promotion_last_5years'])
        Department = int(req_data['Department'])
        salary = int(req_data['salary'])
        satisfaction_level = float(req_data['satisfaction_level'])
    except ValueError as e:
        return jsonify({'error': f'Invalid data format: {str(e)}'}), 400

    # Create a DataFrame with the user data for prediction
    user_data = pd.DataFrame({
        'number_project': [number_project],
        'average_monthly_hours': [average_monthly_hours],
        'time_spend_company': [time_spend_company],
        'Work_accident': [Work_accident],
        'left': [left],
        'promotion_last_5years': [promotion_last_5years],
        'Department': [Department],
        'salary': [salary],
        'satisfaction_level': [satisfaction_level],
    })

    # Predict the performance score using the loaded Random Forest model
    prediction_result = model.predict(user_data)
    
    return jsonify({'prediction_result': prediction_result.tolist()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
