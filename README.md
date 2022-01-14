# Stream Verse

Stream and play games.

## Project Structure

### components

A component can be a page or part of a page. Group each component into their respective folder with index.js as the main body (When importing /components/something the component defined in index.js will be imported). Sub-components can be placed within the same folder.

### constants

Store constant values like colours, routes etc.

### routes

Because react app is a single page application, the way to handle routing is through react router. Wrap each Route within the Routes tag with each Route representing a page. Import and pass the component representing the page as element within the Route tag. Store routes as '/something' in /constants/routes and import them whenever you need to specify routes.

### hooks

Works like get and set in OO languages

[someValue, setSomeValue] = { 'key' : 'value' }

someValue: returns current/default value
setSomeValue(someNewObject): set a new value

## Project Commands

- `npm install`: Install all dependencies into node_modules folder. Will take quite a while to complete.

- `npm start`: start project on http://localhost:3000

- `npm test`: launch tests runner in interactive watch mode. docs: https://facebook.github.io/create-react-app/docs/running-tests


- `npm run build`: Builds app for production in build folder. docs: https://facebook.github.io/create-react-app/docs/deployment
