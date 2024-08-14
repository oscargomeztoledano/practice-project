import requests
from data_collections import collection
from datetime import datetime

# Función para obtener los datos de la API
def get_data(url, headers):
    response = requests.get(url, headers=headers)
    return response.json()

# Función para obtener el valor por defecto si el key no existe o es None
def get_with_default(data,key,default_value):
    value=data.get(key, default_value)
    return value if value else default_value

# Función para normalizar los datos generales
def normalize_data(data, required_fields, default_fields):
    norm_data = {}
    for key in required_fields:
        if key not in data or not data[key]:
            raise ValueError(f"Key {key} not found in data is required")
        norm_data[key] = data[key]

    for key, default_value in default_fields.items():
        if isinstance(default_value, list) and len(default_value) > 0 and isinstance(default_value[0], dict):
            # Si el valor por defecto es una lista de dicts, normalizamos cada dict en la lista
            norm_data[key] = []
            for item in data.get(key, []):
                norm_item = {}
                for sub_key, sub_default_value in default_value[0].items():
                    if isinstance(sub_default_value, dict):
                        norm_item[sub_key] = {}
                        for sub_sub_key, sub_sub_default_value in sub_default_value.items():
                            norm_item[sub_key][sub_sub_key] = get_with_default(item.get(sub_key, {}), sub_sub_key, sub_sub_default_value)
                    else:
                        norm_item[sub_key] = get_with_default(item, sub_key, sub_default_value)
                norm_data[key].append(norm_item)
        elif isinstance(default_value, dict):
            # Si el valor por defecto es un dict, normalizamos cada sub-campo del dict
            norm_data[key] = {}
            for sub_key, sub_default_value in default_value.items():
                if key in ["teamA", "teamB"] and sub_key == "team":
                    # Si estamos en teamA.team o teamB.team, solo tomamos el _id del data
                    norm_data[key][sub_key] = {"_id": get_with_default(data.get(key, {}).get(sub_key, {}), "_id", sub_default_value["_id"])}
                else:
                    if isinstance(sub_default_value, dict) and "_id" in sub_default_value:
                        # Si el sub-campo es un dict que contiene _id, solo tomamos el _id del data
                        norm_data[key][sub_key] = get_with_default(data.get(key, {}), "_id", sub_default_value["_id"])
                    else:
                        norm_data[key][sub_key] = get_with_default(data.get(key, {}), sub_key, sub_default_value)   
        else:
            norm_data[key] = get_with_default(data, key, default_value)
        # Normalizar la fecha de nacimiento para que solo guarde la parte YYYY-MM-DD
        if "dateOfBirth" in norm_data:
            try:
                norm_data["dateOfBirth"] = datetime.strptime(norm_data["dateOfBirth"], "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
            except ValueError:
                norm_data["dateOfBirth"] = norm_data["dateOfBirth"].split("T")[0]  # En caso de error, solo se queda con la parte de la fecha.
        
        
    return norm_data

# Función para normalizar los datos de los eventos de los partidos (item,field,default)
def normalize_event(event):
    event_fields= {
        "minute":get_with_default(event,"minute",0),
        "type":get_with_default(event,"type",""),
        "team":get_with_default(event,"team",""),
        "details":get_with_default(event,"subType","")
    }
    if event_fields["type"]=="goal":
        event_fields["scoringPlayer"]=get_with_default(event,"scoringPlayer","")
        event_fields["assistingPlayer"]=get_with_default(event,"assistingPlayer","")    
    if event_fields["type"]=="card":
        event_fields["cardColor"]=get_with_default(event,"cardColor","unknown")
        event_fields["bookedPlayer"]=get_with_default(event,"bookedPlayer","")
    if event_fields["type"]=="substitution":
        event_fields["joiningPlayer"]=get_with_default(event,"joiningPlayer","")
        event_fields["leavingPlayer"]=get_with_default(event,"leavingPlayer","")
    return event_fields
# Función para normalizar los datos de los partidos, lo hacemos separado por que tenemos que normalizar los eventos
def normalize_match(match):
    required_fields = collection["matches"]["required_fields"]
    default_fields = collection["matches"]["default_fields"]
    norm_data = normalize_data(match, required_fields, default_fields)

    # Normalizar la fecha para que solo guarde la parte YYYY-MM-DD
    if "date" in norm_data:
        try:
            norm_data["date"] = datetime.strptime(norm_data["date"], "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
        except ValueError:
            norm_data["date"] = norm_data["date"].split("T")[0]  # En caso de error, solo se queda con la parte de la fecha.
    norm_data["matchEvents"] = [normalize_event(event) for event in match.get("matchEvents", [])]
    return norm_data

# Excepción personalizada para manejar casos donde falta el ID
class MissingIDError(Exception):
    """Excepción personalizada para manejar casos donde falta el ID"""
    pass