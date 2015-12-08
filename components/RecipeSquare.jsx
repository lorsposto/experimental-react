var React = require('react');

var RecipeSquare = React.createClass({
    render: function() {
        var style = {
            backgroundImage: 'url(' + this.props.image + ')'
        };
        return <div key={this.props._id} style={style} className="pure-u-1-5 pure-u-md-1-5 lor-grid-img">
        </div>;
    }
});

module.exports = RecipeSquare;