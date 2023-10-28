FROM node:20

WORKDIR /home/node/app

COPY package*.json .

RUN npm install

COPY . .

RUN apt-get update && \
    apt-get install -y wget

ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

ENTRYPOINT [ "dockerize", "-wait", "tcp://mysql:3306", "-timeout", "20s", "docker-entrypoint.sh" ]

CMD [ "node", "server.js" ]
