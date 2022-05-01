# Amazon EC2 Toggler

## Warning

 The purpose of this project is to demostrate a silly way of reducing cost by switching off EC2 instances which is host to a backend API server by shutting it down when not in use (Not recieving any inbound HTTP requests).
The author of this project shall have neither liability nor responsibility to any person or entity with respect to any loss or damage caused, or alleged to be caused, directly or indirectly by the use of information contained here. I am an amateur computer programmer, assume that I don't know what I am talking about or doing... This project is experimental.

## Problem

When building a full stack Web Application we typically need three components, a place to holde
In startups most of the times we have multiple environments. For example, most of the time no one is using these servers are not getting used but we have to pay for keeping the EC2 instantances on. What if we can switch of the EC2 in which the API server is running as soon as we are not recieving any inbound Http traffic. This would help us save some money.

1) The single page Web Application loads from S3 bucket through the cloudfront into the browser.
2) XML HTTP requests are sent to the Expressjs server (In our case) which is running inside an E2C instance as soon as the user starts using the Web Application.
    a) If the EC2 server is down, the HTTP calls to the API server fails and then we instruct a lambda function to switch on the EC2 server.
    b) If the EC2 instance is up and serving HTTP requests we update a cron job (Amazon EventBridge) before processing each request. We instruct the Amazon EventBridge to trigger the AWS Lambda which switches of the E2C instance after 15 minutes of after the last request has been received from the front end.
    c) This way the EC2 will be switched off as soon as it stops recieving HTTP requests.

# Architecture

![Architecture](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/architecture.jpg)

# Angular Project (Frontend Web Application)

This front end Web Application was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Angular HTTP Interceptor

Angular HTTP Interceptor is Angular frontend component which intercepts all Http requests (and responses) going from the Angular Application.

# API Server

The API server is written using expressjs you can write it using any technology.
