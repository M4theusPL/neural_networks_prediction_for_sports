import pandas
from flask import Flask
from models import *
from tools import *
from flask_swagger_ui import get_swaggerui_blueprint

SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = '/static/swagger.json'  # Our API url (can of course be a local resource)

# Call factory function to create our blueprint
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Neural network prediction for sports"
    },
    # oauth_config={  # OAuth config. See https://github.com/swagger-api/swagger-ui#oauth2-configuration .
    #    'clientId': "your-client-id",
    #    'clientSecret': "your-client-secret-if-required",
    #    'realm': "your-realms",
    #    'appName': "your-app-name",
    #    'scopeSeparator': " ",
    #    'additionalQueryStringParams': {'test': "hello"}
    # }
)





sports_data_dir = ['football_data.csv']
models = [FootballModel()]
sports = ['football']

results = {}
list_oponetnt = {}

for data_dir, model, sport in zip(sports_data_dir, models, sports) :
    data = pandas.read_csv(data_dir)
    predictions = get_predictions(model, data)
    results[sport] = get_results(predictions)
    print("Neural Network Accuracy: ", get_accuracy(results[sport], data), "%")
    list_oponetnt[sport] = data["Opponent"]
app = Flask(__name__)
app.register_blueprint(swaggerui_blueprint)


@app.route('/discipline/<string:discipline>/opponent/<string:opponent>')
def check(discipline, opponent):
    if discipline in list_oponetnt:
        for i in range(len(list_oponetnt[discipline])):
            if list_oponetnt[discipline][i] == opponent:
                if results[discipline][i] == 1:
                    return {"discipline": discipline, "opponent": opponent, "result": "Poland Wins!"}
                elif results[discipline][i] == -1:
                    return {"discipline": discipline, "opponent": opponent, "result": "Poland Lose!"}
                else:
                    return {"discipline": discipline, "opponent": opponent, "result": "Draw!"}

        return {"discipline": discipline, "opponent": opponent, "result": "There is no such opponent in the database!"}


if __name__ == '__main__':
    app.run(debug=True)
