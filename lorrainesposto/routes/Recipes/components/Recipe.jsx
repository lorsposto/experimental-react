require('babel-core/register');
var React = require('react');

var Recipe = React.createClass({
    render: function() {
        return <div className="recipe-container" key={this.props.key}>
            <div className="row">
                Recipe {this.props.key}: {this.props.name}
                <div className="container recipe-ingredients">
                    <label>Ingredients</label>
                    {this.props.ingredients}
                </div>
                <div className="container recipe-steps">
                    <table>
                        <tbody>
                            {this.props.steps.map(function(obj, i) {
                                return <tr key={i}>
                                    <td>
                                        <label>Step{obj.sortOrder}.</label>
                                        {obj.text}
                                    </td>
                                </tr>
                                })}
                        </tbody>
                    </table>
                </div>
                <div className="container recipe-image">
                    <img src={this.props.image}/>
                </div>
            </div>
        </div>
    }
});

module.exports = Recipe;