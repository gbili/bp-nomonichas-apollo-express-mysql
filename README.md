# Nomonichas
![travis build](https://img.shields.io/travis/gbili/bp-nomonichas-apollo-express.svg?style=flat-square)
![code coverage](https://img.shields.io/codecov/c/github/gbili/bp-nomonichas-apollo-express.svg)
![version](https://img.shields.io/npm/v/bp-nomonichas-apollo-express.svg)
![downloads](https://img.shields.io/npm/dm/bp-nomonichas-apollo-express.svg)
![license](https://img.shields.io/npm/l/bp-nomonichas-apollo-express.svg)

> A working base setup in July 2019 using Nodejs, Mocha, Nyc, Istanbul, Chai, Semantic-Release, Travis-ci and Codecov.io

> **Note**: About Travis and Codecov.io, if you are developming a private project, it may make sense to switch to other services like CircleCi and something to replace codecov.io if you are on a tight budget.

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

Then initialize and build
```
npm init
npm install
npm run build
```

Finally make commit and push changes
```
git commit -Am "feat: setup base project"
git push origin master
```
