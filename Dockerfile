FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /yenisey_crypto_frontend
COPY . .

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
USER root
COPY --from=prod-deps /yenisey_crypto_frontend/node_modules /yenisey_crypto_frontend/node_modules
COPY --from=build /yenisey_crypto_frontend/.next /yenisey_crypto_frontend/.next
EXPOSE 8000
CMD [ "pnpm", "start" ]