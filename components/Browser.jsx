var React = require('react'),
    Router = require('react-router').Router,
    Link = require('react-router').Link,
    Route = require('react-router').Route,
    Header = require('./Header.jsx'),
    ReactDOMServer = require('react-dom/server'),
    Footer = require('./Footer.jsx');

var Browser = React.createClass({
    render: function() {
        return <Router history={this.props.history}>{this.props.routes}</Router>;
    }
});

module.exports = Browser;