require('babel-core/register');
var React = require('react'),
    Router = require('react-router').Router,
    Link = require('react-router').Link,
    Route = require('react-router').Route,
    Header = require('./Header.jsx'),
    Footer = require('./Footer.jsx');

var LorraineSposto = React.createClass({
    render: function() {
        return <div id="react-content">
            <Header/>
            {this.props.children}
            <Footer/>
        </div>;
    }
});

module.exports = LorraineSposto;