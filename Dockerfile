FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/orden-trabajo/ /usr/share/nginx/html
RUN mv /usr/share/nginx/html/browser/* /usr/share/nginx/html/

# Configura la zona horaria
RUN ln -sf /usr/share/zoneinfo/America/Santiago /etc/localtime && echo "America/Santiago" > /etc/timezone
