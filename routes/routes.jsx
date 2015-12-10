var React = require('react'),
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    LorraineSposto = require('../components/LorraineSposto.jsx'),
    RecipeGrid = require('./Recipes/components/RecipeGrid.jsx'),
    RecipeForm = require('./Recipes/routes/RecipeForm/components/RecipeForm.jsx'),
    Recipe = require('./Recipes/routes/Recipe/components/Recipe.jsx'),
    Home = require('./Home/components/Home.jsx'),
    Browser = require('../components/Browser.jsx');

var routes = (<Route path="/" component={LorraineSposto}>
    <IndexRoute component={Home}/>
    <Route path="recipes" component={RecipeGrid}/>
    <Route path="recipes/new" component={RecipeForm}/>
    <Route path="recipes/:recipeid" component={Recipe}/>
</Route>);

module.exports = routes;