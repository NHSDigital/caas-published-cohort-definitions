# Cohort API Mock Server

## Running the mock server directly

Run `npm start` to get a mock server with two initial cohorts.

## Running the mock server via docker

`docker build -t sandbox .`

`docker run -dp 127.0.0.1:4040:4040 sandbox`

Access the apollo server as normal using localhost:4040
