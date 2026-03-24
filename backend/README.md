# Backend for UX Hell application

This is the backend for the UX Hell application. Instructions on how to run the application can be found below.

## Setup and Run

Navigate to the [backend](./) directory and run the following command:

```bash
docker-compose up --build
```

the maven clean package is contained within the Dockerfile, so you only need to build the Docker image to set everything up.

## Usage

The health check endpoint is available at: http://localhost:8080/health

All endpoints are documented at: http://localhost:8080/swagger-ui.html
