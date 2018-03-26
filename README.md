# TheUltimateGame
As it's name suggests, this is the ultimate JavaScript RPG: A quest for love, for loyalty, for redemption. 

## Downloading This Application
To use this application:

1. Ensure that Node.js, npm, and MySQL are installed on your machine. For instructions, see the Technologies Used section below.
- Next, clone this repo to your local machine:
```
git clone git@github.com:stoversa/TheUltimateGame.git
```
2. Open the repo and execute in the bash terminal. Doing so should install the cTable, inquirer, and MySQL npm packages:
```
npm i
```

3. Open up MySQL in the terminal:
```
mysql -u root -p
```

5. Enter the following command to create your database:
```
source schema.sql
```

6. Exit MySQL
```
exit
```

7. Update the config.json file with your MySQL database credentials. Failing to do this will not allow the application to run properly.

8. Run the application from the command line:
```
node server.js
```