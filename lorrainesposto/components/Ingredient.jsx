require('babel-core/register');
var React = require('react');

var Ingredient = React.createClass({
    render: function () {
        return <div className="col-md-6" key={this.props.key}>
            {this.props.amount} {this.props.units} {this.props.name}
        </div>;
    }
});

module.exports = Ingredient;