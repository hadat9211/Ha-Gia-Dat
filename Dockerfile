FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:20-alpine AS install-deps
WORKDIR /app
COPY --from=build /app/package.json ./package.json
RUN npm install --omit=dev --ignore-scripts
RUN npm i swagger-jsdoc

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/docs ./dist/docs
COPY --from=install-deps /app/node_modules ./node_modules

CMD ["node", "dist/main.js"]
