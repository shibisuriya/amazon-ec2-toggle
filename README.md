# Amazon EC2 Toggler

## Warning

 The purpose of this project is to demostrate a silly way of reducing cost by switching off an EC2 instance (The EC2 instance is host to an API server) when not in use (Not recieving any inbound HTTP requests). I am an amateur computer programmer, assume that I don't know what I am talking about or doing... This project is experimental... I shall have neither liability nor responsibility to any person or entity with respect to any loss or damage caused, or alleged to be caused, directly or indirectly by the use of information contained here.

## Problem

We are charged for the duration for which we keep our EC2 instances active. In small startups cost cutting is essential
When building a full stack Web Application we typically need three components, a place to holde
In startups most of the times we have multiple environments. For example, most of the time no one is using these servers are not getting used but we have to pay for keeping the EC2 instantances on. What if we can switch of the EC2 in which the API server is running as soon as we are not recieving any inbound Http traffic. This would help us save some money.

## Components

1) Angular2+ Web Application (You can use any Frontend technology, I have used Angular2+ because I am comfortable with it).
2) S3 bucket (We copy the compiled Angular2+ Application inside an S3 bucket so that it can be served as a website through cloudfront).
3) Angular HTTP interceptor (Every XHR request made from within the Angular2+ Web Application goes through this HTTP interceptor)
4) EC2 instance (This EC2 instance is host to an expressjs server).
5) Expressjs server (Serves API requests made from the frontend Angular2+ Application)
5) Lambda function (Can switch on and switch of the EC2 instance).
6) expressjs middleware (Every XHR request made to the express server passes through this middleware).
6) EventBridge (The expressjs server's middleware updates the cron job to excute the Lambda function (To switch of the EC2 instance) after 15 minutes (The time peroid is arbitary) before processing each HTTP request).
7) Amazon API gateway (Http requests to the Lambda function is routed through this API gateway).

## Flow

1) XML HTTP requests are sent to the Expressjs server which is running inside an E2C instance as soon as the user starts using the Web Application.
2) If the EC2 server is down, the HTTP calls to the API server will fail, if the HTTP calls to the API server fails, then we make a http request to the Lambda function asking it to switch on the EC2 instance.
3) If the EC2 instance is up and serving HTTP requests we update a cron job (Amazon EventBridge) before processing each request. We instruct the Amazon EventBridge to trigger the AWS Lambda function which switches off the E2C instance after 15 minutes (The time peroid is arbitary) after the last request has been received from the front end.
c) This way the EC2 will be switched off as soon as it stops recieving HTTP requests (15 minutes in our case).

# Architecture

![Architecture](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/architecture.jpg)

# Setup

## Angular Project (Frontend Web Application)

This front end Web Application was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## API Server

Run `npm i` to install node modules.
Run `npm run serve` to start the expressjs server.

# Lambda function

## Demo
### EC2 up and running

![EC2 up and running](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/github/EC2%20up%20and%20running.png) \\

### EC2 down, Lambda function triggered

![Architecture](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/github/EC2%20down%2C%20Lamba%20function%20triggered.png) \\ 

### Internal server error in API Server (EC2)

![Internal server errorin EC2](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/github/Internal%20Server%20Error%20in%20EC2.png) \\ 

### EC2 down, internal server error in Lambda function

![EC2 down, internal server error in Lambda function](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/github/EC2%20down%2C%20internal%20server%20error%20in%20Lambda%20function.png) \\

### Unable to reach EC2, unable to reach Lambda function

![Unable to reach EC2, unable to reach Lambda function](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/github/Unable%20to%20reach%20EC2%20unable%20to%20reach%20Lambda%20function.png) \\


