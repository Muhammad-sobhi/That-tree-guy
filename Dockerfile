FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
# Next.js usually runs on 3000 inside the container
CMD ["npm", "start"]
