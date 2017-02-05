# FlexerzApp
Web App for flexers. Find where to use your flexer card, at your neigborhood, your town...


# Deployment to Heroku

 - Create an account and/or log in (Heroku)[http://heroku.com]
 - Download the (Heroku CLI)[http://toolbelt.heroku.com]
 - Logging in to Heroku using the terminal
    ```
    #using same heroku login user and password
    heroku login

    ```
 - Crate the heroku app for the FlexerzApp
    ```
    heroku apps:create flexerzapp

    ```

 - Adding the mongodb to heroku app

    ```
    heroku addons:add mongolab

    # testing the mongolab
    heroku addons:open mongolab

    # Getting the mongodb URI connection
    heroku config:get MONGODB_URI    
    # save the mongodb uri and save it to where you make the connection

    ```
 - Deploy the application.
    ```
    git push heroku master

    ```
 - Ensuring that at least one instane of the app is running
    ```
    heroku ps:scale web=1

    heroku open

    ```

# API specification with swagger

 - install swagger
 ```
 npm install -g swagger
 ```
