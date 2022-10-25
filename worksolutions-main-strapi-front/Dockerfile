FROM node:14-slim

WORKDIR /usr .

RUN apt update && apt install bash python g++ make git libxi6 libgconf-2-4 libgl1-mesa-glx libgl1-mesa-dri -y && rm -rf /var/cache/apt/*

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "server" ]
