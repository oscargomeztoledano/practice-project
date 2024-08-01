# Definimos la estructura de los datos que vamos a normalizar
collection = {
    "players": {
        "required_fields": ["_id"],
        "default_fields": {
            "name": "",
            "team": {"_id": ""},
            "position": "",
            "age": 0,
            "dateOfBirth": "",
            "goals": 0,
            "assists": 0,
            "appearances": 0,
            "minutesPlayed": 0,
            "yellowCards": 0,
            "redCards": 0
        }
    },
    "teams": {
        "required_fields": ["_id"],
        "default_fields": {
            "name": "",
            "players": [{"_id": ""}],
            "coach": "",
            "captain": "",
            "championships": 0,
            "runnersUp": 0,
            "group": {"_id": ""},
            "imageUrl": ""
        }
    },
    "matches": {
        "required_fields": ["_id"],
        "default_fields": {
            "number": 0,
            "stage": "",
            "date": "",
            "minutesCompleted": 0,
            "description": "",
            "isFinished": False,
            "teamA":{"score":0,"lineup":{"formation":".-.-.-.","players":[{"player":"","status":""}]},"team":{"_id":""}},
            "teamB":{"score":0,"lineup":{"formation":".-.-.-.","players":[{"player":"","status":""}]},"team":{"_id":""}},
            "matchEvents":[],
            "winningTeam": "",
            "stadium": "",
            "city": ""
        }
    },
    "groups": {
        "required_fields": ["_id"],
        "default_fields": {
            "name": "",
            "teams": [{"team": {"_id": "", "points": 0, "matchesPlayed": 0, "wins": 0, "draws": 0, "losses": 0, "goalsScored": 0, "goalsConceded": 0, "goalDifference": 0}}],
            "matches": [{"_id": ""}]
        }
    }
}