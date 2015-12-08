var React = require('react');

var RecipeGrid = React.createClass({
    render: function() {
        return <div id="recipe-grid">
            {this.props.squares}
        </div>;
    }
});

module.exports = RecipeGrid;