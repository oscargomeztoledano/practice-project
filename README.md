
# Proyecto de las prácticas en HPE CDS
------

En este repositorio va a contener toda la arquitectura, desde la obtención de datos de la API hasta la appweb.

## 1. Ingesta de datos. Python, kafka y mongo.

En esta parte vamos a obtener los datos de una [API con datos de la euro2024](https://rapidapi.com/yuvr99-WHTEITBQbOc/api/euro-20242) con un productor de kafka escrito en python. Posteriormente vamos a inyectar esos datos en una base de datos de mongo con un consumidor de kafka escrito en python.

Todo lo mencionado irá en sus respectivos contenedores teniendo en este apartado un total de 5 contenedores: zookeeper, kafka, mongo, producer and consumer.

Para el producer y el consumer será estrictamente necesario bajar las imagenes de mi [repo público](https://hub.docker.com/repository/docker/oscargomeztoledano/oscargomezpracticas/general), las imagenes de kafka, zookeeper y mongo ya estan especificadas en el docker-compose.
------

## 2. APPWEB con nodejs, expressjs y reactjs.

En esta parte vamos a desarrollar una APPWEB, que contará con un backend que obtendrá información de la base de datos de mongo en función de las peticiones que reciba del frontend. 

En principio esta parte contará con dos contenedores (backend y frontend).
------

## 3. Como ejecutar el proyecto.

    1. ...
    2. ...
    3. ...


