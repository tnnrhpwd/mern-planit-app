# MERN Planit App
### Where goals meet actions

Install Backend Dependancies
```
npm install
```
Install Frontend Dependancies
```
cd frontend
npm install
```
This project is hosted on Heroku. The frontend needs to be built before deployment.
```
cd frontend
npm run build
```
Then, launch the frontend and backend servers at root via:
```
npm run dev
```

Heroku automatically creates a production build and runs the servers via:
```
npm run heroku-postbuild
```