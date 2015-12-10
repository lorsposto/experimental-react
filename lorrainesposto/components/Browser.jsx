require('babel-core/register');
var React = require('react'),
    Router = require('react-router').Router;

var Browser = React.createClass({
    render: function() {
        return <Router history={this.props.history}>{this.props.routes}</Router>;
    }
});

module.exports = Browser;