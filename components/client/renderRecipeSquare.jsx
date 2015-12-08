var React = require('react'),
    ReactDOM = require('react-dom'),
    reactRecipeSquare = React.createFactory(require('../RecipeSquare.jsx')),
    reactRecipeGrid = React.createFactory(require('../RecipeGrid.jsx'));

var mountNode = document.getElementById("react-content");
var data = document.getElementById("react-data").innerHTML;
data = JSON.parse(data);

var squares = [];
data.forEach(function(obj) {
    squares.push(reactRecipeSquare({
        _id: obj._id,
        image: obj.image
    }));
});

ReactDOM.render(new reactRecipeGrid({squares: squares}), mountNode);