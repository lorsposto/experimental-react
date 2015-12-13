require('babel-core/register');
var React = require('react');

var Footer = React.createClass({
    render: function() {
        return <footer>
                <div className="lor-footer">
                    © Copyright 2015 Lorraine Sposto
                </div>
        </footer>;
    }
});

module.exports = Footer;