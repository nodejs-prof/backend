FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

ENV foo dv
# Bundle app source
COPY . /usr/src/app

# EXPOSE 3000
CMD [ "npm", "run", "my-build" ]