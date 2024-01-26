#!/bin/sh

export APP_MODULE=${APP_MODULE-app.main:app}
export HOST=${HOST:-0.0.0.0}
export PORT=${PORT:-8181}

# http
exec uvicorn --reload --host $HOST --port $PORT "$APP_MODULE"

# https sunsetserver.mooo.com SSL for Free 
#exec uvicorn --reload --host $HOST --port $PORT "$APP_MODULE" --ssl-keyfile=./key.pem --ssl-certfile=./cert.pem

# https local cert
#exec uvicorn --reload --host $HOST --port $PORT "$APP_MODULE" --ssl-keyfile=./key.pem --ssl-certfile=./cert.pem
