# Ultimocker
A simple containerized application for mocking active routes and pinging, usefull as a quick to set up, and disposable testing utility.

## Getting started

On the root directory, run:
```
docker build -t ultimocker .
```
Then create the container with:
```
docker create -e PORT=<port> -e INTERVAL=<interval> --name <name> --network host ultimocker
```
where:
* port = exposed port for the app's routes
* interval = the interval between every ping, in milliseconds

Then pass the appropriate configuration:
```
docker cp .\config.json <name>:/app/config.json
```
config.json has the form of:
```json
{
  //routes to ping
  "ping":["https://example.com","https://otherexample.com"],
  //exposed routes to get pinged at
  "get-pinged":["/route/01","/route/02"]
}
```
Finnaly, start the service:
```
docker start <name>
```

Ultimocker will then set up the configured routes

*container logs:*
```
Registering route /route/01
Registering route /route/02
Ultimocker-5000 initiating in port: 5000. Prepare...
Received request in /route/01
Received request in /route/02
```

and will also start pinging
*container logs:*
```
Pinging https://example.com
Pinging https://otherexample.com
Success
Success
Pinging https://example.com
Pinging https://otherexample.com
Success
Success
```
