#!/bin/sh

export APP_MODULE=${APP_MODULE-app.main:app}
export HOST=${HOST:-0.0.0.0}
export PORT=${PORT:-8181}

#exec uvicorn --reload --host $HOST --port $PORT "$APP_MODULE"
exec uvicorn --reload --host $HOST --port $PORT "$APP_MODULE" --ssl-keyfile=./key.pem --ssl-certfile=./cert.pem
