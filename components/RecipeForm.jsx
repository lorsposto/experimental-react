var React = require('react'),
    reactIngredientForm = React.createFactory;

var RecipeForm = React.createClass({
    handleSubmit: function(e) {
        console.log("Submit");
        //e.preventDefault();
    },
    render: function() {
        return (
            <form className="pure-form">
            <fieldset>
                <div className="pure-g">
                    <legend className="lor-legend">New Recipe</legend>
                    <div className="lor-form-container">
                        <div className="pure-u-1-2 pure-u-md-1-2 lor-form-col">
                            <input className="form-component" type="text" placeholder="Title"/>
                            <textarea className="form-component" rows="3" placeholder="Description"/>
                            <textarea className="form-component" rows="10" placeholder="Ingredients"/>
                            <textarea className="form-component" rows="10" placeholder="Directions"/>
                        </div>
                        <div className="pure-u-1-2 pure-u-md-1-2 lor-form-col">
                            <input className="form-component" type="text" placeholder="Prep time"/>
                            <input className="form-component" type="text" placeholder="Cook time"/>
                            <input className="form-component" type="text" placeholder="Yield"/>
                            <input className="form-component" type="text" placeholder="Tags"/>
                            <button className="pure-button form-component">Upload an Image</button>
                        </div>
                    </div>
                </div>
                <input className="lor-button-primary pure-button pure-button-primary" type="submit" value="Submit" onClick={this.handleSubmit}/>
            </fieldset>
        </form>
        );
    }
});

module.exports = RecipeForm;