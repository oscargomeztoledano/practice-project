#!/usr/bin/env python3
import time
import requests
from kafka import KafkaProducer
import json
from kafka.errors import NoBrokersAvailable

# Definimos cada URL de la API con cada topic de Kafka y los headers para acceder a la API
URLS_TOPICS = {
    "https://euro-20242.p.rapidapi.com/players": "players",
    "https://euro-20242.p.rapidapi.com/teams": "teams",
    "https://euro-20242.p.rapidapi.com/matches": "matches",
    "https://euro-20242.p.rapidapi.com/groups": "groups",
}

headers = {
    "x-rapidapi-key": "e936e478c0mshcad39bb17581030p190dddjsne0ac165da7cd",
    "x-rapidapi-host": "euro-20242.p.rapidapi.com"
}

# Función para obtener los datos de la API
def get_data(url, headers):
    response = requests.get(url, headers=headers)
    print(response.status_code)
    return response.json()

# Esperar antes de intentar conectar a Kafka
time.sleep(20)

# Conexión con Kafka a través del listener del contenedor de Kafka
while True:
    try:
        producer = KafkaProducer(bootstrap_servers='kafka:9092', value_serializer=lambda v: json.dumps(v).encode('utf-8'))
        break
    except NoBrokersAvailable:
        print("NoBrokersAvailable: Waiting for Kafka...")
        time.sleep(5)

for url, topic in URLS_TOPICS.items():
    data = get_data(url, headers)
    producer.send(topic, value=data)
    producer.flush()

print("Data sent to Kafka")
