require('babel-core/register');
var React = require('react'),
    Router = require('react-router').Router,
    Link = require('react-router').Link,
    Route = require('react-router').Route;

var Header = React.createClass({
    render: function() {
        return <div id="lor-menu">
            <div className="pure-menu pure-menu-horizontal">
                <span className="pure-menu-heading">Lorraine Sposto</span>

                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                    <li className="pure-menu-item"><Link to="/recipes" className="pure-menu-link">Recipes</Link></li>
                    <li className="pure-menu-item"><Link to="/recipes/new" className="pure-menu-link">
                        <i className="fa fa-2 fa-plus-circle"></i></Link></li>
                </ul>
            </div>
        </div>;
    }
});

module.exports = Header;