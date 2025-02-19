### Backend Service - Temperature view on MapView using the MapBox (Nodejs v18.17.0, Npm v9.6.7, Docker version 20.10.12, minikube version: v1.35.0 - Ensure that you need to install these packages)
----------

Install steps
    
    1. Make a copy of sample.env file as a .env (`cp sample.env .env`)
    2. Make sure all the variables are created in .env
    3. Run `minikube start`
    4. Run `docker build -t node-app:latest .`
    5. Run `kubectl apply -f k8s/` -> you can check deployment.yaml and service.yaml files inside the `k8s` directory
    6. Run `minikube service node-app-service`. Now yo can see the application running URL. and it will be open in the browser. And update the APP_HOST variable in the environment variable file
    7. Use the Swagger API documentation to check the APIs and calls as well (http://localhost:3004/api-docs) (Please update the APP_HOST variable in .env while running on the kubernetes)

----------  
[Swagger API Documentation](http://localhost:3004/api-docs) : (http://localhost:3004/api-docs)
### NPM scripts

- `npm run build` - build application
- `npm start`     - run application
- `npm run test`  - run Jest test 
- `npm run test <FILE_PATH_HERE>` - run test for single file

----------
