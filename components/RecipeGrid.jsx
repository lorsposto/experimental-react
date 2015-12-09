var React = require('react');

var RecipeGrid = React.createClass({
    render: function() {
        return <div id="recipe-grid">
            {this.props.rows.map((row) =>
                <div key={this.props.rows.indexOf(row)} class="recipe-grid-row">
                    {row}
                </div>
                )}
        </div>;
    }
});

module.exports = RecipeGrid;