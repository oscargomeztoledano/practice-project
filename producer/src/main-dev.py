#!/usr/bin/env python3
import time
import os
from kafka import KafkaProducer
import json
from kafka.errors import NoBrokersAvailable


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

#directorio donde están los .json
data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'data'))

for name in os.listdir(data_dir):
    if name.endswith('.json'):
       topic= os.path.splitext(name)[0] #nombre del topic
       file_path = os.path.join(data_dir, name) #ruta del archivo
    
    #leemos el archivo
    with open(file_path) as file:
        data = json.load(file)
    
    #enviamos los datos a kafka
    producer.send(topic, value=data)
    producer.flush()

print("Data sent to Kafka")
