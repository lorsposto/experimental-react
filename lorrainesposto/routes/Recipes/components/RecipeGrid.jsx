/**
 * Corresponds to the main recipe page (image grid)
 * @type {*|exports|module.exports}
 */
require('babel-core/register');
var React = require('react'),
    LazyLoad = require('react-lazy-load').default,
    request = require('superagent');

var RecipeGrid = React.createClass({
    getInitialState: function () {
        return {
            squares: []
        }
    },
    componentDidMount: function() {
        var me = this;
        request.get('http://localhost:3001/api/recipes/all').end(function(err, res) {
            if(res.status === 200) {
                console.log('OK');
                me.setState({'squares': JSON.parse(res.text)['data']});
            }
        });
    },
    render: function() {
        return <LazyLoad>
            <div id="recipe-grid">
                {this.state.squares.length > 0 ? this.state.squares.map((square) =>
                    <div key={square._id} className="lor-square">
                        <div style={{backgroundImage: 'url(' + square.image + ')'}} className="lor-grid-img"></div>
                    </div>) : null}
            </div>
        </LazyLoad>;
    }
});

module.exports = RecipeGrid;