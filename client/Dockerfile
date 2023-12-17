FROM node:21-alpine

WORKDIR /var/www/client
COPY . .
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]