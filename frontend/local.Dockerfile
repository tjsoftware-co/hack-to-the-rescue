FROM node:18-alpine

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 5173

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

CMD ["npm", "start"]
