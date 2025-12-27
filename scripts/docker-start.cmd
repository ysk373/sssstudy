docker build -t sssstudy-blog .
docker run -p 3500:3500 -p 3001:3001 --name sssstudy-container sssstudy-blog
