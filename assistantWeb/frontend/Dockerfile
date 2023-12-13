# Build
FROM node:17-alpine as builder
WORKDIR /frontend
COPY package.json .
COPY package-lock.json .
# RUN npm install react-typed --force
RUN npm install

COPY . .
RUN npm run build

# Production
FROM nginx:stable-alpine
COPY --from=builder /frontend/build /usr/share/nginx/html
Copy --from=builder /frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
ENTRYPOINT ["nginx","-g","daemon off;"]
