import pickle
import json
import numpy as np

__aircon = None
__data_columns = None
__model = None

def get_estimated_price(aircon,area,bedrooms,bathrooms):
    try:
        air_index = __data_columns.index(aircon.lower())
    except:
        air_index = -1
        
    x = np.zeros(len(__data_columns))
    x[0] = area
    x[1] = bathrooms
    x[2] = bedrooms
    if air_index >= 0:
        x[air_index] = 1

    return round(__model.predict([x])[0],2) 


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns
    global __aircon

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __aircon = __data_columns[4:]  

    global __model
#     if __model is None:
    with open('./artifacts/housing.pickle', 'rb') as f:
        __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_aircon():
    return __aircon

# def get_data_columns():
#     return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_aircon())
    print(get_estimated_price('yes_aircon',9000, 2, 2))
    print(get_estimated_price('no_aircon',5000, 1, 4))
