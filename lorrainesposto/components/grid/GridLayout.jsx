var React = require('react'),
    ImageSquare = require('./ImageSquare.jsx');

var GridLayout = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getDefaultProps() {
        return {
            data: []
        }
    },
    getInitialState: function () {
        return {
            data: [],
            windowSize: 0,
            size: 0,
            rowSize: 0
        }
    },
    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        // start out with ~200px
        var val1 = Math.abs(Math.floor(window.innerWidth/225));
        var val2 = Math.abs(Math.ceil(window.innerWidth/225));
        var numSquares = Math.max(val1, val2);
        var newSize = window.innerWidth/numSquares;

        this.setState({windowSize: window.innerWidth});
        this.setState({size: newSize});
    },
    componentWillReceiveProps(props) {
        if(props.data) this.setState({data: props.data});
    },
    onWindowResize: function() {
        this.calculateGridWidth();
    },
    calculateGridWidth() {
        // adjust the width according to current row size
        var width = window.innerWidth;
        var currentRowSize = this.state.rowSize;
        var newSize = this.state.size;
        if (currentRowSize !== 0) {
            if ((width/currentRowSize)-225 > 35) {
                // getting too big, add a square
                currentRowSize++;
            } else if ((width/currentRowSize)-225 < -35) {
                currentRowSize--;
            }
        } else {
            // we want approximately 200px squares
            var val1 = Math.abs(Math.floor(width/200));
            var val2 = Math.abs(Math.ceil(width/200));
            currentRowSize = Math.max(val1, val2);
            // so small, just put one square
        }

        if (currentRowSize > 0) {
            newSize = width/currentRowSize;
        } else {
            newSize = 200;
            currentRowSize = 1;
        }

        this.setState({
            windowSize: width,
            size: newSize,
            rowSize: currentRowSize
        });
    },
    render: function() {
        return <ul className="lor-grid-layout">

            {this.props.data.length > 0 ? this.props.data.map((square, i) =>
            <ImageSquare key={i} _id={square._id} image={square.image} size={this.state.size}/>) : null}
        </ul>;
    }
});

module.exports = GridLayout;