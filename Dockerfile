##########################################
## flask app
##########################################
FROM python:3.9

WORKDIR /app

COPY requirements.txt ./
RUN python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# EXPOSE 5000
