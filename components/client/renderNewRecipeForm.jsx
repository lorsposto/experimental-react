var React = require('react'),
    ReactDOM = require('react-dom'),
    reactRecipeForm = React.createFactory(require('../RecipeForm.jsx'));

var mountNode = document.getElementById("react-content");

ReactDOM.render(new reactRecipeForm({}), mountNode);