from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps
from flask_cors import CORS  # Adicionar suporte a CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir requisições de outros domínios

mongouri = os.getenv("MONGO_URI")

# Conexão com o MongoDB
client = MongoClient(mongo_uri)
db = client['mongodb']
receitas_collection = db['recipes']

# Função para filtrar as receitas
def filtrar_receitas(criterio):
    if criterio == "calorico":
        # Filtro por calorias acima de 500
        return receitas_collection.find({"calorias": {"$gt": 500}})
    elif criterio == "quantidade":
        # Filtro por quantidade maior que 3
        return receitas_collection.find({"quantidade": {"$gt": 3}})
    return []

# Rota para buscar e filtrar as receitas - Aceita POST e GET
@app.route('/filtrar', methods=['GET', 'POST'])
def filtrar():
    if request.method == 'POST':
        data = request.json
        criterio = data.get('criterio', '')
    else:
        # No GET, pode-se passar o critério como um parâmetro de URL
        criterio = request.args.get('criterio', '')
    
    receitas_filtradas = filtrar_receitas(criterio)
    return dumps(receitas_filtradas)

if __name__ == '__main__':
    # Permitindo que o Flask seja acessado em toda a rede local
    app.run(host='0.0.0.0', port=5000, debug=True)
