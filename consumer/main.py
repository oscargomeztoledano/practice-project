from kafka import KafkaConsumer
from pymongo import MongoClient
import json
import time
from kafka.errors import NoBrokersAvailable

# Variables de MongoDB
username = 'oscar'
password = 'pass'
database_name = 'euro2024'

# Kafka topics
kafka_topics = ['players', 'teams', 'matches', 'groups']

# Esperar antes de intentar conectar a Kafka y MongoDB
time.sleep(20)

# Conexión con Kafka a través del listener del contenedor de Kafka
while True:
    try:
        consumer = KafkaConsumer(
            *kafka_topics,
            auto_offset_reset='earliest',
            bootstrap_servers=['kafka:9092'],
            group_id='group-consumer',
            value_deserializer=lambda x: json.loads(x.decode('utf-8'))
        )
        break
    except NoBrokersAvailable:
        print("NoBrokersAvailable: Waiting for Kafka...")
        time.sleep(5)

def process(message):
    for data in message.value:
        if isinstance(data, dict) and '_id' in data:
            collection = db[message.topic]
            collection.update_one({'_id': data['_id']}, {'$set': data}, upsert=True)

mongo_client = MongoClient(f'mongodb://{username}:{password}@mongodb:27017/{database_name}?authSource=admin')
db = mongo_client[database_name]

for message in consumer:
    process(message)
