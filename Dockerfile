FROM node:20-slim AS base
WORKDIR /yenisey_crypto_frontend
COPY . .

FROM base AS prod-deps
RUN --mount=type=cache,id=npm,target=/npm/store npm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=npm,target=/npm/store npm install --frozen-lockfile
RUN npm run build

FROM base
USER root
COPY --from=prod-deps /yenisey_crypto_frontend/node_modules /yenisey_crypto_frontend/node_modules
COPY --from=build /yenisey_crypto_frontend/.next /yenisey_crypto_frontend/.next
EXPOSE 8000
CMD [ "npm", "start" ]