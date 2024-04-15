# type: ignore
from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin
import pandas as pd
import numpy as np
import joblib

app = Flask(__name__)

model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
   try:
      data = request.json
      experience = data.get('predicted_salary')
      prediction = model.predict(pd.DataFrame(columns=['predicted_salary'],
                                data=np.array([experience]).reshape(1)))
      
      response = {
            "prediction": np.round(prediction[0])
      }
      
      app.logger.error(response)
      return jsonify(response)
   except Exception as e:
      app.logger.error(f"An error occurred: {str(e)}")
      return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
   app.run(debug = True)
