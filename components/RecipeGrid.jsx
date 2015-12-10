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
        request.get('/fetch/all').end(function(err, res) {
            console.log("Tried to fetch all recipes");
            console.log('err', err);
            console.log('res', res);
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