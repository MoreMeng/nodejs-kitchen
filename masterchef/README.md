# MASTERCHEF WEBPACK BOILERPLATE
## COPY PASTE AND FUN

## Features
* Don't start `yarn install` + `yarn start` (`npm install` + `npm start`) on this!
* Don't worry about webpack config, just code
* Custom HTML Modules plugin
```html
        <!DOCTYPE html>
        <html>
        <head>
            <title>Example HTML</title>
        </head>
        <body>
            <include>_form.html</include>
            <include>_print.html</include>
        </body>
        </html>

```
* HTML hot reload(Livereload)
* SCSS (SASS)
* Bootstrap5 already installed
* Babel
  * ES6
  * ES7
  * Class syntax + Class properties
  * etc
* Autoprefixer
* Minifier
* PostCSS
* Eslint (airbnb-base config)
* Eslinting on the fly (while dev)
* Pretty console output (Friendly errors webpack plugin)

## Usage
Installation
```
npm install
or
yarn
```
Start dev server for development
```
npm start
or
yarn start-yarn
```
Build
```
npm run build
or
yarn build
```
