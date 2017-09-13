FROM node:8.4.0
RUN adduser node root
COPY . /home/node/app
WORKDIR /home/node/app

RUN npm install

RUN chmod -R 777 /home/node/app
RUN chown -R node:root /home/node/app

EXPOSE 8000

USER 1000

CMD [ "npm", "start" ]
