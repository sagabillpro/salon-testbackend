# Build Stage
FROM node:18.8.0 AS Build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install 
RUN npm run build 
RUN npm prune --production

FROM node:18-alpine3.15
WORKDIR /app
COPY --from=Build /app/dist/ ./
COPY --from=Build /app/node_modules/ ./node_modules/
CMD ["node","index.js"]