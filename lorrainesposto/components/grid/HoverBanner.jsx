var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var HoverBanner = React.createClass({
    propTypes: {
        _id: React.PropTypes.number.isRequired,
        content: React.PropTypes.string // TODO component?
    },
    getDefaultProps: function() {
        return {
            _id: -1,
            content: ''
        }
    },
    getInitialState: function() {
        return {
            active: false
        }
    },
    componentWillMount: function() {
        //console.log("Square", this.props._id, "will mount");
    },
    //componentWillReceiveProps: function(props) {
    //    console.log("Will receive", props.active);
    //    this.setState({'active': props.active})
    //},
    //componentDidMount: function() {
    //    console.log("Mounted, active", this.props.active);
    //    this.setState({active: this.props.active});
    //},
    //componentWillUpdate: function() {
    //    console.log("Square", this.props._id, "will update");
    //},
    //shouldComponentUpdate: function(props) {
    //    console.log("Should component update?", (this.props.active !== props.active || this.props.content !== props.content));
    //    //return (this.props.active !== props.active || this.props.content !== props.content);
    //},
    render: function() {
        return <ReactCSSTransitionGroup component="div" transitionName="hover-banner"
                                 transitionAppear={true} transitionAppearTimeout={200} transitionEnterTimeout={200} transitionLeaveTimeout={200}>
            <div className="lor-hover-banner" key={this.props.key}>
                <div className="lor-hover-banner-content">
                    {this.props.content}
                </div>
            </div>
        </ReactCSSTransitionGroup>;
    }
});

module.exports = HoverBanner;