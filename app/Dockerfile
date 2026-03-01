FROM public.ecr.aws/docker/library/node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
# 国内网络更稳：如不需要可删除下一行
RUN npm config set registry https://registry.npmmirror.com
RUN npm install

FROM public.ecr.aws/docker/library/node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM public.ecr.aws/docker/library/node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
