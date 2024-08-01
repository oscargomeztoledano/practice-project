#!/usr/bin/env python3
import time
import requests
from kafka import KafkaProducer
import json
from kafka.errors import NoBrokersAvailable
from config import URLS_TOPICS, headers
from collections import collection
from normalization import get_data, normalize_data, normalize_match, MissingIDError

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
    data = get_data(url, headers)   # Obtenemos los datos de la API
    norm_data=[]
    for item in data:
        try:
            if topic == "matches":
                norm_item = normalize_match(item) # Normalizamos los datos de los partidos
            else:
                required_fields = collection[topic]["required_fields"]
                default_fields = collection[topic]["default_fields"]
                norm_item = normalize_data(item, required_fields, default_fields)   # Normalizamos los datos generales
            norm_data.append(norm_item) # Agregamos los datos normalizados a la lista
        except ValueError as e:  # Manejamos el error de que falta un campo requerido
            print(e)
            continue

producer.send(topic, value=data)
producer.flush()

print("Data sent to Kafka")