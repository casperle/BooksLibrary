# BooksLibrary

The application allows you to:
- [X] Add a book
- [X] View a book
- [X] Edit a book
- [X] Delete a book
- [X] Show the list of all books in library and allow applying filters to the list
  - [X] Title
  - [X] Author
  - [X] Read/Unread flag
  - [X] Rating
- [X] Statistics
  - [X] Top 10 books by rating
  - [X] Latest 10 added books
  
# Info
I didn't created a bunch of validations. On backend the sails blueprint api and some features are enabled which is not recommended to use in distribution, because of security issues. This project is only for learning purpose, or to see how you can organize your files or set up the gulp developer process.

# Used technologies

## Backend
- NodeJS (https://nodejs.org)
- SailsJS (http://sailsjs.org/)
  - ejs
  - rc
  - sails-disk

## Frontend
- AngularJS 1.5.9 (https://angularjs.org/)
- Angular-Strap (http://mgcrea.github.io/angular-strap/)
- Twitter Bootstrap 3 (http://getbootstrap.com/)
- Less (http://lesscss.org/)
- Bower (https://bower.io/)
  - main-bower-files
- Babel (https://babeljs.io/)
  - babel-core
  - babel-register
  - babel-plugin-transform-decorators-legacy
  - babel-plugin-transform-async-functions
  - babel-plugin-transform-regenerator
  - babel-preset-es2015
- Gulp (http://gulpjs.com/)
  - Browserify (http://browserify.org/)
  - Babelify (https://www.npmjs.com/package/babelify)
    - babelify-external-helpers
  - Others
    - gulp-webserver
    - gulp-eslint
    - gulp-less
    - gulp-concat
    - gulp-filter
    - gulp-util
    - run-sequence
    - stringify
    - vinyl-source-stream
    - eslint
    - autobind-decorator
- For application itself in distribution (npm packages)
  - regenerator-runtime
  - moment


**Testing**
- Karma (https://karma-runner.github.io/1.0/index.html)
  - karma-mocha-reporter (https://www.npmjs.com/package/karma-mocha-reporter)
  - karma-browserify (https://www.npmjs.com/package/karma-browserify)
    - watchify (https://www.npmjs.com/package/watchify)
  - karma-phantomjs-launcher
  - karma-jasmine
  - core-js (https://www.npmjs.com/package/core-js)
- Jasmine (https://jasmine.github.io/)
- PhantomJS (http://phantomjs.org/)

# How to use?

Download or clone the repo. First of all you need nodeJS v7 and npm to be installed, then install these packages globally:
```
npm install -g phantomjs bower gulp karma-cli sails
```

Install packages for server:
```
cd server
npm install
```
Now you can start the server:

`sails lift`

Finally setup the frontend:
```
cd web
npm install
bower install
gulp
```

**Gulp tasks**
- `set:index` copies the index.html to the `dist` folder
- `copy:bower:js` concats bower components into one file and copy it to `dist/vendor` folder
- `copy:bower:less` same with less files
- `copy:bootstrap:fonts` copies the bootstrap fonts into `dist/fonts` folder
- `lint:app` lints the code
- `set:app` uses `babelify` and `browserify` to compile the code
- `set:npm` concats node modules (`package.json` - only dependencies) into one file and copy it to `dist/vendor` folder
- `set:less` compiles `less` files to `css`, and copy them into `dist` folder
- `start:server` starts a `gulp` webserver on port `8000` and opens it
- `start:tests` starts `karma` server, which run tests and watch file changes (test files has suffix \*.spec.js)

In the `default` task I used a watcher function (`gulp.watch`), which is watching `js`, `html` and `less` files in `src` folder. When there is a change it automaticaly starts `lint:app`, `set:app` and `set:less` tasks.

# ES6, ES7 and ES2017

I am using `Babel` to compile new features of ES6 and ES7. For ES6 features there is a babel preset `babel-preset-es2015`. For `async/await` there is `transform-async-functions` and `transform-regenerator`. To run this I have to import into my project `regenerator-runtime/runtime` which is runtime for regenerator-compiled generator. It allows me to use modular system with `import` and `export` which compiles to CommonJS.

If these features will be supported natively with all browsers the transition to native JS will be easy.

# Development files structure

## Frontend
In the next lines you can find a structure within `web/src` folder, where are the majority of development files. The config files for bower, npm, babel, gulp and karma is in main `web` folder.

- **common** - *contains helper functions, like annotations, enums, global services, global reusable directives, decorators*
- **entities** - *contains all entities used in app, they are divided into folders by they names*
  - **[folders - entity names]**
    - **[folders - entity components]** - *you can have here more folders of special components/filters/directives which is used for the parent entity, e.g. grid view of books or the template for modal window*
    - **[files]** - *here are located services/factories for the entity*
- **states** - contains folders for every state, substate which can happend in app
  - **[states foldes]** - *this folders contains the config file and the basic template file (if you need) for the named state, or a folders with substates with same structure*
  - **[files]** - *common config files for whole application (angular config, run etc.)*
- **app.js** - *the main file which imports all dependencies of application*
- **booksLibrary.js** - *define the angular module with dependencies*
- **index.html** - *template of index file*
- **index.less** - *imports all the less files, and set styles for global components, in my case for alerts*

I choosed this layout because you have clearly defined where to find entities and states. If there will become more helper functions you can split these files into folders. I think this structure can be used for a larger application, beacause you dont get lost in files. The global definitions like controller, directive, filters etc. folders are not very usefull for larger applications.

## Backend
I use here the default sails folder structure (http://sailsjs.com/documentation/anatomy/my-app).

# ISSUES

I have a same problem like this http://stackoverflow.com/questions/41028434/angular-1-5-async-await-jasmine-tests. You can find this issue in `src/entities/books/form/component.spec.js` - this test fails. Majority of my methods are async, which means I can'n write more tests, but I dont want to use $q (which can solve the issue) instead of async/await.
