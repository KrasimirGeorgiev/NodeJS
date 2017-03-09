### To Start
* Run `npm install`
* Run `npm start`
* Open the `./html/home.html` through your favorite *IDE* or just open it up in a *browser*

Because the `generateHtmlFile()` function uses `process.cwd()` *the current work directory* to figure out
relative paths you must start the project from the project root directory either with `npm start` or
`node ./aap/main.js` running the `main.js` from within the app folder will produce an error. 