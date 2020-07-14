This project uses Material, React

# Running the frontend in a container
* install docker (see e.g. https://docs.docker.com/get-started/)
* navigate to project root
* $ docker build -t homer-frontend:dev .
* $ docker run -it -p 8000:8000 -v src:/usr/src/app homer-frontend:dev
* then you can access the frontend at localhost:8000