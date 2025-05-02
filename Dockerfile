FROM node:20
WORKDIR /workspace

RUN npm install -g pnpm
RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/ysk373/sssstudy /main
WORKDIR /main

RUN pnpm install

EXPOSE 3500

RUN pnpm astro telemetry disable

ENTRYPOINT ["pnpm", "run"]
CMD ["dev"]
