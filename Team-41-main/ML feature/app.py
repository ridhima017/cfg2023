from flask import Flask, render_template, request
import pandas as pd
import numpy as np
import sklearn
import os
import pickle
import warnings

app = Flask(__name__)

loaded_model = pickle.load(open("model.pkl", 'rb'))


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/predict', methods=['POST'])
def predict():
    temp = float(request.form['Temperature'])
    humidity = float(request.form['Humidity'])
    soil = int(request.form['Soil'])
    rainfall = float(request.form['Rainfall'])

    feature_list = [ temp, humidity, soil, rainfall]
    single_pred = np.array(feature_list).reshape(1, -1)

    prediction = loaded_model.predict(single_pred)

    crop_dict = {
        8: 'coconut',
        7: 'papaya',
        6: 'orange',
        10: 'apple',
        9: 'muskmelon',
        4: 'watermelon',
        3: 'grapes',
        2: 'mango',
        1: 'banana',
        5: 'pomegranate'
    }

    if prediction[0] in crop_dict:
        crop = crop_dict[prediction[0]]
        result = "{} is the best tree to be plated here".format(crop)
    else:
        result = "Sorry, we could not determine the best tree to be planted with the provided data."

    return render_template('home.html', result=result)


if __name__ == '__main__':
    app.run(debug=True)