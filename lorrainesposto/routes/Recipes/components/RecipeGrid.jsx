/**
 * Corresponds to the main recipe page (image grid)
 * @type {*|exports|module.exports}
 */
require('babel-core/register');
var React = require('react'),
    LazyLoad = require('react-lazy-load').default,
    request = require('superagent'),
    GridLayout = require('../../../components/grid/GridLayout.jsx');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var RecipeGrid = React.createClass({
    getInitialState: function () {
        return {
            data: []
        }
    },
    componentDidMount: function() {
        var me = this;
        request.get('http://localhost:3001/api/recipes/all').end(function(err, res) {
            if(res.status === 200) {
                me.setState({'data': JSON.parse(res.text)['data']});
            }
        });
        window.addEventListener('resize', this.onWindowResize);
    },
    onWindowResize: function() {
        //console.log("Resize to width:", window.innerWidth);
    },
    //render: function() {
    //    return <LazyLoad>
    //        <ul id="recipe-grid">
    //            {this.state.squares.length > 0 ? this.state.squares.map((square) =>
    //                <li key={square._id} className="lor-square">
    //                    <div style={{backgroundImage: 'url(' + square.image + ')'}} className="lor-grid-img"></div>
    //                </li>) : null}
    //
    //        </ul>
    //    </LazyLoad>;
    //}
    render: function() {
        return <LazyLoad>
            <ReactCSSTransitionGroup transitionName="grid-layout"
                                     transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={600} transitionLeaveTimeout={600}>
                <GridLayout data={this.state.data}/>
            </ReactCSSTransitionGroup>
        </LazyLoad>;
    }
});

module.exports = RecipeGrid;