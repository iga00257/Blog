# 使用官方Node.js运行时作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# 安装所有依赖（包括开发依赖，因为构建时需要）
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 构建应用
RUN pnpm run build

# 清理开发依赖，只保留生产依赖
RUN pnpm prune --prod

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"] 