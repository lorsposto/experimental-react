require('babel-core/register');
var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Link = require('react-router').Link,
    Route = require('react-router').Route;

var Header = React.createClass({
    getInitialState: function() {
        return {
            active: false,
            height: 0,
            transform: 0,
            scroll: 0
        };
    },
    componentWillMount: function() {

    },
    componentDidMount: function () {
        window.addEventListener('scroll', this.handleScroll);
        var scroll = window.scrollY;
        var active = true;
        var height = ReactDOM.findDOMNode(this).clientHeight;
        if (scroll >= height) {
            active = false;
        }
        this.setState({
            scroll: scroll,
            active: active,
            height: height,
            transform: 0
        });
    },
    onMouseEnter: function() {
        this.setState({active: true});
    },
    onMouseLeave: function() {
        if (this.state.scroll < this.state.height) {
            this.setState({active: true});
            return;
        }
        this.setState({active: false});
    },
    handleScroll: function (event) {
        var scroll = event.srcElement.body.scrollTop;
        var transform = 0;
        var active = false;
        if (scroll < this.state.height) {
            active = true;
        }
        if (scroll != 0) {
            transform = scroll;
        }
        this.setState({
            scroll: scroll,
            active: active,
            transform: transform
        });
    },
    render: function() {
        var style = {
            opacity: (this.state.active === true ? 1 : 0.5),
            //transform: 'translateY(' + (this.state.transform) + 'px)'
        };
        return <div id="lor-menu" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={style}>
            <div className="pure-menu pure-menu-horizontal">
                <span className="pure-menu-heading lor-menu-heading">Lorraine Sposto</span>

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