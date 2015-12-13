require('babel-core/register');
var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Link = require('react-router').Link,
    Route = require('react-router').Route,
    Header = require('./Header.jsx'),
    Footer = require('./Footer.jsx');

var LorraineSposto = React.createClass({
    getInitialState: function() {
        return {
            headerHeight: 0
        }
    },
    componentDidMount: function () {
        var elem = document.getElementById('lor-menu');
        var headerHeight = 0;
        if (elem) {
            headerHeight = elem.clientHeight;
        }
        this.setState({
           headerHeight: headerHeight
        });
    },
    render: function() {
        var style= {
            marginTop: this.state.headerHeight
        };
        return <div id="layout">
            <Header/>
            <div id="main-content" style={style}>
                {this.props.children}
            </div>
            <Footer/>
        </div>;
    }
});

module.exports = LorraineSposto;