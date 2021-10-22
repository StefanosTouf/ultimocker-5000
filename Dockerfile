FROM node:latest

CMD [ "/app/run.sh" ]

ENV PORT=5000 \
    INTERVAL=2000

RUN yarn install

WORKDIR /app
COPY . /app/
