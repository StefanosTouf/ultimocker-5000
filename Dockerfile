FROM node:latest as builder

WORKDIR /src
COPY package.json . 

RUN yarn install

FROM node:latest

CMD [ "/app/run.sh" ]

ENV PORT=5000 \
    INTERVAL=2000

WORKDIR /app
COPY --from=builder /src/node_modules /app/node_modules
COPY src/ .
