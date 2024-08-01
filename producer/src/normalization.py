import requests
from collections import collection
# Función para obtener los datos de la API
def get_data(url, headers):
    response = requests.get(url, headers=headers)
    print(response.status_code)
    return response.json()

# Función para obtener el valor por defecto si el key no existe o es None
def get_with_default(data,key,default_value):
    value=data.get(key, default_value)
    return value if value else default_value

# Función para normalizar los datos generales
def normalize_data(data,required_fields,default_fields):
    norm_data={}

    for key in required_fields:
        if key not in data or not data[key]:
            raise ValueError(f"Key {key} not found in data is required")
        norm_data[key]=data[key]
    
    for key, default_value in default_fields.items():
        norm_data[key]= get_with_default(data,key,default_value)
    
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

# Función para normalizar los datos de los partidos, lo hacemos separado por que tenemos que normalizar los eventos
def normalize_match(match):
    required_fields= collection["matches"]["required_fields"]
    default_fields= collection["matches"]["default_fields"]
    norm_data=normalize_data(match,required_fields,default_fields)
    norm_data["matchEvents"]=[normalize_event(event) for event in match.get("matchEvents",[])]
    return norm_data

# Excepción personalizada para manejar casos donde falta el ID
class MissingIDError(Exception):
    """Excepción personalizada para manejar casos donde falta el ID"""
    pass