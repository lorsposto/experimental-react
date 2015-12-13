var React = require('react'),
    HoverBanner = require('./HoverBanner.jsx');

// TODO recipe data
var ImageSquare = React.createClass({
    propTypes: {
        _id: React.PropTypes.number.isRequired,
        image: React.PropTypes.string.isRequired,
        //recipe_data: React.PropTypes.object.isRequired
        size: React.PropTypes.number.isRequired,
        active: React.PropTypes.bool
    },
    getInitialState: function() {
        return {
            size: 0,
            mouseActive: false
        }
    },
    getDefaultProps: function () {
        return {
            _id: 0,
            image: '',
            size: 0,
            active: false
            //x: 0,
            //y: 0
        }
    },
    componentWillMount: function() {

    },
    componentWillReceiveProps: function (props) {
        if(props.size) this.setState({size: props.size});
    },
    shouldComponentUpdate: function (props, state) {
        return (this.props.size !== props.size || this.state.active !== state.active);
    },
    componentWillUpdate: function() {
        //console.log('ImageSquare', this.props._id, 'will update!');
    },
    onMouseEnter: function() {
        this.setState({active: true});
        //console.log('ImageSquare', this.props._id, 'is active!');
    },
    onMouseLeave: function() {
        this.setState({active: false});
    },
    render: function() {
        var style = {
            width: this.props.size,
            height: this.props.size
        };
        return <li key={this.props._id} className="lor-square" style={style} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <div style={{backgroundImage: 'url(' + this.props.image + ')'}} className="lor-grid-img">
                {this.state.active === true ?
                    <HoverBanner key={this.props._id} _id={this.props._id} content={'Square ' + this.props._id}/>
                : null}
            </div>
        </li>
    }
});

module.exports = ImageSquare;