FROM nodesource/jessie:latest

ADD package.json package.json
RUN npm install --production

ADD . .
EXPOSE 8000
CMD ["npm", "start"]
