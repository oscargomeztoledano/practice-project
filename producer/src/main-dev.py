#!/usr/bin/env python3
import time
import os
from kafka import KafkaProducer
import json
from kafka.errors import NoBrokersAvailable
from data_collections import collection
from normalization import normalize_data, normalize_match


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
       norm_data=[]
    
    #leemos el archivo
    with open(file_path) as file:
        data = json.load(file)

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

    # producer.send(topic, value=norm_data)

    # Verificar si se envia algo
    metadata = producer.send(topic, value=norm_data).get()
    if metadata:
        print(f"Mensaje enviado a Kafka. Offset: {metadata.offset}, Partition: {metadata.partition}")
    else:
        print("Error al enviar el mensaje a Kafka")
    producer.flush()
   

print("Data sent to Kafka")
