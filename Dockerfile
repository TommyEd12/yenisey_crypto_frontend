FROM node:22-alpine

WORKDIR /yenisey_crypto_frontend

RUN apk add --no-cache libc6-compat

EXPOSE 8000

ENV PORT 8000


# Сначала скопируйте ВСЕ файлы проекта
COPY . .

COPY package.json .
COPY package-lock.json .


# Очистите кеш и переустановите зависимости (полезно для отладки проблем с модулями)
RUN npm cache clean --force
RUN rm -rf node_modules
RUN npm install --force

RUN npm run build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

CMD [ "npm", "start" ]
