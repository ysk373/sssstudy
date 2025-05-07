FROM node:20
WORKDIR /app

# 必要なツールをインストール
RUN npm install -g pnpm
RUN apt-get update && apt-get install -y git

# package.jsonとlock fileをコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係をインストール
RUN pnpm install

# 残りのファイルをコピー（.dockerignoreでnode_modulesなどは除外）
COPY . .

# Astroのテレメトリを無効化
RUN pnpm astro telemetry disable

# ポートを公開
EXPOSE 3500 3001

# 起動コマンド（コマンドはdocker-composeから上書き可能）
ENTRYPOINT ["pnpm", "run"]
CMD ["dev"]