FROM node:22-alpine

RUN apk add --no-cache libc6-compat

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV production 

WORKDIR /home/nextjs/app

COPY package.json .
COPY package-lock.json .

# Очистите кеш и переустановите зависимости (полезно для отладки проблем с модулями)
RUN npm cache clean --force
RUN rm -rf node_modules
RUN npm install --force

COPY . .  # Копируйте все файлы, включая jsconfig.json или tsconfig.json

RUN npm run build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

CMD [ "npm", "start" ]
