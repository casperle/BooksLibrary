# BooksLibrary

## Used technologies

**Backend**
- NodeJS (https://nodejs.org)
- SailsJS (http://sailsjs.org/)

**Frontend**
- AngularJS 1.5 (https://angularjs.org/)
- Angular-Strap (http://mgcrea.github.io/angular-strap/)
- Twitter Bootstrap 3 (http://getbootstrap.com/)
- Less (http://lesscss.org/)
- Bower (https://bower.io/)
- Gulp (http://gulpjs.com/)
  - Browserify (http://browserify.org/)
  - Babelify (https://www.npmjs.com/package/babelify)
  - Others
    - gulp-webserver
    - gulp-eslint
    - gulp-less
    - gulp-concat
    - gulp-filter
    - gulp-util
    - run-sequence
    - main-bower-files
    - stringify
    - vinyl-source-stream

**Testing**
- Karma (https://karma-runner.github.io/1.0/index.html)
  - karma-mocha-reporter (https://www.npmjs.com/package/karma-mocha-reporter)
  - karma-browserify (https://www.npmjs.com/package/karma-browserify)
    - watchify (https://www.npmjs.com/package/watchify)
- Jasmine (https://jasmine.github.io/)
- PhantomJS (http://phantomjs.org/)

## How to use?

Download or clone the repo. First of all you need nodeJS and npm to be installed, then install these packages globally:
```
npm install -g phantomjs bower gulp karma-cli sails
```

Install packages for server:
```
cd server
npm install
```
Now you can start the server:

`npm start` or `sails lift`

Finally setup the frontend:
```
cd web
npm install
bower install
gulp
```

**Gulp tasks**
- `set:index` copy the index.html to the `dist` folder
- `copy:bower:js` concats bower components into one file and copy it to `dist/vendor` folder
- `copy:bower:less` same with less files
- `lint:app` lints the code
- `set:app` uses `babelify` and `browserify` to compile the code
- `set:npm` concats node modules (`package.json` - only dependencies) into one file and copy it to `dist/vendor` folder
- `set:less` compiles `less` files to `css`, and copy them into `dist` folder
- `start:server` starts a `gulp` webserver on port `8000` and opens it
- `start:tests` starts `karma` server, which runs tests and watch file changes (test files has suffix \*.spec.js)

For example there is `lodash` as `npm` package and `angular`, `bootstrap`, `angular-strap` as `bower` components.

## ES6

Thanks to gulp tasks and `karma` you can use `ES6` features, but only in frontends files.

# Next

The application has to provide these features:
- [ ] Add a book
- [ ] View a book
- [ ] Edit a book
- [ ] Delete a book
- [ ] Show list of all books of library and allow applying filters to the list
  - [ ] Title
  - [ ] Author
  - [ ] Read/Unread flag
  - [ ] Rating
- [ ] Statistic
  - [ ] Top 10 books by rating
  - [ ] Latest 10 added books
