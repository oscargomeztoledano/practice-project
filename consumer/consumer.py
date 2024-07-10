from kafka import KafkaConsumer
from pymongo import MongoClient
import json

#variables de mongo
username= 'oscar'
password= 'pass'
database_name= 'euro2024'


#kafka 
kafka_topics=['players', 'teams', 'matches', 'groups']
consumer = KafkaConsumer(
    *kafka_topics,
    out_offset_reset='earliest',
    bootstrap_servers=['kafka:9092'],
    group_id='group-consumer',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

#conexion con mongo
mongo_client= MongoClient(f'mongodb://{username}:{password}@mongo:27017/{database_name}?authSource=admin')
db= mongo_client[database_name]


#funcion para insertar/actualizar (si ya existen) los datos en la db por coleccion/topic 

def process(message):
    data=message.value
    collection= db[message.topic]
    collection.update_one({'_id': data['_id']}, {'$set': data}, upsert=True)


for message in consumer:
    process(message)