FROM node:20-alpine3.18

ARG PORT
ENV PORT=$PORT
WORKDIR  /app
COPY package*.json .

RUN npm i && npm cache clean --force
COPY . .
EXPOSE $PORT
CMD ["npm", "run",  "start:prisma"]
