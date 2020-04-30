FROM ubuntu:16.04

RUN apt-get update && \
    apt-get install -y git curl

RUN curl -sl https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs

RUN cp /home/Universidad/TFG/ejemplos/quiz_microservicios/quiz/* /var/lib/docker/tmp/docker-builder921528113/quiz

COPY /quiz app/quiz

WORKDIR /app/quiz

RUN npm install

EXPOSE 3001

CMD node server.js