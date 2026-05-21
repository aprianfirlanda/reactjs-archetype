FROM nginx:mainline-alpine

ENV NGINX_ROOT_DOCUMENT=/usr/share/nginx/html

WORKDIR $NGINX_ROOT_DOCUMENT

RUN rm -rf ./*

COPY apps/dashboard/dist/ .
COPY apps/dashboard/.nginx/nginx.template.conf /etc/nginx/templates/default.conf.template

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost:80 || exit 1
