FROM arm32v7/nginx:1.20.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/APM /usr/share/nginx/html