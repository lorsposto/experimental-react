var React = require('react'),
    Router = require('react-router').Router,
    Link = require('react-router').Link,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    LorraineSposto = require('./LorraineSposto.jsx'),
    RecipeGrid = require('./RecipeGrid.jsx'),
    RecipeForm = require('./RecipeForm.jsx'),
    Home = require('./Home.jsx'),
    Browser = require('./Browser.jsx');

var routes = (<Route path="/" component={LorraineSposto}>
    <IndexRoute component={Home}/>
    <Route path="recipes" component={RecipeGrid}/>
    <Route path="recipes/new" component={RecipeForm}/>
</Route>);

module.exports = routes;