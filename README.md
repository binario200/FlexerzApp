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

# MongoDB Utilities
    ```
      # creating a temp mongo dump
      mkdir -p ~/tmp/mongodump

      # getting mongo data from your local mongo instance
      mongodump -h localhost:27017 -d Flexerz -o ~/tmp/mongodump

      #restoring the data to your live database
      mongorestore -h your-live-instace:port -d database-name -u user -p password ~/tmp/mongodump/Loc8r
      # to get the above required data use heroku config:get MONGODB_URI

      # connect to the live database and test the changes
      mongo hostname:port/database_name -u username -p password
    ```

# API specification with swagger

 - install swagger
 ```
 npm install -g swagger
 ```
