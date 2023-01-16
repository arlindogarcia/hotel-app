FROM node:14-alpine

# ENV PORT 3000
RUN apk update && apk add npm jq

# Create app directory
RUN mkdir -p /app
WORKDIR /app
#RUN npm i -g yarn

# Installing dependencies
COPY package*.json .
COPY yarn.lock .
RUN yarn

# Copying source files
COPY . .
RUN yarn build

FROM nginx:stable-alpine
RUN apk update && apk add npm jq
RUN mkdir -p /var/www
WORKDIR /var/www
COPY --from=0 /app ./
COPY docker-entrypoint.sh /
COPY docker_files/nginx.conf /etc/nginx/nginx.conf

# Building app
#RUN npm run build
EXPOSE 80
ENTRYPOINT [ "/docker-entrypoint.sh" ]

# Running the app
CMD ["nginx", "-g", "daemon off;"]
