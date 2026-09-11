FROM node:alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache gettext

WORKDIR /app

EXPOSE 4200

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/floreria-ecommerce/browser /usr/share/nginx/html
COPY ["entrypoint.sh", "/entrypoint.sh"]
RUN dos2unix /entrypoint.sh
ENTRYPOINT ["sh", "/entrypoint.sh"]
