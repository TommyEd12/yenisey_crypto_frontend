FROM node:16.17.0-alpine3.15
WORKDIR /yenisey_crypto_frontend
COPY . .


RUN --mount=type=cache,id=npm,target=/npm/store npm install --prod --frozen-lockfile


RUN --mount=type=cache,id=npm,target=/npm/store npm install --frozen-lockfile
RUN npm run build


USER root
COPY --from=prod-deps /yenisey_crypto_frontend/node_modules /yenisey_crypto_frontend/node_modules
COPY --from=build /yenisey_crypto_frontend/.next /yenisey_crypto_frontend/.next
EXPOSE 8000
CMD [ "npm", "start" ]