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