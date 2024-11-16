ARG NODE_VERSION=20.9
ARG VERSION=1.0.0
ARG NODE_ENV=production

FROM node:${NODE_VERSION} AS base
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

LABEL vendor="NhanVo - The August"
LABEL license=MIT \
  version=$VERSION

ENV NODE_ENV $NODE_ENV

# Download the required packages for production
# If building code for production
# RUN npm ci --only=production
# RUN npm install --only=production
RUN apt-get install -y tzdata
RUN npm install