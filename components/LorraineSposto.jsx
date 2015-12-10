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
            <stylesheets>
                <link rel="stylesheet" type="text/css" href="/public/css/build.css"/>
            </stylesheets>
            <script src="/public/js/components.js"></script>
        </div>;
    }
});

module.exports = LorraineSposto;