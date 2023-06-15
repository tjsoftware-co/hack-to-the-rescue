# 1st Stage
# Build React App static files
FROM node:18-alpine AS builder
RUN mkdir -p /app
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

# 2nd Stage
# Use nginx to server static files
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY --from=0 /app/src/assets /usr/share/nginx/html/assets
WORKDIR /usr/share/nginx/html
