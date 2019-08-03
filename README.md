# Boilerplate Nomonichas Apollo, Express and MySQL
![travis build](https://img.shields.io/travis/gbili/bp-nomonichas-apollo-express.svg?style=flat-square)
![code coverage](https://img.shields.io/codecov/c/github/gbili/bp-nomonichas-apollo-express.svg)
![version](https://img.shields.io/npm/v/bp-nomonichas-apollo-express.svg)
![downloads](https://img.shields.io/npm/dm/bp-nomonichas-apollo-express.svg)
![license](https://img.shields.io/npm/l/bp-nomonichas-apollo-express.svg)

> A working base setup in July 2019 using Nodejs, Mocha, Nyc, Istanbul, Chai, Semantic-Release, Travis-ci, Codecov.io, Apollo and Express

> **Note**: About Travis and Codecov.io, if you are developing a private project, it may make sense to switch to other services like CircleCi and something to replace codecov.io if you are on a tight budget.

## Usage
Create a repo on github.com / bitbucket.com and use that name in place of `your-project-name`.
Clone this repo into your computer
```
$ git clone git@github.com:gbili/bp-nomonichas-apollo-express your-project-name
$ git remote remove origin
$ git remote add origin git@github.com:your-name/your-project-name
```

Then change the name.
```
vim package.json
:.,$s/bp-nomonichas-apollo-express/your-project-name/g <enter>
:.,$s/gbili/your-name/g <enter>
:wq
```

Adapt the code in `src/` and `test/`

Create a database and add the connection settings to the `.env` file like so:
```
DB_HOST=localhost
DB_USER=myuser
DB_PASSWORD=mypwd
DB_NAME=dbname
```
This will let the database undump command create the appropriate table. Of course you should then adapt the models and `schema.sql` table definitions to your own domain.
For your tests you should create a separate database and pass the credentials through the .env file as well:
```
TEST_DB_HOST=localhost
TEST_DB_USER=test_user
TEST_DB_PASSWORD=test_password
TEST_DB_NAME=dbname_test
```
To create the database and users in MySQL run:
```
$ mysql -u root -p
$ ***** # enter your password

$ mysql> create database dbname_test;
$ mysql> create user 'test_user'@'localhost' identified by 'test_password';
$ mysql> ALTER USER 'test_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'test_password'
$ mysql> grant all on dbname_test.* to 'user_test'@'localhost';
$ mysql> flush privileges;
```

Then initialize and build
```
npm init
npm install
npm run build
```

Once installed, you can run:
```
npm run db:undump
```
Which should create the required tables defined in `schema.sql`.

Finally make commit and push changes
```
git commit -Am "feat: setup base project"
git push origin master
```
