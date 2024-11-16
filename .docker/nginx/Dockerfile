FROM nginx:latest

COPY .docker/nginx/nginx.conf /etc/nginx/nginx.conf

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

# Expose the port 80
EXPOSE 80