# svelte-electron-template

A [Electron](https://www.electronjs.org/) app template with [Svelte](https://svelte.dev/) framework.

## How to get started

#### 1) Copy template

**degit**

```
npx degit github:lawondyss/svelte-electron-template <folder-name>
```
or

**git**
```
git clone https://github.com/Lawondyss/svelte-electron-template.git <folder-name>
```

#### 2) Initialization

```
cd <folder-name>
```

**npm**
```
npm install
npm run dev
```
or 

**yarn**
```
yarn install
yarn run dev
```

#### 3) Profit

![profit](https://memegenerator.net/img/images/400x/5277024.jpg)

## Architecture

```
backend/
 - api.js      -> create comunication between backend and frontend
 - handlers.js -> backend handlers for calling channels from frontend
 - index.js    -> Electron initialization
 - preload.js  -> calling before starting frontend

frontend/
 - app.js      -> Svelte initialization
 - App.svelte  -> Svelte main component
 
 public/
 - global.css  -> global CSS styles
 - index.html  -> main HTML file of application
```

## Handlers

This methods run on backend (NodeJS) of application and returns results for frontend. Methods are calling from exposed function `window.api()` in frontend.

First parameter of `window.api()` is name of handler. All others parameters are passed to handler.

Calling a `window.api()` returns a promise and value for `then()` is result of handler.