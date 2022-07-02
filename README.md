# Amazon EC2 Toggler

## Warning

 The purpose of this project is to demostrate a silly way of reducing cost by switching off an EC2 instance (The EC2 instance is host to an API server) when not in use (Not recieving any inbound HTTP requests). I am an amateur computer programmer, assume that I don't know what I am talking about or doing... This project is experimental... I shall have neither liability nor responsibility to any person or entity with respect to any loss or damage caused, or alleged to be caused, directly or indirectly by the use of information contained here.

## Problem statement

Bootstraped tech startups have access to limited amounts of funds; so it is very essential to cut cost. Keeping the EC2 instance (which is host to the Web Application's API server) off when not in use while building and testing a full stack Web Application using Client Side Rendering is essential to cost cutting.
</br>
A conscious developer might write a shell script to stop the EC2 instance and run it before logging off for the day or taking a snack break. But this method is not fool-proof or fully automatic.
- What if the Developer forgets to switch off the EC2 instance before logging off for the day?
- When you stop / start your EC2 instance, the IP address of that instance will change.
- What if your team consists of developers (Like Frontend Developers or UI / UX Developers) who are not savvy with Amazon Web Services? These developers might be working late into the night when the Devops engineers are away...
- What if your team consists of non-developers like testers, product managers, scrum masters, sales staff, etc. who are not savvy with AWS. They might be testing or demoing the Web Application (which is in testing / development stage) to a potential client when the Devops engineers are away from keyboard.

What if we are able to switch on the EC2 instance (host to the application's API server) as soon as a user starts using our Web Application and switch off the EC2 instance when there is no inbound HTTP traffic (that is, nobody is using the Web Application) automatically?

## Components

1) Angular2+ Application (You can use any Frontend technology, I have used Angular2+ because I am comfortable with it).
2) S3 bucket (We copy the compiled Angular2+ Application inside an S3 bucket and serve it to the user's browswer through AWS Cloudfront).
3) Angular HTTP interceptor (Every XMLHttpRequest made from within the Angular2+ Web Application propogates through this HTTP interceptor).
4) EC2 instance (This EC2 instance is host to an API server built using Expressjs).
5) Expressjs server (Serves API requests made from the frontend Angular2+ Application).
5) Lambda function (Can switch on and switch off the EC2 instance).
6) Expressjs middleware (Every XMLHttpRequest made to the express server passes through this middleware).
6) EventBridge (The expressjs server's middleware updates the cron job before processing each HTTP request, the cron job triggers the Lambda function (To switch off the EC2 instance) after 15 minutes (The time peroid is arbitary).
7) Amazon API gateway (HTTP requests made by the users from the browser to the Lambda function is routed through this API gateway).

## Architecture

![Architecture](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/architecture.jpg)
## Flow

XMLHttpRequest(s) are sent to the Expressjs API server (which is running inside an EC2 instance) as soon as a user starts using the Angular2+ Web Application.

- If the EC2 server is down, the XMLHttpRequest(s) to the API server fail. If XMLHttpRequest(s) to the API server fail, then we make an XMLHttpRequest to the Lambda function (through the API Gateway) which switches on the EC2 server.
- If the EC2 instance is up and running, and the API server is serving XMLHttpRequest(s), we update a cron job (The cron job triggers a Lamba function which switches off the EC2 server after an arbitrary time period) before processing each XMLHttpRequest.
This way the EC2 server will be switched off as soon as (15 minutes in our case) the API server stops receiving XMLHttpRequest(s).


## Drawback
The API(s) might be a little bit slow since they are editing the eventBridge on each API call...
## Setup

### Angular Project (Frontend Web Application)

This front end Web Application was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

##### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

##### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### API Server

- SSH into the EC2 server.
- Clone this repository into the EC2 server by running ```git clone https://github.com/shibisuriya/Amazon-EC2-Toggle.git```
- Change directory to API/ by running ```cd Amazon-EC2-Toggle/API```
- Run ```npm i``` to install node modules.
- Run ```npm run serve``` to start the expressjs server.
- Expose the API server to the internet from the AWS EC2 console.

### Lambda function
- Zip the files given in Lambda/ folder and upload it to AWS Lambda.
- Expose the Lambda function to the internet using the API Gateway console.

## Demo
### EC2 up and running

![EC2 up and running](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/github/EC2%20up%20and%20running.png) <br/><br/>

### EC2 down, Lambda function triggered

![Architecture](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/github/EC2%20down%2C%20Lamba%20function%20triggered.png) <br/><br/>

### Internal server error in API Server (EC2)

![Internal server errorin EC2](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/github/Internal%20Server%20Error%20in%20EC2.png) <br/><br/>

### EC2 down, internal server error in Lambda function

![EC2 down, internal server error in Lambda function](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/github/EC2%20down%2C%20internal%20server%20error%20in%20Lambda%20function.png) <br/><br/>

### Unable to reach EC2, unable to reach Lambda function

![Unable to reach EC2, unable to reach Lambda function](https://github.com/shibisuriya/Amazon-EC2-Toggle/blob/master/images/github/Unable%20to%20reach%20EC2%20unable%20to%20reach%20Lambda%20function.png) <br/><br/>

## to do for rakesh
1) continous deployment of angular application in using github action.
