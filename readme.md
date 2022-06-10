# MERN Planit App
### Where goals meet actions
By Steven Tanner Hopwood

Planit -- The place where goals become plans and actions.

Planit is an online application where users can post their goals and plans to do anything. Users goals and plans are public, so that users can get feedback on their plans, give feedback on other peoples' plans, and learn how to do anything.

___


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

### Deploy app via:
```
git push heroku master
```