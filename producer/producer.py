#!/usr/bin/env python3
import requests
from kafka import KafkaProducer
import json

#definimos cada URL de la API con cada topic de Kafka y los headers para acceder a la API
URLS_TOPICS = {
    "https://euro-20242.p.rapidapi.com/players": "players_topic",
    "https://euro-20242.p.rapidapi.com/teams": "teams_topic",
    "https://euro-20242.p.rapidapi.com/matches": "matches_topic",
    "https://euro-20242.p.rapidapi.com/groups": "players_topic",
}

headers = {
	"x-rapidapi-key": "e936e478c0mshcad39bb17581030p190dddjsne0ac165da7cd",
	"x-rapidapi-host": "euro-20242.p.rapidapi.com"
}

#funcion para obtener los datos de la API
def get_data(url, headers):
    response = requests.get(url, headers=headers)
    print(response.status_code)
    return response.json()

#conexion con kafka a traves del listener del contenedor de kafka
producer = KafkaProducer(bootstrap_servers='kafka:9092', value_serializer=lambda v: json.dumps(v).encode('utf-8'))

for url, topic in URLS_TOPICS.items():
    data = get_data(url, headers)
    producer.send(topic, value=data)
    producer.flush()

print("Data sent to Kafka")