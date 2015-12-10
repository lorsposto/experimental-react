var React = require('react'),
    ReactDOM = require('react-dom'),
    routes = require('../../routes/routes.jsx'),
    history = require('history'),
    Browser = require('../Browser.jsx');

var mountNode = document.getElementById('layout');
var newHistory = history.createHistory();

ReactDOM.render(
    (<Browser history={newHistory} routes={routes}/>),
    mountNode
);