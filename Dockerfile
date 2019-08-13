FROM container-registry.oracle.com/database/instantclient:12.2.0.1

ADD ol7_developer_nodejs8.repo /etc/yum.repos.d/ol7_developer_nodejs8.repo

RUN yum -y update && \
    rm -rf /var/cache/yum && \
        yum -y install nodejs

RUN mkdir -p /usr/app
RUN mkdir -p /usr/app/src

RUN npm install -g nodemon

WORKDIR /usr/app

COPY package.json package.json
COPY src/server.js src/server.js

RUN npm install
EXPOSE 3000

CMD ["npm", "start"]