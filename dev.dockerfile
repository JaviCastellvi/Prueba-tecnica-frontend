# base image
FROM node:12.20.0
MAINTAINER Manu Barrios<javier.castellvi.vera@gmail.com>

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add .bin to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install package.json (o sea las dependencies)
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@13.0.0 

# add app
COPY . /usr/src/app

# start app
CMD ng serve --host 0.0.0.0