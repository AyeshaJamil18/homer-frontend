# homer-frontend application

homer-backend application can be found [here](https://github.com/AyeshaJamil18/homer-backend)

## Prerequisites

Both for the back end and front end application check

* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

## Local setup

Go to your project root folder via command line
```
cd path/to/homer-frontend
```

**Install node dependencies**

```
npm install
```


**Start the project**

```bash
npm start
```
Then you can access the frontend at localhost:8000

## Running the frontend in a container
* Install docker (see e.g. https://docs.docker.com/get-started/)
* Navigate to project root
* run 
```bash
docker build -t homer-frontend:dev .
```
* run 
```bash
cd ..
docker run -it -p 8000:8000 --rm -v homer-frontend:/app -e CHOKIDAR_USEPOLLING=true homer-frontend:dev
```
* Then you can access the frontend at localhost:8000

