FROM node:latest

WORKDIR /app
COPY . /app/

ENV PORT=5000
ENV INTERVAL=2000

RUN yarn install

CMD [ "/app/run.sh" ]
