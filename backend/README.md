# Backend for UX Hell application

This is the backend for the UX Hell application. Instructions on how to run the application can be found below.

## Setup and Run

1. Navigate to the [backend](./) directory
2. Create a file ```.env```
3. Copy the contents from [.example_env](./.example_env) into ```.env``` and follow the instructions in that file
4. Run the following command:

```bash
docker-compose up --build
```

the maven clean package is contained within the Dockerfile, so you only need to build the Docker image to set everything up.

## Usage

The health check endpoint is available at: http://localhost:8080/health

All endpoints are documented at: http://localhost:8080/swagger-ui.html
