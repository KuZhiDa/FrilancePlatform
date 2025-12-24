FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 5000
CMD [ "npm", "run", "start:dev" ]