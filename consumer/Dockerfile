FROM python:3.11

WORKDIR /app

COPY requirements.txt .

RUN pip install git+https://github.com/dpkp/kafka-python.git

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "-u", "main.py"]