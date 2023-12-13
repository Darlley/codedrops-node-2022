FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4002

CMD ["npm", "run", "dev"]