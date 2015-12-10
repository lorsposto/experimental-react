require('babel-core/register');

var React = require('react'),
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    LorraineSposto = require('../components/LorraineSposto.jsx'),
    RecipeGrid = require('./Recipes/components/RecipeGrid.jsx'),
    RecipeForm = require('./Recipes/components/RecipeForm.jsx'),
    Recipe = require('./Recipes/components/Recipe.jsx'),
    Recipes = require('./Recipes/components/Recipes.jsx'),
    Home = require('./Home/components/Home.jsx'),
    Browser = require('../components/Browser.jsx');

var routes = (<Route path="/" component={LorraineSposto}>
    <IndexRoute component={Home}/>
    <Route path="recipes">
        <IndexRoute component={RecipeGrid}/>
        <Route path="new" component={RecipeForm}/>
        <Route path=":recipeid" component={Recipe}/>
    </Route>
</Route>);

module.exports = routes;