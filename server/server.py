from flask import Flask, request, jsonify
import util
app = Flask(__name__)

# create drop down for laircon options

@app.route('/get_aircon', methods=['GET'])
def get_aircon():
    response = jsonify({
        'aircon': util.get_aircon()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    area = float(request.form['area'])
    aircon = request.form['aircon'] 
    bathrooms = int(request.form['bathrooms'])
    bedrooms = int(request.form['bedrooms'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(aircon,area,bedrooms,bathrooms)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    app.run()