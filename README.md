# User Management API
Simple User management API with express and mongodb

## Prequities and Libraries
---
- `ExpressJs` as framework
- `MongoDB` as database
- `JWT` for API security
- `OpenAPI` for API Spesification

## Configure
---
- Use `.env` for save global variable
    - set `PORT`
    - set `MONGODB URI` to connect database
    - set `JWT_TOKEN` for user login token
    - set `JWT_TOKEN_REFRESH` for user login refresh token
    - set `JWT_TOKEN_RESET_PASSWORD` for reset password token
    - set SMTP
        - `EMAIL_SERVICE` for email provider like gmail, yahoo, etc
        - `EMAIL_USER` for user email
        - `EMAIL_PASS` for user password

## Run and Installation
---
Installing app
```
npm install
```

Running app with
```
npm start
```

## API Documentation
open API spec in `docs/apispec.json` but if you run on local you can go to
```
http://localhost:3000/api/v1/
```

## Pattern
use `MVC` for default pattern
```
controllers
-- file_controller.js
models
-- file_model.js
app.js
index.js
```